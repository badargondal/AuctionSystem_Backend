const Auction = require("../model/AuctionSchema");
const Product = require("../model/ProductSchema");
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("sellerId");
    res.json(products);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("sellerId");
    res.json(product);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const create = async (req, res, next) => {
  let product;

  const data = {
    price: req.body.price,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    description: req.body.description,
    imgGroup: req.body.imgUrl,
    sellerId: req.user.id,
  };
  try {
    product = await Product.create(data);
    res.status(201).json({ product, message: "Product Created Successfully" });
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
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(id);
    const auctiondelete = await Auction.deleteMany({ productId: id });
    res.json({ message: "Product Deleted Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

module.exports = {
  getAllProducts,
  create,
  destroy,
  update,
  getProduct,
};
