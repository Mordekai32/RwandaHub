import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Glassmorphic blurred shapes — bold but restrained */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-blue-500/15 to-emerald-500/15 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-gradient-to-l from-slate-400/20 to-blue-400/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-emerald-500/5 via-transparent to-blue-500/5 blur-3xl" />

      {/* Glassmorphic card container — subtle backdrop blur */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl space-y-6 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm sm:p-12">
          {/* Bold gradient heading — slate-900 → blue-600 → emerald-500 */}
          <h1 className="bg-gradient-to-r from-slate-900 via-blue-600 to-emerald-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            Find Your Dream Job in Rwanda
          </h1>

          {/* Subheading with slate-600 — clean readability */}
          <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl">
            Connecting job seekers with top employers — discover opportunities
            tailored to your future.
          </p>

          {/* Bold CTA button with glassmorphism + vibrant gradient */}
          <div className="pt-4">
            <Link
              to="/jobs"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-emerald-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-lg"
            >
              Browse Jobs
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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

          {/* Trust badge — restrained muted text */}
          <div className="pt-12">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Trusted by leading companies across Rwanda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}