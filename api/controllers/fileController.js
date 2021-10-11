const mongoose = require("mongoose");
const fileModel = require("../models/Portfolio/file");
const portfolio = require("../models/Portfolio/portfolio");
const tagRequest = require("../models/Portfolio/tagRequest");
const tagModel = require("../models/Portfolio/tag");
const {writeFile} = require("fs");
const fs = require("fs");
const path = require("path");

const removeFileFromPortfolio = function (portfolioId, file) {
    return portfolio.findByIdAndUpdate(
        portfolioId,
        {$pull: {files: file._id}},
        {new: true, useFindAndModify: false}
    );
};

const addFileToPortfolio = function (portfolioId, file) {
    return portfolio.findByIdAndUpdate(
        portfolioId,
        {$push: {files: file._id}},
        {new: true, useFindAndModify: false}
    );
};

// Create => POST
exports.post = function (req, res) {
    const {portfolioId} = req.params;
    const file = req.file;
    let dotIndex = file.originalname.lastIndexOf(".");
    let extension = file.originalname.slice(dotIndex)
    let name = file.originalname.slice(0, dotIndex) + extension;
    let fileUrl = "/uploads/" + file.filename + extension;
    fs.rename(
        file.path,
        file.path + extension,
        function (err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }

            fileModel.create({name: name, path: fileUrl, Portfolio: portfolioId})
                .then(file => {
                    addFileToPortfolio(portfolioId, file._id)
                        .then(() => {
                            console.log("File uploaded:");
                            console.log(file)
                            res.send(file);
                        })
                })
        });
};

// Delete => DELETE
exports.delete = function (req, res) {
    const {fileId, portfolioId} = req.params;
    removeFileFromPortfolio(portfolioId, fileId)
        .then(() => {
                fileModel.findByIdAndDelete(fileId, {}, (err, file) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Deleted : ", file);
                        if (!file) return;
                        fs.unlink(path.join(__dirname, "../public", file.path), (err) => {
                            if (err) throw err;
                            console.log(file.path + ' was deleted');
                            res.sendStatus(200)
                        });
                    }
                })
            }
        )
}
exports.get = function (req, res) {
    console.log("GET start");
    fileModel.find({}).populate('Portfolio', '_id title')
        .exec(function (err, data) {res.json(data)})
}
