const express = require("express");

// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require("../utils/validators/brand_validator");
const {authenticate , allowedTo} = require('../services/authService');
const {
    addProductToCart, 
    getLoggedUserCard,
    removeCartItem, 
    clearCart, 
    updateCartItemQuantity , applyCoupon
} = require("../services/cartService");

const router = express.Router();
router.use(authenticate ,  allowedTo("user"),);
router
    .route("/")
    .post(
        addProductToCart).get(getLoggedUserCard).delete(clearCart);
router.put("/applyCoupon" , applyCoupon)      
router
  .route("/:itemId")
//   .get(getBrandValidator, getBrand)
//   .put(    authenticate,
//       allowedTo("admin","manager"),updateBrandValidator, updateBrand)
  .delete( removeCartItem).put(updateCartItemQuantity);

module.exports = router;
