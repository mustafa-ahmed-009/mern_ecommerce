const express = require("express");

const subCategroyRoute = express.Router({
  mergeParams :true 
});
const {authenticate , allowedTo} = require('../services/authService');

// servies Imports 
const {
  createSubCategory,
 getSubCategories,
 getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
} = require("../services/subCategroyService");
const {
  createCategoryValidator,
  getSubCategoryByIdValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/sub_category_validator");



// subCategory  routes middlewares 
subCategroyRoute
  .route("/")
  .post(authenticate,
    allowedTo("admin","manager"),setCategoryIdToBody ,createCategoryValidator, createSubCategory)
  .get(getSubCategories);

subCategroyRoute
  .route("/:id")
  .get(getSubCategoryByIdValidator, getSubCategory)
  .put(authenticate,
    allowedTo("admin","manager"),updateSubCategoryValidator, updateSubCategory)
  .delete(authenticate,
    allowedTo("admin"),deleteSubCategoryValidator , deleteSubCategory);

module.exports = subCategroyRoute;
