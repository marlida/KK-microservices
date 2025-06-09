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
            userId,
            status,
            customer_issue,
            technician_issue,
            deposit,
            total,
        } = req.body;
        if (!name || !adminId || !productId) {
            res.status(400).json({
                message: "ข้อมูลออเดอร์ไม่ถูกต้อง",
            });
            return;
        }

        const existingOrder = await orderService.getOrderExists(name);
        if (existingOrder) {
            res.status(400).json({
                message: "มีออเดอร์นี้อยู่แล้ว",
            });
            return;
        }

        const newOrder = await orderService.createOrder({
            name,
            adminId: parseInt(adminId),
            productId: parseInt(productId),
            userId: parseInt(userId),
            quantity: parseInt(quantity),
            status,
            customer_issue,
            technician_issue,
            deposit: parseFloat(deposit),
            total: parseFloat(total),
        });

        if (newOrder) {
            await orderService.decreaseProductQuantity(
                parseInt(productId),
                parseInt(quantity)
            );
        }
        res.status(201).json({
            message: "สร้างออเดอร์สำเร็จ",
            data: newOrder,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการสร้างออเดอร์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการสร้างออเดอร์: ไม่ทราบสาเหตุ",
            });
        }
    }
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderData = await orderService.getOrder();
        res.status(200).json({
            message: "ดึงข้อมูลออเดอร์สำเร็จ",
            data: orderData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์: ไม่ทราบสาเหตุ",
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
                message: "กรุณาระบุรหัสออเดอร์",
            });
            return;
        }

        const orderData = await orderService.getOrderById(parseInt(id));
        if (!orderData) {
            res.status(404).json({
                message: "ไม่พบออเดอร์",
            });
            return;
        }

        res.status(200).json({
            message: "ดึงข้อมูลออเดอร์สำเร็จ",
            data: orderData,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์: ไม่ทราบสาเหตุ",
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
        const {
            name,
            adminId,
            productId,
            status,
            customer_issue,
            technician_issue,
            deposit,
            total,
        } = req.body;

        if (!id || !name || !adminId || !productId) {
            res.status(400).json({
                message: "ข้อมูลออเดอร์ไม่ถูกต้อง",
            });
            return;
        }

        const orderNotFound = await orderService.getOrderById(parseInt(id));
        if (!orderNotFound) {
            res.status(404).json({
                message: "ไม่พบออเดอร์",
            });
            return;
        }

        const existingOrder = await orderService.getOrderExists(name);
        if (existingOrder && existingOrder.id !== parseInt(id)) {
            res.status(400).json({
                message: "มีออเดอร์ชื่อนี้อยู่แล้ว",
            });
            return;
        }

        const updatedOrder = await orderService.updateOrder(
            { id: parseInt(id) },
            {
                name,
                adminId: parseInt(adminId),
                productId: parseInt(productId),
                status,
                customer_issue,
                technician_issue,
                deposit: parseFloat(deposit),
                total: parseFloat(total),
            }
        );
        res.status(200).json({
            message: "แก้ไขออเดอร์สำเร็จ",
            data: updatedOrder,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการแก้ไขออเดอร์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการแก้ไขออเดอร์: ไม่ทราบสาเหตุ",
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
                message: "กรุณาระบุรหัสออเดอร์",
            });
            return;
        }

        const deletedOrder = await orderService.deleteOrder(parseInt(id));
        res.status(200).json({
            message: "ลบออเดอร์สำเร็จ",
            data: deletedOrder,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการลบออเดอร์: ${error.message}`,
            });
        } else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการลบออเดอร์: ไม่ทราบสาเหตุ",
            });
        }
    }
};
