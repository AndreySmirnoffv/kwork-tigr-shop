import { authMiddleware } from 'src/middlewares/auth.middleware';
import { router } from "./router";
import { getUser, logoutUser } from '@controllers/user.controller';
import { updateUser } from '@controllers/auth.controller';

router.get("/:userId", authMiddleware, getUser)
router.post("/logout", logoutUser)
router.put("/:userId", updateUser)

export default router