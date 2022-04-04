const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"],
        trim:true  
    },
    name: {
        type: String,
        required: true,
        trim:true
    },
    phone:{type: String,
        required: true,
        trim:true,
        unique:true},

    email: {
       unique:true,
        type: String,
        trim:true,
        required: true,
        //match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim:true,
        required: true,
        minlength: 8,
        maxlength:15

    },
    address: {
             street: {type:String},
             city:   {type: String},
             pincode:{type:String}
        }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema)


// { 
//     title: {string, mandatory, enum[Mr, Mrs, Miss]},
//     name: {string, mandatory},
//     phone: {string, mandatory, unique},
//     email: {string, mandatory, valid email, unique}, 
//     password: {string, mandatory, minLen 8, maxLen 15},
//     address: {
//       street: {string},
//       city: {string},
//       pincode: {string}
//     },
//     createdAt: {timestamp},
//     updatedAt: {timestamp}
//   }