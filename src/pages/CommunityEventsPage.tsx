import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Tag, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageCode } from '../translations';

interface CommunityEventsPageProps {
  currentLang: LanguageCode;
}

interface CommunityEvent {
  id: number;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  category: Record<LanguageCode, string>;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  image: string;
  tags: Record<LanguageCode, string[]>;
  isRecurring: boolean;
}

// Native translations without external dependencies
const nativeTranslations: Record<LanguageCode, {
  backButton: string;
  pageTitle: string;
  pageDescription: string;
  upcomingEvents: string;
  filterByCategory: string;
  categoryAll: string;
  expectedAttendees: string;
  organizedBy: string;
  learnMore: string;
  annualEvent: string;
  noEventsFound: string;
  viewAllEvents: string;
  footerText: string;
  footerSubtext: string;
  categories: {
    culturalFestival: string;
    religiousFestival: string;
    nationalHoliday: string;
    foodFestival: string;
    sportsAndCultural: string;
    holidayFestival: string;
    culturalParade: string;
  };
}> = {
  en: {
    backButton: 'Back to Menu',
    pageTitle: 'Community Events',
    pageDescription: 'Discover and participate in Singapore\'s vibrant multicultural celebrations and community gatherings',
    upcomingEvents: 'Upcoming Events',
    filterByCategory: 'Filter by Category',
    categoryAll: 'All',
    expectedAttendees: 'expected attendees',
    organizedBy: 'Organized by',
    learnMore: 'Learn More',
    annualEvent: 'Annual Event',
    noEventsFound: 'No events found in this category',
    viewAllEvents: 'View All Events',
    footerText: 'Building Bridges, Celebrating Diversity',
    footerSubtext: 'Stay connected with Singapore\'s vibrant community celebrations',
    categories: {
      culturalFestival: 'Cultural Festival',
      religiousFestival: 'Religious Festival',
      nationalHoliday: 'National Holiday',
      foodFestival: 'Food Festival',
      sportsAndCultural: 'Sports & Cultural',
      holidayFestival: 'Holiday Festival',
      culturalParade: 'Cultural Parade'
    }
  },
  zh: {
    backButton: '返回',
    pageTitle: '社区活动',
    pageDescription: '发现并参与新加坡充满活力的多元文化庆祝活动和社区聚会',
    upcomingEvents: '即将举行的活动',
    filterByCategory: '按类别筛选',
    categoryAll: '全部',
    expectedAttendees: '预期参加者',
    organizedBy: '主办方',
    learnMore: '了解更多',
    annualEvent: '年度活动',
    noEventsFound: '此类别中未找到活动',
    viewAllEvents: '查看所有活动',
    footerText: '搭建桥梁，庆祝多样性',
    footerSubtext: '与新加坡充满活力的社区庆祝活动保持联系',
    categories: {
      culturalFestival: '文化节',
      religiousFestival: '宗教节日',
      nationalHoliday: '国定假日',
      foodFestival: '美食节',
      sportsAndCultural: '体育与文化',
      holidayFestival: '节日庆典',
      culturalParade: '文化游行'
    }
  },
  ms: {
    backButton: 'Kembali',
    pageTitle: 'Acara Komuniti',
    pageDescription: 'Temui dan sertai perayaan pelbagai budaya dan perhimpunan komuniti yang meriah di Singapura',
    upcomingEvents: 'Acara Akan Datang',
    filterByCategory: 'Tapis mengikut Kategori',
    categoryAll: 'Semua',
    expectedAttendees: 'jangkaan peserta',
    organizedBy: 'Dianjurkan oleh',
    learnMore: 'Ketahui Lebih Lanjut',
    annualEvent: 'Acara Tahunan',
    noEventsFound: 'Tiada acara dijumpai dalam kategori ini',
    viewAllEvents: 'Lihat Semua Acara',
    footerText: 'Membina Jambatan, Meraikan Kepelbagaian',
    footerSubtext: 'Kekal berhubung dengan perayaan komuniti Singapura yang meriah',
    categories: {
      culturalFestival: 'Perayaan Budaya',
      religiousFestival: 'Perayaan Agama',
      nationalHoliday: 'Cuti Kebangsaan',
      foodFestival: 'Festival Makanan',
      sportsAndCultural: 'Sukan & Budaya',
      holidayFestival: 'Perayaan Cuti',
      culturalParade: 'Perarakan Budaya'
    }
  },
  ta: {
    backButton: 'பின்செல்',
    pageTitle: 'சமூக நிகழ்வுகள்',
    pageDescription: 'சிங்கப்பூரின் துடிப்பான பன்முக கலாச்சார கொண்டாட்டங்கள் மற்றும் சமூக கூட்டங்களை கண்டறிந்து பங்கேற்கவும்',
    upcomingEvents: 'வரவிருக்கும் நிகழ்வுகள்',
    filterByCategory: 'வகையின்படி வடிகட்டவும்',
    categoryAll: 'அனைத்தும்',
    expectedAttendees: 'எதிர்பார்க்கப்படும் பங்கேற்பாளர்கள்',
    organizedBy: 'ஏற்பாடு செய்தவர்',
    learnMore: 'மேலும் அறிக',
    annualEvent: 'வருடாந்திர நிகழ்வு',
    noEventsFound: 'இந்த வகையில் நிகழ்வுகள் எதுவும் இல்லை',
    viewAllEvents: 'அனைத்து நிகழ்வுகளையும் காண்க',
    footerText: 'பாலங்களை கட்டுதல், பன்முகத்தன்மையை கொண்டாடுதல்',
    footerSubtext: 'சிங்கப்பூரின் துடிப்பான சமூக கொண்டாட்டங்களுடன் இணைந்திருங்கள்',
    categories: {
      culturalFestival: 'கலாச்சார திருவிழா',
      religiousFestival: 'மத திருவிழா',
      nationalHoliday: 'தேசிய விடுமுறை',
      foodFestival: 'உணவு திருவிழா',
      sportsAndCultural: 'விளையாட்டு & கலாச்சாரம்',
      holidayFestival: 'விடுமுறை திருவிழா',
      culturalParade: 'கலாச்சார அணிவகுப்பு'
    }
  },
  bn: {
    backButton: 'ফিরে যান',
    pageTitle: 'সম্প্রদায় ইভেন্ট',
    pageDescription: 'সিঙ্গাপুরের প্রাণবন্ত বহুসাংস্কৃতিক উদযাপন এবং সম্প্রদায় সমাবেশ আবিষ্কার করুন এবং অংশগ্রহণ করুন',
    upcomingEvents: 'আসন্ন ইভেন্ট',
    filterByCategory: 'বিভাগ অনুসারে ফিল্টার করুন',
    categoryAll: 'সব',
    expectedAttendees: 'প্রত্যাশিত অংশগ্রহণকারী',
    organizedBy: 'আয়োজক',
    learnMore: 'আরও জানুন',
    annualEvent: 'বার্ষিক ইভেন্ট',
    noEventsFound: 'এই বিভাগে কোনো ইভেন্ট পাওয়া যায়নি',
    viewAllEvents: 'সব ইভেন্ট দেখুন',
    footerText: 'সেতু নির্মাণ, বৈচিত্র্য উদযাপন',
    footerSubtext: 'সিঙ্গাপুরের প্রাণবন্ত সম্প্রদায় উদযাপনের সাথে সংযুক্ত থাকুন',
    categories: {
      culturalFestival: 'সাংস্কৃতিক উৎসব',
      religiousFestival: 'ধর্মীয় উৎসব',
      nationalHoliday: 'জাতীয় ছুটির দিন',
      foodFestival: 'খাদ্য উৎসব',
      sportsAndCultural: 'ক্রীড়া ও সাংস্কৃতিক',
      holidayFestival: 'ছুটির উৎসব',
      culturalParade: 'সাংস্কৃতিক প্যারেড'
    }
  },
  hi: {
    backButton: 'वापस',
    pageTitle: 'सामुदायिक कार्यक्रम',
    pageDescription: 'सिंगापुर के जीवंत बहुसांस्कृतिक उत्सवों और सामुदायिक समारोहों की खोज करें और भाग लें',
    upcomingEvents: 'आगामी कार्यक्रम',
    filterByCategory: 'श्रेणी के अनुसार फ़िल्टर करें',
    categoryAll: 'सभी',
    expectedAttendees: 'अपेक्षित उपस्थित',
    organizedBy: 'आयोजक',
    learnMore: 'और जानें',
    annualEvent: 'वार्षिक कार्यक्रम',
    noEventsFound: 'इस श्रेणी में कोई कार्यक्रम नहीं मिला',
    viewAllEvents: 'सभी कार्यक्रम देखें',
    footerText: 'पुल बनाना, विविधता का जश्न मनाना',
    footerSubtext: 'सिंगापुर के जीवंत सामुदायिक उत्सवों से जुड़े रहें',
    categories: {
      culturalFestival: 'सांस्कृतिक उत्सव',
      religiousFestival: 'धार्मिक उत्सव',
      nationalHoliday: 'राष्ट्रीय अवकाश',
      foodFestival: 'खाद्य उत्सव',
      sportsAndCultural: 'खेल और सांस्कृतिक',
      holidayFestival: 'अवकाश उत्सव',
      culturalParade: 'सांस्कृतिक परेड'
    }
  },
  th: {
    backButton: 'กลับ',
    pageTitle: 'กิจกรรมชุมชน',
    pageDescription: 'ค้นพบและเข้าร่วมการเฉลิมฉลองวัฒนธรรมที่หลากหลายและการชุมนุมชุมชนที่มีชีวิตชีวาของสิงคโปร์',
    upcomingEvents: 'กิจกรรมที่กำลังจะมาถึง',
    filterByCategory: 'กรองตามหมวดหมู่',
    categoryAll: 'ทั้งหมด',
    expectedAttendees: 'ผู้เข้าร่วมที่คาดว่า',
    organizedBy: 'จัดโดย',
    learnMore: 'เรียนรู้เพิ่มเติม',
    annualEvent: 'กิจกรรมประจำปี',
    noEventsFound: 'ไม่พบกิจกรรมในหมวดหมู่นี้',
    viewAllEvents: 'ดูกิจกรรมทั้งหมด',
    footerText: 'สร้างสะพาน เฉลิมฉลองความหลากหลาย',
    footerSubtext: 'เชื่อมต่อกับการเฉลิมฉลองชุมชนที่มีชีวิตชีวาของสิงคโปร์',
    categories: {
      culturalFestival: 'เทศกาลวัฒนธรรม',
      religiousFestival: 'เทศกาลทางศาสนา',
      nationalHoliday: 'วันหยุดประจำชาติ',
      foodFestival: 'เทศกาลอาหาร',
      sportsAndCultural: 'กีฬาและวัฒนธรรม',
      holidayFestival: 'เทศกาลวันหยุด',
      culturalParade: 'ขบวนแห่วัฒนธรรม'
    }
  },
  vi: {
    backButton: 'Quay lại',
    pageTitle: 'Sự kiện Cộng đồng',
    pageDescription: 'Khám phá và tham gia các lễ kỷ niệm đa văn hóa sôi động và các buổi tụ họp cộng đồng của Singapore',
    upcomingEvents: 'Sự kiện Sắp tới',
    filterByCategory: 'Lọc theo Danh mục',
    categoryAll: 'Tất cả',
    expectedAttendees: 'người tham dự dự kiến',
    organizedBy: 'Tổ chức bởi',
    learnMore: 'Tìm hiểu thêm',
    annualEvent: 'Sự kiện Hàng năm',
    noEventsFound: 'Không tìm thấy sự kiện nào trong danh mục này',
    viewAllEvents: 'Xem Tất cả Sự kiện',
    footerText: 'Xây dựng Cầu nối, Tôn vinh Sự đa dạng',
    footerSubtext: 'Kết nối với các lễ kỷ niệm cộng đồng sôi động của Singapore',
    categories: {
      culturalFestival: 'Lễ hội Văn hóa',
      religiousFestival: 'Lễ hội Tôn giáo',
      nationalHoliday: 'Ngày lễ Quốc gia',
      foodFestival: 'Lễ hội Ẩm thực',
      sportsAndCultural: 'Thể thao & Văn hóa',
      holidayFestival: 'Lễ hội Ngày lễ',
      culturalParade: 'Diễu hành Văn hóa'
    }
  },
  id: {
    backButton: 'Kembali',
    pageTitle: 'Acara Komunitas',
    pageDescription: 'Temukan dan ikuti perayaan multikultural yang semarak dan pertemuan komunitas di Singapura',
    upcomingEvents: 'Acara Mendatang',
    filterByCategory: 'Filter berdasarkan Kategori',
    categoryAll: 'Semua',
    expectedAttendees: 'peserta yang diharapkan',
    organizedBy: 'Diselenggarakan oleh',
    learnMore: 'Pelajari Lebih Lanjut',
    annualEvent: 'Acara Tahunan',
    noEventsFound: 'Tidak ada acara ditemukan dalam kategori ini',
    viewAllEvents: 'Lihat Semua Acara',
    footerText: 'Membangun Jembatan, Merayakan Keberagaman',
    footerSubtext: 'Tetap terhubung dengan perayaan komunitas Singapura yang semarak',
    categories: {
      culturalFestival: 'Festival Budaya',
      religiousFestival: 'Festival Keagamaan',
      nationalHoliday: 'Hari Libur Nasional',
      foodFestival: 'Festival Makanan',
      sportsAndCultural: 'Olahraga & Budaya',
      holidayFestival: 'Festival Liburan',
      culturalParade: 'Parade Budaya'
    }
  },
  tl: {
    backButton: 'Bumalik',
    pageTitle: 'Mga Kaganapan sa Komunidad',
    pageDescription: 'Tuklasin at lumahok sa mga masiglang multikultural na pagdiriwang at pagtitipon ng komunidad ng Singapore',
    upcomingEvents: 'Paparating na mga Kaganapan',
    filterByCategory: 'I-filter ayon sa Kategorya',
    categoryAll: 'Lahat',
    expectedAttendees: 'inaasahang dadalo',
    organizedBy: 'Inorganisa ng',
    learnMore: 'Matuto pa',
    annualEvent: 'Taunang Kaganapan',
    noEventsFound: 'Walang nahanap na kaganapan sa kategoryang ito',
    viewAllEvents: 'Tingnan ang Lahat ng Kaganapan',
    footerText: 'Pagtatayo ng mga Tulay, Pagdiriwang ng Pagkakaiba-iba',
    footerSubtext: 'Manatiling konektado sa mga masiglang pagdiriwang ng komunidad ng Singapore',
    categories: {
      culturalFestival: 'Pista ng Kultura',
      religiousFestival: 'Pista ng Relihiyon',
      nationalHoliday: 'Pambansang Pista Opisyal',
      foodFestival: 'Pista ng Pagkain',
      sportsAndCultural: 'Palakasan at Kultura',
      holidayFestival: 'Pista ng Bakasyon',
      culturalParade: 'Parada ng Kultura'
    }
  },
  my: {
    backButton: 'နောက်သို့',
    pageTitle: 'အသိုင်းအဝိုင်းပွဲများ',
    pageDescription: 'စင်္ကာပူ၏ တက်ကြွသော ယဉ်ကျေးမှုစုံလင်သော ပွဲလမ်းသဘင်များနှင့် အသိုင်းအဝိုင်းစုဝေးပွဲများကို ရှာဖွေပြီး ပါဝင်ပါ',
    upcomingEvents: 'လာမည့်ပွဲများ',
    filterByCategory: 'အမျိုးအစားအလိုက် စစ်ထုတ်ပါ',
    categoryAll: 'အားလုံး',
    expectedAttendees: 'မျှော်လင့်ထားသော တက်ရောက်သူများ',
    organizedBy: 'စီစဉ်သူ',
    learnMore: 'ပိုမိုလေ့လာပါ',
    annualEvent: 'နှစ်စဉ်ပွဲ',
    noEventsFound: 'ဤအမျိုးအစားတွင် ပွဲများမတွေ့ပါ',
    viewAllEvents: 'ပွဲအားလုံးကြည့်ပါ',
    footerText: 'တံတားများတည်ဆောက်ခြင်း၊ ကွဲပြားမှုကို ဂုဏ်ပြုခြင်း',
    footerSubtext: 'စင်္ကာပူ၏ တက်ကြွသော အသိုင်းအဝိုင်းပွဲလမ်းသဘင်များနှင့် ဆက်သွယ်နေပါ',
    categories: {
      culturalFestival: 'ယဉ်ကျေးမှုပွဲတော်',
      religiousFestival: 'ဘာသာရေးပွဲတော်',
      nationalHoliday: 'အမျိုးသားရုံးပိတ်ရက်',
      foodFestival: 'အစားအသောက်ပွဲတော်',
      sportsAndCultural: 'အားကစားနှင့်ယဉ်ကျေးမှု',
      holidayFestival: 'ပိတ်ရက်ပွဲတော်',
      culturalParade: 'ယဉ်ကျေးမှုချီတက်ပွဲ'
    }
  }
};

const mockEvents: CommunityEvent[] = [
  {
    id: 1,
    title: {
      en: 'Chinese New Year Celebrations',
      zh: '春节庆祝活动',
      ms: 'Perayaan Tahun Baru Cina',
      ta: 'சீன புத்தாண்டு கொண்டாட்டங்கள்',
      bn: 'চীনা নববর্ষ উদযাপন',
      hi: 'चीनी नव वर्ष समारोह',
      th: 'การเฉลิมฉลองตรุษจีน',
      vi: 'Lễ Tết Nguyên Đán',
      id: 'Perayaan Tahun Baru Imlek',
      tl: 'Pagdiriwang ng Bagong Taon ng Tsino',
      my: 'တရုတ်နှစ်သစ်ကူးပွဲ'
    },
    description: {
      en: 'Join the vibrant Chinese New Year festivities with lion dances, cultural performances, and traditional food stalls. Experience the rich heritage and celebrate the Lunar New Year with the community.',
      zh: '参加充满活力的春节庆祝活动，包括舞狮、文化表演和传统美食摊位。体验丰富的文化遗产，与社区一起庆祝农历新年。',
      ms: 'Sertai perayaan Tahun Baru Cina yang meriah dengan tarian singa, persembahan budaya, dan gerai makanan tradisional. Alami warisan yang kaya dan raikan Tahun Baru Lunar bersama komuniti.',
      ta: 'சிங்க நடனங்கள், கலாச்சார நிகழ்ச்சிகள் மற்றும் பாரம்பரிய உணவு கடைகளுடன் துடிப்பான சீன புத்தாண்டு கொண்டாட்டங்களில் சேரவும். வளமான பாரம்பரியத்தை அனுபவித்து சமூகத்துடன் சந்திர புத்தாண்டை கொண்டாடுங்கள்।',
      bn: 'সিংহ নৃত্য, সাংস্কৃতিক পরিবেশনা এবং ঐতিহ্যবাহী খাবারের স্টলের সাথে প্রাণবন্ত চীনা নববর্ষ উৎসবে যোগ দিন। সমৃদ্ধ ঐতিহ্য অনুভব করুন এবং সম্প্রদায়ের সাথে চন্দ্র নববর্ষ উদযাপন করুন।',
      hi: 'शेर नृत्य, सांस्कृतिक प्रदर्शन और पारंपरिक खाद्य स्टालों के साथ जीवंत चीनी नव वर्ष उत्सव में शामिल हों। समृद्ध विरासत का अनुभव करें और समुदाय के साथ चंद्र नव वर्ष मनाएं।',
      th: 'เข้าร่วมงานเฉลิมฉลองตรุษจีนที่มีชีวิตชีวาพร้อมการเต้นสิงโต การแสดงทางวัฒนธรรม และร้านอาหารแบบดั้งเดิม สัมผัสมรดกที่อุดมสมบูรณ์และเฉลิมฉลองปีใหม่จันทรคติกับชุมชน',
      vi: 'Tham gia lễ hội Tết Nguyên Đán sôi động với múa lân, biểu diễn văn hóa và các gian hàng ẩm thực truyền thống. Trải nghiệm di sản phong phú và đón Tết Âm lịch cùng cộng đồng.',
      id: 'Bergabunglah dalam perayaan Tahun Baru Imlek yang meriah dengan tarian singa, pertunjukan budaya, dan stan makanan tradisional. Rasakan warisan yang kaya dan rayakan Tahun Baru Imlek bersama komunitas.',
      tl: 'Sumali sa masayang pagdiriwang ng Bagong Taon ng Tsino na may mga sayaw ng leon, pagtatanghal ng kultura, at mga tindahan ng tradisyonal na pagkain. Maranasan ang mayamang pamana at ipagdiwang ang Lunar New Year kasama ang komunidad.',
      my: 'ခြင်္သေ့အကများ၊ ယဉ်ကျေးမှုဖျော်ဖြေပွဲများနှင့် ရိုးရာအစားအသောက်ဆိုင်များဖြင့် တက်ကြွသော တရုတ်နှစ်သစ်ကူးပွဲတွင် ပါဝင်ပါ။ ကြွယ်ဝသော အမွေအနှစ်ကို ခံစားပြီး အသိုင်းအဝိုင်းနှင့်အတူ လပြည့်နှစ်သစ်ကို ဂုဏ်ပြုပါ။'
    },
    category: {
      en: 'Cultural Festival',
      zh: '文化节',
      ms: 'Perayaan Budaya',
      ta: 'கலாச்சார திருவிழா',
      bn: 'সাংস্কৃতিক উৎসব',
      hi: 'सांस्कृतिक उत्सव',
      th: 'เทศกาลวัฒนธรรม',
      vi: 'Lễ hội Văn hóa',
      id: 'Festival Budaya',
      tl: 'Pista ng Kultura',
      my: 'ယဉ်ကျေးမှုပွဲတော်'
    },
    date: '2024-02-10',
    time: '10:00 AM - 10:00 PM',
    location: 'Chinatown Street',
    organizer: 'Singapore Tourism Board',
    attendees: 5000,
    image: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/blogpostsize-1761498018916-778491442-1761498018916-215217679.jpg',
    tags: {
      en: ['Festival', 'Cultural', 'Family-Friendly'],
      zh: ['节日', '文化', '适合家庭'],
      ms: ['Perayaan', 'Budaya', 'Mesra Keluarga'],
      ta: ['திருவிழா', 'கலாச்சாரம்', 'குடும்ப நட்பு'],
      bn: ['উৎসব', 'সাংস্কৃতিক', 'পরিবার-বান্ধব'],
      hi: ['उत्सव', 'सांस्कृतिक', 'परिवार के अनुकूल'],
      th: ['เทศกาล', 'วัฒนธรรม', 'เหมาะสำหรับครอบครัว'],
      vi: ['Lễ hội', 'Văn hóa', 'Thân thiện với gia đình'],
      id: ['Festival', 'Budaya', 'Ramah Keluarga'],
      tl: ['Pista', 'Kultura', 'Pampamilya'],
      my: ['ပွဲတော်', 'ယဉ်ကျေးမှု', 'မိသားစုအတွက်']
    },
    isRecurring: true
  },
  {
    id: 2,
    title: {
      en: 'Hari Raya Puasa Bazaar',
      zh: '开斋节集市',
      ms: 'Bazar Hari Raya Puasa',
      ta: 'ஹரி ராயா புவாசா பஜார்',
      bn: 'হারি রায়া পুয়াসা বাজার',
      hi: 'हरि राया पुआसा बाज़ार',
      th: 'ตลาดฮารีรายาปัวซา',
      vi: 'Chợ Hari Raya Puasa',
      id: 'Bazar Hari Raya Puasa',
      tl: 'Hari Raya Puasa Bazaar',
      my: 'ဟာရီရာယာပူဝါဆာဈေး'
    },
    description: {
      en: 'Celebrate the end of Ramadan at the annual Hari Raya bazaar featuring traditional Malay cuisine, handicrafts, and cultural performances. A wonderful opportunity to experience Malay culture.',
      zh: '在年度开斋节集市庆祝斋月结束，展示传统马来美食、手工艺品和文化表演。体验马来文化的绝佳机会。',
      ms: 'Raikan akhir Ramadan di bazar Hari Raya tahunan yang menampilkan masakan Melayu tradisional, kraftangan, dan persembahan budaya. Peluang yang baik untuk mengalami budaya Melayu.',
      ta: 'பாரம்பரிய மலாய் உணவு வகைகள், கைவினைப் பொருட்கள் மற்றும் கலாச்சார நிகழ்ச்சிகளைக் கொண்ட வருடாந்திர ஹரி ராயா பஜாரில் ரமலானின் முடிவைக் கொண்டாடுங்கள். மலாய் கலாச்சாரத்தை அனுபவிக்க ஒரு அற்புதமான வாய்ப்பு।',
      bn: 'ঐতিহ্যবাহী মালয় খাবার, হস্তশিল্প এবং সাংস্কৃতিক পরিবেশনা সমন্বিত বার্ষিক হারি রায়া বাজারে রমজানের সমাপ্তি উদযাপন করুন। মালয় সংস্কৃতি অনুভব করার একটি চমৎকার সুযোগ।',
      hi: 'पारंपरिक मलय व्यंजन, हस्तशिल्प और सांस्कृतिक प्रदर्शन वाले वार्षिक हरि राया बाज़ार में रमजान के अंत का जश्न मनाएं। मलय संस्कृति का अनुभव करने का एक शानदार अवसर।',
      th: 'เฉลิมฉลองการสิ้นสุดเดือนรอมฎอนที่ตลาดฮารีรายาประจำปีที่มีอาหารมาเลย์แบบดั้งเดิม งานฝีมือ และการแสดงทางวัฒนธรรม โอกาสที่ยอดเยี่ยมในการสัมผัสวัฒนธรรมมาเลย์',
      vi: 'Kỷ niệm kết thúc tháng Ramadan tại chợ Hari Raya hàng năm với ẩm thực Mã Lai truyền thống, đồ thủ công và biểu diễn văn hóa. Cơ hội tuyệt vời để trải nghiệm văn hóa Mã Lai.',
      id: 'Rayakan akhir Ramadan di bazar Hari Raya tahunan yang menampilkan masakan Melayu tradisional, kerajinan tangan, dan pertunjukan budaya. Kesempatan luar biasa untuk mengalami budaya Melayu.',
      tl: 'Ipagdiwang ang pagtatapos ng Ramadan sa taunang Hari Raya bazaar na may tradisyonal na lutuing Malay, mga gawa ng kamay, at pagtatanghal ng kultura. Isang kahanga-hangang pagkakataon upang maranasan ang kulturang Malay.',
      my: 'ရိုးရာမလေးအစားအစာများ၊ လက်မှုပစ္စည်းများနှင့် ယဉ်ကျေးမှုဖျော်ဖြေပွဲများပါဝင်သော နှစ်စဉ်ဟာရီရာယာဈေးတွင် ရမ်ဇာန်လပြီးဆုံးခြင်းကို ဂုဏ်ပြုပါ။ မလေးယဉ်ကျေးမှုကို ခံစားရန် အလွန်ကောင်းသော အခွင့်အလမ်း။'
    },
    category: {
      en: 'Cultural Festival',
      zh: '文化节',
      ms: 'Perayaan Budaya',
      ta: 'கலாச்சார திருவிழா',
      bn: 'সাংস্কৃতিক উৎসব',
      hi: 'सांस्कृतिक उत्सव',
      th: 'เทศกาลวัฒนธรรม',
      vi: 'Lễ hội Văn hóa',
      id: 'Festival Budaya',
      tl: 'Pista ng Kultura',
      my: 'ယဉ်ကျေးမှုပွဲတော်'
    },
    date: '2024-04-10',
    time: '05:00 PM - 11:00 PM',
    location: 'Geylang Serai',
    organizer: 'Malay Heritage Centre',
    attendees: 3000,
    image: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/geylang-serai-hari-raya-1761498433456-943724763-1761498433456-79423560.jpg',
    tags: {
      en: ['Festival', 'Cultural', 'Food'],
      zh: ['节日', '文化', '美食'],
      ms: ['Perayaan', 'Budaya', 'Makanan'],
      ta: ['திருவிழா', 'கலாச்சாரம்', 'உணவு'],
      bn: ['উৎসব', 'সাংস্কৃতিক', 'খাবার'],
      hi: ['उत्सव', 'सांस्कृतिक', 'भोजन'],
      th: ['เทศกาล', 'วัฒนธรรม', 'อาหาร'],
      vi: ['Lễ hội', 'Văn hóa', 'Ẩm thực'],
      id: ['Festival', 'Budaya', 'Makanan'],
      tl: ['Pista', 'Kultura', 'Pagkain'],
      my: ['ပွဲတော်', 'ယဉ်ကျေးမှု', 'အစားအသောက်']
    },
    isRecurring: true
  },
  {
    id: 3,
    title: {
      en: 'Deepavali Light Up',
      zh: '排灯节点灯',
      ms: 'Pencahayaan Deepavali',
      ta: 'தீபாவளி விளக்கு ஏற்றுதல்',
      bn: 'দীপাবলি আলোকসজ্জা',
      hi: 'दीपावली रोशनी',
      th: 'การจุดประทีปดีปาวลี',
      vi: 'Thắp sáng Deepavali',
      id: 'Penerangan Deepavali',
      tl: 'Pagliliwanag ng Deepavali',
      my: 'ဒီပါဝလီမီးထွန်းခြင်း'
    },
    description: {
      en: 'Experience the Festival of Lights with stunning decorations, traditional Indian performances, and authentic Indian street food. Little India transforms into a magical celebration of light and culture.',
      zh: '体验灯节，欣赏令人惊叹的装饰、传统印度表演和正宗的印度街头美食。小印度变成了光明和文化的神奇庆典。',
      ms: 'Alami Perayaan Cahaya dengan hiasan yang menakjubkan, persembahan India tradisional, dan makanan jalanan India yang tulen. Little India berubah menjadi perayaan cahaya dan budaya yang ajaib.',
      ta: 'அற்புதமான அலங்காரங்கள், பாரம்பரிய இந்திய நிகழ்ச்சிகள் மற்றும் உண்மையான இந்திய தெரு உணவுகளுடன் விளக்குகளின் திருவிழாவை அனுபவியுங்கள். லிட்டில் இந்தியா ஒளி மற்றும் கலாச்சாரத்தின் மாயாஜால கொண்டாட்டமாக மாறுகிறது।',
      bn: 'অত্যাশ্চর্য সাজসজ্জা, ঐতিহ্যবাহী ভারতীয় পরিবেশনা এবং খাঁটি ভারতীয় রাস্তার খাবারের সাথে আলোর উৎসব অনুভব করুন। লিটল ইন্ডিয়া আলো এবং সংস্কৃতির একটি জাদুকরী উদযাপনে রূপান্তরিত হয়।',
      hi: 'आश्चर्यजनक सजावट, पारंपरिक भारतीय प्रदर्शन और प्रामाणिक भारतीय स्ट्रीट फूड के साथ रोशनी के त्योहार का अनुभव करें। लिटल इंडिया प्रकाश और संस्कृति के जादुई उत्सव में बदल जाता है।',
      th: 'สัมผัสเทศกาลแห่งแสงสว่างด้วยการตะกแต่งที่สวยงาม การแสดงอินเดียแบบดั้งเดิม และอาหารริมทางอินเดียแท้ ลิตเติ้ลอินเดียเปลี่ยนเป็นการเฉลิมฉลองแสงสว่างและวัฒนธรรมที่มหัศจรรย์',
      vi: 'Trải nghiệm Lễ hội Ánh sáng với những trang trí tuyệt đẹp, biểu diễn Ấn Độ truyền thống và ẩm thực đường phố Ấn Độ chính gốc. Little India biến thành lễ kỷ niệm kỳ diệu của ánh sáng và văn hóa.',
      id: 'Rasakan Festival Cahaya dengan dekorasi yang menakjubkan, pertunjukan India tradisional, dan makanan jalanan India yang autentik. Little India berubah menjadi perayaan cahaya dan budaya yang ajaib.',
      tl: 'Maranasan ang Pista ng mga Ilaw na may kahanga-hangang mga dekorasyon, tradisyonal na pagtatanghal ng India, at tunay na pagkaing kalye ng India. Ang Little India ay nagiging mahiwagang pagdiriwang ng liwanag at kultura.',
      my: 'အံ့သြဖွယ်အလှဆင်မှုများ၊ ရိုးရာအိန္ဒိယဖျော်ဖြေပွဲများနှင့် စစ်မှန်သော အိန္ဒိယလမ်းဘေးအစားအသောက်များဖြင့် အလင်းရောင်ပွဲတော်ကို ခံစားပါ။ လစ်တယ်အိန္ဒိယသည် အလင်းရောင်နှင့် ယဉ်ကျေးမှု၏ မှော်ဆန်သော ဂုဏ်ပြုပွဲအဖြစ် ပြောင်းလဲသွားသည်။'
    },
    category: {
      en: 'Cultural Festival',
      zh: '文化节',
      ms: 'Perayaan Budaya',
      ta: 'கலாச்சார திருவிழா',
      bn: 'সাংস্কৃতিক উৎসব',
      hi: 'सांस्कृतिक उत्सव',
      th: 'เทศกาลวัฒนธรรม',
      vi: 'Lễ hội Văn hóa',
      id: 'Festival Budaya',
      tl: 'Pista ng Kultura',
      my: 'ယဉ်ကျေးမှုပွဲတော်'
    },
    date: '2024-11-01',
    time: '06:00 PM - 12:00 AM',
    location: 'Little India',
    organizer: 'Little India Shopkeepers Association',
    attendees: 4000,
    image: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/atddeepavalitemplediyasfeaturephoto-1761499370438-72579006-1761499370437-3870957.webp',
    tags: {
      en: ['Festival', 'Cultural', 'Lights'],
      zh: ['节日', '文化', '灯光'],
      ms: ['Perayaan', 'Budaya', 'Cahaya'],
      ta: ['திருவிழா', 'கலாச்சாரம்', 'விளக்குகள்'],
      bn: ['উৎসব', 'সাংস্কৃতিক', 'আলো'],
      hi: ['उत्सव', 'सांस्कृतिक', 'रोशनी'],
      th: ['เทศกาล', 'วัฒนธรรม', 'แสงสว่าง'],
      vi: ['Lễ hội', 'Văn hóa', 'Ánh sáng'],
      id: ['Festival', 'Budaya', 'Cahaya'],
      tl: ['Pista', 'Kultura', 'Ilaw'],
      my: ['ပွဲတော်', 'ယဉ်ကျေးမှု', 'မီးအလင်း']
    },
    isRecurring: true
  },
  {
    id: 4,
    title: {
      en: 'National Day Celebrations',
      zh: '国庆庆典',
      ms: 'Perayaan Hari Kebangsaan',
      ta: 'தேசிய தின கொண்டாட்டங்கள்',
      bn: 'জাতীয় দিবস উদযাপন',
      hi: 'राष्ट्रीय दिवस समारोह',
      th: 'การเฉลิมฉลองวันชาติ',
      vi: 'Lễ kỷ niệm Quốc khánh',
      id: 'Perayaan Hari Nasional',
      tl: 'Pagdiriwang ng Araw ng Bansa',
      my: 'အမျိုးသားနေ့ဂုဏ်ပြုပွဲ'
    },
    description: {
      en: 'Celebrate Singapore\'s independence with spectacular fireworks, military parade, cultural performances, and community activities. A day of national pride and unity.',
      zh: '通过壮观的烟花、军事游行、文化表演和社区活动庆祝新加坡独立。这是民族自豪感和团结的一天。',
      ms: 'Raikan kemerdekaan Singapura dengan bunga api yang menakjubkan, perarakan tentera, persembahan budaya, dan aktiviti komuniti. Hari kebanggaan dan perpaduan nasional.',
      ta: 'அற்புதமான பட்டாசுகள், இராணுவ அணிவகுப்பு, கலாச்சார நிகழ்ச்சிகள் மற்றும் சமூக நடவடிக்கைகளுடன் சிங்கப்பூரின் சுதந்திரத்தை கொண்டாடுங்கள். தேசிய பெருமை மற்றும் ஒற்றுமையின் நாள்।',
      bn: 'দর্শনীয় আতশবাজি, সামরিক কুচকাওয়াজ, সাংস্কৃতিক পরিবেশনা এবং সম্প্রদায় কার্যক্রমের সাথে সিঙ্গাপুরের স্বাধীনতা উদযাপন করুন। জাতীয় গর্ব এবং ঐক্যের দিন।',
      hi: 'शानदार आतिशबाजी, सैन्य परेड, सांस्कृतिक प्रदर्शन और सामुदायिक गतिविधियों के साथ सिंगापुर की स्वतंत्रता का जश्न मनाएं। राष्ट्रीय गौरव और एकता का दिन।',
      th: 'เฉลิมฉลองเอกราชของสิงคโปร์ด้วยดอกไม้ไฟที่งดงาม ขบวนพาเหรดทหาร การแสดงทางวัฒนธรรม และกิจกรรมชุมชน วันแห่งความภาคภูมิใจและความสามัคคีของชาติ',
      vi: 'Kỷ niệm độc lập của Singapore với pháo hoa ngoạn mục, diễu hành quân sự, biểu diễn văn hóa và hoạt động cộng đồng. Một ngày của niềm tự hào và đoàn kết dân tộc.',
      id: 'Rayakan kemerdekaan Singapura dengan kembang api spektakuler, parade militer, pertunjukan budaya, dan kegiatan komunitas. Hari kebanggaan dan persatuan nasional.',
      tl: 'Ipagdiwang ang kalayaan ng Singapore na may kahanga-hangang paputok, parade ng militar, pagtatanghal ng kultura, at mga aktibidad ng komunidad. Isang araw ng pambansang pagmamalaki at pagkakaisa.',
      my: 'စင်္ကာပူ၏ လွတ်လပ်ရေးကို အံ့သြဖွယ်မီးရှူးမီးပန်းများ၊ စစ်တပ်ချီတက်ပွဲ၊ ယဉ်ကျေးမှုဖျော်ဖြေပွဲများနှင့် အသိုင်းအဝိုင်းလှုပ်ရှားမှုများဖြင့် ဂုဏ်ပြုပါ။ အမျိုးသားဂုဏ်ယူမှုနှင့် စည်းလုံးညီညွတ်မှု၏ နေ့။'
    },
    category: {
      en: 'National Holiday',
      zh: '国定假日',
      ms: 'Cuti Kebangsaan',
      ta: 'தேசிய விடுமுறை',
      bn: 'জাতীয় ছুটির দিন',
      hi: 'राष्ट्रीय अवकाश',
      th: 'วันหยุดประจำชาติ',
      vi: 'Ngày lễ Quốc gia',
      id: 'Hari Libur Nasional',
      tl: 'Pambansang Pista Opisyal',
      my: 'အမျိုးသားရုံးပိတ်ရက်'
    },
    date: '2024-08-09',
    time: '09:00 AM - 11:00 PM',
    location: 'Marina Bay',
    organizer: 'National Day Parade Committee',
    attendees: 25000,
    image: 'https://cdn.chatandbuild.com/users/68ecb8c35277769a374ab424/parade-3-1761498898061-740408154-1761498898060-581955934.webp',
    tags: {
      en: ['National', 'Fireworks', 'Parade'],
      zh: ['国家', '烟花', '游行'],
      ms: ['Kebangsaan', 'Bunga Api', 'Perarakan'],
      ta: ['தேசிய', 'பட்டாசு', 'அணிவகுப்பு'],
      bn: ['জাতীয়', 'আতশবাজি', 'কুচকাওয়াজ'],
      hi: ['राष्ट्रीय', 'आतिशबाजी', 'परेड'],
      th: ['ชาติ', 'ดอกไม้ไฟ', 'ขบวนพาเหรด'],
      vi: ['Quốc gia', 'Pháo hoa', 'Diễu hành'],
      id: ['Nasional', 'Kembang Api', 'Parade'],
      tl: ['Pambansa', 'Paputok', 'Parade'],
      my: ['အမျိုးသား', 'မီးရှူးမီးပန်း', 'ချီတက်ပွဲ']
    },
    isRecurring: true
  }
];

export function CommunityEventsPage({ currentLang }: CommunityEventsPageProps) {
  const t = nativeTranslations[currentLang] || nativeTranslations.en;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    t.categories.culturalFestival,
    t.categories.religiousFestival,
    t.categories.nationalHoliday,
    t.categories.foodFestival,
    t.categories.sportsAndCultural,
    t.categories.holidayFestival,
    t.categories.culturalParade
  ];

  const filteredEvents = selectedCategory === 'All' || selectedCategory === t.categoryAll
    ? mockEvents 
    : mockEvents.filter(event => event.category[currentLang] === selectedCategory);

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'default', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/activities')}
          className="group flex items-center gap-2 px-6 py-3 bg-transparent text-cyan-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          {t.backButton}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-cyan-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 animate-fade-in">
            {t.pageTitle}
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
            {t.pageDescription}
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <Calendar className="w-5 h-5 text-cyan-800" />
            <span className="font-semibold">{sortedEvents.length} {t.upcomingEvents}</span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-cyan-800" />
            {t.filterByCategory}
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-cyan-800 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title[currentLang]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-slate-100 text-cyan-800 rounded-full text-xs font-bold shadow-lg">
                  {event.category[currentLang]}
                </div>

                {/* Recurring Badge */}
                {event.isRecurring && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-cyan-800 rounded-full text-xs font-bold shadow-lg">
                    {t.annualEvent}
                  </div>
                )}
              </div>
              
              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                  {event.title[currentLang]}
                </h3>
                
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {event.description[currentLang]}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-sm text-slate-700">
                    <Calendar className="w-4 h-4 text-cyan-800 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-cyan-800 mt-0.5 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm text-slate-700">
                    <MapPin className="w-4 h-4 text-cyan-800 mt-0.5 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Users className="w-4 h-4 text-cyan-800 flex-shrink-0" />
                    <span>{event.attendees.toLocaleString()}+ {t.expectedAttendees}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags[currentLang].map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-100 text-cyan-800 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Organizer */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    {t.organizedBy} <span className="font-semibold text-slate-700">{event.organizer}</span>
                  </p>
                </div>

                {/* Learn More Button */}
                <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 group">
                  <span>{t.learnMore}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Events Message */}
        {sortedEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-600">{t.noEventsFound}</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-6 py-3 bg-cyan-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {t.viewAllEvents}
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-medium">{t.footerText}</p>
          <p className="text-sm text-blue-200 mt-2">
            {t.footerSubtext}
          </p>
        </div>
      </footer>
    </div>
  );
}
