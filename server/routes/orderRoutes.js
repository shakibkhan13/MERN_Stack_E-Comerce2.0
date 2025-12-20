import { Router } from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { createOrderFormCart, deleteOrder, getAllOrdersAdmin, getOrder, getOrderById, updateOrderStatus } from "../controllers/orderController.js";

const router = Router(); 

router.route("/admin")
    .get(protect, admin, getAllOrdersAdmin);

router.route("/:id")
    .get(protect, getOrderById)
    .delete(protect, admin, deleteOrder);

router.route("/:id/status")
    .put(protect, updateOrderStatus);

router.route("/:id/webhook-status")
    .put(updateOrderStatus);



export default router; 