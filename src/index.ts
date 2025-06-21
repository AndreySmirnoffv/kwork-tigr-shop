import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import appRoutes from './app.js'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../docs/swagger.json' with { type: "json" };
import { Request, Response } from 'express'


dotenv.config()

const app = express()

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())


app.post('/', async (req: Request, res: Response) => {
  console.log(req)
  res.json(req)
})


app.use('/api', appRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))