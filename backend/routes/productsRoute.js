import express from "express";
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  removeProductController,
  createReviewController,
  getTopProductsController,
} from "./productsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Define router and routes
const router = express.Router();

router
  .route("/")
  .get(getProductsController)
  .post(protect, admin, createProductController);

router.route("/top").get(getTopProductsController);

router
  .route("/:id")
  .get(getProductByIdController)
  .put(protect, admin, updateProductController)
  .delete(protect, admin, removeProductController);

router.route("/:id/reviews").post(protect, createReviewController);

export default router;
