import { useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  Plus,
  TrendingUp,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axiosInstance from "../utils/axiosinstance.js";
import { API_PATHS } from "../utils/apiPaths.js";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import LoadingSpinner from "../../components/layout/LoadingSpinner.jsx";
import JobDashboardCard from "../../components/cards/JobDashboardCard.jsx";
import ApplicantDashboardCard from "../../components/cards/ApplicantDashboardCard.jsx";


// 🔥 Glass Card
const Card = ({
  className = "",
  children,
  title,
  subtitle,
  headerAction,
}) => {
  return (
    <div
      className={`bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.08)] hover:shadow-[0_0_35px_rgba(0,0,0,0.12)] transition-all duration-300 ${className}`}
    >
      {(title || headerAction) && (
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-800">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      <div className={title ? "px-6 pb-6" : "p-6"}>
        {children}
      </div>
    </div>
  );
};


// 🔥 Stat Card
const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {value}
          </p>

          {trend && (
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};


const EmployerDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardOverView = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.DASHBOARD.OVERVIEW
      );

      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Dashboard Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardOverView();
  }, []);

  const recentJobs = dashboardData?.data?.recentJobs || [];
  const recentApplications =
    dashboardData?.data?.recentApplications || [];

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto space-y-8 p-4">

            {/* 🔥 Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Active Jobs"
                value={dashboardData?.counts?.totalActiveJobs || 0}
                icon={Briefcase}
                trend
                trendValue={`${dashboardData?.counts?.trends?.activeJobs || 0}%`}
              />

              <StatCard
                title="Total Applicants"
                value={dashboardData?.counts?.totalApplicants || 0}
                icon={Users}
                trend
                trendValue={`${dashboardData?.counts?.trends?.totalApplicants || 0}%`}
                color="green"
              />

              <StatCard
                title="Shortlisted"
                value={dashboardData?.counts?.shortlisted || 0}
                icon={CheckCircle2}
                trend
                trendValue={`${dashboardData?.counts?.trends?.totalHired || 0}%`}
                color="purple"
              />
            </div>

            {/* 🔥 Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

              {/* Jobs */}
              <Card
                className="w-full h-full"
                title="Recent Activity"
                subtitle="Latest updates from your jobs"
                headerAction={
                  <button
                    className="text-blue-600 text-sm font-medium hover:text-blue-700 transition"
                    onClick={() => navigate("/manage-jobs")}
                  >
                    View All
                  </button>
                }
              >
                <div className="space-y-4 divide-y">
                  {recentJobs.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No recent jobs found
                    </p>
                  ) : (
                    recentJobs.slice(0, 3).map((job) => (
                      <div key={job._id} className="pt-4 first:pt-0">
                        <JobDashboardCard job={job} />
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Applications */}
              <Card
                className="w-full h-full"
                title="Recent Applications"
                subtitle="Latest candidate applications"
                headerAction={
                  <button
                    className="text-blue-600 text-sm font-medium hover:text-blue-700 transition"
                    onClick={() => navigate("/manage-jobs")}
                  >
                    View All
                  </button>
                }
              >
                <div className="space-y-4 divide-y">
                  {recentApplications.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No applications yet
                    </p>
                  ) : (
                    recentApplications
                      .slice(0, 3)
                      .map((data, index) => (
                        <div key={index} className="pt-4 first:pt-0">
                          <ApplicantDashboardCard
                            applicant={data?.applicant}
                            position={data?.job?.title}
                            time={moment(data?.updatedAt).fromNow()}
                          />
                        </div>
                      ))
                  )}
                </div>
              </Card>
            </div>

            {/* 🔥 Quick Actions (FULL WIDTH) */}
            <Card
              title="Quick Actions"
              subtitle="Common tasks to get you started"
            >
              <div className="grid pt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {[
                  {
                    title: "Post New Job",
                    icon: Plus,
                    color: "bg-blue-100 text-blue-700",
                    path: "/post-job",
                  },
                  {
                    title: "Review Applications",
                    icon: Users,
                    color: "bg-green-100 text-green-700",
                    path: "/manage-jobs",
                  },
                  {
                    title: "Company Settings",
                    icon: Building2,
                    color: "bg-orange-100 text-orange-700",
                    path: "/company-profile",
                  },
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="flex items-center justify-between p-5 rounded-xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-[0_0_15px_rgba(0,0,0,0.08)] hover:shadow-[0_0_25px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${action.color}`}>
                        <action.icon className="w-5 h-5" />
                      </div>

                      <span className="text-sm font-medium text-gray-800">
                        {action.title}
                      </span>
                    </div>

                    <span className="text-gray-400">→</span>
                  </button>
                ))}

              </div>
            </Card>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;