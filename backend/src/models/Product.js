const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    rating: String,
    image: String,
    link: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
