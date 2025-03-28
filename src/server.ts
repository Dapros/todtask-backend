import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'

dotenv.config()
connectDB()

const app = express()

app.use(express.json()) // leera los valores tipo JSON para probar endpoints con postman o thunderClient 

// Routes
app.use('/api/projects', projectRoutes)

export default app