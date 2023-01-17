const express = require("express");
const auctionController = require("../controllers/auction_controller");
const router = express.Router();

router.get("", auctionController.getAllAuctions);
router.get("/:id", auctionController.getAuction);
module.exports = router;
