import { useState } from 'react';
import { FaSearch, FaQuestionCircle, FaUserPlus, FaBriefcase, FaFileAlt, FaShieldAlt, FaChevronDown, FaChevronUp, FaHeadset, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = [
    { icon: FaUserPlus, name: 'Account & Profile', color: 'from-blue-500 to-blue-600' },
    { icon: FaBriefcase, name: 'Finding Jobs', color: 'from-green-500 to-green-600' },
    { icon: FaFileAlt, name: 'Applications', color: 'from-purple-500 to-purple-600' },
    { icon: FaShieldAlt, name: 'Privacy & Safety', color: 'from-red-500 to-red-600' }
  ];

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click "Register" on the top right, fill in your name, email, password, and select your role (Job Seeker or Employer). Then submit the form. You will receive a confirmation and can log in immediately.'
    },
    {
      question: 'How do I apply for a job?',
      answer: 'Browse jobs on the "Find Jobs" page, click on a job you like, then click "Apply Now". You will need to upload your CV (PDF) and optionally a cover letter. Your application will be sent to the employer.'
    },
    {
      question: 'How do I post a job as an employer?',
      answer: 'First register as an employer, then create your company profile. Once your company is approved (or after you complete the profile), go to "Post a Job" from the dashboard, fill in the job details, and submit. Your job will be reviewed by an admin before publication.'
    },
    {
      question: 'How long does job approval take?',
      answer: 'Admins typically review job postings within 24–48 hours on business days. You will receive an email notification once your job is approved or rejected.'
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Yes, we use encryption and never share your data with third parties without consent. Your CV is only shared with employers you apply to.'
    },
    {
      question: 'Can I withdraw an application?',
      answer: 'Currently, you cannot withdraw an application yourself. Please contact support if you need to retract an application.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-16 px-4">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-6">
            <FaHeadset className="text-indigo-500" />
            <span className="text-sm text-gray-600">Help Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions about using JobFinder Rwanda.
          </p>
          {/* Search Bar */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition cursor-pointer group">
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${cat.color} text-white mb-3 group-hover:scale-110 transition`}>
                <cat.icon className="w-5 h-5" />
              </div>
              <p className="font-medium text-gray-800 text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="text-gray-500 mt-2">Everything you need to know about using our platform</p>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow">
            <FaQuestionCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No results found for "{searchTerm}". Try different keywords.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  {openFaq === idx ? (
                    <FaChevronUp className="text-indigo-500" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 pt-0 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
          <p className="text-indigo-100 mb-6">Our support team is ready to assist you.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:support@jobfinder.rw" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md">
              <FaEnvelope /> mordekai893@gmail.com
            </a>
            <a href="tel:+250796381024" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-lg font-semibold hover:bg-white/30 transition">
              <FaPhoneAlt /> +250 796 381 024
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}