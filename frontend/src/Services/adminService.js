import API from "./api";

export const getDashboard = () =>
  API.get("/admin/dashboard");