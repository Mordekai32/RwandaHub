import { FaShieldAlt, FaUserSecret, FaDatabase, FaCookie, FaEnvelope, FaFileContract } from 'react-icons/fa';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-4">
            <FaShieldAlt className="text-indigo-500" />
            <span className="text-sm text-gray-600">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8 space-y-6">
            {/* Summary */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
              <div className="flex items-start gap-3">
                <FaUserSecret className="text-indigo-500 text-xl mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Your Privacy Matters</h2>
                  <p className="text-gray-600 text-sm">We are committed to protecting your personal information and being transparent about how we use it.</p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaDatabase className="text-indigo-500" />
                  Information We Collect
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We collect personal information you provide directly, such as your name, email address, CV/resume, and profile information when you register or apply for jobs. We also collect usage data (e.g., pages visited, job applications) to improve our service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaCookie className="text-indigo-500" />
                  How We Use Your Information
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Your data is used to facilitate job applications, personalize your experience, communicate with you, and improve JobFinder Rwanda. We never sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaFileContract className="text-indigo-500" />
                  Data Sharing & Disclosure
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We share your information only with employers you apply to (your CV and application details). We may disclose data if required by law or to protect our rights. Third‑party service providers (e.g., hosting, analytics) may access data under strict confidentiality.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaShieldAlt className="text-indigo-500" />
                  Data Security
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We use encryption, secure servers, and regular backups to protect your data. However, no internet transmission is 100% secure; please use strong passwords and log out after each session.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaEnvelope className="text-indigo-500" />
                  Your Rights
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  You may access, correct, or delete your account and personal data by contacting us at <a href="mailto:support@jobfinder.rw" className="text-indigo-600 hover:underline">support@jobfinder.rw</a>. You can also opt out of non‑essential communications.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
              <p>JobFinder Rwanda is operated by Mordekai Ukobukeye. For any privacy concerns, email <strong>mordekai893@gmail.com</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}