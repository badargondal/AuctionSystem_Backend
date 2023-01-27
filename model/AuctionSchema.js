const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    minimumBids: {
      type: Number,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    approved: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", auctionSchema);
