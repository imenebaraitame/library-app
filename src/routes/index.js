import express from 'express';
import appRoutes from './booksRouter.js';

const router = express.Router();

router.use('/api/books', appRoutes);//http://localhost:5000/api/books/

export default router