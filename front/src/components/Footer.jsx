import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { FaPhone, FaWhatsapp, FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaBriefcase, FaUserFriends, FaQuestionCircle, FaShieldAlt, FaArrowUp } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Quick links with their corresponding routes
  const quickLinks = [
    { name: 'Find Jobs', path: '/find-jobs' },
    { name: 'Companies', path: '/companies' },
    { name: 'Post a Job', path: '/employer/post' },
    { name: 'About Us', path: '/about' }
  ];

  // Resources with routes (assuming you have created these pages)
  const resources = [
    { name: 'Help Center', path: '/help-center', icon: FaQuestionCircle },
    { name: 'Career Tips', path: '/career-tips', icon: FaUserFriends },
    { name: 'Blog', path: '/blog', icon: FaBriefcase },
    { name: 'Support', path: '/support', icon: FaShieldAlt }
  ];

  // Legal links for footer bottom
  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookie-policy' }
  ];

  const contacts = [
    { href: 'mailto:mordekai893@gmail.com', icon: MdEmail, text: 'mordekai893@gmail.com' },
    { href: 'tel:+250796381024', icon: FaPhone, text: '+250 796 381 024' },
    { href: 'tel:+250728800993', icon: FaWhatsapp, text: '+250 728 800 993' }
  ];

  const socials = [
    { href: 'https://instagram.com/blaise_320', icon: FaInstagram, label: 'Instagram' },
    { href: 'https://twitter.com/mordekai668896', icon: FaTwitter, label: 'Twitter' },
    { href: 'https://linkedin.com/in/ukobukeye-mordekai', icon: FaLinkedin, label: 'LinkedIn' },
    { href: 'https://github.com/Mordekai32', icon: FaGithub, label: 'GitHub' }
  ];

  return (
    <>
      <footer className="relative mt-4 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800/50 overflow-hidden">
        {/* Animated background blobs with modern blue/emerald */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-500/5 to-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-slate-700/10 to-blue-600/0 blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
            {/* Brand column */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <FaBriefcase className="text-white text-xs" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-slate-200 to-blue-400 bg-clip-text text-transparent">
                  JobFinder Rwanda
                </h2>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Bridging talent and opportunity across Rwanda with modern, digital hiring solutions.
              </p>
              <div className="flex items-start gap-2 text-slate-400 text-xs">
                <HiLocationMarker className="text-blue-400 mt-0.5 flex-shrink-0 text-sm" />
                <span>Kigali, Rwanda — Serving the entire nation</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base font-semibold text-slate-200 mb-2 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
              </h3>
              <ul className="space-y-1 text-sm">
                {quickLinks.map(({ name, path }) => (
                  <li key={name}>
                    <Link
                      to={path}
                      className="text-slate-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-1 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-300" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-base font-semibold text-slate-200 mb-2 relative inline-block">
                Resources
                <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
              </h3>
              <ul className="space-y-1 text-sm">
                {resources.map(({ name, path, icon: Icon }) => (
                  <li key={name}>
                    <Link
                      to={path}
                      className="text-slate-400 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <Icon className="text-xs group-hover:scale-110 transition-transform" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-base font-semibold text-slate-200 mb-2 relative inline-block">
                Connect
                <span className="absolute -bottom-1 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
              </h3>
              <div className="space-y-1 mb-2 text-sm">
                {contacts.map(({ href, icon: Icon, text }) => (
                  <a
                    key={href}
                    href={href}
                    className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-all duration-300 group"
                  >
                    <div className="p-1 rounded-lg bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors">
                      <Icon size={14} className="text-blue-400" />
                    </div>
                    <span className="text-xs">{text}</span>
                  </a>
                ))}
              </div>
              <div className="flex gap-2">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-xl bg-slate-800 text-blue-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/20"
                    aria-label={label}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom legal links */}
          <div className="pt-3 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
            <div className="text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} JobFinder Rwanda – Connecting talent with opportunity.
            </div>
            <div className="flex gap-5">
              {legalLinks.map(({ name, path }) => (
                <Link key={name} to={path} className="text-slate-400 hover:text-blue-400 transition-colors">
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-600/5 via-transparent to-transparent" />
      </footer>

      {/* Back to top button with modern gradient */}
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-2 bg-gradient-to-br from-blue-600 to-emerald-500 text-white rounded-full shadow-lg shadow-blue-600/30 hover:scale-110 transition-all duration-300 group"
          aria-label="Back to top"
        >
          <FaArrowUp className="group-hover:-translate-y-0.5 transition-transform" size={14} />
        </button>
      )}
    </>
  );
}