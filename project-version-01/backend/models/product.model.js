const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var productSchema = new Schema(
    {
        Name: String,
        LoaiID: String,
        QRCode: String,
        BarCode: String,
        productImage: Object,
        Description: String,
        NSXId: String,
        Price: String
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
