import { Order, OrderCreateInput } from "../types/order";
import prisma from "../config/db";
import redisClient, { clearRelatedProductCache } from "../config/redis";

export class orderService {
    static decreaseProductQuantity = async (
        productId: number,
        quantity: number
    ): Promise<void> => {
        try {
            const product = await prisma.product.findUnique({
                where: { id: productId },
            });

            if (!product) {
                throw new Error("Product not found");
            }

            if (product.quantity === null || product.quantity < quantity) {
                throw new Error("Insufficient product quantity");
            }

            await prisma.product.update({
                where: { id: productId },
                data: {
                    quantity: product.quantity - quantity,
                    sold: (product.sold ?? 0) + quantity,
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Error decreasing product quantity: ${error.message}`
                );
            }
            throw new Error("Error decreasing product quantity: Unknown error");
        }
    };

    static createOrder = async (orderData: {
        name: string;
        adminId: number;
        productId: number;
        status: string;
        customer_issue: string;
        technician_issue: string;
        deposit: number;
        total: number;
    }): Promise<Order> => {
        try {
            const newOrder = await prisma.order.create({
                data: orderData,
            });

            // Clear cache after creating
            await clearRelatedProductCache();

            return newOrder;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error creating order: ${error.message}`);
            } else {
                throw new Error("Error creating order: Unknown error");
            }
        }
    };

    static getOrder = async (): Promise<Order[]> => {
        try {
            // Try to get orders from cache
            const cached = await redisClient.get("orders:list");
            if (cached) {
                console.log("Order data retrieved from cache");
                return JSON.parse(cached);
            }

            // If not cached, get from DB
            const orders = await prisma.order.findMany({
                orderBy: {
                    id: "asc",
                },
            });
            console.log("Order data retrieved from database");

            // Cache the result
            await redisClient.set("orders:list", JSON.stringify(orders), {
                EX: 60 * 60, // Cache for 1 hour
            });
            return orders;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Error retrieving order data: ${error.message}`
                );
            } else {
                throw new Error("Error retrieving order data: Unknown error");
            }
        }
    };

    static getOrderById = async (id: number): Promise<Order | null> => {
        try {
            const cached = await redisClient.get(`order:${id}`);

            if (cached) {
                console.log("Returning cached order data by ID");
                return JSON.parse(cached);
            }

            console.log(`Retrieving order with ID ${id} from database`);

            const order = await prisma.order.findUnique({
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

            await redisClient.set(`order:${id}`, JSON.stringify(order), {
                EX: 60 * 60, // Cache for 1 hour
            });

            return order;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Error retrieving order by ID: ${error.message}`
                );
            } else {
                throw new Error("Error retrieving order by ID: Unknown error");
            }
        }
    };

    static getOrderExists = async (
        orderNumber: string
    ): Promise<Order | null> => {
        try {
            const order = await prisma.order.findMany({
                where: { name: String(orderNumber) },
            });
            return order[0] || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    `Error retrieving order by number: ${error.message}`
                );
            } else {
                throw new Error(
                    "Error retrieving order by number: Unknown error"
                );
            }
        }
    };

    static updateOrder = async (
        { id }: { id: number },
        orderData: {
            name: string;
            adminId: number;
            productId: number;
            status: string;
            customer_issue: string;
            technician_issue: string;
            deposit: number;
            total: number;
        }
    ): Promise<Order> => {
        try {
            const existingOrderName = await prisma.order.findFirst({
                where: {
                    name: orderData.name,
                    NOT: { id },
                },
            });

            if (existingOrderName) {
                throw new Error("Order with this name already exists");
            }

            const updatedOrder = await prisma.order.update({
                where: { id: id },
                data: orderData,
            });

            // Clear cache after updating
            await clearRelatedProductCache();

            return updatedOrder;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error updating order: ${error.message}`);
            } else {
                throw new Error("Error updating order: Unknown error");
            }
        }
    };

    static deleteOrder = async (id: number): Promise<Order> => {
        try {
            const deletedOrder = await prisma.order.delete({
                where: { id: id },
            });

            // Clear cache after deleting
            await clearRelatedProductCache();

            return deletedOrder;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error deleting order: ${error.message}`);
            } else {
                throw new Error("Error deleting order: Unknown error");
            }
        }
    };
}
