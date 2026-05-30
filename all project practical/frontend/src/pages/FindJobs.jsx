import { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaBriefcase, FaFilter, FaTimes, FaBuilding, FaChevronLeft, FaChevronRight, FaSlidersH, FaRegBuilding, FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';
import api from '../api/axios';
import JobCard from '../components/JobCard';

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    minSalary: '',
    maxSalary: '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const jobsPerPage = 9;

  useEffect(() => {
    fetchJobs();
  }, [filters, currentPage]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: jobsPerPage,
        ...(filters.title && { title: filters.title }),
        ...(filters.location && { location: filters.location }),
        ...(filters.minSalary && { minSalary: filters.minSalary }),
        ...(filters.maxSalary && { maxSalary: filters.maxSalary }),
      });
      const res = await api.get(`/api/jobs?${params.toString()}`);
      setJobs(res.data.jobs || res.data);
      if (res.data.totalPages) {
        setTotalPages(res.data.totalPages);
        setTotalJobs(res.data.totalJobs);
      } else {
        setTotalPages(Math.ceil(res.data.length / jobsPerPage));
        setTotalJobs(res.data.length);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ title: '', location: '', minSalary: '', maxSalary: '' });
    setCurrentPage(1);
  };

  const hasActiveFilters = filters.title || filters.location || filters.minSalary || filters.maxSalary;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Hero Section - Modern Glassmorphic */}
      <section className="relative bg-gradient-to-r from-[#1E3A8A] via-[#1E3A8A] to-[#3B82F6] text-white overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-0 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 shadow-lg mb-6 border border-white/30">
            <FaBriefcase className="text-white" />
            <span className="text-sm font-medium">10,000+ live opportunities</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#3B82F6]">Dream Job</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Search thousands of jobs from top employers in Rwanda and beyond. Your next career starts here.
          </p>

          {/* Enhanced search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#10B981] transition-colors" />
              <input
                type="text"
                name="title"
                placeholder="Job title, keyword, or company..."
                value={filters.title}
                onChange={handleFilterChange}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:bg-white shadow-xl transition-all duration-300"
              />
            </div>
          </div>

          {/* Stats with icons */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm font-medium">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaBuilding className="text-[#10B981]" />
              <span>500+ Companies</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaMapMarkerAlt className="text-[#10B981]" />
              <span>All across Rwanda</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <FaDollarSign className="text-[#10B981]" />
              <span>Competitive salaries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile filter bar */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl shadow-md text-gray-700 hover:bg-gray-50 transition-all duration-200 border border-gray-200"
          >
            <FaFilter className="text-[#10B981]" /> Filters
            {hasActiveFilters && <span className="ml-1 px-2 py-0.5 text-xs bg-[#10B981]/10 text-[#10B981] rounded-full font-semibold">{Object.values(filters).filter(Boolean).length}</span>}
          </button>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="text-sm text-[#10B981] font-medium hover:text-[#10B981]/80 transition">
              Reset all
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - modern card with rounded-2xl */}
          <aside className={`
            fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto lg:block lg:w-80
            transition-transform duration-300 ease-out transform
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            bg-white lg:bg-white lg:rounded-2xl lg:border lg:border-gray-100 lg:shadow-xl
          `}>
            {/* Mobile drawer header */}
            <div className="lg:hidden flex justify-between items-center p-5 border-b bg-white">
              <h2 className="font-bold text-lg text-gray-800">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition">
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-7 bg-white lg:bg-white lg:rounded-2xl">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Location</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    placeholder="City, region or remote"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#10B981] focus:border-transparent bg-gray-50/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Minimum Salary (RWF)</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="minSalary"
                    placeholder="e.g., 500000"
                    value={filters.minSalary}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#10B981] bg-gray-50/50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Maximum Salary (RWF)</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="maxSalary"
                    placeholder="e.g., 2000000"
                    value={filters.maxSalary}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#10B981] bg-gray-50/50 transition"
                  />
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full mt-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition font-medium"
              >
                Reset all filters
              </button>
            </div>
          </aside>

          {/* Job listings area */}
          <main className="flex-1">
            {/* Results header with better typography */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {loading ? 'Loading jobs...' : `${totalJobs} job${totalJobs !== 1 ? 's' : ''} found`}
                </h2>
                {!loading && totalJobs > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Showing {Math.min((currentPage - 1) * jobsPerPage + 1, totalJobs)} – {Math.min(currentPage * jobsPerPage, totalJobs)} of {totalJobs}
                  </p>
                )}
              </div>
              <div className="hidden lg:block">
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-sm font-medium text-[#10B981] hover:text-[#10B981]/80 transition">
                    Clear all filters
                  </button>
                )}
              </div>
            </div>

            {/* Loading skeleton with shimmer effect */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-16 text-center">
                <FaBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">No jobs found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search keywords.</p>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="mt-5 px-5 py-2.5 bg-[#10B981] text-white rounded-xl hover:bg-[#10B981]/90 transition shadow-md">
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>

                {/* Modern pagination with better styling */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                    >
                      <FaChevronLeft />
                    </button>
                    <div className="flex gap-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-xl font-medium transition ${
                              currentPage === pageNum
                                ? 'bg-[#10B981] text-white shadow-md'
                                : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Overlay for mobile drawer with blur */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-all" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}