import { useEffect, useState } from "react";
import { searchCompanies } from "../../api/CompanyApi";
import Loader from "../common/Loader";

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
    <div className="lwd-page p-4 space-y-4">

      {/* 🔍 Search Bar */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search company..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="lwd-input"
        />

        <button
          onClick={loadCompanies}
          className="lwd-btn-primary"
        >
          Search
        </button>
      </div>

      {/* ⏳ Loader */}
      {loading && <Loader />}

      {/* ❌ No Data */}
      {!loading && companies.length === 0 && (
        <p className="lwd-text text-center">No companies found</p>
      )}

      {/* 🏢 Company List */}
      <div className="space-y-3">
        {companies.map((company) => (
          <div
            key={company.id}
            className="lwd-card p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="lwd-title">
                {company.companyName}
              </h3>

              <p className="lwd-text">
                {company.location}
              </p>
            </div>

            {showRequestButton && (
              <button
                onClick={() => onRequestCompany(company.id)}
                disabled={loadingCompanyId === company.id}
                className="lwd-btn-secondary text-sm disabled:opacity-50"
              >
                {loadingCompanyId === company.id
                  ? "Sending..."
                  : "Request Access"}
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default SearchCompanies;