const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Slide = new Schema({
    imageSrc: String,
    title: String,
    text: String
})  

module.exports = mongoose.model('Slide', Slide)