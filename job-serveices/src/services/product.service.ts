import { Product, ProductCreateInput } from "../types/product";
import prisma from "../config/db";
import redisClient from "../config/redis";

export class productService {
    private static clearProductCache = async (id?: number) => {
        try {
            await redisClient.del("products:list");

            if (id) {
                await redisClient.del(`product:${id}`);
            }
        } catch (error) {
            console.error("Error clearing cache:", error);
        }
    }

    static createProduct = async (productData: ProductCreateInput): Promise<Product> => {
        try {

            const newProduct = await prisma.product.create({
                data: productData
            });
            
            await this.clearProductCache();
            
            return newProduct;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating product: ${error.message}`);
            } else {
                throw new Error("Error creating product: Unknown error");
            }
        }
    }

    static getProduct = async (): Promise<Product[]> => {
        try {
            const cached = await redisClient.get(`products:list`);

            if (cached) {
                console.log("Returning cached product data");
                return JSON.parse(cached);
            }
            const products = await prisma.product.findMany({
                orderBy: {
                    id: 'asc'
                }
            });
            // Cache the new product data
            await redisClient.set(`products:list`, JSON.stringify(products), {
                EX: 60 * 60, // Cache for 1 hour
            });
            console.log("Product data cached");
            return products;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving product data: ${error.message}`);
            } else {
                throw new Error("Error retrieving product data: Unknown error");
            }
        }
    }

    static getProductById = async (id: number): Promise<Product | null> => {
        try {
            const cached = await redisClient.get(`product:${id}`);
            if (cached) {
                console.log("Returning cached product data by ID");
                return JSON.parse(cached);
            }
            const product = await prisma.product.findUnique({
                where: { id: id },
            });

            if (!product) {
                console.log(`Product with ID ${id} not found`);
                return null;
            }
            
            await redisClient.set(`product:${id}`, JSON.stringify(product), {
                EX: 60 * 60, // Cache for 1 hour
            });
            return product;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving product by ID: ${error.message}`);
            } else {
                throw new Error("Error retrieving product by ID: Unknown error");
            }
        }
    }

    static getProductExists = async (name: string): Promise<Product | null> => {
        try {
            const product = await prisma.product.findMany({
                where: { name: String(name) },
            });
            return product[0] || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving product by name: ${error.message}`);
            } else {
                throw new Error("Error retrieving product by name: Unknown error");
            }
        }
    }

    static updateProduct = async (id: number, productData: ProductCreateInput): Promise<Product> => {
        try {

            const [existingName] = await Promise.all([
                prisma.product.findFirst({
                    where: {
                        name: productData.name,
                        NOT: { id }
                    }
                })
            ]);

            if (existingName) {
                throw new Error('Product with this name already exists');
            }

            const updatedProduct = await prisma.product.update({
                where: { id: id },
                data: productData,
            });
            await this.clearProductCache(id);
            return updatedProduct;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error updating product: ${error.message}`);
            } else {
                throw new Error("Error updating product: Unknown error");
            }
        }
    }

    static deleteProduct = async (id: number): Promise<Product> => {
        try {
            const deletedProduct = await prisma.product.delete({
                where: { id: id },
            });
            await this.clearProductCache(id);
            return deletedProduct;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting product: ${error.message}`);
            } else {
                throw new Error("Error deleting product: Unknown error");
            }
        }
    }
}
