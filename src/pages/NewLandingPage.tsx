import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HandHeart, Sparkles, MessageCircle } from 'lucide-react';
import { LanguageCode, translations } from '../translations';

interface LandingPageProps {
  currentLang: LanguageCode;
  userName?: string;
}

const NewLandingPage: React.FC<LandingPageProps> = ({ currentLang, userName }) => {
  const navigate = useNavigate();
  const t = translations[currentLang]?.content || {};

  const menuOptions = [
    {
      icon: HandHeart,
      title: t.needHelpTitle || 'Need Help?',
      description: t.needHelpDescription || 'Find assistance for common problems.',
      gradient: 'from-red-500 to-rose-600',
      bgGradient: 'from-red-50 to-rose-50',
      path: '/help',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop'
    },
    {
      icon: Sparkles,
      title: t.activitiesTitle || 'Activities',
      description: t.activitiesDescription || 'Discover activities and events.',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      path: '/activities',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop'
    },
    {
      icon: MessageCircle,
      title: t.chatbotTitle || 'Chatbot',
      description: t.chatbotDescription || 'Get assistance from our chatbot.',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      path: '/chatbot',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      <section className="relative overflow-hidden py-8 sm:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 via-transparent to-green-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {userName && (
            <div className="mb-2">
              <p className="text-2xl font-semibold text-slate-700">
                Hi, {userName}
              </p>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 animate-fade-in">
            {t.menuTitle || 'Welcome to Our Service'}
          </h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(option.path)}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={option.image} 
                    alt={option.title}
                    loading="lazy"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = `linear-gradient(135deg, ${option.gradient.replace('from-', '').replace(' to-', ', ')})`;
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${option.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{option.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{option.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default NewLandingPage;
