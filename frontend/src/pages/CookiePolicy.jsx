import { FaCookieBite, FaCookie, FaCheckCircle, FaWrench, FaUserCog } from 'react-icons/fa';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-4">
            <FaCookieBite className="text-indigo-500" />
            <span className="text-sm text-gray-600">Cookie Notice</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8 space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-200">
              <div className="flex items-start gap-3">
                <FaCookie className="text-amber-600 text-xl" />
                <p className="text-gray-700">This website uses cookies to enhance your browsing experience and analyze site traffic.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaCookieBite className="text-indigo-500" />
                  What Are Cookies?
                </h2>
                <p className="text-gray-600 leading-relaxed">Cookies are small text files stored on your device that help websites remember your preferences and actions.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaWrench className="text-indigo-500" />
                  How We Use Cookies
                </h2>
                <p className="text-gray-600 leading-relaxed">We use essential cookies (login sessions, security), functional cookies (remember filters), and analytics cookies (page visits, clicks) via tools like Google Analytics.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaUserCog className="text-indigo-500" />
                  Managing Cookies
                </h2>
                <p className="text-gray-600 leading-relaxed">You can disable cookies in your browser settings (e.g., Chrome, Firefox, Edge). However, some features (like staying logged in) may not work properly.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <FaCheckCircle className="text-indigo-500" />
                  Third-Party Cookies
                </h2>
                <p className="text-gray-600 leading-relaxed">We may embed content from YouTube, LinkedIn, or other platforms that set their own cookies. We do not control those.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
              <p>By continuing to use JobFinder Rwanda, you consent to our use of cookies as described.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}