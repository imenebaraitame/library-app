import express from 'express';
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryControllers.js";  
import authenticationToken from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';


const router = express.Router();

router.get("/", getCategories); // localhost:5000/api/categories
router.get('/:categoryId',getCategoryById); 
router.post('/', authenticationToken,isAdmin,addCategory);
router.put("/:categoryId", authenticationToken, isAdmin, updateCategory);
router.delete("/:categoryId", authenticationToken, isAdmin, deleteCategory);

export default router;