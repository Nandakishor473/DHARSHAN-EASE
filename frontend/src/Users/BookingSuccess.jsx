import "../Styles/BookingSuccess.css";
import { useNavigate, useLocation } from "react-router-dom";

function BookingSuccess() {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    booking,
    temple,
    slot,
    devotees,
    totalAmount,
  } = location.state || {};

  if (!booking) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Booking Not Found
      </h2>
    );
  }

  return (

    <div className="success-container">

      <div className="ticket-card">

        <h1>🎉 Booking Confirmed</h1>

        <p className="success-message">
          Your booking has been completed successfully.
        </p>

        <hr />

        <div className="ticket-details">

          <div>
            <span>Booking ID</span>
            <strong>{booking.bookingReference}</strong>
          </div>

          <div>
            <span>Temple</span>
            <strong>{temple.templeName}</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>{temple.location}</strong>
          </div>

          <div>
            <span>Slot Time</span>
            <strong>
              {slot.startTime} - {slot.endTime}
            </strong>
          </div>

          <div>
            <span>Devotees</span>
            <strong>{devotees}</strong>
          </div>

          <div>
            <span>Amount Paid</span>
            <strong>₹{totalAmount}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="confirmed">
              {booking.bookingStatus}
            </strong>
          </div>

        </div>

        <div className="button-group">

          <button
            onClick={() =>
              window.print()
            }
          >
            Download Ticket
          </button>

          <button
            onClick={() =>
              navigate("/mybookings")
            }
          >
            View My Bookings
          </button>

          <button
            onClick={() =>
              navigate("/")
            }
          >
            Back To Home
          </button>

        </div>

      </div>

    </div>

  );

}

export default BookingSuccess;