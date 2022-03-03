const mongoose = require('mongoose');
//const { required } = require('nodemon/lib/config');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {

    // _id: {
    //     type: ObjectId,
        
    // },
    book_name: String,
    author_id:{
        type: ObjectId,
        ref: "Author",
        required: true
    },
    //ratings: Number,
    price: Number,
    publisher_id: {
        type: ObjectId,
        ref: "Publisher",
        required: true
    },
    isHardCover :Boolean

}, { timestamps: true });


module.exports = mongoose.model('LibraryBook', bookSchema)
