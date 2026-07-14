const Donation=require("../models/Donation");

const createDonation=async(req,res)=>{

try{

const donation=await Donation.create(req.body);

res.status(201).json({

success:true,
message:"Donation Successful",
donation

});

}catch(err){

res.status(500).json({

success:false,
message:err.message

});

}

};

const getDonations=async(req,res)=>{

try{

const donations=await Donation.find()
.populate("user")
.populate("temple");

res.json({

success:true,
count:donations.length,
donations

});

}catch(err){

res.status(500).json({

success:false,
message:err.message

});

}

};

module.exports={
createDonation,
getDonations
};