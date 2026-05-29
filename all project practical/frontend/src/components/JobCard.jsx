import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  // Placeholder image if logo not available
  const defaultLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company || 'Company')}&background=3b82f6&color=fff&rounded=true&size=48`;

  // Format employee count (e.g., "10-50", "100+", etc.)
  const formatEmployeeCount = (count) => {
    if (!count) return null;
    if (typeof count === 'string') return count;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k+`;
    return count.toString();
  };

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/10 hover:border-emerald-500/30 hover:-translate-y-1">
      {/* Animated gradient bar on top – modern blue/emerald */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="p-6">
        {/* Company Logo + Title Row */}
        <div className="flex items-start gap-4 mb-3">
          {/* Logo Image */}
          <div className="flex-shrink-0">
            {job.companyLogo ? (
              <img
                src={`http://localhost:5000${job.companyLogo}`}
                alt={job.company}
                className="w-12 h-12 rounded-full object-cover border border-white/20"
                onError={(e) => { e.target.src = defaultLogo; }}
              />
            ) : (
              <img
                src={defaultLogo}
                alt={job.company}
                className="w-12 h-12 rounded-full object-cover border border-white/20"
              />
            )}
          </div>

          {/* Title and badge */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition">
                {job.title}
              </h3>
              <div className="bg-emerald-500/20 text-emerald-300 text-xs font-medium px-2 py-1 rounded-full border border-emerald-500/30">
                Full-time
              </div>
            </div>
            {/* Company name */}
            <p className="text-slate-300 text-sm mt-1">
              {job.company}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-slate-300 text-sm mb-2">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{job.location}</span>
        </div>

        {/* Number of Employees */}
        {job.employeeCount && (
          <div className="flex items-center gap-2 text-slate-300 text-sm mb-1">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{formatEmployeeCount(job.employeeCount)} employees</span>
          </div>
        )}

        {/* Phone Number */}
        {job.phone && (
          <div className="flex items-center gap-2 text-slate-300 text-sm mb-3">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{job.phone}</span>
          </div>
        )}

        {/* Salary chip – vibrant emerald */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-sm font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salary?.toLocaleString()} RWF
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm mb-5 line-clamp-2">
          {job.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <Link
            to={`/jobs/${job._id}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
          >
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}