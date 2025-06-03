import { Category, CategoryCreateInput } from "../types/category";
import prisma from "../config/db";
import redisClient, { clearRelatedProductCache } from "../config/redis";

export class categoryService {
    static createCategory = async (categoryData: { name?: string; brandId?: number }): Promise<Category> => {
        try {
            if (categoryData.brandId) {
                const brandExists = await prisma.brand.findUnique({
                    where: { id: categoryData.brandId }
                });

                if (!brandExists) {
                    throw new Error(`Brand with ID ${categoryData.brandId} does not exist`);
                }
            }

            const newCategory = await prisma.category.create({
                data: {
                    name: categoryData.name,
                    brandId: categoryData.brandId
                }
            });
            
            await clearRelatedProductCache();
            
            return newCategory;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating category: ${error.message}`);
            } else {
                throw new Error("Error creating category: Unknown error");
            }
        }
    }

    static getCategory = async (): Promise<Category[]> => {
        try {
            const cached = await redisClient.get(`categories:list`);

            if (cached) {
                console.log("Returning cached category data");
                return JSON.parse(cached);
            }
            const categories = await prisma.category.findMany({
                orderBy: {
                    id: 'asc'
                },
                include: {
                    brand: true,
                }
            });
            // Cache the new category data
            await redisClient.set(`category:list`, JSON.stringify(categories), {
                EX: 60 * 60, // Cache for 1 hour
            });
            console.log("Category data cached");
            return categories;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving category data: ${error.message}`);
            } else {
                throw new Error("Error retrieving category data: Unknown error");
            }
        }
    }

    static getCategoryById = async (id: number): Promise<Category | null> => {
        try {
            const cached = await redisClient.get(`category:${id}`);
            if (cached) {
                console.log("Returning cached category data by ID");
                return JSON.parse(cached);
            }
            const category = await prisma.category.findUnique({
                where: { id: id },
                include: {
                    brand: true, 
                }
            });

            if (!category) {
                console.log(`Category with ID ${id} not found`);
                return null;
            }
            
            await redisClient.set(`category:${id}`, JSON.stringify(category), {
                EX: 60 * 60, // Cache for 1 hour
            });
            return category;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving category by ID: ${error.message}`);
            } else {
                throw new Error("Error retrieving category by ID: Unknown error");
            }
        }
    }

    static getCategoryExists = async (name: string): Promise<Category | null> => {
        try {
            const category = await prisma.category.findMany({
                where: { name: String(name) },
            });
            return category[0] || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving category by name: ${error.message}`);
            } else {
                throw new Error("Error retrieving category by name: Unknown error");
            }
        }
    }

    static updateCategory = async (id: number, categoryData: CategoryCreateInput): Promise<Category> => {
        try {

            const [existingName] = await Promise.all([
                prisma.category.findFirst({
                    where: {
                        name: categoryData.name,
                        NOT: { id }
                    }
                })
            ]);

            if (existingName) {
                throw new Error('Category with this name already exists');
            }

            const updatedCategory = await prisma.category.update({
                where: { id: id },
                data: categoryData,
            });
            await clearRelatedProductCache();
            return updatedCategory;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error updating category: ${error.message}`);
            } else {
                throw new Error("Error updating category: Unknown error");
            }
        }
    }

    static deleteCategory = async (id: number): Promise<Category> => {
        try {
            const deletedCategory = await prisma.category.delete({
                where: { id: id },
            });
            await clearRelatedProductCache();
            return deletedCategory;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting category: ${error.message}`);
            } else {
                throw new Error("Error deleting category: Unknown error");
            }
        }
    }
}
