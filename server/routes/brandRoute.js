import { Router } from 'express'; 
import { protect, admin } from '../middleware/authMiddleware.js';
import { createBrand, deleteBrand, getBrandId, getBrands, updateBrand } from '../controllers/brandController.js';

const router = Router(); 

router.route("/")
    .get(getBrands)
    .post(protect, admin, createBrand); 

router.route("/:id")
    .get(getBrandId)
    .put(protect, admin, updateBrand)
    .delete(protect, admin, deleteBrand); 

export default router;   