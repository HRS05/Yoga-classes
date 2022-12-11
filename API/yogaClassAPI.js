const express = require("express");
const router = express.Router();
const yogaClassController = require("../Controller/yogaClassController")();
const auth = require("../Middleware/auth")

const yogaClassAPI = () => {
    router.post("/registerUser",yogaClassController.registerUser);
    router.post("/loginUser",yogaClassController.loginUser);
    router.post("/addSlot", yogaClassController.addSlot);
    router.post("/changeSlotNextMonth", yogaClassController.changeSlotNextMonth);
    router.post("/payment", yogaClassController.addSlot);
    return router;
}

module.exports = yogaClassAPI;