import express from "express";
import dotenv from "dotenv"; 
import { errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors"; 
import ConnectDB from "./config/db.js";
import router from "./routes/index.js";
// import router from "./routes/authRoute.js";
// import swaggerUi from 'swagger-ui-express';
// import specs from "./config/swagger.js";

dotenv.config(); 
const app = express(); 


const allowedOrigins = [
    process.env.ADMIN_URL,
    process.env.CLIENT_URL,


    "http://localhost:3000",
    "https://localhost:5173",
].filter(Boolean); 

ConnectDB();

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (process.env.NODE_ENV === "development") {
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by cors"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
})); 

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true })); 


app.use("/api/v1", router)
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs, {
//     explorer: true, 
//     customCss: ".swagger-ui .topbar {display: none}", 
//     customSiteTitle: "SK_Store API Documentation", 
// })); 

// app.get("/", (req, res) => {
    
// })


app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.env.NODE_ENV || "development",
    });
}); 

app.use(errorHandler); 

const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
    console.log(`\n Server is running at http://localhost:8000`);
})