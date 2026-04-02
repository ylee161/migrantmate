import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: string;
  isFirstTime?: boolean;
}

const translations = {
  en: {
    skip: 'Skip',
    next: 'Next',
    previous: 'Previous',
    getStarted: 'Get Started',
    slides: [
      'Change your language anytime using the translation button',
      'Get help with various services and support',
      'Join social activities and connect with others',
      'Manage your budget with Budget Brother',
      'Get personalized budget insights and advice',
      'Chat with our AI assistant for instant help'
    ]
  },
  zh: {
    skip: '跳过',
    next: '下一步',
    previous: '上一步',
    getStarted: '开始使用',
    slides: [
      '随时使用翻译按钮更改语言',
      '获取各种服务和支持帮助',
      '参加社交活动并与他人联系',
      '使用预算兄弟管理您的预算',
      '获取个性化的预算见解和建议',
      '与我们的AI助手聊天以获得即时帮助'
    ]
  },
  ms: {
    skip: 'Langkau',
    next: 'Seterusnya',
    previous: 'Sebelumnya',
    getStarted: 'Mula',
    slides: [
      'Tukar bahasa anda bila-bila masa menggunakan butang terjemahan',
      'Dapatkan bantuan dengan pelbagai perkhidmatan dan sokongan',
      'Sertai aktiviti sosial dan berhubung dengan orang lain',
      'Urus bajet anda dengan Budget Brother',
      'Dapatkan pandangan dan nasihat bajet yang diperibadikan',
      'Berbual dengan pembantu AI kami untuk bantuan segera'
    ]
  },
  ta: {
    skip: 'தவிர்',
    next: 'அடுத்து',
    previous: 'முந்தைய',
    getStarted: 'தொடங்கு',
    slides: [
      'மொழிபெயர்ப்பு பொத்தானைப் பயன்படுத்தி எந்த நேரத்திலும் உங்கள் மொழியை மாற்றவும்',
      'பல்வேறு சேவைகள் மற்றும் ஆதரவுடன் உதவி பெறுங்கள்',
      'சமூக நடவடிக்கைகளில் சேரவும் மற்றவர்களுடன் இணைக்கவும்',
      'பட்ஜெட் பிரதருடன் உங்கள் பட்ஜெட்டை நிர்வகிக்கவும்',
      'தனிப்பயனாக்கப்பட்ட பட்ஜெட் நுண்ணறிவுகள் மற்றும் ஆலோசனைகளைப் பெறுங்கள்',
      'உடனடி உதவிக்கு எங்கள் AI உதவியாளருடன் அரட்டையடிக்கவும்'
    ]
  },
  bn: {
    skip: 'এড়িয়ে যান',
    next: 'পরবর্তী',
    previous: 'পূর্ববর্তী',
    getStarted: 'শুরু করুন',
    slides: [
      'অনুবাদ বোতাম ব্যবহার করে যেকোনো সময় আপনার ভাষা পরিবর্তন করুন',
      'বিভিন্ন সেবা এবং সহায়তার সাথে সাহায্য পান',
      'সামাজিক কার্যক্রমে যোগ দিন এবং অন্যদের সাথে সংযুক্ত হন',
      'বাজেট ব্রাদারের সাথে আপনার বাজেট পরিচালনা করুন',
      'ব্যক্তিগতকৃত বাজেট অন্তর্দৃষ্টি এবং পরামর্শ পান',
      'তাৎক্ষণিক সাহায্যের জন্য আমাদের AI সহায়কের সাথে চ্যাট করুন'
    ]
  },
  hi: {
    skip: 'छोड़ें',
    next: 'अगला',
    previous: 'पिछला',
    getStarted: 'शुरू करें',
    slides: [
      'अनुवाद बटन का उपयोग करके किसी भी समय अपनी भाषा बदलें',
      'विभिन्न सेवाओं और समर्थन के साथ मदद प्राप्त करें',
      'सामाजिक गतिविधियों में शामिल हों और दूसरों से जुड़ें',
      'बजट ब्रदर के साथ अपने बजट का प्रबंधन करें',
      'व्यक्तिगत बजट अंतर्दृष्टि और सलाह प्राप्त करें',
      'तत्काल मदद के लिए हमारे AI सहायक के साथ चैट करें'
    ]
  },
  th: {
    skip: 'ข้าม',
    next: 'ถัดไป',
    previous: 'ก่อนหน้า',
    getStarted: 'เริ่มต้น',
    slides: [
      'เปลี่ยนภาษาของคุณได้ตลอดเวลาโดยใช้ปุ่มแปล',
      'รับความช่วยเหลือด้านบริการและการสนับสนุนต่างๆ',
      'เข้าร่วมกิจกรรมทางสังคมและเชื่อมต่อกับผู้อื่น',
      'จัดการงบประมาณของคุณด้วย Budget Brother',
      'รับข้อมูลเชิงลึกและคำแนะนำเกี่ยวกับงบประมาณส่วนบุคคล',
      'แชทกับผู้ช่วย AI ของเราเพื่อรับความช่วยเหลือทันที'
    ]
  },
  vi: {
    skip: 'Bỏ qua',
    next: 'Tiếp theo',
    previous: 'Trước',
    getStarted: 'Bắt đầu',
    slides: [
      'Thay đổi ngôn ngữ của bạn bất cứ lúc nào bằng nút dịch',
      'Nhận trợ giúp với các dịch vụ và hỗ trợ khác nhau',
      'Tham gia các hoạt động xã hội và kết nối với người khác',
      'Quản lý ngân sách của bạn với Budget Brother',
      'Nhận thông tin chi tiết và lời khuyên về ngân sách được cá nhân hóa',
      'Trò chuyện với trợ lý AI của chúng tôi để được trợ giúp ngay lập tức'
    ]
  },
  id: {
    skip: 'Lewati',
    next: 'Berikutnya',
    previous: 'Sebelumnya',
    getStarted: 'Mulai',
    slides: [
      'Ubah bahasa Anda kapan saja menggunakan tombol terjemahan',
      'Dapatkan bantuan dengan berbagai layanan dan dukungan',
      'Bergabunglah dengan kegiatan sosial dan terhubung dengan orang lain',
      'Kelola anggaran Anda dengan Budget Brother',
      'Dapatkan wawasan dan saran anggaran yang dipersonalisasi',
      'Ngobrol dengan asisten AI kami untuk bantuan instan'
    ]
  },
  tl: {
    skip: 'Laktawan',
    next: 'Susunod',
    previous: 'Nakaraan',
    getStarted: 'Magsimula',
    slides: [
      'Baguhin ang iyong wika anumang oras gamit ang button ng pagsasalin',
      'Kumuha ng tulong sa iba\'t ibang serbisyo at suporta',
      'Sumali sa mga aktibidad sa lipunan at kumonekta sa iba',
      'Pamahalaan ang iyong badyet gamit ang Budget Brother',
      'Kumuha ng personalized na mga insight at payo sa badyet',
      'Makipag-chat sa aming AI assistant para sa instant na tulong'
    ]
  },
  my: {
    skip: 'ကျော်သွားမည်',
    next: 'နောက်တစ်ခု',
    previous: 'ယခင်',
    getStarted: 'စတင်ပါ',
    slides: [
      'ဘာသာပြန်ခလုတ်ကို အသုံးပြု၍ သင့်ဘာသာစကားကို အချိန်မရွေး ပြောင်းလဲနိုင်သည်',
      'အမျိုးမျိုးသော ဝန်ဆောင်မှုများနှင့် အကူအညီများ ရယူပါ',
      'လူမှုရေးလှုပ်ရှားမှုများတွင် ပါဝင်ပြီး အခြားသူများနှင့် ချိတ်ဆက်ပါ',
      'Budget Brother ဖြင့် သင့်ဘတ်ဂျက်ကို စီမံခန့်ခွဲပါ',
      'ပုဂ္ဂိုလ်ရေးသီးသန့် ဘတ်ဂျက်အကြံပြုချက်များနှင့် အကြံဉာဏ်များ ရယူပါ',
      'ချက်ချင်းအကူအညီအတွက် ကျွန်ုပ်တို့၏ AI လက်ထောက်နှင့် စကားပြောပါ'
    ]
  }
};

