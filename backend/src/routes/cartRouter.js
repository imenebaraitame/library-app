import express from 'express';

import {
  getCartById, 
  createCart ,
  addItemToCart,
  deleteItemFromCart
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:cartId", getCartById); // localhost:5000/api/cart/:cartId
router.post("/", createCart);                  // POST /api/cart - create new cart
router.post("/:cartId/items", addItemToCart);
router.delete("/:cartId/:bookId", deleteItemFromCart);


export default router;









