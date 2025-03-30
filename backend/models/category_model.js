const mongoose = require("mongoose");

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
    image: String,
}, {
    timestamps: true,
});



const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;