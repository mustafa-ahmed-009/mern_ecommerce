const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary'); // Adjust path to your Cloudinary config

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [20, 'Too short product description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
      max: [200000, 'Too long product price'],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    imageCover: {         // Will store Cloudinary URL
      type: String,
      required: [true, 'Product Image cover is required'],
    },
    images: [String],     // Will store array of Cloudinary URLs

    imageCoverPublicId: String, // <<< Field for Cover Image Public ID
    imagesPublicIds: [String],  // <<< Field for Gallery Image Public IDs

    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must be belong to category'],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true , toJSON: { virtuals: true }, toObject: { virtuals: true }}
);

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

// Mongoose query middleware (Populate category - this is fine)
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name _id', // Only select name and id
  });
  // Example: You could populate other refs here if needed
  // this.populate({ path: 'brand', select: 'name' }); 
  next();
});


// --- Middleware Hooks for Cloudinary Deletion ---

// BEFORE Deleting the document from DB: Delete ALL associated images from Cloudinary
productSchema.pre('findOneAndDelete', async function(next) {
  try {
    const docToDelete = await this.model.findOne(this.getQuery());
    if (!docToDelete) return next(); // Document not found

    const deletions = [];

    // Delete cover image if public ID exists
    if (docToDelete.imageCoverPublicId) {
      console.log(`Deleting Product cover image from Cloudinary: ${docToDelete.imageCoverPublicId}`);
      deletions.push(cloudinary.uploader.destroy(docToDelete.imageCoverPublicId));
    }

    // Delete gallery images if public IDs exist
    if (docToDelete.imagesPublicIds && docToDelete.imagesPublicIds.length > 0) {
      console.log(`Deleting Product gallery images from Cloudinary: ${docToDelete.imagesPublicIds.join(', ')}`);
      // Use delete_resources for efficiency when deleting multiple images
      deletions.push(cloudinary.api.delete_resources(docToDelete.imagesPublicIds));
    }

    if (deletions.length > 0) {
      await Promise.all(deletions);
      console.log('Cloudinary product image deletions completed.');
    }
    next();
  } catch (error) {
    console.error("Error deleting product images from Cloudinary during delete:", error);
    next(); // Logged error, proceed with DB deletion
  }
});

// BEFORE Updating the document in DB: Delete OLD images from Cloudinary IF new ones are provided
productSchema.pre('findOneAndUpdate', async function(next) {
  try {
    const docToUpdate = await this.model.findOne(this.getQuery());
    if (!docToUpdate) return next();

    const updateData = this.getUpdate().$set || this.getUpdate();
    const deletions = [];

    // Check if cover image is being updated AND there was an old public ID
    if (updateData.imageCover && docToUpdate.imageCoverPublicId) {
        // Optional: Check if URL actually changed
        if (updateData.imageCover !== docToUpdate.imageCover) {
            console.log(`Deleting OLD Product cover image from Cloudinary during update: ${docToUpdate.imageCoverPublicId}`);
            deletions.push(cloudinary.uploader.destroy(docToUpdate.imageCoverPublicId));
        }
    }

    // Check if the entire 'images' array is being updated AND there were old public IDs
    // Note: This handles replacing the whole array. Different logic is needed
    // if you PATCH to add/remove individual images from the array.
    if (updateData.images && docToUpdate.imagesPublicIds && docToUpdate.imagesPublicIds.length > 0) {
      // Assuming updateData.images contains new URLs and updateData.imagesPublicIds contains new IDs
      // We delete the *old* public IDs stored in docToUpdate.imagesPublicIds
       console.log(`Deleting OLD Product gallery images from Cloudinary during update: ${docToUpdate.imagesPublicIds.join(', ')}`);
       deletions.push(cloudinary.api.delete_resources(docToUpdate.imagesPublicIds));
    }

    if (deletions.length > 0) {
      await Promise.all(deletions);
      console.log('Cloudinary old product image deletions completed during update.');
    }
    next();
  } catch (error) {
    console.error("Error deleting old product images from Cloudinary during update:", error);
    next(); // Logged error, proceed with DB update
  }
});

module.exports = mongoose.model('Product', productSchema);