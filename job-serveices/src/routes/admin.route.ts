import { Router } from "express";
import { createAdmin, deleteAdmin, getAdmin,updateAdmin } from "../controllers/admin.controller";

const router = Router();

router.get("/admin", getAdmin);
router.get("/admin/:id", getAdmin); 
router.post("/admin", createAdmin);
router.put("/admin/:id", updateAdmin); // Assuming update is handled by the same controller
router.delete("/admin/:id", deleteAdmin);

export default router;