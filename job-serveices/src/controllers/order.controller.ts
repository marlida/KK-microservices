import { Request, Response } from "express";
import { orderService } from "../services/order.service";

export const createOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            name,
            adminId,
            productId,
            quantity,
            status,
            customer_issue,
            technician_issue,
            deposit,
            total,
        } = req.body;
        if (!name || !adminId || !productId) {
            res.status(400).json({
                message: "Invalid order data provided",
            });
            return;
        }

        const existingOrder = await orderService.getOrderExists(name);
        if (existingOrder) {
            res.status(400).json({
                message: "Order already exists",
            });
            return;
        }

        const newOrder = await orderService.createOrder({
            name,
            adminId: parseInt(adminId),
            productId: parseInt(productId),
            status,
            customer_issue, 
            technician_issue,
            deposit: parseFloat(deposit),
            total: parseFloat(total),
        });

        if (newOrder) {
            await orderService.decreaseProductQuantity(parseInt(productId), parseInt(quantity));
        }
        res.status(201).json({
            message: "Order created successfully",
            data: newOrder,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error creating order: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "Error creating order: Unknown error",
            });
        }
    }
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderData = await orderService.getOrder();
        res.status(200).json({
            message: "Order data retrieved successfully",
            data: orderData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving order data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "Error retrieving order data: Unknown error",
            });
        }
    }
};

export const getOrderById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "Order ID is required",
            });
            return;
        }

        const orderData = await orderService.getOrderById(parseInt(id));
        if (!orderData) {
            res.status(404).json({
                message: "Order not found",
            });
            return;
        }

        res.status(200).json({
            message: "Order data retrieved successfully",
            data: orderData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error retrieving order data: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "Error retrieving order data: Unknown error",
            });
        }
    }
};

export const updateOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, admin } = req.body;

        if (!id || !name || !admin) {
            res.status(400).json({
                message: "Invalid order data provided",
            });
            return;
        }

        const orderNotFound = await orderService.getOrderById(parseInt(id));
        if (!orderNotFound) {
            res.status(404).json({
                message: "Order not found",
            });
            return;
        }

        const existingOrder = await orderService.getOrderExists(name);
        if (existingOrder && existingOrder.id !== parseInt(id)) {
            res.status(400).json({
                message: "Order with this name already exists",
            });
            return;
        }

        const updatedOrder = await orderService.updateOrder(parseInt(id), {
            name,
            admin,
        });
        res.status(200).json({
            message: "Order updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error updating order: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "Error updating order: Unknown error",
            });
        }
    }
};

export const deleteOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "Order ID is required",
            });
            return;
        }

        const deletedOrder = await orderService.deleteOrder(parseInt(id));
        res.status(200).json({
            message: "Order deleted successfully",
            data: deletedOrder,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `Error deleting order: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "Error deleting order: Unknown error",
            });
        }
    }
};
