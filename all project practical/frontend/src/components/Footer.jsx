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

  const quickLinks = [
    { name: 'Find Jobs', path: '/find-jobs' },
    { name: 'Companies', path: '/companies' },
    { name: 'Post a Job', path: '/employer/post' },
    { name: 'About Us', path: '/about' }
  ];

  const resources = [
    { name: 'Help Center', path: '/help-center', icon: FaQuestionCircle },
    { name: 'Career Tips', path: '/career-tips', icon: FaUserFriends },
    { name: 'Blog', path: '/blog', icon: FaBriefcase },
    { name: 'Support', path: '/support', icon: FaShieldAlt }
  ];

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
      <footer className="relative mt-4 bg-[#111827] border-t border-[#374151] overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            {/* Brand column */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-lg shadow-[#2563EB]/30">
                  <FaBriefcase className="text-white text-sm" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  JobFinder Rwanda
                </h2>
              </div>
              <p className="text-[#D1D5DB] text-xs leading-relaxed">
                Bridging talent and opportunity across Rwanda with modern, digital hiring solutions.
              </p>
              <div className="flex items-start gap-2 text-[#D1D5DB] text-xs">
                <HiLocationMarker className="text-[#2563EB] mt-0.5 flex-shrink-0 text-sm" />
                <span>Kigali, Rwanda — Serving the entire nation</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-white mb-2 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#2563EB] rounded-full" />
              </h3>
              <ul className="space-y-1 text-sm">
                {quickLinks.map(({ name, path }) => (
                  <li key={name}>
                    <Link
                      to={path}
                      className="text-[#D1D5DB] hover:text-[#2563EB] transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-1.5 h-1.5 bg-[#2563EB] rounded-full transition-all duration-300" />
                      <span className="group-hover:translate-x-0.5 transition-transform">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-bold text-white mb-2 relative inline-block">
                Resources
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#2563EB] rounded-full" />
              </h3>
              <ul className="space-y-1 text-sm">
                {resources.map(({ name, path, icon: Icon }) => (
                  <li key={name}>
                    <Link
                      to={path}
                      className="text-[#D1D5DB] hover:text-[#2563EB] transition-all duration-300 flex items-center gap-2 group"
                    >
                      <Icon className="text-[#2563EB] group-hover:scale-110 transition-transform" />
                      <span className="group-hover:translate-x-0.5 transition-transform">{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-sm font-bold text-white mb-2 relative inline-block">
                Connect
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-[#2563EB] rounded-full" />
              </h3>
              <div className="space-y-1 mb-3 text-sm">
                {contacts.map(({ href, icon: Icon, text }) => (
                  <a
                    key={href}
                    href={href}
                    className="flex items-center gap-3 text-[#D1D5DB] hover:text-[#2563EB] transition-all duration-300 group"
                  >
                    <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-[#2563EB]/30 transition-all">
                      <Icon size={14} className="text-[#2563EB] group-hover:text-white" />
                    </div>
                    <span className="text-xs group-hover:translate-x-0.5 transition-transform">{text}</span>
                  </a>
                ))}
              </div>
              <div className="flex gap-3">
                {socials.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#2563EB]/30"
                    aria-label={label}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom legal links */}
          <div className="pt-3 mt-1 border-t border-[#374151] flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
            <div className="text-[#D1D5DB] text-center md:text-left">
              © {new Date().getFullYear()} JobFinder Rwanda – Connecting talent with opportunity.
            </div>
            <div className="flex gap-5">
              {legalLinks.map(({ name, path }) => (
                <Link key={name} to={path} className="text-[#D1D5DB] hover:text-[#2563EB] transition-colors">
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3 bg-[#2563EB] text-white rounded-full shadow-lg shadow-[#2563EB]/50 hover:bg-[#1D4ED8] hover:scale-110 transition-all duration-300 group ring-2 ring-white/20"
          aria-label="Back to top"
        >
          <FaArrowUp className="group-hover:-translate-y-1 transition-transform" size={16} />
        </button>
      )}
    </>
  );
}