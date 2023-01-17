const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    default:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
  },
  imgGroup: [
    {
      type: String,
    },
  ],
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  status: {
    type: String,
    default: "live",
  },
});

module.exports = mongoose.model("Product", productSchema);
