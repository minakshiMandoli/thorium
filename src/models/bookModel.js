//const { stubString } = require('lodash');
const mongoose = require('mongoose');
//const { required } = require('nodemon/lib/config');

const newBook = new mongoose.Schema( {
    bookName: {
        type: String,
        required: true,
    
    },
    authorName: {
        type: String,
        required: true
    },
    price: {
        indianPrice: String,
        europePrice: String,
    },
    publicationYear: {type:Date, default:2021},
    tags:[String],
    totalPages: {type:Number},
    isStockAvailable:{type:Boolean}

},
 { timestamps: true });

module.exports = mongoose.model('Book', newBook) //books



