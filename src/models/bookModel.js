const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type: String,
        required: true,
        
    },
    authorName: {
        type: String,
        required: true
    },
    publicationYear: { 
        type: Date,
        default: Date.now

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


