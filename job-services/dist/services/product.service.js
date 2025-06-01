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
exports.productService = void 0;
const db_1 = __importDefault(require("../config/db"));
const redis_1 = __importStar(require("../config/redis"));
class productService {
}
exports.productService = productService;
_a = productService;
productService.createProduct = async (productData) => {
    try {
        if (productData.categoryId) {
            const categoryExists = await db_1.default.category.findUnique({
                where: { id: productData.categoryId },
            });
            if (!categoryExists) {
                throw new Error(`Category with ID ${productData.categoryId} does not exist`);
            }
        }
        const existingSerial = await db_1.default.product.findFirst({
            where: { serial: productData.serial },
        });
        if (existingSerial) {
            throw new Error(`Product with serial ${productData.serial} already exists`);
        }
        if (productData.brandId) {
            const brandExists = await db_1.default.brand.findUnique({
                where: { id: productData.brandId },
            });
            if (!brandExists) {
                throw new Error(`Brand with ID ${productData.brandId} does not exist`);
            }
        }
        const newProduct = await db_1.default.product.create({
            data: {
                name: productData.name,
                price: productData.price,
                serial: productData.serial,
                description: productData.description,
                categoryId: productData.categoryId,
                quantity: productData.quantity,
                brandId: productData.brandId,
            },
        });
        await (0, redis_1.clearRelatedProductCache)();
        return newProduct;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
        else {
            throw new Error("Error creating product: Unknown error");
        }
    }
};
productService.getProduct = async () => {
    try {
        const cached = await redis_1.default.get(`products:list`);
        if (cached) {
            console.log("Returning cached product data");
            return JSON.parse(cached);
        }
        const products = await db_1.default.product.findMany({
            orderBy: {
                id: "asc",
            },
        });
        // Cache the new product data
        await redis_1.default.set(`products:list`, JSON.stringify(products), {
            EX: 60 * 60, // Cache for 1 hour
        });
        console.log("Product data cached");
        return products;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving product data: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving product data: Unknown error");
        }
    }
};
productService.getProductById = async (id) => {
    try {
        const cached = await redis_1.default.get(`product:${id}`);
        if (cached) {
            console.log("Returning cached product data by ID");
            return JSON.parse(cached);
        }
        const product = await db_1.default.product.findUnique({
            where: { id: id },
            include: {
                category: true,
                brand: true,
            },
        });
        if (!product) {
            console.log(`Product with ID ${id} not found`);
            return null;
        }
        await redis_1.default.set(`product:${id}`, JSON.stringify(product), {
            EX: 60 * 60, // Cache for 1 hour
        });
        return product;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving product by ID: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving product by ID: Unknown error");
        }
    }
};
productService.getProductExists = async (name) => {
    try {
        const product = await db_1.default.product.findMany({
            where: { name: String(name) },
        });
        return product[0] || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving product by name: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving product by name: Unknown error");
        }
    }
};
productService.updateProduct = async (id, productData) => {
    try {
        const [existingName] = await Promise.all([
            db_1.default.product.findFirst({
                where: {
                    name: productData.name,
                    NOT: { id },
                },
            }),
        ]);
        if (existingName) {
            throw new Error("Product with this name already exists");
        }
        const updatedProduct = await db_1.default.product.update({
            where: { id: id },
            data: productData,
        });
        await (0, redis_1.clearRelatedProductCache)();
        return updatedProduct;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
        else {
            throw new Error("Error updating product: Unknown error");
        }
    }
};
productService.deleteProduct = async (id) => {
    try {
        const deletedProduct = await db_1.default.product.delete({
            where: { id: id },
        });
        await (0, redis_1.clearRelatedProductCache)();
        return deletedProduct;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
        else {
            throw new Error("Error deleting product: Unknown error");
        }
    }
};
