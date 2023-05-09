const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan")

app.use(express.json())
app.use(cors());

app.use(logger('dev'))

const snacksController = require("./controllers/snacksController.js");
app.use("/snacks", snacksController);

app.get(("/"), ( req, res ) => {
    res.send("welcome to the snacks")
});

app.get("*", ( req, res ) => {
    res.status(404).json( { error: "Page not found" } )
});

module.exports = app;