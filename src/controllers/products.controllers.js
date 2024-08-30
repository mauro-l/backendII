import { request, response } from "express";
import productServices from "../services/product.services.js";

const getAllProducts = async (req = request, res = response) => {
  try {
    const { limit, page, sortField, sortOrder, category, status, maxPrice } =
      req.query;

    const options = {
      limit: Number(limit) > 0 ? Number(limit) : 5,
      page: Number(page) > 0 ? Number(page) : 1,
      sort: sortField
        ? { [sortField]: sortOrder === "asc" ? 1 : -1 }
        : { createdAt: -1 },
      lean: true,
    };

    const query = {};

    if (category) {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }
    if (maxPrice) {
      const maxPriceNumber = Number(maxPrice);
      if (isNaN(maxPriceNumber)) {
        return res
          .status(400)
          .json({ error: "Error, ingrese un numero valido" });
      }
      query.price = { $lt: maxPriceNumber };
    }

    const products = await productServices.getAllProducts(query, options);
    res.status(200).json({ status: "success", payload: products });
  } catch (err) {
    console.error("error al obtener los productos", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const getProductsById = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const product = await productServices.getProductsById(pid);

    res.status(200).json({ status: "success", product });
  } catch (err) {
    console.error("Error al obtener el producto", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const createProducts = async (req = request, res = response) => {
  try {
    const body = req.body;
    const product = await productServices.createProducts(body);

    res.status(201).json({ status: "success", product });
  } catch (err) {
    console.error("error al crear productos", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const updateProducts = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const product = await productServices.updateProducts(pid, body);

    res.status(200).json({ status: "success", product });
  } catch (err) {
    console.error("error al actualizar los productos", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productServices.deleteProducts(pid);

    res.status(200).json({
      status: "success",
      msg: `The product with id: (${pid}) was deleted`,
    });
  } catch (err) {
    console.error("Error deleting products: ", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

export default {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};
