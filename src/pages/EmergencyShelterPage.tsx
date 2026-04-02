import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Clock, Navigation, AlertCircle, Loader2, Shield, Home, ExternalLink, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LanguageCode } from '../translations';

interface EmergencyShelterPageProps {
  currentLang: LanguageCode;
}

interface Shelter {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  distance?: number;
  lat: number;
  lng: number;
  capacity: string;
  services: string[];
  languages: string[];
}

interface EmergencyShelterTranslations {
  backButton: string;
  title: string;
  subtitle: string;
  description: string;
  findingLocation: string;
  locationError: string;
  enableLocation: string;
  noShelters: string;
  distance: string;
  phone: string;
  hours: string;
  capacity: string;
  services: string;
  languages: string;
  getDirections: string;
  callNow: string;
  emergency: string;
  emergencyText: string;
  filters: {
    all: string;
    english: string;
    bengali: string;
    tamil: string;
    chinese: string;
    malay: string;
    hindi: string;
    myanmar: string;
    indonesian: string;
    filipino: string;
  };
}

const emergencyShelterTranslations: Record<LanguageCode, EmergencyShelterTranslations> = {
  en: {
    backButton: 'Back to Home',
    title: 'Emergency Shelter',
    subtitle: 'Find Immediate Housing Assistance',
    description: 'Locate emergency shelters near you with real-time availability',
    findingLocation: 'Finding your location...',
    locationError: 'Unable to access your location. Please enable location services.',
    enableLocation: 'Enable Location',
    noShelters: 'No shelters found for this language. Try selecting "All Languages".',
    distance: 'km away',
    phone: 'Phone',
    hours: 'Hours',
    capacity: 'Capacity',
    services: 'Services',
    languages: 'Languages Spoken',
    getDirections: 'Get Directions',
    callNow: 'Call Now',
    emergency: 'Emergency',
    emergencyText: 'If you are in immediate danger, call emergency services: 999',
    filters: {
      all: 'All Languages',
      english: 'English',
      bengali: 'Bengali',
      tamil: 'Tamil',
      chinese: 'Chinese',
      malay: 'Malay',
      hindi: 'Hindi',
      myanmar: 'Myanmar',
      indonesian: 'Indonesian',
      filipino: 'Filipino'
    }
  },
  zh: {
    backButton: '返回',
    title: '紧急庇护所',
    subtitle: '寻找即时住房援助',
    description: '查找您附近的紧急庇护所及实时可用性',
    findingLocation: '正在查找您的位置...',
    locationError: '无法访问您的位置。请启用位置服务。',
    enableLocation: '启用位置',
    noShelters: '未找到此语言的庇护所。尝试选择"所有语言"。',
    distance: '公里外',
    phone: '电话',
    hours: '营业时间',
    capacity: '容量',
    services: '服务',
    languages: '使用语言',
    getDirections: '获取路线',
    callNow: '立即致电',
    emergency: '紧急情况',
    emergencyText: '如果您处于紧急危险中，请拨打紧急服务电话：999',
    filters: {
      all: '所有语言',
      english: '英语',
      bengali: '孟加拉语',
      tamil: '泰米尔语',
      chinese: '中文',
      malay: '马来语',
      hindi: '印地语',
      myanmar: '缅甸语',
      indonesian: '印尼语',
      filipino: '菲律宾语'
    }
  },
  ms: {
    backButton: 'Kembali',
    title: 'Tempat Perlindungan Kecemasan',
    subtitle: 'Cari Bantuan Perumahan Segera',
    description: 'Cari tempat perlindungan kecemasan berhampiran anda dengan ketersediaan masa nyata',
    findingLocation: 'Mencari lokasi anda...',
    locationError: 'Tidak dapat mengakses lokasi anda. Sila aktifkan perkhidmatan lokasi.',
    enableLocation: 'Aktifkan Lokasi',
    noShelters: 'Tiada tempat perlindungan ditemui untuk bahasa ini. Cuba pilih "Semua Bahasa".',
    distance: 'km jauhnya',
    phone: 'Telefon',
    hours: 'Waktu',
    capacity: 'Kapasiti',
    services: 'Perkhidmatan',
    languages: 'Bahasa yang Dituturkan',
    getDirections: 'Dapatkan Arah',
    callNow: 'Hubungi Sekarang',
    emergency: 'Kecemasan',
    emergencyText: 'Jika anda dalam bahaya segera, hubungi perkhidmatan kecemasan: 999',
    filters: {
      all: 'Semua Bahasa',
      english: 'Bahasa Inggeris',
      bengali: 'Bengali',
      tamil: 'Tamil',
      chinese: 'Cina',
      malay: 'Melayu',
      hindi: 'Hindi',
      myanmar: 'Myanmar',
      indonesian: 'Indonesia',
      filipino: 'Filipina'
    }
  },
  ta: {
    backButton: 'பின்செல்',
    title: 'அவசர தங்குமிடம்',
    subtitle: 'உடனடி வீட்டு உதவியைக் கண்டறியவும்',
    description: 'உங்களுக்கு அருகில் உள்ள அவசர தங்குமிடங்களை நேரடி கிடைக்கும் தன்மையுடன் கண்டறியவும்',
    findingLocation: 'உங்கள் இடத்தைக் கண்டறிகிறது...',
    locationError: 'உங்கள் இடத்தை அணுக முடியவில்லை. இட சேவைகளை இயக்கவும்.',
    enableLocation: 'இடத்தை இயக்கு',
    noShelters: 'இந்த மொழிக்கான தங்குமிடங்கள் எதுவும் கிடைக்கவில்லை. "அனைத்து மொழிகள்" தேர்ந்தெடுக்க முயற்சிக்கவும்.',
    distance: 'கி.மீ தொலைவில்',
    phone: 'தொலைபேசி',
    hours: 'நேரங்கள்',
    capacity: 'திறன்',
    services: 'சேவைகள்',
    languages: 'பேசப்படும் மொழிகள்',
    getDirections: 'வழிகளைப் பெறுங்கள்',
    callNow: 'இப்போது அழைக்கவும்',
    emergency: 'அவசரம்',
    emergencyText: 'நீங்கள் உடனடி ஆபத்தில் இருந்தால், அவசர சேவைகளை அழைக்கவும்: 999',
    filters: {
      all: 'அனைத்து மொழிகள்',
      english: 'ஆங்கிலம்',
      bengali: 'வங்காளம்',
      tamil: 'தமிழ்',
      chinese: 'சீனம்',
      malay: 'மலாய்',
      hindi: 'இந்தி',
      myanmar: 'மியான்மர்',
      indonesian: 'இந்தோனேசிய',
      filipino: 'பிலிப்பைன்ஸ்'
    }
  },
  bn: {
    backButton: 'ফিরে যান',
    title: 'জরুরি আশ্রয়',
    subtitle: 'তাৎক্ষণিক আবাসন সহায়তা খুঁজুন',
    description: 'রিয়েল-টাইম প্রাপ্যতা সহ আপনার কাছাকাছি জরুরি আশ্রয় খুঁজুন',
    findingLocation: 'আপনার অবস্থান খুঁজছি...',
    locationError: 'আপনার অবস্থান অ্যাক্সেস করতে অক্ষম। অনুগ্রহ করে অবস্থান পরিষেবা সক্ষম করুন।',
    enableLocation: 'অবস্থান সক্ষম করুন',
    noShelters: 'এই ভাষার জন্য কোনো আশ্রয় পাওয়া যায়নি। "সব ভাষা" নির্বাচন করার চেষ্টা করুন।',
    distance: 'কিমি দূরে',
    phone: 'ফোন',
    hours: 'সময়',
    capacity: 'ধারণক্ষমতা',
    services: 'সেবা',
    languages: 'কথ্য ভাষা',
    getDirections: 'দিকনির্দেশ পান',
    callNow: 'এখনই কল করুন',
    emergency: 'জরুরি',
    emergencyText: 'আপনি যদি তাৎক্ষণিক বিপদে থাকেন, জরুরি সেবায় কল করুন: 999',
    filters: {
      all: 'সব ভাষা',
      english: 'ইংরেজি',
      bengali: 'বাংলা',
      tamil: 'তামিল',
      chinese: 'চীনা',
      malay: 'মালয়',
      hindi: 'হিন্দি',
      myanmar: 'মায়ানমার',
      indonesian: 'ইন্দোনেশিয়',
      filipino: 'ফিলিপিনো'
    }
  },
  hi: {
    backButton: 'वापस',
    title: 'आपातकालीन आश्रय',
    subtitle: 'तत्काल आवास सहायता खोजें',
    description: 'वास्तविक समय उपलब्धता के साथ अपने पास आपातकालीन आश्रय खोजें',
    findingLocation: 'आपका स्थान खोज रहे हैं...',
    locationError: 'आपके स्थान तक पहुंचने में असमर्थ। कृपया स्थान सेवाएं सक्षम करें।',
    enableLocation: 'स्थान सक्षम करें',
    noShelters: 'इस भाषा के लिए कोई आश्रय नहीं मिला। "सभी भाषाएं" चुनने का प्रयास करें।',
    distance: 'किमी दूर',
    phone: 'फोन',
    hours: 'समय',
    capacity: 'क्षमता',
    services: 'सेवाएं',
    languages: 'बोली जाने वाली भाषाएं',
    getDirections: 'दिशा-निर्देश प्राप्त करें',
    callNow: 'अभी कॉल करें',
    emergency: 'आपातकाल',
    emergencyText: 'यदि आप तत्काल खतरे में हैं, तो आपातकालीन सेवाओं को कॉल करें: 999',
    filters: {
      all: 'सभी भाषाएं',
      english: 'अंग्रेज़ी',
      bengali: 'बंगाली',
      tamil: 'तमिल',
      chinese: 'चीनी',
      malay: 'मलय',
      hindi: 'हिंदी',
      myanmar: 'म्यांमार',
      indonesian: 'इंडोनेशियाई',
      filipino: 'फिलिपिनो'
    }
  },
  th: {
    backButton: 'กลับ',
    title: 'ที่พักฉุกเฉิน',
    subtitle: 'ค้นหาความช่วยเหลือที่อยู่อาศัยทันที',
    description: 'ค้นหาที่พักฉุกเฉินใกล้คุณพร้อมความพร้อมใช้งานแบบเรียลไทม์',
    findingLocation: 'กำลังค้นหาตำแหน่งของคุณ...',
    locationError: 'ไม่สามารถเข้าถึงตำแหน่งของคุณได้ กรุณาเปิดใช้งานบริการตำแหน่ง',
    enableLocation: 'เปิดใช้งานตำแหน่ง',
    noShelters: 'ไม่พบที่พักสำหรับภาษานี้ ลองเลือก "ทุกภาษา"',
    distance: 'กม. ห่าง',
    phone: 'โทรศัพท์',
    hours: 'เวลา',
    capacity: 'ความจุ',
    services: 'บริการ',
    languages: 'ภาษาที่พูด',
    getDirections: 'รับเส้นทาง',
    callNow: 'โทรเลย',
    emergency: 'ฉุกเฉิน',
    emergencyText: 'หากคุณอยู่ในอันตรายทันที โทรหาบริการฉุกเฉิน: 999',
    filters: {
      all: 'ทุกภาษา',
      english: 'อังกฤษ',
      bengali: 'เบงกาลี',
      tamil: 'ทมิฬ',
      chinese: 'จีน',
      malay: 'มลายู',
      hindi: 'ฮินดี',
      myanmar: 'พม่า',
      indonesian: 'อินโดนีเซีย',
      filipino: 'ฟิลิปปินส์'
    }
  },
  vi: {
    backButton: 'Quay lại',
    title: 'Nơi Trú Ẩn Khẩn Cấp',
    subtitle: 'Tìm Hỗ Trợ Nhà Ở Ngay Lập Tức',
    description: 'Tìm nơi trú ẩn khẩn cấp gần bạn với tình trạng sẵn có theo thời gian thực',
    findingLocation: 'Đang tìm vị trí của bạn...',
    locationError: 'Không thể truy cập vị trí của bạn. Vui lòng bật dịch vụ vị trí.',
    enableLocation: 'Bật Vị Trí',
    noShelters: 'Không tìm thấy nơi trú ẩn cho ngôn ngữ này. Thử chọn "Tất cả ngôn ngữ".',
    distance: 'km xa',
    phone: 'Điện thoại',
    hours: 'Giờ',
    capacity: 'Sức chứa',
    services: 'Dịch vụ',
    languages: 'Ngôn ngữ được nói',
    getDirections: 'Lấy Chỉ Đường',
    callNow: 'Gọi Ngay',
    emergency: 'Khẩn cấp',
    emergencyText: 'Nếu bạn đang gặp nguy hiểm ngay lập tức, hãy gọi dịch vụ khẩn cấp: 999',
    filters: {
      all: 'Tất cả ngôn ngữ',
      english: 'Tiếng Anh',
      bengali: 'Tiếng Bengal',
      tamil: 'Tiếng Tamil',
      chinese: 'Tiếng Trung',
      malay: 'Tiếng Mã Lai',
      hindi: 'Tiếng Hindi',
      myanmar: 'Tiếng Myanmar',
      indonesian: 'Tiếng Indonesia',
      filipino: 'Tiếng Philippines'
    }
  },
  id: {
    backButton: 'Kembali',
    title: 'Tempat Perlindungan Darurat',
    subtitle: 'Temukan Bantuan Perumahan Segera',
    description: 'Temukan tempat perlindungan darurat di dekat Anda dengan ketersediaan real-time',
    findingLocation: 'Mencari lokasi Anda...',
    locationError: 'Tidak dapat mengakses lokasi Anda. Harap aktifkan layanan lokasi.',
    enableLocation: 'Aktifkan Lokasi',
    noShelters: 'Tidak ada tempat perlindungan ditemukan untuk bahasa ini. Coba pilih "Semua Bahasa".',
    distance: 'km jauhnya',
    phone: 'Telepon',
    hours: 'Jam',
    capacity: 'Kapasitas',
    services: 'Layanan',
    languages: 'Bahasa yang Digunakan',
    getDirections: 'Dapatkan Petunjuk Arah',
    callNow: 'Hubungi Sekarang',
    emergency: 'Darurat',
    emergencyText: 'Jika Anda dalam bahaya segera, hubungi layanan darurat: 999',
    filters: {
      all: 'Semua Bahasa',
      english: 'Bahasa Inggris',
      bengali: 'Bengali',
      tamil: 'Tamil',
      chinese: 'Cina',
      malay: 'Melayu',
      hindi: 'Hindi',
      myanmar: 'Myanmar',
      indonesian: 'Indonesia',
      filipino: 'Filipina'
    }
  },
  tl: {
    backButton: 'Bumalik',
    title: 'Emergency Shelter',
    subtitle: 'Maghanap ng Agarang Tulong sa Tirahan',
    description: 'Maghanap ng emergency shelter malapit sa iyo na may real-time availability',
    findingLocation: 'Hinahanap ang iyong lokasyon...',
    locationError: 'Hindi ma-access ang iyong lokasyon. Mangyaring i-enable ang location services.',
    enableLocation: 'I-enable ang Lokasyon',
    noShelters: 'Walang nahanap na shelter para sa wikang ito. Subukan ang "Lahat ng Wika".',
    distance: 'km ang layo',
    phone: 'Telepono',
    hours: 'Oras',
    capacity: 'Kapasidad',
    services: 'Mga Serbisyo',
    languages: 'Mga Wikang Sinasalita',
    getDirections: 'Kumuha ng Direksyon',
    callNow: 'Tumawag Ngayon',
    emergency: 'Emergency',
    emergencyText: 'Kung ikaw ay nasa agarang panganib, tumawag sa emergency services: 999',
    filters: {
      all: 'Lahat ng Wika',
      english: 'Ingles',
      bengali: 'Bengali',
      tamil: 'Tamil',
      chinese: 'Intsik',
      malay: 'Malay',
      hindi: 'Hindi',
      myanmar: 'Myanmar',
      indonesian: 'Indonesian',
      filipino: 'Filipino'
    }
  },
  my: {
    backButton: 'နောက်သို့',
    title: 'အရေးပေါ်အမိုးအကာ',
    subtitle: 'ချက်ချင်းအိမ်ရာအကူအညီရှာဖွေပါ',
    description: 'သင့်အနီးရှိ အရေးပေါ်အမိုးအကာများကို တိုက်ရိုက်ရရှိနိုင်မှုဖြင့် ရှာဖွေပါ',
    findingLocation: 'သင့်တည်နေရာကို ရှာဖွေနေသည်...',
    locationError: 'သင့်တည်နေရာကို ဝင်ရောက်၍မရပါ။ တည်နေရာဝန်ဆောင်မှုများကို ဖွင့်ပေးပါ။',
    enableLocation: 'တည်နေရာဖွင့်ပါ',
    noShelters: 'ဤဘာသာစကားအတွက် အမိုးအကာများ မတွေ့ရှိပါ။ "ဘာသာစကားအားလုံး" ကို ရွေးချယ်ကြည့်ပါ။',
    distance: 'ကီလိုမီတာ အကွာ',
    phone: 'ဖုန်း',
    hours: 'အချိန်',
    capacity: 'စွမ်းရည်',
    services: 'ဝန်ဆောင်မှုများ',
    languages: 'ပြောဆိုသောဘာသာစကားများ',
    getDirections: 'လမ်းညွှန်ရယူပါ',
    callNow: 'ယခုခေါ်ဆိုပါ',
    emergency: 'အရေးပေါ်',
    emergencyText: 'သင်သည် ချက်ချင်းအန္တရာယ်ရှိနေပါက အရေးပေါ်ဝန်ဆောင်မှုများကို ခေါ်ဆိုပါ: 999',
    filters: {
      all: 'ဘာသာစကားအားလုံး',
      english: 'အင်္ဂလိပ်',
      bengali: 'ဘင်္ဂါလီ',
      tamil: 'တမီးလ်',
      chinese: 'တရုတ်',
      malay: 'မလေး',
      hindi: 'ဟိန္ဒီ',
      myanmar: 'မြန်မာ',
      indonesian: 'အင်ဒိုနီးရှား',
      filipino: 'ဖိလစ်ပိုင်'
    }
  }
};

// Sample shelter data with standardized services and language categorization
const sampleShelters: Shelter[] = [
  {
    id: '1',
    name: 'Singapore Migrant Workers Centre',
    address: '73 Bukit Timah Road, #03-01, Singapore 229832',
    phone: '+65 6536 2692',
    hours: '24/7',
    lat: 1.3098,
    lng: 103.8468,
    capacity: '50 beds available',
    services: ['Housing', 'Meals', 'Counseling', 'Legal Aid'],
    languages: ['English', 'Bengali', 'Tamil', 'Chinese']
  },
  {
    id: '2',
    name: 'Humanitarian Organization for Migration Economics (HOME)',
    address: '20 Lengkok Bahru, #01-04, Singapore 159053',
    phone: '+65 6341 5535',
    hours: 'Mon-Fri: 9AM-6PM, Sat: 9AM-1PM',
    lat: 1.2867,
    lng: 103.8120,
    capacity: '30 beds available',
    services: ['Housing', 'Food', 'Medical', 'Job Placement'],
    languages: ['English', 'Malay', 'Indonesian', 'Filipino']
  },
  {
    id: '3',
    name: 'Transient Workers Count Too (TWC2)',
    address: '1 Jalan Rajah, #03-14, Singapore 329133',
    phone: '+65 6247 7001',
    hours: '24/7 Emergency Line',
    lat: 1.3142,
    lng: 103.8567,
    capacity: '40 beds available',
    services: ['Accommodation', 'Crisis Support', 'Medical Referrals'],
    languages: ['English', 'Bengali', 'Hindi', 'Tamil']
  },
  {
    id: '4',
    name: 'HealthServe Community Health',
    address: '8 Lorong Napiri, Singapore 547530',
    phone: '+65 6248 9006',
    hours: 'Mon-Sat: 8AM-10PM',
    lat: 1.3521,
    lng: 103.8698,
    capacity: '25 beds available',
    services: ['Medical', 'Housing', 'Food', 'Counseling'],
    languages: ['English', 'Bengali', 'Tamil', 'Myanmar']
  },
  {
    id: '5',
    name: 'Migrant Workers\' Centre Emergency Shelter',
    address: '18 Havelock Road, #05-01, Singapore 059764',
    phone: '+65 6536 2692',
    hours: '24/7',
    lat: 1.2890,
    lng: 103.8456,
    capacity: '60 beds available',
    services: ['Housing', 'Meals', 'Showers', 'Laundry', 'Legal Support'],
    languages: ['English', 'Chinese', 'Malay', 'Tamil', 'Bengali']
  },
  {
    id: '6',
    name: 'Safe Haven Migrant Support',
    address: '45 Serangoon Road, #02-12, Singapore 217968',
    phone: '+65 6789 1234',
    hours: '24/7',
    lat: 1.3089,
    lng: 103.8520,
    capacity: '35 beds available',
    services: ['Housing', 'Food', 'Medical', 'Translation Services'],
    languages: ['Hindi', 'Bengali', 'Tamil', 'English']
  },
  {
    id: '7',
    name: 'Unity Migrant Care Center',
    address: '12 Joo Chiat Road, #01-08, Singapore 427351',
    phone: '+65 6234 5678',
    hours: 'Mon-Sun: 8AM-10PM',
    lat: 1.3145,
    lng: 103.9015,
    capacity: '45 beds available',
    services: ['Accommodation', 'Meals', 'Counseling', 'Job Assistance'],
    languages: ['Filipino', 'Indonesian', 'English', 'Malay']
  },
  {
    id: '8',
    name: 'Myanmar Workers Support House',
    address: '88 Balestier Road, #03-05, Singapore 329678',
    phone: '+65 6456 7890',
    hours: '24/7',
    lat: 1.3234,
    lng: 103.8456,
    capacity: '20 beds available',
    services: ['Housing', 'Food', 'Medical', 'Legal Aid'],
    languages: ['Myanmar', 'English', 'Bengali']
  }
];

type LanguageFilter = 'all' | 'english' | 'bengali' | 'tamil' | 'chinese' | 'malay' | 'hindi' | 'myanmar' | 'indonesian' | 'filipino';

export function EmergencyShelterPage({ currentLang }: EmergencyShelterPageProps) {
  const navigate = useNavigate();
  const t = emergencyShelterTranslations[currentLang];
  
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [filter, setFilter] = useState<LanguageFilter>('all');

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError(t.locationError);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        calculateDistances(location);
        setLoading(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError(t.locationError);
        setLoading(false);
        // Still show shelters even without location
        setShelters(sampleShelters);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const calculateDistances = (location: { lat: number; lng: number }) => {
    const sheltersWithDistance = sampleShelters.map(shelter => {
      const distance = calculateDistance(
        location.lat,
        location.lng,
        shelter.lat,
        shelter.lng
      );
      return { ...shelter, distance };
    });

    // Sort by distance
    sheltersWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    setShelters(sheltersWithDistance);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  const toRad = (value: number): number => {
    return value * Math.PI / 180;
  };

  const getDirections = (shelter: Shelter) => {
    let url: string;
    if (userLocation) {
      url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${shelter.lat},${shelter.lng}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${shelter.lat},${shelter.lng}`;
    }
    
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const callShelter = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const filteredShelters = shelters.filter(shelter => {
    if (filter === 'all') return true;
    
    const languageMap: Record<LanguageFilter, string> = {
      all: '',
      english: 'English',
      bengali: 'Bengali',
      tamil: 'Tamil',
      chinese: 'Chinese',
      malay: 'Malay',
      hindi: 'Hindi',
      myanmar: 'Myanmar',
      indonesian: 'Indonesian',
      filipino: 'Filipino'
    };
    
    const targetLanguage = languageMap[filter];
    return shelter.languages.includes(targetLanguage);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-indigo-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
          onClick={() => navigate('/help')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backButton}</span>
        </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-cyan-800" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                {t.title}
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-slate-600 mb-2">
              {t.subtitle}
            </p>
            <p className="text-base text-slate-500 max-w-3xl mx-auto">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Alert */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white border-2 border-red-600 text-black rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-2">{t.emergency}</h3>
              <p className="text-black/90">{t.emergencyText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Language Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Languages className="w-6 h-6 text-cyan-800" />
          <h2 className="text-xl font-bold text-slate-900">Filter by Language</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.all}
          </button>
          <button
            onClick={() => setFilter('english')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'english'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.english}
          </button>
          <button
            onClick={() => setFilter('bengali')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'bengali'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.bengali}
          </button>
          <button
            onClick={() => setFilter('tamil')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'tamil'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.tamil}
          </button>
          <button
            onClick={() => setFilter('chinese')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'chinese'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.chinese}
          </button>
          <button
            onClick={() => setFilter('malay')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'malay'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.malay}
          </button>
          <button
            onClick={() => setFilter('hindi')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'hindi'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.hindi}
          </button>
          <button
            onClick={() => setFilter('myanmar')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'myanmar'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.myanmar}
          </button>
          <button
            onClick={() => setFilter('indonesian')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'indonesian'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.indonesian}
          </button>
          <button
            onClick={() => setFilter('filipino')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'filipino'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-700 hover:shadow-md border-2 border-slate-200'
            }`}
          >
            {t.filters.filipino}
          </button>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-cyan-800 animate-spin mx-auto mb-4" />
            <p className="text-lg text-slate-600">{t.findingLocation}</p>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.locationError}</h3>
            <button
              onClick={getUserLocation}
              className="mt-4 px-6 py-3 bg-cyan-800 text-black rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {t.enableLocation}
            </button>
          </div>
        </section>
      )}

      {/* Shelters List */}
      {!loading && filteredShelters.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredShelters.map((shelter) => (
              <div
                key={shelter.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-cyan-800"
              >
                <div className="bg-cyan-800 p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Home className="w-8 h-8" />
                      <h3 className="font-bold text-xl">{shelter.name}</h3>
                    </div>
                    {shelter.distance && (
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Navigation className="w-4 h-4" />
                        <span className="text-sm font-semibold">{shelter.distance} {t.distance}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white/90 text-sm flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {shelter.address}
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Contact Info */}
                  <div className="flex items-center gap-3 text-slate-700">
                    <Phone className="w-5 h-5 text-cyan-800" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">{t.phone}</p>
                      <p className="font-semibold">{shelter.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <Clock className="w-5 h-5 text-cyan-800" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">{t.hours}</p>
                      <p className="font-semibold">{shelter.hours}</p>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="bg-slate-50 border-2 border-cyan-800 rounded-xl p-3">
                    <p className="text-xs text-slate-600 font-medium mb-1">{t.capacity}</p>
                    <p className="font-bold text-black">{shelter.capacity}</p>
                  </div>

                  {/* Languages */}
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-2 flex items-center gap-2">
                      <Languages className="w-4 h-4" />
                      {t.languages}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {shelter.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-50 text-cyan-800 rounded-full text-xs font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-2">{t.services}</p>
                    <div className="flex flex-wrap gap-2">
                      {shelter.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-50 text-cyan-800 rounded-full text-xs font-medium"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => getDirections(shelter)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 border-2 border-cyan-800 text-cyan-800 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      <MapPin className="w-4 h-4" />
                      {t.getDirections}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => callShelter(shelter.phone)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 border-2 border-cyan-800 text-cyan-800 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      {t.callNow}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {!loading && filteredShelters.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <Home className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.noShelters}</h3>
            <button
              onClick={() => setFilter('all')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {t.filters.all}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
