import { Router } from "express";
import { createAdmin, deleteAdmin, getAdmin, getAdminById, updateAdmin } from "../controllers/admin.controller";

const router = Router();

router.get("/admin", getAdmin);
router.get("/admin/:id", getAdminById);
router.post("/admin", createAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);

export default router;