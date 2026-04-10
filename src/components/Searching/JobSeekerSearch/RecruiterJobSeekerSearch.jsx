import { useState, useEffect } from "react";
import { searchJobSeekers } from "../../../api/JobSeekerApi";
import { useSearchParams } from "react-router-dom";
import JobSeekerResults from "./JobSeekerResults";
import JobSeekerSearch from "./JobSeekerSearch";

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

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (updatedFilters = filters) => {
    try {
      setLoading(true);

      setSearchParams({
        keyword: updatedFilters.keyword || "",
        skills: updatedFilters.skills || "",
        currentLocation: updatedFilters.currentLocation || "",
        minExperience: updatedFilters.minExperience || "",
        maxExperience: updatedFilters.maxExperience || "",
        page: updatedFilters.page || 0,
      });

      const requestBody = {
        keyword: updatedFilters.keyword || null,
        skills: updatedFilters.skills
          ? updatedFilters.skills.split(",").map((s) => s.trim())
          : [],
        currentLocation: updatedFilters.currentLocation || null,
        minExperience: updatedFilters.minExperience
          ? Number(updatedFilters.minExperience)
          : null,
        maxExperience: updatedFilters.maxExperience
          ? Number(updatedFilters.maxExperience)
          : null,
        page: updatedFilters.page,
        size: updatedFilters.size,
      };

      const response = await searchJobSeekers(requestBody);
      setResults(response.data.content);
      console.log("Search results:", response.data);
      setPagination(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlFilters = {
      keyword: searchParams.get("keyword") || "",
      skills: searchParams.get("skills") || "",
      currentLocation: searchParams.get("currentLocation") || "",
      minExperience: searchParams.get("minExperience") || "",
      maxExperience: searchParams.get("maxExperience") || "",
      page: Number(searchParams.get("page")) || 0,
      size: 10,
    };

    setFilters(urlFilters);

    if (
      urlFilters.keyword ||
      urlFilters.skills ||
      urlFilters.currentLocation ||
      urlFilters.minExperience ||
      urlFilters.maxExperience ||
      urlFilters.page !== 0
    ) {
      handleSearch(urlFilters);
    }
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    const updated = { ...filters, page: newPage };
    handleSearch(updated);
  };

  return (
    <div className="lwd-page-bg min-h-screen">
      <div className="lwd-container py-6">
        {/* Header */}
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
          {/* Sidebar Filters */}
          <div className="lwd-sidebar-layout">
            <div className="lwd-card sticky top-6">
              {/* Filter Header */}
              <div className="lwd-filter-header flex items-center gap-2 border-b border-gray-200 pb-3 dark:border-gray-700">
                <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-gray-800 dark:text-white">
                  Filters
                </span>
              </div>

              {/* Filter Body */}
              <div className="lwd-filter-body space-y-4">
                {/* Keyword */}
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

                {/* Skills */}
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

                {/* Location */}
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

                {/* Experience */}
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

              {/* Footer */}
              <div className="lwd-filter-footer mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleSearch({ ...filters, page: 0 })}
                  className="lwd-btn-primary w-full flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Searching...
                    </>
                  ) : (
                    "Apply Filters"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
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