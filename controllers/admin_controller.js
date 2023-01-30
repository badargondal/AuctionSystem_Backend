const Seller = require("../model/SellerSchema");
const Buyer = require("../model/BuyerSchema");

const getAllSeller = async (req, res, next) => {
  try {
    const sellers = await Seller.find({});
    res.json(sellers);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};
const getSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);
    res.json(seller);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};
const getAllBuyers = async (req, res, next) => {
  try {
    const buyers = await Buyer.find({});
    res.json(buyers);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};
const getBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    res.json(buyer);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

module.exports = {
  getAllSeller,
  getSeller,
  getAllBuyers,
  getBuyer,
};
