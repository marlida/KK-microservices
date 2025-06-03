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
exports.orderService = void 0;
const db_1 = __importDefault(require("../config/db"));
const redis_1 = __importStar(require("../config/redis"));
class orderService {
}
exports.orderService = orderService;
_a = orderService;
orderService.decreaseProductQuantity = async (productId, quantity) => {
    try {
        const product = await db_1.default.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new Error("Product not found");
        }
        if (product.quantity === null || product.quantity < quantity) {
            throw new Error("Insufficient product quantity");
        }
        await db_1.default.product.update({
            where: { id: productId },
            data: {
                quantity: product.quantity - quantity,
                sold: (product.sold ?? 0) + quantity,
            },
        });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error decreasing product quantity: ${error.message}`);
        }
        throw new Error("Error decreasing product quantity: Unknown error");
    }
};
orderService.createOrder = async (orderData) => {
    try {
        const newOrder = await db_1.default.order.create({
            data: orderData,
        });
        // Clear cache after creating
        await (0, redis_1.clearRelatedProductCache)();
        return newOrder;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating order: ${error.message}`);
        }
        else {
            throw new Error("Error creating order: Unknown error");
        }
    }
};
orderService.getOrder = async () => {
    try {
        // Try to get orders from cache
        const cached = await redis_1.default.get("orders:list");
        if (cached) {
            console.log("Order data retrieved from cache");
            return JSON.parse(cached);
        }
        // If not cached, get from DB
        const orders = await db_1.default.order.findMany({
            orderBy: {
                id: "asc",
            },
            include: {
                product: {
                    select: {
                        name: true,
                        serial: true
                    },
                },
                admin: {
                    select: {
                        name: true,
                    },
                }
            }
        });
        console.log("Order data retrieved from database");
        // Cache the result
        await redis_1.default.set("orders:list", JSON.stringify(orders), {
            EX: 60 * 60, // Cache for 1 hour
        });
        return orders;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving order data: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving order data: Unknown error");
        }
    }
};
orderService.getOrderById = async (id) => {
    try {
        const cached = await redis_1.default.get(`order:${id}`);
        if (cached) {
            console.log("Returning cached order data by ID");
            return JSON.parse(cached);
        }
        console.log(`Retrieving order with ID ${id} from database`);
        const order = await db_1.default.order.findUnique({
            where: { id: id },
            include: {
                product: true,
                admin: true,
            },
        });
        if (!order) {
            console.log(`Order with ID ${id} not found`);
            return null;
        }
        await redis_1.default.set(`order:${id}`, JSON.stringify(order), {
            EX: 60 * 60, // Cache for 1 hour
        });
        return order;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving order by ID: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving order by ID: Unknown error");
        }
    }
};
orderService.getOrderExists = async (orderNumber) => {
    try {
        const order = await db_1.default.order.findMany({
            where: { name: String(orderNumber) },
        });
        return order[0] || null;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving order by number: ${error.message}`);
        }
        else {
            throw new Error("Error retrieving order by number: Unknown error");
        }
    }
};
orderService.updateOrder = async ({ id }, orderData) => {
    try {
        const existingOrderName = await db_1.default.order.findFirst({
            where: {
                name: orderData.name,
                NOT: { id },
            },
        });
        if (existingOrderName) {
            throw new Error("Order with this name already exists");
        }
        const updatedOrder = await db_1.default.order.update({
            where: { id: id },
            data: orderData,
        });
        // Clear cache after updating
        await (0, redis_1.clearRelatedProductCache)();
        return updatedOrder;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error updating order: ${error.message}`);
        }
        else {
            throw new Error("Error updating order: Unknown error");
        }
    }
};
orderService.deleteOrder = async (id) => {
    try {
        const deletedOrder = await db_1.default.order.delete({
            where: { id: id },
        });
        // Clear cache after deleting
        await (0, redis_1.clearRelatedProductCache)();
        return deletedOrder;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error deleting order: ${error.message}`);
        }
        else {
            throw new Error("Error deleting order: Unknown error");
        }
    }
};
