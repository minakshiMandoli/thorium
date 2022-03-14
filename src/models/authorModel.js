const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {

    fname: { 
        required:true
    },
    lname: { 
        required:true
    },
    title: {
        required:true,
        enum :[Mr, Mrs, Miss]
    },
    email: {
        required:true,
        unique:true
    },
     password: {
         required:true
        }
    },{timestamps:true});

    module.exports = mongoose.model('authorModel', authorSchema)