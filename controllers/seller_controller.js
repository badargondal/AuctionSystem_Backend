const { parse } = require("dotenv");
const Auction = require("../model/AuctionSchema");
const Product = require("../model/ProductSchema");
const Seller = require("../model/SellerSchema");

const myProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ sellerId: req.user.id });
    res.json(products);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const getProduct = async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id);
    res.json(products);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const destroySeller = async (req, res, next) => {
  const id = req.params.id;
  try {
    const seller = await Seller.findByIdAndDelete(id);
    const productDelete = await Product.deleteMany({ sellerId: id });
    const auctionDelete = await Auction.deleteMany({ sellerId: id });
    res.json({ message: "Seller Deleted Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

module.exports = {
  myProducts,
  getProduct,
  destroySeller,
};
