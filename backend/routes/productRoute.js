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

// router.use(authenticate,
//   allowedTo("admin","manager"))

router.route('/').get(getProducts).post(uploadProductImages,resizeProductImages,createProductValidator, createProduct);
router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(uploadProductImages,resizeProductImages,updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;