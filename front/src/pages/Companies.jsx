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
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchCompanies} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Retry</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-4">
            <FaRegBuilding className="text-indigo-500" />
            <span className="text-sm text-gray-600">Employers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Companies
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Discover top employers in Rwanda hiring across various industries.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Companies Grid */}
        {filteredCompanies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <FaBuilding className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No companies found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div key={company._id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Logo & header */}
                <div className="relative h-28 bg-gradient-to-r from-indigo-500 to-purple-500">
                  {company.logo ? (
                    <img
                      src={`http://localhost:5000${company.logo}`}
                      alt={company.name}
                      className="absolute -bottom-8 left-6 w-16 h-16 rounded-full object-cover border-4 border-white shadow-md bg-white"
                    />
                  ) : (
                    <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md border-4 border-white">
                      <FaBuilding className="text-indigo-500 text-2xl" />
                    </div>
                  )}
                </div>

                <div className="pt-10 p-5">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                    {company.name}
                  </h2>
                  
                  {company.employeeCount && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <FaUsers size={14} /> {company.employeeCount} employees
                    </div>
                  )}
                  
                  {/* Phone number - NEW */}
                  {company.phone && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <FaPhone size={12} /> {company.phone}
                    </div>
                  )}
                  
                  <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                    {company.description || 'No description provided.'}
                  </p>
                  
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 text-sm mt-3 hover:underline"
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