import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTemple } from "../Services/templeService";
import "../Styles/AddTemple.css";

function AddTemple() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    templeName: "",
    description: "",
    location: "",
    district: "",
    state: "",
    openingTime: "",
    closingTime: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleImage = (e) => {

    setImage(e.target.files[0]);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("templeName", formData.templeName);
      data.append("description", formData.description);
      data.append("location", formData.location);
      data.append("district", formData.district);
      data.append("state", formData.state);
      data.append("openingTime", formData.openingTime);
      data.append("closingTime", formData.closingTime);

      if (image) {

        data.append("image", image);

      }

      await addTemple(data);

      toast.success("Temple Added Successfully");

      navigate("/admin/temples");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to Add Temple"
      );

    }

  };

  return (

    <div className="add-temple">

      <div className="add-card">

        <h1>Add Temple</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="templeName"
            placeholder="Temple Name"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Temple Description"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            required
          />

          <label>Select Temple Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            required
          />

          <input
            type="text"
            name="openingTime"
            placeholder="Opening Time"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="closingTime"
            placeholder="Closing Time"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Temple
          </button>

        </form>

      </div>

    </div>

  );

}

export default AddTemple;