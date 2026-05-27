import { FaFileAlt, FaMicrophone, FaUsers, FaLaptopCode, FaLanguage, FaHandshake, FaLightbulb, FaChartLine } from 'react-icons/fa';

export default function CareerTips() {
  const tips = [
    {
      icon: FaFileAlt,
      title: 'Write a Standout CV',
      description: 'Tailor your CV to each job, highlight achievements (quantify where possible), and keep it to 1-2 pages. Use a clean, professional format.',
      color: 'from-blue-500 to-blue-600',
      category: 'Application'
    },
    {
      icon: FaMicrophone,
      title: 'Ace the Interview',
      description: 'Research the company, practice common questions (STAR method), and prepare thoughtful questions to ask. Dress appropriately and be punctual.',
      color: 'from-green-500 to-green-600',
      category: 'Interview'
    },
    {
      icon: FaUsers,
      title: 'Networking in Rwanda',
      description: 'Attend tech meetups, join LinkedIn groups (e.g., "Rwandan Tech Community"), and connect with professionals in your field. Follow up after events.',
      color: 'from-purple-500 to-purple-600',
      category: 'Networking'
    },
    {
      icon: FaLaptopCode,
      title: 'Build an Online Presence',
      description: 'Create a LinkedIn profile, GitHub portfolio (for developers), or a personal website. Share your projects and engage with industry content.',
      color: 'from-orange-500 to-orange-600',
      category: 'Personal Branding'
    },
    {
      icon: FaLanguage,
      title: 'Improve Communication Skills',
      description: 'Practice English (widely used in Rwandan business), learn to write professional emails, and articulate your thoughts clearly in meetings.',
      color: 'from-pink-500 to-pink-600',
      category: 'Soft Skills'
    },
    {
      icon: FaChartLine,
      title: 'Upskill Continuously',
      description: 'Take online courses (Coursera, Udemy, or local bootcamps like Andela, Moringa). Certifications in IT, project management, or data analysis are valued.',
      color: 'from-red-500 to-red-600',
      category: 'Learning'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-4">
            <FaLightbulb className="text-yellow-500" />
            <span className="text-sm text-gray-600">Career Advice</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Career Tips
          </h1>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Practical advice to help you succeed in Rwanda's competitive job market.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tip.color} text-white mb-4 group-hover:scale-110 transition`}>
                  <tip.icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {tip.category}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
              <div className={`h-1 bg-gradient-to-r ${tip.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </div>
          ))}
        </div>

        {/* Bonus Section: Quick Actions */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to take the next step?</h2>
              <p className="text-indigo-100">Explore job opportunities or update your profile today.</p>
            </div>
            <div className="flex gap-3">
              <a href="/jobs" className="px-5 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:shadow-lg transition hover:scale-105">
                Browse Jobs
              </a>
              <a href="/profile" className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition">
                Update Profile
              </a>
            </div>
          </div>
        </div>

        {/* Tip of the day (optional) */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <FaHandshake className="inline mr-2" /> More tips regularly added – check back often!
        </div>
      </div>
    </div>
  );
}