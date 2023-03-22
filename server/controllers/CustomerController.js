import express from "express";
import Product from "../models/Product.js";

const getAllProucts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ 
            products: products ,
            message: "Products found"
        });
    } catch (error) {
        console.log(error);
    }
}

export default {
    getAllProucts
}