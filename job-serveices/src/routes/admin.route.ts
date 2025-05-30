import { Router } from "express";
import { createAdmin, deleteAdmin, getAdmin } from "../controllers/admin.controller";

const router = Router();

router.get("/admin", getAdmin);
router.get("/admin/:id", getAdmin); 
router.post("/admin", createAdmin);
router.delete("/admin/:id", deleteAdmin);

export default router;