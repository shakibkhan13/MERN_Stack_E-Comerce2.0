import { Router } from "express";
import { createBanners, deleteBanner, getBannerById, getBanners, updateBanner } from "../controllers/bannerController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = Router(); 

router.route("/")
    .get(getBanners)
    .post(protect, admin, createBanners); 
    
router.route("/:id")
    .get(protect, getBannerById)
    .put(protect, admin, updateBanner)
    .delete(protect, admin, deleteBanner); 


export default router; 

