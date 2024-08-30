import { formatTicketDTO } from "../dto/ticket.dto.js";
import cartRepository from "../persistence/MongoDB/repository/cart.repository.js";
import cartServices from "../services/cart.services.js";
import ticketServices from "../services/ticket.services.js";
import emailControllers from "./email.controllers.js";

//Crear carrito
const createCart = async (req, res) => {
  try {
    const cart = await cartServices.createCart();

    res.status(201).json({ status: "success", cart });
  } catch (err) {
    console.error("Error creating cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

//Obtener todos los carritos
const getAllCarts = async (req, res) => {
  try {
    const carts = await cartServices.getAllCarts();

    res.status(200).json({ status: "success", carts });
  } catch (err) {
    console.error("Error getting all carts", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

//Obtener carrito por id
const getCartById = async (req, res) => {
  try {
    const id = req.params.cid;
    const cart = await cartServices.getCartById(id);

    res.status(200).json({ status: "success", cart });
  } catch (err) {
    console.error("Error getting cart by id", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

//Agregar un producto por ID a un carrito
const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body; //en caso de que se mande una cantidad mayor a 1 esta sera mediante el body

    const quantityAdd = quantity ? Number(quantity) : null;

    const cart = await cartServices.addProductToCart(cid, pid, quantityAdd);
    res.status(201).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error added product in the cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

//Eliminar carrito
const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.deleteCart(cid);

    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error delete cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

//Eliminar Producto del carrito seleccionado mediante id
const deleteProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartServices.deleteProductToCart(cid, pid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error delete product in the cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

//Actualizar producto del carrito seleccionado mediante id del mismo.
const updateQuantityToProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartServices.updateQuantityToProductInCart(
      cid,
      pid,
      Number(quantity)
    );
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error update product in the cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

//Borrar todos los productos del carrito
const clearProductsToCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartServices.clearProductsToCart(cid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (err) {
    console.error("Error clear products in the cart", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartRepository.getCartById(cid);
    if (!cart || cart.products.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "The cart is empty" });
    }

    const { total, purchasedItems } = await cartServices.purchaseCart(
      cid,
      cart
    );

    const ticket = await ticketServices.createTicket(
      req.user,
      total,
      purchasedItems
    );

    if (!ticket) {
      return res
        .status(404)
        .json({ status: "error", message: "Ticket not found" });
    }

    const ticketDTO = formatTicketDTO(ticket);
    await emailControllers.sendTicketEmail(ticket);

    res.status(200).json({ status: "success", ticketDTO });
  } catch (err) {
    console.error("Error when completing the purchase. Error: ", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
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
