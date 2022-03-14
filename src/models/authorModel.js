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
        enum :[Mr, Mrs, Miss]},
    email: {
        required:true,
        valid: email,
        unique:true
    },
     password: {mandatory} ,
     {timestamp:true}

    });

    module.exports = mongoose.model('authorModel', authorSchema)