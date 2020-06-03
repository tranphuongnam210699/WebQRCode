const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var billSchema = new Schema(
    {
        quantity: String,
        total: String,
        idCus: String,
        date: String,
    },
    {
        timestamps: true
    }
);

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;