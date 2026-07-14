const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    temple:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Temple",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    paymentMethod:{
        type:String,
        enum:["UPI","Card","Net Banking","Cash"],
        default:"UPI"
    }

},
{
timestamps:true
});

module.exports=mongoose.model("Donation",donationSchema);