import { useState, useEffect } from "react";
import { searchJobSeekers } from "../../../api/JobSeekerApi";
import { useSearchParams } from "react-router-dom";
import JobSeekerResults from "./JobSeekerResults";

import {
  Search,
  Filter,
  MapPin,
  Tag,
} from "lucide-react";

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
    <div className="lwd-page-bg">
      <div className="lwd-container">

        {/* Header */}
        <div className="lwd-page-header">
          <h1 className="lwd-page-title">
            <Search className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            Candidate Search
          </h1>
          <p className="lwd-page-subtitle">
            Find the perfect candidates easily
          </p>
        </div>

        <div className="lwd-grid">

          {/* Sidebar Filters */}
          <div className="lwd-sidebar-layout">
            <div className="lwd-card">

              {/* Filter Header */}
              <div className="lwd-filter-header">
                <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Filters
              </div>

              {/* Filter Body */}
              <div className="lwd-filter-body lwd-scrollbar">

                {/* Keyword */}
                <div>
                  <label className="lwd-label">Keyword</label>
                  <div className="lwd-input-group">
                    <Search className="lwd-input-icon" />
                    <input
                      name="keyword"
                      value={filters.keyword}
                      onChange={handleChange}
                      className="lwd-input-with-icon"
                      placeholder="Java Developer"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="lwd-label">Skills</label>
                  <div className="lwd-input-group">
                    <Tag className="lwd-input-icon" />
                    <input
                      name="skills"
                      value={filters.skills}
                      onChange={handleChange}
                      className="lwd-input-with-icon"
                      placeholder="React, Node"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="lwd-label">Location</label>
                  <div className="lwd-input-group">
                    <MapPin className="lwd-input-icon" />
                    <input
                      name="currentLocation"
                      value={filters.currentLocation}
                      onChange={handleChange}
                      className="lwd-input-with-icon"
                      placeholder="Hyderabad"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="lwd-label">Experience (Years)</label>
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
              <div className="lwd-filter-footer">
                <button
                  onClick={() => handleSearch({ ...filters, page: 0 })}
                  className="lwd-btn-primary w-full"
                >
                  {loading ? "Searching..." : "Apply Filters"}
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