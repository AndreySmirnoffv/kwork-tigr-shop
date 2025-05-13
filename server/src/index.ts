import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import appRoutes from './app'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api', appRoutes)

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))