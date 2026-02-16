import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../api/CompanyApi";

function Companies() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchCompanies(page);
  }, [page]);

  const fetchCompanies = (pageNumber) => {
    getAllCompanies(pageNumber, 5)
      .then((res) => {
        const data = res.data;
        setCompanies(data.content || []);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("API Error:", error));
  };

  const filteredCompanies = companies.filter((company) =>
    company.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={pageStyle}>
      <h1 style={{ marginBottom: "20px" }}>Companies</h1>

      <input
        type="text"
        placeholder="Search company name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={inputStyle}
      />

      {filteredCompanies.length === 0 ? (
        <p>No companies found</p>
      ) : (
        filteredCompanies.map((company) => (
          <div key={company.id} style={companyCard}>
            
            {/* LEFT LOGO */}
            <div style={{ width: "80px" }}>
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt="logo"
                  style={{ width: "70px", borderRadius: "10px" }}
                />
              ) : (
                <div style={logoPlaceholder}>No Logo</div>
              )}
            </div>

            {/* MIDDLE DETAILS */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{company.companyName}</h3>
              <p style={{ margin: "6px 0", color: "#555" }}>
                {company.description}
              </p>
              <p style={{ margin: "4px 0" }}>
                <b>Location:</b> {company.location}
              </p>

              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#2563eb", fontSize: "14px" }}
                >
                  Visit Website
                </a>
              )}

              <p style={{ marginTop: "5px", fontSize: "14px" }}>
                <b>Status:</b>{" "}
                <span style={{ color: company.isActive ? "green" : "red" }}>
                  {company.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </div>

            {/* RIGHT BUTTON */}
            <div>
              <button
                style={viewBtn}
                onClick={() =>
                  navigate(
                    `/jobs?companyId=${company.id}&companyName=${company.companyName}`
                  )
                }
              >
                View Jobs →
              </button>
            </div>
          </div>
        ))
      )}

      {/* ✅ Pagination Controls */}
      <div style={paginationContainer}>
        <button
          style={paginationBtn}
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span style={{ fontWeight: "600" }}>
          Page {page + 1} of {totalPages}
        </span>

        <button
          style={paginationBtn}
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* STYLES */

const pageStyle = {
  padding: "40px",
  backgroundColor: "#ffe4ec",
  minHeight: "100vh",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "25px",
  width: "300px",
};

const companyCard = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "18px",
  display: "flex",
  gap: "20px",
  alignItems: "center",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
};

const viewBtn = {
  padding: "10px 18px",
  backgroundColor: "#7c3aed",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
};

const logoPlaceholder = {
  width: "70px",
  height: "70px",
  backgroundColor: "#f3f4f6",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  color: "#6b7280",
};

const paginationContainer = {
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
};

const paginationBtn = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#7c3aed",
  color: "#fff",
  cursor: "pointer",
};

export default Companies;
