import ProductCategory from "../models/ProductCategoryModel.js";
import asyncHandler from "express-async-handler";

const createCategory = asyncHandler (async (req, res) => {
    try {
        const newCategory = await ProductCategory.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const updateCategory = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const category = await ProductCategory.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(category);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteCategory = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const category = await ProductCategory.findByIdAndDelete(id);
        res.json(category);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllCategory = asyncHandler (async (req, res) => {
    try {
        const categories = await ProductCategory.find();
        res.json(categories);
    } catch (error) {
        throw new Error(error);
    }
});

const getACategory = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const category = await ProductCategory.findById(id);
        res.json(category);
    } catch (error) {
        throw new Error(error);
    }
});

export default {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getACategory,
}
