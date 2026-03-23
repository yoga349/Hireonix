import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate ,
} from "react-router-dom";
import {Toaster} from "react-hot-toast"
import LandingPage from "./pages/LandingPage/LandingPage";
import JobSeekerDashboard from "./pages/JobSeeker/JobSeekerDashboard";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import JobDetails from "./pages/JobSeeker/JobDetails";
import SavedJob from "./pages/JobSeeker/SavedJob";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import ManageJobs from "./pages/Employer/ManageJobs";
import ApplicationViewer from "./pages/Employer/ApplicationViewer";
import JobPostingForm from "./pages/Employer/JobPostingForm";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage";
import UserProfile from "./pages/JobSeeker/UserProfile";
import ProtectedRoute from "./routes/ProtectedRoute";


const App = () =>{
  return (
    <div>
      <Router>
        <Routes>
          {/* routes for Users */}
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/sign-up" element={<SignUp/>}/> 
          <Route path="/login" element={<Login/>}/>
          <Route path="/find-jobs" element={<JobSeekerDashboard/>}/>
          <Route path="/job/:jobId" element={<JobDetails/>}/> 
          <Route path="/saved-jobs" element={<SavedJob/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          
          {/* Manager routes */}
          <Route element={<ProtectedRoute required="employer"/>}>
          <Route path="/employer-dashboard" element={<EmployerDashboard/>}/>
          <Route path="/post-job" element={<JobPostingForm/>}/>
          <Route path="/manage-jobs" element={<ManageJobs/>}/>
          <Route path="/applicants" element={<ApplicationViewer/>}/>
          <Route path="/User-profile" element={<EmployerProfilePage/>}/>
          </Route> 


          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Router>

      <Toaster
      toastOptions={{
        className:"",
        style:{
          fontSize:"13px",
        },
      }}
      />
    </div>
  )
}

export default App