import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Eye, EyeOff, CheckCircle, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { translations, LanguageCode } from '../translations';

interface SignupPageProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

const signupTranslations: Record<LanguageCode, {
  title: string;
  subtitle: string;
  email: string;
  password: string;
  confirmPassword: string;
  signUp: string;
  haveAccount: string;
  signIn: string;
  signingUp: string;
  passwordMismatch: string;
  passwordTooShort: string;
  errorOccurred: string;
  successTitle: string;
  successMessage: string;
}> = {
  en: {
    title: 'Create Account',
    subtitle: 'Join MigrantMate today',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    signUp: 'Sign Up',
    haveAccount: 'Already have an account?',
    signIn: 'Sign In',
    signingUp: 'Creating account...',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 6 characters',
    errorOccurred: 'An error occurred. Please try again.',
    successTitle: 'Account Created!',
    successMessage: 'You can now sign in with your credentials.'
  },
  zh: {
    title: '创建账户',
    subtitle: '立即加入 MigrantMate',
    email: '电子邮件',
    password: '密码',
    confirmPassword: '确认密码',
    signUp: '注册',
    haveAccount: '已有账户？',
    signIn: '登录',
    signingUp: '创建账户中...',
    passwordMismatch: '密码不匹配',
    passwordTooShort: '密码必须至少6个字符',
    errorOccurred: '发生错误。请重试。',
    successTitle: '账户已创建！',
    successMessage: '您现在可以使用您的凭据登录。'
  },
  ms: {
    title: 'Buat Akaun',
    subtitle: 'Sertai MigrantMate hari ini',
    email: 'E-mel',
    password: 'Kata Laluan',
    confirmPassword: 'Sahkan Kata Laluan',
    signUp: 'Daftar',
    haveAccount: 'Sudah ada akaun?',
    signIn: 'Log Masuk',
    signingUp: 'Membuat akaun...',
    passwordMismatch: 'Kata laluan tidak sepadan',
    passwordTooShort: 'Kata laluan mestilah sekurang-kurangnya 6 aksara',
    errorOccurred: 'Ralat berlaku. Sila cuba lagi.',
    successTitle: 'Akaun Dibuat!',
    successMessage: 'Anda kini boleh log masuk dengan kelayakan anda.'
  },
  ta: {
    title: 'கணக்கை உருவாக்கவும்',
    subtitle: 'இன்று MigrantMate இல் சேரவும்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    signUp: 'பதிவு செய்க',
    haveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    signIn: 'உள்நுழைக',
    signingUp: 'கணக்கை உருவாக்குகிறது...',
    passwordMismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
    passwordTooShort: 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்களாக இருக்க வேண்டும்',
    errorOccurred: 'பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.',
    successTitle: 'கணக்கு உருவாக்கப்பட்டது!',
    successMessage: 'நீங்கள் இப்போது உங்கள் நற்சான்றிதழ்களுடன் உள்நுழையலாம்.'
  },
  bn: {
    title: 'অ্যাকাউন্ট তৈরি করুন',
    subtitle: 'আজই MigrantMate এ যোগ দিন',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    signUp: 'সাইন আপ',
    haveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    signIn: 'সাইন ইন',
    signingUp: 'অ্যাকাউন্ট তৈরি হচ্ছে...',
    passwordMismatch: 'পাসওয়ার্ড মিলছে না',
    passwordTooShort: 'পাসওয়ার্ড কমপক্ষে 6 অক্ষরের হতে হবে',
    errorOccurred: 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।',
    successTitle: 'অ্যাকাউন্ট তৈরি হয়েছে!',
    successMessage: 'আপনি এখন আপনার শংসাপত্র দিয়ে সাইন ইন করতে পারেন।'
  },
  hi: {
    title: 'खाता बनाएं',
    subtitle: 'आज ही MigrantMate में शामिल हों',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    signUp: 'साइन अप',
    haveAccount: 'पहले से खाता है?',
    signIn: 'साइन इन',
    signingUp: 'खाता बनाया जा रहा है...',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते',
    passwordTooShort: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए',
    errorOccurred: 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
    successTitle: 'खाता बनाया गया!',
    successMessage: 'अब आप अपने क्रेडेंशियल्स से साइन इन कर सकते हैं।'
  },
  th: {
    title: 'สร้างบัญชี',
    subtitle: 'เข้าร่วม MigrantMate วันนี้',
    email: 'อีเมล',
    password: 'รหัสผ่าน',
    confirmPassword: 'ยืนยันรหัสผ่าน',
    signUp: 'สมัครสมาชิก',
    haveAccount: 'มีบัญชีอยู่แล้ว?',
    signIn: 'เข้าสู่ระบบ',
    signingUp: 'กำลังสร้างบัญชี...',
    passwordMismatch: 'รหัสผ่านไม่ตรงกัน',
    passwordTooShort: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
    errorOccurred: 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง',
    successTitle: 'สร้างบัญชีแล้ว!',
    successMessage: 'ตอนนี้คุณสามารถเข้าสู่ระบบด้วยข้อมูลประจำตัวของคุณได้'
  },
  vi: {
    title: 'Tạo Tài Khoản',
    subtitle: 'Tham gia MigrantMate ngay hôm nay',
    email: 'Email',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận Mật khẩu',
    signUp: 'Đăng Ký',
    haveAccount: 'Đã có tài khoản?',
    signIn: 'Đăng Nhập',
    signingUp: 'Đang tạo tài khoản...',
    passwordMismatch: 'Mật khẩu không khớp',
    passwordTooShort: 'Mật khẩu phải có ít nhất 6 ký tự',
    errorOccurred: 'Đã xảy ra lỗi. Vui lòng thử lại.',
    successTitle: 'Tài Khoản Đã Được Tạo!',
    successMessage: 'Bây giờ bạn có thể đăng nhập bằng thông tin đăng nhập của mình.'
  },
  id: {
    title: 'Buat Akun',
    subtitle: 'Bergabunglah dengan MigrantMate hari ini',
    email: 'Email',
    password: 'Kata Sandi',
    confirmPassword: 'Konfirmasi Kata Sandi',
    signUp: 'Daftar',
    haveAccount: 'Sudah punya akun?',
    signIn: 'Masuk',
    signingUp: 'Membuat akun...',
    passwordMismatch: 'Kata sandi tidak cocok',
    passwordTooShort: 'Kata sandi harus minimal 6 karakter',
    errorOccurred: 'Terjadi kesalahan. Silakan coba lagi.',
    successTitle: 'Akun Dibuat!',
    successMessage: 'Anda sekarang dapat masuk dengan kredensial Anda.'
  },
  tl: {
    title: 'Lumikha ng Account',
    subtitle: 'Sumali sa MigrantMate ngayon',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Kumpirmahin ang Password',
    signUp: 'Mag-sign Up',
    haveAccount: 'Mayroon nang account?',
    signIn: 'Mag-sign In',
    signingUp: 'Lumilikha ng account...',
    passwordMismatch: 'Hindi tugma ang mga password',
    passwordTooShort: 'Ang password ay dapat na hindi bababa sa 6 character',
    errorOccurred: 'May naganap na error. Pakisubukan muli.',
    successTitle: 'Nalikha ang Account!',
    successMessage: 'Maaari ka nang mag-sign in gamit ang iyong mga kredensyal.'
  },
  my: {
    title: 'အကောင့်ဖွင့်ရန်',
    subtitle: 'ယနေ့ MigrantMate သို့ ပူးပေါင်းပါ',
    email: 'အီးမေးလ်',
    password: 'စကားဝှက်',
    confirmPassword: 'စကားဝှက်ကို အတည်ပြုပါ',
    signUp: 'အကောင့်ဖွင့်ရန်',
    haveAccount: 'အကောင့်ရှိပြီးသားလား?',
    signIn: 'လော့ဂ်အင်ဝင်ရန်',
    signingUp: 'အကောင့်ဖွင့်နေသည်...',
    passwordMismatch: 'စကားဝှက်များ မကိုက်ညီပါ',
    passwordTooShort: 'စကားဝှက်သည် အနည်းဆုံး 6 လုံးရှိရမည်',
    errorOccurred: 'အမှားတစ်ခု ဖြစ်ပွားခဲ့သည်။ ထပ်မံကြိုးစားပါ။',
    successTitle: 'အကောင့်ဖွင့်ပြီးပါပြီ!',
    successMessage: 'သင်သည် ယခု သင့်အထောက်အထားများဖြင့် လော့ဂ်အင်ဝင်နိုင်ပါပြီ။'
  }
};

export function SignupPage({ currentLang, onLanguageChange }: SignupPageProps) {
  const t = signupTranslations[currentLang];
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const languages = Object.values(translations);
  const currentLangData = translations[currentLang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    if (password.length < 6) {
      setError(t.passwordTooShort);
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password);
      
      if (error) {
        console.error('Signup error:', error);
        setError(error.message || t.errorOccurred);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
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
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-50 to-green-50 border border-red-200 rounded-full hover:shadow-md transition-all duration-200"
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

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-800">{t.successTitle}</p>
                  <p className="text-sm text-green-700">{t.successMessage}</p>
                </div>
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
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                {t.confirmPassword}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.signingUp : t.signUp}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {t.haveAccount}{' '}
              <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold">
                {t.signIn}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
