import "../Styles/NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {

  const navigate = useNavigate();

  return (
    <div className="notfound-container">

      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <button onClick={() => navigate("/")}>
        Go to Home
      </button>

    </div>
  );
}

export default NotFound;