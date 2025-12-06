import express from 'express';
import appRoutes from './booksRouter.js';
import categoriesRoutes from './categoriesRouter.js';

const router = express.Router();

router.use('/api/books', appRoutes);//http://localhost:5000/api/books/
router.use('/api/categories',categoriesRoutes);//http://localhost:5000/api/categories/

export default router