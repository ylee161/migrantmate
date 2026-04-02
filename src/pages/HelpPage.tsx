import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, Calculator, Send, Users, AlertTriangle, Utensils, Home, BookOpen, Heart } from 'lucide-react';
import { LanguageCode } from '../translations';

interface HelpPageProps {
  currentLang: LanguageCode;
}

// Native translations for all text
const translations = {
  en: {
    backButton: 'Back to Home',
    pageTitle: 'Need Help?',
    pageSubtitle: 'Access support services and resources',
    legalAssistance: {
      title: 'Legal Assistance',
      learnRights: 'Learn My Rights',
      learnRightsDesc: 'Understand your employment rights and protections',
      charitiesAuthorities: 'Charities and Authorities',
      charitiesAuthoritiesDesc: 'Connect with organizations that can help you'
    },
    financialSupport: {
      title: 'Financial Support',
      calculator: 'Financial Calculator',
      calculatorDesc: 'Calculate the money you bring home',
      remittance: 'Remittance Assistance',
      remittanceDesc: 'Find the best ways to send money home'
    },
    communitySupport: {
      title: 'Food Services',
      foodShare: 'Community Food Share',
      foodShareDesc: 'Share or find food within the community',
      foodSafety: 'Food Safety Report',
      foodSafetyDesc: 'Report food safety concerns'
    },
    emergencyServices: {
      title: 'Emergency Services',
      shelter: 'Emergency Shelter',
      shelterDesc: 'Find temporary accommodation in emergencies',
      emergency: 'Emergency Contacts',
      emergencyDesc: 'Police: 999 | Ambulance: 995 | MOM: 6438 5122'
    }
  },
  zh: {
    backButton: '返回主页',
    pageTitle: '需要帮助？',
    pageSubtitle: '获取支持服务和资源',
    legalAssistance: {
      title: '法律援助',
      learnRights: '了解我的权利',
      learnRightsDesc: '了解您的就业权利和保护',
      charitiesAuthorities: '慈善机构与政府部门',
      charitiesAuthoritiesDesc: '联系可以帮助您的组织'
    },
    financialSupport: {
      title: '财务支持',
      calculator: '财务计算器',
      calculatorDesc: '计算您带回家的钱',
      remittance: '汇款援助',
      remittanceDesc: '找到最佳的汇款方式'
    },
    communitySupport: {
      title: '社区支持',
      foodShare: '社区食物分享',
      foodShareDesc: '在社区内分享或寻找食物',
      foodSafety: '食品安全报告',
      foodSafetyDesc: '报告食品安全问题'
    },
    emergencyServices: {
      title: '紧急服务',
      shelter: '紧急庇护所',
      shelterDesc: '在紧急情况下寻找临时住所',
      emergency: '紧急联系方式',
      emergencyDesc: '警察：999 | 救护车：995 | 人力部：6438 5122'
    }
  },
  ms: {
    backButton: 'Kembali ke Laman Utama',
    pageTitle: 'Perlukan Bantuan?',
    pageSubtitle: 'Akses perkhidmatan sokongan dan sumber',
    legalAssistance: {
      title: 'Bantuan Undang-undang',
      learnRights: 'Ketahui Hak Saya',
      learnRightsDesc: 'Fahami hak pekerjaan dan perlindungan anda',
      charitiesAuthorities: 'Badan Amal & Pihak Berkuasa',
      charitiesAuthoritiesDesc: 'Berhubung dengan organisasi yang boleh membantu anda'
    },
    financialSupport: {
      title: 'Sokongan Kewangan',
      calculator: 'Kalkulator Kewangan',
      calculatorDesc: 'Kira wang yang anda bawa pulang',
      remittance: 'Bantuan Kiriman Wang',
      remittanceDesc: 'Cari cara terbaik untuk menghantar wang pulang'
    },
    communitySupport: {
      title: 'Sokongan Komuniti',
      foodShare: 'Perkongsian Makanan Komuniti',
      foodShareDesc: 'Kongsi atau cari makanan dalam komuniti',
      foodSafety: 'Laporan Keselamatan Makanan',
      foodSafetyDesc: 'Laporkan kebimbangan keselamatan makanan'
    },
    emergencyServices: {
      title: 'Perkhidmatan Kecemasan',
      shelter: 'Tempat Perlindungan Kecemasan',
      shelterDesc: 'Cari penginapan sementara dalam kecemasan',
      emergency: 'Kenalan Kecemasan',
      emergencyDesc: 'Polis: 999 | Ambulans: 995 | MOM: 6438 5122'
    }
  },
  ta: {
    backButton: 'முகப்புக்குத் திரும்பு',
    pageTitle: 'உதவி தேவையா?',
    pageSubtitle: 'ஆதரவு சேவைகள் மற்றும் வளங்களை அணுகவும்',
    legalAssistance: {
      title: 'சட்ட உதவி',
      learnRights: 'எனது உரிமைகளை அறிக',
      learnRightsDesc: 'உங்கள் வேலைவாய்ப்பு உரிமைகள் மற்றும் பாதுகாப்புகளைப் புரிந்து கொள்ளுங்கள்',
      charitiesAuthorities: 'தொண்டு நிறுவனங்கள் & அதிகாரிகள்',
      charitiesAuthoritiesDesc: 'உங்களுக்கு உதவக்கூடிய அமைப்புகளுடன் தொடர்பு கொள்ளுங்கள்'
    },
    financialSupport: {
      title: 'நிதி ஆதரவு',
      calculator: 'நிதி கணிப்பான்',
      calculatorDesc: 'நீங்கள் வீட்டிற்கு எடுத்துச் செல்லும் பணத்தைக் கணக்கிடுங்கள்',
      remittance: 'பணம் அனுப்புதல் உதவி',
      remittanceDesc: 'வீட்டிற்கு பணம் அனுப்ப சிறந்த வழிகளைக் கண்டறியுங்கள்'
    },
    communitySupport: {
      title: 'சமூக ஆதரவு',
      foodShare: 'சமூக உணவு பகிர்வு',
      foodShareDesc: 'சமூகத்தில் உணவைப் பகிரவும் அல்லது கண்டறியவும்',
      foodSafety: 'உணவு பாதுகாப்பு அறிக்கை',
      foodSafetyDesc: 'உணவு பாதுகாப்பு கவலைகளைப் புகாரளிக்கவும்'
    },
    emergencyServices: {
      title: 'அவசர சேவைகள்',
      shelter: 'அவசர தங்குமிடம்',
      shelterDesc: 'அவசரநிலைகளில் தற்காலிக தங்குமிடத்தைக் கண்டறியுங்கள்',
      emergency: 'அவசர தொடர்புகள்',
      emergencyDesc: 'காவல்துறை: 999 | ஆம்புலன்ஸ்: 995 | MOM: 6438 5122'
    }
  },
  bn: {
    backButton: 'হোমে ফিরে যান',
    pageTitle: 'সাহায্য প্রয়োজন?',
    pageSubtitle: 'সহায়তা সেবা এবং সম্পদ অ্যাক্সেস করুন',
    legalAssistance: {
      title: 'আইনি সহায়তা',
      learnRights: 'আমার অধিকার জানুন',
      learnRightsDesc: 'আপনার কর্মসংস্থান অধিকার এবং সুরক্ষা বুঝুন',
      charitiesAuthorities: 'দাতব্য সংস্থা ও কর্তৃপক্ষ',
      charitiesAuthoritiesDesc: 'আপনাকে সাহায্য করতে পারে এমন সংস্থার সাথে যোগাযোগ করুন'
    },
    financialSupport: {
      title: 'আর্থিক সহায়তা',
      calculator: 'আর্থিক ক্যালকুলেটর',
      calculatorDesc: 'আপনি বাড়িতে নিয়ে আসা টাকা গণনা করুন',
      remittance: 'রেমিট্যান্স সহায়তা',
      remittanceDesc: 'বাড়িতে টাকা পাঠানোর সেরা উপায় খুঁজুন'
    },
    communitySupport: {
      title: 'সম্প্রদায় সহায়তা',
      foodShare: 'সম্প্রদায় খাদ্য ভাগাভাগি',
      foodShareDesc: 'সম্প্রদায়ের মধ্যে খাবার ভাগ করুন বা খুঁজুন',
      foodSafety: 'খাদ্য নিরাপত্তা রিপোর্ট',
      foodSafetyDesc: 'খাদ্য নিরাপত্তা উদ্বেগ রিপোর্ট করুন'
    },
    emergencyServices: {
      title: 'জরুরি সেবা',
      shelter: 'জরুরি আশ্রয়',
      shelterDesc: 'জরুরি অবস্থায় অস্থায়ী আবাসন খুঁজুন',
      emergency: 'জরুরি যোগাযোগ',
      emergencyDesc: 'পুলিশ: 999 | অ্যাম্বুলেন্স: 995 | MOM: 6438 5122'
    }
  },
  hi: {
    backButton: 'होम पर वापस जाएं',
    pageTitle: 'मदद चाहिए?',
    pageSubtitle: 'सहायता सेवाओं और संसाधनों तक पहुंचें',
    legalAssistance: {
      title: 'कानूनी सहायता',
      learnRights: 'मेरे अधिकार जानें',
      learnRightsDesc: 'अपने रोजगार अधिकारों और सुरक्षा को समझें',
      charitiesAuthorities: 'धर्मार्थ संस्थाएं और अधिकारी',
      charitiesAuthoritiesDesc: 'उन संगठनों से जुड़ें जो आपकी मदद कर सकते हैं'
    },
    financialSupport: {
      title: 'वित्तीय सहायता',
      calculator: 'वित्तीय कैलकुलेटर',
      calculatorDesc: 'आप घर लाने वाले पैसे की गणना करें',
      remittance: 'प्रेषण सहायता',
      remittanceDesc: 'घर पैसे भेजने के सर्वोत्तम तरीके खोजें'
    },
    communitySupport: {
      title: 'सामुदायिक सहायता',
      foodShare: 'सामुदायिक भोजन साझाकरण',
      foodShareDesc: 'समुदाय के भीतर भोजन साझा करें या खोजें',
      foodSafety: 'खाद्य सुरक्षा रिपोर्ट',
      foodSafetyDesc: 'खाद्य सुरक्षा चिंताओं की रिपोर्ट करें'
    },
    emergencyServices: {
      title: 'आपातकालीन सेवाएं',
      shelter: 'आपातकालीन आश्रय',
      shelterDesc: 'आपात स्थिति में अस्थायी आवास खोजें',
      emergency: 'आपातकालीन संपर्क',
      emergencyDesc: 'पुलिस: 999 | एम्बुलेंस: 995 | MOM: 6438 5122'
    }
  },
  th: {
    backButton: 'กลับสู่หน้าหลัก',
    pageTitle: 'ต้องการความช่วยเหลือ?',
    pageSubtitle: 'เข้าถึงบริการสนับสนุนและทรัพยากร',
    legalAssistance: {
      title: 'ความช่วยเหลือทางกฎหมาย',
      learnRights: 'เรียนรู้สิทธิของฉัน',
      learnRightsDesc: 'ทำความเข้าใจสิทธิการจ้างงานและการคุ้มครองของคุณ',
      charitiesAuthorities: 'องค์กรการกุศล & หน่วยงานราชการ',
      charitiesAuthoritiesDesc: 'เชื่อมต่อกับองค์กรที่สามารถช่วยเหลือคุณได้'
    },
    financialSupport: {
      title: 'การสนับสนุนทางการเงิน',
      calculator: 'เครื่องคิดเลขทางการเงิน',
      calculatorDesc: 'คำนวณเงินที่คุณนำกลับบ้าน',
      remittance: 'ความช่วยเหลือการส่งเงิน',
      remittanceDesc: 'ค้นหาวิธีที่ดีที่สุดในการส่งเงินกลับบ้าน'
    },
    communitySupport: {
      title: 'การสนับสนุนชุมชน',
      foodShare: 'การแบ่งปันอาหารชุมชน',
      foodShareDesc: 'แบ่งปันหรือค้นหาอาหารภายในชุมชน',
      foodSafety: 'รายงานความปลอดภัยอาหาร',
      foodSafetyDesc: 'รายงานความกังวลเกี่ยวกับความปลอดภัยของอาหาร'
    },
    emergencyServices: {
      title: 'บริการฉุกเฉิน',
      shelter: 'ที่พักพิงฉุกเฉิน',
      shelterDesc: 'ค้นหาที่พักชั่วคราวในกรณีฉุกเฉิน',
      emergency: 'ติดต่อฉุกเฉิน',
      emergencyDesc: 'ตำรวจ: 999 | รถพยาบาล: 995 | MOM: 6438 5122'
    }
  },
  vi: {
    backButton: 'Quay về Trang chủ',
    pageTitle: 'Cần Giúp Đỡ?',
    pageSubtitle: 'Truy cập dịch vụ hỗ trợ và tài nguyên',
    legalAssistance: {
      title: 'Hỗ trợ Pháp lý',
      learnRights: 'Tìm hiểu Quyền của Tôi',
      learnRightsDesc: 'Hiểu quyền lợi và bảo vệ việc làm của bạn',
      charitiesAuthorities: 'Tổ chức Từ thiện & Cơ quan Chức năng',
      charitiesAuthoritiesDesc: 'Kết nối với các tổ chức có thể giúp bạn'
    },
    financialSupport: {
      title: 'Hỗ trợ Tài chính',
      calculator: 'Máy tính Tài chính',
      calculatorDesc: 'Tính số tiền bạn mang về nhà',
      remittance: 'Hỗ trợ Chuyển tiền',
      remittanceDesc: 'Tìm cách tốt nhất để gửi tiền về nhà'
    },
    communitySupport: {
      title: 'Hỗ trợ Cộng đồng',
      foodShare: 'Chia sẻ Thực phẩm Cộng đồng',
      foodShareDesc: 'Chia sẻ hoặc tìm thực phẩm trong cộng đồng',
      foodSafety: 'Báo cáo An toàn Thực phẩm',
      foodSafetyDesc: 'Báo cáo các vấn đề về an toàn thực phẩm'
    },
    emergencyServices: {
      title: 'Dịch vụ Khẩn cấp',
      shelter: 'Nơi trú ẩn Khẩn cấp',
      shelterDesc: 'Tìm chỗ ở tạm thời trong trường hợp khẩn cấp',
      emergency: 'Liên hệ Khẩn cấp',
      emergencyDesc: 'Cảnh sát: 999 | Xe cứu thương: 995 | MOM: 6438 5122'
    }
  },
  id: {
    backButton: 'Kembali ke Beranda',
    pageTitle: 'Butuh Bantuan?',
    pageSubtitle: 'Akses layanan dukungan dan sumber daya',
    legalAssistance: {
      title: 'Bantuan Hukum',
      learnRights: 'Pelajari Hak Saya',
      learnRightsDesc: 'Pahami hak dan perlindungan pekerjaan Anda',
      charitiesAuthorities: 'Badan Amal & Otoritas',
      charitiesAuthoritiesDesc: 'Terhubung dengan organisasi yang dapat membantu Anda'
    },
    financialSupport: {
      title: 'Dukungan Keuangan',
      calculator: 'Kalkulator Keuangan',
      calculatorDesc: 'Hitung uang yang Anda bawa pulang',
      remittance: 'Bantuan Pengiriman Uang',
      remittanceDesc: 'Temukan cara terbaik untuk mengirim uang pulang'
    },
    communitySupport: {
      title: 'Dukungan Komunitas',
      foodShare: 'Berbagi Makanan Komunitas',
      foodShareDesc: 'Bagikan atau temukan makanan dalam komunitas',
      foodSafety: 'Laporan Keamanan Pangan',
      foodSafetyDesc: 'Laporkan kekhawatiran keamanan pangan'
    },
    emergencyServices: {
      title: 'Layanan Darurat',
      shelter: 'Tempat Tinggal Darurat',
      shelterDesc: 'Temukan akomodasi sementara dalam keadaan darurat',
      emergency: 'Kontak Darurat',
      emergencyDesc: 'Polisi: 999 | Ambulans: 995 | MOM: 6438 5122'
    }
  },
  tl: {
    backButton: 'Bumalik sa Home',
    pageTitle: 'Kailangan ng Tulong?',
    pageSubtitle: 'I-access ang mga serbisyo ng suporta at mapagkukunan',
    legalAssistance: {
      title: 'Tulong Legal',
      learnRights: 'Alamin ang Aking mga Karapatan',
      learnRightsDesc: 'Unawain ang iyong mga karapatan at proteksyon sa trabaho',
      charitiesAuthorities: 'Mga Kawanggawa at Awtoridad',
      charitiesAuthoritiesDesc: 'Kumonekta sa mga organisasyong makakatulong sa iyo'
    },
    financialSupport: {
      title: 'Suportang Pinansyal',
      calculator: 'Kalkulador ng Pananalapi',
      calculatorDesc: 'Kalkulahin ang perang dadalhin mo sa bahay',
      remittance: 'Tulong sa Padala',
      remittanceDesc: 'Hanapin ang pinakamahusay na paraan upang magpadala ng pera sa bahay'
    },
    communitySupport: {
      title: 'Suporta ng Komunidad',
      foodShare: 'Pagbabahagi ng Pagkain sa Komunidad',
      foodShareDesc: 'Magbahagi o maghanap ng pagkain sa loob ng komunidad',
      foodSafety: 'Ulat ng Kaligtasan ng Pagkain',
      foodSafetyDesc: 'Iulat ang mga alalahanin sa kaligtasan ng pagkain'
    },
    emergencyServices: {
      title: 'Mga Serbisyo sa Emergency',
      shelter: 'Emergency Shelter',
      shelterDesc: 'Maghanap ng pansamantalang tirahan sa mga emergency',
      emergency: 'Mga Kontak sa Emergency',
      emergencyDesc: 'Pulis: 999 | Ambulansya: 995 | MOM: 6438 5122'
    }
  },
  my: {
    backButton: 'ပင်မစာမျက်နှာသို့ ပြန်သွားရန်',
    pageTitle: 'အကူအညီလိုအပ်ပါသလား?',
    pageSubtitle: 'ပံ့ပိုးမှုဝန်ဆောင်မှုများနှင့် အရင်းအမြစ်များကို ဝင်ရောက်ကြည့်ရှုပါ',
    legalAssistance: {
      title: 'ဥပဒေအကူအညီ',
      learnRights: 'ကျွန်ုပ်၏အခွင့်အရေးများကို လေ့လာပါ',
      learnRightsDesc: 'သင့်အလုပ်အကိုင်အခွင့်အရေးများနှင့် ကာကွယ်မှုများကို နားလည်ပါ',
      charitiesAuthorities: 'ပရဟိတအဖွဲ့များနှင့် အာဏာပိုင်များ',
      charitiesAuthoritiesDesc: 'သင့်ကို ကူညီနိုင်သော အဖွဲ့အစည်းများနှင့် ဆက်သွယ်ပါ'
    },
    financialSupport: {
      title: 'ဘဏ္ဍာရေးပံ့ပိုးမှု',
      calculator: 'ဘဏ္ဍာရေးတွက်စက်',
      calculatorDesc: 'သင်အိမ်သို့ယူဆောင်လာသောငွေကို တွက်ချက်ပါ',
      remittance: 'ငွေလွှဲအကူအညီ',
      remittanceDesc: 'အိမ်သို့ ငွေပို့ရန် အကောင်းဆုံးနည်းလမ်းများကို ရှာပါ'
    },
    communitySupport: {
      title: 'လူ့အဖွဲ့အစည်းပံ့ပိုးမှု',
      foodShare: 'လူ့အဖွဲ့အစည်းအစားအသောက်မျှဝေခြင်း',
      foodShareDesc: 'လူ့အဖွဲ့အစည်းအတွင်း အစားအသောက်မျှဝေပါ သို့မဟုတ် ရှာပါ',
      foodSafety: 'အစားအသောက်ဘေးကင်းရေးအစီရင်ခံစာ',
      foodSafetyDesc: 'အစားအသောက်ဘေးကင်းရေးစိုးရိမ်မှုများကို အစီရင်ခံပါ'
    },
    emergencyServices: {
      title: 'အရေးပေါ်ဝန်ဆောင်မှုများ',
      shelter: 'အရေးပေါ်တဲအိမ်',
      shelterDesc: 'အရေးပေါ်အခြေအနေများတွင် ယာယီနေရာထိုင်ခင်းရှာပါ',
      emergency: 'အရေးပေါ်ဆက်သွယ်ရန်',
      emergencyDesc: 'ရဲ: 999 | လူနာတင်ယာဉ်: 995 | MOM: 6438 5122'
    }
  }
};

