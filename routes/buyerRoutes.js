const express = require("express");
const bidController = require("../controllers/bid_controller");
const router = express.Router();
//buyer
router.post("/bid", bidController.create);

module.exports = router;
