const factory = require('./handlerfactory');
const Brand = require('../models/brand_model');
const Order = require('../models/OrderModel');
const asyncHandler = require('express-async-handler'); // Assuming you use this utility
const ApiError = require('../utils/api_error');

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
exports.getOrdersOfCustomer = asyncHandler(async (req, res, next) => {
    const customerId = req.user?.id; 
    if (!customerId) {
        // This shouldn't happen if the route is protected by auth middleware
        return next(new ApiError('Customer ID not found, user may not be authenticated', 400));
      }
    const query = Order.find({ customerId: customerId }).sort({ createdAt: -1 });
    const orders = await query;
    res.status(200).json({
        results: orders.length, 
        data: orders,
      });
})