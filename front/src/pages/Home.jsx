import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/60">
      {/* Modern abstract blurred shapes */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-indigo-200/30 to-purple-200/30 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-gradient-to-l from-cyan-200/20 to-blue-200/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/10 blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl space-y-6">
          {/* Modern gradient heading */}
          <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            Find Your Dream Job in Rwanda
          </h1>

          {/* Subheading with soft color */}
          <p className="mx-auto max-w-2xl text-lg text-gray-500 sm:text-xl">
            Connecting job seekers with top employers — discover opportunities
            tailored to your future.
          </p>

          {/* Modern CTA button with hover effects */}
          <div className="pt-4">
            <Link
              to="/jobs"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-lg"
            >
              Browse Jobs
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          {/* Optional modern trust badge */}
          <div className="pt-12">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Trusted by leading companies across Rwanda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}