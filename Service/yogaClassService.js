const express = require("express");
const UserDetailsModel = require("../Models/UserDetailsModel");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserBatchModel = require("../Models/UserBatchModel");
require('dotenv').config();


const yogaClassService = () => {
    return {
        registerUserUtil : async (req) =>{
            //add user to db
            //create transaction of user using payment id 
            
            let user = new UserDetailsModel(); 
            user.name = req?.body?.name?.trim();
            user.aadharNumber = req?.body?.aadharNumber?.trim();
            user.age = req?.body?.age;
            user.gender = req?.body?.gender?.trim();
            user.contactNumber = req?.body?.contactNumber?.trim();
            user.emailId = req?.body?.emailId?.trim();
            user.address = req?.body?.address;
            user.password = req?.body?.password;
            aadharNumber=user.aadharNumber;
            user.password = await bcrypt.hash(user.password, 10);
            try{
                u = await user.save();
            }catch(e)
            {
                return {status : 400, message : {result : "adding user error -->  "+ e }}
            }
            
            const token = jwt.sign(
                { user_id: u._id, aadharNumber },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              // save user token
              u.token = token;
              return {status : 200, message : {result : "data added ", data : u}};
              //console.log("return after adding "+ p);
            //if payment method returns true change status of payment completed


            //asign batch here
        },


        loginUserUtil : async (req) =>{
            
            let aadharNumber = req?.body?.aadharNumber?.trim();
            let password = req?.body?.password?.trim();
            const user = await UserDetailsModel.findOne({ aadharNumber });

            if (!(user && (await bcrypt.compare(password, user.password)))){
                return {status : 400, message : {result : "Invalid User "+aadharNumber+"  "+password}};
            }
                // Create token
                console.log("User ::--->>> " + user);
                const token = jwt.sign(
                { user_id: user._id, aadharNumber },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
                );

                // save user token
                user.token = token;
                return {status : 200, message : {result : "data added ", data : user}};

        },

        addSlotUtil : async (req) =>{
            
            let aadharNumber = req?.body?.aadharNumber?.trim();
            let slot = req?.body?.batch?.trim();
            const user = await UserDetailsModel.findOne({ aadharNumber });
            const checkUser = await UserBatchModel.findOne({aadharNumber});
            if (!(user)){
                return {status : 400, message : {result : "Invalid User "+aadharNumber}};
            }
            if(checkUser){
                return {status : 400, message : {result : "User is already in slot "+aadharNumber}};
            }
                // Create token
            
            let batchData = new UserBatchModel();
            batchData.paymentStatus = "pending";
            batchData.batch = slot;
            batchData.newMonthBatch = slot;
            batchData.aadharNumber = aadharNumber;
            console.log(batchData);
            u = await batchData.save();
            return {status : 200, message : {result : "slot booked ", data : user}};

        },

        
        changeSlotNextMonthUtil : async (req) =>{
            
            let aadharNumber = req?.body?.aadharNumber?.trim();
            let slot = req?.body?.batch?.trim();
            const user = await UserDetailsModel.findOne({ aadharNumber });
            const checkUser = await UserBatchModel.findOne({aadharNumber});
            if (!(user)){
                return {status : 400, message : {result : "Invalid User "+aadharNumber}};
            }
            if(!checkUser){
                return {status : 400, message : {result : "User is not exists for changing slot "+aadharNumber}};
            }
                // Create token
            try{
            let doc = await UserBatchModel.findOneAndUpdate({aadharNumber : aadharNumber}, {newMonthBatch : slot},{new : true});
            console.log(doc);
            }catch(e){
                return {status : 400, message : {result : "adding user error -->  "+ e }}
            }    
            return {status : 200, message : {result : "slot booked ", data : user}};

        },

    };
}

module.exports = yogaClassService;