import { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaBriefcase, FaFilter } from 'react-icons/fa';
import api from '../api/axios';
import JobCard from '../components/JobCard';

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ title: '', location: '', minSalary: '', maxSalary: '' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

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

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({ title: '', location: '', minSalary: '', maxSalary: '' });
  };

  const hasActiveFilters = filters.title || filters.location || filters.minSalary || filters.maxSalary;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-16 px-4">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-6">
            <FaBriefcase className="text-indigo-500" />
            <span className="text-sm text-gray-600">Job Search</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Browse thousands of opportunities from top employers across Rwanda.
          </p>

          {/* Quick search bar (for title only) */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="title"
                placeholder="Job title, keyword, or company..."
                value={filters.title}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <FaFilter size={14} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="text-sm text-indigo-600 hover:text-indigo-800">
              Reset all filters
            </button>
          )}
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-md p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={filters.location}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="minSalary"
                placeholder="Min Salary (RWF)"
                value={filters.minSalary}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="maxSalary"
                placeholder="Max Salary (RWF)"
                value={filters.maxSalary}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <FaBriefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No jobs found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}