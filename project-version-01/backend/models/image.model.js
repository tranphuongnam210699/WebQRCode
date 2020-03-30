const mongose = require("mongoose");

const Schema = mongose.Schema;

var ImageSchema = new Schema(
    // {
    //     originFileObj: Array
    // },
    // {
    //     timestamps: true
    // }
    {
        originFileObj: {type: Array, default:[]}
    }
);

const image = mongose.model('Image', ImageSchema);

module.exports = image;