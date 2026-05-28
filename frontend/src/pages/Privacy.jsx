import { Link } from 'react-router-dom';
import { Shield, Database, Share2, Cookie, Lock, Mail, Globe, ArrowLeft, Sparkles } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F1C] via-[#1A103C] to-[#0F172A] text-gray-200">
      {/* Animated glowing orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative container mx-auto px-4 py-6 md:py-10 max-w-4xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 group bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-sm bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
            <Globe size={14} />
            <span>RwandaMarket</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 backdrop-blur-md rounded-2xl mb-5 border border-white/10">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <span>📅 Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span>⚡ Effective immediately</span>
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Content Cards - Modern Neon Glassmorphism */}
        <div className="space-y-6">
          <CardSection 
            icon={<Database size={20} />}
            title="1. Information We Collect"
            gradient="from-cyan-500/20 to-cyan-600/5"
            border="border-cyan-500/30"
            iconColor="text-cyan-400"
            glow="shadow-cyan-500/10"
          >
            <p className="mb-3 text-gray-300">We collect information you provide directly to us, such as:</p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-300/90 ml-2">
              <li>Account information (name, email, phone number)</li>
              <li>Profile data and preferences</li>
              <li>Listing details when you post products</li>
              <li>Transaction and communication history</li>
            </ul>
          </CardSection>

          <CardSection 
            icon={<Share2 size={20} />}
            title="2. How We Use Your Information"
            gradient="from-fuchsia-500/20 to-fuchsia-600/5"
            border="border-fuchsia-500/30"
            iconColor="text-fuchsia-400"
            glow="shadow-fuchsia-500/10"
          >
            <ul className="list-disc list-inside space-y-1.5 text-gray-300/90 ml-2">
              <li>Operate and maintain RwandaMarket platform</li>
              <li>Process transactions and verify listings</li>
              <li>Communicate with you about your account or listings</li>
              <li>Improve our services and prevent fraud</li>
              <li>Send important updates and promotional offers (with consent)</li>
            </ul>
          </CardSection>

          <CardSection 
            icon={<Lock size={20} />}
            title="3. Information Sharing"
            gradient="from-amber-500/20 to-amber-600/5"
            border="border-amber-500/30"
            iconColor="text-amber-400"
            glow="shadow-amber-500/10"
          >
            <p className="mb-3 text-gray-300">We do not sell your personal data. We may share information:</p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-300/90 ml-2">
              <li>With your consent or at your direction</li>
              <li>To comply with legal obligations</li>
              <li>With service providers who assist our operations</li>
              <li>To protect rights, property, or safety of RwandaMarket and users</li>
            </ul>
          </CardSection>

          <CardSection 
            icon={<Cookie size={20} />}
            title="4. Cookies & Tracking"
            gradient="from-emerald-500/20 to-emerald-600/5"
            border="border-emerald-500/30"
            iconColor="text-emerald-400"
            glow="shadow-emerald-500/10"
          >
            <p className="text-gray-300">
              We use cookies to enhance your experience, remember preferences, and analyze site traffic. 
              You can control cookie settings through your browser.
            </p>
          </CardSection>

          <CardSection 
            icon={<Shield size={20} />}
            title="5. Data Security"
            gradient="from-indigo-500/20 to-indigo-600/5"
            border="border-indigo-500/30"
            iconColor="text-indigo-400"
            glow="shadow-indigo-500/10"
          >
            <p className="text-gray-300">
              We implement industry-standard security measures to protect your data. However, 
              no method of transmission over the internet is 100% secure.
            </p>
          </CardSection>

          <CardSection 
            icon={<Globe size={20} />}
            title="6. Your Rights (Rwandan & GDPR)"
            gradient="from-rose-500/20 to-rose-600/5"
            border="border-rose-500/30"
            iconColor="text-rose-400"
            glow="shadow-rose-500/10"
          >
            <ul className="list-disc list-inside space-y-1.5 text-gray-300/90 ml-2">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Request data portability</li>
              <li>Lodge a complaint with data protection authorities</li>
            </ul>
          </CardSection>

          <CardSection 
            icon={<Mail size={20} />}
            title="7. Contact Us"
            gradient="from-sky-500/20 to-sky-600/5"
            border="border-sky-500/30"
            iconColor="text-sky-400"
            glow="shadow-sky-500/10"
          >
            <p className="text-gray-300 mb-1">
              For privacy questions or requests, contact us at:
            </p>
            <a 
              href="mailto:mordekai893@gmail.com" 
              className="text-sky-400 hover:text-sky-300 transition-colors inline-flex items-center gap-1 group"
            >
              mordekai893@gmail.com
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
            <p className="text-gray-400 text-sm mt-3">
              📍 Kigali, Rwanda | 📞 +250 796 381 024
            </p>
          </CardSection>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-gray-500 text-xs flex justify-between items-center">
          
          <div className="flex gap-3">
            <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
            <span className="w-1 h-1 bg-fuchsia-400 rounded-full"></span>
            <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modern Card Component with adjustable accents
function CardSection({ icon, title, gradient, border, iconColor, glow, children }) {
  return (
    <div className={`group relative bg-gradient-to-br ${gradient} bg-white/5 backdrop-blur-md border ${border} rounded-2xl p-5 md:p-6 transition-all duration-300 hover:scale-[1.01] hover:${glow} hover:shadow-xl`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2.5">
        <div className={`p-1.5 rounded-xl bg-white/10 ${iconColor}`}>
          {icon}
        </div>
        {title}
      </h2>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}