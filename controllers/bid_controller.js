const Bid = require("../model/BidSchema");

const getAllBids = async (req, res, next) => {
  try {
    const bids = await Bid.find({}).populate("productId").populate("buyerId");
    res.json(bids);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};
async function prod(item) {
  const productss = await Bid.find({ productId: item })
    .sort({ bidAmount: -1 })
    .limit(1)
    .populate("productId")
    .populate("buyerId");
  return productss;
}

async function bid_data(unique_products) {
  const new_list = [];
  for (let i = 0; i < unique_products.length; i++) {
    var current_product = await prod(unique_products[i]);
    new_list.push(current_product[0]);
  }
  return new_list;
}
const getBidsReport = async (req, res, next) => {
  try {
    const bids = await Bid.find({}).populate("productId").populate("buyerId");
    let products = bids?.map((i) => i.productId);
    products = [...new Set(products?.map((item) => item._id))];
    const bid_records = await bid_data(products);
    res.json(bid_records);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const getBid = async (req, res, next) => {
  try {
    const bid = await Bid.findById(req.params.id).populate("buyerId");
    res.json(bid);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const create = async (req, res, next) => {
  let bid;

  const data = {
    bidAmount: req.body.bidAmount,
    productId: req.body.productId,
    buyerId: req.user.id,
  };
  try {
    bid = await Bid.create(data);
    res.status(201).json({ bid, message: "Bid Created Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};



const destroy = async (req, res, next) => {
  const id = req.params.productID;
  try {
    const blog = await Product.findByIdAndDelete(id);
    res.json({ message: "Product Deleted" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

module.exports = {
  getAllBids,
  create,
  destroy,
  getBid,
  getBidsReport,
};
