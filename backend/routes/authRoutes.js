import express from 'express';
import {register,login,getMe} from '../controllers/authController.js';
const router = express.Router();
import {protect} from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

router.post("/register",register);
router.post("/login",login);
router.get("/me", protect, getMe);

router.post("/upload-image",upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"no file uploaded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});

});
export default router;
