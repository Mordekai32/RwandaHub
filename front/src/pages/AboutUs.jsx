import { FaRocket, FaUsers, FaShieldAlt, FaChartLine, FaBriefcase, FaRegHandshake } from 'react-icons/fa';

export default function AboutUs() {
  const stats = [
    { number: '500+', label: 'Job Seekers' },
    { number: '150+', label: 'Companies' },
    { number: '1,200+', label: 'Applications' },
    { number: '95%', label: 'Satisfaction' }
  ];

  const features = [
    { icon: FaBriefcase, title: 'Free Job Posting', description: 'Employers can post jobs at no cost and reach top talent.' },
    { icon: FaChartLine, title: 'Advanced Search', description: 'Filter by title, location, salary, and more.' },
    { icon: FaShieldAlt, title: 'Secure Applications', description: 'Your data is protected and applications are tracked safely.' },
    { icon: FaRegHandshake, title: 'Admin Moderation', description: 'All jobs are reviewed to ensure quality and relevance.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            About JobFinder Rwanda
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bridging talent and opportunity across Rwanda with modern, digital hiring solutions.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FaRocket className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To empower Rwandan professionals and businesses by providing a modern job platform that bridges the gap between talent and opportunity. We strive to make hiring fast, transparent, and accessible to everyone.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-500">Driving employment in Rwanda</span>
              </div>
            </div>
            <div className="md:w-1/2 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 md:p-10 flex items-center justify-center">
              <div className="text-center">
                <FaUsers className="w-16 h-16 text-indigo-500 mx-auto mb-3 opacity-80" />
                <p className="text-gray-700 italic">"Connecting talent, creating futures."</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="transform hover:scale-105 transition duration-300">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
                <div className="text-indigo-100 text-sm md:text-base mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:py-16 text-center md:text-left md:flex md:justify-between md:items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Ready to find your dream job?</h2>
              <p className="text-indigo-100 mt-2">Join thousands of job seekers and employers today.</p>
            </div>
            <div className="mt-6 md:mt-0">
              <a href="/jobs" className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 transform duration-200">
                Browse Jobs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}