import { useEffect, useState } from 'react';
import { FaBuilding, FaUsers, FaGlobe, FaSearch, FaMapMarkerAlt, FaRegBuilding, FaPhone, FaEdit, FaUpload, FaTimes } from 'react-icons/fa';
import api from '../api/axios';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  
  // Modal state for logo upload
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  // Helper: get full image URL (works for both dev and production)
  const getImageUrl = (logoPath) => {
    if (!logoPath) return null;
    // If it's already an absolute URL, return as is
    if (logoPath.startsWith('http')) return logoPath;
    // Otherwise prepend API base URL (from env or default)
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${baseUrl}${logoPath}`;
  };

  // Open upload modal
  const handleEditLogo = (company) => {
    setSelectedCompany(company);
    setUploadFile(null);
    setUploadPreview(null);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setUploadPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setUploadFile(null);
      setUploadPreview(null);
    }
  };

  // Upload logo to server
  const handleUpload = async () => {
    if (!uploadFile || !selectedCompany) return;
    
    const formData = new FormData();
    formData.append('logo', uploadFile);
    
    try {
      setUploading(true);
      const response = await api.put(`/api/companies/${selectedCompany._id}/logo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Update company in local state with new logo path
      setCompanies(prev => prev.map(comp => 
        comp._id === selectedCompany._id 
          ? { ...comp, logo: response.data.logo } 
          : comp
      ));
      
      // Close modal and reset
      setSelectedCompany(null);
      setUploadFile(null);
      setUploadPreview(null);
    } catch (err) {
      console.error('Upload error:', err);
      alert(err.response?.data?.message || 'Failed to upload logo');
    } finally {
      setUploading(false);
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
      {/* Animated background blobs (unchanged) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (unchanged) */}
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

        {/* Search (unchanged) */}
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
                {/* Logo & header with edit button */}
                <div className="relative h-28 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600">
                  {company.logo ? (
                    <img
                      src={getImageUrl(company.logo)}
                      alt={company.name}
                      className="absolute -bottom-8 left-6 w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg bg-white"
                      onError={(e) => { e.target.onerror = null; e.target.src = ''; e.target.parentElement.innerHTML = '<div class="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20"><svg class="text-emerald-400 text-2xl" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-4H7v-2h4v2zm0-4H7V7h4v2zm6 6h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z"/></svg></div>'; }}
                    />
                  ) : (
                    <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                      <FaBuilding className="text-emerald-400 text-2xl" />
                    </div>
                  )}
                  
                  {/* Edit logo button (visible on hover) */}
                  <button
                    onClick={() => handleEditLogo(company)}
                    className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-emerald-500"
                    title="Upload new logo"
                  >
                    <FaEdit className="text-white text-sm" />
                  </button>
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

      {/* Logo Upload Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-white/20 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Update Logo for {selectedCompany.name}</h3>
              <button onClick={() => setSelectedCompany(null)} className="text-slate-400 hover:text-white">
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Preview area */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-slate-700 border-2 border-emerald-400">
                  {uploadPreview ? (
                    <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : selectedCompany.logo ? (
                    <img src={getImageUrl(selectedCompany.logo)} alt="Current logo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaBuilding className="text-4xl text-slate-500" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* File input */}
              <label className="block">
                <span className="text-slate-300 text-sm block mb-2">Choose new logo image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 cursor-pointer"
                />
              </label>
              
              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!uploadFile || uploading}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaUpload size={14} /> Upload
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}