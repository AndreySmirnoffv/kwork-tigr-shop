import { authMiddleware } from 'src/middlewares/auth.middleware.js';
import { getUser, logoutUser } from "@controllers/user.controller.js";
import { router } from "./router.js";

router.get("/:userId", authMiddleware, getUser)
router.post("/logout", logoutUser)

export default router