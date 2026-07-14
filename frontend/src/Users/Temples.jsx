import { useEffect, useState } from "react";
import "../Styles/Temples.css";
import { useNavigate } from "react-router-dom";
import { getTemples } from "../Services/templeService";
import { toast } from "react-toastify";

function Temples() {

  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {

    fetchTemples();

  }, []);

  const fetchTemples = async () => {

    try {

      const res = await getTemples();

      setPlaces(res.data.temples);

    } catch (err) {

      toast.error("Failed to load temples");

    } finally {

      setLoading(false);

    }

  };

  const filteredPlaces = places.filter((place) => {

    const matchesSearch = place.templeName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (place.religion || "Temple") === filter;

    return matchesSearch && matchesFilter;

  });

  if (loading) {

    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  }

  return (

    <div className="temples-page">

      <h1>Explore Sacred Places</h1>

      <p>
        Find and book darshan tickets.
      </p>

      <div className="search-section">

        <input
          type="text"
          placeholder="Search Temple..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="filter-buttons">

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Temple")}>
          Temple
        </button>

      </div>

      <div className="temple-container">

        {

          filteredPlaces.length > 0 ?

            filteredPlaces.map((place) => (

              <div
                className="temple-card"
                key={place._id}
              >

                <div className="favorite">
                  ❤️
                </div>

                <img
  src={
    place.image
      ? `http://localhost:5000${place.image}`
      : "https://via.placeholder.com/300x200"
  }
  alt={place.templeName}
/>

                <div className="card-content">

                  <h2>{place.templeName}</h2>

                  <p>
                    📍 {place.location}
                  </p>

                  <p>
                    ⭐ 4.8
                  </p>

                  <p>
                    🕒 {place.openingTime} - {place.closingTime}
                  </p>

                  <p>
                    🟢 Available
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/temple-details/${place._id}`)
                    }
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))

            :

            <h2
              style={{
                textAlign: "center",
                width: "100%"
              }}
            >
              No Temples Found
            </h2>

        }

      </div>

    </div>

  );

}

export default Temples;