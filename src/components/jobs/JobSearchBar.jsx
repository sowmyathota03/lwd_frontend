import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../../api/JobApi";
import { Search, MapPin, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function JobSearchBar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="w-full px-4 py-12 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">

      {/* 🔥 HEADING SECTION */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Find Your <span className="text-blue-600">Dream Job</span>
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">
          Search jobs by skills, location, and company
        </p>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className="relative w-full max-w-6xl mx-auto z-50">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            flex flex-col md:flex-row items-center gap-2 p-2 
            bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
            rounded-2xl md:rounded-full border transition-all duration-300 shadow-md
            ${isFocused
              ? "border-blue-500 shadow-xl scale-[1.01]"
              : "border-slate-200 dark:border-slate-700"}
          `}
        >

          {/* KEYWORD */}
          <div className="relative flex-1 w-full">
            <div className="flex items-center px-5 h-14">
              <Search className="w-5 h-5 mr-3 text-blue-500" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 mb-0.5 uppercase tracking-wide">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="Java Developer..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400"
                />
              </div>
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => selectSuggestion(s)}
                      className="w-full px-5 py-2 text-sm text-left text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

          {/* LOCATION */}
          <div className="flex-1 w-full md:w-48">
            <div className="flex items-center px-5 h-14">
              <MapPin className="w-5 h-5 mr-3 text-green-500" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 mb-0.5 uppercase tracking-wide">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Hyderabad"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

          {/* COMPANY */}
          <div className="flex-1 w-full md:w-48">
            <div className="flex items-center px-5 h-14">
              <Building className="w-5 h-5 mr-3 text-purple-500" />
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 mb-0.5 uppercase tracking-wide">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="TCS, Infosys"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-8 h-14 bg-gradient-to-r from-blue-600 to-blue-700 
            text-white rounded-full flex items-center justify-center gap-2 
            transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Search size={18} />
            <span className="text-sm font-semibold">Search</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default JobSearchBar;