import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

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
);

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
});

// Method to match the password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
};

// Connects userSchema with the "users" collection
const User = mongoose.model('User', userSchema)

export default User