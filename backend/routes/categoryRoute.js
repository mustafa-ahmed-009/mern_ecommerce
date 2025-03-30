// routes/categoryRoute.js
const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/category_validator");
const { authenticate, allowedTo } = require('../services/authService');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  // Remove resizeImage import
  // resizeImage, 
} = require("../services/categoryService");

// Import the new Cloudinary middleware
const { uploadCategoryToCloudinary } = require('../middlewares/cloudnairyMiddleWare'); // Adjust path if needed

const subcategoriesRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    authenticate,
    allowedTo("admin", "manager"),
    uploadCategoryImage,        // 1. Multer puts file in req.file.buffer
    uploadCategoryToCloudinary, // 2. Upload buffer to Cloudinary, sets req.body.image
    createCategoryValidator,    // 3. Validate (including potentially the image field if needed)
    createCategory              // 4. Create category using req.body (which now has Cloudinary URL)
  );

router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    authenticate,
    allowedTo("admin", "manager"),
    uploadCategoryImage,        // 1. Multer
    uploadCategoryToCloudinary, // 2. Cloudinary Upload
    updateCategoryValidator,    // 3. Validate
    updateCategory              // 4. Update category using req.body
  )
  .delete(
    authenticate,
    allowedTo("admin", "manager"),
    deleteCategoryValidator,
    deleteCategory // Consider adding Cloudinary deletion logic here or in the service
  );

module.exports = router;