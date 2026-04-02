import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, LogOut } from 'lucide-react';
import { translations, LanguageCode } from '../translations';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

// Native translations for Header component
const headerTranslations: Record<LanguageCode, { signOut: string }> = {
  en: { signOut: 'Sign Out' },
  zh: { signOut: '登出' },
  ms: { signOut: 'Log Keluar' },
  ta: { signOut: 'வெளியேறு' },
  bn: { signOut: 'সাইন আউট' },
  hi: { signOut: 'साइन आउट' },
  th: { signOut: 'ออกจากระบบ' },
  vi: { signOut: 'Đăng Xuất' },
  id: { signOut: 'Keluar' },
  tl: { signOut: 'Mag-sign Out' },
  my: { signOut: 'ထွက်ရန်' }
};

export function Header({ currentLanguage, onLanguageChange }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const languages = Object.values(translations);
  
  const currentLangData = translations[currentLanguage] || translations['en'];
  const t = headerTranslations[currentLanguage] || headerTranslations['en'];

  const handleLanguageSelect = (lang: LanguageCode) => {
    onLanguageChange(lang);
    setIsDropdownOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-16 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center h-full">
          <img 
            src="https://cdn.chatandbuild.com/users/68ecb8e5079de112096e5a52/202510132333transparent-background-logoremix01k7f36kekfbgvzf42wzkjc11x-1760370067617-320685901-1760370067617-47012899.png" 
            alt="Logo" 
            className="h-8 sm:h-full w-auto object-contain cursor-pointer"
            style={{ imageRendering: 'crisp-edges' }}
            onClick={() => navigate('/')}
          />
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">{currentLangData?.flag || '🇬🇧'}</span>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">{currentLangData?.name || 'English'}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-red-100 py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code as LanguageCode)}
                    className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-green-50 transition-all duration-200 flex items-center space-x-3 ${
                      currentLanguage === lang.code ? 'bg-gradient-to-r from-red-50 to-green-50 border-l-4 border-red-600' : ''
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium text-slate-700">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-all duration-200"
            title={t.signOut}
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">{t.signOut}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
