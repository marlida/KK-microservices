import { Brand, BrandCreateInput } from "../types/brand";
import prisma from "../config/db";
import redisClient from "../config/redis";

export class brandService {
    private static clearBrandCache = async (id?: number) => {
        try {
            await redisClient.del("brands:list");
            
            if (id) {
                await redisClient.del(`brand:${id}`);
            }
        } catch (error) {
            console.error("Error clearing cache:", error);
        }
    }

    static createBrand = async (brandData: BrandCreateInput): Promise<Brand> => {
        try {
            const newBrand = await prisma.brand.create({
                data: brandData,
            });
            
            // Clear cache after creating
            await this.clearBrandCache();
            
            return newBrand;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating brand: ${error.message}`);
            } else {
                throw new Error("Error creating brand: Unknown error");
            }
        }
    }

    static getBrand = async (): Promise<Brand[]> => {
        try {
            // Try to get brands from cache
            const cached = await redisClient.get("brands:list");
            if (cached) {
                console.log("Brand data retrieved from cache");
                return JSON.parse(cached);
            }

            // If not cached, get from DB
            const brands = await prisma.brand.findMany({
                orderBy: {
                    id: 'asc'
                }
            });
            console.log("Brand data retrieved from database");

            // Cache the result
            await redisClient.set("brands:all", JSON.stringify(brands), {
                EX: 60 * 60, // Cache for 1 hour
            });
            return brands;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving brand data: ${error.message}`);
            } else {
                throw new Error("Error retrieving brand data: Unknown error");
            }
        }
    }

    static getBrandById = async (id: number, catId?: number): Promise<Brand | null> => {
        try {
            const cached = await redisClient.get(`brand:${id}`);
            if (cached) {
                console.log("Returning cached brand data by ID");
                return JSON.parse(cached);
            }

            console.log(`Retrieving brand with ID ${id} ${catId} from database`);
            const brand = await prisma.brand.findUnique({
                where: { id: id },
                include: {
                    categories: { where: { id: catId } },
                }
            });

            if (!brand) {
                console.log(`Brand with ID ${id} not found`);
                return null;
            }
            
            await redisClient.set(`brand:${id}`, JSON.stringify(brand), {
                EX: 60 * 60, // Cache for 1 hour
            });
            return brand;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving brand by ID: ${error.message}`);
            } else {
                throw new Error("Error retrieving brand by ID: Unknown error");
            }
        }
    }

    static getBrandExists = async (name: string): Promise<Brand | null> => {
        try {
            const brand = await prisma.brand.findMany({
                where: { name: String(name) },
            });
            return brand[0] || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error retrieving brand by name: ${error.message}`);
            } else {
                throw new Error("Error retrieving brand by name: Unknown error");
            }
        }
    }

    static updateBrand = async (id: number, brandData: BrandCreateInput): Promise<Brand> => {
        try {
            const existingName = await prisma.brand.findFirst({
                where: {
                    name: brandData.name,
                    NOT: { id }
                }
            });

            if (existingName) {
                throw new Error('Brand with this name already exists');
            }

            const updatedBrand = await prisma.brand.update({
                where: { id: id },
                data: brandData,
            });
            
            // Clear cache after updating
            await this.clearBrandCache(id);
            
            return updatedBrand;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error updating brand: ${error.message}`);
            } else {
                throw new Error("Error updating brand: Unknown error");
            }
        }
    }

    static deleteBrand = async (id: number): Promise<Brand> => {
        try {
            const deletedBrand = await prisma.brand.delete({
                where: { id: id },
            });
            
            // Clear cache after deleting
            await this.clearBrandCache(id);
            
            return deletedBrand;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting brand: ${error.message}`);
            } else {
                throw new Error("Error deleting brand: Unknown error");
            }
        }
    }
}