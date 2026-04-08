import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggestions } from "../../api/JobApi";
import {
  getRecentSearches,
  deleteSearchHistory,
  clearAllSearchHistory,
} from "../../api/searchHistoryApi";
import { Search, MapPin, Building, History, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function JobSearchBar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loadingRecent, setLoadingRecent] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [clearingAll, setClearingAll] = useState(false);

  const handleSearch = (
    searchKeyword = keyword,
    searchLocation = location,
    searchCompanyName = companyName,
  ) => {
    const params = new URLSearchParams();

    if (searchKeyword?.trim()) params.append("keyword", searchKeyword.trim());
    if (searchLocation?.trim())
      params.append("location", searchLocation.trim());
    if (searchCompanyName?.trim())
      params.append("companyName", searchCompanyName.trim());

    navigate(`/jobs?${params.toString()}`);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    loadRecentSearches();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (keyword.trim().length > 1) {
        try {
          const res = await getSearchSuggestions(keyword.trim());
          setSuggestions(res.data || []);
        } catch (err) {
          console.error("Failed to load suggestions", err);
          setSuggestions([]);
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
    handleSearch(value, location, companyName);
  };

  const loadRecentSearches = async () => {
    try {
      setLoadingRecent(true);
      const data = await getRecentSearches(4);
      setRecentSearches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load recent searches", err);
      setRecentSearches([]);
    } finally {
      setLoadingRecent(false);
    }
  };

  const handleKeywordFocus = () => {
    setIsFocused(true);
  };

  const parseFilters = (filtersJson) => {
    if (!filtersJson) return {};
    try {
      return typeof filtersJson === "string"
        ? JSON.parse(filtersJson)
        : filtersJson;
    } catch {
      return {};
    }
  };

  const handleRecentClick = (item) => {
    const filters = parseFilters(item.filtersJson);

    const recentKeyword = item.keyword || "";
    const recentLocation = filters.location || "";
    const recentCompanyName = filters.companyName || "";

    setKeyword(recentKeyword);
    setLocation(recentLocation);
    setCompanyName(recentCompanyName);
    setSuggestions([]);

    handleSearch(recentKeyword, recentLocation, recentCompanyName);
  };

  const handleDeleteRecent = async (e, id) => {
    e.stopPropagation();

    try {
      setDeletingId(id);
      await deleteSearchHistory(id);
      setRecentSearches((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete recent search", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAllRecent = async () => {
    try {
      setClearingAll(true);
      await clearAllSearchHistory();
      setRecentSearches([]);
    } catch (err) {
      console.error("Failed to clear all recent searches", err);
    } finally {
      setClearingAll(false);
    }
  };

  const renderRecentSubtitle = (item) => {
    const filters = parseFilters(item.filtersJson);
    const parts = [];

    if (filters.location) parts.push(filters.location);
    if (filters.companyName) parts.push(filters.companyName);

    return parts.join(" • ");
  };

  const showSuggestions =
    isFocused && keyword.trim().length > 1 && suggestions.length > 0;

  return (
    <div className="w-full px-4 py-12 bg-linear-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* HEADING */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          Find Your <span className="text-blue-600">Dream Job</span>
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2">
          Search jobs by skills, location, and company
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full max-w-6xl mx-auto z-50">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            flex flex-col md:flex-row items-center gap-2 p-2 
            bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
            rounded-2xl md:rounded-full border transition-all duration-300 shadow-md
            ${
              isFocused
                ? "border-blue-500 shadow-xl scale-[1.01]"
                : "border-slate-200 dark:border-slate-700"
            }
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
                  onFocus={handleKeywordFocus}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400"
                />
              </div>
            </div>

            {/* Suggestions only */}
            <AnimatePresence>
              {showSuggestions && (
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
                      className="w-full px-5 py-3 text-sm text-left text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition"
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
            onClick={() => handleSearch()}
            className="w-full md:w-auto px-8 h-14 bg-linear-to-r from-blue-600 to-blue-700 
            text-white rounded-full flex items-center justify-center gap-2 
            transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Search size={18} />
            <span className="text-sm font-semibold">Search</span>
          </button>
        </motion.div>

        {/* RECENT SEARCHES BOTTOM LINE */}
        <div className="mt-4 flex flex-col gap-3 max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <History className="w-4 h-4 text-blue-500" />
              Recent Searches
              {loadingRecent ? (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Loading recent searches...
                </div>
              ) : recentSearches.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleRecentClick(item)}
                      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 shadow-sm hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      <span className="max-w-45 truncate">
                        {item.keyword || "Search"}
                      </span>

                      {renderRecentSubtitle(item) && (
                        <span className="hidden md:inline text-xs text-slate-400 max-w-45 truncate">
                          • {renderRecentSubtitle(item)}
                        </span>
                      )}

                      <span
                        onClick={(e) => handleDeleteRecent(e, item.id)}
                        className="inline-flex items-center justify-center rounded-full p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-slate-800"
                        role="button"
                        tabIndex={0}
                      >
                        <X className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  No recent searches yet.
                </div>
              )}
            </div>
            {recentSearches.length > 0 && (
              <button
                onClick={handleClearAllRecent}
                disabled={clearingAll}
                className="text-xs font-medium text-red-500 hover:text-red-600 disabled:opacity-50"
              >
                {clearingAll ? "Clearing..." : "Clear All"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearchBar;
