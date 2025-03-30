// Add this to your upload middleware file (e.g., middlewares/uploadImageMiddleware.js)
// or create a dedicated product middleware file.

const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary'); // Adjust path as needed
const ApiError = require('../utils/api_error');

exports.uploadProductImagesToCloudinary = asyncHandler(async (req, res, next) => {
  // Check if files were uploaded by multer
  if (!req.files) {
    return next(); // No files, proceed
  }

  // 1. Upload Image Cover (if exists)
  if (req.files.imageCover) {
    const file = req.files.imageCover[0];
    const options = {
      folder: 'ecommerce/products/covers', // Example folder
      // Add desired transformations for cover image
      transformation: [
         { width: 2000, height: 1333, crop: 'limit' }, // Example resize
         { format: 'jpg', quality: 'auto:good' }
      ],
      resource_type: 'image'
    };

    try {
      // Using a Promise wrapper for upload_stream
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary upload failed: No result'));
          resolve(result);
        });
        uploadStream.end(file.buffer);
      });

      // Attach URL to req.body
      req.body.imageCover = result.secure_url;
      // Optional: Store public_id for deletion
      // req.body.imageCoverPublicId = result.public_id; 

    } catch (error) {
      console.error('Cloudinary Cover Image Upload Error:', error);
      return next(new ApiError('Failed to upload cover image to cloud', 500));
    }
  }

  // 2. Upload Images array (if exists)
  if (req.files.images) {
    req.body.images = []; // Initialize array in req.body
    // Optional: Initialize public IDs array
    // req.body.imagesPublicIds = []; 

    // Use Promise.all to upload all images concurrently
    try {
      const uploadPromises = req.files.images.map(file => {
        return new Promise((resolve, reject) => {
          const options = {
            folder: 'ecommerce/products/gallery', // Example folder
            // Add desired transformations for gallery images
            transformation: [
               { width: 800, height: 800, crop: 'limit' }, // Example resize
               { format: 'jpg', quality: 'auto:good' }
            ],
            resource_type: 'image'
          };
          const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
             if (error) return reject(error);
             if (!result) return reject(new Error('Cloudinary upload failed: No result'));
             resolve(result);
          });
          uploadStream.end(file.buffer);
        });
      });

      const results = await Promise.all(uploadPromises);

      // Process results after all uploads are done
      results.forEach(result => {
        req.body.images.push(result.secure_url);
        // Optional: Store public_id for deletion
        // req.body.imagesPublicIds.push(result.public_id);
      });

    } catch (error) {
      console.error('Cloudinary Gallery Images Upload Error:', error);
      return next(new ApiError('Failed to upload gallery images to cloud', 500));
    }
  }

  next(); // Proceed after processing all uploads
});