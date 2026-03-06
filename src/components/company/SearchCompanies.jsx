import { useEffect, useState } from "react";
import { searchCompanies } from "../../api/CompanyApi";

function SearchCompanies({
  showRequestButton = false,
  onRequestCompany,
  loadingCompanyId
}) {

  const [keyword, setKeyword] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCompanies = async () => {
    try {
      setLoading(true);

      const data = await searchCompanies(keyword, 0, 10);

      setCompanies(data.content || []);

    } catch (error) {
      console.error("Error fetching companies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <div className="space-y-4">

      {/* Search Bar */}
      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Search company..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={loadCompanies}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>

      </div>

      {loading && (
        <p className="text-gray-500">Loading companies...</p>
      )}

      {/* Company List */}
      <div className="">

        {companies.map((company) => (
          <div
            key={company.id}
            className="flex bg-gray-100 justify-between items-center p-3 gap-2 m-2 rounded"
          >

            <div>
              <h3 className="font-semibold">
                {company.companyName}
              </h3>

              <p className="text-sm text-gray-600">
                {company.location}
              </p>
            </div>

            {showRequestButton && (
              <button
                onClick={() => onRequestCompany(company.id)}
                disabled={loadingCompanyId === company.id}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
              >
                {loadingCompanyId === company.id
                  ? "Sending..."
                  : "Request for Access dashboard"}
              </button>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default SearchCompanies;
