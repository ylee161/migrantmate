import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Users, Calendar, ShoppingCart, MapPin, Clock, User, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { LanguageCode } from '../translations';

interface CommunityFoodSharePageProps {
  currentLang: LanguageCode;
}

type PostType = 'surplus' | 'distribution' | 'groupbuy';

interface FoodPost {
  id: string;
  type: PostType;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  author: string;
  createdAt: Date;
  imageUrl?: string;
  likes: number;
  isLiked: boolean;
}

interface PageTranslations {
  backButton: string;
  title: string;
  subtitle: string;
  createPost: string;
  tabs: {
    all: string;
    surplus: string;
    distribution: string;
    groupBuy: string;
  };
  postTypes: {
    surplus: string;
    distribution: string;
    groupbuy: string;
  };
  labels: {
    location: string;
    date: string;
    time: string;
    postedBy: string;
  };
  buttons: {
    contact: string;
  };
  createPostModal: {
    title: string;
    selectType: string;
    postTitle: string;
    description: string;
    location: string;
    date: string;
    time: string;
    cancel: string;
    submit: string;
    placeholders: {
      title: string;
      description: string;
      location: string;
    };
  };
  noPosts: string;
}

const translations: Record<LanguageCode, PageTranslations> = {
  en: {
    backButton: 'Back to Home',
    title: 'Community Food Share',
    subtitle: 'Share surplus food, organize distribution events, and coordinate group buys',
    createPost: 'Create Post',
    tabs: {
      all: 'All Posts',
      surplus: 'Surplus Food',
      distribution: 'Distribution Events',
      groupBuy: 'Group Buys'
    },
    postTypes: {
      surplus: 'Surplus Food',
      distribution: 'Distribution Event',
      groupbuy: 'Group Buy'
    },
    labels: {
      location: 'Location',
      date: 'Date',
      time: 'Time',
      postedBy: 'Posted by'
    },
    buttons: {
      contact: 'Contact'
    },
    createPostModal: {
      title: 'Create New Post',
      selectType: 'Select Post Type',
      postTitle: 'Title',
      description: 'Description',
      location: 'Location',
      date: 'Date',
      time: 'Time',
      cancel: 'Cancel',
      submit: 'Create Post',
      placeholders: {
        title: 'Enter a descriptive title',
        description: 'Provide details about the food, event, or group buy',
        location: 'Enter location or address'
      }
    },
    noPosts: 'No posts yet. Be the first to share!'
  },
  zh: {
    backButton: '返回',
    title: '社区食物分享',
    subtitle: '分享多余食物、组织分发活动和协调团购',
    createPost: '创建帖子',
    tabs: {
      all: '所有帖子',
      surplus: '多余食物',
      distribution: '分发活动',
      groupBuy: '团购'
    },
    postTypes: {
      surplus: '多余食物',
      distribution: '分发活动',
      groupbuy: '团购'
    },
    labels: {
      location: '地点',
      date: '日期',
      time: '时间',
      postedBy: '发布者'
    },
    buttons: {
      contact: '联系'
    },
    createPostModal: {
      title: '创建新帖子',
      selectType: '选择帖子类型',
      postTitle: '标题',
      description: '描述',
      location: '地点',
      date: '日期',
      time: '时间',
      cancel: '取消',
      submit: '创建帖子',
      placeholders: {
        title: '输入描述性标题',
        description: '提供有关食物、活动或团购的详细信息',
        location: '输入地点或地址'
      }
    },
    noPosts: '还没有帖子。成为第一个分享的人！'
  },
  ms: {
    backButton: 'Kembali',
    title: 'Perkongsian Makanan Komuniti',
    subtitle: 'Kongsi makanan lebihan, anjurkan acara pengedaran dan koordinasi pembelian berkumpulan',
    createPost: 'Buat Siaran',
    tabs: {
      all: 'Semua Siaran',
      surplus: 'Makanan Lebihan',
      distribution: 'Acara Pengedaran',
      groupBuy: 'Pembelian Berkumpulan'
    },
    postTypes: {
      surplus: 'Makanan Lebihan',
      distribution: 'Acara Pengedaran',
      groupbuy: 'Pembelian Berkumpulan'
    },
    labels: {
      location: 'Lokasi',
      date: 'Tarikh',
      time: 'Masa',
      postedBy: 'Disiarkan oleh'
    },
    buttons: {
      contact: 'Hubungi'
    },
    createPostModal: {
      title: 'Buat Siaran Baru',
      selectType: 'Pilih Jenis Siaran',
      postTitle: 'Tajuk',
      description: 'Penerangan',
      location: 'Lokasi',
      date: 'Tarikh',
      time: 'Masa',
      cancel: 'Batal',
      submit: 'Buat Siaran',
      placeholders: {
        title: 'Masukkan tajuk yang deskriptif',
        description: 'Berikan butiran tentang makanan, acara, atau pembelian berkumpulan',
        location: 'Masukkan lokasi atau alamat'
      }
    },
    noPosts: 'Belum ada siaran. Jadilah yang pertama untuk berkongsi!'
  },
  ta: {
    backButton: 'பின்செல்',
    title: 'சமூக உணவு பகிர்வு',
    subtitle: 'அதிகப்படியான உணவைப் பகிர்ந்து, விநியோக நிகழ்வுகளை ஏற்பாடு செய்து, குழு வாங்குதல்களை ஒருங்கிணைக்கவும்',
    createPost: 'இடுகை உருவாக்கு',
    tabs: {
      all: 'அனைத்து இடுகைகள்',
      surplus: 'அதிகப்படியான உணவு',
      distribution: 'விநியோக நிகழ்வுகள்',
      groupBuy: 'குழு வாங்குதல்கள்'
    },
    postTypes: {
      surplus: 'அதிகப்படியான உணவு',
      distribution: 'விநியோக நிகழ்வு',
      groupbuy: 'குழு வாங்குதல்'
    },
    labels: {
      location: 'இடம்',
      date: 'தேதி',
      time: 'நேரம்',
      postedBy: 'இடுகையிட்டவர்'
    },
    buttons: {
      contact: 'தொடர்பு கொள்ளுங்கள்'
    },
    createPostModal: {
      title: 'புதிய இடுகை உருவாக்கு',
      selectType: 'இடுகை வகையைத் தேர்ந்தெடுக்கவும்',
      postTitle: 'தலைப்பு',
      description: 'விளக்கம்',
      location: 'இடம்',
      date: 'தேதி',
      time: 'நேரம்',
      cancel: 'ரத்து செய்',
      submit: 'இடுகை உருவாக்கு',
      placeholders: {
        title: 'விளக்கமான தலைப்பை உள்ளிடவும்',
        description: 'உணவு, நிகழ்வு அல்லது குழு வாங்குதல் பற்றிய விவரங்களை வழங்கவும்',
        location: 'இடம் அல்லது முகவரியை உள்ளிடவும்'
      }
    },
    noPosts: 'இன்னும் இடுகைகள் இல்லை. முதலில் பகிர்ந்து கொள்ளுங்கள்!'
  },
  bn: {
    backButton: 'ফিরে যান',
    title: 'কমিউনিটি খাদ্য শেয়ার',
    subtitle: 'অতিরিক্ত খাবার শেয়ার করুন, বিতরণ ইভেন্ট আয়োজন করুন এবং গ্রুপ ক্রয় সমন্বয় করুন',
    createPost: 'পোস্ট তৈরি করুন',
    tabs: {
      all: 'সব পোস্ট',
      surplus: 'অতিরিক্ত খাবার',
      distribution: 'বিতরণ ইভেন্ট',
      groupBuy: 'গ্রুপ ক্রয়'
    },
    postTypes: {
      surplus: 'অতিরিক্ত খাবার',
      distribution: 'বিতরণ ইভেন্ট',
      groupbuy: 'গ্রুপ ক্রয়'
    },
    labels: {
      location: 'অবস্থান',
      date: 'তারিখ',
      time: 'সময়',
      postedBy: 'পোস্ট করেছেন'
    },
    buttons: {
      contact: 'যোগাযোগ করুন'
    },
    createPostModal: {
      title: 'নতুন পোস্ট তৈরি করুন',
      selectType: 'পোস্ট টাইপ নির্বাচন করুন',
      postTitle: 'শিরোনাম',
      description: 'বিবরণ',
      location: 'অবস্থান',
      date: 'তারিখ',
      time: 'সময়',
      cancel: 'বাতিল',
      submit: 'পোস্ট তৈরি করুন',
      placeholders: {
        title: 'একটি বর্ণনামূলক শিরোনাম লিখুন',
        description: 'খাবার, ইভেন্ট বা গ্রুপ ক্রয় সম্পর্কে বিস্তারিত প্রদান করুন',
        location: 'অবস্থান বা ঠিকানা লিখুন'
      }
    },
    noPosts: 'এখনও কোন পোস্ট নেই। প্রথম শেয়ার করুন!'
  },
  hi: {
    backButton: 'वापस',
    title: 'सामुदायिक खाद्य साझाकरण',
    subtitle: 'अतिरिक्त भोजन साझा करें, वितरण कार्यक्रम आयोजित करें और समूह खरीद का समन्वय करें',
    createPost: 'पोस्ट बनाएं',
    tabs: {
      all: 'सभी पोस्ट',
      surplus: 'अतिरिक्त भोजन',
      distribution: 'वितरण कार्यक्रम',
      groupBuy: 'समूह खरीद'
    },
    postTypes: {
      surplus: 'अतिरिक्त भोजन',
      distribution: 'वितरण कार्यक्रम',
      groupbuy: 'समूह खरीद'
    },
    labels: {
      location: 'स्थान',
      date: 'तारीख',
      time: 'समय',
      postedBy: 'द्वारा पोस्ट किया गया'
    },
    buttons: {
      contact: 'संपर्क करें'
    },
    createPostModal: {
      title: 'नई पोस्ट बनाएं',
      selectType: 'पोस्ट प्रकार चुनें',
      postTitle: 'शीर्षक',
      description: 'विवरण',
      location: 'स्थान',
      date: 'तारीख',
      time: 'समय',
      cancel: 'रद्द करें',
      submit: 'पोस्ट बनाएं',
      placeholders: {
        title: 'एक वर्णनात्मक शीर्षक दर्ज करें',
        description: 'भोजन, कार्यक्रम या समूह खरीद के बारे में विवरण प्रदान करें',
        location: 'स्थान या पता दर्ज करें'
      }
    },
    noPosts: 'अभी तक कोई पोस्ट नहीं। साझा करने वाले पहले व्यक्ति बनें!'
  },
  th: {
    backButton: 'กลับ',
    title: 'การแบ่งปันอาหารชุมชน',
    subtitle: 'แบ่งปันอาหารส่วนเกิน จัดกิจกรรมแจกจ่าย และประสานงานการซื้อแบบกลุ่ม',
    createPost: 'สร้างโพสต์',
    tabs: {
      all: 'โพสต์ทั้งหมด',
      surplus: 'อาหารส่วนเกิน',
      distribution: 'กิจกรรมแจกจ่าย',
      groupBuy: 'การซื้อแบบกลุ่ม'
    },
    postTypes: {
      surplus: 'อาหารส่วนเกิน',
      distribution: 'กิจกรรมแจกจ่าย',
      groupbuy: 'การซื้อแบบกลุ่ม'
    },
    labels: {
      location: 'สถานที่',
      date: 'วันที่',
      time: 'เวลา',
      postedBy: 'โพสต์โดย'
    },
    buttons: {
      contact: 'ติดต่อ'
    },
    createPostModal: {
      title: 'สร้างโพสต์ใหม่',
      selectType: 'เลือกประเภทโพสต์',
      postTitle: 'หัวข้อ',
      description: 'คำอธิบาย',
      location: 'สถานที่',
      date: 'วันที่',
      time: 'เวลา',
      cancel: 'ยกเลิก',
      submit: 'สร้างโพสต์',
      placeholders: {
        title: 'ป้อนหัวข้อที่อธิบาย',
        description: 'ให้รายละเอียดเกี่ยวกับอาหาร กิจกรรม หรือการซื้อแบบกลุ่ม',
        location: 'ป้อนสถานที่หรือที่อยู่'
      }
    },
    noPosts: 'ยังไม่มีโพสต์ เป็นคนแรกที่แบ่งปัน!'
  },
  vi: {
    backButton: 'Quay lại',
    title: 'Chia Sẻ Thực Phẩm Cộng Đồng',
    subtitle: 'Chia sẻ thực phẩm thừa, tổ chức sự kiện phân phối và điều phối mua hàng nhóm',
    createPost: 'Tạo Bài Đăng',
    tabs: {
      all: 'Tất Cả Bài Đăng',
      surplus: 'Thực Phẩm Thừa',
      distribution: 'Sự Kiện Phân Phối',
      groupBuy: 'Mua Hàng Nhóm'
    },
    postTypes: {
      surplus: 'Thực Phẩm Thừa',
      distribution: 'Sự Kiện Phân Phối',
      groupbuy: 'Mua Hàng Nhóm'
    },
    labels: {
      location: 'Địa Điểm',
      date: 'Ngày',
      time: 'Giờ',
      postedBy: 'Đăng bởi'
    },
    buttons: {
      contact: 'Liên Hệ'
    },
    createPostModal: {
      title: 'Tạo Bài Đăng Mới',
      selectType: 'Chọn Loại Bài Đăng',
      postTitle: 'Tiêu Đề',
      description: 'Mô Tả',
      location: 'Địa Điểm',
      date: 'Ngày',
      time: 'Giờ',
      cancel: 'Hủy',
      submit: 'Tạo Bài Đăng',
      placeholders: {
        title: 'Nhập tiêu đề mô tả',
        description: 'Cung cấp chi tiết về thực phẩm, sự kiện hoặc mua hàng nhóm',
        location: 'Nhập địa điểm hoặc địa chỉ'
      }
    },
    noPosts: 'Chưa có bài đăng nào. Hãy là người đầu tiên chia sẻ!'
  },
  id: {
    backButton: 'Kembali',
    title: 'Berbagi Makanan Komunitas',
    subtitle: 'Bagikan makanan berlebih, atur acara distribusi, dan koordinasi pembelian kelompok',
    createPost: 'Buat Postingan',
    tabs: {
      all: 'Semua Postingan',
      surplus: 'Makanan Berlebih',
      distribution: 'Acara Distribusi',
      groupBuy: 'Pembelian Kelompok'
    },
    postTypes: {
      surplus: 'Makanan Berlebih',
      distribution: 'Acara Distribusi',
      groupbuy: 'Pembelian Kelompok'
    },
    labels: {
      location: 'Lokasi',
      date: 'Tanggal',
      time: 'Waktu',
      postedBy: 'Diposting oleh'
    },
    buttons: {
      contact: 'Hubungi'
    },
    createPostModal: {
      title: 'Buat Postingan Baru',
      selectType: 'Pilih Jenis Postingan',
      postTitle: 'Judul',
      description: 'Deskripsi',
      location: 'Lokasi',
      date: 'Tanggal',
      time: 'Waktu',
      cancel: 'Batal',
      submit: 'Buat Postingan',
      placeholders: {
        title: 'Masukkan judul deskriptif',
        description: 'Berikan detail tentang makanan, acara, atau pembelian kelompok',
        location: 'Masukkan lokasi atau alamat'
      }
    },
    noPosts: 'Belum ada postingan. Jadilah yang pertama berbagi!'
  },
  tl: {
    backButton: 'Bumalik',
    title: 'Pagbabahagi ng Pagkain sa Komunidad',
    subtitle: 'Magbahagi ng sobrang pagkain, mag-organisa ng distribution events at mag-coordinate ng group buys',
    createPost: 'Gumawa ng Post',
    tabs: {
      all: 'Lahat ng Posts',
      surplus: 'Sobrang Pagkain',
      distribution: 'Distribution Events',
      groupBuy: 'Group Buys'
    },
    postTypes: {
      surplus: 'Sobrang Pagkain',
      distribution: 'Distribution Event',
      groupbuy: 'Group Buy'
    },
    labels: {
      location: 'Lokasyon',
      date: 'Petsa',
      time: 'Oras',
      postedBy: 'Nag-post'
    },
    buttons: {
      contact: 'Makipag-ugnayan'
    },
    createPostModal: {
      title: 'Gumawa ng Bagong Post',
      selectType: 'Pumili ng Uri ng Post',
      postTitle: 'Pamagat',
      description: 'Deskripsyon',
      location: 'Lokasyon',
      date: 'Petsa',
      time: 'Oras',
      cancel: 'Kanselahin',
      submit: 'Gumawa ng Post',
      placeholders: {
        title: 'Maglagay ng malinaw na pamagat',
        description: 'Magbigay ng detalye tungkol sa pagkain, event, o group buy',
        location: 'Maglagay ng lokasyon o address'
      }
    },
    noPosts: 'Wala pang posts. Maging una sa pagbabahagi!'
  },
  my: {
    backButton: 'နောက်သို့',
    title: 'အသိုင်းအဝိုင်း အစားအသောက်မျှဝေခြင်း',
    subtitle: 'ပိုလျှံသော အစားအစာများကို မျှဝေပြီး ဖြန့်ဝေရေးပွဲများ စီစဉ်ကာ အုပ်စုဝယ်ယူမှုများကို ညှိနှိုင်းပါ',
    createPost: 'ပို့စ်တင်ရန်',
    tabs: {
      all: 'ပို့စ်အားလုံး',
      surplus: 'ပိုလျှံသော အစားအစာ',
      distribution: 'ဖြန့်ဝေရေးပွဲများ',
      groupBuy: 'အုပ်စုဝယ်ယူမှုများ'
    },
    postTypes: {
      surplus: 'ပိုလျှံသော အစားအစာ',
      distribution: 'ဖြန့်ဝေရေးပွဲ',
      groupbuy: 'အုပ်စုဝယ်ယူမှု'
    },
    labels: {
      location: 'တည်နေရာ',
      date: 'ရက်စွဲ',
      time: 'အချိန်',
      postedBy: 'တင်သူ'
    },
    buttons: {
      contact: 'ဆက်သွယ်ရန်'
    },
    createPostModal: {
      title: 'ပို့စ်အသစ်တင်ရန်',
      selectType: 'ပို့စ်အမျိုးအစားရွေးချယ်ပါ',
      postTitle: 'ခေါင်းစဉ်',
      description: 'ဖော်ပြချက်',
      location: 'တည်နေရာ',
      date: 'ရက်စွဲ',
      time: 'အချိန်',
      cancel: 'ပယ်ဖျက်ရန်',
      submit: 'ပို့စ်တင်ရန်',
      placeholders: {
        title: 'ဖော်ပြသော ခေါင်းစဉ်ထည့်ပါ',
        description: 'အစားအစာ၊ ပွဲ သို့မဟုတ် အုပ်စုဝယ်ယူမှု အကြောင်း အသေးစိတ်ပေးပါ',
        location: 'တည်နေရာ သို့မဟုတ် လိပ်စာထည့်ပါ'
      }
    },
    noPosts: 'ပို့စ်များမရှိသေးပါ။ ပထမဆုံးမျှဝေသူဖြစ်ပါ!'
  }
};

