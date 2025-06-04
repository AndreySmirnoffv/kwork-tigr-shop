import { getLastProducts, getProductsByFilter } from "@controllers/products.controller.js";
import { router } from "./router.js";

router.post("/last-products", getLastProducts)
router.get("/products", getProductsByFilter)

export default router