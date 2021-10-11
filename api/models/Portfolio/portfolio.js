const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Portfolio = new Schema({
    title: String,
    text: String,
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "File"
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }]
})

module.exports = mongoose.model('Portfolio', Portfolio)