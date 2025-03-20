const factory = require('./handlerfactory');
const Coupon = require('../models/couponModel');


  

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getCoupons = factory.getAll(Coupon);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getCoupon = factory.getOne(Coupon);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createCoupon = factory.createOne(Coupon);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateCoupon = factory.updateOne(Coupon);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteCoupon = factory.deleteOne(Coupon);