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

// Calculate totals before saving
// cartSchema.pre('save', function(next) {
//   this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   this.tax = this.subtotal * 0.1; // 10% tax
//   this.total = this.subtotal + this.tax;
//   next();
// });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;