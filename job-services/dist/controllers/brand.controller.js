"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.getBrandById = exports.getBrand = exports.createBrand = void 0;
const brand_service_1 = require("../services/brand.service");
const createBrand = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({
                message: 'Invalid brand data provided',
            });
            return;
        }
        const existingBrand = await brand_service_1.brandService.getBrandExists(name);
        if (existingBrand) {
            res.status(400).json({
                message: 'Brand already exists',
            });
            return;
        }
        const newBrand = await brand_service_1.brandService.createBrand({ name });
        res.status(201).json({
            message: 'Brand created successfully',
            data: newBrand,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error creating brand: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error creating brand: Unknown error',
            });
        }
    }
};
exports.createBrand = createBrand;
const getBrand = async (req, res) => {
    try {
        const brandData = await brand_service_1.brandService.getBrand();
        res.status(200).json({
            message: 'Brand data retrieved successfully',
            data: brandData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving brand data: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error retrieving brand data: Unknown error',
            });
        }
    }
};
exports.getBrand = getBrand;
const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const { catId, prodId, include } = req.query;
        const options = {
            catId: catId ? parseInt(catId) : undefined,
            prodId: prodId ? parseInt(prodId) : undefined,
            include: include || undefined
        };
        const brand = await brand_service_1.brandService.getBrandById(parseInt(id), options);
        if (!brand) {
            res.status(404).json({
                message: 'Brand not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Brand retrieved successfully',
            data: brand,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving brand: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error retrieving brand: Unknown error',
            });
        }
    }
};
exports.getBrandById = getBrandById;
const updateBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!id || !name) {
            res.status(400).json({
                message: 'Brand ID and  name are required',
            });
            return;
        }
        const brandNotFound = await brand_service_1.brandService.getBrandById(parseInt(id));
        if (!brandNotFound) {
            res.status(404).json({
                message: 'Brand with this ID does not exist',
            });
            return;
        }
        const updatedBrand = await brand_service_1.brandService.updateBrand(parseInt(id), { name });
        res.status(200).json({
            message: 'Brand updated successfully',
            data: updatedBrand,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error updating brand: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error updating brand: Unknown error',
            });
        }
    }
};
exports.updateBrand = updateBrand;
const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Brand ID is required',
            });
            return;
        }
        const deletedBrand = await brand_service_1.brandService.deleteBrand(parseInt(id));
        res.status(200).json({
            message: 'Brand deleted successfully',
            data: deletedBrand,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error deleting brand: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error deleting brand: Unknown error',
            });
        }
    }
};
exports.deleteBrand = deleteBrand;
