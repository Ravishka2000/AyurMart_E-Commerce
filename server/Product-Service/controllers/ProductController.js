import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";
import slugify from "slugify";
import cloudinaryUploadImg from "../utils/cloudinary.js";
import fs from 'fs';
import axios from "axios";

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json({
            message: "Product created",
            newProduct: newProduct,
        })
    } catch (error) {
        throw new Error(error);
    }
});

const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate("ratings");
        if (!product) {
            res.json(null);
        } else {
            const populatedProduct = await Promise.all(
                product.ratings.map(async (rating) => {
                    const { postedby } = rating;
                    const response = await axios.get(`http://userauth:7002/api/user/${postedby}`);
                    const { data: user } = response;
                    return { ...rating.toObject(), postedby: user };
                })
            );
            res.json({ ...product.toObject(), ratings: populatedProduct });
        }

    } catch (error) {
        throw new Error(error);
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Product.find(JSON.parse(queryStr));

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v")
        }

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) {
                throw new Error("This Page does not exist");
            }
        }

        const products = await query;
        res.json(products);
    } catch (error) {
        throw new Error(error);
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        res.json(product);
    } catch (error) {
        throw new Error(error);
    }
});

//product rating
const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
        //get Product
        const product = await Product.findById(prodId);
        //check the user has already reviewed
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString()
        );
        //Update the review if already rated before
        if (alreadyRated) {
            const updateRating = await Product.updateOne({
                ratings: { $elemMatch: alreadyRated }
            }, {
                $set: {
                    "ratings.$.star": star,
                    "ratings.$.comment": comment
                },
            }, {
                new: true,
            });
        } else {
            //create review
            const rateProduct = await Product.findByIdAndUpdate(prodId, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: _id
                    }
                }
            }, {
                new: true,
            });
        }
        const getAllratings = await Product.findById(prodId);
        let totalRatings = getAllratings.ratings.length;
        let ratingsum = getAllratings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRatings); //calculate actual rating
        let finalProduct = await Product.findByIdAndUpdate(prodId, {
            totalrating: actualRating,
        })
        res.json(finalProduct)
    } catch (error) {
        throw new Error(error);
    }
});

const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        const findProduct = await Product.findByIdAndUpdate(id, {
            images: urls.map((file) => {
                return file;
            })
        }, {
            new: true,
        })
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const bulkUpdate = asyncHandler(async (req, res) => {
    const { updates } = req.body;

    try {

        updates.forEach((update) => {
            console.log(update.updateOne.filter._id)
            const { _id } = update.updateOne.filter._id
            const { quantity } = update.updateOne.update.$inc.quantity
            const { sold } = update.updateOne.update.$inc.sold
            Product.findByIdAndUpdate(_id, {
                sold: sold,
                quantity: quantity
            }).exec();
        });
        console.log("updated successfully")
    } catch (error) {
        console.log(error);
    }
})

export default {
    createProduct,
    getaProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    rating,
    uploadImages,
    bulkUpdate
}