import { Router } from "express";
import { createOrder, deleteOrder, getOrder, getOrderById, updateOrder } from "../controllers/order.controller";

const router = Router();

router.get("/order", getOrder);
router.get("/order/:id", getOrderById);
router.post("/order", createOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

export default router;