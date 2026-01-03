const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// 👇 FIX IS HERE
dotenv.config({ path: "../.env" });

const app = express();

// connect DB AFTER dotenv
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Amazon Scraper API Running");
});

app.use("/api/products", require("./routes/productRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
