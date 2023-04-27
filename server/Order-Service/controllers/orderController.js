import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js"
import axios from "axios";
import uniqid from "uniqid";

//create order
const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    
    console.log(req.user);
    try {
        //get user cart
        let response = await axios.get(`http://cart:7001/api/checkout/cart`, {
            headers: {
                'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}` //Verify token
            }
        })
        const userCart = response.data
        let finalAmount = 0;
        
        if(userCart.totalAfterDiscount){
            finalAmount = userCart.totalAfterDiscount;
        }else{
            finalAmount = userCart.cartTotal;
        }

        //set order details
        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "PayPal",
                amount: finalAmount,
                status: "Pending",
                created: Date.now(),
                currency: "LKR",
            },
            orderby: _id,
            orderStatus: "Pending",
            delivery: "DHL"
        }).save();
        userCart.products
        
        //increase the sold count of the product
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id},
                    update: { $inc: { quantity: item.count, sold: +item.count } },
                }
            }
        })
        
        //update sold count
        axios.put("http://product:7005/api/product/",{updates: update},{
            headers: {
                'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}`
            }
        })
    
        res.json({ message: "success" });
    } catch (error) {
        console.log(error);
    }
});

//get a order
const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const userOrders = await Order.find({ orderby: _id }).exec()
        const ordersWithProducts = await Promise.all(userOrders.map(async (order) => {
            const products = await Promise.all(order.products.map(async (product) => {
              const response = await axios.get(`http://product:7005/api/product/${product._id}`);
              return { ...product, product: response.data };
            }));
            return { ...order.toObject(), products };
          }));
          res.json(ordersWithProducts);
    } catch (error) {
        throw new Error(error);
    }
});

//update order status
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


//get all orders
const allOrders = asyncHandler(async (req, res) => {
    try {
        const getOrders = await Order.find();
        res.json(getOrders);
    } catch (error) {
        throw new Error(error);
    }
});

export default {
   allOrders,
   updateOrderStatus,
   getOrders,
   createOrder
}
