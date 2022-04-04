
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const reviewModal = require('../models/reviewModel')
const bookModal = require('../models/bookModel')


//OBJECT ID VALIDATION................................
const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId)}


const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && (value).length > 0) { return true }
    if (typeof (value) === "number" && (value).toString().length > 0) { return true }
}
// const isValidObjectId = function (objectId) {
//     return /^[0-9a-fA-F]{24}$/.test(objectId)
// }

const createReview = async function (req, res) {
    try {
        let data = req.body;
        let id = req.params.bookId;
        const { bookId, rating } = data

        let books = await bookModal.findById(id);
        if (!books) { return res.status(404).send({ status: false, msg: 'No book found with this id, please check yout input' }) }

        let is_Deleted = books.isDeleted;
        if (is_Deleted == true) { return res.status(404).send({ status: false, msg: 'Book is deleted, unable to find book' }) }

        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, msg: 'No input provided' }) }

        if (!isValid(bookId)) { return res.status(400).send({ status: false, msg: 'Book Id is required' }) }

        if (!isValidObjectId(bookId)) { return res.status(400).send({ status: false, msg: 'Please provide a valid Book Id' }) }

        let Books = await bookModal.findById(bookId);
        if (!Books) { return res.status(400).send({ status: false, msg: 'there is no such id in database, please provide a valid book Id' }) }

        if (!isValid(rating)) { return res.status(400).send({ status: false, msg: "Rating is required" }) }

        if (rating < 1 || rating > 5) { return res.status(400).send({ status: false, message: "Rating must be minimum 1 and maximum 5" }) }

        data.reviewedAt = new Date();
        const reviews = await reviewModal.create(data);
        const updatedBook = await bookModal.findOneAndUpdate({ _id: id }, { $inc: { reviews: +1 } }, { new: true })
      return res.status(201).send({ status: true, msg: 'success', data: { ...updatedBook.toObject(), reviewsData: reviews } })

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createReview = createReview;


///UPDATE REVIEW
const updateReview = async function (req, res) {
    try {
        let data = req.body
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId
        
        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: 'You Are Providing Invalid bookId' });   
        }
            if (!isValidObjectId(reviewId)) {
        return res.status(400).send({ status: false, message: 'You Are Providing Invalid reviewId' });
        
        }
        let bookFound = await bookModal.findOne({ _id: bookId, isDeleted: false })
        if (!bookFound) {
            return res.status(401).send({ messege: "No book found" })
        }
        let checkReview = await reviewModal.findOne({ _id: reviewId, isDeleted: false })
        if (!checkReview) {
            return res.status(400).send({ status: false, messege: "The Review Data Doesn't Exist" })
        }
        if (checkReview.bookId == bookId) {
            if (Object.keys(data).length = 0) {
                return res.status(400).send({ messege: "Please Provide The Required data" })
            }
            const { reviewedBy, review, rating } = data
            if (reviewedBy) {
                if (!isValid(reviewedBy)) {
                    return res.status(404).send({ messege: "Please provide The reviewer's name" })
                }
            }
            if (review) {
                if (!isValid(review)) {
                    return res.status(404).send({ messege: "Please Provide Your Review" })
                }
            }
            if (rating) {
                if (!isValid(rating)) {
                    return res.status(404).send({ messege: "Please Enter Rating" })
                }
                if (!(rating >= 1 || rating <= 5)) {
                    return res.status(400).send({ status: false, messege: "Rating Value Should Be In Between 1 to 5" })
                }
            }

            const updatedReview = await reviewModal.findOneAndUpdate({ _id: reviewId },
                { reviewedBy: reviewedBy, review: review, rating: rating }, { new: true }).select({ __v: 0 })
            return res.status(200).send({ status: true, message: 'Review updated', data: updatedReview });
        }
        else {
            return res.status(400).send({ status: false, messege: "You Are Not Authorized To Update The review" })
        }

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

///////............DELETE REVIEW.............................................


const deleteReview = async function (req, res) {
    try {
        const reviewId = req.params.reviewId
        const bookId = req.params.bookId
        
        if (!isValidObjectId(reviewId)) {
            res.status(404).send({ status: false, message: "please enter a valid review id" })
            return
        }        
        if (!isValidObjectId(bookId)) {
            return res.status(404).send({ status: false, message: "please enter a valid book id" })
        }
        let bookFound = await bookModal.findOne({ _id: bookId ,})
        if (!bookFound) {
            return res.status(404).send({ message: "No book found" })
        }
        if (bookFound.isDeleted == true) 
        { return res.status(400).send({ status: false, message: "Book has already been deleted" }) }

        let checkReview = await reviewModal.findOne({ _id: reviewId, isDeleted: false })
        if (!checkReview) {
            return res.status(404).send({ status: false, messege: "The Review Data Doesn't Exist" })
        }
        const deletedReview = await reviewModal.findOneAndUpdate({ _id: reviewId, isDeleted: false }, { isDeleted: true,deletedAt: new Date() })
        const decrementReiew = await bookModal.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } })
        if (deletedReview) {
            res.status(200).send({ staus: true, message: "review has been deleted successfully" })
        }
        else {
            return res.status(404).send({ msg: "Review Has Been Already Deleted" })
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview