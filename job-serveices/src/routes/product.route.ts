import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controllers/product.controller";

const router = Router();

router.get("/product", getProduct);
router.get("/product/:id/:catId", getProductById);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;