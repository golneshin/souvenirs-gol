import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // username:{
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    name:{
      type: String,
      required: true,
    },
    // profileUrl:{
    //   type: String,
    //   required: true,
    // },
    // avatarUrl:{
    //   type: String,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  }, 
  {timestamps: true}
)

// Connects userSchema with the "users" collection
const User = mongoose.model('User', userSchema)

export default User