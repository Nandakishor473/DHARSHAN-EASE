import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createSlot } from "../Services/slotService";
import { getTemples } from "../Services/templeService";
import "../Styles/AddSlot.css";

function AddSlot() {

  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);

  const [formData, setFormData] = useState({
    temple: "",
    slotDate: "",
    startTime: "",
    endTime: "",
    totalSeats: "",
    availableSeats: "",
    poojaType: "",
  });

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {

    try {

      const res = await getTemples();

      setTemples(res.data.temples);

    } catch {

      toast.error("Failed to load temples");

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createSlot({
        ...formData,
        totalSeats: Number(formData.totalSeats),
        availableSeats: Number(formData.availableSeats),
      });

      toast.success("Slot Added Successfully");

      navigate("/admin/slots");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to Add Slot"
      );

    }

  };

  return (

    <div className="add-slot">

      <div className="add-slot-card">

        <h1>Add Slot</h1>

        <form onSubmit={handleSubmit}>

          <select
            name="temple"
            value={formData.temple}
            onChange={handleChange}
            required
          >
            <option value="">Select Temple</option>

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
            type="date"
            name="slotDate"
            value={formData.slotDate}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="startTime"
            placeholder="08:00 AM"
            value={formData.startTime}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="endTime"
            placeholder="09:00 AM"
            value={formData.endTime}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            value={formData.totalSeats}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="availableSeats"
            placeholder="Available Seats"
            value={formData.availableSeats}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="poojaType"
            placeholder="VIP Darshan"
            value={formData.poojaType}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Slot
          </button>

        </form>

      </div>

    </div>

  );

}

export default AddSlot;