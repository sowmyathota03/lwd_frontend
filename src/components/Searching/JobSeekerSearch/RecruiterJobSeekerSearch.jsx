import { useState, useEffect } from "react";
import { searchJobSeekers } from "../../../api/JobSeekerApi";
import { useSearchParams } from "react-router-dom";
import JobSeekerResults from "./JobSeekerResults";

import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Globe,
  DollarSign,
  Clock,
  Calendar,
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
    minExpectedCTC: searchParams.get("minExpectedCTC") || "",
    maxExpectedCTC: searchParams.get("maxExpectedCTC") || "",
    noticeStatus: searchParams.get("noticeStatus") || "",
    maxNoticePeriod: searchParams.get("maxNoticePeriod") || "",
    immediateJoiner: searchParams.get("immediateJoiner") || "",
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
        preferredLocation: updatedFilters.preferredLocation || "",
        minExperience: updatedFilters.minExperience || "",
        maxExperience: updatedFilters.maxExperience || "",
        minExpectedCTC: updatedFilters.minExpectedCTC || "",
        maxExpectedCTC: updatedFilters.maxExpectedCTC || "",
        noticeStatus: updatedFilters.noticeStatus || "",
        maxNoticePeriod: updatedFilters.maxNoticePeriod || "",
        immediateJoiner: updatedFilters.immediateJoiner || "",
        page: updatedFilters.page || 0,
      });

      const requestBody = {
        keyword: updatedFilters.keyword || null,
        skills: updatedFilters.skills
          ? updatedFilters.skills.split(",").map((s) => s.trim())
          : [],
        currentLocation: updatedFilters.currentLocation || null,
        preferredLocation: updatedFilters.preferredLocation || null,
        minExperience: updatedFilters.minExperience
          ? Number(updatedFilters.minExperience)
          : null,
        maxExperience: updatedFilters.maxExperience
          ? Number(updatedFilters.maxExperience)
          : null,
        minExpectedCTC: updatedFilters.minExpectedCTC
          ? Number(updatedFilters.minExpectedCTC)
          : null,
        maxExpectedCTC: updatedFilters.maxExpectedCTC
          ? Number(updatedFilters.maxExpectedCTC)
          : null,
        noticeStatus:
          updatedFilters.noticeStatus === ""
            ? null
            : updatedFilters.noticeStatus,
        maxNoticePeriod: updatedFilters.maxNoticePeriod
          ? Number(updatedFilters.maxNoticePeriod)
          : null,
        immediateJoiner:
          updatedFilters.immediateJoiner === ""
            ? null
            : updatedFilters.immediateJoiner === "true",
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
      preferredLocation: searchParams.get("preferredLocation") || "",
      minExperience: searchParams.get("minExperience") || "",
      maxExperience: searchParams.get("maxExperience") || "",
      minExpectedCTC: searchParams.get("minExpectedCTC") || "",
      maxExpectedCTC: searchParams.get("maxExpectedCTC") || "",
      noticeStatus: searchParams.get("noticeStatus") || "",
      maxNoticePeriod: searchParams.get("maxNoticePeriod") || "",
      immediateJoiner: searchParams.get("immediateJoiner") || "",
      page: Number(searchParams.get("page")) || 0,
      size: 10,
    };

    setFilters(urlFilters);

    if (
      urlFilters.keyword ||
      urlFilters.skills ||
      urlFilters.currentLocation ||
      urlFilters.preferredLocation ||
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="lwd-container py-8">

        {/* Header */}
        <div className="lwd-page-header">
          <h1 className="lwd-page-title">
            <Search className="h-8 w-8 text-blue-600" />
            Candidate Search
          </h1>
          <p className="lwd-page-subtitle">
            Find the perfect candidates
          </p>
        </div>

        <div className="lwd-grid">

          {/* Sidebar */}
          <div className="lwd-sidebar-layout">
            <div className="lwd-filter-card">

              <div className="lwd-filter-header bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
                <Filter className="h-5 w-5 text-blue-600" />
                Filters
              </div>

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
                      placeholder="Java"
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
                  <label className="lwd-label">Current Location</label>
                  <div className="lwd-input-group">
                    <MapPin className="lwd-input-icon" />
                    <input
                      name="currentLocation"
                      value={filters.currentLocation}
                      onChange={handleChange}
                      className="lwd-input-with-icon"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="lwd-label">Experience</label>
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

              <div className="lwd-filter-footer">
                <button
                  onClick={() => handleSearch({ ...filters, page: 0 })}
                  className="lwd-btn-primary lwd-btn-full"
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