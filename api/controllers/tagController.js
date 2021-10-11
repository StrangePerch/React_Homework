const tagModel = require("../models/Portfolio/tag");
const portfolioModel = require("../models/Portfolio/portfolio");
const tagRequest = require("../models/Portfolio/tagRequest");
const mongoose = require("mongoose");
const model = require("../models/Portfolio/portfolio");

const createTag = function (name) {
    return tagModel.create({name})
        .then(docTag => {
            console.log("\n>> Created Tag:\n", docTag);
            return docTag;
        });
};

const addPortfolioToTag = function (portfolioId, tagId) {
    console.log("\n>>>Portfolio to Tag\n")
    console.log(portfolioId + ">>>" + tagId)
    return tagModel.findByIdAndUpdate(
        tagId,
        {$push: {portfolios: portfolioId}},
        {new: true, useFindAndModify: false}
    ).then((tag) => {
        return tag;
    });
};

const addTagToPortfolio = function (portfolioId, tagId) {
    console.log("\n>>>Tag to Portfolio\n")
    console.log(tagId + ">>>" + portfolioId)
    return portfolioModel.findByIdAndUpdate(
        portfolioId,
        {$push: {tags: tagId}},
        {new: true, useFindAndModify: false}
    ).then((portfolio) => {
        return portfolio
    });
};

const connectTagWithPortfolio = function (portfolioId, tagId) {
    let tag = addTagToPortfolio(portfolioId, tagId);
    let portfolio = addPortfolioToTag(portfolioId, tagId);
    return {tag, portfolio}
};

const removePortfolioFromTag = function (portfolioId, tagId) {
    console.log("\n>>>Portfolio from Tag\n")
    console.log(portfolioId + ">>xx" + tagId)
    return tagModel.findByIdAndUpdate(
        tagId,
        {$pull: {portfolios: portfolioId}},
        {new: true, useFindAndModify: false}
    ).then((tag) => {
        return tag;
    }).catch((err) => {console.log(err)});
};

const removeTagFromPortfolio = function (portfolioId, tagId) {
    console.log("\n>>>Tag from Portfolio\n")
    console.log(tagId + ">>xx" + portfolioId)
    return portfolioModel.findByIdAndUpdate(
        portfolioId,
        {$pull: {tags: tagId}},
        {new: true, useFindAndModify: false}
    ).then((portfolio) => {
        return portfolio
    }).catch((err) => {console.log(err)});
};

const disconnectTagFromPortfolio = async function (portfolioId, tagId) {
    console.log("\n>>>>Disconnect>>>\n")
    let portfolio = await removeTagFromPortfolio(portfolioId, tagId);
    let tag = await removePortfolioFromTag(portfolioId, tagId);
    return {tag, portfolio}
};

// Create => POST
exports.post = function (req, res) {
    console.log("Tag post")
    const element = new tagRequest(req.body);
    tagModel.findOne({name: element.name}).then(tag => {
        let id = tag?._id;
        console.log("ID: " + id)
        if (id) {
            connectTagWithPortfolio(element.portfolioId, id);
            res.send(tag)
        } else {
            console.log("Create")
            createTag(element.name).then((tag) => {
                let id = tag._id;
                connectTagWithPortfolio(element.portfolioId, id);
                res.send(tag)
            });
        }
    });
};

// Delete => DELETE
exports.delete = async function (req, res) {
    const {tagId, portfolioId} = req.params;
    let result = await disconnectTagFromPortfolio(portfolioId, tagId);
    if (result.tag.portfolios?.length === 0) {
        tagModel.findByIdAndDelete(result.tag._id, {}, 
            (err, doc) => 
            {
                if(err)
                {
                    console.log("Error while deleting tag:", err)
                }
                else{
                    console.log("\n>> Deleted Tag:\n", doc);
                    res.sendStatus(200);
                }
            })
    }
    else
    {
        res.sendStatus(200);
    }
}

exports.get = function (req, res) {
    console.log("GET start");
    tagModel.find({}).populate('portfolios', '_id')
        .exec(function (err, data) {res.json(data)})
}
