import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../../api/JobApi";
import { Search, MapPin, Building, ChevronDown, ChevronUp, Briefcase } from "lucide-react";

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
      } else setSuggestions([]);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const handleSuggestionClick = (value) => {
    setKeyword(value);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      {/* MAIN SEARCH ROW */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder={showAdvanced ? "Job title or skills" : "Search jobs, skills, or companies..."}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />

          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-md">
              {suggestions.map((s, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-5 py-3 text-sm cursor-pointer border-b border-slate-50 dark:border-slate-700/50 last:border-none hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            Advanced
          </button>
          
          <button
            onClick={handleSearch}
            className="flex-[2] lg:flex-none bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            Find Jobs
          </button>
        </div>
      </div>

      {/* ADVANCED SEARCH GRID */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/50">
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="relative group">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500" />
            <input
              type="text"
              placeholder="Company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min Exp"
              value={minExp}
              onChange={(e) => setMinExp(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <input
              type="number"
              placeholder="Max Exp"
              value={maxExp}
              onChange={(e) => setMaxExp(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="relative group">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500" />
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
            >
              <option value="">Any Job Type</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobSearchBlock;
