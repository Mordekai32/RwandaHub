import { useEffect, useState } from 'react';
import api from '../api/axios';

// Confirmation Modal Component (dark themed)
const ConfirmModal = ({ isOpen, onClose, onConfirm, jobTitle, action }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-white/10 shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Confirm {action}</h3>
        <p className="text-slate-300 mb-6">
          Are you sure you want to {action.toLowerCase()} the job posting <span className="font-medium text-emerald-400">"{jobTitle}"</span>? 
          {action === 'Reject' && ' This action cannot be undone.'}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-300 bg-white/5 rounded-lg hover:bg-white/10 transition border border-white/10"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg transition shadow-md ${
              action === 'Approve' 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' 
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
            }`}
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Notification Component (dark themed)
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgGradient = type === 'success' 
    ? 'from-emerald-500 to-emerald-600' 
    : 'from-red-500 to-red-600';
  
  return (
    <div className={`fixed bottom-4 right-4 bg-gradient-to-r ${bgGradient} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up`}>
      {message}
    </div>
  );
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [confirmModal, setConfirmModal] = useState({ 
    isOpen: false, 
    jobId: null, 
    jobTitle: '', 
    action: '' 
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const fetchPendingJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/admin/jobs/pending');
      setJobs(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch pending jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const confirmApprove = (jobId, jobTitle) => {
    setConfirmModal({ isOpen: true, jobId, jobTitle, action: 'Approve' });
  };

  const handleApprove = async () => {
    const { jobId } = confirmModal;
    try {
      await api.put(`/api/admin/jobs/${jobId}/approve`);
      setJobs(jobs.filter(j => j._id !== jobId));
      showToast('Job approved successfully', 'success');
      setConfirmModal({ isOpen: false, jobId: null, jobTitle: '', action: '' });
      
      if (currentJobs.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to approve job', 'error');
      setConfirmModal({ isOpen: false, jobId: null, jobTitle: '', action: '' });
    }
  };

  const confirmReject = (jobId, jobTitle) => {
    setConfirmModal({ isOpen: true, jobId, jobTitle, action: 'Reject' });
  };

  const handleReject = async () => {
    const { jobId } = confirmModal;
    try {
      await api.delete(`/api/admin/jobs/${jobId}`);
      setJobs(jobs.filter(j => j._id !== jobId));
      showToast('Job rejected and removed', 'success');
      setConfirmModal({ isOpen: false, jobId: null, jobTitle: '', action: '' });
      
      if (currentJobs.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to reject job', 'error');
      setConfirmModal({ isOpen: false, jobId: null, jobTitle: '', action: '' });
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const resetSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-12 px-4 relative overflow-hidden">
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
            Pending Job Approvals
          </h1>
          <p className="text-slate-300 mt-2">Review and moderate job postings before publication</p>
        </div>

        {/* Search and Refresh */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={resetSearch}
                className="px-4 py-2 text-slate-300 bg-white/5 rounded-lg hover:bg-white/10 transition border border-white/10"
              >
                Clear
              </button>
              <button
                onClick={fetchPendingJobs}
                className="px-4 py-2 text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition border border-emerald-500/30"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-red-300">{error}</p>
              <button
                onClick={fetchPendingJobs}
                className="px-3 py-1 text-sm bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Jobs List */}
        {filteredJobs.length === 0 && !loading && !error ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-white">No pending jobs</h3>
            <p className="mt-1 text-sm text-slate-300">All job postings have been reviewed.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-300">
                            <span className="flex items-center">
                              <svg className="h-4 w-4 mr-1 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {job.company}
                            </span>
                            {job.location && (
                              <span className="flex items-center">
                                <svg className="h-4 w-4 mr-1 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                              </span>
                            )}
                          </div>
                        </div>
                        {job.salary && (
                          <div className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                            <span className="text-emerald-300 font-semibold">
                              {job.salary.toLocaleString()} Rwf
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="mt-3 text-slate-300 leading-relaxed">{job.description}</p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center text-sm text-slate-400">
                          <svg className="h-4 w-4 mr-1 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Posted by: <span className="font-medium ml-1 text-white">{job.createdBy?.name || 'Unknown'}</span>
                        </div>
                        {job.createdAt && (
                          <div className="text-sm text-slate-400">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 md:flex-col md:justify-center">
                      <button
                        onClick={() => confirmApprove(job._id, job.title)}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg hover:from-emerald-600 hover:to-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all shadow-md"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                      </button>
                      <button
                        onClick={() => confirmReject(job._id, job.title)}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-md"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {filteredJobs.length > itemsPerPage && (
              <div className="bg-white/5 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-t border-white/10 sm:px-6 rounded-lg">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-white/10 text-sm font-medium rounded-md text-slate-300 bg-white/5 hover:bg-white/10 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-white/10 text-sm font-medium rounded-md text-slate-300 bg-white/5 hover:bg-white/10 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-300">
                      Showing <span className="font-medium text-white">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium text-white">
                        {Math.min(indexOfLastItem, filteredJobs.length)}
                      </span>{' '}
                      of <span className="font-medium text-white">{filteredJobs.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-white/10 bg-white/5 text-sm font-medium text-slate-300 hover:bg-white/10 disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {[...Array(totalPages).keys()].map(number => (
                        <button
                          key={number + 1}
                          onClick={() => paginate(number + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === number + 1
                              ? 'z-10 bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {number + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-white/10 bg-white/5 text-sm font-medium text-slate-300 hover:bg-white/10 disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals and Toasts */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, jobId: null, jobTitle: '', action: '' })}
        onConfirm={confirmModal.action === 'Approve' ? handleApprove : handleReject}
        jobTitle={confirmModal.jobTitle}
        action={confirmModal.action}
      />

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

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