import { useState } from "react";
import "../Styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../Services/authService";
import loginImage from "../assets/login.png";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      const res = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successful");

      navigate("/");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Login Failed"
      );

    }

  };

  return (
    <div className="login-container">

      <div className="login-left">
        <img src={loginImage} alt="Login" />
      </div>

      <div className="login-right">

        <h1>Welcome Back 👋</h1>

        <p>Login to continue your spiritual journey.</p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit">
            Login
          </button>

          <p className="register-link">
            Don't have an account?
            <Link to="/register">
              Register
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;