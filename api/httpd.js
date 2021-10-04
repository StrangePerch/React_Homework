const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname,"public")));

const multer = require("multer");
app.use(multer(
    {dest: path.join(__dirname,"public/uploads")})
    .single("fileData"));


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const router = require("./routes");
app.use(router);

const mongoUri = "mongodb+srv://StrangePerch:Vn5vAyfilAljxFLq@cluster0.pmjjq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoose = require("mongoose");

let port = 3001;

mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    
    function (err) {
        if (err) {console.log(err); return;}
        console.log("http://localhost:" + port);
        app.listen(port);
    }
);