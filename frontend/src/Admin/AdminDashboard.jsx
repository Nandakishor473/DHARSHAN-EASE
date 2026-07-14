import { useEffect, useState } from "react";
import "../Styles/AdminDashboard.css";
import { getDashboard } from "../Services/adminService";
import { toast } from "react-toastify";

function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await getDashboard();

      setDashboard(res.data.dashboard);

    } catch (err) {

      toast.error("Failed to load Dashboard");

    }

  };

  if (!dashboard) {

    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  }

  return (

    <div className="admin-dashboard">

      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>👤 Users</h2>
          <h3>{dashboard.totalUsers}</h3>
        </div>

        <div className="dashboard-card">
          <h2>🛕 Temples</h2>
          <h3>{dashboard.totalTemples}</h3>
        </div>

        <div className="dashboard-card">
          <h2>🕒 Slots</h2>
          <h3>{dashboard.totalSlots}</h3>
        </div>

        <div className="dashboard-card">
          <h2>🎟️ Bookings</h2>
          <h3>{dashboard.totalBookings}</h3>
        </div>

        <div className="dashboard-card">
          <h2>❤️ Donations</h2>
          <h3>{dashboard.totalDonations}</h3>
        </div>

        <div className="dashboard-card">
          <h2>💰 Amount</h2>
          <h3>₹{dashboard.totalDonationAmount}</h3>
        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;