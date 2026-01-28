import {Router} from "express";
import  cors from "cors";
import * as productController from "../controllers/productController";  
import { requireAuth } from "@clerk/express";

const router=Router();


//GET /api/products/ - Get all products
router.get("/",productController.getAllProducts);
//POST /api/products/ - Create a new product (protected route)
router.post("/",requireAuth(),productController.createProduct);
//GET /api/products/my-products - Get products of the authenticated user (protected route)
router.get("/my-products",requireAuth(),productController.getMyProducts);
//GET /api/products/:id - Get product by ID
router.get("/:id",productController.getProductById);
//PUT /api/products/:id - Update product by ID (protected route)
router.put("/:id",requireAuth(),productController.updateProduct);
//DELETE /api/products/:id - Delete product by ID (protected route)
router.delete("/:id",requireAuth(),productController.deleteProduct);


export default router;
