import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'
import morgan from 'morgan'

dotenv.config()
connectDB()

const app = express()
app.use(cors(corsConfig))

//logging
app.use(morgan('dev'))

app.use(express.json()) // leera los valores tipo JSON para probar endpoints con postman o thunderClient 

// Routes
app.use('/api/projects', projectRoutes)

export default app