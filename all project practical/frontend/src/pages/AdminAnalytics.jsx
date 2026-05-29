import { useEffect, useState } from 'react';
import api from '../api/axios';

// Simple chart component using SVG (no external dependencies)
const SimpleBarChart = ({ data, title, color }) => {
  if (!data || data.length === 0) return null;
  
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
      <h4 className="text-sm font-medium text-slate-300 mb-4">{title}</h4>
      <div className="flex items-end space-x-2 h-40">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full rounded-t transition-all duration-500"
              style={{
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: color,
                minHeight: '4px'
              }}
            />
            <span className="text-xs text-slate-400 mt-2 truncate w-full text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Stat Card Component (dark themed)
const StatCard = ({ title, value, icon, color, subtitle, isLoading, error }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 transition-all hover:shadow-md hover:border-emerald-500/30">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-300">{title}</p>
          {isLoading ? (
            <div className="h-9 w-24 bg-white/10 rounded animate-pulse mt-2"></div>
          ) : error ? (
            <p className="text-sm text-red-400 mt-2">Unavailable</p>
          ) : (
            <>
              <p className="text-3xl font-bold text-white mt-2">{value.toLocaleString()}</p>
              {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
            </>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-500/20`}>
          <svg className={`h-6 w-6 text-${color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon === 'users' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            )}
            {icon === 'jobs' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            )}
            {icon === 'pending' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    users: null,
    jobs: null,
    pendingJobs: null,
    activeJobs: null
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setErrors({});
    
    try {
      const results = await Promise.allSettled([
        api.get('/api/admin/users'),
        api.get('/api/jobs'),
        api.get('/api/admin/jobs/pending')
      ]);
      
      const newStats = {};
      const newErrors = {};
      
      if (results[0].status === 'fulfilled') {
        newStats.users = results[0].value.data.length;
      } else {
        newErrors.users = results[0].reason?.message;
      }
      
      if (results[1].status === 'fulfilled') {
        const allJobs = results[1].value.data;
        newStats.jobs = allJobs.length;
        newStats.activeJobs = allJobs.filter(job => !job.status || job.status === 'approved').length;
      } else {
        newErrors.jobs = results[1].reason?.message;
      }
      
      if (results[2].status === 'fulfilled') {
        newStats.pendingJobs = results[2].value.data.length;
      } else {
        newErrors.pendingJobs = results[2].reason?.message;
      }
      
      setStats(newStats);
      setErrors(newErrors);
      
      setMonthlyData([
        { label: 'Jan', value: 45 },
        { label: 'Feb', value: 52 },
        { label: 'Mar', value: 61 },
        { label: 'Apr', value: 58 },
        { label: 'May', value: 74 },
        { label: 'Jun', value: 89 },
        { label: 'Jul', value: 95 }
      ]);
      
    } catch (err) {
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading && Object.values(stats).every(v => v === null)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 border-blue-400 opacity-30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-12 px-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent">
            Platform Analytics
          </h1>
          <p className="text-slate-300 mt-2">Overview of your platform's performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Users" 
            value={stats.users ?? 0} 
            icon="users" 
            color="blue"
            subtitle="Registered accounts"
            isLoading={stats.users === null && loading}
            error={errors.users}
          />
          <StatCard 
            title="Total Jobs" 
            value={stats.jobs ?? 0} 
            icon="jobs" 
            color="green"
            subtitle={stats.activeJobs !== null ? `${stats.activeJobs} active listings` : '...'}
            isLoading={stats.jobs === null && loading}
            error={errors.jobs}
          />
          <StatCard 
            title="Pending Review" 
            value={stats.pendingJobs ?? 0} 
            icon="pending" 
            color="orange"
            subtitle="Jobs awaiting approval"
            isLoading={stats.pendingJobs === null && loading}
            error={errors.pendingJobs}
          />
        </div>

        {/* Error summary if any API failed */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-yellow-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-yellow-300">Partial data loaded</h4>
                <p className="text-sm text-yellow-300/80 mt-1">
                  Some metrics could not be loaded. Check your backend endpoints:
                </p>
                <ul className="list-disc list-inside text-sm text-yellow-300/80 mt-2">
                  {errors.users && <li>Users API: <code className="bg-yellow-500/20 px-1 rounded">/api/admin/users</code></li>}
                  {errors.jobs && <li>Jobs API: <code className="bg-yellow-500/20 px-1 rounded">/api/jobs</code></li>}
                  {errors.pendingJobs && <li>Pending jobs API: <code className="bg-yellow-500/20 px-1 rounded">/api/admin/jobs/pending</code></li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Chart Section */}
        <div className="mb-8">
          <SimpleBarChart 
            data={monthlyData} 
            title="Job Postings Per Month" 
            color="#3b82f6"
          />
        </div>

        {/* Additional Insights (placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Employers</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Tech Corp</span>
                <span className="text-sm font-medium text-slate-400">24 jobs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Innovate Inc</span>
                <span className="text-sm font-medium text-slate-400">18 jobs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Global Solutions</span>
                <span className="text-sm font-medium text-slate-400">12 jobs</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                <span className="text-slate-300">New user registered</span>
                <span className="ml-auto text-slate-400">2 min ago</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-slate-300">Job application submitted</span>
                <span className="ml-auto text-slate-400">15 min ago</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                <span className="text-slate-300">New job pending approval</span>
                <span className="ml-auto text-slate-400">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Refresh button */}
        <div className="mt-8 text-right">
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition border border-emerald-500/30 disabled:opacity-50"
          >
            <svg className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </div>
  );
}