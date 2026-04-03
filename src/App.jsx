import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import PrivateRoute from "./routes/PrivateRoute";

import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import AuthSelection from "./auth/AuthSelection";
import RegisterJobSeeker from "./auth/RegisterJobSeeker";
import RegisterRecruiter from "./auth/RegisterRecruiter";
import ChangePassword from "./auth/ChangePassword";

import Home from "./pages/public/Home";
import Jobs from "./pages/public/Jobs";
import JobDetails from "./pages/public/JobDetails";
import Companies from "./pages/public/Companies";
import Career from "./pages/public/Career";
import RecommendedJobs from "./pages/public/RecommendedJobs";

import Profile from "./pages/profile/Profile";

import ResumeUpload from "./components/jobs/ResumeUpload";
import JobAlert from "./components/jobs/JobAlert";
import CareerAdvice from "./components/jobs/CareerAdvice";
import ApplyJob from "./components/jobs/ApplyJob";
import Suggestions from "./components/jobs/Suggestions";
import SavedJobs from "./components/jobs/SavedJobs";
import JobList from "./components/jobs/JobList";

import MyApplications from "./components/profile/MyApplication/MyApplications";

import Education from "./components/profile/jobseekersProfile/Education";
import Internship from "./components/profile/jobseekersProfile/Internship";
import Project from "./components/profile/jobseekersProfile/Project";

import AddStatus from "./pages/profile/components/AddStatus";
import VerifyEmail from "./pages/profile/components/VerifyEmail";

import ContactUs from "./components/company/ContactUs";
import AboutUs from "./components/company/AboutUs";
import PrivacyPolicy from "./components/company/PrivacyPolicy";
import TermsAndConditions from "./components/company/TermsAndConditions";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./components/admin/AdminHome";
import UserManagementPage from "./components/admin/UserManagementPage";
import CompanyManagementPage from "./components/admin/CompanyManagementPage";
import SearchPage from "./components/admin/SearchPage";

import ManageJobSearch from "./components/jobs/ManageJobSearch";
import CreateJob from "./components/jobs/CreateJob";
import EditJob from "./components/jobs/EditJob";
import JobAnalytics from "./components/jobs/JobAnalytics";

import JobApplicationList from "./components/jobApplications/JobApplicationList";

import RecruiterAdminDashboard from "./pages/recruiter-admin/RecruiterAdminDashboard";
import RecruiterAdminHome from "./components/recruiter-admin/RecruiterAdminHome";
import RecruiterList from "./components/recruiter-admin/RecruiterList";
import CompanyProfilePage from "./components/recruiter-admin/CompanyProfilePage";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterHome from "./components/recruiter/RecruiterHome";
import RecruiterCompanyRequest from "./components/recruiter/RecruiterCompanyRequest";

import RecruiterJobSeekerSearch from "./components/Searching/JobSeekerSearch/RecruiterJobSeekerSearch";
import ToggleDarkMode from "./components/settings/common/ToggleDarkMode";
import Settings from "./components/settings/Settings";

import AdminPlansPage from "./pages/admin/AdminPlansPage";
import AdminPlanFeaturesPage from "./pages/admin/AdminPlanFeaturesPage";
import AdminManageFeatures from "./pages/admin/ManagePricingFeaturesPage";

import RecruiterPlans from "./pages/pricing/RecruiterPlans";
import CandidatePlans from "./pages/pricing/CandidatePlans";

