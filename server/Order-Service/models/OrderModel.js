import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        count: Number,
        
    }],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Pending",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered",
        ],
    },
    delivery: {
        type: String,
        default: "Standard",
    },
    orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
});

//Export the model
const Order = mongoose.model('Order', orderSchema);
export default Order;