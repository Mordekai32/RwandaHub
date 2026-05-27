import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function EmployerJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'approved', 'rejected'

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/employer/jobs');
      setJobs(res.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Delete job
  const deleteJob = async (id) => {
    if (window.confirm('Delete this job? This action cannot be undone.')) {
      try {
        await api.delete(`/api/jobs/${id}`);
        setJobs(jobs.filter(j => j._id !== id));
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  // Duplicate job - using dedicated backend endpoint
  const duplicateJob = async (job) => {
    try {
      const res = await api.post(`/api/employer/jobs/${job._id}/duplicate`);
      setJobs([res.data, ...jobs]);
      alert('Job duplicated successfully!');
    } catch (error) {
      console.error('Duplicate failed:', error);
      alert(error.response?.data?.message || 'Failed to duplicate job.');
    }
  };

  // Filter jobs by status
  const filteredJobs = filterStatus === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === filterStatus);

  // Status badge colors (dark theme compatible)
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
      approved: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
      rejected: 'bg-red-500/20 text-red-300 border border-red-500/30',
      closed: 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
    };
    return styles[status] || 'bg-gray-500/20 text-gray-300';
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

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent">
            Manage Jobs
          </h1>
          <div className="flex gap-3">
            <Link 
              to="/employer/post" 
              className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-blue-600/20"
            >
              + Post New Job
            </Link>
            <button 
              onClick={fetchJobs} 
              className="bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-lg transition border border-white/10"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'pending', 'approved', 'rejected', 'closed'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg capitalize transition-all duration-200 ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <p className="text-slate-300 mb-4">No jobs found.</p>
            <Link to="/employer/post" className="text-emerald-400 hover:text-emerald-300 transition">
              Post your first job →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <div key={job._id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  {/* Job Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
                    <p className="text-slate-300 mb-2">
                      {job.location} • {job.salary?.toLocaleString()} Rwf
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`text-sm px-2 py-1 rounded capitalize ${getStatusBadge(job.status)}`}>
                        {job.status}
                      </span>
                      {job.applicationsCount !== undefined && (
                        <span className="text-sm text-slate-400">
                          📋 {job.applicationsCount} applicant{job.applicationsCount !== 1 ? 's' : ''}
                        </span>
                      )}
                      {job.createdAt && (
                        <span className="text-sm text-slate-400">
                          Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 items-start">
                    <Link
                      to={`/employer/applicants/${job._id}`}
                      className="bg-blue-500/80 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors shadow-sm"
                    >
                      View Applicants
                    </Link>
                    <Link
                      to={`/employer/edit-job/${job._id}`}
                      className="bg-yellow-500/80 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => duplicateJob(job)}
                      className="bg-emerald-500/80 hover:bg-emerald-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                    >
                      Duplicate
                    </button>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="bg-red-500/80 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Job Count Summary */}
        <div className="mt-6 text-sm text-slate-400 border-t border-white/10 pt-4">
          Showing {filteredJobs.length} of {jobs.length} total jobs
        </div>
      </div>
    </div>
  );
}