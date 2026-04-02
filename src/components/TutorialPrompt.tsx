import React from 'react';
import { PlayCircle, X } from 'lucide-react';

interface TutorialPromptProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  currentLang: string;
}

const promptTranslations = {
  en: {
    title: 'Welcome to MigrantMate!',
    message: 'Would you like to take a quick tour to learn how to use the app?',
    accept: 'Start Tutorial',
    decline: 'Skip for Now'
  },
  zh: {
    title: '欢迎来到MigrantMate！',
    message: '您想快速浏览一下如何使用该应用程序吗？',
    accept: '开始教程',
    decline: '暂时跳过'
  },
  ms: {
    title: 'Selamat datang ke MigrantMate!',
    message: 'Adakah anda ingin mengambil lawatan pantas untuk belajar cara menggunakan aplikasi?',
    accept: 'Mulakan Tutorial',
    decline: 'Langkau Buat Masa Ini'
  },
  ta: {
    title: 'MigrantMate க்கு வரவேற்கிறோம்!',
    message: 'பயன்பாட்டை எவ்வாறு பயன்படுத்துவது என்பதை அறிய விரைவான சுற்றுப்பயணத்தை மேற்கொள்ள விரும்புகிறீர்களா?',
    accept: 'பயிற்சியைத் தொடங்கு',
    decline: 'இப்போதைக்கு தவிர்'
  },
  bn: {
    title: 'MigrantMate এ স্বাগতম!',
    message: 'অ্যাপটি কীভাবে ব্যবহার করতে হয় তা শিখতে আপনি কি একটি দ্রুত ট্যুর নিতে চান?',
    accept: 'টিউটোরিয়াল শুরু করুন',
    decline: 'এখনকার জন্য এড়িয়ে যান'
  },
  hi: {
    title: 'MigrantMate में आपका स्वागत है!',
    message: 'क्या आप ऐप का उपयोग करना सीखने के लिए एक त्वरित दौरा करना चाहेंगे?',
    accept: 'ट्यूटोरियल शुरू करें',
    decline: 'अभी के लिए छोड़ें'
  },
  th: {
    title: 'ยินดีต้อนรับสู่ MigrantMate!',
    message: 'คุณต้องการทัวร์อย่างรวดเร็วเพื่อเรียนรู้วิธีใช้แอปหรือไม่?',
    accept: 'เริ่มบทช่วยสอน',
    decline: 'ข้ามตอนนี้'
  },
  vi: {
    title: 'Chào mừng đến với MigrantMate!',
    message: 'Bạn có muốn tham quan nhanh để học cách sử dụng ứng dụng không?',
    accept: 'Bắt đầu Hướng dẫn',
    decline: 'Bỏ qua Bây giờ'
  },
  id: {
    title: 'Selamat datang di MigrantMate!',
    message: 'Apakah Anda ingin melakukan tur cepat untuk mempelajari cara menggunakan aplikasi?',
    accept: 'Mulai Tutorial',
    decline: 'Lewati untuk Sekarang'
  },
  tl: {
    title: 'Maligayang pagdating sa MigrantMate!',
    message: 'Gusto mo bang gumawa ng mabilis na paglilibot upang matutunan kung paano gamitin ang app?',
    accept: 'Simulan ang Tutorial',
    decline: 'Laktawan Ngayon'
  },
  my: {
    title: 'MigrantMate သို့ ကြိုဆိုပါသည်!',
    message: 'အက်ပ်ကို မည်သို့အသုံးပြုရမည်ကို လေ့လာရန် အမြန်ခရီးစဉ်တစ်ခု လုပ်လိုပါသလား?',
    accept: 'သင်ခန်းစာစတင်ပါ',
    decline: 'ယခုအတွက် ကျော်သွားမည်'
  }
};

export function TutorialPrompt({ isOpen, onAccept, onDecline, currentLang }: TutorialPromptProps) {
  const t = promptTranslations[currentLang as keyof typeof promptTranslations] || promptTranslations.en;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 via-white to-green-100/50"></div>
        
        {/* Content */}
        <div className="relative p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-cyan-800 rounded-full flex items-center justify-center shadow-lg">
              <PlayCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-4">
            {t.title}
          </h2>

          {/* Message */}
          <p className="text-center text-slate-600 text-lg mb-8 leading-relaxed">
            {t.message}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onAccept}
              className="w-full py-4 bg-cyan-800 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {t.accept}
            </button>
            
            <button
              onClick={onDecline}
              className="w-full py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-200 transition-all duration-300"
            >
              {t.decline}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
