import { Link } from "react-router-dom";

function RecruiterOnboardingPage() {
  return (
    <div className="lwd-page p-6">
      <div className="lwd-container space-y-6">
        <div className="lwd-card">
          <h1 className="lwd-page-title">Recruiter Onboarding</h1>
          <p className="lwd-text mt-2">
            Your recruiter account is approved, but you must join a company
            before accessing the recruiter dashboard and posting jobs.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="lwd-card">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Step 1
            </h2>
            <p className="lwd-text mt-2">
              Search for your company in the platform.
            </p>
          </div>

          <div className="lwd-card">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Step 2
            </h2>
            <p className="lwd-text mt-2">
              Send a recruiter access request to the company.
            </p>
          </div>

          <div className="lwd-card">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Step 3
            </h2>
            <p className="lwd-text mt-2">
              After admin or company admin approval, you can post jobs.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/recruiter/companies"
            className="lwd-btn-primary text-center"
          >
            Search Companies
          </Link>

          <Link
            to="/recruiter/company-requests"
            className="lwd-btn-secondary text-center"
          >
            My Company Requests
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecruiterOnboardingPage;