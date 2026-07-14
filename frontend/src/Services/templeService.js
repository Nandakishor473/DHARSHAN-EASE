import API from "./api";

// Get all temples
export const getTemples = () => API.get("/temples");

// Get single temple
export const getTemple = (id) => API.get(`/temples/${id}`);

// Add new temple
export const addTemple = (formData) =>
  API.post("/temples", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Update temple
export const updateTemple = (id, formData) =>
  API.put(`/temples/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete temple
export const deleteTemple = (id) =>
  API.delete(`/temples/${id}`);