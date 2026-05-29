import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-[#999999] relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF6A00] via-[#FF6A00] to-transparent"></div>

      <div className="container mx-auto px-4 py-4 md:py-5">
        {/* Main footer grid - reduced gap and spacing */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">
              Rwanda<span className="text-[#FF6A00]">Market</span>
            </h3>
            <p className="text-[#999999] text-xs leading-relaxed">
              Rwanda's trusted online marketplace. Buy and sell safely.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-2 relative inline-block after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-5 after:h-0.5 after:bg-[#FF6A00]">
              Quick Links
            </h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/" className="text-[#999999] hover:text-[#FF6A00] transition-colors">Home</Link></li>
              <li><Link to="/" className="text-[#999999] hover:text-[#FF6A00] transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-2 relative inline-block after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-5 after:h-0.5 after:bg-[#FF6A00]">
              Categories
            </h4>
            <ul className="space-y-1 text-xs">
              <li><Link to="/?category=Phones" className="text-[#999999] hover:text-[#FF6A00] transition-colors">📱 Phones</Link></li>
              <li><Link to="/?category=Cars" className="text-[#999999] hover:text-[#FF6A00] transition-colors">🚗 Cars</Link></li>
              <li><Link to="/?category=Clothes" className="text-[#999999] hover:text-[#FF6A00] transition-colors">👕 Clothes</Link></li>
              <li><Link to="/?category=Electronics" className="text-[#999999] hover:text-[#FF6A00] transition-colors">💻 Electronics</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xs font-semibold text-white mb-2 relative inline-block after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-5 after:h-0.5 after:bg-[#FF6A00]">
              Connect
            </h4>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start gap-1.5">
                <span className="text-[#FF6A00]">📍</span>
                <span className="text-[#999999]">Kigali, Rwanda</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#FF6A00]">📞</span>
                <div className="flex flex-col">
                  <span className="text-[#999999]">+250 796 381 024</span>
                  <span className="text-[#777777] text-[10px]">+250 728 800 993</span>
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#FF6A00]">✉️</span>
                <a href="mailto:mordekai893@gmail.com" className="text-[#999999] hover:text-[#FF6A00] transition-colors">mordekai893@gmail.com</a>
              </li>
            </ul>

            <div className="mt-2">
              <p className="text-[#777777] text-[10px] uppercase tracking-wider mb-1">Follow us</p>
              <div className="flex gap-2">
                <a 
                  href="https://instagram.com/blaise_320" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-[#FF6A00] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a 
                  href="https://mordekai.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#999999] hover:text-[#FF6A00] transition-colors"
                  aria-label="Portfolio"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - reduced top margin and padding */}
        <div className="border-t border-[#333333] mt-4 pt-3 flex flex-col md:flex-row justify-between items-center gap-1 text-center text-[#777777] text-[10px]">
          <p>© {new Date().getFullYear()} Rwanda Marketplace</p>
          <p className="flex items-center gap-1">
            Built with ❤️ by 
            <a href="https://mordekai.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#999999] hover:text-[#FF6A00] transition-colors">Mordekai</a>
          </p>
          <div className="flex gap-2">
            <Link to="/privacy" className="hover:text-[#FF6A00] transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[#FF6A00] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}