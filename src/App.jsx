import NavBar from './components/NavBar'
import Footer from './components/Footer';
import "./index.css";
import { Routes,Route } from "react-router-dom"
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './auth/Login';
import Register from './auth/Register';
import Companies from './pages/Companies';
import JobCard from './components/jobs/JobCards';
import Profile from './pages/Profile';
import Career from './pages/Career';

function App() {
  return (
    <>
    <div><NavBar/></div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:type" element={<Jobs />} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Career" element={<Career/>}/>     
      <Route path="/Companies" element={<Companies/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/JobCard" element={<JobCard/>}/>
       
    </Routes>     
      <div><Footer/></div>
    </>
  )
}

export default App
