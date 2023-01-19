const express = require("express");
const auctionController = require("../controllers/auction_controller");
const productController = require("../controllers/products_controller");
const adminController = require("../controllers/admin_controller");

const router = express.Router();
//admin
router.put("/auction/:id", auctionController.update);
router.delete("/products/:id", productController.destroy);
router.delete("/seller/:id", adminController.destroy);

module.exports = router;
