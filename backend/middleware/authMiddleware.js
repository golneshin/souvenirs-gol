import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token

  // extracting the token
  // Read the JWT token from cookie
  token = req.cookies.jwt

  // verifying the token
  if(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
      
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }

  }else{
    res.status(401)
    throw new Error('Not authorized, no token')
  }
});

// Admin middleware
export const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next()
  }else{
    res.status(401)
    throw new Error('Not authorized as Admin')
  }
};

