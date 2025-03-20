const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/api_error");
const User = require("../models/userModel");
exports.addProductToWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { wishlist: req.body.productId } },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product added to wishlist",
    data: user.wishlist,
  });
});
exports.removeProductFromWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { wishlist: req.params.productId } },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product removed from wishlist",
    data: user.wishlist,
  });
});
exports.getLoggedUserWishList = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("wishlist");
  res.status(200).json({
    status: "success",
    data: user.wishlist,
  });   
  
});