import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageCode } from '../translations';
import { ArrowLeft, Users, Calendar, Tag } from 'lucide-react';

interface ActivitiesPageProps {
  currentLang: LanguageCode;
}

// Native translations without external dependencies
const nativeTranslations: Record<LanguageCode, {
  backButton: string;
  pageTitle: string;
  socialActivities: {
    title: string;
    description: string;
  };
  communityEvents: {
    title: string;
    description: string;
  };
  discountsNearMe: {
    title: string;
    description: string;
  };
}> = {
  en: {
    backButton: 'Back to Home',
    pageTitle: 'Activities',
    socialActivities: {
      title: 'Social Activities',
      description: 'Connect with others and build friendships'
    },
    communityEvents: {
      title: 'Community Events',
      description: 'Join local events and celebrations'
    },
    discountsNearMe: {
      title: 'Discounts Near Me',
      description: 'Find special offers and deals nearby'
    }
  },
  zh: {
    backButton: '返回',
    pageTitle: '活动',
    socialActivities: {
      title: '社交活动',
      description: '与他人联系并建立友谊'
    },
    communityEvents: {
      title: '社区活动',
      description: '参加当地活动和庆祝活动'
    },
    discountsNearMe: {
      title: '附近的折扣',
      description: '查找附近的特别优惠和折扣'
    }
  },
  ms: {
    backButton: 'Kembali',
    pageTitle: 'Aktiviti',
    socialActivities: {
      title: 'Aktiviti Sosial',
      description: 'Berhubung dengan orang lain dan membina persahabatan'
    },
    communityEvents: {
      title: 'Acara Komuniti',
      description: 'Sertai acara dan perayaan tempatan'
    },
    discountsNearMe: {
      title: 'Diskaun Berhampiran',
      description: 'Cari tawaran istimewa dan diskaun berdekatan'
    }
  },
  ta: {
    backButton: 'பின்செல்',
    pageTitle: 'செயல்பாடுகள்',
    socialActivities: {
      title: 'சமூக செயல்பாடுகள்',
      description: 'மற்றவர்களுடன் இணைந்து நட்பை வளர்க்கவும்'
    },
    communityEvents: {
      title: 'சமூக நிகழ்வுகள்',
      description: 'உள்ளூர் நிகழ்வுகள் மற்றும் கொண்டாட்டங்களில் சேரவும்'
    },
    discountsNearMe: {
      title: 'அருகிலுள்ள தள்ளுபடிகள்',
      description: 'அருகிலுள்ள சிறப்பு சலுகைகள் மற்றும் ஒப்பந்தங்களைக் கண்டறியவும்'
    }
  },
  bn: {
    backButton: 'ফিরে যান',
    pageTitle: 'কার্যক্রম',
    socialActivities: {
      title: 'সামাজিক কার্যক্রম',
      description: 'অন্যদের সাথে সংযোগ করুন এবং বন্ধুত্ব তৈরি করুন'
    },
    communityEvents: {
      title: 'সম্প্রদায় ইভেন্ট',
      description: 'স্থানীয় ইভেন্ট এবং উদযাপনে যোগ দিন'
    },
    discountsNearMe: {
      title: 'কাছাকাছি ছাড়',
      description: 'কাছাকাছি বিশেষ অফার এবং ডিল খুঁজুন'
    }
  },
  hi: {
    backButton: 'वापस',
    pageTitle: 'गतिविधियाँ',
    socialActivities: {
      title: 'सामाजिक गतिविधियाँ',
      description: 'दूसरों से जुड़ें और दोस्ती बनाएं'
    },
    communityEvents: {
      title: 'सामुदायिक कार्यक्रम',
      description: 'स्थानीय कार्यक्रमों और समारोहों में शामिल हों'
    },
    discountsNearMe: {
      title: 'पास में छूट',
      description: 'पास में विशेष ऑफर और सौदे खोजें'
    }
  },
  th: {
    backButton: 'กลับ',
    pageTitle: 'กิจกรรม',
    socialActivities: {
      title: 'กิจกรรมทางสังคม',
      description: 'เชื่อมต่อกับผู้อื่นและสร้างมิตรภาพ'
    },
    communityEvents: {
      title: 'กิจกรรมชุมชน',
      description: 'เข้าร่วมกิจกรรมและการเฉลิมฉลองในท้องถิ่น'
    },
    discountsNearMe: {
      title: 'ส่วนลดใกล้ฉัน',
      description: 'ค้นหาข้อเสนอพิเศษและดีลใกล้เคียง'
    }
  },
  vi: {
    backButton: 'Quay lại',
    pageTitle: 'Hoạt động',
    socialActivities: {
      title: 'Hoạt động xã hội',
      description: 'Kết nối với người khác và xây dựng tình bạn'
    },
    communityEvents: {
      title: 'Sự kiện cộng đồng',
      description: 'Tham gia các sự kiện và lễ kỷ niệm địa phương'
    },
    discountsNearMe: {
      title: 'Giảm giá Gần tôi',
      description: 'Tìm ưu đãi đặc biệt và giao dịch gần đây'
    }
  },
  id: {
    backButton: 'Kembali',
    pageTitle: 'Aktivitas',
    socialActivities: {
      title: 'Aktivitas Sosial',
      description: 'Terhubung dengan orang lain dan membangun persahabatan'
    },
    communityEvents: {
      title: 'Acara Komunitas',
      description: 'Bergabung dengan acara dan perayaan lokal'
    },
    discountsNearMe: {
      title: 'Diskon Terdekat',
      description: 'Temukan penawaran khusus dan diskon terdekat'
    }
  },
  tl: {
    backButton: 'Bumalik',
    pageTitle: 'Mga Aktibidad',
    socialActivities: {
      title: 'Mga Aktibidad sa Lipunan',
      description: 'Makipag-ugnayan sa iba at bumuo ng pagkakaibigan'
    },
    communityEvents: {
      title: 'Mga Kaganapan sa Komunidad',
      description: 'Sumali sa mga lokal na kaganapan at pagdiriwang'
    },
    discountsNearMe: {
      title: 'Mga Diskwento Malapit',
      description: 'Maghanap ng mga espesyal na alok at deal malapit'
    }
  },
  my: {
    backButton: 'နောက်သို့',
    pageTitle: 'လှုပ်ရှားမှုများ',
    socialActivities: {
      title: 'လူမှုရေးလှုပ်ရှားမှုများ',
      description: 'အခြားသူများနှင့်ဆက်သွယ်ပြီး မိတ်ဆွေများတည်ဆောက်ပါ'
    },
    communityEvents: {
      title: 'အသိုင်းအဝိုင်းပွဲများ',
      description: 'ဒေသခံပွဲများနှင့် ပွဲလမ်းသဘင်များတွင်ပါဝင်ပါ'
    },
    discountsNearMe: {
      title: 'အနီးအနားရှိ လျှော့စျေးများ',
      description: 'အနီးအနားရှိ အထူးကမ်းလှမ်းချက်များနှင့် အရောင်းအ၀ယ်များကို ရှာဖွေပါ'
    }
  }
};

