import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// .env
dotenv.config()
// internal imports
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productsRouter from './routes/productsRoute.js'
import usersRouter from './routes/userRoute.js'

const app = express()
app.use(cors())

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello')
})

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

app.use(notFound)
app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
  connectDB()
})