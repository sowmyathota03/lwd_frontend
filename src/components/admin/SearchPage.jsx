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

  /* ================= DEBOUNCE SEARCH ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(keyword);
      setPage(0);
    }, 1000);

    return () => clearTimeout(timer);
  }, [keyword]);

  /* ================= FETCH SUGGESTIONS ================= */

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

  
  
  /* ================= CLOSE SUGGESTIONS OUTSIDE CLICK ================= */

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

  /* ================= INPUT CHANGE ================= */

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setSelectedIndex(-1);
  };

  /* ================= INSTANT SEARCH ================= */

  const handleSearch = () => {
    setSearchKeyword(keyword);
    setShowSuggestions(false);
    setPage(0);
  };

  /* ================= KEYBOARD NAVIGATION ================= */

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
      return;
    }

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

      if (selectedIndex >= 0) {
        const selected = suggestions[selectedIndex].label;
        setKeyword(selected);
        setSearchKeyword(selected);
      } else {
        setSearchKeyword(keyword);
      }
      
      setShowSuggestions(false);
      setPage(0);
    }
  };
  
  /* ================= CLICK SUGGESTION ================= */
  
  const handleSuggestionClick = (text) => {
    setKeyword(text);
    setSearchKeyword(text);
    setShowSuggestions(false);
    setPage(0);
  };

  /* ================= GLOBAL SEARCH ================= */

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["globalSearch", activeTab, searchKeyword || "all", page],
    queryFn: () =>
      globalSearch(
        searchKeyword?.trim() || "",
        activeTab.toLowerCase(),
        page,
        pageSize
      ),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });


  useEffect(() => {
    setPage(0);
  }, [activeTab]);
  
  const results = data?.[activeTab.toLowerCase()] ?? [];
  const totalPages = data?.totalPages ?? 1;
  
  /* ================= PAGINATION ================= */

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ================= RESULTS ================= */

  const renderResults = () => {
    if (results.length === 0) {
      return (
        <p className="text-gray-500 mt-4 text-center">
          No results found
        </p>
      );
    }

    return (
      <div className="mt-4 flex flex-col">
        {results.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b px-2 py-2 text-sm hover:bg-gray-50"
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

  /* ================= PAGINATION UI ================= */

/* ================= PAGINATION UI ================= */

const renderPagination = () => {

  if (!totalPages || totalPages < 2) return null;

  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

      {/* Previous */}
      <button
        disabled={page === 0}
        onClick={() => handlePageChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`px-3 py-1 border rounded ${
            page === p
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          {p + 1}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={page === totalPages - 1}
        onClick={() => handlePageChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
      >
        Next
      </button>

    </div>
  );
};



  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* SEARCH BAR */}

      <div className="flex gap-2 mb-6" ref={searchRef}>

        <div className="relative flex-1">

          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => keyword && setShowSuggestions(true)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full bg-white border rounded-lg shadow mt-1 z-50 max-h-60 overflow-auto">

              {suggestions.map((s, i) => (
                <div
                  key={s.id}
                  onClick={() => handleSuggestionClick(s.label)}
                  className={`px-4 py-2 cursor-pointer flex justify-between ${
                    i === selectedIndex
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>{s.label}</span>

                  <span className="text-xs text-gray-400 capitalize">
                    {s.type}
                  </span>
                </div>
              ))}

            </div>
          )}

        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>

      </div>

      {/* TABS */}

      <div className="flex gap-4 border-b pb-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`pb-1 ${
              activeTab === cat
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RESULTS */}

      {isLoading && <p className="text-center">Loading...</p>}

      {isError && (
        <p className="text-red-600 text-center">
          {error?.message || "Error loading data"}
        </p>
      )}

      {!isLoading && !isError && renderResults()}
      {!isLoading && !isError && renderPagination()}


    </div>
  );
};

export default SearchPage;
