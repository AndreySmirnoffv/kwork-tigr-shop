import { router } from "@routes/router"
import authRoutes from '@routes/auth.routes'
import userRoutes from '@routes/user.routes'

router.use("/auth", authRoutes)
router.use("/users", userRoutes)

export default router