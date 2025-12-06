import Book from "../models/Book.js";


//get all books
const getBooks = async(req, res,next) => {
  try {
    const Books = await Book.find();
    res.json(Books);
  } catch (error) {
    next((error)); // pass error to error middleware
  }
};

// get book by id
const getBookById = async(req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
  
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      error.message = "Book not found";
      throw error; 
    }
    res.json(book);
  } catch (error) {
    console.log('Error in getBookById:', error);
    next(error); 
  }
};

//get book by category
const getBooksByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;

    const filteredBooks = await Book.find({
      category: { $regex: category, $options: "i" } // case-insensitive
    });

    res.json(filteredBooks);

  } catch (error) {
    next(error);
  }
};
//get book by (title Or author) , title and author.
const searchBooksByTitleOrAuthor = async (req, res,next) => {
  try {
    const {title, author} = req.query;
    
    const filteredBooks = await Book.find({ 
        title: new RegExp(title, 'i'),
        author: new RegExp(author, 'i')
    });
    res.json(filteredBooks);
  } catch (error) {
    next(error);
  }   
}

// add a new book
const addBook = async(req, res , next) => {
  try {
    const { title, author, price, category, quantity} = req.body;
    if (!title || price === undefined || !author || !category || quantity === undefined) {
      const error = new Error("All fields are required");
      error.status = 400;
      throw error;
    }

    if (isNaN(price)) {
      const error = new Error("Book price must be a number");
      error.status = 400;
      throw error;  
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
      const error = new Error("Book title must be unique");
      error.status = 400;
      throw error;      
    }
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res,next) => {
  try {
    const bookId = req.params.bookId;
    const { title, author, price, category, quantity } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, price, category, quantity },
      { new: true, runValidators: true }
    );
    
    if (!updatedBook) {
      const error = new Error("Book not found");
      error.status = 404;
      error.message = "Book not found";
      throw error;
    }
    res.json(updatedBook);

  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      const error = new Error("Book not found");
      error.status = 404;
      error.message = "Book not found";
      throw error;
    }

    res.json({ message: "Book deleted successfully" });

  } catch (error) {
    next(error);
  }
};

export {getBooks, getBookById, searchBooksByTitleOrAuthor , getBooksByCategory, addBook, updateBook, deleteBook };