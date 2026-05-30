import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'rw', label: 'RW', name: 'Kinyarwanda' },
    { code: 'fr', label: 'FR', name: 'Français' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1 text-sm font-medium rounded-full transition ${
            language === lang.code
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
          aria-label={`Switch to ${lang.name}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}