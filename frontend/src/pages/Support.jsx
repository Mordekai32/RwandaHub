import { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaClock, FaHeadset, FaComments, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function Support() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Support form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  const supportOptions = [
    { icon: FaEnvelope, title: 'Email Support', detail: 'mordekai893@gmail.com', action: 'mailto:mordekai893@gmail.com', color: 'from-blue-600 to-emerald-500', btnText: 'Send Email' },
    { icon: FaPhoneAlt, title: 'Phone Support', detail: '+250 796 381 024', action: 'tel:+250796381024', color: 'from-blue-600 to-emerald-500', btnText: 'Call Now' },
    { icon: FaWhatsapp, title: 'WhatsApp', detail: '+250 728 800 993', action: 'https://wa.me/250728800993', color: 'from-blue-600 to-emerald-500', btnText: 'Chat on WhatsApp' }
  ];

  const faqs = [
    { question: 'How to reset password?', answer: 'Click "Forgot Password" on login page, follow email instructions.' },
    { question: 'How to delete account?', answer: 'Contact support with your email address and request deletion.' },
    { question: 'Job posting not showing?', answer: 'It is pending admin approval – wait 24-48 hours.' },
    { question: 'Application status?', answer: 'Check "My Applications" page for real-time updates.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-12 pb-16 px-4">
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-6 border border-white/10">
              <FaHeadset className="text-emerald-400" />
              <span className="text-sm text-slate-300">We're Here to Help</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-emerald-300 to-white bg-clip-text text-transparent mb-4">
              Support Center
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get help with your account, job applications, or any technical issues.
            </p>
          </div>
        </div>

        {/* Support Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/10 hover:border-emerald-500/30 hover:-translate-y-1">
                <div className={`h-2 bg-gradient-to-r ${option.color}`}></div>
                <div className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${option.color} text-white mb-4 shadow-md`}>
                    <option.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{option.title}</h3>
                  <p className="text-slate-300 text-sm mb-4">{option.detail}</p>
                  <a href={option.action} target={option.action.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className={`inline-block px-5 py-2 bg-gradient-to-r ${option.color} text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105`}>
                    {option.btnText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ & Contact Form Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FAQ Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <FaComments className="text-emerald-400 text-xl" />
                <h2 className="text-2xl font-bold text-white">Frequently Asked</h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group border-b border-white/10 pb-3">
                    <summary className="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center">
                      {faq.question}
                      <span className="text-emerald-400 group-open:rotate-180 transition">▼</span>
                    </summary>
                    <p className="text-slate-300 text-sm mt-2 pl-2">{faq.answer}</p>
                  </details>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="/help-center" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition">View all FAQs →</a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <FaPaperPlane className="text-emerald-400 text-xl" />
                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              </div>
              {submitted ? (
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 text-emerald-300 flex items-center gap-2 backdrop-blur-sm">
                  <FaCheckCircle /> Thank you! Our team will respond within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-white/10 rounded-lg px-4 py-2 bg-white/5 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-white/10 rounded-lg px-4 py-2 bg-white/5 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                    <textarea name="message" rows="4" required value={formData.message} onChange={handleChange} className="w-full border border-white/10 rounded-lg px-4 py-2 bg-white/5 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition" />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-2 rounded-lg font-semibold shadow-md shadow-blue-600/20 hover:shadow-lg transition transform hover:scale-[1.02]">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Support Hours */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
            <FaClock className="inline text-emerald-400 mr-2" />
            <span className="text-slate-300">Support hours: Monday–Friday, 8am–5pm (CAT). Responses within 24 hours.</span>
          </div>
        </div>
      </div>
    </div>
  );
}