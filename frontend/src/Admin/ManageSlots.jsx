import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSlots, deleteSlot } from "../Services/slotService";
import "../Styles/ManageSlots.css";

function ManageSlots() {

  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {

    try {

      const res = await getSlots();

      setSlots(res.data.slots);

    } catch (err) {

      toast.error("Failed to load slots");

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slot?"
    );

    if (!confirmDelete) return;

    try {

      await deleteSlot(id);

      toast.success("Slot Deleted Successfully");

      fetchSlots();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  return (

    <div className="manage-slots">

      <div className="header">

        <h1>Manage Slots</h1>

        <button
          className="add-btn"
          onClick={() => navigate("/admin/add-slot")}
        >
          + Add Slot
        </button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Temple</th>

            <th>Date</th>

            <th>Time</th>

            <th>Total Seats</th>

            <th>Available Seats</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {slots.map((slot) => (

            <tr key={slot._id}>

              <td>{slot.temple?.templeName}</td>

              <td>
                {new Date(slot.slotDate).toLocaleDateString()}
              </td>

              <td>
                {slot.startTime} - {slot.endTime}
              </td>

              <td>{slot.totalSeats}</td>

              <td>{slot.availableSeats}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/admin/edit-slot/${slot._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(slot._id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default ManageSlots;