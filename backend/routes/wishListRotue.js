const express = require("express");
const authService = require("../services/authService");

const {
  addProductToWishList,
  removeProductFromWishList,
  getLoggedUserWishList,
} = require("../services/wishListService");

const router = express.Router();
router.use(authService.authenticate,authService.allowedTo("user"));
router
  .route("/")
  .post(addProductToWishList)
  .get(getLoggedUserWishList);
router.delete('/:productId', removeProductFromWishList);  
// router.delete('/remove/:productId', authService.protect, removeProductFromWishList);
module.exports = router;
