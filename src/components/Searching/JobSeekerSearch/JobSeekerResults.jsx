import Loader from "../../common/Loader";
import { Link } from "react-router-dom";
import { User, MapPin, Briefcase, IndianRupee, Calendar } from "lucide-react";

function JobSeekerResults({ results, loading, pagination, handlePageChange }) {
  // Helper to format experience
  const formatExperience = (exp) => {
    if (!exp && exp !== 0) return "Not specified";
    return `${exp} yr${exp !== 1 ? "s" : ""}`;
  };

  // Helper to format CTC
  const formatCTC = (ctc) => {
    if (!ctc && ctc !== 0) return "Not specified";
    // Convert from paisa to lakhs if needed (assuming stored in paisa)
    const lakhs = ctc / 100000;
    return `₹${lakhs.toFixed(1)} LPA`;
  };

  // Helper to format notice period
  const formatNoticePeriod = (days) => {
    if (!days && days !== 0) return "Not specified";
    return `${days} day${days !== 1 ? "s" : ""}`;
  };

  return (
    <div className="space-y-4">
      {/* ===== Loading ===== */}
      {loading && (
        <div className="lwd-card text-center py-12">
          <Loader />
          <p className="lwd-text mt-3">Loading candidates...</p>
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && results.length === 0 && (
        <div className="lwd-card text-center py-16">
          <User className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
          <h3 className="lwd-title mt-4 text-lg">No candidates found</h3>
          <p className="lwd-text mt-1">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      )}

      {/* ===== Results ===== */}
      {!loading &&
        results.map((js) => (
          <div
            key={js.id}
            className="lwd-card lwd-card-hover group transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              {/* Candidate Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="lwd-avatar flex-shrink-0">
                    {js.fullName?.charAt(0).toUpperCase() || "?"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="lwd-title text-lg font-semibold truncate">
                      {js.fullName}
                    </h3>
                    <p className="lwd-text flex items-center gap-1 flex-wrap">
                      <Briefcase className="lwd-icon-sm" />
                      {js.currentCompany || "Not specified"}
                      <span className="hidden sm:inline mx-1">•</span>
                      <MapPin className="lwd-icon-sm ml-0 sm:ml-0" />
                      {js.currentLocation || "Location not specified"}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="flex items-center gap-2 text-sm lwd-text">
                    <Briefcase className="lwd-icon h-4 w-4" />
                    <span>{formatExperience(js.totalExperience)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm lwd-text">
                    <IndianRupee  className="lwd-icon h-4 w-4" />
                    <span>{formatCTC(js.expectedCTC)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm lwd-text">
                    <Calendar className="lwd-icon h-4 w-4" />
                    <span>{formatNoticePeriod(js.noticePeriod)}</span>
                  </div>
                </div>

                {/* Skills */}
                {js.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {js.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="lwd-badge lwd-badge-primary rounded-full px-3 py-1 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <Link
                to={`/profile/${js.userId}`}
                className="lwd-btn-primary-sm self-start sm:self-center whitespace-nowrap flex items-center gap-1"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}

      {/* ===== Pagination ===== */}
      {pagination && pagination.totalPages > 1 && (
        <div className="lwd-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="lwd-text text-sm">
            Page {pagination.pageNumber + 1} of {pagination.totalPages}
          </div>
          <div className="flex gap-2">
            <button
              disabled={pagination.pageNumber === 0}
              onClick={() => handlePageChange(pagination.pageNumber - 1)}
              className="lwd-pagination px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled={pagination.last}
              onClick={() => handlePageChange(pagination.pageNumber + 1)}
              className="lwd-pagination px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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