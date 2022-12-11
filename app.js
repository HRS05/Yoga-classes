const express = require("express");
const app = express();
var http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const YogaClassAPI = require("./API/yogaClassAPI")();
require('dotenv').config();

const xx = require("./DBconnection/db");
const { API_PORT } = process.env;

console.log("API_port ---> "+process.env.API_PORT);

let portNumber = process.env.API_PORT || 3000;
server.listen(portNumber, async function () {
    console.log("Server is running on " + portNumber);
    await xx();
    app.use(bodyParser.json());
    app.use("/api/yoga",YogaClassAPI)
});






