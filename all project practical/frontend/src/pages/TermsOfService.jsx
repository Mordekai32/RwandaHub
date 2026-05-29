import { FaGavel, FaUserCheck, FaFileAlt, FaTrashAlt, FaBalanceScale, FaRegClock } from 'react-icons/fa';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 py-12 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-4 border border-white/10">
            <FaGavel className="text-emerald-400" />
            <span className="text-sm text-slate-300">Terms & Conditions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-slate-300 mt-2">Effective from {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/10">
          <div className="p-6 md:p-8 space-y-6">
            <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/30">
              <p className="text-slate-300">By using JobFinder Rwanda, you agree to these terms. Please read them carefully.</p>
            </div>

            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                  <FaUserCheck className="text-emerald-400" />
                  Eligibility
                </h2>
                <p className="text-slate-300 leading-relaxed">You must be at least 16 years old to use this platform. Employers must represent a legitimate business.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                  <FaFileAlt className="text-emerald-400" />
                  User Responsibilities
                </h2>
                <p className="text-slate-300 leading-relaxed">You agree to provide accurate information, not to misuse the platform (e.g., spam, false job postings), and to respect other users' privacy.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                  <FaBalanceScale className="text-emerald-400" />
                  Content Moderation
                </h2>
                <p className="text-slate-300 leading-relaxed">Admins may remove any job posting, application, or user that violates our policies. We reserve the right to suspend accounts without notice.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                  <FaRegClock className="text-emerald-400" />
                  Job Approval
                </h2>
                <p className="text-slate-300 leading-relaxed">All jobs are reviewed before publication. Approval typically takes 24–48 hours. Rejected jobs can be resubmitted after correction.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                  <FaTrashAlt className="text-emerald-400" />
                  Account Termination
                </h2>
                <p className="text-slate-300 leading-relaxed">You may delete your account anytime. We may terminate accounts for repeated violations or illegal activity.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400">
              <p>For questions, contact <a href="mailto:mordekai893@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition">mordekai893@gmail.com</a>. These terms may be updated; continued use implies acceptance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}