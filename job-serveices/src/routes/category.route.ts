import { Router } from "express";
import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../controllers/category.controller";

const router = Router();

router.get("/category", getCategory);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

export default router;