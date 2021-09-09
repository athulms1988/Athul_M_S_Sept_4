const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: String,
    author: String,
    publisher: String,
    language: String,
    price: Number,
    description: String,
    specification: {
        dimension: {
            length: Number,
            weighth: Number,
            height: Number
        },
        weight: Number
    },
    category: String,
    rating: {
        type: Number,
        default: 0
    },
    code: String,
    status: {
        type: Number,
        default: 0
    },
    image: String
}, {
        timestamps: {
            createdAt: 'createdAt'
        }
});

module.exports = Product = mongoose.model('product', product);



