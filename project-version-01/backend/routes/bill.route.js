const router = require("express").Router();
const bill = require("../models/bill.model");

router.route("/").get((req, res) => {
    bill.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const { quantity, total, idCus, date } = req.body;

    const newBill = new bill({
        quantity,
        total,
        idCus,
        date,
    });
    newBill
        .save()
        .then(() => res.json("Bill added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    bill.findByIdAndDelete(req.params.id)
        .then(() => res.json("Bill deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getIdBillNew").get((req, res) => {
    bill.find()
        .sort({ createdAt: -1 })
        .limit(1)
        .select("_id")
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
