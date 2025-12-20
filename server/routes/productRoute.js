import { Router }  from 'express'; 
import { admin, protect } from '../middleware/authMiddleware.js';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productControllers.js';


const router = Router(); 

router.route("/")
    .get(getAllProducts)
    .post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);


export default router; 