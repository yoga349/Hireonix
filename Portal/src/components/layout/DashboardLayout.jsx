import { useState, useEffect } from "react";
import {
  Building2,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAVIGATION_MENU } from "../../pages/utils/data";
import ProfileDropdown from "./ProfileDropdown";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user,logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveItem] = useState(
    activeMenu || "employer-dashboard"
  );
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (itemId) => {
    setActiveItem(itemId);
    navigate(`/${itemId}`);
    if (isMobile) setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarCollapsed = false;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition duration-300 ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        } ${sidebarCollapsed ? "w-16" : "w-64"} 
        bg-white border-r border-gray-200 shadow-sm`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 h-16 border-b px-6">
          <Link className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                HireOnix
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <div className="mt-4">
          {NAVIGATION_MENU.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all ${
                  activeNavItem === item.id
                    ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </div>
            );
          })}
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : "ml-64"
        }`}
      >
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-4 border-b bg-white">
          {isMobile && (
            <button onClick={toggleSidebar}>
              {sidebarOpen ? <X /> : <Menu />}
            </button>
          )}

          <div>
            <h1 className="font-semibold text-lg">Welcome back!</h1>
            <p className="text-sm text-gray-500">
              See the status of your job.
            </p>
          </div>

     {/* Profile dropdown */}
        <ProfileDropdown
        isOpen={profileDropdownOpen}
        onToggle={(e)=>{
          e.stopPropagation();
          setProfileDropdownOpen(!profileDropdownOpen);
        }}
        avatar={user?.avatar||""}
        companyName={user?.name||""}
        email={user?.email||""}
        onLogout={logout}/>
        </header>

        

        {/* Main content area */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;