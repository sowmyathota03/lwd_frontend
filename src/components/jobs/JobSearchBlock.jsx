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

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.append("keyword", keyword.trim());
    if (location.trim()) params.append("location", location.trim());
    if (companyName.trim()) params.append("companyName", companyName.trim());
    if (minExp) params.append("minExp", minExp);
    if (maxExp) params.append("maxExp", maxExp);
    if (jobType) params.append("jobType", jobType);

    setSuggestions([]);
    navigate(`/Jobs?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="py-16 px-5 bg-linear-to-r from-[#f595da] to-[#8eb5fa]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Find Your Dream Job
          </h1>

          <p className="text-lg mb-8 text-gray-700">
            Explore thousands of verified jobs from top companies and grow your
            career with LWD.
          </p>

          <div
            ref={containerRef}
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4 mx-auto lg:mx-0"
          >
            {/* MAIN SEARCH ROW */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center">
              <div className="relative flex-1 min-w-62.5">
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
                  className="w-full p-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {suggestions.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {suggestions.map((s, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(s)}
                        className="px-4 py-2 text-sm cursor-pointer border-b last:border-none hover:bg-gray-100"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSearch}
                className="p-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition"
              >
                🔍 Search
              </button>

              {/* Smaller Advanced Button */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="p-2 text-sm rounded border border-blue-600 bg-white text-blue-600 font-medium hover:bg-blue-50 transition"
              >
                {showAdvanced ? "Close" : "Advanced"}
              </button>
            </div>

            {/* ADVANCED SEARCH */}
            {showAdvanced && (
              <div className="flex flex-wrap gap-3 mt-2 justify-center lg:justify-start items-center">
                
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-40"
                />

                <input
                  type="text"
                  placeholder="Company"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-40"
                />

                <input
                  type="number"
                  placeholder="Min Exp"
                  value={minExp}
                  onChange={(e) => setMinExp(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-24"
                />

                <input
                  type="number"
                  placeholder="Max Exp"
                  value={maxExp}
                  onChange={(e) => setMaxExp(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-24"
                />

                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-36"
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

        {/* RIGHT IMAGE */}
        <div className="flex-1 text-center">
          <img
            src="https://media.istockphoto.com/id/1349094945/photo/human-using-a-computer-laptop-for-searching-for-job-and-fill-out-personal-data-on-job-website.jpg?s=612x612&w=0&k=20&c=nVCY302pin29eP1rN0eBGstQN3WF4YQTWvZ4TvAs21g="
            alt="Job Search"
            className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default JobSearchBlock;
