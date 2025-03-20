const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this brand"],
      unique: [true, "brand name should be unique"],
      minlength: [3, "brand name should be at least 3 characters long"],
      maxlength: [32, "too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
image:String
  },
  { timestamps: true }
);

const setImageUrl = (doc) => { 
  if (doc.image) { 
      const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
      doc.image = imageUrl;
  }
}
brandSchema.post('save', function(doc) {
  setImageUrl(doc);
});

brandSchema.post('init', function(doc) {
  setImageUrl(doc);
});
module.exports = mongoose.model("brand", brandSchema);
