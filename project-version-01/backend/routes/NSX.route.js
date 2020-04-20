const router = require("express").Router();
const NSX = require("../models/NSX.model");

router.route("/").get((req, res) => {
    NSX.find()
        .then((categories) => res.json(categories))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    console.log('req', req.body)
    const id = req.body.id;
    const NSXName = req.body.NSXName;
    const Phone = req.body.Phone;
    const Address = req.body.Address;

    const newNSX = new NSX({
        id,
        NSXName,
        Phone,
        Address,
    });
    newNSX
        .save()
        .then(() => res.json("NSX added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    console.log("req", req);
    NSX.findById(req.params.id)
        .then((nsx) => res.json(nsx))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    NSX.findByIdAndDelete(req.params.id)
        .then(() => res.json("NSX deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    NSX.findById(req.params.id)
        .then((nsx) => {
            nsx.id = req.body.id;
            nsx.NSXName = req.body.NSXName;
            nsx.Phone = req.body.Phone;
            nsx.Address = req.body.Address;

            nsx.save()
                .then(() => res.json("NSX updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
