import { request, response } from "express";
import productServices from "../services/product.services.js";

const checkProducts = async (req = request, res = response, next) => {
  try {
    const product = await productServices.getProductsById(req.params.pid);
    if (!product)
      return res.status(404).json({
        status: "Error",
        msg: `Product with id ${req.params.cid} not found`,
      });
    next();
  } catch (err) {
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

export default checkProducts;
