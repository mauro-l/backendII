import productRepository from "../persistence/MongoDB/repository/product.repository.js";

const getAllProducts = async (query, options) => {
  return await productRepository.getAllProducts(query, options);
};

const getProductsById = async (pid) => {
  return await productRepository.getProductsById(pid);
};

const createProducts = async (body) => {
  return await productRepository.createProducts(body);
};

const updateProducts = async (pid, body) => {
  return await productRepository.updateProducts(pid, body);
};

const deleteProducts = async (pid) => {
  return await productRepository.deleteProducts(pid);
};

export default {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};
