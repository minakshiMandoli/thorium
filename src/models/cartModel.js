const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,

    },
    totalItems: {
        type: Number,

    },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);