import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageCode } from '../translations';
import { ArrowRight, Users, Calendar, Heart } from 'lucide-react';

interface HomePageProps {
  currentLang: LanguageCode;
}

const nativeTranslations: Record<LanguageCode, {
  greeting: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  hero: {
    subtitle: string;
    exploreButton: string;
  };
  features: {
    feature1: {
      title: string;
      description: string;
    };
    feature2: {
      title: string;
      description: string;
    };
    feature3: {
      title: string;
      description: string;
    };
  };
  footer: string;
}> = {
  en: {
    greeting: {
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening'
    },
    hero: {
      subtitle: 'Connect, Learn, and Thrive in Your New Community',
      exploreButton: 'Explore Activities'
    },
    features: {
      feature1: {
        title: 'Connect with Others',
        description: 'Join social activities and meet people from diverse backgrounds in your community'
      },
      feature2: {
        title: 'Community Events',
        description: 'Discover and participate in cultural celebrations and local gatherings'
      },
      feature3: {
        title: 'Build Friendships',
        description: 'Create lasting connections and feel at home in Singapore'
      }
    },
    footer: 'Building Bridges, Creating Communities'
  },
  zh: {
    greeting: {
      morning: '早上好',
      afternoon: '下午好',
      evening: '晚上好'
    },
    hero: {
      subtitle: '在您的新社区中联系、学习和茁壮成长',
      exploreButton: '探索活动'
    },
    features: {
      feature1: {
        title: '与他人联系',
        description: '参加社交活动，结识来自不同背景的社区成员'
      },
      feature2: {
        title: '社区活动',
        description: '发现并参与文化庆祝活动和当地聚会'
      },
      feature3: {
        title: '建立友谊',
        description: '建立持久的联系，在新加坡感到宾至如归'
      }
    },
    footer: '搭建桥梁，创建社区'
  },
  ms: {
    greeting: {
      morning: 'Selamat Pagi',
      afternoon: 'Selamat Petang',
      evening: 'Selamat Malam'
    },
    hero: {
      subtitle: 'Berhubung, Belajar, dan Berkembang dalam Komuniti Baru Anda',
      exploreButton: 'Terokai Aktiviti'
    },
    features: {
      feature1: {
        title: 'Berhubung dengan Orang Lain',
        description: 'Sertai aktiviti sosial dan temui orang dari pelbagai latar belakang dalam komuniti anda'
      },
      feature2: {
        title: 'Acara Komuniti',
        description: 'Temui dan sertai perayaan budaya dan perhimpunan tempatan'
      },
      feature3: {
        title: 'Membina Persahabatan',
        description: 'Cipta hubungan yang berkekalan dan berasa seperti di rumah di Singapura'
      }
    },
    footer: 'Membina Jambatan, Mencipta Komuniti'
  },
  ta: {
    greeting: {
      morning: 'காலை வணக்கம்',
      afternoon: 'மதிய வணக்கம்',
      evening: 'மாலை வணக்கம்'
    },
    hero: {
      subtitle: 'உங்கள் புதிய சமூகத்தில் இணைந்து, கற்றுக்கொண்டு, வளருங்கள்',
      exploreButton: 'செயல்பாடுகளை ஆராயுங்கள்'
    },
    features: {
      feature1: {
        title: 'மற்றவர்களுடன் இணைக்கவும்',
        description: 'சமூக செயல்பாடுகளில் சேர்ந்து உங்கள் சமூகத்தில் பல்வேறு பின்னணியிலிருந்து வரும் மக்களை சந்திக்கவும்'
      },
      feature2: {
        title: 'சமூக நிகழ்வுகள்',
        description: 'கலாச்சார கொண்டாட்டங்கள் மற்றும் உள்ளூர் கூட்டங்களை கண்டறிந்து பங்கேற்கவும்'
      },
      feature3: {
        title: 'நட்பை வளர்க்கவும்',
        description: 'நீடித்த தொடர்புகளை உருவாக்கி சிங்கப்பூரில் வீட்டில் இருப்பது போல் உணருங்கள்'
      }
    },
    footer: 'பாலங்களை கட்டுதல், சமூகங்களை உருவாக்குதல்'
  },
  bn: {
    greeting: {
      morning: 'সুপ্রভাত',
      afternoon: 'শুভ অপরাহ্ন',
      evening: 'শুভ সন্ধ্যা'
    },
    hero: {
      subtitle: 'আপনার নতুন সম্প্রদায়ে সংযুক্ত হন, শিখুন এবং উন্নতি করুন',
      exploreButton: 'কার্যক্রম অন্বেষণ করুন'
    },
    features: {
      feature1: {
        title: 'অন্যদের সাথে সংযোগ করুন',
        description: 'সামাজিক কার্যক্রমে যোগ দিন এবং আপনার সম্প্রদায়ে বিভিন্ন পটভূমির মানুষের সাথে দেখা করুন'
      },
      feature2: {
        title: 'সম্প্রদায় ইভেন্ট',
        description: 'সাংস্কৃতিক উদযাপন এবং স্থানীয় সমাবেশ আবিষ্কার করুন এবং অংশগ্রহণ করুন'
      },
      feature3: {
        title: 'বন্ধুত্ব তৈরি করুন',
        description: 'দীর্ঘস্থায়ী সংযোগ তৈরি করুন এবং সিঙ্গাপুরে বাড়িতে অনুভব করুন'
      }
    },
    footer: 'সেতু নির্মাণ, সম্প্রদায় তৈরি'
  },
  hi: {
    greeting: {
      morning: 'सुप्रभात',
      afternoon: 'शुभ दोपहर',
      evening: 'शुभ संध्या'
    },
    hero: {
      subtitle: 'अपने नए समुदाय में जुड़ें, सीखें और फलें-फूलें',
      exploreButton: 'गतिविधियों का अन्वेषण करें'
    },
    features: {
      feature1: {
        title: 'दूसरों से जुड़ें',
        description: 'सामाजिक गतिविधियों में शामिल हों और अपने समुदाय में विभिन्न पृष्ठभूमि के लोगों से मिलें'
      },
      feature2: {
        title: 'सामुदायिक कार्यक्रम',
        description: 'सांस्कृतिक समारोहों और स्थानीय सभाओं की खोज करें और भाग लें'
      },
      feature3: {
        title: 'दोस्ती बनाएं',
        description: 'स्थायी संबंध बनाएं और सिंगापुर में घर जैसा महसूस करें'
      }
    },
    footer: 'पुल बनाना, समुदाय बनाना'
  },
  th: {
    greeting: {
      morning: 'สวัสดีตอนเช้า',
      afternoon: 'สวัสดีตอนบ่าย',
      evening: 'สวัสดีตอนเย็น'
    },
    hero: {
      subtitle: 'เชื่อมต่อ เรียนรู้ และเติบโตในชุมชนใหม่ของคุณ',
      exploreButton: 'สำรวจกิจกรรม'
    },
    features: {
      feature1: {
        title: 'เชื่อมต่อกับผู้อื่น',
        description: 'เข้าร่วมกิจกรรมทางสังคมและพบปะผู้คนจากภูมิหลังที่หลากหลายในชุมชนของคุณ'
      },
      feature2: {
        title: 'กิจกรรมชุมชน',
        description: 'ค้นพบและเข้าร่วมการเฉลิมฉลองทางวัฒนธรรมและการชุมนุมในท้องถิ่น'
      },
      feature3: {
        title: 'สร้างมิตรภาพ',
        description: 'สร้างความสัมพันธ์ที่ยั่งยืนและรู้สึกเหมือนอยู่บ้านในสิงคโปร์'
      }
    },
    footer: 'สร้างสะพาน สร้างชุมชน'
  },
  vi: {
    greeting: {
      morning: 'Chào buổi sáng',
      afternoon: 'Chào buổi chiều',
      evening: 'Chào buổi tối'
    },
    hero: {
      subtitle: 'Kết nối, Học hỏi và Phát triển trong Cộng đồng Mới của Bạn',
      exploreButton: 'Khám phá Hoạt động'
    },
    features: {
      feature1: {
        title: 'Kết nối với Người khác',
        description: 'Tham gia các hoạt động xã hội và gặp gỡ những người từ nhiều nền tảng khác nhau trong cộng đồng của bạn'
      },
      feature2: {
        title: 'Sự kiện Cộng đồng',
        description: 'Khám phá và tham gia các lễ kỷ niệm văn hóa và các buổi tụ họp địa phương'
      },
      feature3: {
        title: 'Xây dựng Tình bạn',
        description: 'Tạo ra những kết nối lâu dài và cảm thấy như ở nhà tại Singapore'
      }
    },
    footer: 'Xây dựng Cầu nối, Tạo ra Cộng đồng'
  },
  id: {
    greeting: {
      morning: 'Selamat Pagi',
      afternoon: 'Selamat Siang',
      evening: 'Selamat Malam'
    },
    hero: {
      subtitle: 'Terhubung, Belajar, dan Berkembang di Komunitas Baru Anda',
      exploreButton: 'Jelajahi Aktivitas'
    },
    features: {
      feature1: {
        title: 'Terhubung dengan Orang Lain',
        description: 'Bergabunglah dengan aktivitas sosial dan temui orang-orang dari berbagai latar belakang di komunitas Anda'
      },
      feature2: {
        title: 'Acara Komunitas',
        description: 'Temukan dan ikuti perayaan budaya dan pertemuan lokal'
      },
      feature3: {
        title: 'Membangun Persahabatan',
        description: 'Ciptakan koneksi yang langgeng dan rasakan seperti di rumah di Singapura'
      }
    },
    footer: 'Membangun Jembatan, Menciptakan Komunitas'
  },
  tl: {
    greeting: {
      morning: 'Magandang Umaga',
      afternoon: 'Magandang Hapon',
      evening: 'Magandang Gabi'
    },
    hero: {
      subtitle: 'Kumonekta, Matuto, at Umunlad sa Iyong Bagong Komunidad',
      exploreButton: 'Tuklasin ang mga Aktibidad'
    },
    features: {
      feature1: {
        title: 'Makipag-ugnayan sa Iba',
        description: 'Sumali sa mga aktibidad sa lipunan at makilala ang mga tao mula sa iba\'t ibang pinagmulan sa iyong komunidad'
      },
      feature2: {
        title: 'Mga Kaganapan sa Komunidad',
        description: 'Tuklasin at lumahok sa mga pagdiriwang ng kultura at mga lokal na pagtitipon'
      },
      feature3: {
        title: 'Bumuo ng Pagkakaibigan',
        description: 'Lumikha ng pangmatagalang koneksyon at makaramdam ng pagiging bahay sa Singapore'
      }
    },
    footer: 'Pagtatayo ng mga Tulay, Paglikha ng mga Komunidad'
  },
  my: {
    greeting: {
      morning: 'မင်္ဂလာနံနက်ခင်းပါ',
      afternoon: 'မင်္ဂလာနေ့လည်ခင်းပါ',
      evening: 'မင်္ဂလာညနေခင်းပါ'
    },
    hero: {
      subtitle: 'သင့်အသစ်သောအသိုင်းအဝိုင်းတွင် ဆက်သွယ်ပါ၊ လေ့လာပါ၊ ရှင်သန်ပါ',
      exploreButton: 'လှုပ်ရှားမှုများကို စူးစမ်းပါ'
    },
    features: {
      feature1: {
        title: 'အခြားသူများနှင့် ဆက်သွယ်ပါ',
        description: 'လူမှုရေးလှုပ်ရှားမှုများတွင် ပါဝင်ပြီး သင့်အသိုင်းအဝိုင်းတွင် မတူညီသောနောက်ခံမှ လူများနှင့် တွေ့ဆုံပါ'
      },
      feature2: {
        title: 'အသိုင်းအဝိုင်းပွဲများ',
        description: 'ယဉ်ကျေးမှုဂုဏ်ပြုပွဲများနှင့် ဒေသခံစုဝေးပွဲများကို ရှာဖွေပြီး ပါဝင်ပါ'
      },
      feature3: {
        title: 'မိတ်ဆွေများတည်ဆောက်ပါ',
        description: 'ရေရှည်ဆက်သွယ်မှုများဖန်တီးပြီး စင်္ကာပူတွင် အိမ်ကဲ့သို့ခံစားပါ'
      }
    },
    footer: 'တံတားများတည်ဆောက်ခြင်း၊ အသိုင်းအဝိုင်းများဖန်တီးခြင်း'
  }
};

export function HomePage({ currentLang }: HomePageProps) {
  const t = nativeTranslations[currentLang] || nativeTranslations.en;
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.greeting.morning;
    if (hour < 18) return t.greeting.afternoon;
    return t.greeting.evening;
  };

  const userName = 'User';

  const features = [
    {
      icon: Users,
      title: t.features.feature1.title,
      description: t.features.feature1.description,
      gradient: 'from-red-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop'
    },
    {
      icon: Calendar,
      title: t.features.feature2.title,
      description: t.features.feature2.description,
      gradient: 'from-green-500 to-emerald-500',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop'
    },
    {
      icon: Heart,
      title: t.features.feature3.title,
      description: t.features.feature3.description,
      gradient: 'from-red-600 to-orange-500',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 via-transparent to-green-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 animate-fade-in">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
            {t.hero.subtitle}
          </p>
          <button
            onClick={() => navigate('/activities')}
            className="mt-4 px-6 py-3 bg-white-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all group"
          >
            {t.hero.exploreButton} <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-red-100">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    loading="lazy"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = `linear-gradient(135deg, ${feature.gradient.replace('from-', '').replace(' to-', ', ')})`;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-20`}></div>
                </div>
                <div className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="bg-cyan-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-medium">{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
