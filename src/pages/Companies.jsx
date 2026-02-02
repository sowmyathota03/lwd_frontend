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
      id: 7,
      name: "Google",
      industry: "IT Services",
      location: "Global",
      jobs: 200,
      about:
        "A leading global technology company providing innovative digital products and AI solutions.",
    },
  ];

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (industry === "All" || c.industry === industry)
  );

  return (
    <div style={{ padding: "40px", backgroundColor: "#ffe4ec", minHeight: "100vh" }}>
      <h1 style={{ color: "#374151" }}>Companies Hiring Now</h1>
      <p style={{ color: "#4b5563", maxWidth: "700px" }}>
        Explore companies actively hiring across industries. View open positions,
        company profiles and apply instantly.
      </p>

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
        <p style={{ marginTop: "40px", color: "#6b7280" }}>
          No companies found for selected filters.
        </p>
      ) : (
        filteredCompanies.map((company) => (
          <div key={company.id} style={companyCard}>
            <div>
              <h3 style={{ color: "#1f2937" }}>{company.name}</h3>
              <p style={{ color: "#6b7280" }}>{company.about}</p>
              <p style={{ color: "#374151" }}>
                <b>Industry:</b> {company.industry} |{" "}
                <b>Location:</b> {company.location}
              </p>
              <p style={{ color: "#374151" }}>
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
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  minWidth: "220px",
  backgroundColor: "#ffffff",
  color: "#374151",
};

const companyCard = {
  backgroundColor: "#ffffff",
  padding: "22px",
  borderRadius: "14px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const primaryBtn = {
  padding: "9px 18px",
  backgroundColor: "#ec4899", 
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "8px",
  fontWeight: "500",
};

const secondaryBtn = {
  padding: "9px 18px",
  backgroundColor: "#e5e7eb",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  color: "#374151",
};

export default Companies;
