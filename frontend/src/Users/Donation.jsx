import { useEffect, useState } from "react";
import "../Styles/Donation.css";
import { toast } from "react-toastify";
import { createDonation } from "../Services/donationService";
import { getTemples } from "../Services/templeService";

function Donation() {

  const [temples, setTemples] = useState([]);

  const [formData, setFormData] = useState({
    temple: "",
    amount: "",
    message: "",
  });

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

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleDonate = async (e) => {

    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

      toast.error("Please Login");

      return;

    }

    try {

      await createDonation({

        user: user._id,

        temple: formData.temple,

        amount: Number(formData.amount),

        message: formData.message,

      });

      toast.success("Donation Successful ❤️");

      setFormData({

        temple: "",

        amount: "",

        message: "",

      });

    } catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Donation Failed"

      );

    }

  };

  return (

    <div className="donation-container">

      <div className="donation-card">

        <h1>Donate to Temple</h1>

        <form onSubmit={handleDonate}>

          <label>Select Temple</label>

          <select

            name="temple"

            value={formData.temple}

            onChange={handleChange}

          >

            <option value="">

              Select Temple

            </option>

            {

              temples.map((temple) => (

                <option

                  key={temple._id}

                  value={temple._id}

                >

                  {temple.templeName}

                </option>

              ))

            }

          </select>

          <label>Donation Amount</label>

          <input

            type="number"

            name="amount"

            placeholder="Enter Amount"

            value={formData.amount}

            onChange={handleChange}

          />

          <label>Message</label>

          <textarea

            name="message"

            placeholder="Write a message (optional)"

            value={formData.message}

            onChange={handleChange}

          />

          <button type="submit">

            Donate Now

          </button>

        </form>

      </div>

    </div>

  );

}

export default Donation;