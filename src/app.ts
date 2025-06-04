import { router } from "@routes/router.js"
import authRoutes from '@routes/auth.routes.js'
import userRoutes from '@routes/user.routes.js'
import productsRoutes from '@routes/product.routes.js'

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use('/products', productsRoutes)

export default router