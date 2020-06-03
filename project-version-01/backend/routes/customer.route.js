const router = require("express").Router();
const cus = require("../models/customer.model");

router.route("/").get((req, res) => {
    cus.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const { cusName, phone, address } = req.body

    const newCus = new cus({
        cusName, phone, address
    });
    newCus
        .save()
        .then(() => res.json("Cus added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
