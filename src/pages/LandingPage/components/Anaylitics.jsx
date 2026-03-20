const Analytics = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Impact in Numbers 🚀
        </h2>

        <p className="mb-12 text-blue-100">
          Empowering people across villages, cities, and corporates.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
            <h3 className="text-3xl font-bold">1M+</h3>
            <p className="text-blue-200">Users</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-blue-200">Jobs Posted</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
            <h3 className="text-3xl font-bold">5K+</h3>
            <p className="text-blue-200">Employers</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
            <h3 className="text-3xl font-bold">8K+</h3>
            <p className="text-blue-200">Resumes Analyzed</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Analytics;