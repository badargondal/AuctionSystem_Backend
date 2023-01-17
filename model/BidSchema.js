const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    bidAmount: {
      type: Number,
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", bidSchema);
