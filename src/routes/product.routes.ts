import { getLastProducts, getProductById, getProductsByFilter } from "@controllers/products.controller.js";
import { router } from "./router.js";

router.post("/last-products", getLastProducts)
router.get("/products", getProductsByFilter)
router.get("/:id", getProductById)

export default router