// Helper function to generate random likes between 1-50
const getRandomLikes = () => Math.floor(Math.random() * 50) + 1;

// Sample posts with images and random likes
const initialPosts: FoodPost[] = [
  {
    id: '1',
    type: 'surplus',
    title: 'Fresh Vegetables from Home Garden',
    description: 'I have excess tomatoes, cucumbers, and lettuce from my garden. All organic and freshly picked this morning. Free for anyone who needs them!',
    location: 'Ang Mo Kio Avenue 3',
    date: '2024-01-15',
    time: '14:00',
    author: 'Maria Santos',
    createdAt: new Date('2024-01-14T10:30:00'),
    imageUrl: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  },
  {
    id: '2',
    type: 'distribution',
    title: 'Community Food Distribution - Weekend',
    description: 'Join us this Saturday for our monthly community food distribution. We have rice, canned goods, fresh produce, and bread. First come, first served. Bring your own bags!',
    location: 'Toa Payoh Community Center',
    date: '2024-01-20',
    time: '09:00',
    author: 'Community Helpers SG',
    createdAt: new Date('2024-01-13T15:20:00'),
    imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  },
  {
    id: '3',
    type: 'groupbuy',
    title: 'Bulk Rice Purchase - 25kg Bags',
    description: 'Organizing a group buy for premium jasmine rice. 25kg bags at $45 each (retail $60). Need minimum 10 people. Payment by PayNow. Collection next Friday.',
    location: 'Jurong West Street 52',
    date: '2024-01-26',
    time: '18:00',
    author: 'Ahmad Rahman',
    createdAt: new Date('2024-01-12T09:15:00'),
    imageUrl: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  },
  {
    id: '4',
    type: 'surplus',
    title: 'Leftover Catering Food - Indian Cuisine',
    description: 'Had a small event and have surplus biryani, curry, and naan bread. All vegetarian, prepared today. Can feed 15-20 people. Must collect by 8pm tonight.',
    location: 'Clementi Avenue 2',
    date: '2024-01-14',
    time: '20:00',
    author: 'Priya Kumar',
    createdAt: new Date('2024-01-14T16:45:00'),
    imageUrl: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  },
  {
    id: '5',
    type: 'distribution',
    title: 'Free Bread Distribution - Daily',
    description: 'Bakery donating unsold bread every evening. Various types including whole wheat, white bread, and buns. Available from 7pm onwards while stocks last.',
    location: 'Bedok North Street 1',
    date: '2024-01-15',
    time: '19:00',
    author: 'Sunshine Bakery',
    createdAt: new Date('2024-01-11T12:00:00'),
    imageUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  },
  {
    id: '6',
    type: 'groupbuy',
    title: 'Fresh Chicken - Wholesale Price',
    description: 'Group buy for fresh chicken from local farm. Whole chickens at $8/kg (usual $12/kg). Minimum order 20kg total. Delivery to central location. Order by Wednesday.',
    location: 'Yishun Ring Road',
    date: '2024-01-22',
    time: '10:00',
    author: 'David Tan',
    createdAt: new Date('2024-01-10T14:30:00'),
    imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  },
  {
    id: '7',
    type: 'surplus',
    title: 'Canned Foods & Dry Goods',
    description: 'Moving house and need to clear pantry. Have various canned vegetables, soups, pasta, and sauces. All within expiry dates. Free for collection.',
    location: 'Hougang Avenue 8',
    date: '2024-01-16',
    time: '15:00',
    author: 'Jennifer Wong',
    createdAt: new Date('2024-01-13T11:20:00'),
    imageUrl: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  },
  {
    id: '8',
    type: 'groupbuy',
    title: 'Organic Vegetables Box - Weekly',
    description: 'Starting weekly organic vegetable box subscription. $25 for 5kg mixed seasonal vegetables. Delivered every Sunday. Looking for 15 subscribers to start.',
    location: 'Tampines Street 45',
    date: '2024-01-21',
    time: '11:00',
    author: 'Green Harvest Co-op',
    createdAt: new Date('2024-01-09T08:45:00'),
    imageUrl: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  },
  {
    id: '9',
    type: 'distribution',
    title: 'Hot Meals for Elderly - Lunch Service',
    description: 'Free hot lunch for elderly residents (60+). Nutritious meals prepared fresh daily. Registration required. Meals available Monday to Friday.',
    location: 'Bukit Batok Community Club',
    date: '2024-01-17',
    time: '12:00',
    author: 'Silver Care Foundation',
    createdAt: new Date('2024-01-08T13:10:00'),
    imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  },
  {
    id: '10',
    type: 'surplus',
    title: 'Birthday Party Leftovers',
    description: 'Lots of snacks, chips, cookies, and soft drinks left from kids birthday party. All sealed and unopened. Also have some party decorations free to take.',
    location: 'Pasir Ris Drive 3',
    date: '2024-01-15',
    time: '16:00',
    author: 'Sarah Lee',
    createdAt: new Date('2024-01-14T19:30:00'),
    imageUrl: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: getRandomLikes(),
    isLiked: false
  }
];

