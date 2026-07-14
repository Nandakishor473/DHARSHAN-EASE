const express=require("express");

const router=express.Router();

const{
createDonation,
getDonations
}=require("../controllers/donationController");

router.get("/",getDonations);

router.post("/",createDonation);

module.exports=router;