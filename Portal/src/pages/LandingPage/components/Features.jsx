import React from "react";


const Features = () => {
  return (
    <section className="py-20 px-6 bg-white">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What You Can Do with <span className="text-blue-600">Hireonix</span>
        </h2>

        <p className="text-gray-600 mb-12">
          Discover opportunities, hire talent, and grow your career — all in one place.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">🌍 Find Local Work</h3>
            <p className="text-gray-600">
              Get jobs near you — shops, daily work, and small businesses.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">💼 Explore Careers</h3>
            <p className="text-gray-600">
              Apply for corporate jobs and grow professionally.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">📄 Analyze Resume</h3>
            <p className="text-gray-600">
              Improve your resume with smart insights and suggestions.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">⚡ Hire Instantly</h3>
            <p className="text-gray-600">
              Employers can quickly find and hire the right candidates.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">📱 Easy to Use</h3>
            <p className="text-gray-600">
              Simple interface designed for everyone — no complexity.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">🔒 Safe & Reliable</h3>
            <p className="text-gray-600">
              Secure platform connecting job seekers and employers.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;