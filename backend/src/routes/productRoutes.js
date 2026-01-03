const express = require("express");
const scrapeAmazon = require("../services/amazonScraper");
const Product = require("../models/Product");

const router = express.Router();

// Trigger scraping
router.get("/scrape/:keyword", async (req, res) => {
  try {
    const data = await scrapeAmazon(req.params.keyword);
    res.json({ count: data.length, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get stored products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
