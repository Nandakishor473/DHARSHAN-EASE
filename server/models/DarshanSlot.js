const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
{
    temple:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Temple",
        required:true
    },

    slotDate:{
        type:Date,
        required:true
    },

    startTime:{
        type:String,
        required:true
    },

    endTime:{
        type:String,
        required:true
    },

    totalSeats:{
        type:Number,
        required:true
    },

    availableSeats:{
        type:Number,
        required:true
    },

    poojaType:{
        type:String,
        default:"General Darshan"
    }

},
{
    timestamps:true
});

module.exports=mongoose.model("DarshanSlot",slotSchema);