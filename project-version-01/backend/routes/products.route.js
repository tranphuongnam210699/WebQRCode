const router = require("express").Router();

let Product = require("../models/product.model");

router.route("/").get((req, res) => {
    Product.find()
        .then((products) => res.json(products))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res, next) => {
    const Name = req.body.Name;
    const LoaiID = req.body.LoaiID;
    const QRCode = req.body.QRCode;
    const BarCode = req.body.BarCode;
    const productImage = req.body.Image;
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
        Price,
    });
    newProduct
        .save()
        .then(() => res.json("Product added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Product.findById(req.params.id)
        .then((Product) => res.json(Product))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json("product deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            product.Name = req.body.Name,
            product.LoaiID = req.body.LoaiID,
            product.QRCode = req.body.QRCode,
            product.BarCode = req.body.BarCode,
            product.productImage = req.body.Image,
            product.Description = req.body.Description,
            product.NSXId = req.body.NSXId,
            product.Price = req.body.Price,

            product
                .save()
                .then(() => res.json("product updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
