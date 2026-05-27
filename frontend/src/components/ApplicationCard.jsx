// components/ApplicationCard.jsx

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'pending':
      return (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'accepted':
      return (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'rejected':
      return (
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ApplicationCard({ application, onCancel }) {
  // Guard against undefined or null application
  if (!application) return null;

  const { jobId, status, appliedAt, coverLetter, cvUrl, _id } = application;
  const job = jobId || {};

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {job.title || 'Job title not available (job may have been removed)'}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                {getStatusIcon(status)}
                {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
              </span>
            </div>

            {job.company && (
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {job.company}
              </div>
            )}

            {job.location && (
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </div>
            )}

            {job.salary && (
              <div className="mt-1 text-sm text-green-600 font-medium">
                Salary: {job.salary.toLocaleString()} Rwf
              </div>
            )}

            {coverLetter && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700 italic">"{coverLetter}"</p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-gray-500">
                Applied on: {appliedAt ? new Date(appliedAt).toLocaleDateString() : 'Date unknown'}
              </div>
              <div className="flex gap-3">
                {cvUrl && (
                  <a
                    href={`http://localhost:5000${cvUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                  >
                    View CV
                  </a>
                )}
                {status === 'pending' && onCancel && (
                  <button
                    onClick={() => onCancel(_id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                  >
                    Withdraw
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}