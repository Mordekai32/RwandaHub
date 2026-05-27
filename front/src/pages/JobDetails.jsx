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

  if (!job) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Job Information Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-gray-600 mb-1">
          {job.company} - {job.location}
        </p>
        <p className="text-green-600 font-semibold text-xl mb-4">
          {job.salary?.toLocaleString()} Rwf
        </p>
        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>
      </div>

      {/* 📌 How to Apply Section - Visible to all users */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5 mb-6">
        <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
          📝 How to Apply
        </h3>
        <div className="mt-2 text-blue-700 space-y-2">
          <p>✅ Follow these steps to submit your application:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Prepare your CV in <strong>PDF format</strong> (max 5MB).</li>
            <li>Click the "Choose file" button below.</li>
            <li>Select your CV file.</li>
            <li>Click "Submit Application".</li>
          </ul>
          {job.applicationInstructions && (
            <div className="mt-3 p-2 bg-white/50 rounded">
              <span className="font-semibold">📢 Employer's note:</span> {job.applicationInstructions}
            </div>
          )}
          {job.applicationEmail && (
            <p className="mt-2">
              ✉️ Or send your CV directly to:{' '}
              <a href={`mailto:${job.applicationEmail}`} className="underline text-blue-600">
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
                className="underline text-blue-600"
              >
                {job.applicationUrl}
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Application Form (only for job seekers) */}
      {user?.role === 'jobseeker' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Apply for this position</h3>
          <form onSubmit={handleApply}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Upload your CV (PDF only) *
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setCvFile(e.target.files[0])}
                required
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-400 mt-1">Accepted format: PDF, Max size 5MB</p>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </form>
          {message && (
            <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded">{message}</div>
          )}
        </div>
      )}

      {/* Message for non-jobseekers */}
      {user && user.role !== 'jobseeker' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
          ⚠️ You are logged in as {user.role}. Only job seekers can apply for this position.
        </div>
      )}
    </div>
  );
}