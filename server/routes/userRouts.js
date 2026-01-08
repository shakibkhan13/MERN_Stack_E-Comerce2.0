import { Router } from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/usersControllers.js";
import { addAddress, deleteAddress, updateAddress } from "../controllers/AddressController.js";
import { upload } from "../config/multer.js";

const router = Router();  

router
  .route("/")
  .get(protect, admin, getUsers)
  .post(protect, admin, upload.single("avatar"), createUser); 

router
  .route("/:id")
  .get(protect, getUserById)
  .put(protect, upload.single("avatar"), updateUser)
  .delete(protect, admin, deleteUser); 

router.route("/:id/addresses")
    .post(protect, addAddress); 

router
  .route("/:id/addresses/:addressId")
  .put(protect, updateAddress)
  .delete(protect, deleteAddress); 




export default router; 