import React, { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    skills: "",
    location: ""
  });

  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;


    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOC files allowed");
      return;
    }

    setResume(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload resume");
      return;
    }

    console.log("Profile Created:", profile);
    console.log("Resume:", resume.name);

    
    localStorage.setItem("profileData", JSON.stringify(profile));
    localStorage.setItem("resumeName", resume.name);

    alert("Profile created successfully!");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <h2>Create Your Profile</h2>
        <p className="subtitle">
          Complete your profile to apply for jobs
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Current Location"
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="role"
            placeholder="Job Role (Eg: React Developer)"
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <select name="experience" onChange={handleChange} required>
              <option value="">Experience</option>
              <option>Fresher</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>

            <input
              type="text"
              name="skills"
              placeholder="Skills (React, Java, SQL)"
              onChange={handleChange}
            />
          </div>

         
          <div className="form-row">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              required
            />
          </div>

        
          {resume && (
            <p style={{ fontSize: "14px", color: "green" }}>
              Uploaded: {resume.name}
            </p>
          )}

          <button type="submit" style={{width:"120px", height:"40px", }}>Save Profile</button>
        </form>

      </div>
    </div>
  );
}
export default Profile;
