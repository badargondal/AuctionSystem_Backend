const express = require("express");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
const cors = require("cors");
const authMiddleWare = require("./middlewares/authMiddleware");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());

// Routes Imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

// Getting Variables from .env
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

// DB Connection and Server

mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`DB Connection Successfull , Server Running at Port ${PORT}`)
    );
  })
  .catch((err) => console.log(err, "DB Connection Failed"));

app.use(authRoutes);
app.use("/admin", authMiddleWare, adminRoutes);
app.use("/seller", authMiddleWare, sellerRoutes);
app.use("/buyer", authMiddleWare, buyerRoutes);
app.use("/auctions", auctionRoutes);
app.use("/products", productRoutes);

app.use((err, req, res, next) => {
  res.status(err.status).json({ error: true, message: err.message });
});
