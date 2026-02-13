import NavBar from './components/NavBar'
import Footer from './components/Footer';
import "./index.css";
import { Routes,Route } from "react-router-dom"
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from "./pages/JobDetails";
import Login from './auth/Login';
import Register from './auth/Register';
import Companies from './pages/Companies';
import JobCard from './components/jobs/JobCards';
import Profile from './pages/Profile';
import Career from './pages/Career';
import JobSearchBlock from './components/jobs/JobSearchBlock';
import ResumeUpload from './components/jobs/ResumeUpload';
import JobAlert from './components/jobs/JobAlert';
import CareerAdvice from './components/jobs/CareerAdvice';
import EmployerLogin from './components/employee/EmployerLogin';
import SearchResumes from './components/employee/SearchResumes';
import PostJob from './components/employee/PostJob';
import ContactUs from './components/company/ContactUs';
import AboutUs from './components/company/AboutUs';
import PrivacyPolicy from './components/company/PrivacyPolicy';
import TermsAndConditions from './components/company/TermsAndConditions';
import ApplyJob from './components/jobs/ApplyJob';

function App() {
  return (
    <>
    <div><NavBar/></div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:type" element={<Jobs />} />
      <Route path="/job/:jobId" element={<JobDetails />} />
      <Route path="/apply/:jobId" element={<ApplyJob />} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Career" element={<Career/>}/>     
      <Route path="/Companies" element={<Companies/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/JobCard" element={<JobCard/>}/>
      <Route path="/JobSearchBlock" element={<JobSearchBlock/>}/>
      <Route path="/ResumeUpload" element={<ResumeUpload/>}/>
      <Route path="/JobAlert" element={<JobAlert/>}/>
      <Route path="/CareerAdvice" element={<CareerAdvice/>}/>
      <Route path="/EmployerLogin" element={<EmployerLogin/>}/>
      <Route path="/SearchResumes" element={<SearchResumes/>}/>
      <Route path="/PostJob" element={<PostJob/>}/>
      <Route path="/ContactUs" element={<ContactUs/>}/>
      <Route path="/AboutUs" element={<AboutUs/>}/>
      <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
       <Route path="/TermsAndConditions" element={<TermsAndConditions/>}/>
      
      
       
    </Routes>      
      <div><Footer/></div>
    </>
  )
}

export default App
