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

router
  .route("/")
  .get(getBrands)
  .post(    authenticate,
      allowedTo("admin","manager"),uploadBrandImage, resizeBrandImage, createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(    authenticate,
      allowedTo("admin","manager"),updateBrandValidator, updateBrand)
  .delete(    authenticate,
      allowedTo("admin"),deleteBrandValidator, deleteBrand);

module.exports = router;
