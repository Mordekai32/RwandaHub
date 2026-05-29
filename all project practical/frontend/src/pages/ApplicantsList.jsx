import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function ApplicantsList() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/api/applications/${jobId}`);
      setApplicants(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load applicants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const updateStatus = async (appId, status) => {
    try {
      // Fixed: removed 'Rwf' typo, using template literal correctly
      await api.patch(`/api/applications/${appId}/status`, { status });
      setApplicants(prev =>
        prev.map(a => (a._id === appId ? { ...a, status } : a))
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Status update failed');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
          <button
            onClick={fetchApplicants}
            className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Applicants for this job</h1>
      {applicants.length === 0 ? (
        <p className="text-gray-500">No applicants yet.</p>
      ) : (
        applicants.map(app => (
          <div key={app._id} className="border rounded-lg p-4 mb-4 shadow-sm">
            <p className="font-semibold">{app.userId?.name || 'Unknown'}</p>
            <p className="text-gray-600">{app.userId?.email}</p>
            <a
              href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${app.cvUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              📄 View CV
            </a>
            <div className="mt-3">
              <label className="mr-2 text-sm font-medium">Status:</label>
              <select
                value={app.status}
                onChange={(e) => updateStatus(app._id, e.target.value)}
                className="border rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accept</option>
                <option value="rejected">Reject</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}