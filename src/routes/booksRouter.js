import express from 'express';


import {
  getBooks,
  getBookById,
  getBooksByCategory, 
  getBooksByTitle,
  addBook,
  updateBook,
  deleteBook
} from "../controllers/bookControllers.js";

const router = express.Router();

router.get("/", getBooks); // localhost:5000/api/books

router.get('/:bookId',getBookById);

router.get("/category/:category", getBooksByCategory);// localhost:5000/api/books/category
router.get("/title/:title", getBooksByTitle);// localhost:5000/api/books/title

router.post('/', addBook);

router.put("/:bookId", updateBook);

router.delete("/:bookId", deleteBook);


export default router;