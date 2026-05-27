import { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function PostJob() {
  const [form, setForm] = useState({ title: '', location: '', salary: '', description: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/jobs', form)
      setMessage('Job posted for approval!')
      setTimeout(() => navigate('/employer/jobs'), 2000)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error posting job')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
        {message && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Job Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
          <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
          <input type="number" placeholder="Salary (RWF)" value={form.salary} onChange={(e) => setForm({...form, salary: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required />
          <textarea placeholder="Job Description" rows="5" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg" required></textarea>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Submit for Approval</button>
        </form>
      </div>
    </div>
  )
}