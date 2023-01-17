const express = require("express");
const sellerController = require("../controllers/seller_controller");
const productsController = require("../controllers/products_controller");
const auctionController = require("../controllers/auction_controller");

const router = express.Router();
// Product Routes
//seller
router.get("/products", sellerController.myProducts);
router.post("/product", productsController.create);
// router.put("/product/:id", productsController.update);
// router.delete("/product/:productID?", productsController.destroy);

//auction
router.post("/auction/create", auctionController.create);


module.exports = router;
