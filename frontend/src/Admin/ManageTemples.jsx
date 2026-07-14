import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getTemples,
  deleteTemple,
} from "../Services/templeService";
import "../Styles/ManageTemples.css";

function ManageTemples() {

  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {

    try {

      const res = await getTemples();

      setTemples(res.data.temples);

    } catch (err) {

      toast.error("Failed to load temples");

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this temple?"
    );

    if (!confirmDelete) return;

    try {

      await deleteTemple(id);

      toast.success("Temple Deleted Successfully");

      fetchTemples();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  return (

    <div className="manage-temples">

      <div className="header">

        <h1>Manage Temples</h1>

        <button
          className="add-btn"
          onClick={() => navigate("/admin/add-temple")}
        >
          + Add Temple
        </button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Temple Name</th>

            <th>Location</th>

            <th>State</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {

            temples.map((temple) => (

              <tr key={temple._id}>

                <td>{temple.templeName}</td>

                <td>{temple.location}</td>

                <td>{temple.state}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/admin/edit-temple/${temple._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(temple._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default ManageTemples;