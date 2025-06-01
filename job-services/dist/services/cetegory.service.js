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
exports.categoryService = void 0;
const db_1 = __importDefault(require("../config/db"));
const redis_1 = __importStar(require("../config/redis"));
class categoryService {
}
exports.categoryService = categoryService;
_a = categoryService;
categoryService.createCategory = async (categoryData) => {
    try {
        if (categoryData.brandId) {
            const brandExists = await db_1.default.brand.findUnique({
                where: { id: categoryData.brandId }
            });
            if (!brandExists) {
                throw new Error(`Brand with ID ${categoryData.brandId} does not exist`);
            }
        }
        const newCategory = await db_1.default.category.create({
            data: {
                name: categoryData.name,
                brandId: categoryData.brandId
            }
        });
        await (0, redis_1.clearRelatedProductCache)();
        return newCategory;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating category: ${error.message}`);
        }
        else {
            throw new Error("Error creating category: Unknown error");
        }
    }
};
categoryService.getCategory = async () => {
    try {
        const cached = await redis_1.default.get(`categories:list`);
        if (cached) {
            console.log("Returning cached category data");
            return JSON.parse(cached);
        }
        const categories = await db_1.default.category.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        // Cache the new category data
        await redis_1.default.set(`category:list`, JSON.stringify(categories), {
            EX: 60 * 60, // Cache for 1 hour
        });
        console.log("Category data cached");
        return categories;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving category data: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving category data: Unknown error");
        }
    }
};
categoryService.getCategoryById = async (id) => {
    try {
        const cached = await redis_1.default.get(`category:${id}`);
        if (cached) {
            console.log("Returning cached category data by ID");
            return JSON.parse(cached);
        }
        const category = await db_1.default.category.findUnique({
            where: { id: id },
            include: {
                brand: true,
            }
        });
        if (!category) {
            console.log(`Category with ID ${id} not found`);
            return null;
        }
        await redis_1.default.set(`category:${id}`, JSON.stringify(category), {
            EX: 60 * 60, // Cache for 1 hour
        });
        return category;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving category by ID: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving category by ID: Unknown error");
        }
    }
};
categoryService.getCategoryExists = async (name) => {
    try {
        const category = await db_1.default.category.findMany({
            where: { name: String(name) },
        });
        return category[0] || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving category by name: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving category by name: Unknown error");
        }
    }
};
categoryService.updateCategory = async (id, categoryData) => {
    try {
        const [existingName] = await Promise.all([
            db_1.default.category.findFirst({
                where: {
                    name: categoryData.name,
                    NOT: { id }
                }
            })
        ]);
        if (existingName) {
            throw new Error('Category with this name already exists');
        }
        const updatedCategory = await db_1.default.category.update({
            where: { id: id },
            data: categoryData,
        });
        await (0, redis_1.clearRelatedProductCache)();
        return updatedCategory;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error updating category: ${error.message}`);
        }
        else {
            throw new Error("Error updating category: Unknown error");
        }
    }
};
categoryService.deleteCategory = async (id) => {
    try {
        const deletedCategory = await db_1.default.category.delete({
            where: { id: id },
        });
        await (0, redis_1.clearRelatedProductCache)();
        return deletedCategory;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
        else {
            throw new Error("Error deleting category: Unknown error");
        }
    }
};
