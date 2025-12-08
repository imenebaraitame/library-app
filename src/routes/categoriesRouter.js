import express from 'express';
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryControllers.js";     

const router = express.Router();

router.get("/", getCategories); // localhost:5000/api/categories
router.get('/:categoryId',getCategoryById); 
router.post('/', addCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

export default router;