import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import "./index.css";

import { Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Home from "./pages/public/Home";
import Jobs from "./pages/public/Jobs";
import JobDetails from "./pages/public/JobDetails";
import Companies from "./pages/public/Companies";
import Profile from "./pages/profile/Profile";
import Career from "./pages/public/Career";

import JobCard from "./components/jobs/JobCards";
import JobSearchBlock from "./components/jobs/JobSearchBlock";
import ResumeUpload from "./components/jobs/ResumeUpload";
import JobAlert from "./components/jobs/JobAlert";
import CareerAdvice from "./components/jobs/CareerAdvice";
import ApplyJob from "./components/jobs/ApplyJob";
import Suggestions from "./components/jobs/Suggestions";
import SavedJobs from "./components/jobs/SavedJobs";
import JobList from "./components/jobs/JobList";

import MyApplications from "./components/profile/MyApplication/MyApplications";
import Education from "./components/profile/Education";
import Internship from "./components/profile/Internship";
import Project from "./components/profile/Project";
import Resume from "./components/profile/ResumeUpload";
import CareerObjective from "./components/profile/CareerObjective";

import AddStatus from "./pages/profile/components/AddStatus";
import VerifyEmail from "./pages/profile/components/VerifyEmail";

import ContactUs from "./components/company/ContactUs";
import AboutUs from "./components/company/AboutUs";
import PrivacyPolicy from "./components/company/PrivacyPolicy";
import TermsAndConditions from "./components/company/TermsAndConditions";
import Pricing from "./components/company/Pricing";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./components/admin/AdminHome";
import UserManagementPage from "./components/admin/UserManagementPage";
import CompanyManagementPage from "./components/admin/CompanyManagementPage";

import ManageJobs from "./components/jobs/ManageJobs";
import CreateJob from "./components/jobs/CreateJob";
import EditJob from "./components/jobs/EditJob";
import JobApplicationList from "./components/jobApplications/JobApplicationList";
import JobAnalytics from "./components/jobs/JobAnalytics";

import RecruiterAdminDashboard from "./pages/recruiter-admin/RecruiterAdminDashboard";
import RecruiterAdminHome from "./components/recruiter-admin/RecruiterAdminHome";
import CompanyProfilePage from "./components/recruiter-admin/CompanyProfilePage";
import RecruiterList from "./components/recruiter-admin/RecruiterList";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterHome from "./components/recruiter/RecruiterHome";
import RecruiterJobSeekerSearch from "./components/Searching/JobSeekerSearch/RecruiterJobSeekerSearch";
import RecruiterCompanyRequest from "./components/recruiter/RecruiterCompanyRequest";

function App() {
  return (
    <>
      <NavBar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/jobs/:jobId/apply" element={<ApplyJob />} />

        <Route path="/companies" element={<Companies />} />
        <Route path="/career" element={<Career />} />

        <Route path="/jobcard" element={<JobCard />} />
        <Route path="/jobsearch" element={<JobSearchBlock />} />
        <Route path="/jobs-list" element={<JobList />} />

        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/my/applications" element={<MyApplications />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />

        <Route path="/education" element={<Education />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/project" element={<Project />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/career-objective" element={<CareerObjective />} />

        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/job-alert" element={<JobAlert />} />
        <Route path="/career-advice" element={<CareerAdvice />} />

        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/status" element={<AddStatus />} />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/suggestions" element={<Suggestions />} />

        <Route path="/jobs/:jobId/edit" element={<EditJob />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="companies" element={<CompanyManagementPage />} />
          <Route path="companies/:companyId/profile" element={<CompanyProfilePage />} />

          <Route path="jobs/manage" element={<ManageJobs />} />
          <Route path="jobs/create/:companyId" element={<CreateJob />} />
          <Route path="jobs/:jobId/analytics" element={<JobAnalytics />} />

          <Route path="applications" element={<JobApplicationList />} />
          <Route path="job-seekers" element={<RecruiterJobSeekerSearch />} />
        </Route>

        {/* RECRUITER ADMIN */}
        <Route path="/recruiter-admin" element={<RecruiterAdminDashboard />}>
          <Route index element={<RecruiterAdminHome />} />
          <Route path="company-profile" element={<CompanyProfilePage />} />
          <Route path="recruiters/manage" element={<RecruiterList />} />

          <Route path="jobs/manage" element={<ManageJobs />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="jobs/:jobId/analytics" element={<JobAnalytics />} />

          <Route path="applications" element={<JobApplicationList />} />
          <Route path="job-seekers" element={<RecruiterJobSeekerSearch />} />
        </Route>

        {/* RECRUITER */}
        <Route path="/recruiter" element={<RecruiterDashboard />}>
          <Route index element={<RecruiterHome />} />
          <Route path="company-profile" element={<CompanyProfilePage />} />

          <Route path="jobs/manage" element={<ManageJobs />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="jobs/:jobId/analytics" element={<JobAnalytics />} />

          <Route path="applications" element={<JobApplicationList />} />
          <Route path="job-seekers" element={<RecruiterJobSeekerSearch />} />
          <Route path="company-request" element={<RecruiterCompanyRequest />} />
        </Route>

      </Routes>

      <Footer />
    </>
  );
}

export default App;