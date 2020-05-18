const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        username: String,
        password: String,
        displayName: String,
        accountType: Number,
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
