import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = true;
  const user = { fullName: "Monish", role: "employer" };
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-extrabold cursor-pointer tracking-wide"
      >
        Hireonix 🚀
      </h1>

      {/* Navigation */}
      <nav className="flex gap-8 text-lg font-medium">
        <button
          onClick={() => navigate("/find-jobs")}
          className="hover:text-yellow-300 transition duration-300"
        >
          Find Jobs
        </button>

        <button
          onClick={() =>
            navigate(
              isAuthenticated && user?.role === "employer"
                ? "/employer-dashboard"
                : "/login"
            )
          }
          className="hover:text-yellow-300 transition duration-300"
        >
          Manager
        </button>
      </nav>

      {/* Auth Section */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="hidden md:block">
              Welcome, <b>{user?.fullName}</b>
            </span>

            <button
              onClick={() =>
                navigate(
                  user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/find-jobs"
                )
              }
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Dashboard
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="hover:underline"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/sign-up")}
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;