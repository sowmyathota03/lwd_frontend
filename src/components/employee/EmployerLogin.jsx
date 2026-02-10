import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployerLogin() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (login.email === "employer@gmail.com" && login.password === "1234") {
      alert("Login Success");
      navigate("/employer-dashboard"); 
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Employer Login</h2>

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Enter Email" value={login.email} onChange={handleChange} required/>
        <br /><br />

        <input type="password" name="password" placeholder="Enter Password" value={login.password} onChange={handleChange} required/>
        <br /><br />

        <button type="submit" style={{marginBottom:"10px", backgroundColor:"blue", color:"white", border:"none", outline:"none", borderRadius:"15px"}}>Login</button>
      </form>
    </div>
  );
}
export default EmployerLogin;
