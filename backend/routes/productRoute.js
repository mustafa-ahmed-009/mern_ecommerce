const express = require('express');
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require('../utils/validators/productValidator');
const { authenticate, allowedTo } = require('../services/authService');
const reviewRoute = require("../routes/reviewRoute");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  resizeProductImages,
  uploadProductImages
} = require('../services/productService');

const router = express.Router();


router.use("/:productId/reviews", reviewRoute);



router.route('/').get(getProducts).post(authenticate,
  allowedTo("admin","manager"),uploadProductImages,resizeProductImages,createProductValidator, createProduct);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(authenticate,
    allowedTo("admin","manager"),updateProductValidator, updateProduct)
  .delete(authenticate,
    allowedTo("admin"),deleteProductValidator, deleteProduct);

module.exports = router;