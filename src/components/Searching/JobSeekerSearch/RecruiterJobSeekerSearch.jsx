// RecruiterJobSeekerSearch.jsx
import { useState, useEffect } from "react";
import { searchJobSeekers } from "../../../api/JobSeekerApi";
import { useSearchParams } from "react-router-dom";
import JobSeekerResults from "./JobSeekerResults";

// Heroicons v2 outline
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
} from "lucide-react"; // Using lucide-react (commonly used) – you can replace with Heroicons if preferred

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

  /* =========================
     Handle Input Change
  ========================= */

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     Search API Call
  ========================= */

  const handleSearch = async (updatedFilters = filters) => {
    try {
      setLoading(true);

      /* Update URL Params */
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

      /* Request Body */
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

  /* =========================
     Load From URL Params
  ========================= */

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

  /* =========================
     Pagination
  ========================= */

  const handlePageChange = (newPage) => {
    const updated = {
      ...filters,
      page: newPage,
    };
    handleSearch(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="h-8 w-8 text-blue-600" />
            Candidate Search
          </h1>
          <p className="text-gray-500 mt-1">
            Find the perfect candidates for your job openings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* =========================
              FILTER PANEL (Left Sidebar)
          ========================= */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-24 overflow-hidden">
              {/* Filter Header */}
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-5 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-blue-600" />
                  Filters
                </h2>
              </div>

              {/* Scrollable Filter Fields */}
              <div className="p-5 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                {/* Keyword */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Keyword
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="keyword"
                      placeholder="e.g., Java, Manager"
                      value={filters.keyword}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Skills
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="skills"
                      placeholder="React, Node.js"
                      value={filters.skills}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Current Location */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Current Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="currentLocation"
                      placeholder="City, Country"
                      value={filters.currentLocation}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Preferred Location */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Preferred Location
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="preferredLocation"
                      placeholder="Preferred city"
                      value={filters.preferredLocation}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Experience Range */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Experience (years)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="minExperience"
                        placeholder="Min"
                        value={filters.minExperience}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="maxExperience"
                        placeholder="Max"
                        value={filters.maxExperience}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* CTC Range */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Expected CTC (LPA)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="minExpectedCTC"
                        placeholder="Min"
                        value={filters.minExpectedCTC}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="maxExpectedCTC"
                        placeholder="Max"
                        value={filters.maxExpectedCTC}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Notice Status */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Notice Status
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      name="noticeStatus"
                      value={filters.noticeStatus}
                      onChange={handleChange}
                      className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm appearance-none bg-white"
                    >
                      <option value="">All</option>
                      <option value="IMMEDIATE_JOINER">Immediate Joiner</option>
                      <option value="OPEN_TO_WORK">Open To Work</option>
                      <option value="SERVING_NOTICE">Serving Notice</option>
                      <option value="NOT_SERVING">Not Serving</option>
                      <option value="NOT_LOOKING">Not Looking</option>
                    </select>
                  </div>
                </div>

                {/* Max Notice Period */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Max Notice Period (days)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      name="maxNoticePeriod"
                      placeholder="e.g., 30"
                      value={filters.maxNoticePeriod}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Immediate Joiner */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Immediate Joiner
                  </label>
                  <div className="relative">
                    <select
                      name="immediateJoiner"
                      value={filters.immediateJoiner}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm appearance-none bg-white"
                    >
                      <option value="">All</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sticky Search Button */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => handleSearch({ ...filters, page: 0 })}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Apply Filters
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* =========================
              RESULTS SECTION (Right)
          ========================= */}
          <div className="lg:col-span-8 xl:col-span-9">
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