import { Link } from "react-router-dom";

function CandidateResults({
  results,
  loading,
  pagination,
  handlePageChange,
}) {
  return (
    <div className="col-span-9 space-y-4">

      {results.length === 0 && !loading && (
        <div className="bg-white p-6 rounded border text-center text-gray-500">
          No candidates found.
        </div>
      )}

      {results.map((js) => (

        <div
          key={js.id}
          className="bg-white border rounded-lg p-6 hover:shadow transition"
        >

          {/* FIX HERE */}
          <div className="flex justify-between items-start">

            <div>

              <h3 className="text-lg font-semibold">
                {js.fullName}
              </h3>

              <p className="text-gray-500 text-sm">
                {js.currentCompany} • {js.currentLocation}
              </p>

              <p className="text-sm mt-2">
                {js.totalExperience} years experience
              </p>

              <p className="text-sm">
                Expected CTC: {js.expectedCTC} LPA
              </p>

              <div className="flex flex-wrap gap-2 mt-3">

                {js.skills?.map((skill, index) => (

                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            {/* FIXED BUTTON */}
            <Link
              to={`/profile/${js.userId}`}
              className="flex-none px-4 py-2 text-sm border border-blue-700 text-blue-700 rounded hover:bg-blue-50"
            >
              View Profile
            </Link>

          </div>

        </div>

      ))}

      {/* Pagination */}

      {pagination && (

        <div className="flex justify-between items-center mt-6 bg-white p-4 border rounded">

          <button
            disabled={pagination.pageNumber === 0}
            onClick={() => handlePageChange(pagination.pageNumber - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {pagination.pageNumber + 1} of {pagination.totalPages}
          </span>

          <button
            disabled={pagination.last}
            onClick={() => handlePageChange(pagination.pageNumber + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      )}

    </div>
  );
}

export default CandidateResults;