export function TutorialModal({ isOpen, onClose, currentLang, isFirstTime = false }: TutorialModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = translations[currentLang as keyof typeof translations] || translations.en;
  const totalSlides = 6;

  // External CDN URLs for tutorial screenshots - Updated slides 2 and 6
  const screenshotUrls = [
    'https://cdn.chatandbuild.com/users/68ecbb200efc24e3dfa1d8bf/screenshot-2025-11-06-1762447176483-534183780-1762447176482-422854418.png',
    'https://cdn.chatandbuild.com/users/68ecbb200efc24e3dfa1d8bf/screenshot-2025-11-07-1762450743804-927005917-1762450743804-827052225.png',
    'https://cdn.chatandbuild.com/users/68ecbb200efc24e3dfa1d8bf/screenshot-2025-11-06-1762446863769-375586151-1762446863768-765446757.png',
    'https://cdn.chatandbuild.com/users/68ecbb200efc24e3dfa1d8bf/screenshot-2025-11-07-1762447553347-8320647-1762447553347-691422334.png',
    'https://cdn.chatandbuild.com/users/68ecbb200efc24e3dfa1d8bf/screenshot-2025-11-07-1762447861050-933957647-1762447861049-670057409.png',
    'https://cdn.chatandbuild.com/users/68ecbb200efc24e3dfa1d8bf/screenshot-2025-11-07-1762449431494-514496259-1762449431487-311854929.png'
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide]);

  const handleClose = () => {
    if (isFirstTime) {
      localStorage.setItem('tutorialCompleted', 'true');
    }
    onClose();
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-slate-900">
              {currentSlide + 1} / {totalSlides}
            </span>
            <div className="flex gap-1.5">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'w-6 bg-cyan-800'
                      : 'w-1.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={t.skip}
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Screenshot */}
        <div className="relative bg-slate-50" style={{ height: '400px' }}>
          <img
            src={screenshotUrls[currentSlide]}
            alt={t.slides[currentSlide]}
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error('Image failed to load:', screenshotUrls[currentSlide]);
            }}
          />
        </div>

        {/* Description */}
        <div className="p-4 bg-gradient-to-br from-red-50 to-green-50">
          <p className="text-center text-base text-slate-700 font-medium">
            {t.slides[currentSlide]}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-slate-200">
          <button
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all text-sm ${
              currentSlide === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            {t.previous}
          </button>

          <button
            onClick={handleClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold transition-colors text-sm"
          >
            {t.skip}
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm"
          >
            {currentSlide === totalSlides - 1 ? t.getStarted : t.next}
            {currentSlide < totalSlides - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
