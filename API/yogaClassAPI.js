const express = require("express");
const router = express.Router();
const yogaClassController = require("../Controller/yogaClassController")();
const auth = require("../Middleware/auth")

const yogaClassAPI = () => {
    router.post("/registerUser",yogaClassController.registerUser);
    router.post("/loginUser",yogaClassController.loginUser);
    router.post("/addSlot", yogaClassController.addSlot);
    router.post("/changeSlotNextMonth", yogaClassController.changeSlotNextMonth);
    router.post("/completePayment", yogaClassController.completePayment);
    router.post("/endMonthCall", yogaClassController.endOfMonthAPI); // this api is for internal for admin which is called on last day of month 
                                                                // for shifting people in next batch

    return router;
}

module.exports = yogaClassAPI;