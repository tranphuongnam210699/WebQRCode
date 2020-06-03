const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var billDetailSchema = new Schema(
    {
        idBill: String,
        barCode: String,
        quantity: String,
        price: String,
        total: String,
    },
    {
        timestamps: true,
    }
);

const BillDetail = mongoose.model("BillDetail", billDetailSchema);

module.exports = BillDetail;
