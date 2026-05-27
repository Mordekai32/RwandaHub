import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function PostJob() {
  const [form, setForm] = useState({ title: '', location: '', salary: '', description: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/jobs', form);
      setMessageType('success');
      setMessage('Job posted for approval!');
      setTimeout(() => navigate('/employer/jobs'), 2000);
    } catch (err) {
      setMessageType('error');
      setMessage(err.response?.data?.message || 'Error posting job');
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

      <div className="relative max-w-3xl mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-6 md:p-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent mb-6">
            Post a New Job
          </h1>

          {message && (
            <div className={`mb-4 p-3 rounded-lg backdrop-blur-sm ${
              messageType === 'success' 
                ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' 
                : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Job Title</label>
              <input
                type="text"
                placeholder="e.g., Software Engineer"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Location</label>
              <input
                type="text"
                placeholder="e.g., Kigali, Rwanda"
                value={form.location}
                onChange={(e) => setForm({...form, location: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Salary (RWF)</label>
              <input
                type="number"
                placeholder="e.g., 500000"
                value={form.salary}
                onChange={(e) => setForm({...form, salary: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Job Description</label>
              <textarea
                placeholder="Describe the role, responsibilities, and requirements..."
                rows="5"
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold py-2.5 rounded-lg shadow-md shadow-blue-600/20 hover:from-blue-700 hover:to-emerald-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit for Approval
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}