import { Router } from "express";
import { createBrand, deleteBrand, getBrand, getBrandById, updateBrand } from "../controllers/brand.controller";

const router = Router();

router.get("/brand", getBrand);
router.get("/brand/:id", getBrandById);
router.post("/brand", createBrand);
router.put("/brand/:id", updateBrand);
router.delete("/brand/:id", deleteBrand);

export default router;