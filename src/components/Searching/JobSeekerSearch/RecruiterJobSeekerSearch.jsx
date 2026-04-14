import { useState, useEffect, useCallback, useRef } from "react";
import { searchJobSeekers } from "../../../api/JobSeekerApi";
import { getRecentCandidateSearches, deleteSearchHistory } from "../../../api/searchHistoryApi";
import { useSearchParams } from "react-router-dom";
import JobSeekerResults from "./JobSeekerResults";
import { Search, History } from "lucide-react";

function RecruiterJobSeekerSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    keyword: searchParams.get("keyword") || "",
    skills: searchParams.get("skills") || "",
    currentLocation: searchParams.get("currentLocation") || "",
    preferredLocation: searchParams.get("preferredLocation") || "",
    minExperience: searchParams.get("minExperience") || "",
    maxExperience: searchParams.get("maxExperience") || "",
    page: Number(searchParams.get("page")) || 0,
    size: 10,
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  const [recentSearches, setRecentSearches] = useState([]);
  const [recentLoading, setRecentLoading] = useState(false);

  const lastRequestKeyRef = useRef("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buildRequestBody = useCallback((activeFilters) => {
    return {
      keyword: activeFilters.keyword?.trim() || null,
      skills: activeFilters.skills
        ? activeFilters.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      currentLocation: activeFilters.currentLocation?.trim() || null,
      preferredLocation: activeFilters.preferredLocation?.trim() || null,
      minExperience:
        activeFilters.minExperience !== ""
          ? Number(activeFilters.minExperience)
          : null,
      maxExperience:
        activeFilters.maxExperience !== ""
          ? Number(activeFilters.maxExperience)
          : null,
      page: activeFilters.page ?? 0,
      size: activeFilters.size ?? 10,
    };
  }, []);

  const fetchResults = useCallback(
    async (activeFilters) => {
      const requestBody = buildRequestBody(activeFilters);
      const requestKey = JSON.stringify(requestBody);

      if (lastRequestKeyRef.current === requestKey) {
        return;
      }

      lastRequestKeyRef.current = requestKey;

      try {
        setLoading(true);
        const response = await searchJobSeekers(requestBody);
        setResults(response?.data?.content || []);
        setPagination(response?.data || null);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    },
    [buildRequestBody],
  );

  const fetchRecentSearches = useCallback(async () => {
    try {
      setRecentLoading(true);

      const response = await getRecentCandidateSearches(5);

      const recentData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setRecentSearches(recentData);
    } catch (error) {
      console.error("Failed to fetch recent candidate searches:", error);
      setRecentSearches([]);
    } finally {
      setRecentLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentSearches();
  }, [fetchRecentSearches]);

  useEffect(() => {
    const urlFilters = {
      keyword: searchParams.get("keyword") || "",
      skills: searchParams.get("skills") || "",
      currentLocation: searchParams.get("currentLocation") || "",
      preferredLocation: searchParams.get("preferredLocation") || "",
      minExperience: searchParams.get("minExperience") || "",
      maxExperience: searchParams.get("maxExperience") || "",
      page: Number(searchParams.get("page")) || 0,
      size: 10,
    };

    setFilters(urlFilters);

    const hasAnyFilter =
      urlFilters.keyword ||
      urlFilters.skills ||
      urlFilters.currentLocation ||
      urlFilters.preferredLocation ||
      urlFilters.minExperience ||
      urlFilters.maxExperience ||
      urlFilters.page !== 0;

    if (hasAnyFilter) {
      fetchResults(urlFilters);
    } else {
      setResults([]);
      setPagination(null);
      lastRequestKeyRef.current = "";
    }
  }, [searchParams, fetchResults]);

  const updateSearchParams = (updatedFilters) => {
    const params = {};

    if (updatedFilters.keyword?.trim()) {
      params.keyword = updatedFilters.keyword.trim();
    }
    if (updatedFilters.skills?.trim()) {
      params.skills = updatedFilters.skills.trim();
    }
    if (updatedFilters.currentLocation?.trim()) {
      params.currentLocation = updatedFilters.currentLocation.trim();
    }
    if (updatedFilters.preferredLocation?.trim()) {
      params.preferredLocation = updatedFilters.preferredLocation.trim();
    }
    if (updatedFilters.minExperience !== "") {
      params.minExperience = updatedFilters.minExperience;
    }
    if (updatedFilters.maxExperience !== "") {
      params.maxExperience = updatedFilters.maxExperience;
    }
    if ((updatedFilters.page ?? 0) > 0) {
      params.page = String(updatedFilters.page);
    }

    setSearchParams(params);
  };

  const handleSearch = () => {
    const updatedFilters = {
      ...filters,
      page: 0,
    };

    updateSearchParams(updatedFilters);
  };

  const handlePageChange = (newPage) => {
    updateSearchParams({
      ...filters,
      page: newPage,
    });
  };

  const handleClearFilters = () => {
    lastRequestKeyRef.current = "";
    setFilters({
      keyword: "",
      skills: "",
      currentLocation: "",
      preferredLocation: "",
      minExperience: "",
      maxExperience: "",
      page: 0,
      size: 10,
    });
    setSearchParams({});
    setResults([]);
    setPagination(null);
  };

  const parseFiltersJson = (filtersJson) => {
    if (!filtersJson) return {};

    try {
      return typeof filtersJson === "string"
        ? JSON.parse(filtersJson)
        : filtersJson;
    } catch (error) {
      console.error("Invalid filtersJson:", error);
      return {};
    }
  };

  const handleRecentSearchClick = (item) => {
    const parsedFilters = parseFiltersJson(item.filtersJson);

    const updatedFilters = {
      keyword: item.keyword || "",
      skills: Array.isArray(parsedFilters.skills)
        ? parsedFilters.skills.join(", ")
        : parsedFilters.skills || "",
      currentLocation: parsedFilters.currentLocation || "",
      preferredLocation: parsedFilters.preferredLocation || "",
      minExperience:
        parsedFilters.minExperience !== null &&
        parsedFilters.minExperience !== undefined
          ? String(parsedFilters.minExperience)
          : "",
      maxExperience:
        parsedFilters.maxExperience !== null &&
        parsedFilters.maxExperience !== undefined
          ? String(parsedFilters.maxExperience)
          : "",
      page: 0,
      size: 10,
    };

    setFilters(updatedFilters);
    lastRequestKeyRef.current = "";
    updateSearchParams(updatedFilters);
  };

  const renderRecentSearchLabel = (item) => {
    const parsedFilters = parseFiltersJson(item.filtersJson);
    const parts = [];

    if (item.keyword) parts.push(item.keyword);

    if (Array.isArray(parsedFilters.skills) && parsedFilters.skills.length) {
      parts.push(parsedFilters.skills.join(", "));
    }

    if (parsedFilters.currentLocation) {
      parts.push(parsedFilters.currentLocation);
    }

    return parts.length ? parts.join(" • ") : "Recent search";
  };

  return (
    <div className="lwd-page-bg min-h-screen">
      <div className="lwd-container py-6">
        <div className="lwd-page-header mb-8">
          <h1 className="lwd-page-title flex items-center gap-2">
            <Search className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            Candidate Search
          </h1>
          <p className="lwd-page-subtitle mt-1">
            Find the perfect candidates easily
          </p>
        </div>

        <div className="space-y-6">
          {/* 🔥 TOP FILTER BAR */}
          <div className="lwd-card p-4">
            {/* Row 1 */}
            <div className="lwd-card p-4 space-y-4">
              {/* 🔥 FLEX FILTER BAR */}
              <div className="flex flex-wrap items-center gap-3">
                {/* 🔍 Keyword (BIG) */}
                <input
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleChange}
                  className="lwd-input flex-2 min-w-55"
                  placeholder="🔍 Keyword (Java Developer)"
                />

                {/* 🛠 Skills */}
                <input
                  name="skills"
                  value={filters.skills}
                  onChange={handleChange}
                  className="lwd-input flex-2 min-w-55"
                  placeholder="Skills"
                />

                {/* 📍 Location */}
                <input
                  name="preferredLocation"
                  value={filters.preferredLocation}
                  onChange={handleChange}
                  className="lwd-input flex-1 min-w-55"
                  placeholder="Preferred Location"
                />

                {/* 💼 Experience */}
                <input
                  name="minExperience"
                  value={filters.minExperience}
                  onChange={handleChange}
                  className="lwd-input w-22.5"
                  placeholder="Min Exp"
                />

                <input
                  name="maxExperience"
                  value={filters.maxExperience}
                  onChange={handleChange}
                  className="lwd-input w-22.5"
                  placeholder="Max Exp"
                />

                {/* 💰 CTC */}
                <input
                  name="minExpectedCTC"
                  value={filters.minExpectedCTC}
                  onChange={handleChange}
                  className="lwd-input w-27.5"
                  placeholder="Min CTC"
                />

                <input
                  name="maxExpectedCTC"
                  value={filters.maxExpectedCTC}
                  onChange={handleChange}
                  className="lwd-input w-27.5"
                  placeholder="Max CTC"
                />

                {/* 📄 Notice */}
                <select
                  name="noticeStatus"
                  value={filters.noticeStatus || ""}
                  onChange={handleChange}
                  className="lwd-input w-40"
                >
                  <option value="">Notice</option>
                  <option value="IMMEDIATE">Immediate</option>
                  <option value="SERVING_NOTICE">Serving</option>
                  <option value="NOT_SERVING">Not Serving</option>
                </select>

                {/* ⚡ Immediate */}
                <select
                  name="immediateJoiner"
                  value={filters.immediateJoiner ?? ""}
                  onChange={handleChange}
                  className="lwd-input w-37.5"
                >
                  <option value="">Immediate</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                {/* 📅 Available */}
                <input
                  type="date"
                  name="availableBefore"
                  value={filters.availableBefore || ""}
                  onChange={handleChange}
                  className="lwd-input w-42.5"
                />

                {/* 🔽 Sort */}
                <select
                  name="sortBy"
                  value={filters.sortBy || "totalExperience"}
                  onChange={handleChange}
                  className="lwd-input w-40"
                >
                  <option value="totalExperience">Experience</option>
                  <option value="expectedCTC">CTC</option>
                  <option value="createdAt">Newest</option>
                </select>

                {/* 🔽 Direction */}
                <select
                  name="sortDirection"
                  value={filters.sortDirection || "DESC"}
                  onChange={handleChange}
                  className="lwd-input w-40"
                >
                  <option value="DESC">Desc</option>
                  <option value="ASC">Asc</option>
                </select>

                {/* 🔥 Buttons */}
                <button
                  onClick={handleSearch}
                  className="lwd-btn-primary px-5"
                  disabled={loading}
                >
                  {loading ? "..." : "Search"}
                </button>

                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 border rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* 🔥 Recent Searches */}
            <div className="flex mt-4">
              <div className="flex items-center gap-2 mb-2">
                <History className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recent Searches
                </span>
              </div>

              {recentLoading ? (
                <p className="text-sm text-gray-500">Loading...</p>
              ) : recentSearches.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleRecentSearchClick(item)}
                      className="px-3 py-1.5 rounded-full text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:bg-slate-700 transition"
                    >
                      {renderRecentSearchLabel(item)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No recent searches</p>
              )}
            </div>
          </div>

          {/* 🔥 RESULTS */}
          <JobSeekerResults
            results={results}
            loading={loading}
            pagination={pagination}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default RecruiterJobSeekerSearch;
