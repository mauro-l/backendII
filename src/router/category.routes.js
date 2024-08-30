import { Router } from "express";
import checkCategory from "../middlewares/checkCategory.middleware.js";
import categoryRepository from "../persistence/MongoDB/repository/category.repository.js";

const router = Router();

//Obtener todas las categorias
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    console.log(status);
    if (status) {
      const categories = await categoryRepository.getAllCategory({ status });
      return res.status(200).json({ status: "success", payload: categories });
    }

    const categories = await categoryRepository.getAllCategory();
    res.status(200).json({ status: "success", payload: categories });
  } catch (err) {
    console.error("error al obtener las categorias", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Obtener categoria por Id
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const categories = await categoryRepository.getCategoryById(cid);

    if (!categories)
      return res
        .status(404)
        .json({ status: "Error", msg: "Category Not Found" });
    res.status(200).json({ status: "success", categories });
  } catch (err) {
    console.error("Error al obtener la categoria", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Crear categorias
router.post("/", checkCategory, async (req, res) => {
  try {
    const body = req.body;
    const categories = await categoryRepository.createCategory(body);

    res.status(201).json({ status: "success", categories });
  } catch (err) {
    console.error("error al crear la categoria", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Actualizar categoria por id
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const body = req.body;
    const categories = await categoryRepository.updateCategory(cid, body);

    if (!categories)
      return res
        .status(404)
        .json({ status: "Error", msg: "Product Not Found" });
    res.status(200).json({ status: "success", categories });
  } catch (err) {
    console.error("error al actualizar la categoria", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

//Actualizar estado a False para ocultar el producto
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const categories = await categoryRepository.deleteCategory(cid);

    if (!categories)
      return res
        .status(404)
        .json({ status: "Error", msg: "Category Not Found" });
    res.status(200).json({
      status: "success",
      msg: `The category with id: (${cid}) was deleted`,
    });
  } catch (err) {
    console.error("error al borrar la categoria", err.message);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
});

export default router;
