const factory = require('./handlerfactory');
const Brand = require('../models/brand_model');
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const { uploadSingleImage } = require('../middlewares/uplaodImageMiddleWare');
const sharp = require('sharp');
exports.resizeBrandImage = asyncHandler(async (req, res, next) => {
    const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  
  if (req.file) { 
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/brands/${filename}`);
        // Save image into our db
        req.body.image = filename;
  }
  
    next();
});
  
exports.uploadBrandImage = uploadSingleImage('image');

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = factory.getAll(Brand);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = factory.getOne(Brand);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = factory.createOne(Brand);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = factory.updateOne(Brand);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = factory.deleteOne(Brand);