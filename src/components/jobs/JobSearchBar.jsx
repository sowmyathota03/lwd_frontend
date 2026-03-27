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
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-0 bg-white dark:bg-slate-800 rounded-2xl md:rounded-full p-3 md:p-2.5 max-w-5xl mx-auto shadow-lg border border-slate-100 dark:border-slate-700/60 transition-all hover:shadow-xl">

      {/* SKILLS / KEYWORD */}
      <div className="relative flex-1 w-full md:w-auto h-full">
        <div className="flex items-center w-full px-4 py-3 md:py-2 bg-slate-50 md:bg-transparent dark:bg-slate-900 md:dark:bg-transparent rounded-xl md:rounded-none group">
          <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Skills, Designations, or Keywords"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder-slate-400 font-medium"
          />
        </div>
        
        {/* DROPDOWN */}
        {suggestions.length > 0 && (
          <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => selectSuggestion(s)}
                className="px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex items-center transition-colors"
              >
                <svg className="w-4 h-4 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-600 mx-2"></div>

      {/* LOCATION */}
      <div className="flex-1 md:flex-none md:w-44 w-full h-full">
        <div className="flex items-center w-full px-4 py-3 md:py-2 bg-slate-50 md:bg-transparent dark:bg-slate-900 md:dark:bg-transparent rounded-xl md:rounded-none group">
          <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder-slate-400 font-medium"
          />
        </div>
      </div>

      <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-600 mx-2"></div>

      {/* COMPANY */}
      <div className="flex-1 md:flex-none md:w-44 w-full h-full">
        <div className="flex items-center w-full px-4 py-3 md:py-2 bg-slate-50 md:bg-transparent dark:bg-slate-900 md:dark:bg-transparent rounded-xl md:rounded-none group">
          <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <input
            type="text"
            placeholder="Company"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder-slate-400 font-medium"
          />
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <button
        onClick={handleSearch}
        className="w-full md:w-auto mt-2 md:mt-0 px-8 py-3.5 md:py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl md:rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        Search Jobs
      </button>

    </div>
  );
}

export default JobSearchBar;