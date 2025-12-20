import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryId, updateCategory } from "../controllers/categoryController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = Router(); 


router.route("/")
    .get(getCategories)
    .post(protect, admin, createCategory); 

router.route("/:id")
    .get(protect, getCategoryId)
    .put(protect, admin, updateCategory)
    .delete(protect, admin, deleteCategory); 


export default router; 