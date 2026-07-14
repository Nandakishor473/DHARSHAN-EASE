import "../Styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h2>DarshanEase</h2>

          <p>
            DarshanEase is an online platform that allows devotees to book
            temple, church, and mosque visits quickly, securely, and
            conveniently.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Temples</li>
            <li>My Bookings</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 Hyderabad, Telangana</p>
          <p>📞 +91 9876543210</p>
          <p>📧 support@darshanease.com</p>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        © 2026 DarshanEase. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;