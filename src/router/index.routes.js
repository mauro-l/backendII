import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartsRoutes from "./carts.routes.js";
import categoryRoutes from "./category.routes.js";
import sessionRouter from "./session.routes.js";

const router = Router();

router.use("/products", productsRoutes);
router.use("/cart", cartsRoutes);
router.use("/category", categoryRoutes);
router.use("/session", sessionRouter);

export default router;
