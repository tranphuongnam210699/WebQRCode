const router = require('express').Router();
let Image = require('../models/image.model');

router.route('/').get((res,req) => {
    Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((res,req) => {
    const uid = req.body.uid;
    const originFileObj = req.body.originFileObj;
    const newImage = new Image({
        uid, originFileObj
    });
    newImage.save()
    .then(() => res.json('Image added'))
    .catch(err => res.status(400).json('Error: ' +err));
})

module.exports = router;