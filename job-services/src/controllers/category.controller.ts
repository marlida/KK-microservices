import { Request, Response } from 'express';
import { categoryService } from '../services/cetegory.service';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, brandId } = req.body;
        if (!name) {
            res.status(400).json({
                message: 'Invalid category data provided',
            });
            return;
        }

        const existingCategory = await categoryService.getCategoryExists(name);
        if (existingCategory) {
            res.status(400).json({
                message: 'Category already exists',
            });
            return;
        }

        const newCategory = await categoryService.createCategory({ name, brandId });
        res.status(201).json({
            message: 'Category created successfully',
            data: newCategory,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error creating category: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error creating category: Unknown error',
            });
        }
    }
};

export const getCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryData = await categoryService.getCategory();
        res.status(200).json({
            message: 'Category data retrieved successfully',
            data: categoryData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving category data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error retrieving category data: Unknown error',
            });
        }
    }
}

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Category ID is required',
            });
            return;
        }

        const categoryData = await categoryService.getCategoryById(parseInt(id));
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
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving category data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error retrieving category data: Unknown error',
            });
        }
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!id || !name) {
            res.status(400).json({
                message: 'Category ID and name are required',
            });
            return;
        }

        const categoryNotFound = await categoryService.getCategoryById(parseInt(id));
        if (!categoryNotFound) {
            res.status(404).json({
                message: 'Category with this ID does not exist',
            });
            return;
        }

        const updatedCategory = await categoryService.updateCategory(parseInt(id), { name });
        res.status(200).json({
            message: 'Category updated successfully',
            data: updatedCategory,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error updating category: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error updating category: Unknown error',
            });
        }
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Category ID is required',
            });
            return;
        }

        const deletedCategory = await categoryService.deleteCategory(parseInt(id));
        res.status(200).json({
            message: 'Category deleted successfully',
            data: deletedCategory,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error deleting category: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error deleting category: Unknown error',
            });
        }
    }
};
