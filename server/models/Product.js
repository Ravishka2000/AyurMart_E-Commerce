import mongoose from "mongoose";

const Schema = mongoose.Schema;

const product = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Product = mongoose.model("Product", product);

export default Product;