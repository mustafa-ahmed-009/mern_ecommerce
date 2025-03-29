const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    customerId: {
      type: String,
      trim: true,
      required: [true, "customer Id required"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: [true, "Product is required"],
        },
        title: String,
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
          min: [1, "Quantity cannot be less than 1"],
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
        },
        image: {
          type: String,
          required: [true, "Product Image cover is required"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
      default: "Pending",
    },
    shippingAddress: {
      country: { type: String, required: true },
      governorate: { type: String },
      street: { type: String, required: true },
      phone: { type: String, required: true },
      postalCode: { type: String },
      details: { type: String },
    },
    shippingCost: {
      type: Number,
      default: 15,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
