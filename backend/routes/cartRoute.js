const express = require("express");

// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require("../utils/validators/brand_validator");
const { authenticate, allowedTo } = require("../services/authService");
const {
  addProductToCart,
  getLoggedUserCart: getLoggedUserCart,
  removeCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../services/cartService");

const router = express.Router();
router.use(authenticate, allowedTo("user"));
router
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);
router.put("/applyCoupon", applyCoupon);
router.route("/:itemId").delete(removeCartItem).put(updateCartItemQuantity);

module.exports = router;
