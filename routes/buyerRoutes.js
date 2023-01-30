const express = require("express");
const adminController = require("../controllers/admin_controller");
const authMiddleWare = require("../middlewares/authMiddleware");
const auctionController = require("../controllers/auction_controller");
const router = express.Router();
//buyer

router.get("/all", adminController.getAllBuyers);
router.get("/:id", adminController.getBuyer);
router.get("/bid/all", authMiddleWare, auctionController.addBid);
router.put("/bid/:id", authMiddleWare, auctionController.addBid);

module.exports = router;
