import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  items: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;