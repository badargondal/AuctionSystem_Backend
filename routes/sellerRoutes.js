const express = require("express");
const sellerController = require("../controllers/seller_controller");
const productsController = require("../controllers/products_controller");
const auctionController = require("../controllers/auction_controller");
const adminController = require("../controllers/admin_controller");

const authMiddleWare = require("../middlewares/authMiddleware");
const router = express.Router();
// Product Routes
//seller
router.get("/all", adminController.getAllSeller);
router.get("/products", authMiddleWare, sellerController.myProducts);
router.post("/product", authMiddleWare, productsController.create);
router.get("/:id", adminController.getSeller);
// router.put("/product/:id", productsController.update);
// router.delete("/product/:productID?", productsController.destroy);

//auction
router.get("/auctions/all", authMiddleWare, auctionController.getMyAuctions);
router.post("/auction/create", authMiddleWare, auctionController.create);

module.exports = router;
