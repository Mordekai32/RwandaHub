import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [company, setCompany] = useState(null);
  const [companyForm, setCompanyForm] = useState({ name: '', description: '', website: '', logo: null });
  const [companyLogoPreview, setCompanyLogoPreview] = useState('');
  const [uploadingCompany, setUploadingCompany] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      if (user.profileImage) setProfilePreview(`http://localhost:5000${user.profileImage}`);
      if (user.role === 'employer') {
        api.get('/api/company')
          .then(res => {
            setCompany(res.data);
            setCompanyForm({
              name: res.data.name,
              description: res.data.description || '',
              website: res.data.website || '',
              logo: null
            });
            if (res.data.logo) setCompanyLogoPreview(`http://localhost:5000${res.data.logo}`);
          })
          .catch(() => setCompany(null));
      }
    }
  }, [user]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Profile updated successfully');
      // Update auth context if needed
      if (response.data.user) {
        // Optionally refresh user in context
        window.location.reload();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setUploading(false);
    }
  };

  const handleCompanyLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyForm({ ...companyForm, logo: file });
      setCompanyLogoPreview(URL.createObjectURL(file));
    }
  };

  const createOrUpdateCompany = async (e) => {
    e.preventDefault();
    setUploadingCompany(true);
    try {
      const formData = new FormData();
      formData.append('name', companyForm.name);
      formData.append('description', companyForm.description);
      formData.append('website', companyForm.website);
      if (companyForm.logo) formData.append('logo', companyForm.logo);
      
      if (company) {
        await api.put('/api/company', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/api/company', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      alert('Company saved successfully');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save company');
    } finally {
      setUploadingCompany(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* User Profile Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">User Profile</h2>
        <form onSubmit={updateProfile} className="space-y-4">
          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
            <div className="flex items-center space-x-4">
              {profilePreview && (
                <img src={profilePreview} alt="Preview" className="h-16 w-16 rounded-full object-cover border" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {uploading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* Employer Company Section */}
      {user?.role === 'employer' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {company ? 'Edit Company' : 'Create Company Profile'}
          </h2>
          <form onSubmit={createOrUpdateCompany} className="space-y-4">
            {/* Company Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
              <div className="flex items-center space-x-4">
                {companyLogoPreview && (
                  <img src={companyLogoPreview} alt="Company Logo Preview" className="h-16 w-16 object-contain border rounded" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCompanyLogoChange}
                  className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={companyForm.name}
                onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={companyForm.description}
                onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                rows="3"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                value={companyForm.website}
                onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={uploadingCompany}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {uploadingCompany ? 'Saving...' : 'Save Company'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}