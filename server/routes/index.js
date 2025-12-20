import { Router } from "express";
import swaggerUi from 'swagger-ui-express';

import specs from "../config/swagger.js";
import authRouter from "./authRoute.js";
import userRoute from "./userRouts.js";
import productRoute from './productRoute.js'; 
import brandRoute from './brandRoute.js'; 
import categoryRoute from './categoryRoute.js'; 
import bannerRoutes from './bannerRoutes.js'
import statsRoutes from './statsRoutes.js'; 
import orderRoutes from './orderRoutes.js'; 
import wishlistRoutes from './wishlistRoutes.js'; 

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRoute); 
router.use("/brands", brandRoute); 
router.use("/category", categoryRoute); 
router.use("/products", productRoute); 
router.use("/banners", bannerRoutes); 
router.use("/stats", statsRoutes); 
router.use("/orders", orderRoutes); 
router.use("/wishlist", wishlistRoutes); 




router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true, 
    customCss: ".swagger-ui .topbar {display: none}", 
    customSiteTitle: "SK_Store API Documentation", 
})); 

export default router;
