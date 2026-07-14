import API from "./api";

// Create Booking
export const createBooking = (data) =>
  API.post("/bookings", data);

// Get All Bookings
export const getBookings = () =>
  API.get("/bookings");

// Get User Bookings
export const getUserBookings = (userId) =>
  API.get(`/bookings/user/${userId}`);

// Get Temple Bookings
export const getTempleBookings = (templeId) =>
  API.get(`/bookings/temple/${templeId}`);

// Cancel Booking
export const cancelBooking = (id) =>
  API.put(`/bookings/cancel/${id}`);