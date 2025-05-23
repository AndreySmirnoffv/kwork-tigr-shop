import { register, login, checkAuth } from '@controllers/auth.controller';
import { router } from "./router";
import { authMiddleware } from 'src/middlewares/auth.middleware';

router.post("/register", register)
router.post("/login", login)
router.get("/check-tokens", authMiddleware, checkAuth)

export default router