export function HelpPage({ currentLang }: HelpPageProps) {
  const navigate = useNavigate();
  const t = translations[currentLang];

  const ServiceCard = ({ 
    icon: Icon, 
    title, 
    description, 
    onClick,
    gradient 
  }: { 
    icon: React.ElementType; 
    title: string; 
    description: string; 
    onClick: () => void;
    gradient: string;
  }) => (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden p-6 text-left w-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-800 transition-all duration-300">
            {title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backButton}</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            {t.pageTitle}
          </h1>
          <p className="text-lg text-slate-600">
            {t.pageSubtitle}
          </p>
        </div>

        {/* Legal Assistance Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Scale className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t.legalAssistance.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ServiceCard
              icon={BookOpen}
              title={t.legalAssistance.learnRights}
              description={t.legalAssistance.learnRightsDesc}
              onClick={() => navigate('/learn-my-rights')}
              gradient="from-blue-600 to-indigo-600"
            />
            <ServiceCard
              icon={Heart}
              title={t.legalAssistance.charitiesAuthorities}
              description={t.legalAssistance.charitiesAuthoritiesDesc}
              onClick={() => navigate('/charities')}
              gradient="from-red-600 to-pink-600"
            />
          </div>
        </section>

        {/* Financial Support Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t.financialSupport.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ServiceCard
              icon={Calculator}
              title={t.financialSupport.calculator}
              description={t.financialSupport.calculatorDesc}
              onClick={() => navigate('/financial-calculator')}
              gradient="from-green-600 to-emerald-600"
            />
            <ServiceCard
              icon={Send}
              title={t.financialSupport.remittance}
              description={t.financialSupport.remittanceDesc}
              onClick={() => navigate('/remittance-assistance')}
              gradient="from-teal-600 to-cyan-600"
            />
          </div>
        </section>

        {/* Community Support Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t.communitySupport.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ServiceCard
              icon={Utensils}
              title={t.communitySupport.foodShare}
              description={t.communitySupport.foodShareDesc}
              onClick={() => navigate('/community-food-share')}
              gradient="from-purple-600 to-violet-600"
            />
            <ServiceCard
              icon={FileText}
              title={t.communitySupport.foodSafety}
              description={t.communitySupport.foodSafetyDesc}
              onClick={() => navigate('/food-safety-report')}
              gradient="from-orange-600 to-red-600"
            />
          </div>
        </section>

        {/* Emergency Services Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t.emergencyServices.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ServiceCard
              icon={Home}
              title={t.emergencyServices.shelter}
              description={t.emergencyServices.shelterDesc}
              onClick={() => navigate('/emergency-shelter')}
              gradient="from-red-600 to-rose-600"
            />
            <div className="bg-cyan-800 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-bold">{t.emergencyServices.emergency}</h3>
              </div>
              <p className="text-sm opacity-90">
                {t.emergencyServices.emergencyDesc}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
