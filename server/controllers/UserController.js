import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";
import Coupon from "../models/CouponModel.js";
import Order from "../models/orderModel.js";
import bcrypt from "bcrypt";
import generateToken from "../config/jwtToken.js";
import generateRefreshToken from "../config/refreshToken.js";
import sendEmail from "./EmailController.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import uniqid from "uniqid";

const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!email || !password || !firstName || !lastName || !mobile) {
        res.status(400);
        throw new Error("Please fill out all fields");
    }

    if (!findUser) {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            mobile,
            password
        });
        res.json(newUser);
    } else {
        throw new Error("User already exists");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error("User not found, Please SignUp");
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (user && passwordIsCorrect) {
        const refreshToken = generateRefreshToken(user?._id);
        const { _id, firstName, email, mobile } = user;
        const updateUser = await User.findOneAndUpdate(
            user._id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 72 * 1000,
        })
        res.status(200).json({
            _id,
            firstName,
            email,
            mobile,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter email and password");
    }

    const admin = await User.findOne({ email });
    if (admin.role !== 'admin') {
        throw new Error("Not Authorized");
    }

    if (!admin) {
        res.status(400);
        throw new Error("User not found, Please SignUp");
    }

    const passwordIsCorrect = await bcrypt.compare(password, admin.password);

    if (admin && passwordIsCorrect) {
        const refreshToken = generateRefreshToken(admin?._id);
        const { _id, firstName, email, mobile } = admin;
        const updateUser = await User.findOneAndUpdate(
            admin._id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 72 * 1000,
        })
        res.status(200).json({
            _id,
            firstName,
            email,
            mobile,
            token: generateToken(admin._id),
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }

});

const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { address } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            address
        }, {
            new: true
        });
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { firstName, lastName, email, mobile } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstName,
            lastName,
            email,
            mobile
        }, {
            new: true
        });
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        }, {
            new: true,
        });
        res.json({
            message: "User Blocked",
        })
    } catch (error) {
        throw new Error(error);
    }
});

const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const unBlock = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        }, {
            new: true,
        });
        res.json({
            message: "User Unblocked",
        })
    } catch (error) {
        throw new Error(error);
    }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No refresh token");
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        throw new Error("No Refresh Token present in db or not matched");
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    })
});

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No refresh token");
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204);
    }
    await User.findOneAndUpdate(refreshToken, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    return res.sendStatus(204);
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPasword = await user.save();
        res.json(updatedPasword);
    } else {
        res.json(user);
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!email){
        throw new Error("Please enter the email");
    }
    if (!user) {
        throw new Error("Invalid email");
    }
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/api/user/reset-password/${token}'>Click Here</a>`;
        const data = {
            to: email,
            subject: "Forgot Password Link",
            text: "Hey user",
            htm: resetURL,
        }
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashToken,
        passwordResetExpires: {
            $gt: Date.now()
        }
    });
    if (!user) {
        throw new Error("Token expired, please try again");
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const user = await User.findById(_id).populate("wishlist");
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    try {
        let products = [];
        const user = await User.findById(_id);
        const alreadyExistCart = await Cart.findOne({ orderby: user._id });
        if (alreadyExistCart) {
            // Add new products to existing cart
            products = alreadyExistCart.products;
            for (let i = 0; i < cart.length; i++) {
                let existingProductIndex = products.findIndex(
                    (p) => p.product.toString() === cart[i]._id
                );
                if (existingProductIndex !== -1) {
                    // If product already exists in cart, update its count
                    products[existingProductIndex].count += cart[i].count;
                } else {
                    // Otherwise, add new product to cart
                    let object = {};
                    object.product = cart[i]._id;
                    object.count = cart[i].count;
                    let getPrice = await Product.findById(cart[i]._id)
                        .select("price")
                        .exec();
                    object.price = getPrice.price;
                    products.push(object);
                }
            }
            alreadyExistCart.products = products;
            alreadyExistCart.cartTotal = calculateCartTotal(products);
            const updatedCart = await alreadyExistCart.save();
            res.json(updatedCart);
        } else {
            // Create new cart
            for (let i = 0; i < cart.length; i++) {
                let object = {};
                object.product = cart[i]._id;
                object.count = cart[i].count;
                object.color = cart[i].color;
                let getPrice = await Product.findById(cart[i]._id)
                    .select("price")
                    .exec();
                object.price = getPrice.price;
                products.push(object);
            }
            let cartTotal = calculateCartTotal(products);
            let newCart = await new Cart({
                products,
                cartTotal,
                orderby: user?._id,
            }).save();
            res.json(newCart);
        }
    } catch (error) {
        throw new Error(error);
    }
});

const calculateCartTotal = (products) => {
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
        cartTotal += products[i].price * products[i].count;
    }
    return cartTotal;
};

const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { _id } = req.user;

    console.log(productId);
    console.log(_id);

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { orderby: _id },
            { $pull: { products: { product: productId } } },
            { new: true }
        )

        const newCartTotal = calculateCartTotal(updatedCart.products);

        // Update the cartTotal field with the new cart total
        updatedCart.cartTotal = newCartTotal;
        await updatedCart.save();

        res.json({ message: "Product removed from cart", updatedCart })

    } catch (error) {
        throw new Error(error);
    }
});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const cart = await Cart.findOne({ orderby: _id }).populate("products.product");
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const user = await User.findOne(_id);
        const cart = await Cart.findOneAndRemove({ orderby: user._id });
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
        throw new Error("Invalid coupon");
    }
    const user = await User.findOne({ _id });
    let { products, cartTotal } = await Cart.findOne({ orderby: user._id }).populate("products.product");
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
    await Cart.findOneAndUpdate({
        orderby: user._id
    }, {
        totalAfterDiscount
    }, {
        new: true,
    })
    res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    try {
        if (!COD) {
            throw new Error("Create Cash order failed");
        }
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderby: user._id });
        let finalAmount = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmount = userCart.totalAfterDiscount * 100;
        } else {
            finalAmount = userCart.cartTotal;
        }

        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmount,
                status: "Cash on Delivery",
                created: Date.now(),
                currency: "USD",
            },
            orderby: user._id,
            orderStatus: "Cash on Delivery"
        }).save();
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: item.count, sold: +item.count } },
                }
            }
        })
        const updated = await Product.bulkWrite(update, {});
        res.json({ message: "success" });
    } catch (error) {
        throw new Error(error);
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const userOrders = await Order.findOne({ orderby: _id }).populate("products.product").exec();
        res.json(userOrders);
    } catch (error) {
        throw new Error(error);
    }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(id, {
            orderStatus: status,
            paymentIntent: {
                status: status,
            },
        }, {
            new: true
        })
        res.json(updateOrderStatus);
    } catch (error) {
        throw new Error(error);
    }
});

export default {
    createUser,
    loginUser,
    loginAdmin,
    saveAddress,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    getWishlist,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateOrderStatus,
    removeFromCart,
}