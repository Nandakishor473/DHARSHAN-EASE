import { useEffect, useState } from "react";
import "../Styles/Profile.css";
import loginImage from "../assets/login.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    address: "",
    role: "",
  });

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!storedUser) {

      navigate("/login");

      return;

    }

    setUser({
      name: storedUser.name || "",
      email: storedUser.email || "",
      phone: storedUser.phone || "",
      city: storedUser.city || "",
      state: storedUser.state || "",
      address: storedUser.address || "",
      role: storedUser.role || "USER",
    });

  }, [navigate]);

  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]: e.target.value,

    });

  };

  const handleSave = () => {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    toast.success(
      "Profile Updated Successfully"
    );

  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logged Out Successfully");

    navigate("/login");

  };

  return (

    <div className="profile-container">

      <div className="profile-card">

        <h1>My Profile</h1>

        <div className="profile-image">

          <img
            src={loginImage}
            alt="Profile"
          />

        </div>

        <label>Full Name</label>

        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label>Phone Number</label>

        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />

        <label>City</label>

        <input
          type="text"
          name="city"
          value={user.city}
          onChange={handleChange}
        />

        <label>State</label>

        <input
          type="text"
          name="state"
          value={user.state}
          onChange={handleChange}
        />

        <label>Address</label>

        <textarea
          name="address"
          value={user.address}
          onChange={handleChange}
        />

        <label>Role</label>

        <input
          type="text"
          value={user.role}
          disabled
        />

        <button onClick={handleSave}>
          Save Changes
        </button>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "10px",
            background: "#555",
          }}
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Profile;