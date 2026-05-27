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
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Animated gradient bar on top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="p-6">
        {/* Company Logo + Title Row */}
        <div className="flex items-start gap-4 mb-3">
          {/* Logo Image */}
          <div className="flex-shrink-0">
            {job.companyLogo ? (
              <img
                src={`http://localhost:5000${job.companyLogo}`}
                alt={job.company}
                className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                onError={(e) => { e.target.src = defaultLogo; }}
              />
            ) : (
              <img
                src={defaultLogo}
                alt={job.company}
                className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              />
            )}
          </div>

          {/* Title and badge */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                {job.title}
              </h3>
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-1 rounded-full">
                Full-time
              </div>
            </div>
            {/* Company name */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {job.company}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{job.location}</span>
        </div>

        {/* Number of Employees (new) */}
        {job.employeeCount && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{formatEmployeeCount(job.employeeCount)} employees</span>
          </div>
        )}

        {/* Salary chip */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold px-3 py-1 rounded-full">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salary?.toLocaleString()} RWF
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-2">
          {job.description}
        </p>

        {/* Footer with button and meta */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-500">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <Link
            to={`/jobs/${job._id}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
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