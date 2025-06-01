"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandService = void 0;
const db_1 = __importDefault(require("../config/db"));
const redis_1 = __importStar(require("../config/redis"));
class brandService {
}
exports.brandService = brandService;
_a = brandService;
brandService.createBrand = async (brandData) => {
    try {
        const newBrand = await db_1.default.brand.create({
            data: brandData,
        });
        // Clear cache after creating
        await (0, redis_1.clearRelatedProductCache)();
        return newBrand;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating brand: ${error.message}`);
        }
        else {
            throw new Error("Error creating brand: Unknown error");
        }
    }
};
brandService.getBrand = async () => {
    try {
        // Try to get brands from cache
        const cached = await redis_1.default.get("brands:list");
        if (cached) {
            console.log("Brand data retrieved from cache");
            return JSON.parse(cached);
        }
        // If not cached, get from DB
        const brands = await db_1.default.brand.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        console.log("Brand data retrieved from database");
        // Cache the result
        await redis_1.default.set("brands:list", JSON.stringify(brands), {
            EX: 60 * 60, // Cache for 1 hour
        });
        return brands;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving brand data: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving brand data: Unknown error");
        }
    }
};
brandService.getBrandById = async (id, options) => {
    try {
        const cacheKey = `brand:${id}:${options?.include || 'onlybrand'}:${options?.catId || ''}:${options?.prodId || ''}`;
        const cached = await redis_1.default.get(cacheKey);
        if (cached) {
            console.log("Returning cached brand data by ID");
            return JSON.parse(cached);
        }
        console.log(`Retrieving brand with ID ${id} from database`);
        // สร้าง include object ตาม options
        let includeOptions = {};
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
        const brand = await db_1.default.brand.findUnique({
            where: { id: id },
            include: includeOptions
        });
        if (!brand) {
            console.log(`Brand with ID ${id} not found`);
            return null;
        }
        await redis_1.default.set(cacheKey, JSON.stringify(brand), {
            EX: 60 * 60, // Cache for 1 hour
        });
        return brand;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving brand by ID: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving brand by ID: Unknown error");
        }
    }
};
brandService.getBrandExists = async (name) => {
    try {
        const brand = await db_1.default.brand.findMany({
            where: { name: String(name) },
        });
        return brand[0] || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving brand by name: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving brand by name: Unknown error");
        }
    }
};
brandService.updateBrand = async (id, brandData) => {
    try {
        const existingName = await db_1.default.brand.findFirst({
            where: {
                name: brandData.name,
                NOT: { id }
            }
        });
        if (existingName) {
            throw new Error('Brand with this name already exists');
        }
        const updatedBrand = await db_1.default.brand.update({
            where: { id: id },
            data: brandData,
        });
        // Clear cache after updating
        await (0, redis_1.clearRelatedProductCache)();
        return updatedBrand;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error updating brand: ${error.message}`);
        }
        else {
            throw new Error("Error updating brand: Unknown error");
        }
    }
};
brandService.deleteBrand = async (id) => {
    try {
        const deletedBrand = await db_1.default.brand.delete({
            where: { id: id },
        });
        // Clear cache after deleting
        await (0, redis_1.clearRelatedProductCache)();
        return deletedBrand;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error deleting brand: ${error.message}`);
        }
        else {
            throw new Error("Error deleting brand: Unknown error");
        }
    }
};
