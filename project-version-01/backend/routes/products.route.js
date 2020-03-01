const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req,res) =>{
    Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res) => {
    const Name = req.body.Name;
    const LoaiID = req.body.LoaiID;
    const QRCode = req.body.QRCode;
    const BarCode = req.body.BarCode;
    const Image = req.body.Image;
    const Description= req.body.Description;
    const NSXId = req.body.NSXId;
    const Price = req.body.Price

    const newProduct = new Product({
        Name, LoaiID, QRCode, BarCode, Image, Description, NSXId, Price
    });
    newProduct.save()
    .then(() => res.json('Product added'))
    .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;