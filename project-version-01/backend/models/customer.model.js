const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var customerSchema = new Schema(
    {
        cusName: String,
        phone: String,
        address: String,
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;