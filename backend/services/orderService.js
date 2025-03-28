const factory = require('./handlerfactory');
const Brand = require('../models/brand_model');
const { uploadSingleImage } = require('../middlewares/uplaodImageMiddleWare');
const Order = require('../models/OrderModel');


// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getOrders = factory.getAll(Order);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getOrder = factory.getOne(Order);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createOrder = factory.createOne(Order);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateOrder = factory.updateOne(Order);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteOrder = factory.deleteOne(Order);