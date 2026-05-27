import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/api/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error(error);
        navigate('/jobs');
      }
    };
    fetchJob();
  }, [id, navigate]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    if (user.role !== 'jobseeker') return setMessage('Only job seekers can apply');
    if (!cvFile) return setMessage('Please upload your CV (PDF)');

    const formData = new FormData();
    formData.append('cv', cvFile);
    try {
      await api.post(`/api/apply/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Application submitted successfully!');
      setCvFile(null);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Application failed');
    }
  };

  if (!job) return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
        <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 border-blue-400 opacity-30"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-8 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Job Information Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
          <p className="text-slate-300 mb-1">
            {job.company} - {job.location}
          </p>
          <p className="text-emerald-400 font-semibold text-xl mb-4">
            {job.salary?.toLocaleString()} Rwf
          </p>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-lg font-semibold text-white">Job Description</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>

        {/* How to Apply Section */}
        <div className="bg-emerald-500/10 backdrop-blur-sm border-l-4 border-emerald-500 rounded-xl p-5 mb-6">
          <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
            📝 How to Apply
          </h3>
          <div className="mt-2 text-slate-300 space-y-2">
            <p>✅ Follow these steps to submit your application:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Prepare your CV in <strong className="text-emerald-300">PDF format</strong> (max 5MB).</li>
              <li>Click the "Choose file" button below.</li>
              <li>Select your CV file.</li>
              <li>Click "Submit Application".</li>
            </ul>
            {job.applicationInstructions && (
              <div className="mt-3 p-2 bg-white/5 rounded border border-white/10">
                <span className="font-semibold text-emerald-300">📢 Employer's note:</span> {job.applicationInstructions}
              </div>
            )}
            {job.applicationEmail && (
              <p className="mt-2">
                ✉️ Or send your CV directly to:{' '}
                <a href={`mailto:${job.applicationEmail}`} className="underline text-emerald-400 hover:text-emerald-300 transition">
                  {job.applicationEmail}
                </a>
              </p>
            )}
            {job.applicationUrl && (
              <p className="mt-2">
                🌐 Apply externally:{' '}
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-emerald-400 hover:text-emerald-300 transition"
                >
                  {job.applicationUrl}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Application Form (only for job seekers) */}
        {user?.role === 'jobseeker' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Apply for this position</h3>
            <form onSubmit={handleApply}>
              <div className="mb-4">
                <label className="block text-slate-300 mb-2 font-medium">
                  Upload your CV (PDF only) *
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setCvFile(e.target.files[0])}
                  required
                  className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/20 file:text-emerald-300 file:border file:border-emerald-500/30 hover:file:bg-emerald-500/30 transition"
                />
                <p className="text-xs text-slate-400 mt-1">Accepted format: PDF, Max size 5MB</p>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-600 transition shadow-md hover:shadow-lg hover:scale-105 transform duration-200"
              >
                Submit Application
              </button>
            </form>
            {message && (
              <div className={`mt-4 p-3 rounded-lg ${message.includes('success') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                {message}
              </div>
            )}
          </div>
        )}

        {/* Message for non-jobseekers */}
        {user && user.role !== 'jobseeker' && (
          <div className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-4 text-yellow-300">
            ⚠️ You are logged in as {user.role}. Only job seekers can apply for this position.
          </div>
        )}
      </div>
    </div>
  );
}