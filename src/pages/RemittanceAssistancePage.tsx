import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, DollarSign, Zap, Shield, RefreshCw } from 'lucide-react';
import { LanguageCode } from '../translations';

interface RemittanceAssistancePageProps {
  currentLang: LanguageCode;
}

interface RemittanceOption {
  id: string;
  provider: string;
  logo: string;
  fee: number;
  exchangeRate: number;
  transferTime: string;
  totalCost: number;
  youReceive: number;
  rating: number;
  features: string[];
}

interface ExchangeRate {
  currency: string;
  rate: number;
  change: number;
  flag: string;
}

interface RemittanceTranslations {
  backButton: string;
  title: string;
  subtitle: string;
  exchangeRates: string;
  liveRates: string;
  lastUpdated: string;
  refresh: string;
  sendAmount: string;
  sendAmountPlaceholder: string;
  selectDestination: string;
  compareOptions: string;
  cheapestOption: string;
  fastestOption: string;
  provider: string;
  fee: string;
  exchangeRate: string;
  transferTime: string;
  youSend: string;
  recipientGets: string;
  totalCost: string;
  rating: string;
  features: string;
  selectProvider: string;
  currency: string;
  countries: {
    india: string;
    bangladesh: string;
    philippines: string;
    myanmar: string;
    thailand: string;
    vietnam: string;
    indonesia: string;
    china: string;
  };
}

const remittanceTranslations: Record<LanguageCode, RemittanceTranslations> = {
  en: {
    backButton: 'Back to Home',
    title: 'Remittance Assistance',
    subtitle: 'Compare the best options to send money home',
    exchangeRates: 'Live Exchange Rates',
    liveRates: 'Real-time rates from SGD',
    lastUpdated: 'Last updated',
    refresh: 'Refresh',
    sendAmount: 'Amount to Send',
    sendAmountPlaceholder: 'Enter amount in SGD',
    selectDestination: 'Select Destination Country',
    compareOptions: 'Compare Remittance Options',
    cheapestOption: 'Cheapest Option',
    fastestOption: 'Fastest Option',
    provider: 'Provider',
    fee: 'Transfer Fee',
    exchangeRate: 'Exchange Rate',
    transferTime: 'Transfer Time',
    youSend: 'You Send',
    recipientGets: 'Recipient Gets',
    totalCost: 'Total Cost',
    rating: 'Rating',
    features: 'Features',
    selectProvider: 'Select Provider',
    currency: 'SGD',
    countries: {
      india: 'India',
      bangladesh: 'Bangladesh',
      philippines: 'Philippines',
      myanmar: 'Myanmar',
      thailand: 'Thailand',
      vietnam: 'Vietnam',
      indonesia: 'Indonesia',
      china: 'China'
    }
  },
  zh: {
    backButton: '返回',
    title: '汇款援助',
    subtitle: '比较汇款回家的最佳选择',
    exchangeRates: '实时汇率',
    liveRates: '从新元的实时汇率',
    lastUpdated: '最后更新',
    refresh: '刷新',
    sendAmount: '汇款金额',
    sendAmountPlaceholder: '输入新元金额',
    selectDestination: '选择目的地国家',
    compareOptions: '比较汇款选项',
    cheapestOption: '最便宜选项',
    fastestOption: '最快选项',
    provider: '提供商',
    fee: '转账费',
    exchangeRate: '汇率',
    transferTime: '转账时间',
    youSend: '您发送',
    recipientGets: '收款人获得',
    totalCost: '总费用',
    rating: '评分',
    features: '特点',
    selectProvider: '选择提供商',
    currency: '新元',
    countries: {
      india: '印度',
      bangladesh: '孟加拉国',
      philippines: '菲律宾',
      myanmar: '缅甸',
      thailand: '泰国',
      vietnam: '越南',
      indonesia: '印度尼西亚',
      china: '中国'
    }
  },
  ms: {
    backButton: 'Kembali',
    title: 'Bantuan Kiriman Wang',
    subtitle: 'Bandingkan pilihan terbaik untuk menghantar wang pulang',
    exchangeRates: 'Kadar Pertukaran Langsung',
    liveRates: 'Kadar masa nyata dari SGD',
    lastUpdated: 'Kemas kini terakhir',
    refresh: 'Muat semula',
    sendAmount: 'Jumlah untuk Dihantar',
    sendAmountPlaceholder: 'Masukkan jumlah dalam SGD',
    selectDestination: 'Pilih Negara Destinasi',
    compareOptions: 'Bandingkan Pilihan Kiriman Wang',
    cheapestOption: 'Pilihan Termurah',
    fastestOption: 'Pilihan Terpantas',
    provider: 'Pembekal',
    fee: 'Yuran Pemindahan',
    exchangeRate: 'Kadar Pertukaran',
    transferTime: 'Masa Pemindahan',
    youSend: 'Anda Hantar',
    recipientGets: 'Penerima Dapat',
    totalCost: 'Jumlah Kos',
    rating: 'Penilaian',
    features: 'Ciri-ciri',
    selectProvider: 'Pilih Pembekal',
    currency: 'SGD',
    countries: {
      india: 'India',
      bangladesh: 'Bangladesh',
      philippines: 'Filipina',
      myanmar: 'Myanmar',
      thailand: 'Thailand',
      vietnam: 'Vietnam',
      indonesia: 'Indonesia',
      china: 'China'
    }
  },
  ta: {
    backButton: 'பின்செல்',
    title: 'பணம் அனுப்பும் உதவி',
    subtitle: 'வீட்டிற்கு பணம் அனுப்ப சிறந்த விருப்பங்களை ஒப்பிடுங்கள்',
    exchangeRates: 'நேரடி மாற்று விகிதங்கள்',
    liveRates: 'SGD இலிருந்து நிகழ்நேர விகிதங்கள்',
    lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
    refresh: 'புதுப்பிக்கவும்',
    sendAmount: 'அனுப்ப வேண்டிய தொகை',
    sendAmountPlaceholder: 'SGD இல் தொகையை உள்ளிடவும்',
    selectDestination: 'இலக்கு நாட்டைத் தேர்ந்தெடுக்கவும்',
    compareOptions: 'பணம் அனுப்பும் விருப்பங்களை ஒப்பிடுங்கள்',
    cheapestOption: 'மலிவான விருப்பம்',
    fastestOption: 'வேகமான விருப்பம்',
    provider: 'வழங்குநர்',
    fee: 'பரிமாற்ற கட்டணம்',
    exchangeRate: 'மாற்று விகிதம்',
    transferTime: 'பரிமாற்ற நேரம்',
    youSend: 'நீங்கள் அனுப்புகிறீர்கள்',
    recipientGets: 'பெறுநர் பெறுகிறார்',
    totalCost: 'மொத்த செலவு',
    rating: 'மதிப்பீடு',
    features: 'அம்சங்கள்',
    selectProvider: 'வழங்குநரைத் தேர்ந்தெடுக்கவும்',
    currency: 'SGD',
    countries: {
      india: 'இந்தியா',
      bangladesh: 'பங்களாதேஷ்',
      philippines: 'பிலிப்பைன்ஸ்',
      myanmar: 'மியான்மர்',
      thailand: 'தாய்லாந்து',
      vietnam: 'வியட்நாம்',
      indonesia: 'இந்தோனேசியா',
      china: 'சீனா'
    }
  },
  bn: {
    backButton: 'ফিরে যান',
    title: 'রেমিট্যান্স সহায়তা',
    subtitle: 'বাড়িতে টাকা পাঠানোর সেরা বিকল্পগুলি তুলনা করুন',
    exchangeRates: 'লাইভ বিনিময় হার',
    liveRates: 'SGD থেকে রিয়েল-টাইম হার',
    lastUpdated: 'সর্বশেষ আপডেট',
    refresh: 'রিফ্রেশ',
    sendAmount: 'পাঠানোর পরিমাণ',
    sendAmountPlaceholder: 'SGD তে পরিমাণ লিখুন',
    selectDestination: 'গন্তব্য দেশ নির্বাচন করুন',
    compareOptions: 'রেমিট্যান্স বিকল্পগুলি তুলনা করুন',
    cheapestOption: 'সবচেয়ে সস্তা বিকল্প',
    fastestOption: 'দ্রুততম বিকল্প',
    provider: 'প্রদানকারী',
    fee: 'স্থানান্তর ফি',
    exchangeRate: 'বিনিময় হার',
    transferTime: 'স্থানান্তর সময়',
    youSend: 'আপনি পাঠান',
    recipientGets: 'প্রাপক পান',
    totalCost: 'মোট খরচ',
    rating: 'রেটিং',
    features: 'বৈশিষ্ট্য',
    selectProvider: 'প্রদানকারী নির্বাচন করুন',
    currency: 'SGD',
    countries: {
      india: 'ভারত',
      bangladesh: 'বাংলাদেশ',
      philippines: 'ফিলিপাইন',
      myanmar: 'মিয়ানমার',
      thailand: 'থাইল্যান্ড',
      vietnam: 'ভিয়েতনাম',
      indonesia: 'ইন্দোনেশিয়া',
      china: 'চীন'
    }
  },
  hi: {
    backButton: 'वापस',
    title: 'रेमिटेंस सहायता',
    subtitle: 'घर पैसे भेजने के लिए सर्वोत्तम विकल्पों की तुलना करें',
    exchangeRates: 'लाइव विनिमय दरें',
    liveRates: 'SGD से रीयल-टाइम दरें',
    lastUpdated: 'अंतिम अपडेट',
    refresh: 'रिफ्रेश',
    sendAmount: 'भेजने की राशि',
    sendAmountPlaceholder: 'SGD में राशि दर्ज करें',
    selectDestination: 'गंतव्य देश चुनें',
    compareOptions: 'रेमिटेंस विकल्पों की तुलना करें',
    cheapestOption: 'सबसे सस्ता विकल्प',
    fastestOption: 'सबसे तेज़ विकल्प',
    provider: 'प्रदाता',
    fee: 'स्थानांतरण शुल्क',
    exchangeRate: 'विनिमय दर',
    transferTime: 'स्थानांतरण समय',
    youSend: 'आप भेजते हैं',
    recipientGets: 'प्राप्तकर्ता को मिलता है',
    totalCost: 'कुल लागत',
    rating: 'रेटिंग',
    features: 'विशेषताएं',
    selectProvider: 'प्रदाता चुनें',
    currency: 'SGD',
    countries: {
      india: 'भारत',
      bangladesh: 'बांग्लादेश',
      philippines: 'फिलीपींस',
      myanmar: 'म्यांमार',
      thailand: 'थाईलैंड',
      vietnam: 'वियतनाम',
      indonesia: 'इंडोनेशिया',
      china: 'चीन'
    }
  },
  th: {
    backButton: 'กลับ',
    title: 'ความช่วยเหลือการส่งเงิน',
    subtitle: 'เปรียบเทียบตัวเลือกที่ดีที่สุดในการส่งเงินกลับบ้าน',
    exchangeRates: 'อัตราแลกเปลี่ยนแบบเรียลไทม์',
    liveRates: 'อัตราเรียลไทม์จาก SGD',
    lastUpdated: 'อัปเดตล่าสุด',
    refresh: 'รีเฟรช',
    sendAmount: 'จำนวนเงินที่จะส่ง',
    sendAmountPlaceholder: 'ใส่จำนวนเงินใน SGD',
    selectDestination: 'เลือกประเทศปลายทาง',
    compareOptions: 'เปรียบเทียบตัวเลือกการส่งเงิน',
    cheapestOption: 'ตัวเลือกที่ถูกที่สุด',
    fastestOption: 'ตัวเลือกที่เร็วที่สุด',
    provider: 'ผู้ให้บริการ',
    fee: 'ค่าธรรมเนียมการโอน',
    exchangeRate: 'อัตราแลกเปลี่ยน',
    transferTime: 'เวลาการโอน',
    youSend: 'คุณส่ง',
    recipientGets: 'ผู้รับได้รับ',
    totalCost: 'ต้นทุนรวม',
    rating: 'คะแนน',
    features: 'คุณสมบัติ',
    selectProvider: 'เลือกผู้ให้บริการ',
    currency: 'SGD',
    countries: {
      india: 'อินเดีย',
      bangladesh: 'บังกลาเทศ',
      philippines: 'ฟิลิปปินส์',
      myanmar: 'เมียนมาร์',
      thailand: 'ไทย',
      vietnam: 'เวียดนาม',
      indonesia: 'อินโดนีเซีย',
      china: 'จีน'
    }
  },
  vi: {
    backButton: 'Quay lại',
    title: 'Hỗ Trợ Chuyển Tiền',
    subtitle: 'So sánh các lựa chọn tốt nhất để gửi tiền về nhà',
    exchangeRates: 'Tỷ Giá Hối Đoái Trực Tiếp',
    liveRates: 'Tỷ giá thời gian thực từ SGD',
    lastUpdated: 'Cập nhật lần cuối',
    refresh: 'Làm mới',
    sendAmount: 'Số Tiền Gửi',
    sendAmountPlaceholder: 'Nhập số tiền bằng SGD',
    selectDestination: 'Chọn Quốc Gia Đích',
    compareOptions: 'So Sánh Các Lựa Chọn Chuyển Tiền',
    cheapestOption: 'Lựa Chọn Rẻ Nhất',
    fastestOption: 'Lựa Chọn Nhanh Nhất',
    provider: 'Nhà Cung Cấp',
    fee: 'Phí Chuyển',
    exchangeRate: 'Tỷ Giá Hối Đoái',
    transferTime: 'Thời Gian Chuyển',
    youSend: 'Bạn Gửi',
    recipientGets: 'Người Nhận Được',
    totalCost: 'Tổng Chi Phí',
    rating: 'Đánh Giá',
    features: 'Tính Năng',
    selectProvider: 'Chọn Nhà Cung Cấp',
    currency: 'SGD',
    countries: {
      india: 'Ấn Độ',
      bangladesh: 'Bangladesh',
      philippines: 'Philippines',
      myanmar: 'Myanmar',
      thailand: 'Thái Lan',
      vietnam: 'Việt Nam',
      indonesia: 'Indonesia',
      china: 'Trung Quốc'
    }
  },
  id: {
    backButton: 'Kembali',
    title: 'Bantuan Pengiriman Uang',
    subtitle: 'Bandingkan opsi terbaik untuk mengirim uang pulang',
    exchangeRates: 'Nilai Tukar Langsung',
    liveRates: 'Nilai real-time dari SGD',
    lastUpdated: 'Terakhir diperbarui',
    refresh: 'Segarkan',
    sendAmount: 'Jumlah yang Dikirim',
    sendAmountPlaceholder: 'Masukkan jumlah dalam SGD',
    selectDestination: 'Pilih Negara Tujuan',
    compareOptions: 'Bandingkan Opsi Pengiriman Uang',
    cheapestOption: 'Opsi Termurah',
    fastestOption: 'Opsi Tercepat',
    provider: 'Penyedia',
    fee: 'Biaya Transfer',
    exchangeRate: 'Nilai Tukar',
    transferTime: 'Waktu Transfer',
    youSend: 'Anda Kirim',
    recipientGets: 'Penerima Dapat',
    totalCost: 'Total Biaya',
    rating: 'Penilaian',
    features: 'Fitur',
    selectProvider: 'Pilih Penyedia',
    currency: 'SGD',
    countries: {
      india: 'India',
      bangladesh: 'Bangladesh',
      philippines: 'Filipina',
      myanmar: 'Myanmar',
      thailand: 'Thailand',
      vietnam: 'Vietnam',
      indonesia: 'Indonesia',
      china: 'Tiongkok'
    }
  },
  tl: {
    backButton: 'Bumalik',
    title: 'Tulong sa Pagpapadala ng Pera',
    subtitle: 'Ikumpara ang pinakamahusay na opsyon para magpadala ng pera pauwi',
    exchangeRates: 'Live na Exchange Rates',
    liveRates: 'Real-time na rates mula sa SGD',
    lastUpdated: 'Huling na-update',
    refresh: 'I-refresh',
    sendAmount: 'Halagang Ipapadala',
    sendAmountPlaceholder: 'Ilagay ang halaga sa SGD',
    selectDestination: 'Pumili ng Bansang Destinasyon',
    compareOptions: 'Ikumpara ang mga Opsyon sa Pagpapadala ng Pera',
    cheapestOption: 'Pinakamura na Opsyon',
    fastestOption: 'Pinakamabilis na Opsyon',
    provider: 'Provider',
    fee: 'Bayad sa Transfer',
    exchangeRate: 'Exchange Rate',
    transferTime: 'Oras ng Transfer',
    youSend: 'Ipinapadala Mo',
    recipientGets: 'Tatanggapin ng Recipient',
    totalCost: 'Kabuuang Gastos',
    rating: 'Rating',
    features: 'Mga Feature',
    selectProvider: 'Pumili ng Provider',
    currency: 'SGD',
    countries: {
      india: 'India',
      bangladesh: 'Bangladesh',
      philippines: 'Pilipinas',
      myanmar: 'Myanmar',
      thailand: 'Thailand',
      vietnam: 'Vietnam',
      indonesia: 'Indonesia',
      china: 'Tsina'
    }
  },
  my: {
    backButton: 'နောက်သို့',
    title: 'ငွေလွှဲအကူအညီ',
    subtitle: 'အိမ်သို့ငွေပို့ရန် အကောင်းဆုံးရွေးချယ်မှုများကို နှိုင်းယှဉ်ပါ',
    exchangeRates: 'တိုက်ရိုက်လဲလှယ်နှုန်းများ',
    liveRates: 'SGD မှ အချိန်နှင့်တပြေးညီ နှုန်းထားများ',
    lastUpdated: 'နောက်ဆုံးအပ်ဒိတ်',
    refresh: 'ပြန်လည်စတင်ပါ',
    sendAmount: 'ပို့မည့်ပမာဏ',
    sendAmountPlaceholder: 'SGD ဖြင့် ပမာဏထည့်ပါ',
    selectDestination: 'ဦးတည်ရာနိုင်ငံကို ရွေးချယ်ပါ',
    compareOptions: 'ငွေလွှဲရွေးချယ်မှုများကို နှိုင်းယှဉ်ပါ',
    cheapestOption: 'အစျေးအသက်သာဆုံး ရွေးချယ်မှု',
    fastestOption: 'အမြန်ဆုံး ရွေးချယ်မှု',
    provider: 'ဝန်ဆောင်မှုပေးသူ',
    fee: 'လွှဲပြောင်းခ',
    exchangeRate: 'လဲလှယ်နှုန်း',
    transferTime: 'လွှဲပြောင်းချိန်',
    youSend: 'သင်ပို့သည်',
    recipientGets: 'လက်ခံသူရရှိသည်',
    totalCost: 'စုစုပေါင်းကုန်ကျစရိတ်',
    rating: 'အဆင့်သတ်မှတ်ချက်',
    features: 'အင်္ဂါရပ်များ',
    selectProvider: 'ဝန်ဆောင်မှုပေးသူကို ရွေးချယ်ပါ',
    currency: 'SGD',
    countries: {
      india: 'အိန္ဒိယ',
      bangladesh: 'ဘင်္ဂလားဒေ့ရှ်',
      philippines: 'ဖိလစ်ပိုင်',
      myanmar: 'မြန်မာ',
      thailand: 'ထိုင်း',
      vietnam: 'ဗီယက်နမ်',
      indonesia: 'အင်ဒိုနီးရှား',
      china: 'တရုတ်'
    }
  }
};

export function RemittanceAssistancePage({ currentLang }: RemittanceAssistancePageProps) {
  const navigate = useNavigate();
  const t = remittanceTranslations[currentLang];

  const [sendAmount, setSendAmount] = useState<number>(1000);
  const [selectedCountry, setSelectedCountry] = useState<string>('india');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock exchange rates (in production, fetch from API)
  const exchangeRates: ExchangeRate[] = [
    { currency: 'INR', rate: 61.25, change: 0.15, flag: '🇮🇳' },
    { currency: 'BDT', rate: 81.50, change: -0.08, flag: '🇧🇩' },
    { currency: 'PHP', rate: 41.80, change: 0.22, flag: '🇵🇭' },
    { currency: 'MMK', rate: 1555.00, change: -0.35, flag: '🇲🇲' },
    { currency: 'THB', rate: 25.30, change: 0.10, flag: '🇹🇭' },
    { currency: 'VND', rate: 18250.00, change: 0.05, flag: '🇻🇳' },
    { currency: 'IDR', rate: 11450.00, change: -0.12, flag: '🇮🇩' },
    { currency: 'CNY', rate: 5.28, change: 0.18, flag: '🇨🇳' }
  ];

  // Mock remittance options (in production, fetch from API)
  const getRemittanceOptions = (): RemittanceOption[] => {
    const baseRate = exchangeRates.find(r => r.currency === selectedCountry.toUpperCase().slice(0, 3))?.rate || 60;
    
    return [
      {
        id: '1',
        provider: 'Wise',
        logo: '💳',
        fee: 8.50,
        exchangeRate: baseRate * 0.995,
        transferTime: '1-2 days',
        totalCost: sendAmount + 8.50,
        youReceive: (sendAmount * baseRate * 0.995),
        rating: 4.8,
        features: ['Low fees', 'Transparent pricing', 'Bank transfer']
      },
      {
        id: '2',
        provider: 'Remitly',
        logo: '🚀',
        fee: 3.99,
        exchangeRate: baseRate * 0.985,
        transferTime: 'Minutes',
        totalCost: sendAmount + 3.99,
        youReceive: (sendAmount * baseRate * 0.985),
        rating: 4.6,
        features: ['Fast delivery', 'Cash pickup', 'Mobile wallet']
      },
      {
        id: '3',
        provider: 'Western Union',
        logo: '🌐',
        fee: 12.00,
        exchangeRate: baseRate * 0.980,
        transferTime: 'Minutes',
        totalCost: sendAmount + 12.00,
        youReceive: (sendAmount * baseRate * 0.980),
        rating: 4.3,
        features: ['Global network', 'Cash pickup', '24/7 support']
      },
      {
        id: '4',
        provider: 'InstaReM',
        logo: '⚡',
        fee: 5.00,
        exchangeRate: baseRate * 0.992,
        transferTime: '1-3 days',
        totalCost: sendAmount + 5.00,
        youReceive: (sendAmount * baseRate * 0.992),
        rating: 4.5,
        features: ['Competitive rates', 'Bank transfer', 'Multi-currency']
      }
    ];
  };

  const remittanceOptions = getRemittanceOptions();
  const cheapestOption = [...remittanceOptions].sort((a, b) => b.youReceive - a.youReceive)[0];
  const fastestOption = remittanceOptions.find(o => o.transferTime === 'Minutes');

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-800 mb-6 shadow-xl">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Live Exchange Rates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{t.exchangeRates}</h2>
              <p className="text-sm text-slate-600">{t.liveRates}</p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-cyan-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {t.refresh}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {exchangeRates.map((rate) => (
              <div key={rate.currency} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{rate.flag}</span>
                  <span className="font-bold text-slate-900">{rate.currency}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {rate.rate.toFixed(2)}
                </div>
                <div className={`flex items-center gap-1 text-sm ${rate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className={`w-3 h-3 ${rate.change < 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(rate.change)}%
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-4">
            {t.lastUpdated}: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-3">
                {t.sendAmount}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                  {t.currency}
                </span>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(Number(e.target.value))}
                  placeholder={t.sendAmountPlaceholder}
                  className="w-full pl-16 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-2 focus:border-cyan-800 transition-all text-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-3">
                {t.selectDestination}
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-2 focus:border-cyan-800 transition-all text-lg"
              >
                <option value="india">{t.countries.india}</option>
                <option value="bangladesh">{t.countries.bangladesh}</option>
                <option value="philippines">{t.countries.philippines}</option>
                <option value="myanmar">{t.countries.myanmar}</option>
                <option value="thailand">{t.countries.thailand}</option>
                <option value="vietnam">{t.countries.vietnam}</option>
                <option value="indonesia">{t.countries.indonesia}</option>
                <option value="china">{t.countries.china}</option>
              </select>
            </div>
          </div>

          {/* Best Options Highlight */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-900">{t.cheapestOption}</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{cheapestOption.provider}</p>
              <p className="text-sm text-green-700">
                {t.recipientGets}: {cheapestOption.youReceive.toFixed(2)}
              </p>
            </div>

            {fastestOption && (
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-300">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-orange-900">{t.fastestOption}</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">{fastestOption.provider}</p>
                <p className="text-sm text-orange-700">
                  {t.transferTime}: {fastestOption.transferTime}
                </p>
              </div>
            )}
          </div>

          {/* Comparison Table */}
          <h3 className="text-2xl font-bold text-slate-900 mb-6">{t.compareOptions}</h3>
          <div className="space-y-4">
            {remittanceOptions.map((option) => (
              <div
                key={option.id}
                className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-slate-200 hover:border-cyan-700 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{option.logo}</span>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{option.provider}</h4>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {'⭐'.repeat(Math.floor(option.rating))}
                        <span className="text-sm text-slate-600 ml-1">{option.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-cyan-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                    {t.selectProvider}
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{t.fee}</p>
                    <p className="text-lg font-bold text-slate-900">{t.currency} {option.fee.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{t.exchangeRate}</p>
                    <p className="text-lg font-bold text-slate-900">{option.exchangeRate.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{t.transferTime}</p>
                    <p className="text-lg font-bold text-slate-900 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {option.transferTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{t.recipientGets}</p>
                    <p className="text-lg font-bold text-black">{option.youReceive.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {option.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 text-cyan-800 rounded-full text-sm font-medium flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
