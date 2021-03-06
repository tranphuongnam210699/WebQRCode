const router = require("express").Router();
const Category = require("../models/category.model");

router.route("/").get((req, res) => {
    Category.find()
        .then((categories) => res.json(categories))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const id = req.body.id;
    const CategoryName = req.body.CategoryName;
    const newCategory = new Category({
        id,
        CategoryName,
    });
    newCategory
        .save()
        .then(() => res.json("Category added"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    console.log('req', req)
    Category.findById(req.params.id)
        .then((category) => res.json(category))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json("Category deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Category.findById(req.params.id)
        .then((category) => {
            category.id = req.body.id;
            category.CategoryName = req.body.CategoryName;

            category
                .save()
                .then(() => res.json("Category updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
