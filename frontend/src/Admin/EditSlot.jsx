import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSlot, updateSlot } from "../Services/slotService";
import "../Styles/EditSlot.css";

function EditSlot() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    slotDate: "",
    startTime: "",
    endTime: "",
    totalSeats: "",
    availableSeats: "",
    poojaType: "",
  });

  useEffect(() => {
    loadSlot();
  }, []);

  const loadSlot = async () => {

    try {

      const res = await getSlot(id);

      setFormData(res.data.slot);

    } catch {

      toast.error("Failed to load slot");

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

      await updateSlot(id, formData);

      toast.success("Slot Updated Successfully");

      navigate("/admin/slots");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Update Failed"
      );

    }

  };

  return (

    <div className="edit-slot">

      <div className="edit-slot-card">

        <h1>Edit Slot</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="date"
            name="slotDate"
            value={formData.slotDate?.substring(0,10)}
            onChange={handleChange}
          />

          <input
            type="text"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />

          <input
            type="text"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />

          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
          />

          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
          />

          <input
            type="text"
            name="poojaType"
            value={formData.poojaType}
            onChange={handleChange}
          />

          <button type="submit">
            Update Slot
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditSlot;