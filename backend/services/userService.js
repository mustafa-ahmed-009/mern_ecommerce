const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { uploadSingleImage } = require("../middlewares/uplaodImageMiddleWare");
const ApiError = require("../utils/api_error");
const factory = require("./handlerfactory");
const UserModel = require("../models/userModel");
const createToken =require("../utils/createToken")
exports.resizeImage = asyncHandler(async (req, res, next) => {
  // Check if a file is uploaded
  if (req.file) {
    // Generate a unique filename for the new image
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

    // Resize and save the new image
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);

    // Save the new image filename to `req.body.image`
    req.body.profileImg = filename;
  }

  // If no file is uploaded, `req.body.image` remains unchanged
  next();
});

exports.uploadUserImage = uploadSingleImage("profileImg");

// Build query

// @desc    Get specific User by id
// @route   GET /api/v1/categories/:id
// @access  Public

// @desc    Create User
// @route   POST  /api/v1/categories
// @access  Private
exports.createUser = factory.createOne(UserModel);

exports.getUser = factory.getOne(UserModel);
exports.getUsers = factory.getAll(UserModel);

exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      slug: req.body.slug,
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc    Update specific User
// @route   PUT /api/v1/categories/:id
// @access  Private

// @desc    Delete specific User
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteUser = factory.deleteOne(UserModel);

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  // 1) Update user password based user payload (req.user._id)
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 2) Generate token
  const token = createToken(user._id);

  res.status(200).json({ data: user, token });
});

exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect
exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});
