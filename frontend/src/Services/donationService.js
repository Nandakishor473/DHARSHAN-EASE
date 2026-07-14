import API from "./api";

// Create Donation
export const createDonation = (data) =>
  API.post("/donations", data);

// Get All Donations
export const getDonations = () =>
  API.get("/donations");