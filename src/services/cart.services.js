import cartRepository from "../persistence/MongoDB/repository/cart.repository.js";
import productRepository from "../persistence/MongoDB/repository/product.repository.js";
import ticketRepository from "../persistence/MongoDB/repository/ticket.repository.js";

//Crear carrito
const createCart = async () => {
  return await cartRepository.createCarts();
};

//Obtener todos los carritos
const getAllCarts = async () => {
  return await cartRepository.getAllCarts();
};

//Obtener carrito por id
const getCartById = async (cid) => {
  return await cartRepository.getCartById(cid);
};

//Agregar un producto por ID a un carrito
const addProductToCart = async (cid, pid, quantityAdd) => {
  return await cartRepository.addProductToCart(cid, pid, quantityAdd);
};

//Eliminar carrito
const deleteCart = async (cid) => {
  return await cartRepository.deleteCart(cid);
};

//Eliminar Producto del carrito seleccionado mediante id
const deleteProductToCart = async (cid, pid) => {
  return await cartRepository.deleteProductToCart(cid, pid);
};

//Actualizar producto del carrito seleccionado mediante id del mismo.
const updateQuantityToProductInCart = async (cid, pid, quantity) => {
  return await cartRepository.updateQuantityToProduct(cid, pid, quantity);
};

//Borrar todos los productos del carrito
const clearProductsToCart = async (cid) => {
  return await cartRepository.clearProductsToCart(cid);
};

const purchaseCart = async (cid, cart) => {
  let total = 0;
  const productsWithOutStock = [];
  const purchasedItems = [];

  //Recorremos todos los productos del carrito
  for (const prod of cart.products) {
    const product = await productRepository.getProductsById(prod.productId);

    //verificamos que haya stock de cada producto que se encuentra en el carrito
    if (product.stock >= prod.quantity) {
      total += product.price * prod.quantity;
      purchasedItems.push({
        productId: prod.productId,
        product: product.title,
        quantity: prod.quantity,
        price: product.price,
      });
      await productRepository.updateProducts(prod.productId, {
        stock: product.stock - prod.quantity,
      });
    } else {
      productsWithOutStock.push(prod); //En caso de que no haya, apartamos esos productos en un arreglo
    }

    //Se actualiza el carrito. Si hay productos sin stock estos se encontraran en el arreglo, sino se enviara un arreglo vacio
    await cartRepository.updateCart(cid, { products: productsWithOutStock });
  }
  return {
    total,
    purchasedItems,
  };
};

export default {
  createCart,
  getAllCarts,
  getCartById,
  addProductToCart,
  deleteCart,
  deleteProductToCart,
  updateQuantityToProductInCart,
  clearProductsToCart,
  purchaseCart,
};
