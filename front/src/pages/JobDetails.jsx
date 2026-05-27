import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function JobDetails() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [cvFile, setCvFile] = useState(null)
  const [message, setMessage] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/api/jobs/${id}`)
        setJob(res.data)
      } catch (error) {
        console.error(error)
        navigate('/jobs')
      }
    }
    fetchJob()
  }, [id, navigate])

  const handleApply = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/login')
    if (user.role !== 'jobseeker') return setMessage('Only job seekers can apply')
    if (!cvFile) return setMessage('Please upload your CV (PDF)')
    const formData = new FormData()
    formData.append('cv', cvFile)
    try {
      await api.post(`/api/apply/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setMessage('Application submitted successfully!')
      setCvFile(null)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Application failed')
    }
  }

  if (!job) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
        <p className="text-gray-600 mb-1">{job.company} - {job.location}</p>
        <p className="text-green-600 font-semibold text-xl mb-4">{job.salary?.toLocaleString()} Rwf</p>
        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>
      </div>
      {user?.role === 'jobseeker' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Apply</h3>
          <form onSubmit={handleApply}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Upload CV (PDF)</label>
              <input type="file" accept="application/pdf" onChange={(e) => setCvFile(e.target.files[0])} required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Submit Application</button>
          </form>
          {message && <div className="mt-4 p-3 bg-blue-100 text-blue-700 rounded">{message}</div>}
        </div>
      )}
    </div>
  )
}