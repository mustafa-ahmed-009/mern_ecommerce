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

const setImageUrl = (doc) => {
    // Check if the image field already contains the base URL
    if (doc.image && !doc.image.startsWith(process.env.BASE_URL)) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
};

// Apply the setImageUrl function after saving or initializing a document
categorySchema.post('save', function (doc) {
    setImageUrl(doc);
});

categorySchema.post('init', function (doc) {
    setImageUrl(doc);
});

const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;