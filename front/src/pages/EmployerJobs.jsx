import { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router-dom'

export default function EmployerJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'pending', 'approved', 'rejected'

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      setLoading(true)
      const res = await api.get('/api/employer/jobs')
      setJobs(res.data)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  // Delete job
  const deleteJob = async (id) => {
    if (window.confirm('Delete this job? This action cannot be undone.')) {
      try {
        await api.delete(`/api/jobs/${id}`)
        setJobs(jobs.filter(j => j._id !== id))
      } catch (error) {
        console.error('Delete failed:', error)
        alert('Failed to delete job. Please try again.')
      }
    }
  }

  // Duplicate job - using dedicated backend endpoint
  const duplicateJob = async (job) => {
    try {
      const res = await api.post(`/api/employer/jobs/${job._id}/duplicate`)
      setJobs([res.data, ...jobs])
      alert('Job duplicated successfully!')
    } catch (error) {
      console.error('Duplicate failed:', error)
      alert(error.response?.data?.message || 'Failed to duplicate job.')
    }
  }

  // Filter jobs by status
  const filteredJobs = filterStatus === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === filterStatus)

  // Status badge colors
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      closed: 'bg-gray-100 text-gray-800'
    }
    return styles[status] || 'bg-gray-100'
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Manage Jobs</h1>
        <div className="flex gap-3">
          <Link 
            to="/employer/post" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Post New Job
          </Link>
          <button 
            onClick={fetchJobs} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'approved', 'rejected', 'closed'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No jobs found.</p>
          <Link to="/employer/post" className="text-blue-600 hover:underline">
            Post your first job →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div key={job._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Job Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {job.location} • {job.salary?.toLocaleString()} Rwf
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className={`text-sm px-2 py-1 rounded capitalize ${getStatusBadge(job.status)}`}>
                      {job.status}
                    </span>
                    {job.applicationsCount !== undefined && (
                      <span className="text-sm text-gray-500">
                        📋 {job.applicationsCount} applicant{job.applicationsCount !== 1 ? 's' : ''}
                      </span>
                    )}
                    {job.createdAt && (
                      <span className="text-sm text-gray-400">
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 items-start">
                  <Link
                    to={`/employer/applicants/${job._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    View Applicants
                  </Link>
                  <Link
                    to={`/employer/edit-job/${job._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => duplicateJob(job)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Count Summary */}
      <div className="mt-6 text-sm text-gray-500 border-t pt-4">
        Showing {filteredJobs.length} of {jobs.length} total jobs
      </div>
    </div>
  )
}