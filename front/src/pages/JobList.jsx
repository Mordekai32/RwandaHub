import { useEffect, useState } from 'react';
import api from '../api/axios';
import JobCard from '../components/JobCard';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ title: '', location: '', minSalary: '', maxSalary: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.title) params.append('title', filters.title);
        if (filters.location) params.append('location', filters.location);
        if (filters.minSalary) params.append('minSalary', filters.minSalary);
        if (filters.maxSalary) params.append('maxSalary', filters.maxSalary);
        const res = await api.get(`/api/jobs?${params.toString()}`);
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filters]);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const resetFilters = () => {
    setFilters({ title: '', location: '', minSalary: '', maxSalary: '' });
  };

  const hasActiveFilters = filters.title || filters.location || filters.minSalary || filters.maxSalary;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-8 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass‑morphism filter card */}
        <div className="relative bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-6 mb-10 transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent">
                Find Your Next Opportunity
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                {!loading && `${jobs.length} job${jobs.length !== 1 ? 's' : ''} available`}
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:text-white hover:border-emerald-400 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Job Title */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                name="title"
                placeholder="Job title"
                value={filters.title}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                name="location"
                placeholder="Location"
                value={filters.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Min Salary */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-emerald-400 font-medium text-sm">RWF</span>
              </div>
              <input
                name="minSalary"
                type="number"
                placeholder="Min salary"
                value={filters.minSalary}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Max Salary */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-emerald-400 font-medium text-sm">RWF</span>
              </div>
              <input
                name="maxSalary"
                type="number"
                placeholder="Max salary"
                value={filters.maxSalary}
                onChange={handleChange}
                className="w-full pl-14 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-400"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 bg-emerald-400/20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-4 text-slate-300 font-medium">Loading amazing jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <svg className="mx-auto h-16 w-16 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-slate-300 text-lg">No jobs found. Try adjusting your filters.</p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}