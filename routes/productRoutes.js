const express = require("express");
const productsController = require("../controllers/products_controller");
const auctionController = require("../controllers/auction_controller");
const router = express.Router();
// /products
router.get("", productsController.getAllProducts);
router.get("/:id", productsController.getProduct);
router.get("/auction/all", auctionController.getAllAuctions);
module.exports = router;
