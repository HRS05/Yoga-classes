var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
    mongoose.Promise = global.Promise;

var paymentSchema = new mongoose.Schema(
    {
       aadharNumber : { type: String },
       paymentId : {type : String,unique : true},
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserPaymentModel", paymentSchema);


