import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Companies() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");

  const companies = [
    {
      id: 1,
      name: "TCS",
      industry: "IT Services",
      location: "India",
      jobs: 120,
      about: "Leading global IT services and consulting company.",
    },
    {
      id: 2,
      name: "Infosys",
      industry: "IT Services",
      location: "India",
      jobs: 95,
      about: "Digital transformation and technology services.",
    },
    {
      id: 3,
      name: "HDFC Bank",
      industry: "Finance",
      location: "India",
      jobs: 15,
      about: "One of India's largest private sector banks.",
    },
    
    {
      id: 4,
      name: "Accenture",
      industry: "Consulting",
      location: "Global",
      jobs: 150,
      about: "Global professional services company.",
    },
    {
      id: 5,
      name: "Amazon",
      industry: "E-Commerce",
      location: "Global",
      jobs: 110,
      about: "World’s leading e-commerce and cloud company.",
    },
    {
      id: 6,
      name: "Axis Bank",
      industry: "Finance",
      location: "India",
      jobs: 45,
      about: "One of India's largest private sector banks.",
    },
    {
      id: 1,
      name: "Google",
      industry: "IT Services",
      location: "India",
      jobs: 120,
      about: "A leading global technology company providing innovative digital products, cloud services, and AI-driven solutions worldwide.",
    },
  ];

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (industry === "All" || c.industry === industry)
  );

  return (
    <div style={{ padding: "40px",  backgroundColor: "#f0f4f8" }}>
      
      <h1>Companies Hiring Now</h1>
      <p style={{ color: "#555", maxWidth: "700px" }}>
        Explore companies actively hiring across industries. View open positions,
        company profiles and apply instantly.
      </p>

      {/* Search & Filter */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          margin: "25px 0",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search company name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />

        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          style={inputStyle}
        >
          <option value="All">All Industries</option>
          <option value="IT Services">IT Services</option>
          <option value="Finance">Finance</option>
          <option value="Consulting">Consulting</option>
          <option value="E-Commerce">E-Commerce</option>
        </select>
      </div>

      
      {filteredCompanies.length === 0 ? (
        <p style={{ marginTop: "40px", color: "#888" }}>
          No companies found for selected filters.
        </p>
      ) : (
        filteredCompanies.map((company) => (
          <div key={company.id} style={companyCard}>
            <div>
              <h3>{company.name}</h3>
              <p style={{ color: "#555" }}>{company.about}</p>
              <p>
                <b>Industry:</b> {company.industry} |{" "}
                <b>Location:</b> {company.location}
              </p>
              <p>
                <b>Open Positions:</b> {company.jobs}
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <button
                style={primaryBtn}
                onClick={() => navigate("/jobs")}
              >
                View Jobs
              </button>
              <button style={secondaryBtn}>Follow</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}


const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  minWidth: "220px",
};

const companyCard = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const primaryBtn = {
  padding: "8px 16px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "8px",
};

const secondaryBtn = {
  padding: "8px 16px",
  backgroundColor: "#e5e7eb",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Companies;
