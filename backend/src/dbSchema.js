const { mongoose } = require("./config/db");
const Schema=mongoose.Schema;
const ObjectId= mongoose.ObjectId;


const BookSchema = new mongoose.Schema(
    { title: { type: String, required: true, index: true }, 
    price: { type: Number, required: true, index: true }, 
    availability: { type: String, enum: ["In stock", "Out of stock"], index: true }, 
    rating: { type: Number, min: 1, max: 5, index: true }, 
    detailPageUrl: { type: String, required: true }, 
    thumbnailUrl: { type: String, required: true } }, 
    { timestamps: true });

 const bookModel= mongoose.model("Book",BookSchema,"books");
module.exports = { bookModel };