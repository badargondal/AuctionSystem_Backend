const mongoose = require("mongoose");

const bid = mongoose.Schema(
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
    bids: [bid],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", auctionSchema);
