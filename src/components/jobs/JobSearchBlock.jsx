import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../../api/JobApi";

function JobSearchBlock() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");
  const [jobType, setJobType] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  // ================= SEARCH =================
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.append("keyword", keyword.trim());
    if (location.trim()) params.append("location", location.trim());
    if (companyName.trim()) params.append("companyName", companyName.trim());
    if (minExp) params.append("minExp", minExp);
    if (maxExp) params.append("maxExp", maxExp);
    if (jobType) params.append("jobType", jobType);

    setSuggestions([]); // Close suggestions when search triggers
    navigate(`/Jobs?${params.toString()}`);
  };

  // ================= HANDLE ENTER =================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ================= SUGGESTIONS =================
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (keyword.length > 1) {
        try {
          const response = await getSearchSuggestions(keyword);
          setSuggestions(response.data);
        } catch (err) {
          console.error("Suggestion error", err);
        }
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const handleSuggestionClick = (value) => {
    setKeyword(value);
    setSuggestions([]);
  };

  // ================= CLICK OUTSIDE TO CLOSE =================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= STYLES =================
  const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "90%",
    fontSize: "14px",
  };

  const searchBtnStyle = {
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
  };

  const suggestionBoxStyle = {
    position: "absolute",
    top: "110%",
    left: 0,
    width: "100%",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    zIndex: 100,
  };

  const suggestionItemStyle = {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  };

  return (
    <section
      style={{
        padding: "60px 20px",
        background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 600px" }}>
          <h1 style={{ fontSize: "42px", marginBottom: "15px" }}>
            Find Your Dream Job
          </h1>

          <p style={{ fontSize: "18px", marginBottom: "30px", color: "#333" }}>
            Explore thousands of verified jobs from top companies and grow your career with LWD.
          </p>

          <div
            ref={containerRef}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 2, minWidth: "250px" }}>
                <input
                  type="text"
                  placeholder={
                    showAdvanced
                      ? "Job title or skills"
                      : "Search jobs (title, company, location...)"
                  }
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={inputStyle}
                />

                {suggestions.length > 0 && (
                  <div style={suggestionBoxStyle}>
                    {suggestions.map((s, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(s)}
                        style={suggestionItemStyle}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={handleSearch} style={searchBtnStyle}>
                🔍 Search
              </button>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{
                  padding: "12px 18px",
                  borderRadius: "8px",
                  border: "1px solid #2563eb",
                  background: "white",
                  color: "#2563eb",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                {showAdvanced ? "Close Advanced" : "Advanced Search"}
              </button>
            </div>

            {showAdvanced && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />

                <input
                  type="text"
                  placeholder="Company"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />

                <input
                  type="number"
                  placeholder="Min Exp"
                  value={minExp}
                  onChange={(e) => setMinExp(e.target.value)}
                  style={{ ...inputStyle, width: "100px" }}
                />

                <input
                  type="number"
                  placeholder="Max Exp"
                  value={maxExp}
                  onChange={(e) => setMaxExp(e.target.value)}
                  style={{ ...inputStyle, width: "100px" }}
                />

                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  style={{ ...inputStyle, width: "150px" }}
                >
                  <option value="">Job Type</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="CONTRACT">Contract</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: "1 1 400px", textAlign: "center" }}>
          <img
            src="https://media.istockphoto.com/id/1349094945/photo/human-using-a-computer-laptop-for-searching-for-job-and-fill-out-personal-data-on-job-website.jpg?s=612x612&w=0&k=20&c=nVCY302pin29eP1rN0eBGstQN3WF4YQTWvZ4TvAs21g="
            alt="Job Search"
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default JobSearchBlock;
