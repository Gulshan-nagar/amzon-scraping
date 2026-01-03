const puppeteer = require("puppeteer");
const Product = require("../models/Product");

const scrapeAmazon = async (searchTerm) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
  );

  const url = `https://www.amazon.in/s?k=${searchTerm}`;
  await page.goto(url, { waitUntil: "networkidle2" });

  const products = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll(".s-result-item").forEach((el) => {
      const title = el.querySelector("h2 span")?.innerText;
      const price = el.querySelector(".a-price-whole")?.innerText;
      const rating = el.querySelector(".a-icon-alt")?.innerText;
      const image = el.querySelector("img")?.src;
      const link = el.querySelector("h2 a")?.href;

      if (title && price) {
        items.push({ title, price, rating, image, link });
      }
    });
    return items;
  });

  await Product.deleteMany();
  await Product.insertMany(products);

  await browser.close();
  return products;
};

module.exports = scrapeAmazon;
