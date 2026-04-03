import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { globalSearch, getSearchSuggestions } from "../../api/searchApi";

const categories = ["Jobs", "Companies", "Candidates", "Recruiters", "Skills"];
const pageSize = 20;

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("Jobs");
  const [page, setPage] = useState(0);

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(keyword);
      setPage(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!keyword.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const data = await getSearchSuggestions(keyword);
        setSuggestions(data || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuggestions();
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSearch = () => {
    setSearchKeyword(keyword);
    setShowSuggestions(false);
    setPage(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") return setShowSuggestions(false);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const selected =
        selectedIndex >= 0
          ? suggestions[selectedIndex].label
          : keyword;

      setKeyword(selected);
      setSearchKeyword(selected);
      setShowSuggestions(false);
      setPage(0);
    }
  };

  const handleSuggestionClick = (text) => {
    setKeyword(text);
    setSearchKeyword(text);
    setShowSuggestions(false);
    setPage(0);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["globalSearch", activeTab, searchKeyword || "all", page],
    queryFn: () =>
      globalSearch(
        searchKeyword?.trim() || "",
        activeTab.toLowerCase(),
        page,
        pageSize
      ),
  });

  useEffect(() => {
    setPage(0);
  }, [activeTab]);

  const results = data?.[activeTab.toLowerCase()] ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderResults = () => {
    if (results.length === 0) {
      return (
        <p className="lwd-text text-center mt-4">
          No results found
        </p>
      );
    }

    return (
      <div className="mt-4 flex flex-col">
        {results.map((item) => (
          <div
            key={item.id}
            className="lwd-table-row px-3 py-2 flex justify-between text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {activeTab === "Jobs" && (
              <>
                <span className="w-1/4 font-medium">{item.title}</span>
                <span className="w-1/4">{item.companyName}</span>
                <span className="w-1/4">{item.location}</span>
                <span className="w-1/4">{item.jobType}</span>
              </>
            )}

            {activeTab === "Companies" && (
              <>
                <span className="w-1/3 font-medium">{item.companyName}</span>
                <span className="w-1/3">{item.location}</span>
                <span className="w-1/3">{item.industry}</span>
              </>
            )}

            {(activeTab === "Candidates" ||
              activeTab === "Recruiters") && (
                <>
                  <span className="w-1/4 font-medium">{item.name}</span>
                  <span className="w-1/4">{item.email}</span>
                  <span className="w-1/4">{item.phone}</span>
                  <span className="w-1/4">{item.companyName || "-"}</span>
                </>
              )}

            {activeTab === "Skills" && (
              <span className="font-medium">{item.name}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderPagination = () => {
    if (!totalPages || totalPages < 2) return null;

    return (
      <div className="flex justify-center gap-2 mt-6 flex-wrap">

        <button
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
          className="lwd-btn-secondary disabled:opacity-40"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-1 rounded ${page === p
                ? "lwd-btn-primary"
                : "lwd-card"
              }`}
          >
            {p + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages - 1}
          onClick={() => handlePageChange(page + 1)}
          className="lwd-btn-primary disabled:opacity-40"
        >
          Next
        </button>

      </div>
    );
  };

  return (
    <div className="lwd-page max-w-6xl mx-auto p-6">

      {/* SEARCH */}
      <div className="flex gap-2 mb-6" ref={searchRef}>

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="lwd-input"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full lwd-card mt-1 z-50 max-h-60 overflow-auto">

              {suggestions.map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => handleSuggestionClick(s.label)}
                  className={`px-4 py-2 cursor-pointer flex justify-between ${i === selectedIndex
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  <span>{s.label}</span>
                  <span className="text-xs opacity-60 capitalize">
                    {s.type}
                  </span>
                </div>
              ))}

            </div>
          )}
        </div>

        <button onClick={handleSearch} className="lwd-btn-primary">
          Search
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b pb-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`pb-1 ${activeTab === cat
                ? "text-blue-600 border-b-2 border-blue-600"
                : "lwd-text"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RESULTS */}
      {isLoading && <p className="text-center lwd-text">Loading...</p>}

      {isError && (
        <p className="text-red-500 text-center">
          {error?.message || "Error"}
        </p>
      )}

      {!isLoading && !isError && renderResults()}
      {!isLoading && !isError && renderPagination()}

    </div>
  );
};

export default SearchPage; 