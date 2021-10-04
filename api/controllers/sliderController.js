const model = require("../models/slide");

// Create => POST
exports.post = function (req, res) {
    console.log ("POST start");
    const element = new model (req.body);
    element.save (function (err, result) {
        if(err) { console.log(err); return err;}
        return res.send(result);
    })
};

// Read => GET
exports.get = function (req, res) {
    console.log ("GET start");
    model.find({},
        function (err, data) {
            if(err) { console.log(err); return err;}
            res.json(data);
        });
}

// Update => PUT
exports.put = function (req, res) {
    console.log ("PUT start");
    const element = new model (req.body);
    model.findByIdAndUpdate(
        req.body._id,
        element,
        {},
        function (err, result) {
            if (err) {console.log(err); res.send(err);}
            res.send(result);
        }
    );
}

// Delete => DELETE
exports.delete = function (req, res) {
    const {id} = req.params
    console.log("Delete: " + id)
    model.findByIdAndDelete(
        id,
        {},
        function (err) {
            if (err) res.send(err);
            res.sendStatus(200);
        }
    );
}