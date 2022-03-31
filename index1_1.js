require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");

var bodyParser = require("body-parser");
//DATABASE
const database  = require("./Database/database");
const BookModel = require("./Database/book");
const AuthorModel = require("./Database/author");
const PublicationModel = require("./Database/publication");

//INITIALIZE EXPRESS
const booky = express();
//INITIALIZE BODY-PARSER
booky.use(express.urlencoded({extended: true}));
booky.use(express.json());//for no errors

//making connection
mongoose.connect(process.env.MONGO_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(() => console.log("Connection Established"));


//BOOKS
/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Method          Get
*/
booky.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/*
Route           /is
Description     Get specific book for a ISBN
Access          PUBLIC
Parameter       isbn
Method          Get
*/
booky.get("/is/:isbn", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    //!0 = 1, !1 = 0
    if(!getSpecificBook) {
        res.json({error: `No books are found for the isbn of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});

    //const getSpecificBook = database.books.filter(
    //   (book) => book.ISBN === req.params.isbn
    //);
    //if(getSpecificBook.length === 0) {
    //    res.json({error: `No books are found for the isbn of ${req.params.isbn}`});
    //}
    //return res.json({book: getSpecificBook});
});

/*
Route           /c
Description     Get list of books based on category
Access          PUBLIC
Parameter       category
Method          Get
*/
booky.get("/c/:category", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({category: req.params.category});
    //!0 = 1, !1 = 0
    if(!getSpecificBook) {
        res.json({error: `No books are found for the category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});


    /*const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );
    if(getSpecificBook.length === 0) {
        res.json({error: `No books are found for the category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});*/
});

/*
Route           /l
Description     Get list of books based on language
Access          PUBLIC
Parameter       language
Method          Get
*/
booky.get("/l/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    );
    if(getSpecificBook.length === 0) {
        res.json({error: `No books are found for the language of ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
});



//AUTHORS
/*
Route           /a
Description     Get all authors
Access          PUBLIC
Parameter       NONE
Method          Get
*/
booky.get("/a", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

/*
Route           /i
Description     Get specific author for a ID
Access          PUBLIC
Parameter       id
Method          Get
*/
booky.get("/i/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );
    if(getSpecificAuthor.length === 0) {
        res.json({error: `No authors are found for the id of ${req.params.id}`});
    }
    return res.json({author: getSpecificAuthor});
});

/*
Route           /a/b
Description     Get list of authors based on books
Access          PUBLIC
Parameter       isbn
Method          Get
*/
booky.get("/a/b/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0) {
        res.json({error: `No authors are found for the book of ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});
});



//PUBLICATIONS
/*
Route           /p
Description     Get all publications
Access          PUBLIC
Parameter       NONE
Method          Get
*/
booky.get("/p", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});

/*
Route           /p
Description     Get specific publication based on ID
Access          PUBLIC
Parameter       id
Method          Get
*/

booky.get("/p/:id", (req,res) => {
    const getSpecificPublication = database.publication.filter(
        (publications) => publications.id === parseInt(req.params.id)
    );
    if(getSpecificPublication.length === 0) {
        res.json({error: `No publications are found for the id of ${req.params.id}`});
    }
    return res.json({publications: getSpecificPublication});
});

/*
Route           /p/b
Description     Get specific publications based on books
Access          PUBLIC
Parameter       isbn
Method          Get
*/
booky.get("/p/b/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publications) => publications.books.includes(req.params.isbn)
    );
    if(getSpecificPublication.length === 0) {
        res.json({error: `No publications are found for the book of ${req.params.isbn}`});
    }
    return res.json({publications: getSpecificPublication});

})

//POST
/*
Route           /book/new
Description     Add new books
Access          PUBLIC
Parameter       NONE
Method          POST
*/


booky.post("/book/new", async(req,res) => {
    const { newBook } = req.body;//we have to destructure it because we send book in an object format
    //since there is no find function we remove await
    //If we put it even we dont get any error
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books: addNewBook,
        message: "Book was added!!!"
    });


    /*const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});*/
});

/*
Route           /publication/new
Description     Add new publications
Access          PUBLIC
Parameter       NONE
Method          POST
*/

booky.post("/publication/new", (req,res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json({updatedPublication: database.publication})
});


/*
Route           /author/new
Description     Add new authors
Access          PUBLIC
Parameter       NONE
Method          POST
*/

booky.post("/author/new", async (req,res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({
        author: addNewAuthor,
        message: "Author was added!!"
    });
    
    
    /*const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({updatedAuthor: database.author})*/
});

/**********PUT using mongoose*********/
/*
Route           /book/update
Description     Update book on isbn
Access          PUBLIC
Parameter       isbn
Method          PUT
*/

booky.put("/book/update/:isbn", async (req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true //to make the changes even in the frontend
        }
    );
    return res.json({
        books: updatedBook
    })
});

/********Updating new author**********/
/*
Route           /book/author/update
Description     Update or add a newauthor
Access          PUBLIC
Parameter       isbn
Method          PUT
*/

booky.put("/book/author/update/:isbn", async (req,res) => {
    //Update book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                authors: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );

    //Update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: "New author was added"
    });
});

//PUT
/*
Route           /publication/update/book
Description     Update or add a new publication
Access          PUBLIC
Parameter       isbn
Method          PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
    //Update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn);
        }
    });

    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publications = req.body.pubId;
            return;
        }
    });

    return res.json(
        {
            books: database.books,
            publications: database.publication,
            message: "Successfully updated publications"
        }
    );
});

/*******DELETE*********/
/*
Route           /book/delete
Description     Delete a book
Access          PUBLIC
Parameter       isbn
Method          DELETE
*/

booky.delete("/book/delete/:isbn", async (req,res) => {
    //whichever book that doesnot match with the isbn, just send it to an updatedBookDatabase array
    //and rest will be filtered out
    
    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );
    return res.json({
        books: updatedBookDatabase
    });
    
    /*const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updatedBookDatabase;
    return res.json({books: database.books});*/
});

/*
Route           /book/delete/author
Description     Delete author from book
Access          PUBLIC
Parameter       isbn
Method          DELETE
*/

booky.delete("/book/delete/author/:authorID", (req,res) => {
    //update book database
    const newBookList = database.books.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorID)
    )
    database.books = newBookList;
    return res.json({books: database.books});
});


/*
Route           /book/delete/author
Description     Delete author from book and related book from author
Access          PUBLIC
Parameter       isbn, authorId
Method          DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
    //update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }

    });

    //update the author database
    database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorId)) {
            const newBookList = eachAuthor.books.filter(
                (book) => book !== req.params.isbn
            );
            eachAuthor.books = newBookList;
            return;
        }
    });
    return res.json(
        {
            book: database.books,
            author: database.author,
            message: "Author was deleted"
        }
    )
});


booky.listen(3000, () => {
    console.log("Server is up and running");
});
