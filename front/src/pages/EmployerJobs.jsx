import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

export default function EmployerJobs() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    api.get('/api/employer/jobs').then(res => setJobs(res.data)).catch(console.error)
  }, [])

  const deleteJob = async (id) => {
    if (window.confirm('Delete this job?')) {
      await api.delete(`/api/jobs/${id}`)
      setJobs(jobs.filter(j => j._id !== id))
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <Link to="/employer/post" className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Post Job</Link>
      </div>
      {jobs.length === 0 ? <p>No jobs posted.</p> : jobs.map(job => (
        <div key={job._id} className="border rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start">
            <div><h3 className="text-xl font-semibold">{job.title}</h3><p>{job.location} - {job.salary?.toLocaleString()} Rwf</p><span className={`text-sm px-2 py-1 rounded ${job.status === 'approved' ? 'bg-green-100' : 'bg-yellow-100'}`}>{job.status}</span></div>
            <div><Link to={`/employer/applicants/${job._id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Applicants</Link><button onClick={() => deleteJob(job._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button></div>
          </div>
        </div>
      ))}
    </div>
  )
}