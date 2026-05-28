import { Link } from 'react-router-dom';
import { Shield, User, Package, DollarSign, Key, Ban, Copyright, AlertCircle, Edit, Scale, Mail, ArrowLeft, Globe } from 'lucide-react';

export default function Terms() {
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
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <span>📅 Effective date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span>⚡ Binding agreement</span>
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Content Cards - Modern Neon Glassmorphism */}
        <div className="space-y-6">
          <CardSection 
            icon={<Edit size={20} />}
            title="1. Acceptance of Terms"
            gradient="from-cyan-500/20 to-cyan-600/5"
            border="border-cyan-500/30"
            iconColor="text-cyan-400"
          >
            <p className="text-gray-300">
              By accessing or using RwandaMarket ("the Platform"), you agree to be bound by these Terms of Service. 
              If you do not agree, please do not use our services.
            </p>
          </CardSection>

          <CardSection 
            icon={<User size={20} />}
            title="2. Eligibility"
            gradient="from-fuchsia-500/20 to-fuchsia-600/5"
            border="border-fuchsia-500/30"
            iconColor="text-fuchsia-400"
          >
            <p className="text-gray-300">
              You must be at least 18 years old to use RwandaMarket. By using the Platform, 
              you represent that you meet this requirement and that all information you provide is accurate.
            </p>
          </CardSection>

          <CardSection 
            icon={<Package size={20} />}
            title="3. User Conduct & Listings"
            gradient="from-amber-500/20 to-amber-600/5"
            border="border-amber-500/30"
            iconColor="text-amber-400"
          >
            <ul className="list-disc list-inside space-y-1.5 text-gray-300/90 ml-2">
              <li>All listings must be for legal items and comply with Rwandan laws</li>
              <li>You are responsible for the accuracy of your product descriptions and prices</li>
              <li>Prohibited items: illegal goods, weapons, counterfeit products, hazardous materials</li>
              <li>Do not post false, misleading, or fraudulent listings</li>
              <li>Respect other users – no harassment, hate speech, or spam</li>
            </ul>
          </CardSection>

          <CardSection 
            icon={<DollarSign size={20} />}
            title="4. Transactions & Payments"
            gradient="from-emerald-500/20 to-emerald-600/5"
            border="border-emerald-500/30"
            iconColor="text-emerald-400"
          >
            <p className="mb-3 text-gray-300">
              RwandaMarket is a platform connecting buyers and sellers. We are not a party to any transaction.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-300/90 ml-2">
              <li>Sellers set their own prices and shipping terms</li>
              <li>Buyers and sellers are solely responsible for completing transactions</li>
              <li>We recommend meeting in safe, public locations for in-person exchanges</li>
              <li>RwandaMarket does not handle payments – transactions are between users</li>
            </ul>
          </CardSection>

          <CardSection 
            icon={<Key size={20} />}
            title="5. Account Responsibilities"
            gradient="from-indigo-500/20 to-indigo-600/5"
            border="border-indigo-500/30"
            iconColor="text-indigo-400"
          >
            <ul className="list-disc list-inside space-y-1.5 text-gray-300/90 ml-2">
              <li>You are responsible for maintaining your account credentials' confidentiality</li>
              <li>Notify us immediately of any unauthorized account access</li>
              <li>You are liable for all activities under your account</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
            </ul>
          </CardSection>

          <CardSection 
            icon={<Ban size={20} />}
            title="6. Prohibited Activities"
            gradient="from-rose-500/20 to-rose-600/5"
            border="border-rose-500/30"
            iconColor="text-rose-400"
          >
            <ul className="list-disc list-inside space-y-1.5 text-gray-300/90 ml-2">
              <li>Attempting to hack, disrupt, or overload the Platform</li>
              <li>Scraping data or using bots without permission</li>
              <li>Impersonating another person or entity</li>
              <li>Posting malware, phishing links, or harmful code</li>
            </ul>
          </CardSection>

          <CardSection 
            icon={<Copyright size={20} />}
            title="7. Intellectual Property"
            gradient="from-sky-500/20 to-sky-600/5"
            border="border-sky-500/30"
            iconColor="text-sky-400"
          >
            <p className="text-gray-300">
              All content on RwandaMarket (logos, design, text, graphics) is our property or licensed to us. 
              You may not reproduce, distribute, or create derivative works without permission. 
              User-generated content remains yours, but you grant us a license to display it on the Platform.
            </p>
          </CardSection>

          <CardSection 
            icon={<AlertCircle size={20} />}
            title="8. Disclaimers & Limitation of Liability"
            gradient="from-orange-500/20 to-orange-600/5"
            border="border-orange-500/30"
            iconColor="text-orange-400"
          >
            <p className="mb-3 text-gray-300">
              RwandaMarket is provided "as is" without warranties. We do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-300/90 ml-2">
              <li>The accuracy or reliability of any listing</li>
              <li>That the Platform will be uninterrupted or error-free</li>
              <li>The outcome of any transaction between users</li>
            </ul>
            <p className="mt-3 text-gray-300">
              To the maximum extent permitted by law, RwandaMarket is not liable for any indirect, incidental, 
              or consequential damages arising from your use of the Platform.
            </p>
          </CardSection>

          <CardSection 
            icon={<Edit size={20} />}
            title="9. Modifications to Terms"
            gradient="from-purple-500/20 to-purple-600/5"
            border="border-purple-500/30"
            iconColor="text-purple-400"
          >
            <p className="text-gray-300">
              We may update these Terms from time to time. Continued use of the Platform after changes 
              constitutes acceptance of the revised Terms. Material changes will be notified via email or 
              prominent notice on the site.
            </p>
          </CardSection>

          <CardSection 
            icon={<Scale size={20} />}
            title="10. Governing Law"
            gradient="from-pink-500/20 to-pink-600/5"
            border="border-pink-500/30"
            iconColor="text-pink-400"
          >
            <p className="text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of Rwanda. 
              Any disputes arising under these Terms shall be resolved in the courts of Kigali, Rwanda.
            </p>
          </CardSection>

          <CardSection 
            icon={<Mail size={20} />}
            title="11. Contact Information"
            gradient="from-teal-500/20 to-teal-600/5"
            border="border-teal-500/30"
            iconColor="text-teal-400"
          >
            <p className="text-gray-300 mb-1">
              For questions about these Terms, please contact us:
            </p>
            <a 
              href="mailto:mordekai893@gmail.com" 
              className="text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1 group"
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

// Modern Card Component (same as used in Privacy)
function CardSection({ icon, title, gradient, border, iconColor, children }) {
  return (
    <div className={`group relative bg-gradient-to-br ${gradient} bg-white/5 backdrop-blur-md border ${border} rounded-2xl p-5 md:p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-${iconColor.split('-')[1]}-500/10`}>
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