import { authMiddleware } from 'src/middlewares/auth.middleware';
import { getUser, logoutUser } from "@controllers/user.controller";
import { router } from "./router";

router.get("/:userId", authMiddleware, getUser)
router.post("/logout", logoutUser)

export default router