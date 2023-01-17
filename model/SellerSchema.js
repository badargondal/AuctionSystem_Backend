const mongoose = require("mongoose");

const SellerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  review: String
});

module.exports = mongoose.model("Seller", SellerSchema);
