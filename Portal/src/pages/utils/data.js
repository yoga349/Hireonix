import { Briefcase, Building2,BriefcaseBusiness ,LayoutDashboard,ClipboardList , Plus } from "lucide-react";

// 🔐 User Roles
export const USER_ROLES = [
  { label: "Job Seeker", value: "jobseeker" },
  { label: "Employer", value: "employer" },
];

// 📄 Application Status
export const APPLICATION_STATUS = [
  { label: "Applied", value: "applied" },
  { label: "In Review", value: "in_review" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

// 🧭 Navigation Menu
export const NAVIGATION_MENU = [
  { id: "employer-dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "post-job", name: "Post Job", icon: Plus  },
  { id: "manage-jobs", name: "Manage Jobs", icon: BriefcaseBusiness  },
  { id: "company-profile", name: "Company Profile", icon: Building2 },
];

// 💼 Job Types
export const JOB_TYPES = [
  { label: "Full Time", value: "full-time" },
  { label: "Part Time", value: "part-time" },
  { label: "Internship", value: "internship" },
  { label: "Remote", value: "remote" },
];

// 📍 Locations
export const JOB_LOCATIONS = [
  "Pune",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Delhi",
];

// 📊 Dashboard Filters
export const DATE_FILTERS = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 3 Months", value: "3m" },
];

// 🎯 Sorting Options
export const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
];

// 🔍 Job Categories
export const JOB_CATEGORIES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "DevOps Engineer",
];