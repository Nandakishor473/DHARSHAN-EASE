import "../Styles/Payment.css";
import { useNavigate, useLocation } from "react-router-dom";
import { createBooking } from "../Services/bookingService";
import { toast } from "react-toastify";
import { useState } from "react";

function Payment() {

  const navigate = useNavigate();
  const location = useLocation();

  const { temple, slot, devotees, totalAmount } = location.state || {};

  const [loading, setLoading] = useState(false);

  if (!temple || !slot) {

    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Invalid Payment Request
      </h2>
    );

  }

  const handlePayment = async () => {

    try {

      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  toast.error("Please login again");
  navigate("/login");
  return;
}

      const res = await createBooking({

        user: user._id,

        temple: temple._id,

        slot: slot._id,

        numberOfPersons: devotees,

      });

      toast.success("Payment Successful");

      navigate("/booking-success", {

        state: {

          booking: res.data.booking,

          temple,

          slot,

          devotees,

          totalAmount,

        },

      });

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        err.message ||
        "Payment Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="payment-container">

      <div className="payment-card">

        <h1>Payment</h1>

        <div className="summary">

          <h2>Booking Summary</h2>

          <p>

            <strong>Temple :</strong>

            {temple.templeName}

          </p>

          <p>

            <strong>Slot :</strong>

            {slot.startTime} - {slot.endTime}

          </p>

          <p>

            <strong>Devotees :</strong>

            {devotees}

          </p>

          <h3>

            Total Amount : ₹{totalAmount}

          </h3>

        </div>

        <h2>Select Payment Method</h2>

        <div className="payment-method">

          <label>

            <input type="radio" name="payment" defaultChecked />

            UPI

          </label>

          <label>

            <input type="radio" name="payment" />

            Credit / Debit Card

          </label>

          <label>

            <input type="radio" name="payment" />

            Net Banking

          </label>

        </div>

        <button

          className="pay-btn"

          onClick={handlePayment}

          disabled={loading}

        >

          {loading ? "Processing..." : "Pay Now"}

        </button>

      </div>

    </div>

  );

}

export default Payment;