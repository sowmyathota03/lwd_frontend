import React from "react";
import { useNavigate } from "react-router-dom";
import PopularJobs from "../components/jobs/PopularJobs"; 
import JobSearchBlock from "../components/jobs/JobSearchBlock";


function Home() {
  const navigate = useNavigate();      

  const categories=[
    { name: "IT",slug:"it", link: "/Jobs/IT" },
    { name: "Finance",slug:"finance",link: "/Jobs"  },
    { name: "Marketing",slug:"marketing", },
    { name: "HR",slug:"hr", },
    { name: "Freshers",slug:"fresher", },
    { name: "Remote Jobs",slug:"remote", }
  ];

  return (
    <div className="home">
      <JobSearchBlock />  
      <PopularJobs title="Popular Job Categories" categories={categories} />
      <section className="why-lwd" >
        <h2>Why Choose LWD?</h2>
        <div className="features">
          <div className="feature">✔ Verified Jobs</div>
          <div className="feature">✔ Trusted Companies</div>
          <div className="feature">✔ Career Guidance</div>
          <div className="feature">✔ Free Job Alerts</div>
        </div>
      </section>

      <section className="companies">
        <h2>Top Companies Hiring</h2>
        <div className="company-logos">
          <div className="logo-box">ArahInfotech</div> 
          <div className="logo-box">Google</div>
          <div className="logo-box">TCS</div>
          <div className="logo-box">Infosys</div>
          <div className="logo-box">Wipro</div>
          <div className="logo-box">Amazon</div>
          <div className="logo-box">Accenture</div>
        </div>
      </section>
      <section className="cta">
        <h2>Ready to take the next step?</h2>
        <button onClick={() => navigate("/Profile")}>Create Profile</button>
      </section>
    </div>
  );
}

export default Home;
