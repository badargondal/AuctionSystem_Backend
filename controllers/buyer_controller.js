const { parse } = require("dotenv");
const Buyer = require("../model/BuyerSchema");

const destroyBuyer = async (req, res, next) => {
  const id = req.params.id;
  try {
    const buyer = await Buyer.findByIdAndDelete(id);
    res.json({ message: "Buyer Deleted Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
module.exports = {
  destroyBuyer,
};
