import express from "express";
import {
    updateProfile,
    deleteResume,
    getPublicProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/profile",protect,updateProfile);
router.post("/resume",protect,deleteResume);

router.get("/:id",getPublicProfile);

export default router;
