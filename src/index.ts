import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import appRoutes from './app.js'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'

dotenv.config()

const app = express()

app.use(cors({
  origin: "*",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api', appRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerUrl: 'docs/swagger.json'
}));

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))