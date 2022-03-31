const mongoose = require("mongoose");

//create book schema
const BookSchema = mongoose.Schema(
    {
        ISBN: String,
        title: String,
        pubDate: String,
        language: String,
        numPage: Number,
        author: [Number],
        publications: [Number],
        category: [String]
    }
);

//create book model
const BookModel = mongoose.model("book",BookSchema);

module.exports = BookModel; 