var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
    mongoose.Promise = global.Promise;

var userBatchSchema = new mongoose.Schema(
    {
       aadharNumber : { type: String, unique: true },
       batch : {type : String,},
       newMonthBatch : {type : String},
       paymentStatus :  { type: String, default: "pending"  },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserBatchModel", userBatchSchema);

