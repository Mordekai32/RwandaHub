import { useEffect, useState } from 'react';
import api from '../api/axios';
import ApplicationCard from '../components/ApplicationCard';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600';
  
  return (
    <div className={`fixed bottom-4 right-4 bg-gradient-to-r ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up`}>
      {message}
    </div>
  );
};

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/my-applications');
      setApplications(response.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err.response?.data?.message || 'Failed to load your applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter applications
  const filteredApps = applications.filter(app => {
    if (!app) return false;
    const jobTitle = app.jobId?.title || '';
    const matchesSearch = jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApps = filteredApps.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 border-blue-400 opacity-30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-8 px-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent">
            My Applications
          </h1>
          <p className="text-slate-300 mt-2">Track and manage your job applications</p>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by job title..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500/50"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setCurrentPage(1);
                }}
                className="px-4 py-2 text-slate-300 bg-white/5 rounded-lg hover:bg-white/10 transition border border-white/10"
              >
                Reset
              </button>
              <button
                onClick={fetchApplications}
                className="px-4 py-2 text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition border border-emerald-500/30"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-red-300">{error}</p>
              <button
                onClick={fetchApplications}
                className="px-3 py-1 text-sm bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredApps.length === 0 && !error ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-white">No applications found</h3>
            <p className="mt-1 text-sm text-slate-300">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters.' 
                : "You haven't applied to any jobs yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentApps.map(app => app && (
              <ApplicationCard key={app._id} application={app} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredApps.length > itemsPerPage && (
          <div className="mt-6 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-white/10 bg-white/5 text-sm font-medium text-slate-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border-t border-b border-white/10 bg-white/5 text-sm font-medium text-slate-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-white/10 bg-white/5 text-sm font-medium text-slate-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Toast notifications */}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: '', type: 'success' })}
          />
        )}
      </div>

      {/* Animation keyframes – regular style tag (no jsx) */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}