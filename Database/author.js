const mongoose = require("mongoose");

//create author schema
const AuthorSchema = mongoose.Schema(
    {
        id: Number,
        name: String,
        books: [String]
    }
);

//create author model
const AuthorModel = mongoose.model("author",AuthorSchema);

module.exports = AuthorModel;