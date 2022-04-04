const bookModel = require('../models/bookModel');
const userModel = require('../models/userModel');
const reviewModel = require('../models/reviewModel');
const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId

//..VALIDATION FUNCTION...........................
const isValid = function (value) {
    if (typeof value == undefined || value == null || value.length == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true

}
// OBJECT ID VALIDATION................................
const isValidObjectId = function(objectId) {
     return mongoose.Types.ObjectId.isValid(objectId);
      
  }

const isRightFormatReleasedAt = function (releasedAt) {
    return /((\d{4}[\/-])(\d{2}[\/-])(\d{2}))/.test(releasedAt)
}

//....CREATE BOOK...................................
const createBook = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length = 0) { 
        return res.status(400).send({ status: false, message: "Please provid mendatory inputs for successful creation of book" }); }
        const { title, excerpt, userId, ISBN,bookCover, category, subcategory,releasedAt } = data;


const book = await bookModel.findOne({bookCover:bookCover})

if(book){return res.status(400).send({status:false, message:"the URL you are trying to add with book is alreadyu exist in db"})}

        if (!isValid(userId)) {
            return res.status(400).send({ status: false, message: "Please provide userId " });
        }
        if (!isValidObjectId(userId)) {
            res.status(400).send({ status: false, message: 'You Are Providing Invalid userId' });
            return;
        }
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "Please provide tittle or title field" });
        }
        const duplicateTitle = await bookModel.findOne({ title: title });
        if (duplicateTitle) {
            return res.status(400).send({ status: false, message: "This book title already exists with another book" });
        }
        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: "Please provide excerpt or excerpt field" });
        }
        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, message: "Please provide ISBN id or ISBN field" });;
        }
        const duplicateISBN = await bookModel.findOne({ ISBN: ISBN })
        if (duplicateISBN) {
            return res.status(400).send({ status: false, message: "This ISBN number already exists with another book" });
        }

        if (!isValid(category)) {
            return res.status(400).send({ status: false, message: "Please provide category id or category field" });;
        }
        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, message: "Please provide subcategory or subcategory field" });;
        }
        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: "Please provide releasedAt field" });;
        }
                
        if (!isValid(releasedAt)) { return res.status(400).send({ status: false, message: 'Released date is required' }) }

        if (!isRightFormatReleasedAt(releasedAt))
         { return res.status(400).send({ status: false, message: 'Please provide a valid released date in format YYYY/MM/DD '})}
        
         let idFind = await userModel.findById(userId);
        if (!idFind) {
            return res.status(400).send({ message: "This userId doesn't exist" });
        }
        else {
            let savedData = await bookModel.create(data)
            return res.status(201).send({ status: true, message: 'Success', data: savedData });
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}
//...........GET BOOK BY QUERY PARAM.....................
const getBooksByQuery = async function (req, res) {
    try {
        let data = req.query;
        if (Object.keys(data) != 0) {
            const { userId, category, subcategory } = data
            if (userId || category || subcategory) {
             
                // if (!isValidObjectId(userId)) {
                //    return  res.status(400).send({ status: false, message: 'You Are Providing Invalid userId in filter' });
                    
                // }
                const filter = { isDeleted: false, ...data }
                const bookFound = await bookModel.find(filter).select({ title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 }).collation({locale:"en"}).sort({title:1})
                if (bookFound.length == 0) {
                    return res.status(404).send({ status: false, message: "Sorry, there is no such book found" });
                }
               
                return res.status(200).send({ status: true, message: 'Books list', data:bookFound });
            }
            // else {
            //     return res.status(400).send({ status: false, message: "Please provide valid query parameter for this request" });
            // }

        } 
            const bookFound = await bookModel.find({ isDeleted: false }).collation({locale:"en"}).sort({title:1})
            if (bookFound.length == 0) {
                return res.status(404).send({ status: false, message: "No books found" });
            }
           return res.status(200).send({ status: true, message: 'Books list', data: bookFound });
           }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//.......GET BOOK BY ID..........................................
const getBooksById = async function (req, res) {
    try {
        const bookId = req.params.bookId
         if (!isValidObjectId(bookId)) {
           return res.status(400).send({ status: false, message: "Please Provide a valid bookId in path params" })
        }
        const getBook = await bookModel.findOne({ _id: bookId, isDeleted: false }).select({ ISBN: 0 })
        if (!getBook) {
            return res.status(404).send({ status: false, msg: "no book exist with this id" })
        }
        const reviewData = await reviewModel.find({ bookId: bookId, isDeleted: false })
            .select({ bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })

        const newData = {
            _id: getBook._id,
            title: getBook.title,
            excerpt: getBook.excerpt,
            userId: getBook.userId,
            category: getBook.category,
            subcategory: getBook.subcategory,
            reviews: getBook.reviews,
            isDeleted: getBook.isDeleted,
            deletedAt: getBook.deletedAt,
            releasedAt: getBook.reviewedAt,
            createdAt: getBook.createdAt,
            updatedAt: getBook.updatedAt,
            reviewData:reviewData
        }
        return res.status(200).send({ status: true, message: 'Books list', data: newData });
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//.... PUT/UPADTE BOOK..............................................................

const updateBook = async function (req, res) {
    try {
        const bookId = req.params.bookId
    
        const getBookById = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!getBookById) {
            return res.status(404).send({ status: false, msg: "no book found to update" })
        }
        const data = req.body
        if (Object.keys(data) != 0) {
            const duplicateTitle = await bookModel.findOne({ title: data.title });
            if (duplicateTitle) {
                return res.status(400).send({ status: false, message: "This book title already exists with another book" });
            }
            const duplicateISBN = await bookModel.findOne({ ISBN: data.ISBN })
            if (duplicateISBN) {
                return res.status(400).send({ status: false, message: "This ISBN number already exists with another book" });
            }
            const updatedBook = await bookModel.findOneAndUpdate({ _id: bookId }, { ...data }, { new: true })
            return res.status(202).send({ status: true, message: "successfull", data: updatedBook })
        }
        else {
            return res.status(404).send({ status: false, message: "please provide required field to update" })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

////.... DELETE A BOOK...........
const deleteBook = async function (req, res) {
    try {
        const bookId = req.params.bookId

        const deletedBook = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } })
        if (!deletedBook) {
            return res.status(404).send({ status: false, message: "No book exist with this id" })
        }
        return res.status(200).send({ status: true, message: "Book deleted successfully" })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
module.exports.createBook = createBook
module.exports.getBooksByQuery = getBooksByQuery
module.exports.getBooksById = getBooksById
module.exports.updateBook = updateBook
module.exports.deleteBook = deleteBook