var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
    mongoose.Promise = global.Promise;
    
var userSchema = new mongoose.Schema(
    {
       name : String,
       gender : String,
       age : Number,
       aadharNumber : { type: String, unique: true },
       contactNumber : String,
       emailId : String,
       address : Object,
       password : String,
       token : String,
    },
    { timestamps: true }
);
module.exports = mongoose.models.UserDetailsModel || mongoose.model('UserDetailsModel', userSchema);
