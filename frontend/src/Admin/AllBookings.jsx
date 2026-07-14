import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "../Styles/AllBookings.css";
import {
  getBookings,
  cancelBooking,
} from "../Services/bookingService";
import { getTemples } from "../Services/templeService";

function AllBookings() {

  const [bookings, setBookings] = useState([]);
  const [temples, setTemples] = useState([]);
  const [selectedTemple, setSelectedTemple] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBookings();
    loadTemples();
  }, []);

  const loadBookings = async () => {

    try {

      const res = await getBookings();

      setBookings(res.data.bookings);

    } catch {

      toast.error("Failed to load bookings");

    }

  };

  const loadTemples = async () => {

    try {

      const res = await getTemples();

      setTemples(res.data.temples);

    } catch {

      toast.error("Failed to load temples");

    }

  };

  const handleCancel = async (id) => {

    if (!window.confirm("Cancel this booking?")) return;

    try {

      await cancelBooking(id);

      toast.success("Booking Cancelled");

      loadBookings();

    } catch {

      toast.error("Cancellation Failed");

    }

  };

  const filteredBookings = useMemo(() => {

    return bookings.filter((booking) => {

      const templeMatch =
        selectedTemple === "all" ||
        booking.temple?._id === selectedTemple;

      const searchMatch =
        booking.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        booking.bookingReference
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return templeMatch && searchMatch;

    });

  }, [bookings, selectedTemple, search]);

  const total = filteredBookings.length;

  const confirmed = filteredBookings.filter(
    b => b.bookingStatus === "Confirmed"
  ).length;

  const cancelled = filteredBookings.filter(
    b => b.bookingStatus === "Cancelled"
  ).length;

  return (

    <div className="all-bookings">

      <h1>Booking Management</h1>

      <div className="stats">

        <div className="card">
          <h2>{total}</h2>
          <p>Total</p>
        </div>

        <div className="card">
          <h2>{confirmed}</h2>
          <p>Confirmed</p>
        </div>

        <div className="card">
          <h2>{cancelled}</h2>
          <p>Cancelled</p>
        </div>

      </div>

      <div className="filters">

        <select
          value={selectedTemple}
          onChange={(e) =>
            setSelectedTemple(e.target.value)
          }
        >

          <option value="all">
            All Temples
          </option>

          {temples.map((temple) => (

            <option
              key={temple._id}
              value={temple._id}
            >
              {temple.templeName}
            </option>

          ))}

        </select>

        <input
          type="text"
          placeholder="Search User / Booking ID"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <table>

        <thead>

          <tr>

            <th>Booking ID</th>
            <th>User</th>
            <th>Temple</th>
            <th>Slot</th>
            <th>Persons</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredBookings.map((booking) => (

            <tr key={booking._id}>

              <td>{booking.bookingReference}</td>

              <td>{booking.user?.name}</td>

              <td>{booking.temple?.templeName}</td>

              <td>

                {booking.slot?.startTime}

                -

                {booking.slot?.endTime}

              </td>

              <td>{booking.numberOfPersons}</td>

              <td>{booking.bookingStatus}</td>

              <td>

                {booking.bookingStatus !== "Cancelled" && (

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      handleCancel(booking._id)
                    }
                  >
                    Cancel
                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AllBookings;