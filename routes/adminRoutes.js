const express = require("express");
const auctionController = require("../controllers/auction_controller");
const productController = require("../controllers/products_controller");
const adminController = require("../controllers/admin_controller");
const sellerController = require("../controllers/seller_controller");
const buyerController = require("../controllers/buyer_controller");

const router = express.Router();
//admin
router.get("/bids", auctionController.getBidsReport);
router.put("/auction/:id", auctionController.update);

router.delete("/products/:id", productController.destroy);
router.delete("/seller/:id", sellerController.destroySeller);
router.delete("/buyer/:id", buyerController.destroyBuyer);

module.exports = router;