import MessagingPage from "./pages/messaging/MessagingPage";
import NotificationPage from "./pages/notifications/NotificationPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Unauthorized() {
  return (
    <div className="lwd-page flex min-h-[60vh] items-center justify-center px-4">
      <div className="lwd-card max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Unauthorized</h1>
        <p className="text-slate-600 dark:text-slate-300">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <NavBar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AuthSelection />} />
        <Route path="/register/jobseeker" element={<RegisterJobSeeker />} />
        <Route path="/register/recruiter" element={<RegisterRecruiter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:type" element={<Jobs />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* LOGGED-IN USERS */}
        <Route
          element={
            <PrivateRoute
              allowedRoles={[
                "JOB_SEEKER",
                "RECRUITER",
                "RECRUITER_ADMIN",
                "ADMIN",
              ]}
            />
          }
        >
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile key={location.pathname} />} />
          <Route
            path="/profile/:userId"
            element={<Profile key={location.pathname} />}
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/toggle-button" element={<ToggleDarkMode />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Route>

        {/* JOB SEEKER ROUTES */}
        <Route element={<PrivateRoute allowedRoles={["JOB_SEEKER"]} />}>
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/recommended" element={<RecommendedJobs />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/job-alert" element={<JobAlert />} />
          <Route path="/career-advice" element={<CareerAdvice />} />
          <Route path="/my/applications" element={<MyApplications />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/jobs-list" element={<JobList />} />
          <Route path="/education" element={<Education />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/project" element={<Project />} />
          <Route path="/status" element={<AddStatus />} />
          <Route path="/plans/candidate" element={<CandidatePlans />} />
          <Route path="/messaging" element={<MessagingPage />} />
          <Route path="/messaging/:username" element={<MessagingPage />} />
        </Route>

        {/* RECRUITER + RECRUITER ADMIN */}
        <Route
          element={<PrivateRoute allowedRoles={["RECRUITER", "RECRUITER_ADMIN"]} />}
        >
          <Route path="/jobs/updatejob/:id" element={<EditJob />} />
          <Route path="/managejob/updatejob/:id" element={<EditJob />} />
          <Route path="/plans/recruiter" element={<RecruiterPlans />} />
        </Route>

        {/* ADMIN */}
        <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="companies" element={<CompanyManagementPage />} />
            <Route path="managejob" element={<ManageJobSearch />} />
            <Route path="managejob/:jobId/analytics" element={<JobAnalytics />} />
            <Route path="applications" element={<JobApplicationList />} />
            <Route path="job-seekers" element={<RecruiterJobSeekerSearch />} />
            <Route path="pricing" element={<AdminPlansPage />} />
            <Route path="plans/features" element={<AdminManageFeatures />} />
            <Route
              path="plans/:planId/features"
              element={<AdminPlanFeaturesPage />}
            />
          </Route>
        </Route>

        {/* RECRUITER ADMIN */}
        <Route element={<PrivateRoute allowedRoles={["RECRUITER_ADMIN"]} />}>
          <Route path="/recruiter-admin" element={<RecruiterAdminDashboard />}>
            <Route index element={<RecruiterAdminHome />} />
            <Route path="company-profile" element={<CompanyProfilePage />} />
            <Route path="manage-recruiter" element={<RecruiterList />} />
            <Route path="managejob" element={<ManageJobSearch />} />
            <Route path="managejob/:jobId/analytics" element={<JobAnalytics />} />
            <Route path="createjob" element={<CreateJob />} />
            <Route path="applications" element={<JobApplicationList />} />
            <Route path="job-seekers" element={<RecruiterJobSeekerSearch />} />
            <Route path="messaging" element={<MessagingPage />} />
            <Route path="messaging/:username" element={<MessagingPage />} />
          </Route>
        </Route>

        {/* RECRUITER */}
        <Route element={<PrivateRoute allowedRoles={["RECRUITER"]} />}>
          <Route path="/recruiter" element={<RecruiterDashboard />}>
            <Route index element={<RecruiterHome />} />
            <Route path="company-profile" element={<CompanyProfilePage />} />
            <Route path="managejob" element={<ManageJobSearch />} />
            <Route path="managejob/:jobId/analytics" element={<JobAnalytics />} />
            <Route path="createjob" element={<CreateJob />} />
            <Route path="applications" element={<JobApplicationList />} />
            <Route path="job-seekers" element={<RecruiterJobSeekerSearch />} />
            <Route path="company-request" element={<RecruiterCompanyRequest />} />
            <Route path="messaging" element={<MessagingPage />} />
            <Route path="messaging/:username" element={<MessagingPage />} />
          </Route>
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;