export function CommunityFoodSharePage({ currentLang }: CommunityFoodSharePageProps) {
  const navigate = useNavigate();
  const t = translations[currentLang];
  
  const [activeTab, setActiveTab] = useState<'all' | PostType>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [posts, setPosts] = useState<FoodPost[]>(initialPosts);
  
  const [newPost, setNewPost] = useState({
    type: 'surplus' as PostType,
    title: '',
    description: '',
    location: '',
    date: '',
    time: ''
  });

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.description || !newPost.location || !newPost.date || !newPost.time) {
      return;
    }

    const post: FoodPost = {
      id: Date.now().toString(),
      type: newPost.type,
      title: newPost.title,
      description: newPost.description,
      location: newPost.location,
      date: newPost.date,
      time: newPost.time,
      author: 'Current User',
      createdAt: new Date(),
      likes: 0,
      isLiked: false
    };

    setPosts([post, ...posts]);
    setShowCreateModal(false);
    setNewPost({
      type: 'surplus',
      title: '',
      description: '',
      location: '',
      date: '',
      time: ''
    });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleContact = (post: FoodPost) => {
    // For now, just show an alert. In a real app, this would open a contact modal or messaging system
    alert(`Contact ${post.author} about: ${post.title}`);
  };

  const filteredPosts = activeTab === 'all' ? posts : posts.filter(post => post.type === activeTab);

  const getPostTypeColor = (type: PostType) => {
    switch (type) {
      case 'surplus':
        return 'from-green-500 to-emerald-600';
      case 'distribution':
        return 'from-blue-500 to-indigo-600';
      case 'groupbuy':
        return 'from-purple-500 to-violet-600';
      default:
        return 'from-orange-500 to-amber-600';
    }
  };

  const getPostTypeIcon = (type: PostType) => {
    switch (type) {
      case 'surplus':
        return Users;
      case 'distribution':
        return Calendar;
      case 'groupbuy':
        return ShoppingCart;
      default:
        return Users;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-transparent to-amber-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
          onClick={() => navigate('/help')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backButton}</span>
        </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                {t.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600">
                {t.subtitle}
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold"
            >
              <Plus className="w-5 h-5" />
              {t.createPost}
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-white border-2 border-cyan-800 text-slate-600 shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.tabs.all}
          </button>
          <button
            onClick={() => setActiveTab('surplus')}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === 'surplus'
                ? 'bg-white border-2 border-green-600 text-slate-600 shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.tabs.surplus}
          </button>
          <button
            onClick={() => setActiveTab('distribution')}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === 'distribution'
                ? 'bg-white border-2 border-blue-600 text-slate-600 shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.tabs.distribution}
          </button>
          <button
            onClick={() => setActiveTab('groupbuy')}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === 'groupbuy'
                ? 'bg-white border-2 border-purple-600 text-slate-600 shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t.tabs.groupBuy}
          </button>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">{t.noPosts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const Icon = getPostTypeIcon(post.type);
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image */}
                  {post.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getPostTypeColor(post.type)}`}></div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-cyan-800" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full mb-2">
                          {t.postTypes[post.type]}
                        </span>
                        <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="space-y-2 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{post.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{post.time}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs truncate">{t.labels.postedBy} {post.author}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                          post.isLiked
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Heart 
                          className={`w-4 h-4 ${post.isLiked ? 'fill-red-600' : ''}`}
                        />
                        <span>{post.likes}</span>
                      </button>
                      <button
                        onClick={() => handleContact(post)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-800 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {t.buttons.contact}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">{t.createPostModal.title}</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.createPostModal.selectType}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setNewPost({ ...newPost, type: 'surplus' })}
                    className={`p-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      newPost.type === 'surplus'
                        ? 'bg-cyan-800 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.postTypes.surplus}
                  </button>
                  <button
                    onClick={() => setNewPost({ ...newPost, type: 'distribution' })}
                    className={`p-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      newPost.type === 'distribution'
                        ? 'bg-cyan-800 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.postTypes.distribution}
                  </button>
                  <button
                    onClick={() => setNewPost({ ...newPost, type: 'groupbuy' })}
                    className={`p-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      newPost.type === 'groupbuy'
                        ? 'bg-cyan-800 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.postTypes.groupbuy}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.createPostModal.postTitle}
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder={t.createPostModal.placeholders.title}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.createPostModal.description}
                </label>
                <textarea
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  placeholder={t.createPostModal.placeholders.description}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.createPostModal.location}
                </label>
                <input
                  type="text"
                  value={newPost.location}
                  onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                  placeholder={t.createPostModal.placeholders.location}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.createPostModal.date}
                  </label>
                  <input
                    type="date"
                    value={newPost.date}
                    onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {t.createPostModal.time}
                  </label>
                  <input
                    type="time"
                    value={newPost.time}
                    onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-300"
              >
                {t.createPostModal.cancel}
              </button>
              <button
                onClick={handleCreatePost}
                className="flex-1 px-6 py-3 bg-cyan-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                {t.createPostModal.submit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
