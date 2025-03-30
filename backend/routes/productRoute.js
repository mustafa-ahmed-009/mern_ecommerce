// routes/productRoute.js (Assuming this is the file name)
const express = require('express');
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator'); // Ensure these validators exist and are correct
const { authenticate, allowedTo } = require('../services/authService'); // Adjust path if needed
const reviewRoute = require("./reviewRoute"); // Assuming this route exists
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages, // This is the multer middleware for products
} = require('../services/productService'); // Adjust path if needed

// Correctly import the Cloudinary middleware for PRODUCTS
// Assuming the middleware lives in 'middlewares/uploadImageMiddleware.js'
// Adjust the path ('../middlewares/uploadImageMiddleware') as per your project structure
const { uploadProductImagesToCloudinary } = require('../middlewares/productImageUploadMiddleware'); 

const router = express.Router();

// Nested route for reviews on a specific product
router.use("/:productId/reviews", reviewRoute);

// Routes for /api/v1/products (assuming this is the base path)
router.route('/')
  .get(getProducts) // Get all products
  .post(           // Create a new product
    authenticate,
    allowedTo("admin", "manager"),
    uploadProductImages,             // 1. Multer middleware to handle file uploads into req.files
    uploadProductImagesToCloudinary, // 2. Upload buffers from req.files to Cloudinary, sets req.body fields
    createProductValidator,          // 3. Validate request body (including potentially image fields)
    createProduct                    // 4. Call the service function to create the product in DB
  );

// Routes for /api/v1/products/:id
router.route('/:id')
  .get(getProductValidator, getProduct) // Get a single product by ID
  .put(                                 // Update a product by ID
    authenticate,
    allowedTo("admin", "manager"),
    uploadProductImages,             // 1. Multer
    uploadProductImagesToCloudinary, // 2. Cloudinary upload
    updateProductValidator,          // 3. Validate
    updateProduct                    // 4. Call the service function to update the product in DB
  )
  .delete(                             // Delete a product by ID
    authenticate,
    allowedTo("admin", "manager"),
    deleteProductValidator,
    deleteProduct // Reminder: Ensure Cloudinary deletion logic is implemented (e.g., via Mongoose hook)
  );

module.exports = router;