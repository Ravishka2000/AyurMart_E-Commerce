import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";

const getaProduct = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate("ratings.postedby");
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllProducts = asyncHandler (async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(" ");
            query = query.sort(sortBy);
        }else{
            query = query.sort("-createdAt");
        }

        if(req.query.fields){
            const fields = req.query.fields.split(',').join(" ");
            query = query.select(fields);
        }else{
            query = query.select("-__v")
        }

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page){
            const productCount = await Product.countDocuments();
            if(skip >= productCount){
                throw new Error("This Page does not exist");
            }
        }

        const products = await query; 
        res.json(products);
    } catch (error) {
        throw new Error(error);
    }
});

export default{
    getaProduct,
    getAllProducts,
}