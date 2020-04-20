const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var NSXSchema = new Schema(
    {
        id: String,
        NSXName: String,
        Phone: String,
        Address: String,
    },
    {
        timestamps: true
    }
);

const NSX = mongoose.model('NSX', NSXSchema);

module.exports = NSX;