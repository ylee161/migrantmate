import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageCode, translations } from '../translations';
import { PlayCircle } from 'lucide-react';

interface LandingPageProps {
  currentLang: LanguageCode;
  onReplayTutorial: () => void;
}

const replayButtonTranslations = {
  en: 'View Tutorial',
  zh: '查看教程',
  ms: 'Lihat Tutorial',
  ta: 'பயிற்சியைக் காண்க',
  bn: 'টিউটোরিয়াল দেখুন',
  hi: 'ट्यूटोरियल देखें',
  th: 'ดูบทช่วยสอน',
  vi: 'Xem Hướng dẫn',
  id: 'Lihat Tutorial',
  tl: 'Tingnan ang Tutorial',
  my: 'သင်ခန်းစာကြည့်ရန်'
};

export function LandingPage({ currentLang, onReplayTutorial }: LandingPageProps) {
  const t = translations[currentLang].content;
  const navigate = useNavigate();

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.greetings.morning;
    if (hour < 18) return t.greetings.afternoon;
    return t.greetings.evening;
  };

  const menuItems = [
    // First Row
    {
      id: 'budget-brother',
      title: {
        en: 'Budget Brother',
        zh: '预算兄弟',
        ms: 'Budget Brother',
        ta: 'பட்ஜெட் பிரதர்',
        bn: 'বাজেট ব্রাদার',
        hi: 'बजट ब्रदर',
        th: 'Budget Brother',
        vi: 'Budget Brother',
        id: 'Budget Brother',
        tl: 'Budget Brother',
        my: 'Budget Brother'
      }[currentLang],
      description: {
        en: 'Manage your finances and track expenses',
        zh: '管理您的财务并跟踪支出',
        ms: 'Urus kewangan dan jejaki perbelanjaan anda',
        ta: 'உங்கள் நிதியை நிர்வகிக்கவும் செலவுகளைக் கண்காணிக்கவும்',
        bn: 'আপনার আর্থিক ব্যবস্থাপনা এবং খরচ ট্র্যাক করুন',
        hi: 'अपने वित्त का प्रबंधन करें और खर्चों को ट्रैक करें',
        th: 'จัดการการเงินและติดตามค่าใช้จ่ายของคุณ',
        vi: 'Quản lý tài chính và theo dõi chi tiêu của bạn',
        id: 'Kelola keuangan dan lacak pengeluaran Anda',
        tl: 'Pamahalaan ang iyong pananalapi at subaybayan ang mga gastos',
        my: 'သင့်ဘဏ္ဍာရေးကို စီမံခန့်ခွဲပြီး အသုံးစရိတ်များကို ခြေရာခံပါ'
      }[currentLang],
      gradient: 'from-blue-600 to-purple-600',
      path: '/budget-brother',
      hasImage: true,
      imageUrl: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/image-1761205324828-527664728-1761205324828-943234080.png'
    },
    {
      id: 'activities',
      title: t.activitiesTitle,
      description: t.activitiesDescription,
      gradient: 'from-purple-600 to-pink-600',
      path: '/activities',
      hasImage: true,
      imageUrl: 'https://cdn.chatandbuild.com/users/68ecbb200efc24e3dfa1d8bf/photo2025-11-06-220404-1762437859108-560460776-1762437859107-183753533.jpeg'
    },
    // Second Row
    {
      id: 'help',
      title: t.needHelpTitle,
      description: t.needHelpDescription,
      gradient: 'from-red-600 to-orange-600',
      path: '/help',
      hasImage: true,
      imageUrl: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/image-1761204306773-945174345-1761204306773-507404614.png'
    },
    {
      id: 'chatbot',
      title: t.chatbotTitle,
      description: t.chatbotDescription,
      gradient: 'from-blue-600 to-cyan-600',
      path: '/chatbot',
      hasImage: true,
      imageUrl: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/image-1761205773704-633384191-1761205773704-123619378.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 via-transparent to-green-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 animate-fade-in">
            {getGreeting()}
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-6 max-w-3xl mx-auto animate-fade-in-delay">
            {t.menuTitle}
          </p>
        </div>
      </section>

      {/* Main Menu Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {menuItems.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                {item.hasImage ? (
                  // Layout for buttons with images
                  <div className="relative flex flex-col h-full">
                    {/* Image Section - 70% of height */}
                    <div className="relative h-[70%] overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Text Section - 30% of height */}
                    <div className="h-[30%] flex flex-col items-center justify-center px-4 py-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-800 transition-all duration-300">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Standard layout for other buttons (fallback, not used currently)
                  <div className="relative p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-cyan-800 transition-all duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {item.description}
                    </p>
                    
                    {/* Arrow indicator */}
                    <div className="mt-6 flex items-center text-sm font-semibold text-slate-400 group-hover:text-red-600 transition-colors duration-300">
                      <span>{t.clickToGetHelp}</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Tutorial Replay Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={onReplayTutorial}
            className="group flex items-center gap-3 px-8 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-slate-200 hover:border-slate-400"
          >
            <PlayCircle className="w-6 h-6 text-cyan-600 group-hover:text-cyan-800 transition-colors" />
            <span className="text-lg font-semibold text-slate-700 group-hover:text-cyan-800 transition-all">
              {replayButtonTranslations[currentLang]}
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyan-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-medium">{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
