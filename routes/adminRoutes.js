const express = require("express");
const auctionController = require("../controllers/auction_controller");

const router = express.Router();
//buyer
router.put("/auction/:id", auctionController.update);

module.exports = router;
