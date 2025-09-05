const express = require("express");
const router = express.Router();
const { bookModel } = require("../src/dbSchema");
const { scrapeBooks } = require("../../scraper/scraper");


// GET /api/books
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { rating, minPrice, maxPrice, availability, search } = req.query;
    const query = {};

    if (rating) query.rating = Number(rating);
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (availability) query.availability = availability;
    if (search) query.title = { $regex: search, $options: "i" };

    const books = await bookModel.find(query).skip(skip).limit(limit);
   console.log("Query:", query, "Books found:", books.length);

    const total = await bookModel.countDocuments(query);

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
      books,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Find book by _id
    const book = await bookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    // Handle invalid ObjectId errors or other errors
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    console.log("🚀 Refresh endpoint triggered");
    await scrapeBooks(); // manually trigger scraping
    res.json({ message: "Scraping completed and database refreshed!" });
  } catch (err) {
    console.error("❌ Refresh failed:", err);
    res.status(500).json({ error: "Scraping failed", details: err.message });
  }
});

module.exports = { bookRouter: router };
