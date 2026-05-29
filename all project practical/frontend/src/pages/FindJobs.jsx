import { useEffect, useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaBriefcase, FaFilter, FaTimes, FaBuilding, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
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
      setJobs(res.data.jobs || res.data); // handle both paginated and non-paginated responses
      if (res.data.totalPages) {
        setTotalPages(res.data.totalPages);
        setTotalJobs(res.data.totalJobs);
      } else {
        // fallback for non-paginated backend
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
    setCurrentPage(1); // reset to first page on filter change
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-6">
            <FaBriefcase className="text-white" />
            <span className="text-sm font-medium">10,000+ opportunities</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Dream Job</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Search thousands of jobs from top employers in Rwanda and beyond.
          </p>

          {/* Main search bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="title"
                placeholder="Job title, keyword, or company..."
                value={filters.title}
                onChange={handleFilterChange}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm">
            <div className="flex items-center gap-2">
              <FaBuilding className="text-yellow-300" />
              <span>500+ Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-300" />
              <span>All across Rwanda</span>
            </div>
            <div className="flex items-center gap-2">
              <FaDollarSign className="text-yellow-300" />
              <span>Competitive salaries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content with sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-50 transition"
          >
            <FaFilter /> Filters
            {hasActiveFilters && <span className="ml-1 px-1.5 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">{Object.values(filters).filter(Boolean).length}</span>}
          </button>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="text-sm text-indigo-600 hover:text-indigo-800">
              Reset all
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters - desktop always visible, mobile as drawer */}
          <aside className={`
            fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto lg:block lg:w-80
            transition-transform duration-300 transform
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            bg-white lg:bg-transparent lg:rounded-xl lg:border lg:border-gray-200 lg:shadow-sm
          `}>
            {/* Mobile drawer header */}
            <div className="lg:hidden flex justify-between items-center p-4 border-b bg-white">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <FaTimes />
              </button>
            </div>

            <div className="p-5 space-y-6 bg-white lg:bg-white lg:rounded-xl lg:shadow-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    placeholder="City, region or remote"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Salary (RWF)</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="minSalary"
                    placeholder="e.g., 500000"
                    value={filters.minSalary}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Salary (RWF)</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="maxSalary"
                    placeholder="e.g., 2000000"
                    value={filters.maxSalary}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Reset filters
              </button>
            </div>
          </aside>

          {/* Job listings area */}
          <main className="flex-1">
            {/* Results header */}
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {loading ? 'Loading jobs...' : `${totalJobs} job${totalJobs !== 1 ? 's' : ''} found`}
                </h2>
                {!loading && totalJobs > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Showing {Math.min((currentPage - 1) * jobsPerPage + 1, totalJobs)} - {Math.min(currentPage * jobsPerPage, totalJobs)} of {totalJobs}
                  </p>
                )}
              </div>
              {/* Desktop reset button (optional) */}
              <div className="hidden lg:block">
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-sm text-indigo-600 hover:text-indigo-800">
                    Reset filters
                  </button>
                )}
              </div>
            </div>

            {/* Loading skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm p-5 animate-pulse">
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
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm py-16 text-center">
                <FaBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">No jobs found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search keywords.</p>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
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
                            className={`w-10 h-10 rounded-lg transition ${
                              currentPage === pageNum
                                ? 'bg-indigo-600 text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
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
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
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

      {/* Overlay for mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}