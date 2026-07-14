import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { useEffect, useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");

  };

  return (

    <nav>

      <div className="logo">

        <span style={{ fontSize: "40px" }}>
          🛕
        </span>

        <h2>DarshanEase</h2>

      </div>

      <ul>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/temples">Temples</Link>
        </li>
        <li><Link to="/donate">Donate</Link></li>

        {user && (
          <>
            <li>
              <Link to="/mybookings">
                My Bookings
              </Link>
            </li>

            <li>
              <Link to="/profile">
                Profile
              </Link>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}

        {!user && (
          <>
            <li>
              <Link to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register">
                Register
              </Link>
            </li>
          </>
        )}

      </ul>

    </nav>

  );

}

export default Navbar;