const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/ipeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, 
    // limits:{
    //     fileSize: 1024*1024*10
    // },
    // fileFilter: fileFilter
});

let Product = require("../models/product.model");

router.route("/").get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", upload.single("productImage"), (req, res, next) => {
    // console.log("req.file :",);
    const Name = req.body.Name;
    const LoaiID = req.body.LoaiID;
    const QRCode = req.body.QRCode;
    const BarCode = req.body.BarCode;
    const productImage = req.file.path;
    const Description = req.body.Description;
    const NSXId = req.body.NSXId;
    const Price = req.body.Price;

    const newProduct = new Product({
        Name,
        LoaiID,
        QRCode,
        BarCode,
        productImage,
        Description,
        NSXId,
        Price
    });
    newProduct
        .save()
        .then(() => res.json("Product added"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
