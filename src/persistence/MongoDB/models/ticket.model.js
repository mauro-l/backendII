import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  code: { type: String, required: true, unique: true },
  purchase_datatime: { type: Date, default: Date.now() },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      product: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    },
  ],
  status: { type: String, required: true, default: "Entregado" },
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
