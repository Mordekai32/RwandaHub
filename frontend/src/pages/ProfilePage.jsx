import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ name: user.name, phone: user.phone, location: user.location });
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/users/profile', form);
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Update failed');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      await API.post('/users/profile/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      window.location.reload();
    } catch (err) {
      setMessage('Image upload failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
        
        <div className="flex flex-col items-center mb-6">
          <img src={user.profileImage || 'https://via.placeholder.com/100'} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
          <label className="bg-gray-200 px-4 py-1 rounded cursor-pointer text-sm">
            Change Photo
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location</label>
            <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Profile</button>
        </form>
        <button onClick={logout} className="mt-4 text-red-600">Logout</button>
      </div>
    </div>
  );
}