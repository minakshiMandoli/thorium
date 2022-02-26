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
    publicationYear: Date,
    category: String
},
 { timestamps: true });

module.exports = mongoose.model('Book', bookSchema) //books


