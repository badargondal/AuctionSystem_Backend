const Auction = require("../model/AuctionSchema");

const getAllAuctions = async (req, res, next) => {
  try {
    const auctions = await Auction.find()
      .populate("productId")
      .populate("sellerId");
    res.json(auctions);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};
const getAuction = async (req, res, next) => {
  try {
    const auction = await Auction.findById(req.params.id).populate("sellerId");
    res.json(auction);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const getMyAuctions = async (req, res, next) => {
  try {
    const auction = await Auction.find({ sellerId: req.user.id })
      .populate("sellerId")
      .populate("productId")
      .populate({
        path: "bids",
        populate: {
          path: "buyerId",
          model: "Buyer",
        },
      })
      .populate({
        path: "bids",
        populate: {
          path: "productId",
          model: "Product",
        },
      });
    res.json(auction);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const create = async (req, res, next) => {
  let auction;

  const data = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    minimumBids: req.body.minimumBids,
    productId: req.body.productId,
    sellerId: req.user.id,
  };
  try {
    auction = await Auction.create(data);
    res.status(201).json({ auction, message: "Auction Created Successfully" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

const update = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next({ status: 404, message: "ID Is Missing" });
  }

  try {
    const auction = await Auction.findByIdAndUpdate(
      id,
      {
        $set: {
          approved: req.body.approved,
        },
      },
      { new: true }
    );

    res.status(201).json({ auction, message: "Auction Record Updated" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

async function findWinner(auctions) {
  const bidData = [];
  const winner = await auctions.forEach((item) => {
    if (item.bids.length > 0) {
      const arr = item.bids;
      const BidWinner = arr.sort(
        (a, b) => Number(b.bidAmount) - Number(a.bidAmount)
      );

      item.bids = BidWinner;
      bidData.push(item);
    }
  });

  return bidData;
}

const getBidsReport = async (req, res, next) => {
  try {
    const auctions = await Auction.find()
      .populate("productId")
      .populate("sellerId")
      .populate({
        path: "bids",
        populate: {
          path: "buyerId",
          model: "Buyer",
        },
      })
      .populate({
        path: "bids",
        populate: {
          path: "productId",
          model: "Product",
        },
      });

    const value = await findWinner(auctions);
    res.json(value);
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

const addBid = async (req, res, next) => {
  const bid = {
    bidAmount: req.body.bidAmount,
    buyerId: req.user.id,
    productId: req.body.productId,
  };
  const id = req.params.id;

  if (!id) {
    return next({ status: 404, message: "ID Is Missing" });
  }
  try {
    const auction = await Auction.findByIdAndUpdate(
      id,
      {
        $push: {
          bids: {
            $each: [bid],
            $position: 0,
          },
        },
      },
      { new: true }
    );
    res.status(201).json({ auction, message: "Bid Added Successfuly" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

module.exports = {
  getAllAuctions,
  create,
  update,
  getAuction,
  addBid,
  getBidsReport,
  getMyAuctions,
};
