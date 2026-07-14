import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "../Styles/AllDonations.css";
import { getDonations } from "../Services/donationService";
import { getTemples } from "../Services/templeService";

function AllDonations() {

  const [donations, setDonations] = useState([]);
  const [temples, setTemples] = useState([]);
  const [selectedTemple, setSelectedTemple] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDonations();
    loadTemples();
  }, []);

  const loadDonations = async () => {
    try {
      const res = await getDonations();
      setDonations(res.data.donations);
    } catch {
      toast.error("Failed to load donations");
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

  const filteredDonations = useMemo(() => {

    return donations.filter((donation) => {

      const templeMatch =
        selectedTemple === "all" ||
        donation.temple?._id === selectedTemple;

      const searchMatch =
        donation.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      return templeMatch && searchMatch;

    });

  }, [donations, selectedTemple, search]);

  const totalAmount = filteredDonations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  return (

    <div className="all-donations">

      <h1>Donation Management</h1>

      <div className="donation-stats">

        <div className="stat-card">
          <h2>{filteredDonations.length}</h2>
          <p>Total Donations</p>
        </div>

        <div className="stat-card">
          <h2>₹{totalAmount}</h2>
          <p>Total Amount</p>
        </div>

      </div>

      <div className="filters">

        <select
          value={selectedTemple}
          onChange={(e)=>setSelectedTemple(e.target.value)}
        >

          <option value="all">
            All Temples
          </option>

          {temples.map((temple)=>(

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
          placeholder="Search Donor"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      <table>

        <thead>

          <tr>

            <th>Donor</th>
            <th>Temple</th>
            <th>Amount</th>
            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {filteredDonations.map((donation)=>(

            <tr key={donation._id}>

              <td>{donation.user?.name}</td>

              <td>{donation.temple?.templeName}</td>

              <td>₹{donation.amount}</td>

              <td>
                {new Date(donation.createdAt).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AllDonations;