import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'

export default function ApplicantsList() {
  const { jobId } = useParams()
  const [applicants, setApplicants] = useState([])

  useEffect(() => {
    api.get(`/api/applications/${jobId}`).then(res => setApplicants(res.data)).catch(console.error)
  }, [jobId])

  const updateStatus = async (appId, status) => {
    await api.patch(`/api/applications/Rwf{appId}/status`, { status })
    setApplicants(applicants.map(a => a._id === appId ? { ...a, status } : a))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Applicants</h1>
      {applicants.map(app => (
        <div key={app._id} className="border rounded-lg p-4 mb-4">
          <p><strong>{app.userId?.name}</strong> - {app.userId?.email}</p>
          <a href={`http://localhost:5000${app.cvUrl}`} target="_blank" className="text-blue-600">View CV</a>
          <div className="mt-2">
            <select value={app.status} onChange={(e) => updateStatus(app._id, e.target.value)} className="border rounded px-2 py-1">
              <option value="pending">Pending</option>
              <option value="accepted">Accept</option>
              <option value="rejected">Reject</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  )
}