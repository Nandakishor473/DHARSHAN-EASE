import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTemple, updateTemple } from "../Services/templeService";
import { toast } from "react-toastify";
import "../Styles/EditTemple.css";

function EditTemple() {

  const { id } = useParams();
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
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchTemple();
  }, []);

  const fetchTemple = async () => {

    try {

      const res = await getTemple(id);

      setFormData({
        templeName: res.data.temple.templeName,
        description: res.data.temple.description,
        location: res.data.temple.location,
        district: res.data.temple.district,
        state: res.data.temple.state,
        openingTime: res.data.temple.openingTime,
        closingTime: res.data.temple.closingTime,
      });

      if (res.data.temple.image) {
        setPreview(
          `http://localhost:5000${res.data.temple.image}`
        );
      }

    } catch (err) {

      toast.error("Failed to load temple");

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImage(file);

      setPreview(URL.createObjectURL(file));

    }

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

      await updateTemple(id, data);

      toast.success("Temple Updated Successfully");

      navigate("/admin/temples");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Update Failed"
      );

    }

  };

  return (

    <div className="edit-temple">

      <div className="edit-card">

        <h1>Edit Temple</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="templeName"
            value={formData.templeName}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <label>Select New Temple Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {preview && (

            <img
              src={preview}
              alt="Temple Preview"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />

          )}

          <input
            type="text"
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Update Temple
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditTemple;