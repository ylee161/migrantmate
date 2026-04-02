import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { ArrowLeft, MapPin, Navigation, Tag, Clock, Percent, Store, UtensilsCrossed, ShoppingBag, Sparkles, RefreshCw } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LanguageCode } from '../translations';

interface DiscountsPageProps {
  currentLang: LanguageCode;
}

interface DiscountLocation {
  id: string;
  name: string;
  category: 'food' | 'shopping' | 'entertainment' | 'services';
  discount: string;
  description: string;
  location: string;
  coordinates: [number, number];
  validUntil: string;
  terms: string;
}

// Hardcoded example discounts distributed across Singapore
const EXAMPLE_DISCOUNTS: DiscountLocation[] = [
  // Food discounts
  {
    id: '1',
    name: 'Little India Curry House',
    category: 'food',
    discount: '20% off',
    description: 'Authentic Indian cuisine with special discount for workers',
    location: '48 Serangoon Road, Little India',
    coordinates: [1.3067, 103.8521],
    validUntil: '31 Dec 2024',
    terms: 'Valid for dine-in only. Show work permit for discount.'
  },
  {
    id: '2',
    name: 'Golden Mile Food Centre',
    category: 'food',
    discount: '15% off',
    description: 'Thai and Southeast Asian food court with great deals',
    location: '505 Beach Road, Golden Mile Complex',
    coordinates: [1.3025, 103.8636],
    validUntil: '30 Nov 2024',
    terms: 'Minimum spend $10. Valid Monday to Friday.'
  },
  {
    id: '3',
    name: 'Tekka Centre Hawker',
    category: 'food',
    discount: '10% off',
    description: 'Popular hawker centre with diverse food options',
    location: '665 Buffalo Road, Tekka Centre',
    coordinates: [1.3063, 103.8503],
    validUntil: '31 Jan 2025',
    terms: 'Valid at participating stalls only.'
  },
  {
    id: '4',
    name: 'Chinatown Food Street',
    category: 'food',
    discount: '25% off',
    description: 'Traditional Chinese cuisine and local favorites',
    location: 'Smith Street, Chinatown',
    coordinates: [1.2827, 103.8437],
    validUntil: '15 Dec 2024',
    terms: 'Valid after 6pm on weekdays.'
  },
  {
    id: '5',
    name: 'Geylang Serai Market',
    category: 'food',
    discount: '15% off',
    description: 'Malay and Indonesian food specialties',
    location: '1 Geylang Serai, Paya Lebar',
    coordinates: [1.3159, 103.8990],
    validUntil: '31 Dec 2024',
    terms: 'Valid for takeaway orders.'
  },
  
  // Shopping discounts
  {
    id: '6',
    name: 'Mustafa Centre',
    category: 'shopping',
    discount: '30% off',
    description: '24-hour shopping mall with electronics and groceries',
    location: '145 Syed Alwi Road, Little India',
    coordinates: [1.3099, 103.8557],
    validUntil: '31 Dec 2024',
    terms: 'Valid on selected items. Check in-store for details.'
  },
  {
    id: '7',
    name: 'Lucky Plaza',
    category: 'shopping',
    discount: '20% off',
    description: 'Electronics, clothing, and remittance services',
    location: '304 Orchard Road',
    coordinates: [1.3044, 103.8340],
    validUntil: '30 Nov 2024',
    terms: 'Show this offer at participating shops.'
  },
  {
    id: '8',
    name: 'Sim Lim Square',
    category: 'shopping',
    discount: '25% off',
    description: 'Electronics and computer equipment',
    location: '1 Rochor Canal Road',
    coordinates: [1.3030, 103.8530],
    validUntil: '31 Jan 2025',
    terms: 'Valid on accessories and cables.'
  },
  {
    id: '9',
    name: 'Bugis Street Market',
    category: 'shopping',
    discount: '15% off',
    description: 'Affordable clothing, accessories, and souvenirs',
    location: '3 New Bugis Street',
    coordinates: [1.2995, 103.8553],
    validUntil: '31 Dec 2024',
    terms: 'Minimum purchase $20.'
  },
  
  // Entertainment discounts
  {
    id: '10',
    name: 'Golden Village Cinema',
    category: 'entertainment',
    discount: '40% off',
    description: 'Movie tickets at discounted rates',
    location: 'VivoCity, 1 HarbourFront Walk',
    coordinates: [1.2644, 103.8220],
    validUntil: '31 Dec 2024',
    terms: 'Valid Monday to Thursday only. Excludes public holidays.'
  },
  {
    id: '11',
    name: 'East Coast Park Recreation',
    category: 'entertainment',
    discount: '50% off',
    description: 'Bicycle and equipment rental',
    location: 'East Coast Park Service Road',
    coordinates: [1.3008, 103.9122],
    validUntil: '30 Nov 2024',
    terms: 'Valid on weekdays before 5pm.'
  },
  {
    id: '12',
    name: 'Sentosa Island Pass',
    category: 'entertainment',
    discount: '35% off',
    description: 'Discounted entry to Sentosa attractions',
    location: 'Sentosa Gateway',
    coordinates: [1.2494, 103.8303],
    validUntil: '31 Jan 2025',
    terms: 'Valid for foreign workers with valid work permit.'
  },
  {
    id: '13',
    name: 'Kallang Wave Mall Bowling',
    category: 'entertainment',
    discount: '30% off',
    description: 'Bowling and arcade games',
    location: '1 Stadium Place, Kallang Wave Mall',
    coordinates: [1.3025, 103.8750],
    validUntil: '31 Dec 2024',
    terms: 'Valid Sunday to Thursday.'
  },
  
  // Services discounts
  {
    id: '14',
    name: 'Quick Cut Hair Salon',
    category: 'services',
    discount: '50% off',
    description: 'Affordable haircuts for men and women',
    location: '201 Serangoon Road',
    coordinates: [1.3088, 103.8545],
    validUntil: '31 Dec 2024',
    terms: 'Valid Monday to Friday before 3pm.'
  },
  {
    id: '15',
    name: 'Mobile Phone Repair Centre',
    category: 'services',
    discount: '25% off',
    description: 'Screen replacement and phone repairs',
    location: 'Sim Lim Square, Level 3',
    coordinates: [1.3032, 103.8528],
    validUntil: '30 Nov 2024',
    terms: 'Excludes parts cost. Labor only.'
  },
  {
    id: '16',
    name: 'Express Laundry Service',
    category: 'services',
    discount: '20% off',
    description: 'Wash, dry, and fold services',
    location: '123 Geylang Road',
    coordinates: [1.3145, 103.8710],
    validUntil: '31 Jan 2025',
    terms: 'Minimum 5kg. Self-service excluded.'
  },
  {
    id: '17',
    name: 'Budget Dental Clinic',
    category: 'services',
    discount: '30% off',
    description: 'Dental checkup and cleaning',
    location: '88 Bencoolen Street',
    coordinates: [1.3010, 103.8505],
    validUntil: '31 Dec 2024',
    terms: 'First visit only. Excludes major procedures.'
  },
  {
    id: '18',
    name: 'International Calling Centre',
    category: 'services',
    discount: '40% off',
    description: 'Cheap international calls and SIM cards',
    location: 'Golden Mile Complex, Level 1',
    coordinates: [1.3023, 103.8638],
    validUntil: '31 Dec 2024',
    terms: 'Valid on prepaid calling cards.'
  }
];

// Native translations
const nativeTranslations: Record<LanguageCode, {
  backButton: string;
  pageTitle: string;
  pageDescription: string;
  myLocation: string;
  refreshLocation: string;
  allDiscounts: string;
  food: string;
  shopping: string;
  entertainment: string;
  services: string;
  nearbyDiscounts: string;
  validUntil: string;
  terms: string;
  away: string;
  noDiscountsFound: string;
}> = {
  en: {
    backButton: 'Back to Menu',
    pageTitle: 'Discounts Near You',
    pageDescription: 'Find special offers and deals at nearby locations',
    myLocation: 'My Location',
    refreshLocation: 'Location',
    allDiscounts: 'All Discounts',
    food: 'Food',
    shopping: 'Shopping',
    entertainment: 'Entertainment',
    services: 'Services',
    nearbyDiscounts: 'Nearby Discounts',
    validUntil: 'Valid until',
    terms: 'Terms',
    away: 'away',
    noDiscountsFound: 'No discounts found in this category'
  },
  zh: {
    backButton: '返回',
    pageTitle: '附近的折扣',
    pageDescription: '在附近地点查找特别优惠和折扣',
    myLocation: '我的位置',
    refreshLocation: '位置',
    allDiscounts: '所有折扣',
    food: '美食',
    shopping: '购物',
    entertainment: '娱乐',
    services: '服务',
    nearbyDiscounts: '附近的折扣',
    validUntil: '有效期至',
    terms: '条款',
    away: '远',
    noDiscountsFound: '此类别中未找到折扣'
  },
  ms: {
    backButton: 'Kembali',
    pageTitle: 'Diskaun Berhampiran Anda',
    pageDescription: 'Cari tawaran istimewa dan diskaun di lokasi berdekatan',
    myLocation: 'Lokasi Saya',
    refreshLocation: 'Lokasi',
    allDiscounts: 'Semua Diskaun',
    food: 'Makanan',
    shopping: 'Membeli-belah',
    entertainment: 'Hiburan',
    services: 'Perkhidmatan',
    nearbyDiscounts: 'Diskaun Berdekatan',
    validUntil: 'Sah sehingga',
    terms: 'Terma',
    away: 'jauh',
    noDiscountsFound: 'Tiada diskaun dijumpai dalam kategori ini'
  },
  ta: {
    backButton: 'பின்செல்',
    pageTitle: 'உங்களுக்கு அருகில் உள்ள தள்ளுபடிகள்',
    pageDescription: 'அருகிலுள்ள இடங்களில் சிறப்பு சலுகைகள் மற்றும் ஒப்பந்தங்களைக் கண்டறியவும்',
    myLocation: 'எனது இடம்',
    refreshLocation: 'இடம்',
    allDiscounts: 'அனைத்து தள்ளுபடிகள்',
    food: 'உணவு',
    shopping: 'ஷாப்பிங்',
    entertainment: 'பொழுதுபோக்கு',
    services: 'சேவைகள்',
    nearbyDiscounts: 'அருகிலுள்ள தள்ளுபடிகள்',
    validUntil: 'செல்லுபடியாகும் வரை',
    terms: 'விதிமுறைகள்',
    away: 'தொலைவில்',
    noDiscountsFound: 'இந்த வகையில் தள்ளுபடிகள் எதுவும் இல்லை'
  },
  bn: {
    backButton: 'ফিরে যান',
    pageTitle: 'আপনার কাছাকাছি ছাড়',
    pageDescription: 'কাছাকাছি স্থানে বিশেষ অফার এবং ডিল খুঁজুন',
    myLocation: 'আমার অবস্থান',
    refreshLocation: 'অবস্থান',
    allDiscounts: 'সব ছাড়',
    food: 'খাবার',
    shopping: 'কেনাকাটা',
    entertainment: 'বিনোদন',
    services: 'সেবা',
    nearbyDiscounts: 'কাছাকাছি ছাড়',
    validUntil: 'বৈধ পর্যন্ত',
    terms: 'শর্তাবলী',
    away: 'দূরে',
    noDiscountsFound: 'এই বিভাগে কোনো ছাড় পাওয়া যায়নি'
  },
  hi: {
    backButton: 'वापस',
    pageTitle: 'आपके पास छूट',
    pageDescription: 'पास के स्थानों पर विशेष ऑफर और सौदे खोजें',
    myLocation: 'मेरा स्थान',
    refreshLocation: 'स्थान',
    allDiscounts: 'सभी छूट',
    food: 'भोजन',
    shopping: 'खरीदारी',
    entertainment: 'मनोरंजन',
    services: 'सेवाएं',
    nearbyDiscounts: 'पास की छूट',
    validUntil: 'तक मान्य',
    terms: 'शर्तें',
    away: 'दूर',
    noDiscountsFound: 'इस श्रेणी में कोई छूट नहीं मिली'
  },
  th: {
    backButton: 'กลับ',
    pageTitle: 'ส่วนลดใกล้คุณ',
    pageDescription: 'ค้นหาข้อเสนอพิเศษและดีลในสถานที่ใกล้เคียง',
    myLocation: 'ตำแหน่งของฉัน',
    refreshLocation: 'ตำแหน่ง',
    allDiscounts: 'ส่วนลดทั้งหมด',
    food: 'อาหาร',
    shopping: 'ช้อปปิ้ง',
    entertainment: 'บันเทิง',
    services: 'บริการ',
    nearbyDiscounts: 'ส่วนลดใกล้เคียง',
    validUntil: 'ใช้ได้จนถึง',
    terms: 'เงื่อนไข',
    away: 'ห่าง',
    noDiscountsFound: 'ไม่พบส่วนลดในหมวดหมู่นี้'
  },
  vi: {
    backButton: 'Quay lại',
    pageTitle: 'Giảm giá Gần bạn',
    pageDescription: 'Tìm ưu đãi đặc biệt và giao dịch tại các địa điểm gần đây',
    myLocation: 'Vị trí của tôi',
    refreshLocation: 'Vị trí',
    allDiscounts: 'Tất cả Giảm giá',
    food: 'Ẩm thực',
    shopping: 'Mua sắm',
    entertainment: 'Giải trí',
    services: 'Dịch vụ',
    nearbyDiscounts: 'Giảm giá Gần đây',
    validUntil: 'Có hiệu lực đến',
    terms: 'Điều khoản',
    away: 'xa',
    noDiscountsFound: 'Không tìm thấy giảm giá trong danh mục này'
  },
  id: {
    backButton: 'Kembali',
    pageTitle: 'Diskon Terdekat',
    pageDescription: 'Temukan penawaran khusus dan diskon di lokasi terdekat',
    myLocation: 'Lokasi Saya',
    refreshLocation: 'Lokasi',
    allDiscounts: 'Semua Diskon',
    food: 'Makanan',
    shopping: 'Belanja',
    entertainment: 'Hiburan',
    services: 'Layanan',
    nearbyDiscounts: 'Diskon Terdekat',
    validUntil: 'Berlaku hingga',
    terms: 'Syarat',
    away: 'jauhnya',
    noDiscountsFound: 'Tidak ada diskon ditemukan dalam kategori ini'
  },
  tl: {
    backButton: 'Bumalik',
    pageTitle: 'Mga Diskwento Malapit sa Iyo',
    pageDescription: 'Maghanap ng mga espesyal na alok at deal sa malapit na lokasyon',
    myLocation: 'Aking Lokasyon',
    refreshLocation: 'Lokasyon',
    allDiscounts: 'Lahat ng Diskwento',
    food: 'Pagkain',
    shopping: 'Pamimili',
    entertainment: 'Libangan',
    services: 'Mga Serbisyo',
    nearbyDiscounts: 'Mga Diskwento Malapit',
    validUntil: 'Balido hanggang',
    terms: 'Mga Tuntunin',
    away: 'layo',
    noDiscountsFound: 'Walang diskwento na nahanap sa kategoryang ito'
  },
  my: {
    backButton: 'နောက်သို့',
    pageTitle: 'သင့်အနီးရှိ လျှော့စျေးများ',
    pageDescription: 'အနီးအနားရှိ နေရာများတွင် အထူးကမ်းလှမ်းချက်များနှင့် အရောင်းအ၀ယ်များကို ရှာဖွေပါ',
    myLocation: 'ကျွန်ုပ်၏တည်နေရာ',
    refreshLocation: 'တည်နေရာ',
    allDiscounts: 'လျှော့စျေးအားလုံး',
    food: 'အစားအသောက်',
    shopping: 'ဈေးဝယ်ခြင်း',
    entertainment: 'ဖျော်ဖြေရေး',
    services: 'ဝန်ဆောင်မှုများ',
    nearbyDiscounts: 'အနီးအနားရှိ လျှော့စျေးများ',
    validUntil: 'အထိ တရားဝင်',
    terms: 'စည်းကမ်းချက်များ',
    away: 'အကွာ',
    noDiscountsFound: 'ဤအမျိုးအစားတွင် လျှော့စျေးများမတွေ့ပါ'
  }
};

const categoryIcons = {
  food: UtensilsCrossed,
  shopping: ShoppingBag,
  entertainment: Sparkles,
  services: Store
};

const categoryColors = {
  food: 'from-orange-500 to-red-600',
  shopping: 'from-blue-500 to-cyan-600',
  entertainment: 'from-purple-500 to-pink-600',
  services: 'from-green-500 to-emerald-600'
};

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function DiscountsPage({ currentLang }: DiscountsPageProps) {
  const navigate = useNavigate();
  const t = nativeTranslations[currentLang];
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);
          setLocationError('');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Using default Singapore location.');
          const defaultLocation: [number, number] = [1.3521, 103.8198];
          setUserLocation(defaultLocation);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
      const defaultLocation: [number, number] = [1.3521, 103.8198];
      setUserLocation(defaultLocation);
    }
  }, []);

  const refreshLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);
          setLocationError('');
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location.');
        }
      );
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredDiscounts = selectedCategory === 'all' 
    ? EXAMPLE_DISCOUNTS 
    : EXAMPLE_DISCOUNTS.filter(d => d.category === selectedCategory);

  const discountsWithDistance = userLocation
    ? filteredDiscounts.map(discount => ({
        ...discount,
        distance: calculateDistance(
          userLocation[0],
          userLocation[1],
          discount.coordinates[0],
          discount.coordinates[1]
        )
      })).sort((a, b) => a.distance - b.distance)
    : filteredDiscounts.map(discount => ({ ...discount, distance: 0 }));

  const createCustomIcon = (category: string) => {
    const colors = {
      food: '#f97316',
      shopping: '#3b82f6',
      entertainment: '#a855f7',
      services: '#10b981'
    };
    
    return L.divIcon({
      className: 'custom-icon',
      html: `
        <div style="
          background: ${colors[category as keyof typeof colors]};
          width: 40px;
          height: 40px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="
            transform: rotate(45deg);
            color: white;
            font-size: 20px;
            font-weight: bold;
          ">%</span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  const userIcon = L.divIcon({
    className: 'custom-icon',
    html: `
      <div style="
        background: #00838F;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  if (!userLocation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-800 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/activities')}
              className="group flex items-center gap-2 px-4 py-2 bg-transparent text-cyan-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              {t.backButton}
            </button>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <Tag className="w-7 h-7 text-cyan-800" />
                {t.pageTitle}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={refreshLocation}
                className="flex items-center gap-2 px-4 py-2 bg-transparent text-cyan-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-sm"
              >
                <Navigation className="w-4 h-4" />
                {t.refreshLocation}
              </button>
            </div>
          </div>
        </div>
      </div>

      {locationError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <p className="text-yellow-700">{locationError}</p>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-cyan-800 text-white shadow-lg'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-cyan-800'
            }`}
          >
            {t.allDiscounts}
          </button>
          {Object.entries(categoryIcons).map(([category, Icon]) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-cyan-800 text-white shadow-lg'
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-cyan-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              {t[category as keyof typeof t] as string}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: '600px' }}>
              <MapContainer
                center={userLocation}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <Circle
                  center={userLocation}
                  radius={5000}
                  pathOptions={{
                    fillColor: '#00838F',
                    fillOpacity: 0.1,
                    color: '#00838F',
                    weight: 2
                  }}
                />
                
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>
                    <div className="text-center font-semibold">
                      {t.myLocation}
                    </div>
                  </Popup>
                </Marker>
                
                {filteredDiscounts.map((discount) => (
                  <Marker
                    key={discount.id}
                    position={discount.coordinates}
                    icon={createCustomIcon(discount.category)}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-lg mb-2">{discount.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Percent className="w-4 h-4 text-cyan-800" />
                          <span className="font-semibold text-cyan-800">{discount.discount}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{discount.description}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="w-4 h-4" />
                          <span>{discount.location}</span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Discounts List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-h-[600px] overflow-y-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Tag className="w-6 h-6 text-cyan-800" />
                {t.nearbyDiscounts}
              </h2>
              
              {discountsWithDistance.length === 0 ? (
                <div className="text-center py-12">
                  <Tag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">{t.noDiscountsFound}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {discountsWithDistance.map((discount) => {
                    const CategoryIcon = categoryIcons[discount.category];
                    return (
                      <div
                        key={discount.id}
                        className="bg-slate-100 rounded-xl p-4 border-2 border-cyan-600 hover:border-cyan-800 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[discount.category]}`}>
                              <CategoryIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900">{discount.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Percent className="w-4 h-4 text-cyan-800" />
                                <span className="font-semibold text-cyan-800">{discount.discount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-slate-600 mb-3">{discount.description}</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-500">
                            <MapPin className="w-4 h-4" />
                            <span>{discount.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <Navigation className="w-4 h-4" />
                            <span>{discount.distance.toFixed(2)} km {t.away}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500">
                            <Clock className="w-4 h-4" />
                            <span>{t.validUntil} {discount.validUntil}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-cyan-600">
                          <p className="text-xs text-slate-500 italic">{discount.terms}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
