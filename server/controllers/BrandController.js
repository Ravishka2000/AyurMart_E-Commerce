import Brand from "../models/BrandModel.js";
import asyncHandler from "express-async-handler";

const createBrand = asyncHandler (async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});

const updateBrand = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(brand);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteBrand = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brand.findByIdAndDelete(id);
        res.json(brand);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllBrand = asyncHandler (async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (error) {
        throw new Error(error);
    }
});

const getABrand = asyncHandler (async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brand.findById(id);
        res.json(brand);
    } catch (error) {
        throw new Error(error);
    }
});

export default {
    createBrand,
    updateBrand,
    deleteBrand,
    getAllBrand,
    getABrand,
}
