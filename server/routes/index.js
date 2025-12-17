import { Router } from "express";
import authRouter from "./authRoute.js";
import userRoute from "./userRouts.js"
import swaggerUi from 'swagger-ui-express';
import specs from "../config/swagger.js";


const router = Router();

router.use("/auth", authRouter);

router.use("/users", userRoute); 



router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true, 
    customCss: ".swagger-ui .topbar {display: none}", 
    customSiteTitle: "SK_Store API Documentation", 
})); 

export default router;
