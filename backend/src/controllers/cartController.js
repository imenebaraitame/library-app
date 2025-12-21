import Cart from "../models/Cart.js";
import Book from "../models/Book.js";
import mongoose from "mongoose";


export const getCartById = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cartId).populate('items.book');
        if (!cart) {
            const error = new Error("Cart not found");
            error.status = 404;
            error.message = "Cart not found";
            throw error;
        }
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

// Create a new cart
export const createCart = async (req, res, next) => {
    try {
        const newCart = new Cart({ items: [], total: 0 });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        next(error);
    }
};

// Add item to existing cart
//TODO: when adding book to cart, update quantity of the book 
export const addItemToCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { bookId, quantity } = req.body;

        if (!bookId || !quantity) {
            const error = new Error("Book ID and quantity are required");
            error.status = 400;
            return next(error);
        }

        if (quantity < 1) {
            const error = new Error("Quantity must be at least 1");
            error.status = 400;
            return next(error);
        }

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            const error = new Error("Book not found");
            error.status = 404;
            return next(error);
        }

        // Check if cart exists
        const cart = await Cart.findById(cartId);
        if (!cart) {
            const error = new Error("Cart not found. Please create a cart first.");
            error.status = 404;
            return next(error);
        }

        // Check if item already exists in cart
        const itemIndex = cart.items.findIndex(
            item => item.book.toString() === bookId
        );

        if (itemIndex > -1) {
            // Update existing item quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.items.push({
                book: bookId,
                quantity,
                price: book.price
            });
        }

        // Recalculate total
        cart.total = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.price, 
            0
        );

        await cart.save();

        // Populate book details before sending response
        const populatedCart = await cart.populate('items.book');
        
        res.status(200).json(populatedCart); // Use 200 for updates, not 201

    } catch (error) {
        next(error);
    }
};
export const deleteItemFromCart = async (req, res, next) => {
    try {
        const { cartId, bookId } = req.params;
        
        console.log("Deleting bookId:", bookId, "from cartId:", cartId);
        
        // Check if cart exists
        const cart = await Cart.findById(cartId);
        if (!cart) {
            const error = new Error("Cart not found");
            error.status = 404;
            return next(error);
        }
        
        const itemIndex = cart.items.findIndex(item => {
            return item.book.equals(bookId);
        });
        
        console.log("Found itemIndex:", itemIndex);
        
        if (itemIndex === -1) {  
            const error = new Error("Item not found in cart");
            error.status = 404;
            return next(error);
        }
        
        // Remove item from cart
        cart.items.splice(itemIndex, 1);
        
        // Recalculate total
        cart.total = cart.items.reduce(
            (acc, item) => acc + item.quantity * item.price, 
            0
        );
        
        await cart.save();
        console.log("Cart saved. New total:", cart.total);
        
        // Populate book details before sending response
        const populatedCart = await cart.populate('items.book');
        
        res.status(200).json(populatedCart);
        
    } catch (error) {
        console.error("Error in deleteItemFromCart:", error);
        next(error);
    }
};

export default {
    getCartById,
    createCart,
    addItemToCart,
    deleteItemFromCart
};


