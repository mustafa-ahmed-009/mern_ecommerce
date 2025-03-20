const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this sub category"],
      unique: [true, "sub category name should be unique"],
      minlength: [3, "sub category name should be at least 3 characters long"],
      maxlength: [32, "too long sub category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide a category"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SubCategory", subCategorySchema);
