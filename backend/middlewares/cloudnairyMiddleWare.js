// Create a new middleware file or add to an existing one 
// (e.g., middlewares/uploadImageMiddleware.js or within categoryService.js)

const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary'); // Adjust path as needed
const ApiError = require('../utils/api_error');

// Middleware to upload image buffer to Cloudinary
exports.uploadCategoryToCloudinary = asyncHandler(async (req, res, next) => {
  // 1. Check if a file was received from multer
  if (!req.file) {
    return next(); // No file uploaded, skip to next middleware
  }

  // 2. Define Cloudinary upload options
  const options = {
    folder: 'ecommerce/categories', // Optional: Organize uploads in Cloudinary
    // Add transformations directly here (replaces sharp resizing)
    transformation: [
       { width: 600, height: 600, crop: 'limit' }, // Resize like sharp did
       { format: 'jpg', quality: 'auto:good' }     // Format and quality
       // Add more transformations as needed
    ],
    // Cloudinary generates a unique public_id by default, which is usually fine
    // public_id: `category-${uuidv4()}`, // Optional: if you need custom naming
    resource_type: 'image' // Ensure it's treated as an image
  };

  // 3. Upload using upload_stream for buffers
  const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
    if (error) {
      console.error('Cloudinary Upload Error:', error);
      // Important: Pass error to global error handler
      return next(new ApiError('Failed to upload image to cloud', 500)); 
    }

    if (!result) {
       console.error('Cloudinary Upload Error: No result received.');
       return next(new ApiError('Image upload failed - no result received from cloud', 500));
    }

    // 4. Attach Cloudinary URL (and optionally public_id) to req.body
    // The factory handlers (createOne, updateOne) will use req.body.image
    req.body.image = result.secure_url; 
    
    // OPTIONAL BUT RECOMMENDED: Store public_id for deletion later
    // You might need to add a 'cloudinaryPublicId' field to your Category schema
    // req.body.cloudinaryPublicId = result.public_id; 

    next(); // Proceed to the next middleware (validator, controller)
  });

  // 4. Pipe the buffer into the Cloudinary upload stream
  uploadStream.end(req.file.buffer);
});