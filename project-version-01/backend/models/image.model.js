const mongose = require("mongoose");

const Schema = mongose.Schema;

var ImageSchema = new Schema(
    {
        originFileObj: Object
    },
    {
        timestamps: true
    }
);

const image = mongose.model('Image', ImageSchema);

module.exports = image;