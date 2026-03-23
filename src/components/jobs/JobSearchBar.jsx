import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../../api/JobApi";

function JobSearchBar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.append("keyword", keyword.trim());
    if (location.trim()) params.append("location", location.trim());
    if (companyName.trim()) params.append("companyName", companyName.trim());

    navigate(`/jobs?${params.toString()}`);

    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Suggestions API
  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (keyword.length > 1) {
        try {
          const res = await getSearchSuggestions(keyword);
          setSuggestions(res.data || []);
        } catch (err) {
          console.error(err);
        }
      } else {
        setSuggestions([]);
      }
    }, 400);

    return () => clearTimeout(debounce);
  }, [keyword]);

  const selectSuggestion = (value) => {
    setKeyword(value);
    setSuggestions([]);
  };

  return (
    <div className="lwd-card flex items-center gap-3 rounded-full p-3 max-w-5xl mx-auto shadow-md">

      {/* SKILLS / KEYWORD */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Skills / Designation"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="lwd-input rounded-full pr-3"
        />
        {suggestions.length > 0 && (
          <div className="absolute top-12 w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => selectSuggestion(s)}
                className="px-4 py-2 text-sm lwd-link hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

      {/* LOCATION */}
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
        className="lwd-input rounded-full w-40"
      />

      <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

      {/* COMPANY */}
      <input
        type="text"
        placeholder="Company"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="lwd-input rounded-full w-40"
      />

      {/* SEARCH BUTTON */}
      <button
        onClick={handleSearch}
        className="lwd-btn-primary rounded-full"
      >
        Search
      </button>

    </div>
  );
}

export default JobSearchBar;