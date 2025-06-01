"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategory = exports.createCategory = void 0;
const cetegory_service_1 = require("../services/cetegory.service");
const createCategory = async (req, res) => {
    try {
        const { name, brandId } = req.body;
        if (!name) {
            res.status(400).json({
                message: 'Invalid category data provided',
            });
            return;
        }
        const existingCategory = await cetegory_service_1.categoryService.getCategoryExists(name);
        if (existingCategory) {
            res.status(400).json({
                message: 'Category already exists',
            });
            return;
        }
        const newCategory = await cetegory_service_1.categoryService.createCategory({ name, brandId });
        res.status(201).json({
            message: 'Category created successfully',
            data: newCategory,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error creating category: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error creating category: Unknown error',
            });
        }
    }
};
exports.createCategory = createCategory;
const getCategory = async (req, res) => {
    try {
        const categoryData = await cetegory_service_1.categoryService.getCategory();
        res.status(200).json({
            message: 'Category data retrieved successfully',
            data: categoryData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving category data: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error retrieving category data: Unknown error',
            });
        }
    }
};
exports.getCategory = getCategory;
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Category ID is required',
            });
            return;
        }
        const categoryData = await cetegory_service_1.categoryService.getCategoryById(parseInt(id));
        if (!categoryData) {
            res.status(404).json({
                message: 'Category not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Category data retrieved successfully',
            data: categoryData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving category data: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error retrieving category data: Unknown error',
            });
        }
    }
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!id || !name) {
            res.status(400).json({
                message: 'Category ID and name are required',
            });
            return;
        }
        const categoryNotFound = await cetegory_service_1.categoryService.getCategoryById(parseInt(id));
        if (!categoryNotFound) {
            res.status(404).json({
                message: 'Category with this ID does not exist',
            });
            return;
        }
        const updatedCategory = await cetegory_service_1.categoryService.updateCategory(parseInt(id), { name });
        res.status(200).json({
            message: 'Category updated successfully',
            data: updatedCategory,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error updating category: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error updating category: Unknown error',
            });
        }
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Category ID is required',
            });
            return;
        }
        const deletedCategory = await cetegory_service_1.categoryService.deleteCategory(parseInt(id));
        res.status(200).json({
            message: 'Category deleted successfully',
            data: deletedCategory,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error deleting category: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: 'Error deleting category: Unknown error',
            });
        }
    }
};
exports.deleteCategory = deleteCategory;
