import { request, response } from "express";
import cartServices from "../services/cart.services.js";

const checkCart = async (req = request, res = response, next) => {
  try {
    const cart = await cartServices.getCartById(req.params.cid);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `Cart with id ${req.params.cid} not found`,
      });
    next();
  } catch (err) {
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

export default checkCart;
