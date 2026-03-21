import ManagePlanFeatures from "./ManagePlanFeatures";

const FEATURE_CODES = [
  "APPLY_JOB",
  "JOB_POST",
  "SEARCH_CANDIDATE",
  "VIEW_CONTACT",
  "MESSAGE_CANDIDATE",
  "PROFILE_BOOST",
  "ANALYTICS_ACCESS",
];

function AdminPlanPage({ selectedPlanId }) {
  return (
    <div>
      <h1>Manage Plan Features</h1>
      <ManagePlanFeatures
        planId={selectedPlanId}
        featureCodes={FEATURE_CODES}
      />
    </div>
  );
}
 