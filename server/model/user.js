const mongoose = require('mongoose');
const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, {
        timestamps: {
            createdAt: 'createdAt'
        }
});

module.exports = User = mongoose.model('user', user);