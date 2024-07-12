import express from 'express'
import {
  authUserController, 
  deleteUserController, 
  getUserProfileController, 
  getUsersByIdController, 
  getUsersController, 
  logOutUserController, 
  registerUserController,
  updateUserController,
  updateUserProfileController
} from './userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

// Define router and routes
const router = express.Router()

// all users route
router.route('/')
  .get(protect, admin, getUsersController)
  .post(registerUserController)

router.post('/login', authUserController)
router.post('/logout', logOutUserController)

router.route('/profile')
  .get(protect, getUserProfileController)
  .put(protect, updateUserProfileController)

router.route('/:id')
  .get(protect, admin, getUsersByIdController)
  .put(protect, admin, updateUserController)
  .delete(protect, admin, deleteUserController)

export default router