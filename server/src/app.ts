import { router } from "@routes/router"
import authRoutes from '@routes/auth.routes'

router.use("/auth", authRoutes)

export default router