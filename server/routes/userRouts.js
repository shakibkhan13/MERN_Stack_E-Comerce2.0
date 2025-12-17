import { Router } from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/usersControllers.js";

const router = Router();  

router.route("/")
    .get(protect, admin, getUsers)
    .post(protect, admin, createUser); 

router.route("/:id")
    .get(protect, getUserById)
    .put(protect, updateUser)
    .delete(protect, admin, deleteUser); 




export default router; 