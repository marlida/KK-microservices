import { Brand, BrandCreateInput } from "../types/brand";
import prisma from "../config/db";
import redisClient, { clearCache } from "../config/redis";

export class brandService {

    static createBrand = async (brandData: BrandCreateInput): Promise<Brand> => {
        try {
            const newBrand = await prisma.brand.create({
                data: brandData,
            });
            
            // Clear cache after creating
            await clearCache();
            
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

    static getBrandById = async (id: number, options?: { catId?: number; prodId?: number; include?: 'categories' | 'products' | 'both' }): Promise<Brand | null> => {
        try {
            const cacheKey = `brand:${id}:${options?.include || 'basic'}:${options?.catId || ''}:${options?.prodId || ''}`;
            const cached = await redisClient.get(cacheKey);
            
            if (cached) {
                console.log("Returning cached brand data by ID");
                return JSON.parse(cached);
            }

            console.log(`Retrieving brand with ID ${id} from database`);
            
            // สร้าง include object ตาม options
            let includeOptions: any = {};
            
            if (options?.include === 'categories' || options?.include === 'both') {
                includeOptions.categories = options?.catId 
                    ? { where: { id: options.catId } }
                    : true;
            }
            
            if (options?.include === 'products' || options?.include === 'both') {
                includeOptions.products = options?.prodId 
                    ? { where: { id: options.prodId } }
                    : true;
            }

            const brand = await prisma.brand.findUnique({
                where: { id: id },
                include: includeOptions
            });

            if (!brand) {
                console.log(`Brand with ID ${id} not found`);
                return null;
            }
            
            await redisClient.set(cacheKey, JSON.stringify(brand), {
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
            await clearCache();

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
            await clearCache();

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