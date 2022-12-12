const { json } = require("express");
const express = require("express");
const UserModel = require("../Models/UserDetailsModel");
const router = express.Router();
const yogaClassService = require("../Service/yogaClassService")();

const yogaClassController = () => {
    return {
        registerUser : async (req,res) =>{
            console.log("hhheyyy-->"+req.body.name);
            let user={};
            user.name = req?.body?.name?.trim();
            user.aadharNumber = req?.body?.aadharNumber?.trim();
            user.age = req?.body?.age;
            user.gender = req?.body?.gender?.trim();
            user.contactNumber = req?.body?.contactNumber?.trim();
            user.emailId = req?.body?.emailId?.trim();
            user.address = req?.body?.address;
            user.password = req?.body?.password;
            // vali.. here fata return 
            console.log(user);
            if(!user?.name || user?.name?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!user?.aadharNumber || user?.aadharNumber?.length != 12) return res.status(400).json({"message" : "size of aadhar number should be 12"});
            if(!user?.age || user?.age <18 || user.age > 65) return res.status(400).json({"message" : "age of user must be in between 18 to 85"});
            if(!user?.gender || user?.gender?.length == 0) return res.status(400).json({"message" : "gender required"});
            if(!user?.contactNumber || user?.contactNumber?.length != 10) return res.status(400).json({"message" : "size of mobile number should be 10"});
            if(!user?.emailId || user?.emailId?.length == 0) return res.status(400).json({"message" : "email required"});
            if(!user?.address || user?.address == null) return res.status(400).json({"message" : "address required"});
            if(!user?.password || user?.password?.length == 0) return res.status(400).json({"message" : "Password required"});






            // await yogaClassService.validateUserDetails();
            
            //validation success

            r = await yogaClassService.registerUserUtil(req)


            return res.status(r.status).json({"message" : r.message});
        },

        loginUser : async (req,res) =>{
            
            let aadharNumber = req?.body?.aadharNumber?.trim();
            let password = req?.body?.password?.trim();
            if(!aadharNumber || aadharNumber?.length != 12) return res.status(400).json({"message" : "size of aadhar number should be 12"});
            if(!password || password?.length == 0) return res.status(400).json({"message" : "Password required"});
            r = await yogaClassService.loginUserUtil(req)
            return res.status(r.status).json({"message" : r.message});
        },

        addSlot : async (req,res) =>{
            
            let aadharNumber = req?.body?.aadharNumber?.trim();
            let slot = req?.body?.batch?.trim();
            console.log(slot);
            if(!aadharNumber || aadharNumber?.length != 12) return res.status(400).json({"message" : "size of aadhar number should be 12"});
            if(!(slot=="6-7AM" || slot=="7-8AM" || slot=="8-9AM" || slot=="5-6PM")) return res.status(400).json({"message" : "Select correct slot"});
            r = await yogaClassService.addSlotUtil(req)
            return res.status(r.status).json({"message" : r.message});
        },

        changeSlotNextMonth : async (req,res) =>{
            
            let aadharNumber = req?.body?.aadharNumber?.trim();
            let slot = req?.body?.batch?.trim();
            console.log(slot);
            if(!aadharNumber || aadharNumber?.length != 12) return res.status(400).json({"message" : "size of aadhar number should be 12"});
            if(!(slot=="6-7AM" || slot=="7-8AM" || slot=="8-9AM" || slot=="5-6PM")) return res.status(400).json({"message" : "Select correct slot"});
            r = await yogaClassService.changeSlotNextMonthUtil(req)
            return res.status(r.status).json({"message" : r.message});
        },

        endOfMonthAPI : async (req,res) => {
            r = await yogaClassService.endOfMonthAPIUtil(req)
            return res.status(r.status).json({"message" : r.message});
        },

        completePayment : async (req,res) => {
            let aadharNumber = req?.body?.aadharNumber?.trim();
            if(!aadharNumber || aadharNumber?.length != 12) return res.status(400).json({"message" : "size of aadhar number should be 12"});
            r = await yogaClassService.completePaymentUtil(req);
            return res.status(r.status).json({"message" : r.message});

        }



    }
}
module.exports = yogaClassController;