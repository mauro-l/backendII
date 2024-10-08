import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

cartSchema.pre(["find", "findOne"], function () {
  this.populate("products.productId");
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
