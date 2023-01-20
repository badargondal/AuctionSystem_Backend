const Auction = require("../model/AuctionSchema");
const Product = require("../model/ProductSchema");
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

// const create = async (req, res, next) => {
//   let product;

//   const data = {
//     price: req.body.price,
//     title: req.body.title,
//     // imgUrl: req.body.imgUrl,
//     imgUrl:
//       "https://thumbs.dreamstime.com/z/wooden-chair-isolated-11718982.jpg",
//     description: req.body.description,
//     // imgGroup: req.body.imgUrl,
//     imgGroup:
//       "https://thumbs.dreamstime.com/z/wooden-chair-isolated-11718982.jpg",
//     sellerId: req.user.id,
//   };
//   try {
//     product = await Product.create(data);
//     res.status(201).json({ product, message: "Product Created Successfully" });
//   } catch (error) {
//     next({ status: 500, message: error.message });
//   }
// };

// const update = async (req, res, next) => {
//   const id = req.params.id;
//   if (!id) {
//     return next({ status: 404, message: "ID Is Missing" });
//   }

//   try {
//     const product = await Product.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           price: req.body.price,
//           title: req.body.title,
//           imgUrl: req.body.imgUrl,
//           stock: req.body.stock,
//           description: req.body.description,
//           category: req.body.category,
//           discount: req.body.discount,
//         },
//       },
//       { new: true }
//     );

//     res.status(201).json({ product, message: "Products Record Updated" });
//   } catch (error) {
//     next({ status: 500, message: error.message });
//   }
// };

// const destroyBuyer = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const buyer = await Buyer.findByIdAndDelete(id);
//     const productDelete = await Product.deleteMany({ sellerId: id });
//     const auctionDelete = await Auction.deleteMany({ sellerId: id });
//     res.json({ message: "Seller Deleted Successfully" });
//   } catch (error) {
//     next({ status: 500, message: error.message });
//   }
// };

module.exports = {
  getAllSeller,
  getSeller,
  getAllBuyers,
  getBuyer,
};
