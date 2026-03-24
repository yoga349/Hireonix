import express from 'express';
import {register,login,getMe} from '..controllers/authController.js';
const router = express.Router();
import {protect} from '..middlewares/authMiddleware.js';

router.post("/register",register);
router.post("/login",login);
router.get("/me", protect, getMe);

export default router;
