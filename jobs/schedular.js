var cron = require("node-cron");
const Mail = require("../mail/mail.js");
const Auction = require("../model/AuctionSchema");
const currentTimeAndDate = new Date();

cron.schedule("*/05 * * * * *", () => {
  console.log("running a task every 05 second");
  const promise1 = new Promise((resolve, reject) => {
    resolve(Auctions());
  }).then((value) => {
    value.map((item) => {
      if (currentTimeAndDate > item.endTime) {
        updateAuction(item.id);
      }
    });
  });
});

async function Auctions() {
  const auctions = await Auction.find({});
  return auctions;
}
const updateAuction = async (ItemId) => {
  Mail;
  const id = ItemId;
  if (!id) {
    console.log("Id is Missing", id);
  }

  try {
    const auction = await Auction.findByIdAndUpdate(
      id,
      {
        $set: {
          status: false,
          approved: false,
        },
      },
      { new: true }
    );
  } catch (error) {
    console.log("Error", error);
  }
};
