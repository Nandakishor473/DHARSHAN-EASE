import { useState } from "react";
import "../Styles/Booking.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Booking() {

  const navigate = useNavigate();
  const location = useLocation();

  const temple = location.state?.temple;
  const slot = location.state?.slot;

  const [devotees, setDevotees] = useState(1);

  if (!temple || !slot) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Invalid Booking Request
      </h2>
    );
  }

  const ticketPrice = 300;

  const totalAmount = devotees * ticketPrice;

  const increase = () => {

    if (devotees < slot.availableSeats) {

      setDevotees(devotees + 1);

    } else {

      toast.warning("Seats not available");

    }

  };

  const decrease = () => {

    if (devotees > 1) {

      setDevotees(devotees - 1);

    }

  };

  const handleBooking = () => {

    navigate("/payment", {

      state: {

        temple,

        slot,

        devotees,

        totalAmount

      }

    });

  };

  return (

    <div className="booking-container">

      <div className="booking-card">

        <h1>Darshan Booking</h1>

        <h2>{temple.templeName}</h2>

        <p>
          📍 {temple.location}
        </p>

        <br />

        <h3>Selected Slot</h3>

        <p>

          {slot.startTime} - {slot.endTime}

        </p>

        <p>

          Available Seats :
          <strong> {slot.availableSeats}</strong>

        </p>

        <br />

        <label>

          Number of Devotees

        </label>

        <div className="counter">

          <button onClick={decrease}>

            -

          </button>

          <span>

            {devotees}

          </span>

          <button onClick={increase}>

            +

          </button>

        </div>

        <div className="price-box">

          <p>

            Ticket Price :
            ₹{ticketPrice}

          </p>

          <h3>

            Total :
            ₹{totalAmount}

          </h3>

        </div>

        <button
          className="payment-btn"
          onClick={handleBooking}
        >

          Proceed To Payment

        </button>

      </div>

    </div>

  );

}

export default Booking;