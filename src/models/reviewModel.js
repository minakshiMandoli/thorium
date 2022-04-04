const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        required: true,
        ref: "book"
    },
    reviewedBy: {
        type: String,
        default: 'Guest',
    },
    reviewedAt: {
        type: Date,
        //required: true
    },
    rating: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 5
    },
    review: { type: String },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
{timestamps:true}

);


module.exports = mongoose.model('review', reviewSchema)


// {
//     bookId: {ObjectId, mandatory, refs to book model},
//     reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
//     reviewedAt: {Date, mandatory},
//     rating: {number, min 1, max 5, mandatory},
//     review: {string, optional}
//     isDeleted: {boolean, default: false},
//   }