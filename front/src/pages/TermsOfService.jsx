import { FaGavel, FaUserCheck, FaFileAlt, FaTrashAlt, FaBalanceScale, FaRegClock } from 'react-icons/fa';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-4">
            <FaGavel className="text-indigo-500" />
            <span className="text-sm text-gray-600">Terms & Conditions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-600 mt-2">Effective from {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8 space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
              <p className="text-gray-700">By using JobFinder Rwanda, you agree to these terms. Please read them carefully.</p>
            </div>

            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaUserCheck className="text-indigo-500" />
                  Eligibility
                </h2>
                <p className="text-gray-600 leading-relaxed">You must be at least 16 years old to use this platform. Employers must represent a legitimate business.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaFileAlt className="text-indigo-500" />
                  User Responsibilities
                </h2>
                <p className="text-gray-600 leading-relaxed">You agree to provide accurate information, not to misuse the platform (e.g., spam, false job postings), and to respect other users' privacy.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaBalanceScale className="text-indigo-500" />
                  Content Moderation
                </h2>
                <p className="text-gray-600 leading-relaxed">Admins may remove any job posting, application, or user that violates our policies. We reserve the right to suspend accounts without notice.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaRegClock className="text-indigo-500" />
                  Job Approval
                </h2>
                <p className="text-gray-600 leading-relaxed">All jobs are reviewed before publication. Approval typically takes 24–48 hours. Rejected jobs can be resubmitted after correction.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaTrashAlt className="text-indigo-500" />
                  Account Termination
                </h2>
                <p className="text-gray-600 leading-relaxed">You may delete your account anytime. We may terminate accounts for repeated violations or illegal activity.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
              <p>For questions, contact <a href="mailto:mordekai893@gmail.com" className="text-indigo-600">mordekai893@gmail.com</a>. These terms may be updated; continued use implies acceptance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}