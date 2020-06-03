const router = require("express").Router();
const billDetail = require("../models/billDetail.model");

router.route("/").get((req, res) => {
    billDetail.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const { idBill, barCode, quantity, price, total } = req.body

    const newBillDetail = new billDetail({
        idBill, barCode, quantity, price, total
    });
    newBillDetail
        .save()
        .then(() => res.json("BillDetail added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    billDetail.find({"idBill": req.params.id})
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;