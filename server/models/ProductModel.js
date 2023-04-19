import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    brand: {
        type:String,
        required:true,
    },
    quantity: {
        type:Number,
        required:true,
    },
    sold: {
        type:Number,
        default:0,
    },
    images: [],
    ratings:[
        {
            star:Number,
            comment: String,
            postedby:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        },
    ],
    totalrating: {
        type:String,
        default: 0,
    }
}, {
    timestamps: true,
});

//Export the model
const Product = mongoose.model('Product', productSchema);
export default Product;
