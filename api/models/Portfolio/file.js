const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const File = new Schema({
    name: String,
    path: String,
        Portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio"
    }
})


module.exports = mongoose.model('File', File)