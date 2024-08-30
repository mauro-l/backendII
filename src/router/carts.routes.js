import { Router } from "express";
import cartControllers from "../controllers/cart.controllers.js";
import checkCart from "../middlewares/checkCart.middleware.js";
import checkProductAndCart from "../middlewares/checkProductAndCart.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";
import checkQuantity from "../middlewares/checkQuantity.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

//Crear carrito
router.post("/", cartControllers.createCart);

//Obtener todos los carritos
router.get("/", cartControllers.getAllCarts);

//Obtener carrito por id
router.get("/:cid", checkCart, cartControllers.getCartById);

//Agregar un producto por ID a un carrito
router.post(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  isUserCart,
  checkProductAndCart,
  checkQuantity,
  cartControllers.addProductToCart
);

//Eliminar carrito
router.delete(
  "/:cid/delete",
  passportCall("jwt"),
  authorization("admin"),
  checkCart,
  cartControllers.deleteCart
);

//Eliminar Producto del carrito seleccionado mediante id
router.delete(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  checkProductAndCart,
  cartControllers.deleteProductToCart
);

//Actualizar producto del carrito seleccionado mediante id del mismo.
router.put(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorization("user"),
  checkProductAndCart,
  checkQuantity,
  cartControllers.updateQuantityToProductInCart
);

//Borrar todos los productos del carrito
router.delete(
  "/:cid",
  passportCall("jwt"),
  authorization("user"),
  checkCart,
  cartControllers.clearProductsToCart
);

router.get(
  "/:cid/purchase",
  passportCall("jwt"),
  authorization("user"),
  isUserCart,
  checkCart,
  cartControllers.purchaseCart
);

export default router;
