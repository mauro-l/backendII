import { Router } from "express";
import checkProducts from "../middlewares/checkProducts.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import productsControllers from "../controllers/products.controllers.js";
import checkProductData from "../middlewares/checkProductData.middleware.js";
import cartControllers from "../controllers/cart.controllers.js";

const router = Router();

//Obtener todos los productos
router.get("/", productsControllers.getAllProducts);

//Obtener producto por Id
router.get("/:pid", checkProducts, productsControllers.getProductsById);

//Crear productos
router.post(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  checkProductData,
  productsControllers.createProducts
);

//Actualizar producto por id
router.put(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  checkProducts,
  productsControllers.updateProducts
);

//Actualizar estado a False para ocultar el producto
router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  checkProducts,
  productsControllers.deleteProducts
);

export default router;
