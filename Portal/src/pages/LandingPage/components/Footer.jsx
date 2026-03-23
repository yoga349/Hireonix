import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Hireonix</h2>
          <p className="text-sm">
            Connecting people from villages to corporates with jobs, gigs, and opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li onClick={() => navigate("/")} className="hover:text-white cursor-pointer">Home</li>
            <li onClick={() => navigate("/find-jobs")} className="hover:text-white cursor-pointer">Find Jobs</li>
            <li onClick={() => navigate("/login")} className="hover:text-white cursor-pointer">Login</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-white font-semibold mb-3">Features</h3>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Find Work</li>
            <li className="hover:text-white cursor-pointer">Hire People</li>
            <li className="hover:text-white cursor-pointer">Analyze Resume</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: support@hireonix.com</p>
          <p className="text-sm mt-2">India 🌍</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Hireonix. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;