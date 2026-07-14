const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
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

    slot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"DarshanSlot",
        required:true
    },

    numberOfPersons:{
        type:Number,
        required:true,
        default:1
    },

    bookingStatus:{
        type:String,
        enum:["Confirmed","Cancelled"],
        default:"Confirmed"
    },

    bookingReference:{
        type:String,
        unique:true
    }

},
{
timestamps:true
});

module.exports=mongoose.model("Booking",bookingSchema);