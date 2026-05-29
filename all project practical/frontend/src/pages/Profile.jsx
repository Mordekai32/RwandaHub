import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [company, setCompany] = useState(null);
  const [companyForm, setCompanyForm] = useState({ name: '', description: '', website: '', phone: '' });
  const [uploadingCompany, setUploadingCompany] = useState(false);

  // Helper to get full image URL (handles both relative and absolute paths)
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${api.defaults.baseURL}${path}`;
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      if (user.profileImage) setProfilePreview(getImageUrl(user.profileImage));
      if (user.role === 'employer') {
        fetchCompany();
      }
    }
    // Cleanup profile preview blob URL on unmount
    return () => {
      if (profilePreview && profilePreview.startsWith('blob:')) URL.revokeObjectURL(profilePreview);
    };
  }, [user]);

  const fetchCompany = async () => {
    try {
      const res = await api.get('/api/company');
      setCompany(res.data);
      setCompanyForm({
        name: res.data.name,
        description: res.data.description || '',
        website: res.data.website || '',
        phone: res.data.phone || '',
      });
    } catch (err) {
      if (err.response?.status === 404) {
        setCompany(null);
      } else {
        console.error('Error fetching company:', err);
      }
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (profilePreview && profilePreview.startsWith('blob:')) URL.revokeObjectURL(profilePreview);
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (profileImage) formData.append('profileImage', profileImage);

      const response = await api.put('/api/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated successfully');
      if (response.data) {
        const updatedUser = { ...user, name: response.data.name, profileImage: response.data.profileImage };
        setUser(updatedUser);
        if (response.data.profileImage) setProfilePreview(getImageUrl(response.data.profileImage));
        setProfileImage(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setUploading(false);
    }
  };

  const createOrUpdateCompany = async (e) => {
    e.preventDefault();
    setUploadingCompany(true);
    try {
      const payload = {
        name: companyForm.name,
        description: companyForm.description,
        website: companyForm.website,
        phone: companyForm.phone,
      };

      let response;
      if (company) {
        response = await api.put('/api/company', payload);
      } else {
        response = await api.post('/api/company', payload);
      }
      alert('Company saved successfully');
      const updatedCompany = response.data;
      setCompany(updatedCompany);
      setCompanyForm({
        name: updatedCompany.name,
        description: updatedCompany.description || '',
        website: updatedCompany.website || '',
        phone: updatedCompany.phone || '',
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save company');
    } finally {
      setUploadingCompany(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-12 px-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-3xl mx-auto space-y-6">
        {/* User Profile Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent mb-4">
            User Profile
          </h2>
          <form onSubmit={updateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Profile Picture</label>
              <div className="flex items-center space-x-4">
                {profilePreview && (
                  <img src={profilePreview} alt="Preview" className="h-16 w-16 rounded-full object-cover border border-white/20" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="block text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/20 file:text-emerald-300 file:border file:border-emerald-500/30 hover:file:bg-emerald-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="mt-1 w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-slate-300 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md shadow-blue-600/20 hover:from-blue-700 hover:to-emerald-600 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        {/* Employer Company Section */}
        {user?.role === 'employer' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent mb-4">
              {company ? 'Edit Company' : 'Create Company Profile'}
            </h2>
            <form onSubmit={createOrUpdateCompany} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300">Company Name</label>
                <input
                  type="text"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Description</label>
                <textarea
                  value={companyForm.description}
                  onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                  rows="3"
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Website</label>
                <input
                  type="url"
                  value={companyForm.website}
                  onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">Phone Number</label>
                <input
                  type="tel"
                  value={companyForm.phone}
                  onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                  placeholder="+250 7XX XXX XXX"
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                />
              </div>

              <button
                type="submit"
                disabled={uploadingCompany}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md shadow-emerald-500/20 hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingCompany ? 'Saving...' : 'Save Company'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}