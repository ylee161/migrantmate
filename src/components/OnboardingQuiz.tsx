import { useState } from 'react';
import { Globe, User, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import { translations, LanguageCode } from '../translations';

interface OnboardingQuizProps {
  onComplete: (data: UserData, language: LanguageCode) => void;
}

export interface UserData {
  name: string;
  countryOfOrigin: string;
  language: LanguageCode;
}

const COUNTRIES = [
  'Bangladesh',
  'India',
  'China',
  'Myanmar',
  'Philippines',
  'Indonesia',
  'Thailand',
  'Vietnam',
  'Sri Lanka',
  'Malaysia'
];

export function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    countryOfOrigin: '',
    language: 'en'
  });
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const languages = Object.values(translations);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.countryOfOrigin) {
      onComplete(formData, formData.language);
    }
  };

  const isFormValid = formData.name && formData.countryOfOrigin;

  // Get labels based on selected language
  const getLabel = (key: 'name' | 'country' | 'language' | 'submit') => {
    const labels = {
      en: { name: 'Your Name', country: 'Country of Origin', language: 'Preferred Language', submit: 'Get Started' },
      zh: { name: '您的姓名', country: '原籍国', language: '首选语言', submit: '开始' },
      ms: { name: 'Nama Anda', country: 'Negara Asal', language: 'Bahasa Pilihan', submit: 'Mulakan' },
      ta: { name: 'உங்கள் பெயர்', country: 'பிறந்த நாடு', language: 'விருப்ப மொழி', submit: 'தொடங்கு' },
      bn: { name: 'আপনার নাম', country: 'মূল দেশ', language: 'পছন্দের ভাষা', submit: 'শুরু করুন' },
      hi: { name: 'आपका नाम', country: 'मूल देश', language: 'पसंदीदा भाषा', submit: 'शुरू करें' },
      th: { name: 'ชื่อของคุณ', country: 'ประเทศต้นทาง', language: 'ภาษาที่ต้องการ', submit: 'เริ่มต้น' },
      my: { name: 'သင့်အမည်', country: 'မူလနိုင်ငံ', language: 'နှစ်သက်သောဘာသာစကား', submit: 'စတင်ပါ' },
      tl: { name: 'Iyong Pangalan', country: 'Bansang Pinagmulan', language: 'Gustong Wika', submit: 'Magsimula' },
      vi: { name: 'Tên Của Bạn', country: 'Quốc Gia Xuất Xứ', language: 'Ngôn Ngữ Ưa Thích', submit: 'Bắt Đầu' },
      id: { name: 'Nama Anda', country: 'Negara Asal', language: 'Bahasa Pilihan', submit: 'Mulai' }
    };
    return labels[formData.language][key];
  };

  const getPlaceholder = (key: 'name' | 'country') => {
    const placeholders = {
      en: { name: 'Enter your full name', country: 'Select your country' },
      zh: { name: '输入您的全名', country: '选择您的国家' },
      ms: { name: 'Masukkan nama penuh anda', country: 'Pilih negara anda' },
      ta: { name: 'உங்கள் முழு பெயரை உள்ளிடவும்', country: 'உங்கள் நாட்டைத் தேர்ந்தெடுக்கவும்' },
      bn: { name: 'আপনার পুরো নাম লিখুন', country: 'আপনার দেশ নির্বাচন করুন' },
      hi: { name: 'अपना पूरा नाम दर्ज करें', country: 'अपना देश चुनें' },
      th: { name: 'ป้อนชื่อเต็มของคุณ', country: 'เลือกประเทศของคุณ' },
      my: { name: 'သင့်အမည်အပြည့်အစုံ ထည့်ပါ', country: 'သင့်နိုင်ငံကို ရွေးချယ်ပါ' },
      tl: { name: 'Ilagay ang iyong buong pangalan', country: 'Piliin ang iyong bansa' },
      vi: { name: 'Nhập tên đầy đủ của bạn', country: 'Chọn quốc gia của bạn' },
      id: { name: 'Masukkan nama lengkap Anda', country: 'Pilih negara Anda' }
    };
    return placeholders[formData.language][key];
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-900/95 via-rose-900/95 to-green-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 md:p-12 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Welcome!
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
              <User className="w-4 h-4 text-red-600" />
              <span>{getLabel('name')}</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={getPlaceholder('name')}
              className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-400 transition-colors text-base"
              required
            />
          </div>

          {/* Country of Origin Dropdown */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>{getLabel('country')}</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-red-200 rounded-xl hover:border-red-400 transition-all duration-200 text-left"
              >
                <span className={`${formData.countryOfOrigin ? 'text-slate-700' : 'text-slate-400'}`}>
                  {formData.countryOfOrigin || getPlaceholder('country')}
                </span>
                <ChevronDown className={`w-5 h-5 text-red-600 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCountryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-red-200 py-2 max-h-64 overflow-y-auto z-10">
                  {COUNTRIES.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, countryOfOrigin: country });
                        setIsCountryDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors ${
                        formData.countryOfOrigin === country ? 'bg-red-50 border-l-4 border-red-600' : ''
                      }`}
                    >
                      <span className="font-medium text-slate-700">{country}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 mb-2">
              <Globe className="w-4 h-4 text-red-600" />
              <span>{getLabel('language')}</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-red-200 rounded-xl hover:border-red-400 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{translations[formData.language].flag}</span>
                  <span className="font-medium text-slate-700">{translations[formData.language].name}</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-red-600 transition-transform ${isLanguageDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-red-200 py-2 max-h-64 overflow-y-auto z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, language: lang.code as LanguageCode });
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center space-x-3 ${
                        formData.language === lang.code ? 'bg-red-50 border-l-4 border-red-600' : ''
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium text-slate-700">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>{getLabel('submit')}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
