import { useState, useEffect, useCallback, useRef } from "react";
import { searchJobSeekers } from "../../../api/JobSeekerApi";
import { useSearchParams } from "react-router-dom";
import JobSeekerResults from "./JobSeekerResults";
import { Search, Filter, MapPin, Tag } from "lucide-react";

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

  const fetchResults = useCallback(async (activeFilters) => {
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
  }, [buildRequestBody]);

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

  const handleSearch = () => {
    const updatedFilters = {
      ...filters,
      page: 0,
    };

    const params = {};

    if (updatedFilters.keyword?.trim()) params.keyword = updatedFilters.keyword.trim();
    if (updatedFilters.skills?.trim()) params.skills = updatedFilters.skills.trim();
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
    if (updatedFilters.page > 0) {
      params.page = String(updatedFilters.page);
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    const params = {};

    if (filters.keyword?.trim()) params.keyword = filters.keyword.trim();
    if (filters.skills?.trim()) params.skills = filters.skills.trim();
    if (filters.currentLocation?.trim()) {
      params.currentLocation = filters.currentLocation.trim();
    }
    if (filters.preferredLocation?.trim()) {
      params.preferredLocation = filters.preferredLocation.trim();
    }
    if (filters.minExperience !== "") params.minExperience = filters.minExperience;
    if (filters.maxExperience !== "") params.maxExperience = filters.maxExperience;
    if (newPage > 0) params.page = String(newPage);

    setSearchParams(params);
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

        <div className="lwd-grid gap-6">
          <div className="lwd-sidebar-layout">
            <div className="lwd-card sticky top-6">
              <div className="lwd-filter-header flex items-center gap-2 border-b border-gray-200 pb-3 dark:border-gray-700">
                <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-gray-800 dark:text-white">
                  Filters
                </span>
              </div>

              <div className="lwd-filter-body space-y-4">
                <div>
                  <label className="lwd-label mb-1 block">Keyword</label>
                  <div className="lwd-input-group relative">
                    <Search className="lwd-input-icon absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      name="keyword"
                      value={filters.keyword}
                      onChange={handleChange}
                      className="lwd-input-with-icon pl-10"
                      placeholder="Java Developer"
                    />
                  </div>
                </div>

                <div>
                  <label className="lwd-label mb-1 block">Skills</label>
                  <div className="lwd-input-group relative">
                    <Tag className="lwd-input-icon absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      name="skills"
                      value={filters.skills}
                      onChange={handleChange}
                      className="lwd-input-with-icon pl-10"
                      placeholder="React, Node"
                    />
                  </div>
                </div>

                <div>
                  <label className="lwd-label mb-1 block">Location</label>
                  <div className="lwd-input-group relative">
                    <MapPin className="lwd-input-icon absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      name="currentLocation"
                      value={filters.currentLocation}
                      onChange={handleChange}
                      className="lwd-input-with-icon pl-10"
                      placeholder="Hyderabad"
                    />
                  </div>
                </div>

                <div>
                  <label className="lwd-label mb-1 block">
                    Experience (Years)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      name="minExperience"
                      value={filters.minExperience}
                      onChange={handleChange}
                      className="lwd-input"
                      placeholder="Min"
                    />
                    <input
                      name="maxExperience"
                      value={filters.maxExperience}
                      onChange={handleChange}
                      className="lwd-input"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              <div className="lwd-filter-footer mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <button
                  onClick={handleSearch}
                  className="lwd-btn-primary w-full flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Apply Filters"}
                </button>

                <button
                  onClick={handleClearFilters}
                  type="button"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                  disabled={loading}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          <div className="lwd-content-layout">
            <JobSeekerResults
              results={results}
              loading={loading}
              pagination={pagination}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterJobSeekerSearch;