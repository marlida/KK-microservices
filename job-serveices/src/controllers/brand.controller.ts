import { Request, Response } from 'express';
import { brandService } from '../services/brand.service';

export const createBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({
                message: 'Invalid brand data provided',
            });
            return;
        }

        const existingBrand = await brandService.getBrandExists(name);
        if (existingBrand) {
            res.status(400).json({
                message: 'Brand already exists',
            });
            return;
        }

        const newBrand = await brandService.createBrand({ name });
        res.status(201).json({
            message: 'Brand created successfully',
            data: newBrand,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error creating brand: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error creating brand: Unknown error',
            });
        }
    }
};

export const getBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const brandData = await brandService.getBrand();
        res.status(200).json({
            message: 'Brand data retrieved successfully',
            data: brandData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving brand data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error retrieving brand data: Unknown error',
            });
        }
    }
}

export const getBrandById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, catId } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Brand ID is required',
            });
            return;
        }

        const brandData = await brandService.getBrandById(parseInt(id), parseInt(catId));
        if (!brandData) {
            res.status(404).json({
                message: 'Brand not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Brand data retrieved successfully',
            data: brandData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving brand data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error retrieving brand data: Unknown error',
            });
        }
    }
};

export const updateBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!id || !name) {
            res.status(400).json({
                message: 'Brand ID and  name are required',
            });
            return;
        }

        const brandNotFound = await brandService.getBrandById(parseInt(id));
        if (!brandNotFound) {
            res.status(404).json({
                message: 'Brand with this ID does not exist',
            });
            return;
        }

        const updatedBrand = await brandService.updateBrand(parseInt(id), { name });
        res.status(200).json({
            message: 'Brand updated successfully',
            data: updatedBrand,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error updating brand: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error updating brand: Unknown error',
            });
        }
    }
};

export const deleteBrand = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Brand ID is required',
            });
            return;
        }

        const deletedBrand = await brandService.deleteBrand(parseInt(id));
        res.status(200).json({
            message: 'Brand deleted successfully',
            data: deletedBrand,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error deleting brand: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error deleting brand: Unknown error',
            });
        }
    }
};
