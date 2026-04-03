// import { useEffect, useState } from "react";
// import {
//   Plus,
//   Briefcase,
//   Users,
//   Building2,
//   TrendingUp,
//   CheckCircle2,
// } from "lucide-react";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axiosinstance.js";
// import { API_PATHS } from "../utils/apiPaths.js";

// const EmployerDashboard = () => {
//   const navigate = useNavigate();

//   const [dashboardData, setDashboardData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const getDashboardOverView = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get(API_PATHS.DASHBOARD.OVERVIEW);

//       if (response.status === 200) {
//         setDashboardData(response.data);
//       }
//     } catch (error) {
//       console.log(error); // ✅ fixed
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getDashboardOverView();
//   }, []);

//   return (
//     <div>
//       {isLoading && <p>Loading...</p>}

//       {!isLoading && dashboardData && (
//         <div>
//           <h2>Dashboard Loaded ✅</h2>
//           <p>Total Jobs: {dashboardData?.totalJobs}</p>
//           <p>Total Applicants: {dashboardData?.totalApplications}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployerDashboard;

import React from 'react'

const EmployerDashboard = () => {
  return (
    <div>EmployerDashboard</div>
  )
}

export default EmployerDashboard