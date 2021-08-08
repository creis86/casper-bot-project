const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    image_url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    source_url: {
        type: String,
        required: true
    }
}, {timestamps: true});

const NewsModel = mongoose.model("NewsModel", newsSchema);
module.exports = NewsModel;
