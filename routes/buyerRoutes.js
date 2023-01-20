const express = require("express");
const bidController = require("../controllers/bid_controller");
const adminController = require("../controllers/admin_controller");
const authMiddleWare = require("../middlewares/authMiddleware");
const router = express.Router();
//buyer
router.post("/bid", authMiddleWare, bidController.create);
router.get("/all", adminController.getAllBuyers);
router.get("/:id", adminController.getBuyer);

module.exports = router;
