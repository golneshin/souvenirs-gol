import express from 'express'
import { 
  getProductsController,
  getProductByIdController, 
} from './productsController.js'

// Define router and routes
const router = express.Router()

// all products route
// router.get('/', getProductsController)
router.route('/').get(getProductsController)

// single product route
// router.get('/:id', getProductByIdController)
router.route('/:id').get(getProductByIdController)

export default router