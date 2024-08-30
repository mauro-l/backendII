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
router.get("*", async (req, res) => {
  try {
    res.status(404).json({ status: "error", msg: "Not found" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

export default router;
