import { Link } from 'react-router-dom';
import { useState } from 'react';

const translations = {
  en: {
    dashboardTitle: 'Admin Dashboard',
    dashboardSubtitle: 'Manage platform settings and content',
    manageUsersTitle: 'Manage Users',
    manageUsersDesc: 'View and delete platform users',
    approveJobsTitle: 'Approve Jobs',
    approveJobsDesc: 'Review and approve pending job postings',
    analyticsTitle: 'Analytics',
    analyticsDesc: 'View platform statistics and trends',
    manageAction: 'Manage →',
    reviewAction: 'Review →',
    insightsAction: 'Insights →',
  },
  rw: {
    dashboardTitle: 'Ibiro by\'Ubuyobozi',
    dashboardSubtitle: 'Genzura ibigenderwaho na ibirimo bya platform',
    manageUsersTitle: 'Genzura Abakoresha',
    manageUsersDesc: 'Reba kandi ukureho abakoresha platform',
    approveJobsTitle: 'Kwemeza Imirimo',
    approveJobsDesc: 'Suzuma kandi wemeze imirimo itegereje',
    analyticsTitle: 'Ibyigaragaza',
    analyticsDesc: 'Reba imibare n\'ibigereranyo bya platform',
    manageAction: 'Genzura →',
    reviewAction: 'Isuzuma →',
    insightsAction: 'Ibyigaragaza →',
  },
  fr: {
    dashboardTitle: 'Tableau de bord Admin',
    dashboardSubtitle: 'Gérer les paramètres et le contenu de la plateforme',
    manageUsersTitle: 'Gérer les utilisateurs',
    manageUsersDesc: 'Voir et supprimer les utilisateurs de la plateforme',
    approveJobsTitle: 'Approuver les offres',
    approveJobsDesc: 'Examiner et approuver les offres d\'emploi en attente',
    analyticsTitle: 'Analytique',
    analyticsDesc: 'Consulter les statistiques et tendances de la plateforme',
    manageAction: 'Gérer →',
    reviewAction: 'Réviser →',
    insightsAction: 'Aperçus →',
  },
};

export default function AdminDashboard() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-12 px-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header with smooth language selector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent tracking-tight mb-2">
              {t.dashboardTitle}
            </h1>
            <p className="text-slate-300 text-base font-light">
              {t.dashboardSubtitle}
            </p>
          </div>

          {/* Soft segmented language switcher – dark glass variant */}
          <div className="flex p-1 bg-white/5 backdrop-blur-sm rounded-full shadow-sm w-fit mx-auto md:mx-0 border border-white/10">
            {[
              { code: 'en', label: 'EN', flag: '🇬🇧', fullLabel: 'English' },
              { code: 'rw', label: 'RW', flag: '🇷🇼', fullLabel: 'Kinyarwanda' },
              { code: 'fr', label: 'FR', flag: '🇫🇷', fullLabel: 'Français' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  language === lang.code
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="hidden sm:inline">{lang.fullLabel}</span>
                <span className="sm:hidden">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Smooth card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/admin/users"
            className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400 text-2xl">
              👥
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {t.manageUsersTitle}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {t.manageUsersDesc}
            </p>
            <span className="inline-flex items-center text-sm font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
              {t.manageAction}
            </span>
          </Link>

          <Link
            to="/admin/jobs"
            className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400 text-2xl">
              ✅
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {t.approveJobsTitle}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {t.approveJobsDesc}
            </p>
            <span className="inline-flex items-center text-sm font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
              {t.reviewAction}
            </span>
          </Link>

          <Link
            to="/admin/analytics"
            className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 transition-all duration-300 hover:shadow-xl hover:border-emerald-500/30 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400 text-2xl">
              📈
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {t.analyticsTitle}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {t.analyticsDesc}
            </p>
            <span className="inline-flex items-center text-sm font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
              {t.insightsAction}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}