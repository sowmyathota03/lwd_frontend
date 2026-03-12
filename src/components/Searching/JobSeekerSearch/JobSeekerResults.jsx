// JobSeekerResults.jsx (rename from CandidateResults if needed)
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";
import { User, MapPin, Briefcase, DollarSign, Calendar } from "lucide-react";

function JobSeekerResults({ results, loading, pagination, handlePageChange }) {
  return (
    <div className="space-y-4">
      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Loader />
          <p className="mt-2 text-sm text-gray-500">Loading candidates...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && results.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No candidates found</h3>
          <p className="text-sm text-gray-500 mt-1">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      )}

      {/* Results List */}
      {!loading &&
        results.map((js) => (
          <div
            key={js.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Candidate Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  {/* Avatar Placeholder */}
                  <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                    {js.fullName?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {js.fullName}
                    </h3>
                    <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {js.currentCompany || "Not specified"}
                      <span className="mx-1">•</span>
                      <MapPin className="h-3 w-3" />
                      {js.currentLocation || "Location not specified"}
                    </p>
                  </div>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span>{js.totalExperience || 0} yrs exp.</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>₹{js.expectedCTC || 0} LPA</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{js.noticePeriod || "-"} days</span>
                  </div>
                </div>

                {/* Skills */}
                {js.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {js.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* View Profile Button */}
              <Link
                to={`/profile/${js.userId}`}
                className="flex-none self-start sm:self-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition whitespace-nowrap"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">
            Page {pagination.pageNumber + 1} of {pagination.totalPages}
          </div>
          <div className="flex gap-2">
            <button
              disabled={pagination.pageNumber === 0}
              onClick={() => handlePageChange(pagination.pageNumber - 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              disabled={pagination.last}
              onClick={() => handlePageChange(pagination.pageNumber + 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobSeekerResults;