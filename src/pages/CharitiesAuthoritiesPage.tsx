import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Globe, MapPin, Building2, Heart, Shield, Filter } from 'lucide-react';
import { LanguageCode } from '../translations';

interface CharitiesAuthoritiesPageProps {
  currentLang: LanguageCode;
}

interface OrganizationContact {
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
}

interface OrganizationTranslations {
  name: string;
  description: string;
  services: ServiceTag[];
}

type ServiceTag = 'employment-advice' | 'legal-assistance' | 'recreational-activities' | 'emergency-assistance' | 'medical-aid' | 'community-support';

interface PageTranslations {
  backButton: string;
  pageTitle: string;
  pageSubtitle: string;
  authoritiesTitle: string;
  charitiesTitle: string;
  servicesLabel: string;
  visitWebsite: string;
  emergencyTitle: string;
  emergencyDescription: string;
  emergencyContacts: {
    police: string;
    ambulance: string;
    momHotline: string;
  };
  filterLabel: string;
  showAll: string;
  serviceTags: {
    'employment-advice': string;
    'legal-assistance': string;
    'recreational-activities': string;
    'emergency-assistance': string;
    'medical-aid': string;
    'community-support': string;
  };
}

const pageTranslations: Record<LanguageCode, PageTranslations> = {
  en: {
    backButton: 'Back to Help',
    pageTitle: 'Charities & Authorities',
    pageSubtitle: 'Organizations supporting migrant workers in Singapore',
    authoritiesTitle: 'Government Authorities',
    charitiesTitle: 'Non-Profit Organizations',
    servicesLabel: 'Services Provided:',
    visitWebsite: 'Visit Website',
    emergencyTitle: 'Emergency Assistance',
    emergencyDescription: 'If you are in immediate danger or need urgent help, please contact:',
    emergencyContacts: {
      police: 'Police: 999',
      ambulance: 'Ambulance: 995',
      momHotline: 'MOM Hotline: 6438 5122'
    },
    filterLabel: 'Filter by Service:',
    showAll: 'Show All',
    serviceTags: {
      'employment-advice': 'Employment Advice',
      'legal-assistance': 'Legal Assistance',
      'recreational-activities': 'Recreational Activities',
      'emergency-assistance': 'Emergency Assistance',
      'medical-aid': 'Medical Aid',
      'community-support': 'Community Support'
    }
  },
  zh: {
    backButton: '返回帮助',
    pageTitle: '慈善机构与政府部门',
    pageSubtitle: '支持新加坡外籍劳工的组织',
    authoritiesTitle: '政府部门',
    charitiesTitle: '非营利组织',
    servicesLabel: '提供的服务：',
    visitWebsite: '访问网站',
    emergencyTitle: '紧急援助',
    emergencyDescription: '如果您处于紧急危险或需要紧急帮助，请联系：',
    emergencyContacts: {
      police: '警察：999',
      ambulance: '救护车：995',
      momHotline: '人力部热线：6438 5122'
    },
    filterLabel: '按服务筛选：',
    showAll: '显示全部',
    serviceTags: {
      'employment-advice': '就业咨询',
      'legal-assistance': '法律援助',
      'recreational-activities': '娱乐活动',
      'emergency-assistance': '紧急援助',
      'medical-aid': '医疗援助',
      'community-support': '社区支持'
    }
  },
  ms: {
    backButton: 'Kembali ke Bantuan',
    pageTitle: 'Badan Amal & Pihak Berkuasa',
    pageSubtitle: 'Organisasi yang menyokong pekerja asing di Singapura',
    authoritiesTitle: 'Pihak Berkuasa Kerajaan',
    charitiesTitle: 'Organisasi Bukan Untung',
    servicesLabel: 'Perkhidmatan yang Disediakan:',
    visitWebsite: 'Lawati Laman Web',
    emergencyTitle: 'Bantuan Kecemasan',
    emergencyDescription: 'Jika anda dalam bahaya segera atau memerlukan bantuan segera, sila hubungi:',
    emergencyContacts: {
      police: 'Polis: 999',
      ambulance: 'Ambulans: 995',
      momHotline: 'Talian MOM: 6438 5122'
    },
    filterLabel: 'Tapis mengikut Perkhidmatan:',
    showAll: 'Tunjukkan Semua',
    serviceTags: {
      'employment-advice': 'Nasihat Pekerjaan',
      'legal-assistance': 'Bantuan Undang-undang',
      'recreational-activities': 'Aktiviti Rekreasi',
      'emergency-assistance': 'Bantuan Kecemasan',
      'medical-aid': 'Bantuan Perubatan',
      'community-support': 'Sokongan Komuniti'
    }
  },
  ta: {
    backButton: 'உதவிக்குத் திரும்பு',
    pageTitle: 'தொண்டு நிறுவனங்கள் & அதிகாரிகள்',
    pageSubtitle: 'சிங்கப்பூரில் புலம்பெயர்ந்த தொழிலாளர்களை ஆதரிக்கும் அமைப்புகள்',
    authoritiesTitle: 'அரசாங்க அதிகாரிகள்',
    charitiesTitle: 'இலாப நோக்கமற்ற அமைப்புகள்',
    servicesLabel: 'வழங்கப்படும் சேவைகள்:',
    visitWebsite: 'இணையதளத்தைப் பார்வையிடவும்',
    emergencyTitle: 'அவசர உதவி',
    emergencyDescription: 'நீங்கள் உடனடி ஆபத்தில் இருந்தால் அல்லது அவசர உதவி தேவைப்பட்டால், தயவுசெய்து தொடர்பு கொள்ளவும்:',
    emergencyContacts: {
      police: 'காவல்துறை: 999',
      ambulance: 'ஆம்புலன்ஸ்: 995',
      momHotline: 'MOM ஹாட்லைன்: 6438 5122'
    },
    filterLabel: 'சேவை மூலம் வடிகட்டவும்:',
    showAll: 'அனைத்தையும் காட்டு',
    serviceTags: {
      'employment-advice': 'வேலைவாய்ப்பு ஆலோசனை',
      'legal-assistance': 'சட்ட உதவி',
      'recreational-activities': 'பொழுதுபோக்கு நடவடிக்கைகள்',
      'emergency-assistance': 'அவசர உதவி',
      'medical-aid': 'மருத்துவ உதவி',
      'community-support': 'சமூக ஆதரவு'
    }
  },
  bn: {
    backButton: 'সাহায্যে ফিরে যান',
    pageTitle: 'দাতব্য সংস্থা ও কর্তৃপক্ষ',
    pageSubtitle: 'সিঙ্গাপুরে অভিবাসী শ্রমিকদের সহায়তাকারী সংস্থা',
    authoritiesTitle: 'সরকারি কর্তৃপক্ষ',
    charitiesTitle: 'অলাভজনক সংস্থা',
    servicesLabel: 'প্রদত্ত সেবা:',
    visitWebsite: 'ওয়েবসাইট দেখুন',
    emergencyTitle: 'জরুরি সহায়তা',
    emergencyDescription: 'আপনি যদি তাৎক্ষণিক বিপদে থাকেন বা জরুরি সাহায্যের প্রয়োজন হয়, অনুগ্রহ করে যোগাযোগ করুন:',
    emergencyContacts: {
      police: 'পুলিশ: 999',
      ambulance: 'অ্যাম্বুলেন্স: 995',
      momHotline: 'MOM হটলাইন: 6438 5122'
    },
    filterLabel: 'সেবা অনুযায়ী ফিল্টার করুন:',
    showAll: 'সব দেখান',
    serviceTags: {
      'employment-advice': 'কর্মসংস্থান পরামর্শ',
      'legal-assistance': 'আইনি সহায়তা',
      'recreational-activities': 'বিনোদন কার্যক্রম',
      'emergency-assistance': 'জরুরি সহায়তা',
      'medical-aid': 'চিকিৎসা সাহায্য',
      'community-support': 'সম্প্রদায় সহায়তা'
    }
  },
  hi: {
    backButton: 'सहायता पर वापस जाएं',
    pageTitle: 'धर्मार्थ संस्थाएं और अधिकारी',
    pageSubtitle: 'सिंगापुर में प्रवासी श्रमिकों का समर्थन करने वाले संगठन',
    authoritiesTitle: 'सरकारी अधिकारी',
    charitiesTitle: 'गैर-लाभकारी संगठन',
    servicesLabel: 'प्रदान की गई सेवाएं:',
    visitWebsite: 'वेबसाइट पर जाएं',
    emergencyTitle: 'आपातकालीन सहायता',
    emergencyDescription: 'यदि आप तत्काल खतरे में हैं या तुरंत मदद की आवश्यकता है, तो कृपया संपर्क करें:',
    emergencyContacts: {
      police: 'पुलिस: 999',
      ambulance: 'एम्बुलेंस: 995',
      momHotline: 'MOM हॉटलाइन: 6438 5122'
    },
    filterLabel: 'सेवा के अनुसार फ़िल्टर करें:',
    showAll: 'सभी दिखाएं',
    serviceTags: {
      'employment-advice': 'रोजगार सलाह',
      'legal-assistance': 'कानूनी सहायता',
      'recreational-activities': 'मनोरंजन गतिविधियां',
      'emergency-assistance': 'आपातकालीन सहायता',
      'medical-aid': 'चिकित्सा सहायता',
      'community-support': 'सामुदायिक समर्थन'
    }
  },
  th: {
    backButton: 'กลับไปที่ความช่วยเหลือ',
    pageTitle: 'องค์กรการกุศล & หน่วยงานราชการ',
    pageSubtitle: 'องค์กรที่สนับสนุนแรงงานต่างชาติในสิงคโปร์',
    authoritiesTitle: 'หน่วยงานราชการ',
    charitiesTitle: 'องค์กรไม่แสวงหากำไร',
    servicesLabel: 'บริการที่ให้:',
    visitWebsite: 'เยี่ยมชมเว็บไซต์',
    emergencyTitle: 'ความช่วยเหลือฉุกเฉิน',
    emergencyDescription: 'หากคุณอยู่ในอันตรายฉุกเฉินหรือต้องการความช่วยเหลือเร่งด่วน โปรดติดต่อ:',
    emergencyContacts: {
      police: 'ตำรวจ: 999',
      ambulance: 'รถพยาบาล: 995',
      momHotline: 'สายด่วน MOM: 6438 5122'
    },
    filterLabel: 'กรองตามบริการ:',
    showAll: 'แสดงทั้งหมด',
    serviceTags: {
      'employment-advice': 'คำแนะนำการจ้างงาน',
      'legal-assistance': 'ความช่วยเหลือทางกฎหมาย',
      'recreational-activities': 'กิจกรรมนันทนาการ',
      'emergency-assistance': 'ความช่วยเหลือฉุกเฉิน',
      'medical-aid': 'ความช่วยเหลือทางการแพทย์',
      'community-support': 'การสนับสนุนชุมชน'
    }
  },
  vi: {
    backButton: 'Quay về Trợ giúp',
    pageTitle: 'Tổ chức Từ thiện & Cơ quan Chức năng',
    pageSubtitle: 'Các tổ chức hỗ trợ lao động nhập cư tại Singapore',
    authoritiesTitle: 'Cơ quan Chính phủ',
    charitiesTitle: 'Tổ chức Phi lợi nhuận',
    servicesLabel: 'Dịch vụ Cung cấp:',
    visitWebsite: 'Truy cập Trang web',
    emergencyTitle: 'Hỗ trợ Khẩn cấp',
    emergencyDescription: 'Nếu bạn đang gặp nguy hiểm ngay lập tức hoặc cần trợ giúp khẩn cấp, vui lòng liên hệ:',
    emergencyContacts: {
      police: 'Cảnh sát: 999',
      ambulance: 'Xe cứu thương: 995',
      momHotline: 'Đường dây nóng MOM: 6438 5122'
    },
    filterLabel: 'Lọc theo Dịch vụ:',
    showAll: 'Hiển thị Tất cả',
    serviceTags: {
      'employment-advice': 'Tư vấn Việc làm',
      'legal-assistance': 'Hỗ trợ Pháp lý',
      'recreational-activities': 'Hoạt động Giải trí',
      'emergency-assistance': 'Hỗ trợ Khẩn cấp',
      'medical-aid': 'Hỗ trợ Y tế',
      'community-support': 'Hỗ trợ Cộng đồng'
    }
  },
  id: {
    backButton: 'Kembali ke Bantuan',
    pageTitle: 'Badan Amal & Otoritas',
    pageSubtitle: 'Organisasi yang mendukung pekerja migran di Singapura',
    authoritiesTitle: 'Otoritas Pemerintah',
    charitiesTitle: 'Organisasi Nirlaba',
    servicesLabel: 'Layanan yang Disediakan:',
    visitWebsite: 'Kunjungi Situs Web',
    emergencyTitle: 'Bantuan Darurat',
    emergencyDescription: 'Jika Anda dalam bahaya langsung atau memerlukan bantuan mendesak, silakan hubungi:',
    emergencyContacts: {
      police: 'Polisi: 999',
      ambulance: 'Ambulans: 995',
      momHotline: 'Hotline MOM: 6438 5122'
    },
    filterLabel: 'Filter berdasarkan Layanan:',
    showAll: 'Tampilkan Semua',
    serviceTags: {
      'employment-advice': 'Saran Ketenagakerjaan',
      'legal-assistance': 'Bantuan Hukum',
      'recreational-activities': 'Kegiatan Rekreasi',
      'emergency-assistance': 'Bantuan Darurat',
      'medical-aid': 'Bantuan Medis',
      'community-support': 'Dukungan Komunitas'
    }
  },
  tl: {
    backButton: 'Bumalik sa Tulong',
    pageTitle: 'Mga Kawanggawa at Awtoridad',
    pageSubtitle: 'Mga organisasyong sumusuporta sa mga migranteng manggagawa sa Singapore',
    authoritiesTitle: 'Mga Awtoridad ng Gobyerno',
    charitiesTitle: 'Mga Organisasyong Walang Tubo',
    servicesLabel: 'Mga Serbisyong Ibinibigay:',
    visitWebsite: 'Bisitahin ang Website',
    emergencyTitle: 'Tulong sa Emergency',
    emergencyDescription: 'Kung kayo ay nasa agarang panganib o nangangailangan ng agarang tulong, mangyaring makipag-ugnayan sa:',
    emergencyContacts: {
      police: 'Pulis: 999',
      ambulance: 'Ambulansya: 995',
      momHotline: 'MOM Hotline: 6438 5122'
    },
    filterLabel: 'I-filter ayon sa Serbisyo:',
    showAll: 'Ipakita Lahat',
    serviceTags: {
      'employment-advice': 'Payo sa Trabaho',
      'legal-assistance': 'Tulong Legal',
      'recreational-activities': 'Mga Aktibidad sa Libangan',
      'emergency-assistance': 'Tulong sa Emergency',
      'medical-aid': 'Tulong Medikal',
      'community-support': 'Suporta ng Komunidad'
    }
  },
  my: {
    backButton: 'အကူအညီသို့ ပြန်သွားရန်',
    pageTitle: 'ပရဟိတအဖွဲ့များနှင့် အာဏာပိုင်များ',
    pageSubtitle: 'စင်္ကာပူတွင် ရွှေ့ပြောင်းအလုပ်သမားများကို ပံ့ပိုးပေးသော အဖွဲ့အစည်းများ',
    authoritiesTitle: 'အစိုးရအာဏာပိုင်များ',
    charitiesTitle: 'အမြတ်မယူသော အဖွဲ့အစည်းများ',
    servicesLabel: 'ပေးအပ်သော ဝန်ဆောင်မှုများ:',
    visitWebsite: 'ဝက်ဘ်ဆိုက်သို့ သွားရောက်ပါ',
    emergencyTitle: 'အရေးပေါ်အကူအညီ',
    emergencyDescription: 'သင်သည် ချက်ချင်းအန္တရာယ်ရှိနေပါက သို့မဟုတ် အရေးပေါ်အကူအညီလိုအပ်ပါက ကျေးဇူးပြု၍ ဆက်သွယ်ပါ:',
    emergencyContacts: {
      police: 'ရဲ: 999',
      ambulance: 'လူနာတင်ယာဉ်: 995',
      momHotline: 'MOM ဟော့လိုင်း: 6438 5122'
    },
    filterLabel: 'ဝန်ဆောင်မှုအလိုက် စစ်ထုတ်ပါ:',
    showAll: 'အားလုံးပြပါ',
    serviceTags: {
      'employment-advice': 'အလုပ်အကိုင်အကြံပေးခြင်း',
      'legal-assistance': 'ဥပဒေအကူအညီ',
      'recreational-activities': 'အပန်းဖြေလှုပ်ရှားမှုများ',
      'emergency-assistance': 'အရေးပေါ်အကူအညီ',
      'medical-aid': 'ဆေးဘက်ဆိုင်ရာအကူအညီ',
      'community-support': 'လူ့အဖွဲ့အစည်းပံ့ပိုးမှု'
    }
  }
};

const organizationData: Record<string, { services: ServiceTag[] }> = {
  mom: {
    services: ['employment-advice', 'legal-assistance', 'emergency-assistance']
  },
  twc2: {
    services: ['legal-assistance', 'emergency-assistance', 'community-support']
  },
  home: {
    services: ['legal-assistance', 'emergency-assistance', 'community-support', 'medical-aid']
  },
  mwc: {
    services: ['employment-advice', 'recreational-activities', 'community-support']
  },
  fast: {
    services: ['recreational-activities', 'community-support', 'emergency-assistance']
  },
  cde: {
    services: ['recreational-activities', 'community-support', 'emergency-assistance']
  },
  itsrainingraincoats: {
    services: ['community-support', 'emergency-assistance', 'medical-aid']
  },
  healthserve: {
    services: ['medical-aid', 'legal-assistance', 'community-support']
  },
  acmi: {
    services: ['community-support', 'recreational-activities', 'emergency-assistance']
  },
  tadpcp: {
    services: ['legal-assistance', 'community-support', 'recreational-activities']
  }
};

const organizationTranslations: Record<string, Record<LanguageCode, { name: string; description: string }>> = {
  mom: {
    en: {
      name: 'Ministry of Manpower (MOM)',
      description: 'Government agency responsible for foreign worker policies and regulations'
    },
    zh: {
      name: '人力部 (MOM)',
      description: '负责外籍劳工政策和法规的政府机构'
    },
    ms: {
      name: 'Kementerian Tenaga Kerja (MOM)',
      description: 'Agensi kerajaan yang bertanggungjawab untuk dasar dan peraturan pekerja asing'
    },
    ta: {
      name: 'மனிதவள அமைச்சகம் (MOM)',
      description: 'வெளிநாட்டு தொழிலாளர் கொள்கைகள் மற்றும் விதிமுறைகளுக்கு பொறுப்பான அரசாங்க நிறுவனம்'
    },
    bn: {
      name: 'জনশক্তি মন্ত্রণালয় (MOM)',
      description: 'বিদেশী শ্রমিক নীতি এবং প্রবিধানের জন্য দায়ী সরকারি সংস্থা'
    },
    hi: {
      name: 'मानव शक्ति मंत्रालय (MOM)',
      description: 'विदेशी श्रमिक नीतियों और नियमों के लिए जिम्मेदार सरकारी एजेंसी'
    },
    th: {
      name: 'กระทรวงแรงงาน (MOM)',
      description: 'หน่วยงานรัฐที่รับผิดชอบนโยบายและกฎระเบียบแรงงานต่างชาติ'
    },
    vi: {
      name: 'Bộ Nhân lực (MOM)',
      description: 'Cơ quan chính phủ chịu trách nhiệm về chính sách và quy định lao động nước ngoài'
    },
    id: {
      name: 'Kementerian Tenaga Kerja (MOM)',
      description: 'Lembaga pemerintah yang bertanggung jawab atas kebijakan dan peraturan pekerja asing'
    },
    tl: {
      name: 'Ministri ng Lakas-Paggawa (MOM)',
      description: 'Ahensya ng gobyerno na responsable sa mga patakaran at regulasyon ng dayuhang manggagawa'
    },
    my: {
      name: 'လုပ်သားဝန်ကြီးဌာန (MOM)',
      description: 'နိုင်ငံခြားအလုပ်သမားမူဝါဒများနှင့် စည်းမျဉ်းများအတွက် တာဝန်ရှိသော အစိုးရအဖွဲ့'
    }
  },
  twc2: {
    en: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'Non-profit organization advocating for migrant workers rights and welfare'
    },
    zh: {
      name: '临时工也算数 (TWC2)',
      description: '倡导外籍劳工权利和福利的非营利组织'
    },
    ms: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'Organisasi bukan untung yang memperjuangkan hak dan kebajikan pekerja asing'
    },
    ta: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'புலம்பெயர்ந்த தொழிலாளர் உரிமைகள் மற்றும் நலனுக்காக வாதிடும் இலாப நோக்கமற்ற அமைப்பு'
    },
    bn: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'অভিবাসী শ্রমিকদের অধিকার এবং কল্যাণের জন্য সমর্থনকারী অলাভজনক সংস্থা'
    },
    hi: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'प्रवासी श्रमिकों के अधिकारों और कल्याण की वकालत करने वाला गैर-लाभकारी संगठन'
    },
    th: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'องค์กรไม่แสวงหากำไรที่สนับสนุนสิทธิและสวัสดิการของแรงงานต่างชาติ'
    },
    vi: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'Tổ chức phi lợi nhuận ủng hộ quyền lợi và phúc lợi của lao động nhập cư'
    },
    id: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'Organisasi nirlaba yang mengadvokasi hak dan kesejahteraan pekerja migran'
    },
    tl: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'Organisasyong walang tubo na nag-aadvocate para sa mga karapatan at kapakanan ng migranteng manggagawa'
    },
    my: {
      name: 'Transient Workers Count Too (TWC2)',
      description: 'ရွှေ့ပြောင်းအလုပ်သမားများ၏ အခွင့်အရေးနှင့် ကောင်းကျိုးအတွက် ထောက်ခံသော အမြတ်မယူအဖွဲ့'
    }
  },
  home: {
    en: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'Provides shelter, counseling, and advocacy for migrant workers'
    },
    zh: {
      name: '移民经济人道组织 (HOME)',
      description: '为外籍劳工提供庇护所、咨询和倡导服务'
    },
    ms: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'Menyediakan tempat perlindungan, kaunseling, dan advokasi untuk pekerja asing'
    },
    ta: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'புலம்பெயர்ந்த தொழிலாளர்களுக்கு தங்குமிடம், ஆலோசனை மற்றும் வாதாடுதல் வழங்குகிறது'
    },
    bn: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'অভিবাসী শ্রমিকদের জন্য আশ্রয়, পরামর্শ এবং সমর্থন প্রদান করে'
    },
    hi: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'प्रवासी श्रमिकों के लिए आश्रय, परामर्श और वकालत प्रदान करता है'
    },
    th: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'ให้บริการที่พักพิง การให้คำปรึกษา และการสนับสนุนแรงงานต่างชาติ'
    },
    vi: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'Cung cấp nơi trú ẩn, tư vấn và ủng hộ cho lao động nhập cư'
    },
    id: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'Menyediakan tempat tinggal, konseling, dan advokasi untuk pekerja migran'
    },
    tl: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'Nagbibigay ng shelter, counseling, at advocacy para sa migranteng manggagawa'
    },
    my: {
      name: 'Humanitarian Organization for Migration Economics (HOME)',
      description: 'ရွှေ့ပြောင်းအလုပ်သမားများအတွက် တဲအိမ်၊ အကြံပေးခြင်းနှင့် ထောက်ခံမှုပေးသည်'
    }
  },
  mwc: {
    en: {
      name: 'Migrant Workers Centre (MWC)',
      description: 'NTUC-affiliated center providing support and assistance to migrant workers'
    },
    zh: {
      name: '外籍劳工中心 (MWC)',
      description: '隶属于全国职工总会的中心，为外籍劳工提供支持和援助'
    },
    ms: {
      name: 'Pusat Pekerja Asing (MWC)',
      description: 'Pusat gabungan NTUC yang menyediakan sokongan dan bantuan kepada pekerja asing'
    },
    ta: {
      name: 'புலம்பெயர்ந்த தொழிலாளர் மையம் (MWC)',
      description: 'NTUC-உடன் இணைந்த மையம் புலம்பெயர்ந்த தொழிலாளர்களுக்கு ஆதரவு மற்றும் உதவி வழங்குகிறது'
    },
    bn: {
      name: 'অভিবাসী শ্রমিক কেন্দ্র (MWC)',
      description: 'NTUC-সংযুক্ত কেন্দ্র যা অভিবাসী শ্রমিকদের সহায়তা এবং সাহায্য প্রদান করে'
    },
    hi: {
      name: 'प्रवासी श्रमिक केंद्र (MWC)',
      description: 'NTUC-संबद्ध केंद्र जो प्रवासी श्रमिकों को समर्थन और सहायता प्रदान करता है'
    },
    th: {
      name: 'ศูนย์แรงงานต่างชาติ (MWC)',
      description: 'ศูนย์ที่เกี่ยวข้องกับ NTUC ให้การสนับสนุนและความช่วยเหลือแก่แรงงานต่างชาติ'
    },
    vi: {
      name: 'Trung tâm Lao động Nhập cư (MWC)',
      description: 'Trung tâm liên kết NTUC cung cấp hỗ trợ và trợ giúp cho lao động nhập cư'
    },
    id: {
      name: 'Pusat Pekerja Migran (MWC)',
      description: 'Pusat afiliasi NTUC yang memberikan dukungan dan bantuan kepada pekerja migran'
    },
    tl: {
      name: 'Migrant Workers Centre (MWC)',
      description: 'Sentro na kaakibat ng NTUC na nagbibigay ng suporta at tulong sa migranteng manggagawa'
    },
    my: {
      name: 'ရွှေ့ပြောင်းအလုပ်သမားဗဟိုဌာန (MWC)',
      description: 'NTUC နှင့်ဆက်စပ်သော ဗဟိုဌာနသည် ရွှေ့ပြောင်းအလုပ်သမားများကို ပံ့ပိုးမှုနှင့် အကူအညီပေးသည်'
    }
  },
  fast: {
    en: {
      name: 'Foreign Domestic Worker Association for Skills Training (FAST)',
      description: 'Provides skills training and support for domestic workers'
    },
    zh: {
      name: '外籍家庭佣工技能培训协会 (FAST)',
      description: '为家庭佣工提供技能培训和支持'
    },
    ms: {
      name: 'Persatuan Pekerja Rumah Asing untuk Latihan Kemahiran (FAST)',
      description: 'Menyediakan latihan kemahiran dan sokongan untuk pekerja rumah'
    },
    ta: {
      name: 'வெளிநாட்டு வீட்டு பணியாளர் திறன் பயிற்சி சங்கம் (FAST)',
      description: 'வீட்டு பணியாளர்களுக்கு திறன் பயிற்சி மற்றும் ஆதரவு வழங்குகிறது'
    },
    bn: {
      name: 'বিদেশী গৃহকর্মী দক্ষতা প্রশিক্ষণ সমিতি (FAST)',
      description: 'গৃহকর্মীদের জন্য দক্ষতা প্রশিক্ষণ এবং সহায়তা প্রদান করে'
    },
    hi: {
      name: 'विदेशी घरेलू कामगार कौशल प्रशिक्षण संघ (FAST)',
      description: 'घरेलू कामगारों के लिए कौशल प्रशिक्षण और समर्थन प्रदान करता है'
    },
    th: {
      name: 'สมาคมแรงงานบ้านต่างชาติเพื่อการฝึกอบรมทักษะ (FAST)',
      description: 'ให้การฝึกอบรมทักษะและการสนับสนุนสำหรับแรงงานบ้าน'
    },
    vi: {
      name: 'Hiệp hội Đào tạo Kỹ năng cho Lao động Gia đình Nước ngoài (FAST)',
      description: 'Cung cấp đào tạo kỹ năng và hỗ trợ cho lao động gia đình'
    },
    id: {
      name: 'Asosiasi Pekerja Rumah Tangga Asing untuk Pelatihan Keterampilan (FAST)',
      description: 'Menyediakan pelatihan keterampilan dan dukungan untuk pekerja rumah tangga'
    },
    tl: {
      name: 'Foreign Domestic Worker Association for Skills Training (FAST)',
      description: 'Nagbibigay ng pagsasanay sa kasanayan at suporta para sa mga domestic worker'
    },
    my: {
      name: 'နိုင်ငံခြားအိမ်အကူအလုပ်သမားများအတွက် ကျွမ်းကျင်မှုလေ့ကျင့်ရေးအသင်း (FAST)',
      description: 'အိမ်အကူအလုပ်သမားများအတွက် ကျွမ်းကျင်မှုလေ့ကျင့်ရေးနှင့် ပံ့ပိုးမှုပေးသည်'
    }
  },
  cde: {
    en: {
      name: 'Centre for Domestic Employees (CDE)',
      description: 'Catholic organization supporting domestic workers'
    },
    zh: {
      name: '家庭佣工中心 (CDE)',
      description: '支持家庭佣工的天主教组织'
    },
    ms: {
      name: 'Pusat untuk Pekerja Rumah (CDE)',
      description: 'Organisasi Katolik yang menyokong pekerja rumah'
    },
    ta: {
      name: 'வீட்டு பணியாளர் மையம் (CDE)',
      description: 'வீட்டு பணியாளர்களை ஆதரிக்கும் கத்தோலிக்க அமைப்பு'
    },
    bn: {
      name: 'গৃহকর্মী কেন্দ্র (CDE)',
      description: 'গৃহকর্মীদের সমর্থনকারী ক্যাথলিক সংস্থা'
    },
    hi: {
      name: 'घरेलू कर्मचारी केंद्र (CDE)',
      description: 'घरेलू कामगारों का समर्थन करने वाला कैथोलिक संगठन'
    },
    th: {
      name: 'ศูนย์พนักงานบ้าน (CDE)',
      description: 'องค์กรคาทอลิกที่สนับสนุนแรงงานบ้าน'
    },
    vi: {
      name: 'Trung tâm Lao động Gia đình (CDE)',
      description: 'Tổ chức Công giáo hỗ trợ lao động gia đình'
    },
    id: {
      name: 'Pusat untuk Pekerja Rumah Tangga (CDE)',
      description: 'Organisasi Katolik yang mendukung pekerja rumah tangga'
    },
    tl: {
      name: 'Centre for Domestic Employees (CDE)',
      description: 'Organisasyong Katoliko na sumusuporta sa mga domestic worker'
    },
    my: {
      name: 'အိမ်အကူအလုပ်သမားများအတွက် ဗဟိုဌာန (CDE)',
      description: 'အိမ်အကူအလုပ်သမားများကို ပံ့ပိုးသော ကက်သလစ်အဖွဲ့'
    }
  },
  itsrainingraincoats: {
    en: {
      name: "It's Raining Raincoats",
      description: 'Community initiative supporting migrant workers through various programs'
    },
    zh: {
      name: '雨衣行动',
      description: '通过各种项目支持外籍劳工的社区倡议'
    },
    ms: {
      name: "It's Raining Raincoats",
      description: 'Inisiatif komuniti yang menyokong pekerja asing melalui pelbagai program'
    },
    ta: {
      name: "It's Raining Raincoats",
      description: 'பல்வேறு திட்டங்கள் மூலம் புலம்பெயர்ந்த தொழிலாளர்களை ஆதரிக்கும் சமூக முயற்சி'
    },
    bn: {
      name: "It's Raining Raincoats",
      description: 'বিভিন্ন কর্মসূচির মাধ্যমে অভিবাসী শ্রমিকদের সমর্থনকারী সম্প্রদায় উদ্যোগ'
    },
    hi: {
      name: "It's Raining Raincoats",
      description: 'विभिन्न कार्यक्रमों के माध्यम से प्रवासी श्रमिकों का समर्थन करने वाली सामुदायिक पहल'
    },
    th: {
      name: "It's Raining Raincoats",
      description: 'โครงการชุมชนที่สนับสนุนแรงงานต่างชาติผ่านโปรแกรมต่างๆ'
    },
    vi: {
      name: "It's Raining Raincoats",
      description: 'Sáng kiến cộng đồng hỗ trợ lao động nhập cư thông qua các chương trình khác nhau'
    },
    id: {
      name: "It's Raining Raincoats",
      description: 'Inisiatif komunitas yang mendukung pekerja migran melalui berbagai program'
    },
    tl: {
      name: "It's Raining Raincoats",
      description: 'Inisyatiba ng komunidad na sumusuporta sa migranteng manggagawa sa pamamagitan ng iba\'t ibang programa'
    },
    my: {
      name: "It's Raining Raincoats",
      description: 'အမျိုးမျိုးသော အစီအစဉ်များမှတစ်ဆင့် ရွှေ့ပြောင်းအလုပ်သမားများကို ပံ့ပိုးသော လူ့အဖွဲ့အစည်းစီမံကိန်း'
    }
  },
  healthserve: {
    en: {
      name: 'HealthServe',
      description: 'Provides medical and social services to migrant workers'
    },
    zh: {
      name: 'HealthServe',
      description: '为外籍劳工提供医疗和社会服务'
    },
    ms: {
      name: 'HealthServe',
      description: 'Menyediakan perkhidmatan perubatan dan sosial kepada pekerja asing'
    },
    ta: {
      name: 'HealthServe',
      description: 'புலம்பெயர்ந்த தொழிலாளர்களுக்கு மருத்துவ மற்றும் சமூக சேவைகளை வழங்குகிறது'
    },
    bn: {
      name: 'HealthServe',
      description: 'অভিবাসী শ্রমিকদের চিকিৎসা এবং সামাজিক সেবা প্রদান করে'
    },
    hi: {
      name: 'HealthServe',
      description: 'प्रवासी श्रमिकों को चिकित्सा और सामाजिक सेवाएं प्रदान करता है'
    },
    th: {
      name: 'HealthServe',
      description: 'ให้บริการทางการแพทย์และสังคมแก่แรงงานต่างชาติ'
    },
    vi: {
      name: 'HealthServe',
      description: 'Cung cấp dịch vụ y tế và xã hội cho lao động nhập cư'
    },
    id: {
      name: 'HealthServe',
      description: 'Menyediakan layanan medis dan sosial untuk pekerja migran'
    },
    tl: {
      name: 'HealthServe',
      description: 'Nagbibigay ng medikal at sosyal na serbisyo sa migranteng manggagawa'
    },
    my: {
      name: 'HealthServe',
      description: 'ရွှေ့ပြောင်းအလုပ်သမားများအတွက် ဆေးဘက်ဆိုင်ရာနှင့် လူမှုရေးဝန်ဆောင်မှုများပေးသည်'
    }
  },
  acmi: {
    en: {
      name: 'Archdiocesan Commission for the Pastoral Care of Migrants and Itinerant People (ACMI)',
      description: 'Catholic organization providing pastoral care and support'
    },
    zh: {
      name: '移民和流动人口牧灵关怀大主教委员会 (ACMI)',
      description: '提供牧灵关怀和支持的天主教组织'
    },
    ms: {
      name: 'Suruhanjaya Keuskupan Agung untuk Penjagaan Pastoral Pendatang dan Orang Bergerak (ACMI)',
      description: 'Organisasi Katolik yang menyediakan penjagaan pastoral dan sokongan'
    },
    ta: {
      name: 'புலம்பெயர்ந்தோர் மற்றும் நாடோடிகளுக்கான ஆயர் பராமரிப்பு பேராயர் ஆணையம் (ACMI)',
      description: 'ஆயர் பராமரிப்பு மற்றும் ஆதரவை வழங்கும் கத்தோலிக்க அமைப்பு'
    },
    bn: {
      name: 'অভিবাসী এবং ভ্রমণকারীদের যাজকীয় যত্নের জন্য আর্চডায়োসেসান কমিশন (ACMI)',
      description: 'যাজকীয় যত্ন এবং সহায়তা প্রদানকারী ক্যাথলিক সংস্থা'
    },
    hi: {
      name: 'प्रवासियों और यात्रियों की पादरी देखभाल के लिए आर्चडायोसेसन आयोग (ACMI)',
      description: 'पादरी देखभाल और समर्थन प्रदान करने वाला कैथोलिक संगठन'
    },
    th: {
      name: 'คณะกรรมการอัครสังฆมณฑลเพื่อการดูแลอภิบาลผู้อพยพและผู้เดินทาง (ACMI)',
      description: 'องค์กรคาทอลิกที่ให้การดูแลอภิบาลและการสนับสนุน'
    },
    vi: {
      name: 'Ủy ban Tổng Giáo phận về Chăm sóc Mục vụ cho Người Di cư và Người Lưu động (ACMI)',
      description: 'Tổ chức Công giáo cung cấp chăm sóc mục vụ và hỗ trợ'
    },
    id: {
      name: 'Komisi Keuskupan Agung untuk Perawatan Pastoral Migran dan Orang Keliling (ACMI)',
      description: 'Organisasi Katolik yang menyediakan perawatan pastoral dan dukungan'
    },
    tl: {
      name: 'Archdiocesan Commission for the Pastoral Care of Migrants and Itinerant People (ACMI)',
      description: 'Organisasyong Katoliko na nagbibigay ng pastoral care at suporta'
    },
    my: {
      name: 'ရွှေ့ပြောင်းနေထိုင်သူများနှင့် သွားလာသူများအတွက် သင်းအုပ်ဆရာစောင့်ရှောက်မှု ဂိုဏ်းချုပ်ကော်မရှင် (ACMI)',
      description: 'သင်းအုပ်ဆရာစောင့်ရှောက်မှုနှင့် ပံ့ပိုးမှုပေးသော ကက်သလစ်အဖွဲ့'
    }
  },
  tadpcp: {
    en: {
      name: 'The Advocacy and Development Programme for Cambodian, Filipino and Indonesian Workers (TADPCP)',
      description: 'Supports Southeast Asian migrant workers'
    },
    zh: {
      name: '柬埔寨、菲律宾和印度尼西亚劳工倡导和发展计划 (TADPCP)',
      description: '支持东南亚外籍劳工'
    },
    ms: {
      name: 'Program Advokasi dan Pembangunan untuk Pekerja Kemboja, Filipina dan Indonesia (TADPCP)',
      description: 'Menyokong pekerja asing Asia Tenggara'
    },
    ta: {
      name: 'கம்போடிய, பிலிப்பைன்ஸ் மற்றும் இந்தோனேசிய தொழிலாளர்களுக்கான வாதாடல் மற்றும் மேம்பாட்டு திட்டம் (TADPCP)',
      description: 'தென்கிழக்கு ஆசிய புலம்பெயர்ந்த தொழிலாளர்களை ஆதரிக்கிறது'
    },
    bn: {
      name: 'কম্বোডিয়ান, ফিলিপিনো এবং ইন্দোনেশিয়ান শ্রমিকদের জন্য সমর্থন এবং উন্নয়ন কর্মসূচি (TADPCP)',
      description: 'দক্ষিণ-পূর্ব এশীয় অভিবাসী শ্রমিকদের সমর্থন করে'
    },
    hi: {
      name: 'कंबोडियन, फिलिपिनो और इंडोनेशियाई श्रमिकों के लिए वकालत और विकास कार्यक्रम (TADPCP)',
      description: 'दक्षिण पूर्व एशियाई प्रवासी श्रमिकों का समर्थन करता है'
    },
    th: {
      name: 'โปรแกรมการสนับสนุนและพัฒนาสำหรับแรงงานกัมพูชา ฟิลิปปินส์ และอินโดนีเซีย (TADPCP)',
      description: 'สนับสนุนแรงงานต่างชาติเอเชียตะวันออกเฉียงใต้'
    },
    vi: {
      name: 'Chương trình Vận động và Phát triển cho Lao động Campuchia, Philippines và Indonesia (TADPCP)',
      description: 'Hỗ trợ lao động nhập cư Đông Nam Á'
    },
    id: {
      name: 'Program Advokasi dan Pengembangan untuk Pekerja Kamboja, Filipina dan Indonesia (TADPCP)',
      description: 'Mendukung pekerja migran Asia Tenggara'
    },
    tl: {
      name: 'Ang Programa ng Advocacy at Development para sa Cambodian, Filipino at Indonesian Workers (TADPCP)',
      description: 'Sumusuporta sa migranteng manggagawa ng Timog-Silangang Asya'
    },
    my: {
      name: 'ကမ္ဘောဒီးယား၊ ဖိလစ်ပိုင်နှင့် အင်ဒိုနီးရှားအလုပ်သမားများအတွက် ထောက်ခံမှုနှင့် ဖွံ့ဖြိုးရေးအစီအစဉ် (TADPCP)',
      description: 'အရှေ့တောင်အာရှ ရွှေ့ပြောင်းအလုပ်သမားများကို ပံ့ပိုးသည်'
    }
  }
};

export function CharitiesAuthoritiesPage({ currentLang }: CharitiesAuthoritiesPageProps) {
  const navigate = useNavigate();
  const t = pageTranslations[currentLang];
  const [selectedFilter, setSelectedFilter] = useState<ServiceTag | 'all'>('all');

  const getOrganizationData = (orgId: string) => {
    return {
      ...organizationTranslations[orgId][currentLang],
      services: organizationData[orgId].services
    };
  };

  const organizationContacts: Record<string, OrganizationContact> = {
    mom: {
      phone: '6438 5122',
      email: 'mom_fmmd@mom.gov.sg',
      website: 'https://www.mom.gov.sg',
      address: '18 Havelock Road, Singapore 059764'
    },
    twc2: {
      phone: '6247 7001',
      email: 'info@twc2.org.sg',
      website: 'https://twc2.org.sg',
      address: 'Blk 5 Lorong 7 Toa Payoh, #01-341, Singapore 310005'
    },
    home: {
      phone: '6341 5535',
      email: 'info@home.org.sg',
      website: 'https://www.home.org.sg',
      address: '6 Jalan Ubi, Singapore 409065'
    },
    mwc: {
      phone: '6536 2692',
      email: 'mwc@ntuc.org.sg',
      website: 'https://www.mwc.org.sg',
      address: '73 Bukit Timah Road, #01-01, Singapore 229832'
    },
    fast: {
      phone: '6299 4640',
      email: 'admin@fast.org.sg',
      website: 'https://www.fast.org.sg',
      address: '505 Beach Road, #03-68, Singapore 199583'
    },
    cde: {
      phone: '6472 5222',
      email: 'cde@catholic.org.sg',
      website: 'https://www.cde.org.sg',
      address: '2 Highland Road, Singapore 549102'
    },
    itsrainingraincoats: {
      email: 'hello@itsrainingraincoats.sg',
      website: 'https://www.itsrainingraincoats.sg'
    },
    healthserve: {
      phone: '6304 5855',
      email: 'info@healthserve.org.sg',
      website: 'https://www.healthserve.org.sg',
      address: '1 Sophia Road, #05-12 Peace Centre, Singapore 228149'
    },
    acmi: {
      phone: '6298 0278',
      email: 'acmi@catholic.org.sg',
      website: 'https://www.catholic.sg/acmi'
    },
    tadpcp: {
      phone: '6247 1011',
      email: 'tadpcp@singnet.com.sg'
    }
  };

  const authorities = ['mom', 'mwc'];
  const charities = ['twc2', 'home', 'fast', 'cde', 'itsrainingraincoats', 'healthserve', 'acmi', 'tadpcp'];

  const filterOrganizations = (orgIds: string[]) => {
    if (selectedFilter === 'all') return orgIds;
    return orgIds.filter(orgId => 
      organizationData[orgId].services.includes(selectedFilter)
    );
  };

  const filteredAuthorities = filterOrganizations(authorities);
  const filteredCharities = filterOrganizations(charities);

  const OrganizationCard = ({ orgId, type }: { orgId: string; type: 'charity' | 'authority' }) => {
    const orgData = getOrganizationData(orgId);
    const contact = organizationContacts[orgId];

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-slate-100">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl ${type === 'authority' ? 'bg-white' : 'bg-white'}`}>
            {type === 'authority' ? (
              <Shield className="w-6 h-6 text-blue-600" />
            ) : (
              <Heart className="w-6 h-6 text-red-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{orgData.name}</h3>
            <p className="text-slate-600 text-sm mb-3">{orgData.description}</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">{t.servicesLabel}</h4>
          <div className="flex flex-wrap gap-2">
            {orgData.services.map((service, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-transparent text-slate-700 rounded-full text-xs font-medium"
              >
                {t.serviceTags[service]}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-4">
          {contact.phone && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone className="w-4 h-4 text-cyan-800" />
              <a href={`tel:${contact.phone}`} className="hover:text-cyan-800 transition-colors">
                {contact.phone}
              </a>
            </div>
          )}
          {contact.email && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail className="w-4 h-4 text-cyan-800" />
              <a href={`mailto:${contact.email}`} className="hover:text-cyan-800 transition-colors">
                {contact.email}
              </a>
            </div>
          )}
          {contact.website && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Globe className="w-4 h-4 text-cyan-800" />
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-800 transition-colors"
              >
                {t.visitWebsite}
              </a>
            </div>
          )}
          {contact.address && (
            <div className="flex items-start gap-2 text-sm text-slate-600">
              <MapPin className="w-4 h-4 text-cyan-800 mt-0.5 flex-shrink-0" />
              <span>{contact.address}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/help')}
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

        {/* Filter Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-cyan-800" />
            <h3 className="text-lg font-semibold text-slate-900">{t.filterLabel}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedFilter === 'all'
                  ? 'bg-cyan-800 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.showAll}
            </button>
            {(Object.keys(t.serviceTags) as ServiceTag[]).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedFilter(tag)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedFilter === tag
                    ? 'bg-cyan-800 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.serviceTags[tag]}
              </button>
            ))}
          </div>
        </div>

        {/* Authorities Section */}
        {filteredAuthorities.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t.authoritiesTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAuthorities.map(orgId => (
                <OrganizationCard key={orgId} orgId={orgId} type="authority" />
              ))}
            </div>
          </section>
        )}

        {/* Charities Section */}
        {filteredCharities.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t.charitiesTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCharities.map(orgId => (
                <OrganizationCard key={orgId} orgId={orgId} type="charity" />
              ))}
            </div>
          </section>
        )}

        {/* No Results Message */}
        {filteredAuthorities.length === 0 && filteredCharities.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-600">No organizations found with this service</p>
          </div>
        )}

        {/* Emergency Notice */}
        <div className="mt-12 bg-cyan-800 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{t.emergencyTitle}</h3>
          <p className="mb-4">
            {t.emergencyDescription}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">{t.emergencyContacts.police}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">{t.emergencyContacts.ambulance}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">{t.emergencyContacts.momHotline}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
