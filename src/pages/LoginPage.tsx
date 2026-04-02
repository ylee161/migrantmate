import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Eye, EyeOff, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { translations, LanguageCode } from '../translations';

interface LoginPageProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

const loginTranslations: Record<LanguageCode, {
  title: string;
  subtitle: string;
  email: string;
  password: string;
  signIn: string;
  noAccount: string;
  signUp: string;
  signingIn: string;
  invalidCredentials: string;
  errorOccurred: string;
}> = {
  en: {
    title: 'Welcome Back',
    subtitle: 'Sign in to your MigrantMate account',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    signingIn: 'Signing in...',
    invalidCredentials: 'Invalid email or password',
    errorOccurred: 'An error occurred. Please try again.'
  },
  zh: {
    title: '欢迎回来',
    subtitle: '登录您的 MigrantMate 账户',
    email: '电子邮件',
    password: '密码',
    signIn: '登录',
    noAccount: '没有账户？',
    signUp: '注册',
    signingIn: '登录中...',
    invalidCredentials: '电子邮件或密码无效',
    errorOccurred: '发生错误。请重试。'
  },
  ms: {
    title: 'Selamat Kembali',
    subtitle: 'Log masuk ke akaun MigrantMate anda',
    email: 'E-mel',
    password: 'Kata Laluan',
    signIn: 'Log Masuk',
    noAccount: 'Tiada akaun?',
    signUp: 'Daftar',
    signingIn: 'Memasuki...',
    invalidCredentials: 'E-mel atau kata laluan tidak sah',
    errorOccurred: 'Ralat berlaku. Sila cuba lagi.'
  },
  ta: {
    title: 'மீண்டும் வரவேற்கிறோம்',
    subtitle: 'உங்கள் MigrantMate கணக்கில் உள்நுழையவும்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    signIn: 'உள்நுழைக',
    noAccount: 'கணக்கு இல்லையா?',
    signUp: 'பதிவு செய்க',
    signingIn: 'உள்நுழைகிறது...',
    invalidCredentials: 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்',
    errorOccurred: 'பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.'
  },
  bn: {
    title: 'স্বাগতম',
    subtitle: 'আপনার MigrantMate অ্যাকাউন্টে সাইন ইন করুন',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    signIn: 'সাইন ইন',
    noAccount: 'অ্যাকাউন্ট নেই?',
    signUp: 'সাইন আপ',
    signingIn: 'সাইন ইন হচ্ছে...',
    invalidCredentials: 'অবৈধ ইমেইল বা পাসওয়ার্ড',
    errorOccurred: 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।'
  },
  hi: {
    title: 'वापसी पर स्वागत है',
    subtitle: 'अपने MigrantMate खाते में साइन इन करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    noAccount: 'खाता नहीं है?',
    signUp: 'साइन अप',
    signingIn: 'साइन इन हो रहा है...',
    invalidCredentials: 'अमान्य ईमेल या पासवर्ड',
    errorOccurred: 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।'
  },
  th: {
    title: 'ยินดีต้อนรับกลับ',
    subtitle: 'เข้าสู่ระบบบัญชี MigrantMate ของคุณ',
    email: 'อีเมล',
    password: 'รหัสผ่าน',
    signIn: 'เข้าสู่ระบบ',
    noAccount: 'ไม่มีบัญชี?',
    signUp: 'สมัครสมาชิก',
    signingIn: 'กำลังเข้าสู่ระบบ...',
    invalidCredentials: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
    errorOccurred: 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง'
  },
  vi: {
    title: 'Chào Mừng Trở Lại',
    subtitle: 'Đăng nhập vào tài khoản MigrantMate của bạn',
    email: 'Email',
    password: 'Mật khẩu',
    signIn: 'Đăng Nhập',
    noAccount: 'Chưa có tài khoản?',
    signUp: 'Đăng Ký',
    signingIn: 'Đang đăng nhập...',
    invalidCredentials: 'Email hoặc mật khẩu không hợp lệ',
    errorOccurred: 'Đã xảy ra lỗi. Vui lòng thử lại.'
  },
  id: {
    title: 'Selamat Datang Kembali',
    subtitle: 'Masuk ke akun MigrantMate Anda',
    email: 'Email',
    password: 'Kata Sandi',
    signIn: 'Masuk',
    noAccount: 'Belum punya akun?',
    signUp: 'Daftar',
    signingIn: 'Masuk...',
    invalidCredentials: 'Email atau kata sandi tidak valid',
    errorOccurred: 'Terjadi kesalahan. Silakan coba lagi.'
  },
  tl: {
    title: 'Maligayang Pagbabalik',
    subtitle: 'Mag-sign in sa iyong MigrantMate account',
    email: 'Email',
    password: 'Password',
    signIn: 'Mag-sign In',
    noAccount: 'Walang account?',
    signUp: 'Mag-sign Up',
    signingIn: 'Nagsa-sign in...',
    invalidCredentials: 'Hindi wastong email o password',
    errorOccurred: 'May naganap na error. Pakisubukan muli.'
  },
  my: {
    title: 'ပြန်လည်ကြိုဆိုပါသည်',
    subtitle: 'သင့် MigrantMate အကောင့်သို့ လော့ဂ်အင်ဝင်ပါ',
    email: 'အီးမေးလ်',
    password: 'စကားဝှက်',
    signIn: 'လော့ဂ်အင်ဝင်ရန်',
    noAccount: 'အကောင့်မရှိဘူးလား?',
    signUp: 'အကောင့်ဖွင့်ရန်',
    signingIn: 'လော့ဂ်အင်ဝင်နေသည်...',
    invalidCredentials: 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မမှန်ကန်ပါ',
    errorOccurred: 'အမှားတစ်ခု ဖြစ်ပွားခဲ့သည်။ ထပ်မံကြိုးစားပါ။'
  }
};

export function LoginPage({ currentLang, onLanguageChange }: LoginPageProps) {
  const t = loginTranslations[currentLang];
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = Object.values(translations);
  const currentLangData = translations[currentLang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError(t.invalidCredentials);
        } else {
          setError(t.errorOccurred);
        }
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(t.errorOccurred);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageSelect = (lang: LanguageCode) => {
    onLanguageChange(lang);
    setIsDropdownOpen(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2952&auto=format&fit=crop)',
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="max-w-md w-full relative z-10">
        {/* White Container Box */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Language Selector */}
          <div className="flex justify-end mb-6">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-cyan-800 rounded-full hover:shadow-md transition-all duration-200"
              >
                <Globe className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium">{currentLangData?.flag || '🇬🇧'}</span>
                <span className="text-sm font-medium text-slate-700">{currentLangData?.name || 'English'}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-red-100 py-2 z-50 max-h-96 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code as LanguageCode)}
                      className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-green-50 transition-all duration-200 flex items-center space-x-3 ${
                        currentLang === lang.code ? 'bg-gradient-to-r from-red-50 to-green-50 border-l-4 border-red-600' : ''
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

          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="https://cdn.chatandbuild.com/users/68ecb8e5079de112096e5a52/202510132333transparent-background-logoremix01k7f36kekfbgvzf42wzkjc11x-1760370067617-320685901-1760370067617-47012899.png"
              alt="MigrantMate Logo"
              className="h-20 w-auto mx-auto mb-4"
              style={{ imageRendering: 'crisp-edges' }}
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h1>
            <p className="text-slate-600">{t.subtitle}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                {t.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.signingIn : t.signIn}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {t.noAccount}{' '}
              <Link to="/signup" className="text-cyan-800 hover:text-cyan-900 font-semibold">
                {t.signUp}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
