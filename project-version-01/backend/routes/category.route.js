const router = require('express').Router();
const Category = require("../models/category.model");

router.route('/').get((req,res) =>{
    Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req,res) => {
    const id = req.body.id;
    const CategoryName = req.body.CategoryName;
    const newCategory = new Category({
        id, CategoryName
    });
    newCategory.save()
    .then(() => res.json('Category added'))
    .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;