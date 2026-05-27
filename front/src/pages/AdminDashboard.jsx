import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with proper text colors */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-[#64748B] text-sm">
            Manage platform settings and content
          </p>
        </div>

        {/* Three cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/users"
            className="bg-white rounded-xl border border-[#E2E8F0] p-6 transition-all duration-200 hover:shadow-lg hover:border-[#2563EB]/30 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] text-xl">
                👥
              </div>
              <span className="text-[#2563EB] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Manage →
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[#0F172A] mb-2">
              Manage Users
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              View and delete platform users
            </p>
          </Link>

          <Link
            to="/admin/jobs"
            className="bg-white rounded-xl border border-[#E2E8F0] p-6 transition-all duration-200 hover:shadow-lg hover:border-[#2563EB]/30 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] text-xl">
                ✅
              </div>
              <span className="text-[#2563EB] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Review →
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[#0F172A] mb-2">
              Approve Jobs
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Review and approve pending job postings
            </p>
          </Link>

          <Link
            to="/admin/analytics"
            className="bg-white rounded-xl border border-[#E2E8F0] p-6 transition-all duration-200 hover:shadow-lg hover:border-[#2563EB]/30 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] text-xl">
                📈
              </div>
              <span className="text-[#2563EB] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Insights →
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[#0F172A] mb-2">
              Analytics
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed">
              View platform statistics and trends
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}