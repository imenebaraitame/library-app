import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    index: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    index: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  category: {
    type: String,
    required: [true, "Book category is required"],
    trim: true,
  },
  quantity: {
      type: Number,
      min: [0, "Product quantity cannot be negative"],
      default: 0,
  },
}, {
  timestamps: true,
});


const Book = mongoose.model("Book", bookSchema);
export default Book;
    
