const cheerio = require("cheerio");
const axios = require("axios");
const { connectDB } = require("../backend/src/config/db.js");
const { bookModel } = require("../backend/src/dbSchema.js");
require("dotenv").config();

const BASE_URL = "https://books.toscrape.com/catalogue/";
const ratingMap = { One: 1, Two: 2, Three: 3, Four: 4, Five: 5 };

async function scrapeBooks() {
  await connectDB();
  try {
    let nextPage = "page-1.html";

    while (nextPage) {
      console.log(`📖 Scraping: ${BASE_URL + nextPage}`);
      const { data } = await axios.get(BASE_URL + nextPage);
      const $ = cheerio.load(data);

      const booksOnPage = $(".product_pod");
      for (let i = 0; i < booksOnPage.length; i++) {
        const el = booksOnPage[i];
        const title = $(el).find("h3 a").attr("title");
        const price = parseFloat($(el).find(".price_color").text().replace("£", ""));
        const availability = $(el).find(".availability").text().includes("In stock") ? "In stock" : "Out of stock";
        const ratingClass = $(el).find(".star-rating").attr("class").split(" ")[1];
        const rating = ratingMap[ratingClass] || 0;
        const detailPageUrl = BASE_URL + $(el).find("h3 a").attr("href");
        const thumbnailUrl = "https://books.toscrape.com/" + $(el).find("img").attr("src").replace("../", "");

        await bookModel.updateOne(
          { title },
          { title, price, availability, rating, detailPageUrl, thumbnailUrl },
          { upsert: true }
        );
      }

      const next = $(".next a").attr("href");
      nextPage = next ? next : null;
    }

    console.log("Scraping completed!");
  } catch (err) {
    console.error("Scraping failed:", err.message);
    throw err;
  }
}


module.exports = { scrapeBooks };


// Run manually only if this file is executed directly
if (require.main === module) {
  (async () => {
    console.log("⏳ Manual scrape started...");
    try {
      await scrapeBooks();
      console.log("Manual scrape finished!");
      process.exit(0);
    } catch (err) {
      console.error("Manual scrape failed:", err);
      process.exit(1);
    }
  })();
}
