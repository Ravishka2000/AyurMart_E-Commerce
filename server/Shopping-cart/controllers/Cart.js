import Cart from "../models/CartModel.js";
import asyncHandler from "express-async-handler";
import axios from "axios";

const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    let total = 0;
    let tax = 0;
    try {
        let products = [];
        const alreadyExistCart = await Cart.findOne({ orderby: _id });
        if (alreadyExistCart) {
            products = alreadyExistCart.products;
            for (let i = 0; i < cart.length; i++) {
                let existingProductIndex = products.findIndex(
                    (p) => p.product.toString() === cart[i]._id
                );
                if (existingProductIndex !== -1) {
                    products[existingProductIndex].count += cart[i].count;
                } else {
                    let object = {};
                    object._id = cart[i]._id
                    object.product = cart[i]._id;
                    object.count = cart[i].count;
                    let getPrice = await axios.get(`http://product:7005/api/product/${cart[i]._id}`, {
                        headers: {
                            'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}`
                        }
                    });
                    object.price = getPrice.data.price
                    products.push(object);

                }
            }
            alreadyExistCart.products = products;
            total = calculateCartTotal(products);
            tax = total * 0.03;
            alreadyExistCart.cartTotal = total + tax;
            alreadyExistCart.tax = tax;
            const updatedCart = await alreadyExistCart.save();
            res.json(updatedCart);
        } else {
            for (let i = 0; i < cart.length; i++) {
                let object = {};
                object._id = cart[i]._id
                object.product = cart[i]._id;
                object.count = cart[i].count;
                let getPrice = await axios.get(`http://product:7005/api/product/${cart[i]._id}`, {
                    headers: {
                        'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}`
                    }
                });
                object.price = getPrice.data.price
                products.push(object);
            }
            let cartTotal = calculateCartTotal(products);
            let tax = cartTotal * 0.03;
            cartTotal += tax;
            let newCart = await new Cart({
                products,
                cartTotal,
                tax,
                orderby: _id,
            }).save();
            res.json(newCart);
        }
    } catch (error) {
        throw new Error(error);
    }
});


//empty cart
const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const cart = await Cart.findOneAndRemove({ orderby: _id });
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

//apply coupons
const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    try {
        const response = await axios.get("http://coupon:7003/api/Coupon/", {
            headers: {
                'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}`
            }
        });
        const resCoupon = response.data;

        const validCoupon = resCoupon.find((c) => c.name.toLowerCase() === coupon.toLowerCase());

        if (!validCoupon) {
            return res.status(400).json({ message: "Invalid coupon code" });
        }
        if (validCoupon === null) {
            throw new Error("Invalid coupon");
        }
        let { cartTotal } = await Cart.findOne({ orderby: _id });

        let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
        await Cart.findOneAndUpdate(
            { orderby: _id },
            { totalAfterDiscount },
            { new: true }
        );

        res.json(totalAfterDiscount);

    } catch (error) {
        console.log(error);
    }
});

//calculate cart total
const calculateCartTotal = (products) => {
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
        cartTotal += products[i].price * products[i].count;
    }
    return cartTotal;
};

//remove from cart
const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { _id } = req.user;

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { orderby: _id },
            { $pull: { products: { product: productId } } },
            { new: true }
        )

        const newCartTotal = calculateCartTotal(updatedCart.products);
        updatedCart.cartTotal = newCartTotal;
        await updatedCart.save();

        res.json({ message: "Product removed from cart", updatedCart })

    } catch (error) {
        throw new Error(error);
    }
});


//get cart
const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const updatedCart = await Cart.updateOne(
            { orderby: _id },
            { $pull: { products: null } }
        );
        if (updatedCart.nModified === 0) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const cart = await Cart.findOne({ orderby: _id });
        const populatedCart = await Promise.all(
            cart.products.map(async (product) => {
                const _id = product.product;
                const response = await axios.get(
                    `http://product:7005/api/product/${_id}`
                );
                const data = response.data;
                return { ...product.toObject(), product: data };
            })
        );
        res.json({ ...cart.toObject(), products: populatedCart });
    } catch (error) {
        throw new Error(error);
    }

});


export default {
    userCart,
    removeFromCart,
    getUserCart,
    emptyCart,
    calculateCartTotal,
    applyCoupon
}