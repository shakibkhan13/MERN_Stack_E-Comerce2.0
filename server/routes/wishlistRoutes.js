import { Router } from "express"; 
import { protect } from '../middleware/authMiddleware.js';
import { addToWishlist, clearWishList, deleteWishlist, getUserWishlist, getWishlistProducts } from "../controllers/wishListController.js";


const router = Router(); 

router.route("/")
    .get(protect, getUserWishlist); 

router.route("/add")
    .post(protect, addToWishlist); 

router.route("/products")
    .post(protect, getWishlistProducts);

router.route("/remove")
    .delete(protect, deleteWishlist); 

router.route("/clear")
    .delete(protect, clearWishList); 

export default router;
