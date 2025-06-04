import { register, login, checkAuth } from '@controllers/auth.controller.js';
import { router } from "./router.js";
import { authMiddleware } from 'src/middlewares/auth.middleware.js';

router.post("/register", register)
router.post("/login", login)
router.get("/check-tokens", authMiddleware, checkAuth)

export default router