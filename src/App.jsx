import NavBar from './components/common/NavBar'
import Footer from './components/common/Footer';
import "./index.css";
import { Routes,Route } from "react-router-dom"

import Login from './auth/Login';
import AuthSelection from './auth/AuthSelection';
import RegisterJobSeeker from './auth/RegisterJobSeeker';
import RegisterRecruiter from './auth/RegisterRecruiter';

import Home from './pages/public/Home';
import Jobs from './pages/public/Jobs';
import JobDetails from "./pages/public/JobDetails";
import Companies from './pages/public/Companies';
import Profile from './components/common/Profile';
import Career from './pages/public/Career';

import JobCard from './components/jobs/JobCards';
import JobSearchBlock from './components/jobs/JobSearchBlock';
import ResumeUpload from './components/jobs/ResumeUpload';
import JobAlert from './components/jobs/JobAlert';
import CareerAdvice from './components/jobs/CareerAdvice';
import ApplyJob from './components/jobs/ApplyJob';
import Suggestions from './components/jobs/Suggestions';

import SearchResumes from './components/employee/SearchResumes';
import PostJob from './components/employee/PostJob';

import ContactUs from './components/company/ContactUs';
import AboutUs from './components/company/AboutUs';
import PrivacyPolicy from './components/company/PrivacyPolicy';
import TermsAndConditions from './components/company/TermsAndConditions';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './components/admin/AdminHome';
import UserManagementPage from './components/admin/UserManagementPage';
import CompanyManagementPage from './components/admin/CompanyManagementPage';
import ManageJobs from './components/jobs/ManageJobs';
import CreateJob from './components/jobs/CreateJob';
import EditJob from './components/jobs/EditJob';
import JobApplicationList from './components/jobApplications/JobApplicationList';

import RecruiterAdminDashboard from './pages/recruiter-admin/RecruiterAdminDashboard';
import RecruiterAdminHome from './components/recruiter-admin/RecruiterAdminHome';
import CompanyProfilePage from './components/recruiter-admin/CompanyProfilePage';
import RecruiterList from './components/recruiter-admin/RecruiterList';

import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterHome from './components/recruiter/RecruiterHome';

import JobSeekerProfile from './components/jobSeeker/JobSeekerProfile';





function App() {
  return (
    <>
    <div><NavBar/></div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<AuthSelection />} />
      <Route path="/register/jobseeker" element={<RegisterJobSeeker />} />
      <Route path="/register/recruiter" element={<RegisterRecruiter />} />
      <Route path="/login" element={<Login />} />

      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:type" element={<Jobs />} />
      <Route path="/job/:jobId" element={<JobDetails />} />
      <Route path="/apply/:jobId" element={<ApplyJob />} />
      <Route path="/JobCard" element={<JobCard/>}/>
      <Route path="/JobSearchBlock" element={<JobSearchBlock/>}/>

      <Route path="/Companies" element={<Companies/>}/>

      <Route path="/Career" element={<Career/>}/>     
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/profile/:userId" element={<Profile/>}/>
      <Route path="/jobseeker/profile" element={<JobSeekerProfile/>}/>
      <Route path="/ResumeUpload" element={<ResumeUpload/>}/>
      <Route path="/JobAlert" element={<JobAlert/>}/>
      <Route path="/CareerAdvice" element={<CareerAdvice/>}/>
      <Route path="/SearchResumes" element={<SearchResumes/>}/>
      <Route path="/ContactUs" element={<ContactUs/>}/>
      <Route path="/AboutUs" element={<AboutUs/>}/>
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
      <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
      <Route path="/Suggestions" element={<Suggestions/>}/>
      
      <Route path="/postJob" element={<PostJob/>}/>
      <Route path="/jobs/updatejob/:id" element={<EditJob />} />

      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="companies" element={<CompanyManagementPage />} />
        <Route path=":companyId/createjob" element={<CreateJob />}  />
        <Route path="managejob" element={<ManageJobs />} />
        <Route path="applications" element={<JobApplicationList />} />
      </Route>

      <Route path="/recruiter-admin" element={<RecruiterAdminDashboard />} >
        <Route index element={ <RecruiterAdminHome /> } />
        <Route path="/recruiter-admin/company-profile" element={<CompanyProfilePage />} />
        <Route path="/recruiter-admin/manage-recruiter" element={<RecruiterList />} />
        <Route path="/recruiter-admin/managejob" element={<ManageJobs />} />
        <Route path="/recruiter-admin/createjob" element={<CreateJob />}  />
        <Route path="/recruiter-admin/applications" element={<JobApplicationList />} />
      </Route>


      <Route path="/recruiter" element={<RecruiterDashboard />} >
        <Route index element={ <RecruiterHome /> } />
        <Route path="/recruiter/company-profile" element={<CompanyProfilePage />} />
        <Route path="/recruiter/managejob" element={<ManageJobs />} />
        <Route path="/recruiter/createjob" element={<CreateJob />}  />
        <Route path="/recruiter/applications" element={<JobApplicationList />} />
      </Route>
             
    </Routes>      
      <div><Footer/></div>
    </>
  )
}

export default App
