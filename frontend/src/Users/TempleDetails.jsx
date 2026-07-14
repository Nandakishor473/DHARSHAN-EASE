import { useEffect, useState } from "react";
import "../Styles/TempleDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { getTemple } from "../Services/templeService";
import { getTempleSlots } from "../Services/slotService";
import { toast } from "react-toastify";

function TempleDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemple();
  }, []);

  const fetchTemple = async () => {

    try {

      const templeRes = await getTemple(id);

      setTemple(templeRes.data.temple);

      const slotRes = await getTempleSlots(id);

      setSlots(slotRes.data.slots);

    } catch (err) {

      toast.error("Failed to load temple details");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  }

  if (!temple) {

    return (
      <h2 style={{ textAlign: "center" }}>
        Temple Not Found
      </h2>
    );

  }

  return (

    <div className="details-container">

      <div className="details-image">

      <img
  src={
    temple.image
      ? `http://localhost:5000${temple.image}`
      : "https://via.placeholder.com/500x350"
  }
  alt={temple.templeName}
/>

      </div>

      <div className="details-content">

        <h1>{temple.templeName}</h1>

        <p className="location">
          📍 {temple.location}, {temple.state}
        </p>

        <h3>Temple Timings</h3>

        <p>
          {temple.openingTime} - {temple.closingTime}
        </p>

        <h3>About</h3>

        <p>{temple.description}</p>

        <h3>Facilities</h3>

        <ul>
          <li>✅ Free Parking</li>
          <li>✅ Drinking Water</li>
          <li>✅ Wheelchair Access</li>
          <li>✅ Rest Rooms</li>
          <li>✅ Prasadam Counter</li>
        </ul>

        <h3>Available Slots</h3>

        <div className="slot-container">

          {
            slots.length > 0 ?

              slots.map((slot) => (

                <button
                  key={slot._id}
                  className="slot-btn"
                  onClick={() =>
                    navigate("/booking", {
                      state: {
                        temple,
                        slot
                      }
                    })
                  }
                >
                  {slot.startTime} - {slot.endTime}

                  <br />

                  Seats : {slot.availableSeats}

                </button>

              ))

              :

              <p>No Slots Available</p>

          }

        </div>

      </div>

    </div>

  );

}

export default TempleDetails;