import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* ... same decorative divs ... */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl space-y-6 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
          <h1 className="bg-gradient-to-r from-slate-900 via-[#2563EB] to-[#10B981] bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
            {t('home.title')}
          </h1>
          <div className="flex justify-center"><div className="h-1 w-24 rounded-full bg-[#F59E0B]" /></div>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            {t('home.subtitle')}
          </p>
          <Link to="/jobs" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563EB] to-[#10B981] px-8 py-3 text-white shadow-lg">
            {t('home.browseJobs')}
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <div className="pt-12">
            <div className="flex items-center justify-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                {t('home.trustBadge')}
              </p>
              <div className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}