import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen">
      {/* Global header with language switcher */}
      <header className="fixed top-0 left-0 right-0 z-20 flex justify-end items-center px-6 py-4 bg-white/30 backdrop-blur-md border-b border-white/30">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-semibold text-slate-700 hover:text-[#2563EB] transition">
            Home
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main content - add pt-16 to avoid overlap with fixed header */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}