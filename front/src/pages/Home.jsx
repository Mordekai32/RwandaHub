import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-[#111827] mb-4">Find Your Dream Job in Rwanda</h1>
        <p className="text-xl text-[#6B7280] mb-8">Connecting job seekers with top employers</p>
        <Link to="/jobs" className="bg-[#2563EB] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#1D4ED8]">
          Browse Jobs
        </Link>
      </div>
    </div>
  )
}