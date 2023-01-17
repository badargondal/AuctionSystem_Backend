const Auction = require("../model/AuctionSchema");

const getAllAuctions = async (req, res, next) => {
  try {
    const auctions = await Auction.find({ approved: true })
      .populate("productId")
      .populate("sellerId");
    res.json(auctions);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};
const getAuction = async (req, res, next) => {
  try {
    const auction = await Auction.findById(req.params.id).populate("sellerId");
    res.json(auction);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const create = async (req, res, next) => {
  let auction;

  const data = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    minimumBids: req.body.minimumBids,
    // productId: req.body.productId,
    productId: "63bdaceb9b9f5ef9a5f46c59",
    sellerId: req.user.id,
  };
  try {
    auction = await Auction.create(data);
    res.status(201).json({ auction, message: "Auction Created Successfully" });
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
  getAllAuctions,
  create,
  destroy,
  update,
  getAuction,
};
