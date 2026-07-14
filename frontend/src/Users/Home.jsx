import { useEffect, useState } from "react";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import homeBackground from "../assets/home_background.jpg";
import { getTemples } from "../Services/templeService";
import { toast } from "react-toastify";

function Home() {

  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    loadTemples();
  }, []);

  const loadTemples = async () => {

    try {

      const res = await getTemples();

      // Show first 6 temples on Home page
      setPlaces(res.data.temples.slice(0, 6));

    } catch (err) {

      toast.error("Failed to load temples");

    }

  };

  return (
    <>

      {/* Hero Section */}

      <section
        className="hero"
        style={{
          backgroundImage: `url(${homeBackground})`,
        }}
      >

        <div className="hero-overlay">

          <h1>Welcome to DarshanEase</h1>

          <p>
            Book Temple, Church and Mosque visit tickets with ease.
          </p>

          <div className="hero-buttons">

            <button onClick={() => navigate("/temples")}>
              Book Now
            </button>

            <button onClick={() => navigate("/temples")}>
              Explore Places
            </button>

          </div>

        </div>

      </section>

      {/* Popular Places */}

      <section className="popular">

        <h2>Popular Places</h2>

        <div className="card-container">

          {places.map((place) => (

            <div className="card" key={place._id}>

<img
  src={
    place.image
      ? `http://localhost:5000${place.image}`
      : "https://via.placeholder.com/350x220"
  }
  alt={place.templeName}
/>

              <h3>{place.templeName}</h3>

              <p>
                {place.location}, {place.state}
              </p>

              <button
                onClick={() =>
                  navigate(`/temple-details/${place._id}`)
                }
              >
                View Details
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2>Why Choose DarshanEase?</h2>

        <div className="feature-box">

          <div className="feature-card">
            <div className="icon">🎟️</div>
            <h3>Easy Booking</h3>
            <p>Book your darshan tickets in just a few clicks.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>100% safe and secure online payment gateway.</p>
          </div>

          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Instant Confirmation</h3>
            <p>Receive your booking confirmation instantly.</p>
          </div>

          <div className="feature-card">
            <div className="icon">❌</div>
            <h3>Easy Cancellation</h3>
            <p>Cancel eligible bookings quickly and easily.</p>
          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="stats">

        <h2>Our Achievements</h2>

        <div className="stats-container">

          <div className="stat-card">
            <h1>150+</h1>
            <p>Temples</p>
          </div>

          <div className="stat-card">
            <h1>50K+</h1>
            <p>Happy Devotees</p>
          </div>

          <div className="stat-card">
            <h1>1 Lakh+</h1>
            <p>Bookings</p>
          </div>

          <div className="stat-card">
            <h1>4.9 ★</h1>
            <p>User Rating</p>
          </div>

        </div>

      </section>

      {/* Testimonials */}

      <section className="testimonials">

        <h2>What Our Devotees Say</h2>

        <div className="testimonial-container">

          <div className="testimonial-card">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="User"
            />
            <h3>Priya Sharma</h3>
            <p className="stars">⭐⭐⭐⭐⭐</p>
            <p>
              Booking my Tirumala darshan was very easy. The process was smooth
              and I received my ticket instantly.
            </p>
          </div>

          <div className="testimonial-card">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
            />
            <h3>Rahul Kumar</h3>
            <p className="stars">⭐⭐⭐⭐⭐</p>
            <p>
              Excellent service! The interface is simple and the booking
              confirmation arrived immediately.
            </p>
          </div>

          <div className="testimonial-card">
            <img
              src="https://randomuser.me/api/portraits/women/20.jpg"
              alt="User"
            />
            <h3>Fatima Khan</h3>
            <p className="stars">⭐⭐⭐⭐⭐</p>
            <p>
              I booked my family visit without any difficulty. Highly
              recommended for everyone.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h2>Ready for Your Spiritual Journey?</h2>

        <p>
          Book your temple, church, or mosque visit today and experience a
          smooth, secure, and hassle-free booking process.
        </p>

        <button onClick={() => navigate("/temples")}>
          Book Your Darshan Now
        </button>

      </section>

    </>
  );

}

export default Home;