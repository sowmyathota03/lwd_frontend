import SearchCompanies from "../company/SearchCompanies";

function SearchCompaniesPage() {
  return (
    <div className="lwd-page p-6">
      <div className="lwd-container space-y-6">
        <div className="lwd-card">
          <h1 className="lwd-page-title">Search Companies</h1>
          <p className="lwd-text mt-2">
            Find your company and view its details before sending a request.
          </p>
        </div>

        <div className="lwd-card lwd-card-hover">
          <SearchCompanies showRequestButton={false} />
        </div>
      </div>
    </div>
  );
}

export default SearchCompaniesPage;