import { useState } from "react";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactnumber, setContactnumber] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ fullname, email, password, contactnumber });
  }

  return (
    <div className="registrationform_container">
      <form className="registration_form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="group">
          <label>FullName</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        <div className="group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="group">
          <label>Contact Number</label>
          <input
            type="text"
            value={contactnumber}
            onChange={(e) => setContactnumber(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
