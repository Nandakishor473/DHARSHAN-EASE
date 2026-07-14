import { useState } from "react";
import "../Styles/Contact.css";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Your message has been sent successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">

      <div className="contact-card">

        <h1>Contact Us</h1>

        <p className="contact-text">
          We'd love to hear from you. Feel free to contact us.
        </p>

        <div className="contact-info">

          <p><strong>📍 Address:</strong> Hyderabad, Telangana, India</p>

          <p><strong>📞 Phone:</strong> +91 9876543210</p>

          <p><strong>📧 Email:</strong> support@darshanease.com</p>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}

export default Contact;