import Loader from "../../common/Loader";
import { Link } from "react-router-dom";
import { User, MapPin, Briefcase, DollarSign, Calendar } from "lucide-react";

function JobSeekerResults({ results, loading, pagination, handlePageChange }) {
  return (
    <div className="lwd-section">

      {/* ===== Loading ===== */}
      {loading && (
        <div className="lwd-card text-center py-8">
          <Loader />
          <p className="lwd-text mt-2">Loading candidates...</p>
        </div>
      )}

      {/* ===== Empty State ===== */}
      {!loading && results.length === 0 && (
        <div className="lwd-card text-center py-12">
          <User className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <h3 className="lwd-title">No candidates found</h3>
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
            className="lwd-card lwd-card-hover"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

              {/* ===== Candidate Info ===== */}
              <div className="flex-1 min-w-0">

                <div className="flex gap-3">

                  {/* Avatar */}
                  <div className="lwd-avatar">
                    {js.fullName?.charAt(0).toUpperCase() || "?"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="lwd-title truncate">
                      {js.fullName}
                    </h3>

                    <p className="lwd-text flex items-center gap-1 truncate">
                      <Briefcase className="lwd-icon-sm" />
                      {js.currentCompany || "Not specified"}
                      <span className="mx-1">•</span>
                      <MapPin className="lwd-icon-sm" />
                      {js.currentLocation || "Location not specified"}
                    </p>
                  </div>
                </div>

                {/* ===== Details ===== */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">

                  <div className="lwd-flex-gap lwd-text">
                    <Briefcase className="lwd-icon" />
                    <span>{js.totalExperience || 0} yrs exp.</span>
                  </div>

                  <div className="lwd-flex-gap lwd-text">
                    <DollarSign className="lwd-icon" />
                    <span>₹{js.expectedCTC || 0} LPA</span>
                  </div>

                  <div className="lwd-flex-gap lwd-text">
                    <Calendar className="lwd-icon" />
                    <span>{js.noticePeriod || "-"} days</span>
                  </div>

                </div>

                {/* ===== Skills ===== */}
                {js.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {js.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="lwd-badge lwd-badge-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ===== Action ===== */}
              <Link
                to={`/profile/${js.userId}`}
                className="lwd-btn-primary-sm self-start sm:self-center whitespace-nowrap"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}

      {/* ===== Pagination ===== */}
      {pagination && pagination.totalPages > 1 && (
        <div className="lwd-card flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="lwd-text">
            Page {pagination.pageNumber + 1} of {pagination.totalPages}
          </div>

          <div className="flex gap-2">
            <button
              disabled={pagination.pageNumber === 0}
              onClick={() => handlePageChange(pagination.pageNumber - 1)}
              className="lwd-pagination"
            >
              Previous
            </button>

            <button
              disabled={pagination.last}
              onClick={() => handlePageChange(pagination.pageNumber + 1)}
              className="lwd-pagination"
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