import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../../api/JobApi";

function JobSearchBar() {
  const navigate = useNavigate();

  const [type, setType] = useState("Jobs");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.append("keyword", keyword.trim());
    if (location.trim()) params.append("location", location.trim());
    if (experience) params.append("minExp", experience);

    navigate(`/jobs?${params.toString()}`);
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
    <div className="bg-white shadow-xl rounded-full px-4 py-3 max-w-5xl mx-auto flex items-center gap-2">

      {/* JOB TYPE */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-3 py-2 bg-transparent outline-none text-gray-700"
      >
        <option>Jobs</option>
        <option>Internship</option>
      </select>

      <div className="w-px h-6 bg-gray-300"></div>

      {/* KEYWORD */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Skills / Designations / Companies"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 outline-none"
        />

        {suggestions.length > 0 && (
          <div className="absolute top-12 w-full bg-white shadow-lg rounded-lg">
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => selectSuggestion(s)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-gray-300"></div>

      {/* LOCATION */}
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-3 py-2 outline-none w-[180px]"
      />

      {/* SEARCH BUTTON */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}

export default JobSearchBar;