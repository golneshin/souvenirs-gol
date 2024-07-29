import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// 1============================================================================
// @desc    Auth user & get token (signin)
// @route   POST  /api/users/login
// @access  Public
const authUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// 2============================================================================
// @desc    register user (signup)
// @route   POST  /api/users
// @access  Public
const registerUserController = asyncHandler(async (req, res) => {
  // define & validate input:
  const { name, email, password } = req.body;
  // check if user already exist:
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // client error
    throw new Error("User already exists");
  }
  // create user & encrypt password
  const user = await User.create({
    name,
    email,
    password,
  });
  // generate token & send response
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

// 3============================================================================
// @desc    logout user & clear cache (signout)
// @route   POST  /api/users/logout
// @access  Private
const logOutUserController = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out Successfully." });
});

// 4============================================================================
// @desc    get user profile
// @route   GET  /api/users/profile
// @access  Private
const getUserProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// 5============================================================================
// @desc    update user profile
// @route   PUT  /api/users/profile  (we use token instead of id)
// @access  Private
const updateUserProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// 6============================================================================
// @desc    get user ()
// @route   GET  /api/users
// @access  Private/Admin
const getUsersController = asyncHandler(async (req, res) => {
  const users = res.json(await User.find({}));

  return users;
});

// 7============================================================================
// @desc    get user by id ()
// @route   GET  /api/users/:id
// @access  Private/Admin
const getUsersByIdController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    return res.json(user);
  }
  res.status(404);
  throw new Error("User not found!!");
});

// 8============================================================================
// @desc    delete user ()
// @route   DELETE  /api/users/:id
// @access  Private/Admin
const deleteUserController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not remove Admin user");
    }
    await user.deleteOne({ _id: user._id });

    res.status(201).json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// 9============================================================================
// @desc    update user ()
// @route   PUT  /api/users/:id
// @access  Private/Admin
const updateUserController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUserController,
  registerUserController,
  logOutUserController,
  getUserProfileController,
  updateUserProfileController,
  getUsersController,
  getUsersByIdController,
  deleteUserController,
  updateUserController,
};