export function ActivitiesPage({ currentLang }: ActivitiesPageProps) {
  const navigate = useNavigate();
  
  // Get translations for current language with fallback to English
  const t = nativeTranslations[currentLang] || nativeTranslations.en;

  const activities = [
    {
      id: 'social',
      title: t.socialActivities.title,
      description: t.socialActivities.description,
      icon: Users,
      color: 'from-purple-600 to-pink-600',
      path: '/activities/social',
      hasImage: true,
      imageUrl: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/202510270142tennis-players-zoom-outremix01k8gsqxw6e7jb22g4srm24cf9-1761500982790-877655033-1761500982790-549129009.png'
    },
    {
      id: 'community',
      title: t.communityEvents.title,
      description: t.communityEvents.description,
      icon: Calendar,
      color: 'from-blue-600 to-cyan-600',
      path: '/community-events',
      hasImage: true,
      imageUrl: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/202510270151parade-celebration-funremix01k8gt76r4eaj8ww90ce70jgz8-1761501279799-285234549-1761501279798-17301498.png'
    },
    {
      id: 'discounts',
      title: t.discountsNearMe.title,
      description: t.discountsNearMe.description,
      icon: Tag,
      color: 'from-orange-600 to-red-600',
      path: '/discounts',
      hasImage: true,
      imageUrl: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/202510270158supermarket-shopping-duoremix01k8gtm6esfgyvpsb7r1m7f4s2-1761501868167-874427156-1761501868166-547560073.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backButton}</span>
        </button>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center flex-1">
              {t.pageTitle}
            </h1>
            
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <button
                key={activity.id}
                onClick={() => navigate(activity.path)}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {activity.hasImage ? (
                  // Layout for buttons with images (matching LandingPage.tsx pattern)
                  <div className="relative flex flex-col h-full">
                    {/* Image Section - 70% of height */}
                    <div className="relative h-[70%] overflow-hidden">
                      <img 
                        src={activity.imageUrl} 
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Text Section - 30% of height */}
                    <div className="h-[30%] flex flex-col items-center justify-center px-4 py-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-800 transition-all duration-300">
                        {activity.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Standard layout for buttons without images
                  <div className="relative p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activity.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-800 transition-all duration-300">
                      {activity.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
