const mongoose = require("mongoose");
const cloudinary = require('../config/cloudinary'); // Adjust path to your Cloudinary config

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a name for this category"],
        unique: [true, "category name should be unique"],
        minlength: [3, "category name should be at least 3 characters long"],
        maxlength: [32, "too long category name"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String, // Will store the Cloudinary URL
    cloudinaryPublicId: String // <<< Field to store Cloudinary Public ID
}, {
    timestamps: true,
});

// --- Middleware Hooks for Cloudinary Deletion ---

// BEFORE Deleting the document from DB: Delete image from Cloudinary
categorySchema.pre('findOneAndDelete', async function(next) {
  try {
    // 'this.getQuery()' gets the query conditions, e.g., { _id: '...' }
      const docToDelete = await this.model.findOne(this.getQuery());
      console.log(docToUpdate);
      console.log(`publicId ${docToDelete.cloudinaryPublicId}`);
      
    if (docToDelete && docToDelete.cloudinaryPublicId) {
      console.log(`Deleting Category image from Cloudinary: ${docToDelete.cloudinaryPublicId}`);
      await cloudinary.uploader.destroy(docToDelete.cloudinaryPublicId);
    }
    next();
  } catch (error) {
    console.error("Error deleting category image from Cloudinary during delete:", error);
    next(); // Proceed with DB deletion even if Cloudinary fails (log the error)
  }
});

// BEFORE Updating the document in DB: Delete OLD image from Cloudinary IF a new one is provided
categorySchema.pre('findOneAndUpdate', async function(next) {
  try {
    // 'this.getQuery()' gets the query conditions
      const docToUpdate = await this.model.findOne(this.getQuery());
      console.log(docToUpdate);
      
    if (!docToUpdate) return next(); // Should not happen normally

    // 'this.getUpdate()' gets the update operations
    const updateData = this.getUpdate().$set || this.getUpdate();

    // Check if 'image' field is being updated AND if there was an old public ID stored
    if (updateData.image && docToUpdate.cloudinaryPublicId) {
       // Ensure the new image isn't the same as the old one (optional check, URL might differ slightly)
       if (updateData.image !== docToUpdate.image) {
            console.log(`Deleting OLD Category image from Cloudinary during update: ${docToUpdate.cloudinaryPublicId}`);
            await cloudinary.uploader.destroy(docToUpdate.cloudinaryPublicId);
       }
    }
    next();
  } catch (error) {
    console.error("Error deleting old category image from Cloudinary during update:", error);
    next(); // Proceed with DB update even if Cloudinary fails (log the error)
  }
});


const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;