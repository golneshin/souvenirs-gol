import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js"

// 1============================================================================
// @desc    Auth user & get token (signin)
// @route   POST  /api/users/login
// @access  Public
const authUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body // recieve input

  const user = await User.findOne({email}) // interact with DataBase

  // validate input & process data & send response
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
      // we dont want to store token here in client, it is insecure.
      // instead we set it in cookie as HTTP-only.
    })
    // invalidate input & send response
  }else{
    res.status(401)
    throw new Error('email or password is wrong.')
  }
});

// 2============================================================================
// @desc    register user (signup)
// @route   POST  /api/users
// @access  Public
const registerUserController = asyncHandler(async (req, res) => {
  // define & validate input:
  const { name, email, password } = req.body
  // check if user already exist:
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400) // client error
    throw new Error('user already exists')
  }
  // create user & encrypt password
  const user = await User.create({
    name,
    email,
    password
  })
  // generate token & send response
  if(user) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  }else{
    res.status(401)
    throw new Error('Invalid user data')
  }
});

// 3============================================================================
// @desc    logout user & clear cache (signout)
// @route   POST  /api/users/logout
// @access  Private
const logOutUserController = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({message: 'Logged Out Successfully.'})
});

// 4============================================================================
// @desc    get user profile
// @route   GET  /api/users/profile
// @access  Private
const getUserProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  }else{
    res.status(404)
    throw new Error('user not found')
  }
});

// 5============================================================================
// @desc    update user profile
// @route   PUT  /api/users/profile  (we use token instead of id)
// @access  Private
const updateUserProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if(req.body.password) {
      user.password = req.body.password
    }

    const updateUser = await user.save()

    res.status(200).json({
      _id : updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    })
    
  }else{
    res.status(404)
    throw new Error('user not found')
  }
});

// 6============================================================================
// @desc    get user ()
// @route   GET  /api/users
// @access  Private/Admin
const getUsersController = asyncHandler(async (req, res) => {
  res.send('get users')
});

// 7============================================================================
// @desc    get user by id ()
// @route   GET  /api/users/:id
// @access  Private/Admin
const getUsersByIdController = asyncHandler(async (req, res) => {
  res.send('get users by id')
});

// 8============================================================================
// @desc    delete user ()
// @route   DELETE  /api/users/:id
// @access  Private/Admin
const deleteUserController = asyncHandler(async (req, res) => {
  res.send('delete users')
});

// 9============================================================================
// @desc    update user ()
// @route   PUT  /api/users/:id
// @access  Private/Admin
const updateUserController = asyncHandler(async (req, res) => {
  res.send('update users')
})

export {
  authUserController,
  registerUserController,
  logOutUserController,
  getUserProfileController,
  updateUserProfileController,
  getUsersController,
  getUsersByIdController,
  deleteUserController,
  updateUserController
}

