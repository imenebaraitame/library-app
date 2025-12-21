import express from 'express';
import appRoutes from './booksRouter.js';
import categoriesRoutes from './categoriesRouter.js';
import cartRoutes from './cartRouter.js';
import userRoutes from './userRouter.js';

const router = express.Router();

router.use('/api/books', appRoutes);//http://localhost:5000/api/books/
router.use('/api/categories',categoriesRoutes);//http://localhost:5000/api/categories/
router.use('/api/cart', cartRoutes); // http://localhost:5000/api/cart/
router.use('/api/users', userRoutes); // http://localhost:5000/api/users/

export default router