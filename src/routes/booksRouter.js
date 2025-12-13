import express from 'express';


import {
  getBooks,
  getBookById,
  getBooksByCategory,     
  searchBooksByTitleOrAuthor,
  addBook,
  updateBook,
  deleteBook
} from "../controllers/bookControllers.js";
import authenticationToken from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';  

const router = express.Router();

router.get("/", getBooks); // localhost:5000/api/books
router.get("/search", searchBooksByTitleOrAuthor);// localhost:5000/api/books/search?title=...&author=...
router.get("/category/:category", getBooksByCategory);// localhost:5000/api/books/category
router.post('/',authenticationToken,isAdmin,addBook);

router.put("/:bookId",authenticationToken,isAdmin,updateBook);
router.delete("/:bookId",authenticationToken,isAdmin,deleteBook);
router.get('/:bookId',getBookById);


export default router;