import express from 'express'
import products from './data/products.js'

const app = express()

const PORT = 5000

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find( p => p._id === req.params.id)
  res.json(product)
})

console.log("Hello World!!")

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})