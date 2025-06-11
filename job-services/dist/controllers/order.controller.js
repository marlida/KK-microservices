"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getOrder = exports.createOrder = void 0;
const order_service_1 = require("../services/order.service");
const createOrder = async (req, res) => {
    try {
        const { name, adminId, productId, quantity, userId, status, customer_issue, technician_issue, deposit, total, } = req.body;
        if (!name || !adminId || !productId) {
            res.status(400).json({
                message: "ข้อมูลออเดอร์ไม่ถูกต้อง",
            });
            return;
        }
        const existingOrder = await order_service_1.orderService.getOrderExists(name);
        if (existingOrder) {
            res.status(400).json({
                message: "มีออเดอร์นี้อยู่แล้ว",
            });
            return;
        }
        const newOrder = await order_service_1.orderService.createOrder({
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
            await order_service_1.orderService.decreaseProductQuantity(parseInt(productId), parseInt(quantity));
        }
        res.status(201).json({
            message: "สร้างออเดอร์สำเร็จ",
            data: newOrder,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการสร้างออเดอร์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการสร้างออเดอร์: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.createOrder = createOrder;
const getOrder = async (req, res) => {
    try {
        const orderData = await order_service_1.orderService.getOrder();
        res.status(200).json({
            message: "ดึงข้อมูลออเดอร์สำเร็จ",
            data: orderData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.getOrder = getOrder;
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "กรุณาระบุรหัสออเดอร์",
            });
            return;
        }
        const orderData = await order_service_1.orderService.getOrderById(parseInt(id));
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.getOrderById = getOrderById;
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, adminId, productId, status, customer_issue, technician_issue, deposit, total, } = req.body;
        if (!id || !name || !adminId || !productId) {
            res.status(400).json({
                message: "ข้อมูลออเดอร์ไม่ถูกต้อง",
            });
            return;
        }
        const orderNotFound = await order_service_1.orderService.getOrderById(parseInt(id));
        if (!orderNotFound) {
            res.status(404).json({
                message: "ไม่พบออเดอร์",
            });
            return;
        }
        const existingOrder = await order_service_1.orderService.getOrderExists(name);
        if (existingOrder && existingOrder.id !== parseInt(id)) {
            res.status(400).json({
                message: "มีออเดอร์ชื่อนี้อยู่แล้ว",
            });
            return;
        }
        const updatedOrder = await order_service_1.orderService.updateOrder({ id: parseInt(id) }, {
            name,
            adminId: parseInt(adminId),
            productId: parseInt(productId),
            status,
            customer_issue,
            technician_issue,
            deposit: parseFloat(deposit),
            total: parseFloat(total),
        });
        res.status(200).json({
            message: "แก้ไขออเดอร์สำเร็จ",
            data: updatedOrder,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการแก้ไขออเดอร์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการแก้ไขออเดอร์: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({
                message: "กรุณาระบุรหัสออเดอร์",
            });
            return;
        }
        const deletedOrder = await order_service_1.orderService.deleteOrder(parseInt(id));
        res.status(200).json({
            message: "ลบออเดอร์สำเร็จ",
            data: deletedOrder,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: `เกิดข้อผิดพลาดในการลบออเดอร์: ${error.message}`,
            });
        }
        else {
            res.status(500).json({
                message: "เกิดข้อผิดพลาดในการลบออเดอร์: ไม่ทราบสาเหตุ",
            });
        }
    }
};
exports.deleteOrder = deleteOrder;
