const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type: String,
        required: true,
        unique:true
    },
    authorName: {
        type: String,
        required: true
    },
    publicationYear: { 
        type: Date,
        default: 2021

    },
    tags:[String],
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    isStockAvailable:{type: Boolean},
    totalPages:{type:Number}
    
},
 { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //books


