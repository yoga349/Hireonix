import express from 'express'
import {
    saveJob,
    unsaveJob,
    getMySavedJobs,
} from "../controllers/savedJob.js";
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/:jobId",protect,saveJob);
router.delete("/:jobId",protect,unsaveJob);
router.get("/my",protect,getMySavedJobs);

export default router;
