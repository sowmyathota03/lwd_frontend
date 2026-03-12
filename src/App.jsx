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
import Career from "./pages/public/Career";

import Profile from "./pages/profile/JobSeekersProfile";
import RecruiterProfile from "./pages/profile/RecruiterProfile";

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

import Education from "./components/profile/jobseekersProfile/Education";
import Internship from "./components/profile/jobseekersProfile/Internship";
import Project from "./components/profile/jobseekersProfile/Project";

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
import SearchPage from "./components/admin/SearchPage";

import ManageJobs from "./components/jobs/ManageJobs";
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

function App() {
  return (
    <>
      <NavBar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:type" element={<Jobs />} />
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
      
        <Route path="/managejob/updatejob/:id" element={<EditJob />} />

        <Route path="/companies" element={<Companies />} />
        <Route path="/career" element={<Career />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />

      <Route path="/recruiter-admin" element={<RecruiterAdminDashboard />} >
        <Route index element={ <RecruiterAdminHome /> } />
        <Route path="/recruiter-admin/company-profile" element={<CompanyProfilePage />} />
        <Route path="/recruiter-admin/manage-recruiter" element={<RecruiterList />} />
        {/* <Route path="/recruiter-admin/managejob" element={<ManageJobs />} /> */}
        <Route path="/recruiter-admin/managejob" element={<ManageJobSearch />} />
        <Route path="/recruiter-admin/managejob/:jobId/analytics" element={<JobAnalytics />} />
        <Route path="/recruiter-admin/createjob" element={<CreateJob />}  />
        <Route path="/recruiter-admin/applications" element={<JobApplicationList />} />
        <Route path="/recruiter-admin/job-seekers" element={<RecruiterJobSeekerSearch />} />
      </Route>

        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/job-alert" element={<JobAlert />} />
        <Route path="/career-advice" element={<CareerAdvice />} />

        <Route path="/my/applications" element={<MyApplications />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/jobs-list" element={<JobList />} />

        <Route path="/education" element={<Education />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/project" element={<Project />} />


      <Route path="/recruiter" element={<RecruiterDashboard />} >
        <Route index element={ <RecruiterHome /> } />
        <Route path="/recruiter/company-profile" element={<CompanyProfilePage />} />
        {/* <Route path="/recruiter/managejob" element={<ManageJobs />} /> */}
        <Route path="/recruiter/managejob" element={<ManageJobSearch />} /> 
        <Route path="/recruiter/managejob/:jobId/analytics" element={<JobAnalytics />} /> 
        <Route path="/recruiter/createjob" element={<CreateJob />}  />
        <Route path="/recruiter/applications" element={<JobApplicationList />} />
        <Route path="/recruiter/job-seekers" element={<RecruiterJobSeekerSearch />} />
      </Route>

        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/status" element={<AddStatus />} />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/suggestions" element={<Suggestions />} />

        <Route path="/jobs/updatejob/:id" element={<EditJob />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="companies" element={<CompanyManagementPage />} />
          <Route path="managejob" element={<ManageJobSearch />} />
          <Route path="managejob/:jobId/analytics" element={<JobAnalytics />} />
          <Route path="applications" element={<JobApplicationList />} />
          <Route path="job-seekers" element={<RecruiterJobSeekerSearch />} />
        </Route>

        {/* RECRUITER ADMIN */}
        <Route path="/recruiter-admin" element={<RecruiterAdminDashboard />}>
          <Route index element={<RecruiterAdminHome />} />
          <Route path="company-profile" element={<CompanyProfilePage />} />
          <Route path="manage-recruiter" element={<RecruiterList />} />
          <Route path="managejob" element={<ManageJobs />} />
          <Route path="managejob/:jobId/analytics" element={<JobAnalytics />} />
          <Route path="createjob" element={<CreateJob />} />
          <Route path="applications" element={<JobApplicationList />} />
          <Route path="job-seekers" element={<RecruiterJobSeekerSearch />} />
        </Route>

        {/* RECRUITER */}
        <Route path="/recruiter" element={<RecruiterDashboard />}>
          <Route index element={<RecruiterHome />} />
          <Route path="company-profile" element={<CompanyProfilePage />} />
          <Route path="managejob" element={<ManageJobs />} />
          <Route path="managejob/:jobId/analytics" element={<JobAnalytics />} />
          <Route path="createjob" element={<CreateJob />} />
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