import { Router } from "express";
import { createUser, getUser, deleteUser, updateUser, getUserById } from "../controllers/user.controller";

const router = Router();

router.get("/user", getUser);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", updateUser); 
router.delete("/user/:id", deleteUser);

export default router;