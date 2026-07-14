import API from "./api";

// Get all slots
export const getSlots = () => API.get("/slots");

// Get slots of one temple
export const getTempleSlots = (templeId) =>
  API.get(`/slots/temple/${templeId}`);

// Get single slot
export const getSlot = (id) =>
  API.get(`/slots/${id}`);

// Create slot
export const createSlot = (data) =>
  API.post("/slots", data);

// Update slot
export const updateSlot = (id, data) =>
  API.put(`/slots/${id}`, data);

// Delete slot
export const deleteSlot = (id) =>
  API.delete(`/slots/${id}`);