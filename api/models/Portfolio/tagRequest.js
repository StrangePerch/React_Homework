const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagRequest = new Schema({
    name: String,
    portfolioId: String
})

module.exports = mongoose.model('TagRequest', tagRequest)