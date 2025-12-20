import { Router } from "express"; 
import { protect } from "../middleware/authMiddleware.js";
import { getStats } from "../controllers/statsControllers.js";

const router = Router(); 

router.get("/", protect, getStats); 

export default router; 