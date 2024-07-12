import Product from '../models/productModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProductsController = asyncHandler(async (req, res) => {
  const products = res.json(await Product.find({}))
  return products
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductByIdController = asyncHandler(async (req, res) => {
  const product = await Product
    .findById(req.params.id)
  
  if(product) {
    return res.json(product)
  }
  res.status(404)
  throw new Error('Resource not found!!')
})