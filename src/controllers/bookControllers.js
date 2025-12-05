import Book from "../models/Book.js";

import express from "express";
import errorMiddleware from "../middlewares/errorMiddleware.js";
const app = express();

// use error middleware
app.use(errorMiddleware);

//get all books
const getBooks = async(req, res) => {
  try {
    const Books = await Book.find();
    res.json(Books);
  } catch (error) {
    res.status(500).json({ message: "Server Error" , error: error.message} );
  }
};

// get book by id
const getBookById = async(req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//get book by category
const getBooksByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const filteredBooks = await Book.find({
      category: { $regex: category, $options: "i" } // case-insensitive
    });

    res.json(filteredBooks);

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
//get book by title
const getBooksByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const filteredBooks = await Book.find({
      title: { $regex: title, $options: "i" } // case-insensitive
    });
    res.json(filteredBooks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }   
}

// add a new book
const addBook = async(req, res) => {
  try {
    const { title, author, price, category, quantity} = req.body;
    if (!title || price === undefined || !author || !category || quantity === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(price)) {
      return res.status(400).json({ message: "Book price must be a number" });
    }
    const newBook = new Book({
      title,
      author,
      price,
      category,
      quantity,
    });
    // check for name uniqueness
    const existingBook = await Book.findOne({ title: title });
    if (existingBook) {
      return res.status(400).json({ message: "Book title must be unique" });
    }

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation Error", error: error.message });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
    console.log(error.message);
  }

};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const { title, author, price, category, quantity } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, price, category, quantity },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation Error", error: error.message });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {getBooks, getBookById, getBooksByTitle, getBooksByCategory, addBook, updateBook, deleteBook };