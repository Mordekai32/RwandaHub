import { useEffect, useState } from 'react';
import { FaBuilding, FaUsers, FaGlobe, FaSearch, FaMapMarkerAlt, FaRegBuilding, FaPhone } from 'react-icons/fa';
import api from '../api/axios';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/companies');
      setCompanies(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError(err.response?.data?.message || 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.description && company.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 border-blue-400 opacity-30"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
        <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 text-center">
          <p className="text-red-300 mb-4">{error}</p>
          <button onClick={fetchCompanies} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-12 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-4 border border-white/10">
            <FaRegBuilding className="text-emerald-400" />
            <span className="text-sm text-slate-300">Employers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent">
            Companies
          </h1>
          <p className="text-slate-300 mt-2 max-w-2xl mx-auto">
            Discover top employers in Rwanda hiring across various industries.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-slate-400 focus:bg-white/10 focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition shadow-lg"
            />
          </div>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <FaBuilding className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">No companies found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div key={company._id} className="group bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/10 hover:border-emerald-500/30 hover:-translate-y-1">
                {/* Logo & header with gradient bar */}
                <div className="relative h-28 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600">
                  {company.logo ? (
                    <img
                      src={`http://localhost:5000${company.logo}`}
                      alt={company.name}
                      className="absolute -bottom-8 left-6 w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg bg-white"
                    />
                  ) : (
                    <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                      <FaBuilding className="text-emerald-400 text-2xl" />
                    </div>
                  )}
                </div>

                <div className="pt-10 p-5">
                  <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition">
                    {company.name}
                  </h2>
                  
                  {company.employeeCount && (
                    <div className="flex items-center gap-1 text-sm text-slate-300 mt-1">
                      <FaUsers size={14} className="text-emerald-400" /> {company.employeeCount} employees
                    </div>
                  )}
                  
                  {/* Phone number */}
                  {company.phone && (
                    <div className="flex items-center gap-1 text-sm text-slate-300 mt-1">
                      <FaPhone size={12} className="text-emerald-400" /> {company.phone}
                    </div>
                  )}
                  
                  <p className="text-slate-300 text-sm mt-3 line-clamp-3">
                    {company.description || 'No description provided.'}
                  </p>
                  
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 text-sm mt-3 hover:text-white transition"
                    >
                      <FaGlobe size={12} /> Visit website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}