import React, { useState } from "react";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    console.log(form);
    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="lwd-page flex justify-center items-center py-10 px-4">

      <div className="lwd-card w-full max-w-xl p-8">

        {/* Title */}
        <h2 className="lwd-title text-center text-2xl mb-6">
          Contact LWD Team
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="lwd-label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="lwd-input"
            />
          </div>

          <div>
            <label className="lwd-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="lwd-input"
            />
          </div>

          <div>
            <label className="lwd-label">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="lwd-input resize-none"
            />
          </div>

          <button type="submit" className="lwd-btn-primary w-full">
            Send Message
          </button>

        </form>
      </div>
    </div>
  );
}

export default ContactUs;