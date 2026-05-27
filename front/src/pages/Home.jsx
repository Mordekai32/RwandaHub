import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Modern blurred shapes using secondary (cyan) and premium (violet) tints */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-gradient-to-r from-cyan-200/20 to-violet-200/20 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-gradient-to-l from-indigo-100/20 to-cyan-100/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/10 blur-3xl" />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl space-y-6">
          {/* Heading gradient: primary indigo + secondary cyan + premium violet */}
          <h1 className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-violet-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            Find Your Dream Job in Rwanda
          </h1>

          {/* Subtitle with slate-600 */}
          <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl">
            Connecting job seekers with top employers — discover opportunities
            tailored to your future.
          </p>

          {/* CTA button using primary indigo-600, hover indigo-700, with cyan glow on focus */}
          <div className="pt-4">
            <Link
              to="/jobs"
              className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:text-lg"
            >
              Browse Jobs
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-cyan-200"
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

          {/* Trust badge with muted slate-400 */}
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