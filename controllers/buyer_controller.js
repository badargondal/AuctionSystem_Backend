const { parse } = require("dotenv");
const Bid = require("../model/BidSchema");
const Buyer = require("../model/BuyerSchema");
// const Product = require("../model/ProductSchema");
// const Seller = require("../model/SellerSchema");

// const viewProfile = async (req, res, next) => {
//   try {
//     const buyer = await Vendor.findById(req.user.id);
//     // const orders = await Order.find({ buyerId: req.user.id })
//     res.json(buyer);
//   } catch (error) {
//     next({ status: 404, message: error.message });
//   }
// };

// const updateProfile = async (req, res, next) => {
//   const id = req.user.id;
//   if (!id) {
//     return next({ status: 404, message: "User Not Found" });
//   }

//   try {
//     const buyer = await Buyer.findByIdAndUpdate(
//       id,
//       {
//         $set: {
//           name: req.body.first_name,
//           email: req.body.email,
//           phone: req.body.contact,
//         },
//       },
//       { new: true }
//     );

//     res.status(201).json({ buyer, message: "Profile Updated" });
//   } catch (error) {
//     next({ status: 500, message: error.message });
//   }
// };

// const myProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find({ sellerId: req.user.id });
//     res.json(products);
//   } catch (error) {
//     next({ status: 404, message: error.message });
//   }
// };

// const getProduct = async (req, res, next) => {
//   try {
//     const products = await Product.findById(req.params.id);
//     res.json(products);
//   } catch (error) {
//     next({ status: 404, message: error.message });
//   }
// };

// const addProduct = async (req, res, next) => {
//   const address = {
//     name: req.body.name,
//     address: req.body.address,
//     phone: req.body.phone,
//   };
//   const buyerID = req.user.id;
//   try {
//     const buyer = await Buyer.findByIdAndUpdate(
//       buyerID,
//       {
//         $push: {
//           address: {
//             $each: [address],
//             $position: 0,
//           },
//         },
//       },
//       { new: true }
//     );
//     res.status(201).json({ buyer, message: "Address Added" });
//   } catch (error) {
//     next({ status: 500, message: error.message });
//   }
// };

// const myOrders = async (req, res, next) => {
//   const vendorId = req.user.id;
//   try {
//     const orders = await Order.find({ "products.vendorId": vendorId });
//     orders.forEach((order) => {
//       order.products = order.products.filter(
//         (product) => product.vendorId === vendorId
//       );
//     });
//     res.json(orders);
//   } catch (error) {
//     next({ status: 404, message: error.message });
//   }
// };

// const viewOrder = async (req, res, next) => {
//   const orderID = req.params.id;
//   try {
//     const order = await Order.findById(orderID);
//     order.products = order.products.filter(
//       (product) => product.vendorId === req.user.id
//     );
//     res.json(order);
//   } catch (error) {
//     next({ status: 404, message: error.message });
//   }
// };

const destroyBuyer = async (req, res, next) => {
  const id = req.params.id;
  try {
    const buyer = await Buyer.findByIdAndDelete(id);
    const bidDelete = await Bid.deleteMany({ buyerId: id });
    res.json({ message: "Buyer Deleted Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
module.exports = {
  destroyBuyer,
  //   viewProfile,
  //   updateProfile,
  //   myProducts,
  //   addProduct,
  //   getProduct,
  //   myOrders,
  //   viewOrder,
};
