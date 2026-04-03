import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../../api/JobApi";
import { Search, MapPin, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function JobSearchBlock() {
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
    <div className="relative w-full max-w-6xl mx-auto z-50">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          flex flex-col md:flex-row items-center gap-2 p-2 
          bg-white dark:bg-slate-900 rounded-2xl md:rounded-full border transition-all duration-300
          ${isFocused 
            ? "border-blue-500 shadow-lg" 
            : "border-slate-200 dark:border-slate-700"}
        `}
      >
        {/* KEYWORD */}
        <div className="relative flex-1 w-full text-left">
          <div className="flex items-center px-5 h-16">
            <Search className="w-5 h-5 mr-3 text-slate-400" />
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 mb-0.5">
                Job Title / Skills
              </label>
              <input
                type="text"
                placeholder="e.g. Java Developer"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className="w-full bg-transparent outline-none text-base font-medium text-slate-800 dark:text-white placeholder-slate-400"
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
                className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden"
              >
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => selectSuggestion(s)}
                    className="w-full px-5 py-2 text-sm text-left text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-700" />

        {/* LOCATION */}
        <div className="flex-1 w-full md:w-48 text-left">
          <div className="flex items-center px-5 h-16">
            <MapPin className="w-5 h-5 mr-3 text-slate-400" />
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 mb-0.5">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. Hyderabad"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none text-base font-medium text-slate-800 dark:text-white placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-700" />

        {/* COMPANY */}
        <div className="flex-1 w-full md:w-48 text-left">
          <div className="flex items-center px-5 h-16">
            <Building className="w-5 h-5 mr-3 text-slate-400" />
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 mb-0.5">
                Company
              </label>
              <input
                type="text"
                placeholder="e.g. TCS, Infosys"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none text-base font-medium text-slate-800 dark:text-white placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="lwd-btn-primary w-full md:w-auto h-14 px-10 rounded-full flex items-center justify-center gap-2"
        >
          <Search size={18} />
          <span>Search</span>
        </button>
      </motion.div>
    </div>
  );
}

export default JobSearchBlock;