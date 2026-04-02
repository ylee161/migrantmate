import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { ArrowLeft, MapPin, Users, Calendar, Clock, Tag, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageCode } from '../translations';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ActivitiesNearYouPageProps {
  currentLang: LanguageCode;
}

interface Activity {
  id: number;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  category: Record<LanguageCode, string>;
  date: string;
  time: string;
  location: string;
  coordinates: [number, number];
  attendees: number;
  organizer: string;
  tags: Record<LanguageCode, string[]>;
  distance: string;
}

// Native translations without external dependencies
const nativeTranslations: Record<LanguageCode, {
  backButton: string;
  pageTitle: string;
  pageDescription: string;
  myLocation: string;
  activitiesNearby: string;
  filterByCategory: string;
  categoryAll: string;
  sortBy: string;
  sortByDistance: string;
  sortByDate: string;
  sortByAttendees: string;
  expectedAttendees: string;
  organizedBy: string;
  joinActivity: string;
  getDirections: string;
  away: string;
  noActivitiesFound: string;
  viewAllActivities: string;
  loadingLocation: string;
  categories: {
    socialGathering: string;
    sportsAndFitness: string;
    culturalEvent: string;
    workshop: string;
    volunteering: string;
    foodAndDining: string;
    outdoorActivity: string;
    artAndCraft: string;
  };
}> = {
  en: {
    backButton: 'Back',
    pageTitle: 'Activities Near You',
    pageDescription: 'Discover social activities and events happening in your area',
    myLocation: 'My Location',
    activitiesNearby: 'activities nearby',
    filterByCategory: 'Filter by Category',
    categoryAll: 'All',
    sortBy: 'Sort by',
    sortByDistance: 'Distance',
    sortByDate: 'Date',
    sortByAttendees: 'Popularity',
    expectedAttendees: 'expected attendees',
    organizedBy: 'Organized by',
    joinActivity: 'Join Activity',
    getDirections: 'Get Directions',
    away: 'away',
    noActivitiesFound: 'No activities found in this category',
    viewAllActivities: 'View All Activities',
    loadingLocation: 'Loading your location...',
    categories: {
      socialGathering: 'Social Gathering',
      sportsAndFitness: 'Sports & Fitness',
      culturalEvent: 'Cultural Event',
      workshop: 'Workshop',
      volunteering: 'Volunteering',
      foodAndDining: 'Food & Dining',
      outdoorActivity: 'Outdoor Activity',
      artAndCraft: 'Art & Craft'
    }
  },
  zh: {
    backButton: '返回',
    pageTitle: '附近的活动',
    pageDescription: '发现您所在地区正在进行的社交活动和活动',
    myLocation: '我的位置',
    activitiesNearby: '附近的活动',
    filterByCategory: '按类别筛选',
    categoryAll: '全部',
    sortBy: '排序方式',
    sortByDistance: '距离',
    sortByDate: '日期',
    sortByAttendees: '热门度',
    expectedAttendees: '预期参加者',
    organizedBy: '主办方',
    joinActivity: '加入活动',
    getDirections: '获取路线',
    away: '远',
    noActivitiesFound: '此类别中未找到活动',
    viewAllActivities: '查看所有活动',
    loadingLocation: '正在加载您的位置...',
    categories: {
      socialGathering: '社交聚会',
      sportsAndFitness: '体育健身',
      culturalEvent: '文化活动',
      workshop: '工作坊',
      volunteering: '志愿服务',
      foodAndDining: '美食餐饮',
      outdoorActivity: '户外活动',
      artAndCraft: '艺术手工'
    }
  },
  ms: {
    backButton: 'Kembali',
    pageTitle: 'Aktiviti Berhampiran Anda',
    pageDescription: 'Temui aktiviti sosial dan acara yang berlaku di kawasan anda',
    myLocation: 'Lokasi Saya',
    activitiesNearby: 'aktiviti berdekatan',
    filterByCategory: 'Tapis mengikut Kategori',
    categoryAll: 'Semua',
    sortBy: 'Susun mengikut',
    sortByDistance: 'Jarak',
    sortByDate: 'Tarikh',
    sortByAttendees: 'Populariti',
    expectedAttendees: 'jangkaan peserta',
    organizedBy: 'Dianjurkan oleh',
    joinActivity: 'Sertai Aktiviti',
    getDirections: 'Dapatkan Arah',
    away: 'jauh',
    noActivitiesFound: 'Tiada aktiviti dijumpai dalam kategori ini',
    viewAllActivities: 'Lihat Semua Aktiviti',
    loadingLocation: 'Memuatkan lokasi anda...',
    categories: {
      socialGathering: 'Perhimpunan Sosial',
      sportsAndFitness: 'Sukan & Kecergasan',
      culturalEvent: 'Acara Budaya',
      workshop: 'Bengkel',
      volunteering: 'Sukarelawan',
      foodAndDining: 'Makanan & Makan',
      outdoorActivity: 'Aktiviti Luar',
      artAndCraft: 'Seni & Kraf'
    }
  },
  ta: {
    backButton: 'பின்செல்',
    pageTitle: 'உங்களுக்கு அருகில் உள்ள செயல்பாடுகள்',
    pageDescription: 'உங்கள் பகுதியில் நடக்கும் சமூக செயல்பாடுகள் மற்றும் நிகழ்வுகளைக் கண்டறியவும்',
    myLocation: 'எனது இடம்',
    activitiesNearby: 'அருகிலுள்ள செயல்பாடுகள்',
    filterByCategory: 'வகையின்படி வடிகட்டவும்',
    categoryAll: 'அனைத்தும்',
    sortBy: 'வரிசைப்படுத்து',
    sortByDistance: 'தூரம்',
    sortByDate: 'தேதி',
    sortByAttendees: 'பிரபலம்',
    expectedAttendees: 'எதிர்பார்க்கப்படும் பங்கேற்பாளர்கள்',
    organizedBy: 'ஏற்பாடு செய்தவர்',
    joinActivity: 'செயல்பாட்டில் சேரவும்',
    getDirections: 'வழிகளைப் பெறுக',
    away: 'தொலைவில்',
    noActivitiesFound: 'இந்த வகையில் செயல்பாடுகள் எதுவும் இல்லை',
    viewAllActivities: 'அனைத்து செயல்பாடுகளையும் காண்க',
    loadingLocation: 'உங்கள் இடத்தை ஏற்றுகிறது...',
    categories: {
      socialGathering: 'சமூக கூட்டம்',
      sportsAndFitness: 'விளையாட்டு & உடற்பயிற்சி',
      culturalEvent: 'கலாச்சார நிகழ்வு',
      workshop: 'பட்டறை',
      volunteering: 'தன்னார்வம்',
      foodAndDining: 'உணவு & உணவருந்துதல்',
      outdoorActivity: 'வெளிப்புற செயல்பாடு',
      artAndCraft: 'கலை & கைவினை'
    }
  },
  bn: {
    backButton: 'ফিরে যান',
    pageTitle: 'আপনার কাছাকাছি কার্যক্রম',
    pageDescription: 'আপনার এলাকায় ঘটছে সামাজিক কার্যক্রম এবং ইভেন্ট আবিষ্কার করুন',
    myLocation: 'আমার অবস্থান',
    activitiesNearby: 'কাছাকাছি কার্যক্রম',
    filterByCategory: 'বিভাগ অনুসারে ফিল্টার করুন',
    categoryAll: 'সব',
    sortBy: 'সাজান',
    sortByDistance: 'দূরত্ব',
    sortByDate: 'তারিখ',
    sortByAttendees: 'জনপ্রিয়তা',
    expectedAttendees: 'প্রত্যাশিত অংশগ্রহণকারী',
    organizedBy: 'আয়োজক',
    joinActivity: 'কার্যক্রমে যোগ দিন',
    getDirections: 'দিকনির্দেশ পান',
    away: 'দূরে',
    noActivitiesFound: 'এই বিভাগে কোনো কার্যক্রম পাওয়া যায়নি',
    viewAllActivities: 'সব কার্যক্রম দেখুন',
    loadingLocation: 'আপনার অবস্থান লোড হচ্ছে...',
    categories: {
      socialGathering: 'সামাজিক সমাবেশ',
      sportsAndFitness: 'ক্রীড়া ও ফিটনেস',
      culturalEvent: 'সাংস্কৃতিক অনুষ্ঠান',
      workshop: 'কর্মশালা',
      volunteering: 'স্বেচ্ছাসেবা',
      foodAndDining: 'খাদ্য ও ভোজন',
      outdoorActivity: 'বহিরঙ্গন কার্যক্রম',
      artAndCraft: 'শিল্প ও কারুশিল্প'
    }
  },
  hi: {
    backButton: 'वापस',
    pageTitle: 'आपके पास की गतिविधियाँ',
    pageDescription: 'अपने क्षेत्र में हो रही सामाजिक गतिविधियों और कार्यक्रमों की खोज करें',
    myLocation: 'मेरा स्थान',
    activitiesNearby: 'पास की गतिविधियाँ',
    filterByCategory: 'श्रेणी के अनुसार फ़िल्टर करें',
    categoryAll: 'सभी',
    sortBy: 'क्रमबद्ध करें',
    sortByDistance: 'दूरी',
    sortByDate: 'तारीख',
    sortByAttendees: 'लोकप्रियता',
    expectedAttendees: 'अपेक्षित उपस्थित',
    organizedBy: 'आयोजक',
    joinActivity: 'गतिविधि में शामिल हों',
    getDirections: 'दिशा-निर्देश प्राप्त करें',
    away: 'दूर',
    noActivitiesFound: 'इस श्रेणी में कोई गतिविधि नहीं मिली',
    viewAllActivities: 'सभी गतिविधियाँ देखें',
    loadingLocation: 'आपका स्थान लोड हो रहा है...',
    categories: {
      socialGathering: 'सामाजिक सभा',
      sportsAndFitness: 'खेल और फिटनेस',
      culturalEvent: 'सांस्कृतिक कार्यक्रम',
      workshop: 'कार्यशाला',
      volunteering: 'स्वयंसेवा',
      foodAndDining: 'भोजन और भोजन',
      outdoorActivity: 'बाहरी गतिविधि',
      artAndCraft: 'कला और शिल्प'
    }
  },
  th: {
    backButton: 'กลับ',
    pageTitle: 'กิจกรรมใกล้คุณ',
    pageDescription: 'ค้นพบกิจกรรมทางสังคมและกิจกรรมที่เกิดขึ้นในพื้นที่ของคุณ',
    myLocation: 'ตำแหน่งของฉัน',
    activitiesNearby: 'กิจกรรมใกล้เคียง',
    filterByCategory: 'กรองตามหมวดหมู่',
    categoryAll: 'ทั้งหมด',
    sortBy: 'เรียงตาม',
    sortByDistance: 'ระยะทาง',
    sortByDate: 'วันที่',
    sortByAttendees: 'ความนิยม',
    expectedAttendees: 'ผู้เข้าร่วมที่คาดว่า',
    organizedBy: 'จัดโดย',
    joinActivity: 'เข้าร่วมกิจกรรม',
    getDirections: 'รับเส้นทาง',
    away: 'ห่าง',
    noActivitiesFound: 'ไม่พบกิจกรรมในหมวดหมู่นี้',
    viewAllActivities: 'ดูกิจกรรมทั้งหมด',
    loadingLocation: 'กำลังโหลดตำแหน่งของคุณ...',
    categories: {
      socialGathering: 'การชุมนุมทางสังคม',
      sportsAndFitness: 'กีฬาและฟิตเนส',
      culturalEvent: 'กิจกรรมทางวัฒนธรรม',
      workshop: 'เวิร์คช็อป',
      volunteering: 'อาสาสมัคร',
      foodAndDining: 'อาหารและการรับประทานอาหาร',
      outdoorActivity: 'กิจกรรมกลางแจ้ง',
      artAndCraft: 'ศิลปะและงานฝีมือ'
    }
  },
  vi: {
    backButton: 'Quay lại',
    pageTitle: 'Hoạt động Gần Bạn',
    pageDescription: 'Khám phá các hoạt động xã hội và sự kiện đang diễn ra trong khu vực của bạn',
    myLocation: 'Vị trí của tôi',
    activitiesNearby: 'hoạt động gần đây',
    filterByCategory: 'Lọc theo Danh mục',
    categoryAll: 'Tất cả',
    sortBy: 'Sắp xếp theo',
    sortByDistance: 'Khoảng cách',
    sortByDate: 'Ngày',
    sortByAttendees: 'Độ phổ biến',
    expectedAttendees: 'người tham dự dự kiến',
    organizedBy: 'Tổ chức bởi',
    joinActivity: 'Tham gia Hoạt động',
    getDirections: 'Lấy Chỉ đường',
    away: 'xa',
    noActivitiesFound: 'Không tìm thấy hoạt động nào trong danh mục này',
    viewAllActivities: 'Xem Tất cả Hoạt động',
    loadingLocation: 'Đang tải vị trí của bạn...',
    categories: {
      socialGathering: 'Tụ họp Xã hội',
      sportsAndFitness: 'Thể thao & Thể dục',
      culturalEvent: 'Sự kiện Văn hóa',
      workshop: 'Hội thảo',
      volunteering: 'Tình nguyện',
      foodAndDining: 'Ẩm thực & Ăn uống',
      outdoorActivity: 'Hoạt động Ngoài trời',
      artAndCraft: 'Nghệ thuật & Thủ công'
    }
  },
  id: {
    backButton: 'Kembali',
    pageTitle: 'Aktivitas di Dekat Anda',
    pageDescription: 'Temukan aktivitas sosial dan acara yang terjadi di area Anda',
    myLocation: 'Lokasi Saya',
    activitiesNearby: 'aktivitas terdekat',
    filterByCategory: 'Filter berdasarkan Kategori',
    categoryAll: 'Semua',
    sortBy: 'Urutkan berdasarkan',
    sortByDistance: 'Jarak',
    sortByDate: 'Tanggal',
    sortByAttendees: 'Popularitas',
    expectedAttendees: 'peserta yang diharapkan',
    organizedBy: 'Diselenggarakan oleh',
    joinActivity: 'Bergabung dengan Aktivitas',
    getDirections: 'Dapatkan Petunjuk Arah',
    away: 'jauhnya',
    noActivitiesFound: 'Tidak ada aktivitas ditemukan dalam kategori ini',
    viewAllActivities: 'Lihat Semua Aktivitas',
    loadingLocation: 'Memuat lokasi Anda...',
    categories: {
      socialGathering: 'Pertemuan Sosial',
      sportsAndFitness: 'Olahraga & Kebugaran',
      culturalEvent: 'Acara Budaya',
      workshop: 'Lokakarya',
      volunteering: 'Kesukarelaan',
      foodAndDining: 'Makanan & Makan',
      outdoorActivity: 'Aktivitas Luar Ruangan',
      artAndCraft: 'Seni & Kerajinan'
    }
  },
  tl: {
    backButton: 'Bumalik',
    pageTitle: 'Mga Aktibidad Malapit sa Iyo',
    pageDescription: 'Tuklasin ang mga aktibidad sa lipunan at mga kaganapan na nangyayari sa iyong lugar',
    myLocation: 'Aking Lokasyon',
    activitiesNearby: 'mga aktibidad malapit',
    filterByCategory: 'I-filter ayon sa Kategorya',
    categoryAll: 'Lahat',
    sortBy: 'Ayusin ayon sa',
    sortByDistance: 'Distansya',
    sortByDate: 'Petsa',
    sortByAttendees: 'Katanyagan',
    expectedAttendees: 'inaasahang dadalo',
    organizedBy: 'Inorganisa ng',
    joinActivity: 'Sumali sa Aktibidad',
    getDirections: 'Kumuha ng Direksyon',
    away: 'layo',
    noActivitiesFound: 'Walang nahanap na aktibidad sa kategoryang ito',
    viewAllActivities: 'Tingnan ang Lahat ng Aktibidad',
    loadingLocation: 'Naglo-load ng iyong lokasyon...',
    categories: {
      socialGathering: 'Pagtitipon sa Lipunan',
      sportsAndFitness: 'Palakasan at Fitness',
      culturalEvent: 'Kaganapan sa Kultura',
      workshop: 'Workshop',
      volunteering: 'Boluntaryo',
      foodAndDining: 'Pagkain at Kainan',
      outdoorActivity: 'Aktibidad sa Labas',
      artAndCraft: 'Sining at Crafts'
    }
  },
  my: {
    backButton: 'နောက်သို့',
    pageTitle: 'သင့်အနီးရှိ လှုပ်ရှားမှုများ',
    pageDescription: 'သင့်ဒေသတွင် ဖြစ်ပျက်နေသော လူမှုရေးလှုပ်ရှားမှုများနှင့် အစီအစဉ်များကို ရှာဖွေပါ',
    myLocation: 'ကျွန်ုပ်၏တည်နေရာ',
    activitiesNearby: 'အနီးအနားရှိ လှုပ်ရှားမှုများ',
    filterByCategory: 'အမျိုးအစားအလိုက် စစ်ထုတ်ပါ',
    categoryAll: 'အားလုံး',
    sortBy: 'စီစဉ်ပါ',
    sortByDistance: 'အကွာအဝေး',
    sortByDate: 'ရက်စွဲ',
    sortByAttendees: 'လူကြိုက်များမှု',
    expectedAttendees: 'မျှော်လင့်ထားသော တက်ရောက်သူများ',
    organizedBy: 'စီစဉ်သူ',
    joinActivity: 'လှုပ်ရှားမှုတွင် ပါဝင်ပါ',
    getDirections: 'လမ်းညွှန်ချက်ရယူပါ',
    away: 'အကွာ',
    noActivitiesFound: 'ဤအမျိုးအစားတွင် လှုပ်ရှားမှုများမတွေ့ပါ',
    viewAllActivities: 'လှုပ်ရှားမှုအားလုံးကြည့်ပါ',
    loadingLocation: 'သင့်တည်နေရာကို ဖွင့်နေသည်...',
    categories: {
      socialGathering: 'လူမှုရေးစုဝေးပွဲ',
      sportsAndFitness: 'အားကစားနှင့်ကျန်းမာရေး',
      culturalEvent: 'ယဉ်ကျေးမှုအစီအစဉ်',
      workshop: 'အလုပ်ရုံ',
      volunteering: 'စေတနာ့ဝန်ထမ်း',
      foodAndDining: 'အစားအသောက်နှင့်စားသောက်ခြင်း',
      outdoorActivity: 'ပြင်ပလှုပ်ရှားမှု',
      artAndCraft: 'အနုပညာနှင့်လက်မှုပညာ'
    }
  }
};

// Mock activities data with multilingual content
const mockActivities: Activity[] = [
  {
    id: 1,
    title: {
      en: 'Community Picnic at East Coast Park',
      zh: '东海岸公园社区野餐',
      ms: 'Berkelah Komuniti di Taman Pantai Timur',
      ta: 'கிழக்கு கடற்கரை பூங்காவில் சமூக சுற்றுலா',
      bn: 'ইস্ট কোস্ট পার্কে সম্প্রদায় পিকনিক',
      hi: 'ईस्ट कोस्ट पार्क में सामुदायिक पिकनिक',
      th: 'ปิกนิกชุมชนที่อีสต์โคสต์พาร์ค',
      vi: 'Dã ngoại Cộng đồng tại Công viên Bờ Đông',
      id: 'Piknik Komunitas di Taman Pantai Timur',
      tl: 'Piknik ng Komunidad sa East Coast Park',
      my: 'အရှေ့ကမ်းခြေပန်းခြံတွင် အသိုင်းအဝိုင်းပျော်ပွဲ'
    },
    description: {
      en: 'Join us for a relaxing afternoon with games, food, and great company. Perfect for families and individuals looking to make new friends.',
      zh: '加入我们，享受轻松的下午时光，包括游戏、美食和愉快的陪伴。非常适合想结交新朋友的家庭和个人。',
      ms: 'Sertai kami untuk petang yang santai dengan permainan, makanan, dan syarikat yang hebat. Sesuai untuk keluarga dan individu yang ingin membuat kawan baru.',
      ta: 'விளையாட்டுகள், உணவு மற்றும் சிறந்த நட்பினருடன் ஓய்வான மதியத்திற்கு எங்களுடன் சேரவும். புதிய நண்பர்களை உருவாக்க விரும்பும் குடும்பங்கள் மற்றும் தனிநபர்களுக்கு ஏற்றது।',
      bn: 'গেম, খাবার এবং দুর্দান্ত সঙ্গের সাথে একটি আরামদায়ক বিকেলের জন্য আমাদের সাথে যোগ দিন। নতুন বন্ধু তৈরি করতে চাওয়া পরিবার এবং ব্যক্তিদের জন্য উপযুক্ত।',
      hi: 'खेल, भोजन और बेहतरीन साथ के साथ एक आरामदायक दोपहर के लिए हमसे जुड़ें। नए दोस्त बनाने के इच्छुक परिवारों और व्यक्तियों के लिए एकदम सही।',
      th: 'มาร่วมกับเราสำหรับบ่ายที่ผ่อนคลายพร้อมเกม อาหาร และเพื่อนที่ดี เหมาะสำหรับครอบครัวและบุคคลที่ต้องการหาเพื่อนใหม่',
      vi: 'Tham gia với chúng tôi cho một buổi chiều thư giãn với trò chơi, đồ ăn và bạn bè tuyệt vời. Hoàn hảo cho các gia đình và cá nhân muốn kết bạn mới.',
      id: 'Bergabunglah dengan kami untuk sore yang santai dengan permainan, makanan, dan teman yang hebat. Sempurna untuk keluarga dan individu yang ingin berteman baru.',
      tl: 'Sumali sa amin para sa isang nakakarelaks na hapon na may mga laro, pagkain, at mahusay na kasama. Perpekto para sa mga pamilya at indibidwal na gustong gumawa ng mga bagong kaibigan.',
      my: 'ဂိမ်းများ၊ အစားအသောက်များနှင့် ကောင်းမွန်သော အဖော်များဖြင့် အပန်းဖြေသော နေ့လည်ခင်းအတွက် ကျွန်ုပ်တို့နှင့် ပူးပေါင်းပါ။ မိတ်ဆွေအသစ်များ ဖန်တီးလိုသော မိသားစုများနှင့် တစ်ဦးချင်းများအတွက် အကောင်းဆုံးဖြစ်သည်။'
    },
    category: {
      en: 'Social Gathering',
      zh: '社交聚会',
      ms: 'Perhimpunan Sosial',
      ta: 'சமூக கூட்டம்',
      bn: 'সামাজিক সমাবেশ',
      hi: 'सामाजिक सभा',
      th: 'การชุมนุมทางสังคม',
      vi: 'Tụ họp Xã hội',
      id: 'Pertemuan Sosial',
      tl: 'Pagtitipon sa Lipunan',
      my: 'လူမှုရေးစုဝေးပွဲ'
    },
    date: '2024-12-20',
    time: '2:00 PM - 6:00 PM',
    location: 'East Coast Park',
    coordinates: [1.3008, 103.9124],
    attendees: 45,
    organizer: 'Singapore Social Club',
    tags: {
      en: ['Outdoor', 'Family-Friendly', 'Free'],
      zh: ['户外', '适合家庭', '免费'],
      ms: ['Luar', 'Mesra Keluarga', 'Percuma'],
      ta: ['வெளிப்புறம்', 'குடும்ப நட்பு', 'இலவசம்'],
      bn: ['বহিরঙ্গন', 'পরিবার-বান্ধব', 'বিনামূল্যে'],
      hi: ['बाहरी', 'परिवार के अनुकूल', 'मुफ़्त'],
      th: ['กลางแจ้ง', 'เหมาะสำหรับครอบครัว', 'ฟรี'],
      vi: ['Ngoài trời', 'Thân thiện với gia đình', 'Miễn phí'],
      id: ['Luar Ruangan', 'Ramah Keluarga', 'Gratis'],
      tl: ['Labas', 'Pampamilya', 'Libre'],
      my: ['ပြင်ပ', 'မိသားစုအတွက်', 'အခမဲ့']
    },
    distance: '2.3 km'
  },
  {
    id: 2,
    title: {
      en: 'Badminton Meetup at Toa Payoh Sports Hall',
      zh: '大巴窑体育馆羽毛球聚会',
      ms: 'Pertemuan Badminton di Dewan Sukan Toa Payoh',
      ta: 'டோவா பயோ விளையாட்டு மண்டபத்தில் பேட்மிண்டன் சந்திப்பு',
      bn: 'টোয়া পায়োহ স্পোর্টস হলে ব্যাডমিন্টন মিটআপ',
      hi: 'टोआ पायोह स्पोर्ट्स हॉल में बैडमिंटन मीटअप',
      th: 'พบปะเล่นแบดมินตันที่ห้องกีฬาโตอาปาโยห์',
      vi: 'Gặp gỡ Cầu lông tại Hội trường Thể thao Toa Payoh',
      id: 'Pertemuan Bulu Tangkis di Aula Olahraga Toa Payoh',
      tl: 'Badminton Meetup sa Toa Payoh Sports Hall',
      my: 'တိုအာပေါ့အားကစားခန်းမတွင် ဘက်မင်တန်တွေ့ဆုံပွဲ'
    },
    description: {
      en: 'Weekly badminton sessions for all skill levels. Bring your racket and join us for some friendly competition and exercise.',
      zh: '适合所有技能水平的每周羽毛球活动。带上你的球拍，加入我们进行友好的比赛和锻炼。',
      ms: 'Sesi badminton mingguan untuk semua tahap kemahiran. Bawa raket anda dan sertai kami untuk pertandingan mesra dan senaman.',
      ta: 'அனைத்து திறன் நிலைகளுக்கும் வாராந்திர பேட்மிண்டன் அமர்வுகள். உங்கள் ராக்கெட்டை எடுத்துக்கொண்டு நட்பு போட்டி மற்றும் உடற்பயிற்சிக்காக எங்களுடன் சேரவும்।',
      bn: 'সব দক্ষতা স্তরের জন্য সাপ্তাহিক ব্যাডমিন্টন সেশন। আপনার র‍্যাকেট নিয়ে আসুন এবং কিছু বন্ধুত্বপূর্ণ প্রতিযোগিতা এবং ব্যায়ামের জন্য আমাদের সাথে যোগ দিন।',
      hi: 'सभी कौशल स्तरों के लिए साप्ताहिक बैडमिंटन सत्र। अपना रैकेट लाएं और कुछ मैत्रीपूर्ण प्रतिस्पर्धा और व्यायाम के लिए हमसे जुड़ें।',
      th: 'เซสชันแบดมินตันรายสัปดาห์สำหรับทุกระดับทักษะ นำไม้แบดของคุณมาและมาร่วมกับเราสำหรับการแข่งขันที่เป็นมิตรและการออกกำลังกาย',
      vi: 'Các buổi cầu lông hàng tuần cho mọi trình độ. Mang vợt của bạn và tham gia với chúng tôi để thi đấu thân thiện và tập thể dục.',
      id: 'Sesi bulu tangkis mingguan untuk semua tingkat keterampilan. Bawa raket Anda dan bergabunglah dengan kami untuk kompetisi ramah dan olahraga.',
      tl: 'Lingguhang badminton sessions para sa lahat ng antas ng kasanayan. Dalhin ang iyong racket at sumali sa amin para sa ilang friendly competition at ehersisyo.',
      my: 'ကျွမ်းကျင်မှုအဆင့်အားလုံးအတွက် အပတ်စဉ်ဘက်မင်တန်အစီအစဉ်များ။ သင့်ရက်ကက်ကို ယူဆောင်လာပြီး ဖော်ရွေသော ပြိုင်ပွဲနှင့် လေ့ကျင့်ခန်းအတွက် ကျွန်ုပ်တို့နှင့် ပူးပေါင်းပါ။'
    },
    category: {
      en: 'Sports & Fitness',
      zh: '体育健身',
      ms: 'Sukan & Kecergasan',
      ta: 'விளையாட்டு & உடற்பயிற்சி',
      bn: 'ক্রীড়া ও ফিটনেস',
      hi: 'खेल और फिटनेस',
      th: 'กีฬาและฟิตเนส',
      vi: 'Thể thao & Thể dục',
      id: 'Olahraga & Kebugaran',
      tl: 'Palakasan at Fitness',
      my: 'အားကစားနှင့်ကျန်းမာရေး'
    },
    date: '2024-12-18',
    time: '7:00 PM - 9:00 PM',
    location: 'Toa Payoh Sports Hall',
    coordinates: [1.3343, 103.8480],
    attendees: 20,
    organizer: 'Active SG',
    tags: {
      en: ['Sports', 'Weekly', 'Indoor'],
      zh: ['体育', '每周', '室内'],
      ms: ['Sukan', 'Mingguan', 'Dalam'],
      ta: ['விளையாட்டு', 'வாராந்திரம்', 'உள்ளரங்கம்'],
      bn: ['ক্রীড়া', 'সাপ্তাহিক', 'অভ্যন্তরীণ'],
      hi: ['खेल', 'साप्ताहिक', 'इनडोर'],
      th: ['กีฬา', 'รายสัปดาห์', 'ในร่ม'],
      vi: ['Thể thao', 'Hàng tuần', 'Trong nhà'],
      id: ['Olahraga', 'Mingguan', 'Dalam Ruangan'],
      tl: ['Palakasan', 'Lingguhan', 'Loob'],
      my: ['အားကစား', 'အပတ်စဉ်', 'အတွင်း']
    },
    distance: '3.7 km'
  },
  {
    id: 3,
    title: {
      en: 'Cooking Workshop: Traditional Asian Cuisine',
      zh: '烹饪工作坊：传统亚洲美食',
      ms: 'Bengkel Memasak: Masakan Asia Tradisional',
      ta: 'சமையல் பட்டறை: பாரம்பரிய ஆசிய உணவு',
      bn: 'রান্নার কর্মশালা: ঐতিহ্যবাহী এশিয়ান খাবার',
      hi: 'खाना पकाने की कार्यशाला: पारंपरिक एशियाई व्यंजन',
      th: 'เวิร์คช็อปการทำอาหาร: อาหารเอเชียแบบดั้งเดิม',
      vi: 'Hội thảo Nấu ăn: Ẩm thực Châu Á Truyền thống',
      id: 'Lokakarya Memasak: Masakan Asia Tradisional',
      tl: 'Workshop sa Pagluluto: Tradisyonal na Lutuing Asyano',
      my: 'ချက်ပြုတ်ရေးအလုပ်ရုံ: ရိုးရာအာရှအစားအစာ'
    },
    description: {
      en: 'Learn to cook authentic Asian dishes from experienced chefs. All ingredients provided. Perfect for food enthusiasts!',
      zh: '向经验丰富的厨师学习烹饪正宗的亚洲菜肴。提供所有食材。非常适合美食爱好者！',
      ms: 'Belajar memasak hidangan Asia tulen daripada chef berpengalaman. Semua bahan disediakan. Sesuai untuk peminat makanan!',
      ta: 'அனுபவமிக்க சமையல்காரர்களிடமிருந்து உண்மையான ஆசிய உணவுகளை சமைக்க கற்றுக்கொள்ளுங்கள். அனைத்து பொருட்களும் வழங்கப்படும். உணவு ஆர்வலர்களுக்கு ஏற்றது!',
      bn: 'অভিজ্ঞ শেফদের কাছ থেকে খাঁটি এশিয়ান খাবার রান্না করতে শিখুন। সমস্ত উপাদান সরবরাহ করা হয়। খাদ্য উৎসাহীদের জন্য উপযুক্ত!',
      hi: 'अनुभवी शेफ से प्रामाणिक एशियाई व्यंजन बनाना सीखें। सभी सामग्री प्रदान की गई। खाद्य उत्साही लोगों के लिए एकदम सही!',
      th: 'เรียนรู้การทำอาหารเอเชียแท้จากเชฟที่มีประสบการณ์ มีส่วนผสมทั้งหมด เหมาะสำหรับผู้ที่ชื่นชอบอาหาร!',
      vi: 'Học nấu các món ăn Châu Á chính gốc từ các đầu bếp có kinh nghiệm. Tất cả nguyên liệu được cung cấp. Hoàn hảo cho những người đam mê ẩm thực!',
      id: 'Belajar memasak hidangan Asia asli dari koki berpengalaman. Semua bahan disediakan. Sempurna untuk penggemar makanan!',
      tl: 'Matuto magluto ng tunay na mga pagkaing Asyano mula sa mga bihasang chef. Lahat ng sangkap ay ibinigay. Perpekto para sa mga mahilig sa pagkain!',
      my: 'အတွေ့အကြုံရှိ စားဖိုမှူးများထံမှ စစ်မှန်သော အာရှအစားအစာများ ချက်ပြုတ်ရန် လေ့လာပါ။ ပါဝင်ပစ္စည်းအားလုံး ပံ့ပိုးပေးထားသည်။ အစားအသောက်ကြိုက်သူများအတွက် အကောင်းဆုံး!'
    },
    category: {
      en: 'Workshop',
      zh: '工作坊',
      ms: 'Bengkel',
      ta: 'பட்டறை',
      bn: 'কর্মশালা',
      hi: 'कार्यशाला',
      th: 'เวิร์คช็อป',
      vi: 'Hội thảo',
      id: 'Lokakarya',
      tl: 'Workshop',
      my: 'အလုပ်ရုံ'
    },
    date: '2024-12-22',
    time: '10:00 AM - 1:00 PM',
    location: 'Community Centre Kitchen',
    coordinates: [1.3521, 103.8198],
    attendees: 15,
    organizer: 'Culinary Arts Society',
    tags: {
      en: ['Food', 'Learning', 'Hands-on'],
      zh: ['美食', '学习', '实践'],
      ms: ['Makanan', 'Pembelajaran', 'Praktikal'],
      ta: ['உணவு', 'கற்றல்', 'நடைமுறை'],
      bn: ['খাবার', 'শেখা', 'হাতে-কলমে'],
      hi: ['भोजन', 'सीखना', 'व्यावहारिक'],
      th: ['อาหาร', 'การเรียนรู้', 'ลงมือทำ'],
      vi: ['Ẩm thực', 'Học tập', 'Thực hành'],
      id: ['Makanan', 'Belajar', 'Praktik'],
      tl: ['Pagkain', 'Pag-aaral', 'Praktikal'],
      my: ['အစားအသောက်', 'သင်ယူခြင်း', 'လက်တွေ့']
    },
    distance: '1.5 km'
  },
  {
    id: 4,
    title: {
      en: 'Beach Cleanup & BBQ at Sentosa',
      zh: '圣淘沙海滩清洁和烧烤',
      ms: 'Pembersihan Pantai & BBQ di Sentosa',
      ta: 'சென்டோசாவில் கடற்கரை சுத்தம் & BBQ',
      bn: 'সেন্টোসায় সৈকত পরিষ্কার ও BBQ',
      hi: 'सेंटोसा में बीच क्लीनअप और BBQ',
      th: 'ทำความสะอาดชายหาดและบาร์บีคิวที่เซนโตซา',
      vi: 'Dọn dẹp Bãi biển & BBQ tại Sentosa',
      id: 'Pembersihan Pantai & BBQ di Sentosa',
      tl: 'Paglilinis ng Beach at BBQ sa Sentosa',
      my: 'ဆန်တိုဆာတွင် ကမ်းခြေသန့်ရှင်းရေးနှင့် BBQ'
    },
    description: {
      en: 'Make a difference while having fun! Join our beach cleanup followed by a community BBQ. All cleaning supplies provided.',
      zh: '在享受乐趣的同时做出改变！加入我们的海滩清洁活动，随后是社区烧烤。提供所有清洁用品。',
      ms: 'Buat perbezaan sambil berseronok! Sertai pembersihan pantai kami diikuti dengan BBQ komuniti. Semua bekalan pembersihan disediakan.',
      ta: 'வேடிக்கையாக இருக்கும்போது மாற்றத்தை ஏற்படுத்துங்கள்! எங்கள் கடற்கரை சுத்தம் மற்றும் சமூக BBQ இல் சேரவும். அனைத்து சுத்தம் செய்யும் பொருட்களும் வழங்கப்படும்.',
      bn: 'মজা করার সময় পার্থক্য তৈরি করুন! আমাদের সৈকত পরিষ্কার এবং সম্প্রদায় BBQ তে যোগ দিন। সমস্ত পরিষ্কারের সরবরাহ সরবরাহ করা হয়।',
      hi: 'मज़े करते हुए फर्क करें! हमारे बीच क्लीनअप में शामिल हों जिसके बाद सामुदायिक BBQ होगा। सभी सफाई आपूर्ति प्रदान की गई।',
      th: 'สร้างความแตกต่างในขณะที่สนุก! เข้าร่วมการทำความสะอาดชายหาดของเราตามด้วยบาร์บีคิวชุมชน อุปกรณ์ทำความสะอาดทั้งหมดจัดให้',
      vi: 'Tạo sự khác biệt trong khi vui chơi! Tham gia dọn dẹp bãi biển của chúng tôi sau đó là BBQ cộng đồng. Tất cả vật dụng làm sạch được cung cấp.',
      id: 'Buat perbedaan sambil bersenang-senang! Bergabunglah dengan pembersihan pantai kami diikuti dengan BBQ komunitas. Semua perlengkapan pembersihan disediakan.',
      tl: 'Gumawa ng pagkakaiba habang nagsasaya! Sumali sa aming paglilinis ng beach na sinusundan ng community BBQ. Lahat ng kagamitan sa paglilinis ay ibinigay.',
      my: 'ပျော်ရွှင်နေစဉ် ခြားနားချက်ဖန်တီးပါ! ကျွန်ုပ်တို့၏ ကမ်းခြေသန့်ရှင်းရေးနှင့် အသိုင်းအဝိုင်း BBQ တွင် ပူးပေါင်းပါ။ သန့်ရှင်းရေးပစ္စည်းအားလုံး ပံ့ပိုးပေးထားသည်။'
    },
    category: {
      en: 'Volunteering',
      zh: '志愿服务',
      ms: 'Sukarelawan',
      ta: 'தன்னார்வம்',
      bn: 'স্বেচ্ছাসেবা',
      hi: 'स्वयंसेवा',
      th: 'อาสาสมัคร',
      vi: 'Tình nguyện',
      id: 'Kesukarelaan',
      tl: 'Boluntaryo',
      my: 'စေတနာ့ဝန်ထမ်း'
    },
    date: '2024-12-21',
    time: '9:00 AM - 2:00 PM',
    location: 'Sentosa Beach',
    coordinates: [1.2494, 103.8303],
    attendees: 35,
    organizer: 'Green Singapore Initiative',
    tags: {
      en: ['Environment', 'Community', 'Food'],
      zh: ['环境', '社区', '美食'],
      ms: ['Alam Sekitar', 'Komuniti', 'Makanan'],
      ta: ['சுற்றுச்சூழல்', 'சமூகம்', 'உணவு'],
      bn: ['পরিবেশ', 'সম্প্রদায়', 'খাবার'],
      hi: ['पर्यावरण', 'समुदाय', 'भोजन'],
      th: ['สิ่งแวดล้อม', 'ชุมชน', 'อาหาร'],
      vi: ['Môi trường', 'Cộng đồng', 'Ẩm thực'],
      id: ['Lingkungan', 'Komunitas', 'Makanan'],
      tl: ['Kapaligiran', 'Komunidad', 'Pagkain'],
      my: ['ပတ်ဝန်းကျင်', 'အသိုင်းအဝိုင်း', 'အစားအသောက်']
    },
    distance: '5.8 km'
  },
  {
    id: 5,
    title: {
      en: 'Photography Walk: Chinatown Heritage',
      zh: '摄影漫步：牛车水遗产',
      ms: 'Jalan Fotografi: Warisan Chinatown',
      ta: 'புகைப்பட நடை: சைனாடவுன் பாரம்பரியம்',
      bn: 'ফটোগ্রাফি ওয়াক: চায়নাটাউন ঐতিহ্য',
      hi: 'फोटोग्राफी वॉक: चाइनाटाउन विरासत',
      th: 'เดินถ่ายภาพ: มรดกไชน่าทาวน์',
      vi: 'Đi bộ Chụp ảnh: Di sản Khu Phố Tàu',
      id: 'Jalan Fotografi: Warisan Chinatown',
      tl: 'Photography Walk: Pamana ng Chinatown',
      my: 'ဓာတ်ပုံရိုက်ခြင်းလမ်းလျှောက်ခြင်း: တရုတ်မြို့အမွေအနှစ်'
    },
    description: {
      en: 'Explore and capture the beauty of Chinatown with fellow photography enthusiasts. Suitable for all camera types and skill levels.',
      zh: '与摄影爱好者一起探索和捕捉牛车水的美丽。适合所有相机类型和技能水平。',
      ms: 'Terokai dan tangkap keindahan Chinatown dengan peminat fotografi lain. Sesuai untuk semua jenis kamera dan tahap kemahiran.',
      ta: 'புகைப்பட ஆர்வலர்களுடன் சைனாடவுனின் அழகை ஆராய்ந்து படம்பிடியுங்கள். அனைத்து கேமரா வகைகள் மற்றும் திறன் நிலைகளுக்கும் ஏற்றது।',
      bn: 'সহকর্মী ফটোগ্রাফি উৎসাহীদের সাথে চায়নাটাউনের সৌন্দর্য অন্বেষণ এবং ক্যাপচার করুন। সমস্ত ক্যামেরা প্রকার এবং দক্ষতা স্তরের জন্য উপযুক্ত।',
      hi: 'साथी फोटोग्राफी उत्साही लोगों के साथ चाइनाटाउन की सुंदरता का अन्वेषण और कैप्चर करें। सभी कैमरा प्रकार और कौशल स्तरों के लिए उपयुक्त।',
      th: 'สำรวจและจับภาพความงามของไชน่าทาวน์กับเพื่อนผู้ชื่นชอบการถ่ายภาพ เหมาะสำหรับกล้องทุกประเภทและทุกระดับทักษะ',
      vi: 'Khám phá và chụp lại vẻ đẹp của Khu Phố Tàu với những người đam mê nhiếp ảnh. Phù hợp với mọi loại máy ảnh và trình độ.',
      id: 'Jelajahi dan tangkap keindahan Chinatown dengan sesama penggemar fotografi. Cocok untuk semua jenis kamera dan tingkat keterampilan.',
      tl: 'Tuklasin at kunan ang kagandahan ng Chinatown kasama ang mga kapwa mahilig sa photography. Angkop para sa lahat ng uri ng camera at antas ng kasanayan.',
      my: 'ဓာတ်ပုံရိုက်ခြင်းကြိုက်သူများနှင့်အတူ တရုတ်မြို့၏ အလှတရားကို စူးစမ်းပြီး ဖမ်းယူပါ။ ကင်မရာအမျိုးအစားအားလုံးနှင့် ကျွမ်းကျင်မှုအဆင့်များအတွက် သင့်လျော်သည်။'
    },
    category: {
      en: 'Art & Craft',
      zh: '艺术手工',
      ms: 'Seni & Kraf',
      ta: 'கலை & கைவினை',
      bn: 'শিল্প ও কারুশিল্প',
      hi: 'कला और शिल्प',
      th: 'ศิลปะและงานฝีมือ',
      vi: 'Nghệ thuật & Thủ công',
      id: 'Seni & Kerajinan',
      tl: 'Sining at Crafts',
      my: 'အနုပညာနှင့်လက်မှုပညာ'
    },
    date: '2024-12-19',
    time: '4:00 PM - 7:00 PM',
    location: 'Chinatown',
    coordinates: [1.2838, 103.8443],
    attendees: 25,
    organizer: 'Singapore Photography Club',
    tags: {
      en: ['Photography', 'Culture', 'Walking'],
      zh: ['摄影', '文化', '步行'],
      ms: ['Fotografi', 'Budaya', 'Berjalan'],
      ta: ['புகைப்படம்', 'கலாச்சாரம்', 'நடைபயணம்'],
      bn: ['ফটোগ্রাফি', 'সংস্কৃতি', 'হাঁটা'],
      hi: ['फोटोग्राफी', 'संस्कृति', 'चलना'],
      th: ['การถ่ายภาพ', 'วัฒนธรรม', 'เดิน'],
      vi: ['Nhiếp ảnh', 'Văn hóa', 'Đi bộ'],
      id: ['Fotografi', 'Budaya', 'Berjalan'],
      tl: ['Photography', 'Kultura', 'Paglalakad'],
      my: ['ဓာတ်ပုံ', 'ယဉ်ကျေးမှု', 'လမ်းလျှောက်ခြင်း']
    },
    distance: '4.2 km'
  }
];

// Component to handle map centering
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  
  return null;
}

export function ActivitiesNearYouPage({ currentLang }: ActivitiesNearYouPageProps) {
  const t = nativeTranslations[currentLang] || nativeTranslations.en;
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<[number, number]>([1.3521, 103.8198]); // Default: Singapore
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'distance' | 'date' | 'attendees'>('distance');

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const categories = [
    'All',
    t.categories.socialGathering,
    t.categories.sportsAndFitness,
    t.categories.culturalEvent,
    t.categories.workshop,
    t.categories.volunteering,
    t.categories.foodAndDining,
    t.categories.outdoorActivity,
    t.categories.artAndCraft
  ];

  const filteredActivities = selectedCategory === 'All' || selectedCategory === t.categoryAll
    ? mockActivities
    : mockActivities.filter(activity => activity.category[currentLang] === selectedCategory);

  // Sort activities
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return b.attendees - a.attendees;
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'default', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleJoinActivity = (activityId: number) => {
    navigate(`/group-chat/${activityId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/activities/social')}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              {t.backButton}
            </button>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center flex-1">
              {t.pageTitle}
            </h1>
            
            <div className="w-24"></div>
          </div>
          <p className="text-center text-slate-600 mt-2">{t.pageDescription}</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="h-[400px] relative">
            <MapContainer
              center={userLocation}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              className="rounded-3xl"
            >
              <MapController center={userLocation} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* User Location Marker */}
              <Marker position={userLocation}>
                <Popup>
                  <div className="text-center font-semibold">
                    <MapPin className="w-4 h-4 inline text-purple-600 mb-1" />
                    <p>{t.myLocation}</p>
                  </div>
                </Popup>
              </Marker>

              {/* Activity Markers */}
              {sortedActivities.map((activity) => (
                <Marker key={activity.id} position={activity.coordinates}>
                  <Popup>
                    <div className="min-w-[200px]">
                      <h3 className="font-bold text-slate-900 mb-1">{activity.title[currentLang]}</h3>
                      <p className="text-xs text-slate-600 mb-2">{activity.category[currentLang]}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-700 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(activity.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-700 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-700">
                        <Navigation className="w-3 h-3" />
                        <span>{activity.distance} {t.away}</span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                {t.filterByCategory}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                {t.sortBy}
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSortBy('distance')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    sortBy === 'distance'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.sortByDistance}
                </button>
                <button
                  onClick={() => setSortBy('date')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    sortBy === 'date'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.sortByDate}
                </button>
                <button
                  onClick={() => setSortBy('attendees')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    sortBy === 'attendees'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.sortByAttendees}
                </button>
              </div>
            </div>
          </div>

          {/* Activity Count */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span className="font-semibold">{sortedActivities.length}</span> {t.activitiesNearby}
            </p>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedActivities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                      {activity.title[currentLang]}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-bold">
                      {activity.category[currentLang]}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {activity.description[currentLang]}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Calendar className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="font-medium">{formatDate(activity.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{activity.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{activity.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Navigation className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="font-semibold text-purple-600">{activity.distance} {t.away}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Users className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>{activity.attendees} {t.expectedAttendees}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {activity.tags[currentLang].map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Organizer */}
                <div className="pt-4 border-t border-slate-200 mb-4">
                  <p className="text-xs text-slate-500">
                    {t.organizedBy} <span className="font-semibold text-slate-700">{activity.organizer}</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleJoinActivity(activity.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-sm"
                  >
                    <span>{t.joinActivity}</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-200 text-sm">
                    <Navigation className="w-4 h-4" />
                    <span>{t.getDirections}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Activities Message */}
        {sortedActivities.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-600">{t.noActivitiesFound}</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {t.viewAllActivities}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
