import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Users, MapPin, Calendar, Clock, Loader2, UserPlus, UserMinus } from 'lucide-react';
import { LanguageCode } from '../translations';

interface GroupChatPageProps {
  currentLang: LanguageCode;
}

interface Activity {
  id: number;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  location: string;
  participants: number;
  date: string;
  time: string;
  category: Record<LanguageCode, string>;
}

interface ChatMessage {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

interface Participant {
  id: number;
  name: string;
  avatar: string;
  country: string;
}

// Native translations
const nativeTranslations: Record<LanguageCode, {
  backButton: string;
  participants: string;
  typeMessage: string;
  activityNotFound: string;
  backToActivities: string;
  loading: string;
  joinActivity: string;
  leaveActivity: string;
  youJoined: string;
  youLeft: string;
  sendMessage: string;
  activityDetails: string;
  chatRoom: string;
}> = {
  en: {
    backButton: 'Back',
    participants: 'participants',
    typeMessage: 'Type your message...',
    activityNotFound: 'Activity not found',
    backToActivities: 'Back to Activities',
    loading: 'Loading...',
    joinActivity: 'Join Activity',
    leaveActivity: 'Leave Activity',
    youJoined: 'You joined the activity',
    youLeft: 'You left the activity',
    sendMessage: 'Send',
    activityDetails: 'Activity Details',
    chatRoom: 'Chat Room'
  },
  zh: {
    backButton: '返回',
    participants: '参与者',
    typeMessage: '输入您的消息...',
    activityNotFound: '未找到活动',
    backToActivities: '返回活动',
    loading: '加载中...',
    joinActivity: '加入活动',
    leaveActivity: '离开活动',
    youJoined: '您已加入活动',
    youLeft: '您已离开活动',
    sendMessage: '发送',
    activityDetails: '活动详情',
    chatRoom: '聊天室'
  },
  ms: {
    backButton: 'Kembali',
    participants: 'peserta',
    typeMessage: 'Taip mesej anda...',
    activityNotFound: 'Aktiviti tidak dijumpai',
    backToActivities: 'Kembali ke Aktiviti',
    loading: 'Memuatkan...',
    joinActivity: 'Sertai Aktiviti',
    leaveActivity: 'Tinggalkan Aktiviti',
    youJoined: 'Anda telah menyertai aktiviti',
    youLeft: 'Anda telah meninggalkan aktiviti',
    sendMessage: 'Hantar',
    activityDetails: 'Butiran Aktiviti',
    chatRoom: 'Bilik Sembang'
  },
  ta: {
    backButton: 'பின்செல்',
    participants: 'பங்கேற்பாளர்கள்',
    typeMessage: 'உங்கள் செய்தியை தட்டச்சு செய்யவும்...',
    activityNotFound: 'செயல்பாடு கிடைக்கவில்லை',
    backToActivities: 'செயல்பாடுகளுக்குத் திரும்பு',
    loading: 'ஏற்றுகிறது...',
    joinActivity: 'செயல்பாட்டில் சேர',
    leaveActivity: 'செயல்பாட்டை விட்டு வெளியேறு',
    youJoined: 'நீங்கள் செயல்பாட்டில் சேர்ந்துள்ளீர்கள்',
    youLeft: 'நீங்கள் செயல்பாட்டை விட்டு வெளியேறிவிட்டீர்கள்',
    sendMessage: 'அனுப்பு',
    activityDetails: 'செயல்பாட்டு விவரங்கள்',
    chatRoom: 'அரட்டை அறை'
  },
  bn: {
    backButton: 'ফিরে যান',
    participants: 'অংশগ্রহণকারী',
    typeMessage: 'আপনার বার্তা টাইপ করুন...',
    activityNotFound: 'কার্যক্রম পাওয়া যায়নি',
    backToActivities: 'কার্যক্রমে ফিরে যান',
    loading: 'লোড হচ্ছে...',
    joinActivity: 'কার্যক্রমে যোগ দিন',
    leaveActivity: 'কার্যক্রম ছেড়ে দিন',
    youJoined: 'আপনি কার্যক্রমে যোগ দিয়েছেন',
    youLeft: 'আপনি কার্যক্রম ছেড়ে দিয়েছেন',
    sendMessage: 'পাঠান',
    activityDetails: 'কার্যক্রমের বিবরণ',
    chatRoom: 'চ্যাট রুম'
  },
  hi: {
    backButton: 'वापस',
    participants: 'प्रतिभागी',
    typeMessage: 'अपना संदेश टाइप करें...',
    activityNotFound: 'गतिविधि नहीं मिली',
    backToActivities: 'गतिविधियों पर वापस जाएं',
    loading: 'लोड हो रहा है...',
    joinActivity: 'गतिविधि में शामिल हों',
    leaveActivity: 'गतिविधि छोड़ें',
    youJoined: 'आप गतिविधि में शामिल हो गए',
    youLeft: 'आपने गतिविधि छोड़ दी',
    sendMessage: 'भेजें',
    activityDetails: 'गतिविधि विवरण',
    chatRoom: 'चैट रूम'
  },
  th: {
    backButton: 'กลับ',
    participants: 'ผู้เข้าร่วม',
    typeMessage: 'พิมพ์ข้อความของคุณ...',
    activityNotFound: 'ไม่พบกิจกรรม',
    backToActivities: 'กลับไปที่กิจกรรม',
    loading: 'กำลังโหลด...',
    joinActivity: 'เข้าร่วมกิจกรรม',
    leaveActivity: 'ออกจากกิจกรรม',
    youJoined: 'คุณเข้าร่วมกิจกรรมแล้ว',
    youLeft: 'คุณออกจากกิจกรรมแล้ว',
    sendMessage: 'ส่ง',
    activityDetails: 'รายละเอียดกิจกรรม',
    chatRoom: 'ห้องแชท'
  },
  vi: {
    backButton: 'Quay lại',
    participants: 'người tham gia',
    typeMessage: 'Nhập tin nhắn của bạn...',
    activityNotFound: 'Không tìm thấy hoạt động',
    backToActivities: 'Quay lại Hoạt động',
    loading: 'Đang tải...',
    joinActivity: 'Tham gia Hoạt động',
    leaveActivity: 'Rời Hoạt động',
    youJoined: 'Bạn đã tham gia hoạt động',
    youLeft: 'Bạn đã rời hoạt động',
    sendMessage: 'Gửi',
    activityDetails: 'Chi tiết Hoạt động',
    chatRoom: 'Phòng Chat'
  },
  id: {
    backButton: 'Kembali',
    participants: 'peserta',
    typeMessage: 'Ketik pesan Anda...',
    activityNotFound: 'Aktivitas tidak ditemukan',
    backToActivities: 'Kembali ke Aktivitas',
    loading: 'Memuat...',
    joinActivity: 'Bergabung dengan Aktivitas',
    leaveActivity: 'Tinggalkan Aktivitas',
    youJoined: 'Anda telah bergabung dengan aktivitas',
    youLeft: 'Anda telah meninggalkan aktivitas',
    sendMessage: 'Kirim',
    activityDetails: 'Detail Aktivitas',
    chatRoom: 'Ruang Obrolan'
  },
  tl: {
    backButton: 'Bumalik',
    participants: 'mga kalahok',
    typeMessage: 'I-type ang iyong mensahe...',
    activityNotFound: 'Hindi nahanap ang aktibidad',
    backToActivities: 'Bumalik sa Mga Aktibidad',
    loading: 'Naglo-load...',
    joinActivity: 'Sumali sa Aktibidad',
    leaveActivity: 'Umalis sa Aktibidad',
    youJoined: 'Sumali ka na sa aktibidad',
    youLeft: 'Umalis ka na sa aktibidad',
    sendMessage: 'Ipadala',
    activityDetails: 'Mga Detalye ng Aktibidad',
    chatRoom: 'Chat Room'
  },
  my: {
    backButton: 'နောက်သို့',
    participants: 'ပါဝင်သူများ',
    typeMessage: 'သင့်မက်ဆေ့ခ်ျကို ရိုက်ထည့်ပါ...',
    activityNotFound: 'လှုပ်ရှားမှုမတွေ့ပါ',
    backToActivities: 'လှုပ်ရှားမှုများသို့ ပြန်သွားပါ',
    loading: 'ဖွင့်နေသည်...',
    joinActivity: 'လှုပ်ရှားမှုတွင် ပါဝင်ပါ',
    leaveActivity: 'လှုပ်ရှားမှုမှ ထွက်ခွာပါ',
    youJoined: 'သင်သည် လှုပ်ရှားမှုတွင် ပါဝင်ပြီးပါပြီ',
    youLeft: 'သင်သည် လှုပ်ရှားမှုမှ ထွက်ခွာပြီးပါပြီ',
    sendMessage: 'ပို့ပါ',
    activityDetails: 'လှုပ်ရှားမှုအသေးစိတ်',
    chatRoom: 'စကားပြောခန်း'
  }
};

// Mock activities data matching SocialActivitiesPage
const mockActivities: Activity[] = [
  // West Region (Jurong area)
  {
    id: 1,
    title: {
      en: 'Weekend Hiking Group',
      zh: '周末徒步小组',
      ms: 'Kumpulan Mendaki Hujung Minggu',
      ta: 'வார இறுதி மலையேற்ற குழு',
      bn: 'সপ্তাহান্তে হাইকিং গ্রুপ',
      hi: 'सप्ताहांत हाइकिंग समूह',
      th: 'กลุ่มเดินป่าวันหยุดสุดสัปดาห์',
      vi: 'Nhóm Leo núi Cuối tuần',
      id: 'Kelompok Hiking Akhir Pekan',
      tl: 'Weekend Hiking Group',
      my: 'စနေ-တနင်္ဂနွေ တောင်တက်အဖွဲ့'
    },
    description: {
      en: 'Join us for a morning hike at Jurong Lake Gardens',
      zh: '加入我们在裕廊湖花园的晨间徒步',
      ms: 'Sertai kami untuk mendaki pagi di Taman Tasik Jurong',
      ta: 'ஜூரோங் ஏரி தோட்டங்களில் காலை மலையேற்றத்திற்கு எங்களுடன் சேரவும்',
      bn: 'জুরং লেক গার্ডেনে সকালের হাইকিংয়ের জন্য আমাদের সাথে যোগ দিন',
      hi: 'जुरोंग लेक गार्डन में सुबह की हाइकिंग के लिए हमसे जुड़ें',
      th: 'มาร่วมเดินป่าตอนเช้าที่สวนทะเลสาบจูรง',
      vi: 'Tham gia với chúng tôi để leo núi buổi sáng tại Vườn Hồ Jurong',
      id: 'Bergabunglah dengan kami untuk hiking pagi di Taman Danau Jurong',
      tl: 'Sumali sa amin para sa umaga hiking sa Jurong Lake Gardens',
      my: 'ဂျူရုံရေကန်ဥယျာဉ်တွင် နံနက်တောင်တက်ခြင်းအတွက် ကျွန်ုပ်တို့နှင့် ပူးပေါင်းပါ'
    },
    category: {
      en: 'Outdoor',
      zh: '户外',
      ms: 'Luar',
      ta: 'வெளிப்புறம்',
      bn: 'বহিরঙ্গন',
      hi: 'बाहरी',
      th: 'กลางแจ้ง',
      vi: 'Ngoài trời',
      id: 'Luar Ruangan',
      tl: 'Labas',
      my: 'ပြင်ပ'
    },
    date: '2024-01-20',
    time: '07:00 AM',
    location: 'Jurong Lake Gardens',
    participants: 8
  },
  {
    id: 2,
    title: {
      en: 'Badminton Meetup',
      zh: '羽毛球聚会',
      ms: 'Pertemuan Badminton',
      ta: 'பேட்மிண்டன் சந்திப்பு',
      bn: 'ব্যাডমিন্টন মিটআপ',
      hi: 'बैडमिंटन मीटअप',
      th: 'พบปะเล่นแบดมินตัน',
      vi: 'Gặp gỡ Cầu lông',
      id: 'Pertemuan Bulu Tangkis',
      tl: 'Badminton Meetup',
      my: 'ဘက်မင်တန်တွေ့ဆုံပွဲ'
    },
    description: {
      en: 'Casual badminton games, all skill levels welcome',
      zh: '休闲羽毛球比赛，欢迎所有技能水平',
      ms: 'Permainan badminton santai, semua tahap kemahiran dialu-alukan',
      ta: 'சாதாரண பேட்மிண்டன் விளையாட்டுகள், அனைத்து திறன் நிலைகளும் வரவேற்கப்படுகின்றன',
      bn: 'নৈমিত্তিক ব্যাডমিন্টন গেম, সব দক্ষতা স্তর স্বাগত',
      hi: 'आकस्मिक बैडमिंटन खेल, सभी कौशल स्तर स्वागत है',
      th: 'เกมแบดมินตันสบายๆ ทุกระดับทักษะยินดีต้อนรับ',
      vi: 'Trò chơi cầu lông thông thường, chào đón mọi trình độ',
      id: 'Permainan bulu tangkis santai, semua tingkat keterampilan diterima',
      tl: 'Casual badminton games, lahat ng antas ng kasanayan ay welcome',
      my: 'ပေါ့ပေါ့ပါးပါး ဘက်မင်တန်ဂိမ်းများ၊ ကျွမ်းကျင်မှုအဆင့်အားလုံး ကြိုဆိုပါသည်'
    },
    category: {
      en: 'Sports',
      zh: '体育',
      ms: 'Sukan',
      ta: 'விளையாட்டு',
      bn: 'ক্রীড়া',
      hi: 'खेल',
      th: 'กีฬา',
      vi: 'Thể thao',
      id: 'Olahraga',
      tl: 'Palakasan',
      my: 'အားကစား'
    },
    date: '2024-01-21',
    time: '06:00 PM',
    location: 'Jurong West Sports Hall',
    participants: 12
  },
  {
    id: 3,
    title: {
      en: 'Language Exchange Cafe',
      zh: '语言交流咖啡馆',
      ms: 'Kafe Pertukaran Bahasa',
      ta: 'மொழி பரிமாற்ற கஃபே',
      bn: 'ভাষা বিনিময় ক্যাফে',
      hi: 'भाषा विनिमय कैफे',
      th: 'คาเฟ่แลกเปลี่ยนภาษา',
      vi: 'Quán cà phê Trao đổi Ngôn ngữ',
      id: 'Kafe Pertukaran Bahasa',
      tl: 'Language Exchange Cafe',
      my: 'ဘာသာစကားဖလှယ်ရေးကဖေး'
    },
    description: {
      en: 'Practice English, Chinese, Malay and more!',
      zh: '练习英语、中文、马来语等！',
      ms: 'Berlatih Bahasa Inggeris, Cina, Melayu dan banyak lagi!',
      ta: 'ஆங்கிலம், சீனம், மலாய் மற்றும் பலவற்றை பயிற்சி செய்யுங்கள்!',
      bn: 'ইংরেজি, চীনা, মালয় এবং আরও অনেক কিছু অনুশীলন করুন!',
      hi: 'अंग्रेजी, चीनी, मलय और अधिक का अभ्यास करें!',
      th: 'ฝึกภาษาอังกฤษ จีน มาเลย์ และอื่นๆ!',
      vi: 'Thực hành tiếng Anh, Trung Quốc, Mã Lai và nhiều hơn nữa!',
      id: 'Berlatih Bahasa Inggris, Mandarin, Melayu dan lainnya!',
      tl: 'Magsanay ng Ingles, Tsino, Malay at iba pa!',
      my: 'အင်္ဂလိပ်၊ တရုတ်၊ မလေးနှင့် အခြားဘာသာစကားများကို လေ့ကျင့်ပါ!'
    },
    category: {
      en: 'Social',
      zh: '社交',
      ms: 'Sosial',
      ta: 'சமூகம்',
      bn: 'সামাজিক',
      hi: 'सामाजिक',
      th: 'สังคม',
      vi: 'Xã hội',
      id: 'Sosial',
      tl: 'Panlipunan',
      my: 'လူမှုရေး'
    },
    date: '2024-01-22',
    time: '02:00 PM',
    location: 'JCube Shopping Mall',
    participants: 15
  },
  {
    id: 4,
    title: {
      en: 'Sunday Football Match',
      zh: '周日足球比赛',
      ms: 'Perlawanan Bola Sepak Ahad',
      ta: 'ஞாயிறு கால்பந்து போட்டி',
      bn: 'রবিবার ফুটবল ম্যাচ',
      hi: 'रविवार फुटबॉल मैच',
      th: 'การแข่งขันฟุตบอลวันอาทิตย์',
      vi: 'Trận đấu Bóng đá Chủ nhật',
      id: 'Pertandingan Sepak Bola Minggu',
      tl: 'Linggo Football Match',
      my: 'တနင်္ဂနွေနေ့ ဘောလုံးပွဲ'
    },
    description: {
      en: 'Friendly football game at Jurong East Stadium',
      zh: '在裕廊东体育场的友谊足球比赛',
      ms: 'Permainan bola sepak mesra di Stadium Jurong East',
      ta: 'ஜூரோங் கிழக்கு அரங்கில் நட்பு கால்பந்து விளையாட்டு',
      bn: 'জুরং ইস্ট স্টেডিয়ামে বন্ধুত্বপূর্ণ ফুটবল খেলা',
      hi: 'जुरोंग ईस्ट स्टेडियम में मैत्रीपूर्ण फुटबॉल खेल',
      th: 'เกมฟุตบอลกันเองที่สนามกีฬาจูรงอีสต์',
      vi: 'Trận bóng đá giao hữu tại Sân vận động Jurong East',
      id: 'Pertandingan sepak bola persahabatan di Stadion Jurong East',
      tl: 'Friendly football game sa Jurong East Stadium',
      my: 'ဂျူရုံအရှေ့အားကစားကွင်းတွင် ဖော်ရွေသော ဘောလုံးပွဲ'
    },
    category: {
      en: 'Sports',
      zh: '体育',
      ms: 'Sukan',
      ta: 'விளையாட்டு',
      bn: 'ক্রীড়া',
      hi: 'खेल',
      th: 'กีฬา',
      vi: 'Thể thao',
      id: 'Olahraga',
      tl: 'Palakasan',
      my: 'အားကစား'
    },
    date: '2024-01-23',
    time: '05:00 PM',
    location: 'Jurong East Stadium',
    participants: 20
  },
  {
    id: 5,
    title: {
      en: 'Photography Walk',
      zh: '摄影漫步',
      ms: 'Jalan Fotografi',
      ta: 'புகைப்பட நடை',
      bn: 'ফটোগ্রাফি ওয়াক',
      hi: 'फोटोग्राफी वॉक',
      th: 'เดินถ่ายภาพ',
      vi: 'Đi bộ Chụp ảnh',
      id: 'Jalan Fotografi',
      tl: 'Photography Walk',
      my: 'ဓာတ်ပုံရိုက်ခြင်းလမ်းလျှောက်ခြင်း'
    },
    description: {
      en: 'Explore and capture Jurong\'s nature and architecture',
      zh: '探索和捕捉裕廊的自然和建筑',
      ms: 'Terokai dan tangkap alam semula jadi dan seni bina Jurong',
      ta: 'ஜூரோங்கின் இயற்கை மற்றும் கட்டிடக்கலையை ஆராய்ந்து படம்பிடியுங்கள்',
      bn: 'জুরংয়ের প্রকৃতি এবং স্থাপত্য অন্বেষণ এবং ক্যাপচার করুন',
      hi: 'जुरोंग की प्रकृति और वास्तुकला का अन्वेषण और कैप्चर करें',
      th: 'สำรวจและจับภาพธรรมชาติและสถาปัตยกรรมของจูรง',
      vi: 'Khám phá và chụp lại thiên nhiên và kiến trúc của Jurong',
      id: 'Jelajahi dan tangkap alam dan arsitektur Jurong',
      tl: 'Tuklasin at kunan ang kalikasan at arkitektura ng Jurong',
      my: 'ဂျူရုံ၏ သဘာဝနှင့် ဗိသုကာလက်ရာများကို စူးစမ်းပြီး ဖမ်းယူပါ'
    },
    category: {
      en: 'Arts',
      zh: '艺术',
      ms: 'Seni',
      ta: 'கலை',
      bn: 'শিল্প',
      hi: 'कला',
      th: 'ศิลปะ',
      vi: 'Nghệ thuật',
      id: 'Seni',
      tl: 'Sining',
      my: 'အနုပညာ'
    },
    date: '2024-01-24',
    time: '10:00 AM',
    location: 'Chinese Garden',
    participants: 6
  },
  // Central Region
  {
    id: 6,
    title: {
      en: 'Board Games Night',
      zh: '桌游之夜',
      ms: 'Malam Permainan Papan',
      ta: 'பலகை விளையாட்டு இரவு',
      bn: 'বোর্ড গেমস নাইট',
      hi: 'बोर्ड गेम्स नाइट',
      th: 'คืนเกมกระดาน',
      vi: 'Đêm Trò chơi Bàn',
      id: 'Malam Permainan Papan',
      tl: 'Board Games Night',
      my: 'ဘုတ်ဂိမ်းညနေ'
    },
    description: {
      en: 'Fun board games and card games evening',
      zh: '有趣的桌游和纸牌游戏之夜',
      ms: 'Permainan papan dan kad yang menyeronokkan',
      ta: 'வேடிக்கையான பலகை விளையாட்டுகள் மற்றும் அட்டை விளையாட்டுகள்',
      bn: 'মজার বোর্ড গেম এবং কার্ড গেম সন্ধ্যা',
      hi: 'मजेदार बोर्ड गेम और कार्ड गेम शाम',
      th: 'เกมกระดานและเกมไพ่สนุกๆ',
      vi: 'Buổi tối chơi trò chơi bàn và bài vui vẻ',
      id: 'Permainan papan dan kartu yang menyenangkan',
      tl: 'Masayang board games at card games',
      my: 'ပျော်ရွှင်ဖွယ် ဘုတ်ဂိမ်းနှင့် ကတ်ဂိမ်းညနေ'
    },
    category: {
      en: 'Social',
      zh: '社交',
      ms: 'Sosial',
      ta: 'சமூகம்',
      bn: 'সামাজিক',
      hi: 'सामाजिक',
      th: 'สังคม',
      vi: 'Xã hội',
      id: 'Sosial',
      tl: 'Panlipunan',
      my: 'လူမှုရေး'
    },
    date: '2024-01-25',
    time: '07:30 PM',
    location: 'Orchard Central',
    participants: 10
  },
  {
    id: 7,
    title: {
      en: 'Yoga in the Park',
      zh: '公园瑜伽',
      ms: 'Yoga di Taman',
      ta: 'பூங்காவில் யோகா',
      bn: 'পার্কে যোগ',
      hi: 'पार्क में योग',
      th: 'โยคะในสวน',
      vi: 'Yoga trong Công viên',
      id: 'Yoga di Taman',
      tl: 'Yoga sa Parke',
      my: 'ပန်းခြံတွင် ယောဂ'
    },
    description: {
      en: 'Relaxing outdoor yoga session for all levels',
      zh: '适合所有级别的轻松户外瑜伽课程',
      ms: 'Sesi yoga luar yang santai untuk semua peringkat',
      ta: 'அனைத்து நிலைகளுக்கும் ஓய்வெடுக்கும் வெளிப்புற யோகா அமர்வு',
      bn: 'সব স্তরের জন্য শিথিল বহিরঙ্গন যোগ সেশন',
      hi: 'सभी स्तरों के लिए आरामदायक बाहरी योग सत्र',
      th: 'เซสชันโยคะกลางแจ้งผ่อนคลายสำหรับทุกระดับ',
      vi: 'Buổi yoga ngoài trời thư giãn cho mọi cấp độ',
      id: 'Sesi yoga luar ruangan yang santai untuk semua tingkat',
      tl: 'Relaxing outdoor yoga session para sa lahat ng antas',
      my: 'အဆင့်အားလုံးအတွက် အပြင်ယောဂအပန်းဖြေခြင်း'
    },
    category: {
      en: 'Outdoor',
      zh: '户外',
      ms: 'Luar',
      ta: 'வெளிப்புறம்',
      bn: 'বহিরঙ্গন',
      hi: 'बाहरी',
      th: 'กลางแจ้ง',
      vi: 'Ngoài trời',
      id: 'Luar Ruangan',
      tl: 'Labas',
      my: 'ပြင်ပ'
    },
    date: '2024-01-26',
    time: '08:00 AM',
    location: 'Fort Canning Park',
    participants: 12
  },
  {
    id: 8,
    title: {
      en: 'Cooking Class',
      zh: '烹饪课',
      ms: 'Kelas Memasak',
      ta: 'சமையல் வகுப்பு',
      bn: 'রান্নার ক্লাস',
      hi: 'खाना पकाने की कक्षा',
      th: 'คลาสทำอาหาร',
      vi: 'Lớp Nấu ăn',
      id: 'Kelas Memasak',
      tl: 'Cooking Class',
      my: 'ချက်ပြုတ်ခြင်းအတန်း'
    },
    description: {
      en: 'Learn to cook traditional Asian dishes',
      zh: '学习烹饪传统亚洲菜肴',
      ms: 'Belajar memasak hidangan Asia tradisional',
      ta: 'பாரம்பரிய ஆசிய உணவுகளை சமைக்க கற்றுக்கொள்ளுங்கள்',
      bn: 'ঐতিহ্যবাহী এশিয়ান খাবার রান্না করতে শিখুন',
      hi: 'पारंपरिक एशियाई व्यंजन बनाना सीखें',
      th: 'เรียนรู้การทำอาหารเอเชียแบบดั้งเดิม',
      vi: 'Học nấu các món ăn châu Á truyền thống',
      id: 'Belajar memasak hidangan Asia tradisional',
      tl: 'Matuto magluto ng tradisyonal na Asian dishes',
      my: 'ရိုးရာအာရှအစားအစာများ ချက်ပြုတ်ရန် လေ့လာပါ'
    },
    category: {
      en: 'Learning',
      zh: '学习',
      ms: 'Pembelajaran',
      ta: 'கற்றல்',
      bn: 'শেখা',
      hi: 'सीखना',
      th: 'การเรียนรู้',
      vi: 'Học tập',
      id: 'Pembelajaran',
      tl: 'Pag-aaral',
      my: 'သင်ယူခြင်း'
    },
    date: '2024-01-27',
    time: '11:00 AM',
    location: 'Chinatown Complex',
    participants: 8
  },
  // East Region
  {
    id: 9,
    title: {
      en: 'Beach Volleyball',
      zh: '沙滩排球',
      ms: 'Bola Tampar Pantai',
      ta: 'கடற்கரை வாலிபால்',
      bn: 'বিচ ভলিবল',
      hi: 'बीच वॉलीबॉल',
      th: 'วอลเลย์บอลชายหาด',
      vi: 'Bóng chuyền Bãi biển',
      id: 'Voli Pantai',
      tl: 'Beach Volleyball',
      my: 'ကမ်းခြေဘော်လီဘော'
    },
    description: {
      en: 'Fun beach volleyball games at East Coast',
      zh: '在东海岸的有趣沙滩排球比赛',
      ms: 'Permainan bola tampar pantai yang menyeronokkan di East Coast',
      ta: 'கிழக்கு கடற்கரையில் வேடிக்கையான கடற்கரை வாலிபால் விளையாட்டுகள்',
      bn: 'ইস্ট কোস্টে মজার বিচ ভলিবল গেম',
      hi: 'ईस्ट कोस्ट पर मजेदार बीच वॉलीबॉल खेल',
      th: 'เกมวอลเลย์บอลชายหาดสนุกๆ ที่อีสต์โคสต์',
      vi: 'Trò chơi bóng chuyền bãi biển vui vẻ tại East Coast',
      id: 'Permainan voli pantai yang menyenangkan di East Coast',
      tl: 'Masayang beach volleyball games sa East Coast',
      my: 'အရှေ့ကမ်းခြေတွင် ပျော်ရွှင်ဖွယ် ကမ်းခြေဘော်လီဘောဂိမ်းများ'
    },
    category: {
      en: 'Sports',
      zh: '体育',
      ms: 'Sukan',
      ta: 'விளையாட்டு',
      bn: 'ক্রীড়া',
      hi: 'खेल',
      th: 'กีฬา',
      vi: 'Thể thao',
      id: 'Olahraga',
      tl: 'Palakasan',
      my: 'အားကစား'
    },
    date: '2024-01-28',
    time: '05:00 PM',
    location: 'East Coast Park',
    participants: 16
  },
  {
    id: 10,
    title: {
      en: 'Cycling Group Ride',
      zh: '骑行团队',
      ms: 'Kumpulan Berbasikal',
      ta: 'சைக்கிள் குழு சவாரி',
      bn: 'সাইক্লিং গ্রুপ রাইড',
      hi: 'साइकिलिंग ग्रुप राइड',
      th: 'กลุ่มปั่นจักรยาน',
      vi: 'Nhóm Đạp xe',
      id: 'Kelompok Bersepeda',
      tl: 'Cycling Group Ride',
      my: 'စက်ဘီးစီးအဖွဲ့'
    },
    description: {
      en: 'Leisurely cycling along East Coast Park',
      zh: '沿着东海岸公园悠闲骑行',
      ms: 'Berbasikal santai di sepanjang East Coast Park',
      ta: 'கிழக்கு கடற்கரை பூங்காவில் நிதானமாக சைக்கிள் ஓட்டுதல்',
      bn: 'ইস্ট কোস্ট পার্ক বরাবর অবসরে সাইক্লিং',
      hi: 'ईस्ट कोस्ट पार्क के साथ आराम से साइकिलिंग',
      th: 'ปั่นจักรยานสบายๆ ตามอีสต์โคสต์พาร์ค',
      vi: 'Đạp xe nhàn nhã dọc theo Công viên East Coast',
      id: 'Bersepeda santai di sepanjang East Coast Park',
      tl: 'Leisurely cycling sa East Coast Park',
      my: 'အရှေ့ကမ်းခြေပန်းခြံတစ်လျှောက် အေးဆေးစက်ဘီးစီးခြင်း'
    },
    category: {
      en: 'Outdoor',
      zh: '户外',
      ms: 'Luar',
      ta: 'வெளிப்புறம்',
      bn: 'বহিরঙ্গন',
      hi: 'बाहरी',
      th: 'กลางแจ้ง',
      vi: 'Ngoài trời',
      id: 'Luar Ruangan',
      tl: 'Labas',
      my: 'ပြင်ပ'
    },
    date: '2024-01-29',
    time: '06:30 AM',
    location: 'East Coast Park Connector',
    participants: 14
  },
  {
    id: 11,
    title: {
      en: 'Fishing Buddies',
      zh: '钓鱼伙伴',
      ms: 'Rakan Memancing',
      ta: 'மீன்பிடி நண்பர்கள்',
      bn: 'মাছ ধরার বন্ধুরা',
      hi: 'मछली पकड़ने के दोस्त',
      th: 'เพื่อนตกปลา',
      vi: 'Bạn Câu cá',
      id: 'Teman Memancing',
      tl: 'Fishing Buddies',
      my: 'ငါးမျှားသူငယ်ချင်းများ'
    },
    description: {
      en: 'Relaxing fishing session at Bedok Jetty',
      zh: '在勿洛码头的轻松钓鱼活动',
      ms: 'Sesi memancing yang santai di Jeti Bedok',
      ta: 'பெடோக் ஜெட்டியில் ஓய்வெடுக்கும் மீன்பிடி அமர்வு',
      bn: 'বেডক জেটিতে শিথিল মাছ ধরার সেশন',
      hi: 'बेडोक जेट्टी पर आरामदायक मछली पकड़ने का सत्र',
      th: 'เซสชันตกปลาผ่อนคลายที่ท่าเรือเบดอก',
      vi: 'Buổi câu cá thư giãn tại Cầu tàu Bedok',
      id: 'Sesi memancing santai di Dermaga Bedok',
      tl: 'Relaxing fishing session sa Bedok Jetty',
      my: 'ဘီဒေါ့ဆိပ်ကမ်းတွင် အပန်းဖြေငါးမျှားခြင်း'
    },
    category: {
      en: 'Outdoor',
      zh: '户外',
      ms: 'Luar',
      ta: 'வெளிப்புறம்',
      bn: 'বহিরঙ্গন',
      hi: 'बाहरी',
      th: 'กลางแจ้ง',
      vi: 'Ngoài trời',
      id: 'Luar Ruangan',
      tl: 'Labas',
      my: 'ပြင်ပ'
    },
    date: '2024-01-30',
    time: '06:00 AM',
    location: 'Bedok Jetty',
    participants: 7
  },
  // North Region
  {
    id: 12,
    title: {
      en: 'Nature Walk',
      zh: '自然漫步',
      ms: 'Jalan Alam Semula Jadi',
      ta: 'இயற்கை நடை',
      bn: 'প্রকৃতি হাঁটা',
      hi: 'प्रकृति चलना',
      th: 'เดินชมธรรมชาติ',
      vi: 'Đi bộ Thiên nhiên',
      id: 'Jalan Alam',
      tl: 'Nature Walk',
      my: 'သဘာဝလမ်းလျှောက်ခြင်း'
    },
    description: {
      en: 'Explore the beauty of Woodlands Waterfront',
      zh: '探索兀兰海滨的美丽',
      ms: 'Terokai keindahan Tepi Laut Woodlands',
      ta: 'வூட்லாண்ட்ஸ் நீர்முனையின் அழகை ஆராயுங்கள்',
      bn: 'উডল্যান্ডস ওয়াটারফ্রন্টের সৌন্দর্য অন্বেষণ করুন',
      hi: 'वुडलैंड्स वाटरफ्रंट की सुंदरता का अन्वेषण करें',
      th: 'สำรวจความงามของวูดแลนด์วอเตอร์ฟรอนต์',
      vi: 'Khám phá vẻ đẹp của Bờ sông Woodlands',
      id: 'Jelajahi keindahan Tepi Air Woodlands',
      tl: 'Tuklasin ang kagandahan ng Woodlands Waterfront',
      my: 'ဝူးလန်းရေကမ်းခြေ၏ အလှတရားကို စူးစမ်းပါ'
    },
    category: {
      en: 'Outdoor',
      zh: '户外',
      ms: 'Luar',
      ta: 'வெளிப்புறம்',
      bn: 'বহিরঙ্গন',
      hi: 'बाहरी',
      th: 'กลางแจ้ง',
      vi: 'Ngoài trời',
      id: 'Luar Ruangan',
      tl: 'Labas',
      my: 'ပြင်ပ'
    },
    date: '2024-01-31',
    time: '09:00 AM',
    location: 'Woodlands Waterfront Park',
    participants: 9
  },
  {
    id: 13,
    title: {
      en: 'Basketball Pickup Game',
      zh: '篮球友谊赛',
      ms: 'Permainan Bola Keranjang',
      ta: 'கூடைப்பந்து விளையாட்டு',
      bn: 'বাস্কেটবল পিকআপ গেম',
      hi: 'बास्केटबॉल पिकअप गेम',
      th: 'เกมบาสเกตบอล',
      vi: 'Trận Bóng rổ',
      id: 'Permainan Basket',
      tl: 'Basketball Pickup Game',
      my: 'ဘတ်စကတ်ဘောဂိမ်း'
    },
    description: {
      en: 'Casual basketball games, all welcome',
      zh: '休闲篮球比赛，欢迎所有人',
      ms: 'Permainan bola keranjang santai, semua dialu-alukan',
      ta: 'சாதாரண கூடைப்பந்து விளையாட்டுகள், அனைவரும் வரவேற்கப்படுகிறார்கள்',
      bn: 'নৈমিত্তিক বাস্কেটবল গেম, সবাই স্বাগত',
      hi: 'आकस्मिक बास्केटबॉल खेल, सभी का स्वागत है',
      th: 'เกมบาสเกตบอลสบายๆ ทุกคนยินดีต้อนรับ',
      vi: 'Trò chơi bóng rổ thông thường, chào đón tất cả',
      id: 'Permainan basket santai, semua diterima',
      tl: 'Casual basketball games, lahat ay welcome',
      my: 'ပေါ့ပေါ့ပါးပါး ဘတ်စကတ်ဘောဂိမ်းများ၊ အားလုံးကြိုဆိုပါသည်'
    },
    category: {
      en: 'Sports',
      zh: '体育',
      ms: 'Sukan',
      ta: 'விளையாட்டு',
      bn: 'ক্রীড়া',
      hi: 'खेल',
      th: 'กีฬา',
      vi: 'Thể thao',
      id: 'Olahraga',
      tl: 'Palakasan',
      my: 'အားကစား'
    },
    date: '2024-02-01',
    time: '07:00 PM',
    location: 'Yishun Sports Hall',
    participants: 18
  },
  {
    id: 14,
    title: {
      en: 'Art Jamming Session',
      zh: '艺术创作会',
      ms: 'Sesi Seni Jamming',
      ta: 'கலை ஜாமிங் அமர்வு',
      bn: 'আর্ট জ্যামিং সেশন',
      hi: 'आर्ट जैमिंग सत्र',
      th: 'เซสชันอาร์ตแจมมิ่ง',
      vi: 'Buổi Vẽ Nghệ thuật',
      id: 'Sesi Seni Jamming',
      tl: 'Art Jamming Session',
      my: 'အနုပညာဂျမ်းမင်းအစည်းအဝေး'
    },
    description: {
      en: 'Creative painting session for all skill levels',
      zh: '适合所有技能水平的创意绘画课程',
      ms: 'Sesi lukisan kreatif untuk semua peringkat kemahiran',
      ta: 'அனைத்து திறன் நிலைகளுக்கும் படைப்பாற்றல் ஓவிய அமர்வு',
      bn: 'সব দক্ষতা স্তরের জন্য সৃজনশীল পেইন্টিং সেশন',
      hi: 'सभी कौशल स्तरों के लिए रचनात्मक पेंटिंग सत्र',
      th: 'เซสชันวาดภาพสร้างสรรค์สำหรับทุกระดับทักษะ',
      vi: 'Buổi vẽ sáng tạo cho mọi trình độ',
      id: 'Sesi melukis kreatif untuk semua tingkat keterampilan',
      tl: 'Creative painting session para sa lahat ng antas ng kasanayan',
      my: 'ကျွမ်းကျင်မှုအဆင့်အားလုံးအတွက် ဖန်တီးမှုပန်းချီဆွဲခြင်းအစည်းအဝေး'
    },
    category: {
      en: 'Arts',
      zh: '艺术',
      ms: 'Seni',
      ta: 'கலை',
      bn: 'শিল্প',
      hi: 'कला',
      th: 'ศิลปะ',
      vi: 'Nghệ thuật',
      id: 'Seni',
      tl: 'Sining',
      my: 'အနုပညာ'
    },
    date: '2024-02-02',
    time: '02:00 PM',
    location: 'Sembawang Shopping Centre',
    participants: 10
  },
  // Northeast Region
  {
    id: 15,
    title: {
      en: 'Running Club',
      zh: '跑步俱乐部',
      ms: 'Kelab Berlari',
      ta: 'ஓட்டம் கிளப்',
      bn: 'রানিং ক্লাব',
      hi: 'रनिंग क्लब',
      th: 'คลับวิ่ง',
      vi: 'Câu lạc bộ Chạy bộ',
      id: 'Klub Lari',
      tl: 'Running Club',
      my: 'ပြေးခြင်းကလပ်'
    },
    description: {
      en: 'Morning run around Punggol Waterway',
      zh: '在榜鹅水道周围晨跑',
      ms: 'Larian pagi di sekitar Laluan Air Punggol',
      ta: 'புங்கோல் நீர்வழியைச் சுற்றி காலை ஓட்டம்',
      bn: 'পুংগোল ওয়াটারওয়ের চারপাশে সকালের দৌড়',
      hi: 'पुंगोल वाटरवे के आसपास सुबह की दौड़',
      th: 'วิ่งตอนเช้ารอบทางน้ำพุงโกล',
      vi: 'Chạy buổi sáng quanh Đường thủy Punggol',
      id: 'Lari pagi di sekitar Jalur Air Punggol',
      tl: 'Umaga takbo sa paligid ng Punggol Waterway',
      my: 'ပန်ဂိုးရေလမ်းတစ်ဝိုက် နံနက်ပြေးခြင်း'
    },
    category: {
      en: 'Sports',
      zh: '体育',
      ms: 'Sukan',
      ta: 'விளையாட்டு',
      bn: 'ক্রীড়া',
      hi: 'खेल',
      th: 'กีฬา',
      vi: 'Thể thao',
      id: 'Olahraga',
      tl: 'Palakasan',
      my: 'အားကစား'
    },
    date: '2024-02-03',
    time: '06:00 AM',
    location: 'Punggol Waterway Park',
    participants: 15
  },
  {
    id: 16,
    title: {
      en: 'Kayaking Adventure',
      zh: '皮划艇冒险',
      ms: 'Pengembaraan Kayak',
      ta: 'கயாக்கிங் சாகசம்',
      bn: 'কায়াকিং অ্যাডভেঞ্চার',
      hi: 'कयाकिंग एडवेंचर',
      th: 'การผจญภัยพายเรือคายัค',
      vi: 'Phiêu lưu Chèo thuyền Kayak',
      id: 'Petualangan Kayak',
      tl: 'Kayaking Adventure',
      my: 'ကယက်လှေလှော်ခြင်းစွန့်စားခန်း'
    },
    description: {
      en: 'Kayaking session at Punggol Waterway',
      zh: '在榜鹅水道的皮划艇活动',
      ms: 'Sesi kayak di Laluan Air Punggol',
      ta: 'புங்கோல் நீர்வழியில் கயாக்கிங் அமர்வு',
      bn: 'পুংগোল ওয়াটারওয়েতে কায়াকিং সেশন',
      hi: 'पुंगोल वाटरवे पर कयाकिंग सत्र',
      th: 'เซสชันพายเรือคายัคที่ทางน้ำพุงโกล',
      vi: 'Buổi chèo thuyền kayak tại Đường thủy Punggol',
      id: 'Sesi kayak di Jalur Air Punggol',
      tl: 'Kayaking session sa Punggol Waterway',
      my: 'ပန်ဂိုးရေလမ်းတွင် ကယက်လှေလှော်ခြင်းအစည်းအဝေး'
    },
    category: {
      en: 'Outdoor',
      zh: '户外',
      ms: 'Luar',
      ta: 'வெளிப்புறம்',
      bn: 'বহিরঙ্গন',
      hi: 'बाहरी',
      th: 'กลางแจ้ง',
      vi: 'Ngoài trời',
      id: 'Luar Ruangan',
      tl: 'Labas',
      my: 'ပြင်ပ'
    },
    date: '2024-02-04',
    time: '10:00 AM',
    location: 'Punggol Point Park',
    participants: 12
  },
  {
    id: 17,
    title: {
      en: 'Movie Night',
      zh: '电影之夜',
      ms: 'Malam Filem',
      ta: 'திரைப்பட இரவு',
      bn: 'মুভি নাইট',
      hi: 'मूवी नाइट',
      th: 'คืนภาพยนตร์',
      vi: 'Đêm Phim',
      id: 'Malam Film',
      tl: 'Movie Night',
      my: 'ရုပ်ရှင်ညနေ'
    },
    description: {
      en: 'Watch latest movies together and discuss',
      zh: '一起观看最新电影并讨论',
      ms: 'Tonton filem terkini bersama dan berbincang',
      ta: 'சமீபத்திய திரைப்படங்களை ஒன்றாகப் பார்த்து விவாதிக்கவும்',
      bn: 'একসাথে সর্বশেষ মুভি দেখুন এবং আলোচনা করুন',
      hi: 'नवीनतम फिल्में एक साथ देखें और चर्चा करें',
      th: 'ดูภาพยนตร์ล่าสุดด้วยกันและพูดคุย',
      vi: 'Xem phim mới nhất cùng nhau và thảo luận',
      id: 'Tonton film terbaru bersama dan diskusikan',
      tl: 'Manood ng pinakabagong mga pelikula at pag-usapan',
      my: 'နောက်ဆုံးရုပ်ရှင်များကို အတူတကွကြည့်ပြီး ဆွေးနွေးပါ'
    },
    category: {
      en: 'Social',
      zh: '社交',
      ms: 'Sosial',
      ta: 'சமூகம்',
      bn: 'সামাজিক',
      hi: 'सामाजिक',
      th: 'สังคม',
      vi: 'Xã hội',
      id: 'Sosial',
      tl: 'Panlipunan',
      my: 'လူမှုရေး'
    },
    date: '2024-02-05',
    time: '07:00 PM',
    location: 'Sengkang Grand Mall',
    participants: 14
  },
  // Marina Bay Area
  {
    id: 18,
    title: {
      en: 'Photography Meetup',
      zh: '摄影聚会',
      ms: 'Pertemuan Fotografi',
      ta: 'புகைப்பட சந்திப்பு',
      bn: 'ফটোগ্রাফি মিটআপ',
      hi: 'फोटोग्राफी मीटअप',
      th: 'พบปะถ่ายภาพ',
      vi: 'Gặp gỡ Nhiếp ảnh',
      id: 'Pertemuan Fotografi',
      tl: 'Photography Meetup',
      my: 'ဓာတ်ပုံရိုက်ခြင်းတွေ့ဆုံပွဲ'
    },
    description: {
      en: 'Capture stunning Marina Bay skyline',
      zh: '捕捉令人惊叹的滨海湾天际线',
      ms: 'Tangkap pemandangan Marina Bay yang menakjubkan',
      ta: 'அற்புதமான மரினா பே வானளாவியைப் படம்பிடியுங்கள்',
      bn: 'অত্যাশ্চর্য মেরিনা বে স্কাইলাইন ক্যাপচার করুন',
      hi: 'शानदार मरीना बे स्काईलाइन को कैप्चर करें',
      th: 'จับภาพสกายไลน์มารีน่าเบย์ที่สวยงาม',
      vi: 'Chụp đường chân trời Marina Bay tuyệt đẹp',
      id: 'Tangkap cakrawala Marina Bay yang menakjubkan',
      tl: 'Kunan ang kahanga-hangang Marina Bay skyline',
      my: 'အံ့သြဖွယ် မာရီနာဘေးကောင်းကင်မျဉ်းကို ဖမ်းယူပါ'
    },
    category: {
      en: 'Arts',
      zh: '艺术',
      ms: 'Seni',
      ta: 'கலை',
      bn: 'শিল্প',
      hi: 'कला',
      th: 'ศิลปะ',
      vi: 'Nghệ thuật',
      id: 'Seni',
      tl: 'Sining',
      my: 'အနုပညာ'
    },
    date: '2024-02-06',
    time: '06:30 PM',
    location: 'Marina Bay Sands',
    participants: 11
  },
  {
    id: 19,
    title: {
      en: 'Jogging Group',
      zh: '慢跑小组',
      ms: 'Kumpulan Jogging',
      ta: 'ஜாகிங் குழு',
      bn: 'জগিং গ্রুপ',
      hi: 'जॉगिंग समूह',
      th: 'กลุ่มจ๊อกกิ้ง',
      vi: 'Nhóm Chạy bộ',
      id: 'Kelompok Jogging',
      tl: 'Jogging Group',
      my: 'ပြေးခြင်းအဖွဲ့'
    },
    description: {
      en: 'Evening jog around Marina Bay',
      zh: '在滨海湾周围的晚间慢跑',
      ms: 'Jogging petang di sekitar Marina Bay',
      ta: 'மரினா பேவைச் சுற்றி மாலை ஜாகிங்',
      bn: 'মেরিনা বে এর চারপাশে সন্ধ্যার জগিং',
      hi: 'मरीना बे के आसपास शाम की जॉगिंग',
      th: 'จ๊อกกิ้งตอนเย็นรอบมารีน่าเบย์',
      vi: 'Chạy bộ buổi tối quanh Marina Bay',
      id: 'Jogging sore di sekitar Marina Bay',
      tl: 'Gabi jogging sa paligid ng Marina Bay',
      my: 'မာရီနာဘေးတစ်ဝိုက် ညနေပြေးခြင်း'
    },
    category: {
      en: 'Sports',
      zh: '体育',
      ms: 'Sukan',
      ta: 'விளையாட்டு',
      bn: 'ক্রীড়া',
      hi: 'खेल',
      th: 'กีฬา',
      vi: 'Thể thao',
      id: 'Olahraga',
      tl: 'Palakasan',
      my: 'အားကစား'
    },
    date: '2024-02-07',
    time: '07:00 PM',
    location: 'Marina Bay Waterfront',
    participants: 13
  },
  // Sentosa
  {
    id: 20,
    title: {
      en: 'Beach Cleanup',
      zh: '海滩清洁',
      ms: 'Pembersihan Pantai',
      ta: 'கடற்கரை சுத்தம்',
      bn: 'বিচ ক্লিনআপ',
      hi: 'बीच सफाई',
      th: 'ทำความสะอาดชายหาด',
      vi: 'Dọn dẹp Bãi biển',
      id: 'Pembersihan Pantai',
      tl: 'Beach Cleanup',
      my: 'ကမ်းခြေသန့်ရှင်းရေး'
    },
    description: {
      en: 'Help keep our beaches clean!',
      zh: '帮助保持我们的海滩清洁！',
      ms: 'Bantu menjaga pantai kita bersih!',
      ta: 'எங்கள் கடற்கரைகளை சுத்தமாக வைக்க உதவுங்கள்!',
      bn: 'আমাদের সৈকত পরিষ্কার রাখতে সাহায্য করুন!',
      hi: 'हमारे समुद्र तटों को साफ रखने में मदद करें!',
      th: 'ช่วยรักษาชายหาดของเราให้สะอาด!',
      vi: 'Giúp giữ bãi biển của chúng ta sạch sẽ!',
      id: 'Bantu menjaga pantai kita tetap bersih!',
      tl: 'Tumulong na panatilihing malinis ang ating mga beach!',
      my: 'ကျွန်ုပ်တို့၏ကမ်းခြေများကို သန့်ရှင်းစေရန် ကူညီပါ!'
    },
    category: {
      en: 'Outdoor',
      zh: '户外',
      ms: 'Luar',
      ta: 'வெளிப்புறம்',
      bn: 'বহিরঙ্গন',
      hi: 'बाहरी',
      th: 'กลางแจ้ง',
      vi: 'Ngoài trời',
      id: 'Luar Ruangan',
      tl: 'Labas',
      my: 'ပြင်ပ'
    },
    date: '2024-02-08',
    time: '09:00 AM',
    location: 'Siloso Beach',
    participants: 20
  }
];

// Mock participants data
const mockParticipants: Participant[] = [
  { id: 1, name: 'Ahmad Rahman', avatar: 'https://i.pravatar.cc/150?img=12', country: '🇲🇾' },
  { id: 2, name: 'Wei Chen', avatar: 'https://i.pravatar.cc/150?img=33', country: '🇨🇳' },
  { id: 3, name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?img=45', country: '🇮🇳' },
  { id: 4, name: 'Nguyen Tran', avatar: 'https://i.pravatar.cc/150?img=56', country: '🇻🇳' },
  { id: 5, name: 'Siti Nurhaliza', avatar: 'https://i.pravatar.cc/150?img=23', country: '🇲🇾' },
  { id: 6, name: 'Raj Kumar', avatar: 'https://i.pravatar.cc/150?img=67', country: '🇮🇳' },
];

// Mock chat messages
const mockMessages: ChatMessage[] = [
  {
    id: 1,
    userId: 1,
    userName: 'Ahmad Rahman',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    message: 'Looking forward to this activity! 😊',
    timestamp: '10:30 AM'
  },
  {
    id: 2,
    userId: 2,
    userName: 'Wei Chen',
    userAvatar: 'https://i.pravatar.cc/150?img=33',
    message: 'Me too! What should we bring?',
    timestamp: '10:32 AM'
  },
  {
    id: 3,
    userId: 3,
    userName: 'Priya Sharma',
    userAvatar: 'https://i.pravatar.cc/150?img=45',
    message: 'I suggest bringing water and comfortable shoes',
    timestamp: '10:35 AM'
  }
];

export function GroupChatPage({ currentLang }: GroupChatPageProps) {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const t = nativeTranslations[currentLang];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [participants] = useState<Participant[]>(mockParticipants);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    // Simulate loading activity data
    const timer = setTimeout(() => {
      const foundActivity = mockActivities.find(a => a.id === Number(activityId));
      setActivity(foundActivity || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activityId]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: messages.length + 1,
      userId: 999,
      userName: 'You',
      userAvatar: 'https://i.pravatar.cc/150?img=68',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleJoinActivity = () => {
    setHasJoined(true);
    const joinMessage: ChatMessage = {
      id: messages.length + 1,
      userId: 999,
      userName: 'System',
      userAvatar: '',
      message: t.youJoined,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, joinMessage]);
  };

  const handleLeaveActivity = () => {
    setHasJoined(false);
    const leaveMessage: ChatMessage = {
      id: messages.length + 1,
      userId: 999,
      userName: 'System',
      userAvatar: '',
      message: t.youLeft,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, leaveMessage]);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.activityNotFound}</h2>
            <p className="text-slate-600 mb-6">The activity you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/activities')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              {t.backToActivities}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/activities')}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              {t.backButton}
            </button>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900">{activity.title[currentLang]}</h1>
              <p className="text-xs text-slate-600">{activity.category[currentLang]}</p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-xl">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-900">{activity.participants}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Activity Details Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto hidden lg:block">
          <div className="p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              {t.activityDetails}
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-1">Description</p>
                <p className="text-sm text-slate-600">{activity.description[currentLang]}</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span>{activity.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>{activity.date}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>{activity.time}</span>
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-700 mb-3">Participants ({participants.length})</p>
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{participant.name}</p>
                      </div>
                      <span className="text-lg">{participant.country}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                {!hasJoined ? (
                  <button
                    onClick={handleJoinActivity}
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    {t.joinActivity}
                  </button>
                ) : (
                  <button
                    onClick={handleLeaveActivity}
                    className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <UserMinus className="w-5 h-5" />
                    {t.leaveActivity}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              {t.chatRoom}
            </h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}
              >
                {message.userAvatar && (
                  <img
                    src={message.userAvatar}
                    alt={message.userName}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                )}
                <div className={`flex-1 ${message.isCurrentUser ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`text-sm font-semibold text-slate-900 ${message.isCurrentUser ? 'order-2' : ''}`}>
                      {message.userName}
                    </p>
                    <span className={`text-xs text-slate-500 ${message.isCurrentUser ? 'order-1' : ''}`}>
                      {message.timestamp}
                    </span>
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-2xl ${
                      message.isCurrentUser
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : message.userName === 'System'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-slate-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.typeMessage}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">{t.sendMessage}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
