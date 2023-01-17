const Bid = require("../model/BidSchema");

const getAllBids = async (req, res, next) => {
  try {
    const bids = await Bid.find({ approved: true })
      .populate("productId")
      .populate("buyerId");
    res.json(bids);
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

const update = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next({ status: 404, message: "ID Is Missing" });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          price: req.body.price,
          title: req.body.title,
          imgUrl: req.body.imgUrl,
          stock: req.body.stock,
          description: req.body.description,
          category: req.body.category,
          discount: req.body.discount,
        },
      },
      { new: true }
    );

    res.status(201).json({ product, message: "Products Record Updated" });
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
  update,
  getBid,
};
