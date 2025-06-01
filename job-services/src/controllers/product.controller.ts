import { Request, Response } from 'express';
import { productService } from '../services/product.service';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, quantity, serial, description, categoryId, brandId } = req.body;
        if (!name || !price) {
            res.status(400).json({
                message: 'Invalid product data provided',
            });
            return;
        }



        const existingProduct = await productService.getProductExists(name);
        if (existingProduct) {
            res.status(400).json({
                message: 'Product already exists',
            });
            return;
        }

        const newProduct = await productService.createProduct({ 
            name, 
            price: parseFloat(price), 
            serial,
            quantity: parseInt(quantity),
            description, 
            categoryId: parseInt(categoryId), 
            brandId: parseInt(brandId) 
        });
        res.status(201).json({
            message: 'Product created successfully',
            data: newProduct,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error creating product: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error creating product: Unknown error',
            });
        }
    }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData = await productService.getProduct();
        res.status(200).json({
            message: 'Product data retrieved successfully',
            data: productData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving product data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error retrieving product data: Unknown error',
            });
        }
    }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, catId } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Product ID is required',
            });
            return;
        }

        const productData = await productService.getProductById(parseInt(id));
        if (!productData) {
            res.status(404).json({
                message: 'Product not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Product data retrieved successfully',
            data: productData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving product data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error retrieving product data: Unknown error',
            });
        }
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!id || !name) {
            res.status(400).json({
                message: 'Product ID and name are required',
            });
            return;
        }

        const productNotFound = await productService.getProductById(parseInt(id));
        if (!productNotFound) {
            res.status(404).json({
                message: 'Product with this ID does not exist',
            });
            return;
        }

        const updatedProduct = await productService.updateProduct(parseInt(id), { name });
        res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error updating product: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error updating product: Unknown error',
            });
        }
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: 'Product ID is required',
            });
            return;
        }

        const deletedProduct = await productService.deleteProduct(parseInt(id));
        res.status(200).json({
            message: 'Product deleted successfully',
            data: deletedProduct,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error deleting product: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: 'Error deleting product: Unknown error',
            });
        }
    }
};
