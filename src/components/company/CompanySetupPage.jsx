import CompanyProfile from "./CompanyProfilePage";

export default function CompanySetupPage() {
  return (
    <div className="lwd-page py-6">
      <div className="lwd-container max-w-6xl space-y-6">
        <div className="lwd-card border border-blue-200 dark:border-slate-700">
          <h1 className="lwd-title text-2xl">Set Up Your Company Profile</h1>
          <p className="lwd-text mt-2">
            Complete your company details to submit your profile for review.
            Once approved, you can start posting jobs and managing recruiters.
          </p>
        </div>

        <CompanyProfile forceCreateMode />
      </div>
    </div>
  );
}