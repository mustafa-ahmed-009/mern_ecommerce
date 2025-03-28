const express = require("express");

// const {
//   getBrandValidator,
//   createBrandValidator,
//   updateBrandValidator,
//   deleteBrandValidator,
// } = require("../utils/validators/brand_validator");
const {authenticate , allowedTo} = require('../services/authService');
const {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,

} = require("../services/couponService");

const router = express.Router();
// router.use(  authenticate,
//   allowedTo("admin"),);
router
  .route("/")
  .get(getCoupons)
  .post(createCoupon);
router
  .route("/:id")
  .get( getCoupon)
  .put(  updateCoupon,)
  .delete( deleteCoupon);

module.exports = router;
