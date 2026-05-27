import { Link } from 'react-router-dom';

export default function FindJobs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Find Jobs</h1>
        <p className="text-slate-600 dark:text-slate-300">Browse all available job opportunities in Rwanda.</p>
        <div className="mt-8 grid gap-4">
          {/* Job listing component would go here – reuse JobList */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">Job list placeholder</div>
        </div>
      </div>
    </div>
  );
}