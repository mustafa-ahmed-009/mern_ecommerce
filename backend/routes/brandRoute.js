const express = require("express");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brand_validator");
const {authenticate , allowedTo} = require('../services/authService');
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  resizeBrandImage,
  uploadBrandImage,
} = require("../services/brandService");

const router = express.Router();
router.use(    authenticate,
  allowedTo("admin","manager"),)
router
  .route("/")
  .get(getBrands)
  .post(uploadBrandImage, resizeBrandImage, createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(uploadBrandImage, resizeBrandImage,updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
