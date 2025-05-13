import { login, register } from "@controllers/auth.controller";
import { authMiddleware } from "src/middlewares/auth.middleware";
import { router } from "./router";

router.post("/register", register)
router.post("/login", authMiddleware, login)

export default router