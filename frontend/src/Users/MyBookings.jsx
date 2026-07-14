import "../Styles/MyBookings.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getUserBookings,
  cancelBooking,
} from "../Services/bookingService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await getUserBookings(
        user._id
      );

      setBookings(res.data.bookings);

    } catch (err) {

      toast.error("Failed to load bookings");

    }

  };

  const handleCancel = async (id) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

      await cancelBooking(id);

      toast.success(
        "Booking Cancelled Successfully"
      );

      fetchBookings();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Cancellation Failed"
      );

    }

  };

  const downloadTicket = async (booking) => {

    const ticket = document.createElement("div");

    ticket.style.padding = "20px";
    ticket.style.width = "500px";
    ticket.style.background = "#fff";
    ticket.style.fontFamily = "Arial";

    ticket.innerHTML = `
      <h1 style="text-align:center;color:#8B0000;">
        DarshanEase
      </h1>

      <hr/>

      <h2>Booking Ticket</h2>

      <p>
      <strong>Booking ID :</strong>
      ${booking.bookingReference}
      </p>

      <p>
      <strong>Temple :</strong>
      ${booking.temple.templeName}
      </p>

      <p>
      <strong>Date :</strong>
      ${new Date(
        booking.createdAt
      ).toLocaleDateString()}
      </p>

      <p>
      <strong>Slot :</strong>
      ${booking.slot.startTime}
      -
      ${booking.slot.endTime}
      </p>

      <p>
      <strong>Devotees :</strong>
      ${booking.numberOfPersons}
      </p>

      <p>
      <strong>Amount :</strong>
      ₹${booking.numberOfPersons * 300}
      </p>

      <p>
      <strong>Status :</strong>
      ${booking.bookingStatus}
      </p>

      <hr/>

      <p style="text-align:center;">
      Thank you for choosing DarshanEase
      </p>
    `;

    document.body.appendChild(ticket);

    const canvas = await html2canvas(ticket);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      190,
      0
    );

    pdf.save(
      `${booking.bookingReference}.pdf`
    );

    document.body.removeChild(ticket);

  };
  return (
    <div className="mybookings">

      <h1>My Bookings</h1>

      <div className="booking-list">

        {bookings.length === 0 ? (

          <h2 style={{ textAlign: "center" }}>
            No Bookings Found
          </h2>

        ) : (

          bookings.map((booking) => (

            <div
              className="booking-card"
              key={booking._id}
            >

              <img
                src={
                  booking.temple?.image ||
                  "https://via.placeholder.com/250"
                }
                alt={booking.temple?.templeName}
              />

              <div className="booking-details">

                <h2>
                  {booking.temple?.templeName}
                </h2>

                <p>
                  <strong>Booking ID :</strong>
                  {booking.bookingReference}
                </p>

                <p>
                  📅{" "}
                  {new Date(
                    booking.createdAt
                  ).toLocaleDateString()}
                </p>

                <p>
                  🕒{" "}
                  {booking.slot?.startTime} -
                  {booking.slot?.endTime}
                </p>

                <p>
                  👥 {booking.numberOfPersons} Devotees
                </p>

                <p>
                  💳 ₹
                  {booking.numberOfPersons * 300}
                </p>

                <p
                  className={
                    booking.bookingStatus === "Cancelled"
                      ? "cancelled"
                      : "status"
                  }
                >
                  {booking.bookingStatus === "Cancelled"
                    ? "❌"
                    : "✅"}{" "}
                  {booking.bookingStatus}
                </p>

              </div>

              <div className="booking-buttons">

                <button
                  onClick={() =>
                    downloadTicket(booking)
                  }
                >
                  Download Ticket
                </button>

                <button
                  onClick={() =>
                    alert(
                      `Booking Status : ${booking.bookingStatus}`
                    )
                  }
                >
                  View Status
                </button>

                <button
                  className="cancel"
                  disabled={
                    booking.bookingStatus ===
                    "Cancelled"
                  }
                  onClick={() =>
                    handleCancel(booking._id)
                  }
                >
                  {booking.bookingStatus ===
                  "Cancelled"
                    ? "Booking Cancelled"
                    : "Cancel Booking"}
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );

}

export default MyBookings;