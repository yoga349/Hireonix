import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';
const Hero = () => {
    const {user,isAuthenticated,loading} = useAuth();
    const navigate = useNavigate();
    
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-24 px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Work for <span className="text-blue-600">Everyone</span>, Anywhere 🌍
        </h1>

        {/* Subheading */}
        <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
          Hireonix connects people from villages, cities, and corporates with jobs,
          gigs, and opportunities — from local shops to top companies.
        </p>

        {/* CTA Buttons */}

        <nav 
       
         className="flex justify-center flex-wrap gap-4 mb-14">
          <button 
           onClick={()=>navigate("/find-jobs")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Find Work
          </button>

          <button 
          onClick={() =>
            navigate(
              isAuthenticated && user?.role === "employer"
                ? "/employer-dashboard"
                : "/login"
            )
        } 
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
            Hire People
          </button>

          <button
           onClick={()=>navigate("/")} 
          className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition">
            Analyze Resume
          </button>
        </nav>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 text-left mt-10">

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🌍 Local & Rural Jobs</h3>
            <p className="text-gray-600">
              Find work in your area — from shops, farms, and small businesses.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">💼 Corporate Careers</h3>
            <p className="text-gray-600">
              Explore professional roles and grow your career in top companies.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📄 Resume Analysis</h3>
            <p className="text-gray-600">
              Improve your resume with smart insights and stand out to recruiters.
            </p>
          </div>

        </div>

        {/* Stats */}
        <div className="flex justify-center flex-wrap gap-10 text-center mt-16">

          <div>
            <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
            <p className="text-gray-600">Jobs Available</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-blue-600">5K+</h2>
            <p className="text-gray-600">Employers</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-blue-600">20K+</h2>
            <p className="text-gray-600">Users</p>
          </div>

        </div>

        {/* Trust Line */}
        <p className="text-gray-500 mt-10">
          Empowering people from villages to corporates 🚀
        </p>

      </div>
    </section>
  );
};

export default Hero;