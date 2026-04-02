import { LanguageCode } from './types';

interface ChatInterfaceTranslation {
  title: string;
  subtitle: string;
  welcomeMessage: string;
  startConversation: string;
  inputPlaceholder: string;
  sendButton: string;
  typing: string;
  errorMessage: string;
  startListening: string;
  stopListening: string;
  listening: string;
}

export const chatInterfaceTranslations: Record<LanguageCode, ChatInterfaceTranslation> = {
  en: {
    title: 'MigrantMate Assistant',
    subtitle: 'Here to help you 24/7',
    welcomeMessage: 'Hello! How can I help you today?',
    startConversation: 'Ask me anything about work, housing, health, or legal matters',
    inputPlaceholder: 'Type your message here...',
    sendButton: 'Send',
    typing: 'Typing...',
    errorMessage: 'I apologize, but I encountered an error. Please try again.',
    startListening: 'Start voice input',
    stopListening: 'Stop voice input',
    listening: 'Listening...'
  },
  zh: {
    title: 'MigrantMate 助手',
    subtitle: '全天候为您服务',
    welcomeMessage: '您好！今天我能帮您什么？',
    startConversation: '询问我关于工作、住房、健康或法律事务的任何问题',
    inputPlaceholder: '在此输入您的消息...',
    sendButton: '发送',
    typing: '正在输入...',
    errorMessage: '抱歉，我遇到了错误。请重试。',
    startListening: '开始语音输入',
    stopListening: '停止语音输入',
    listening: '正在聆听...'
  },
  ms: {
    title: 'Pembantu MigrantMate',
    subtitle: 'Sedia membantu anda 24/7',
    welcomeMessage: 'Hello! Bagaimana saya boleh membantu anda hari ini?',
    startConversation: 'Tanya saya apa-apa tentang kerja, perumahan, kesihatan, atau perkara undang-undang',
    inputPlaceholder: 'Taip mesej anda di sini...',
    sendButton: 'Hantar',
    typing: 'Menaip...',
    errorMessage: 'Maaf, saya menghadapi ralat. Sila cuba lagi.',
    startListening: 'Mula input suara',
    stopListening: 'Henti input suara',
    listening: 'Mendengar...'
  },
  ta: {
    title: 'MigrantMate உதவியாளர்',
    subtitle: '24/7 உங்களுக்கு உதவ இங்கே',
    welcomeMessage: 'வணக்கம்! இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    startConversation: 'வேலை, வீடு, சுகாதாரம் அல்லது சட்ட விஷயங்கள் பற்றி என்னிடம் எதையும் கேளுங்கள்',
    inputPlaceholder: 'உங்கள் செய்தியை இங்கே தட்டச்சு செய்யவும்...',
    sendButton: 'அனுப்பு',
    typing: 'தட்டச்சு செய்கிறது...',
    errorMessage: 'மன்னிக்கவும், நான் ஒரு பிழையை சந்தித்தேன். மீண்டும் முயற்சிக்கவும்.',
    startListening: 'குரல் உள்ளீட்டைத் தொடங்கு',
    stopListening: 'குரல் உள்ளீட்டை நிறுத்து',
    listening: 'கேட்கிறது...'
  },
  bn: {
    title: 'MigrantMate সহায়ক',
    subtitle: '24/7 আপনাকে সাহায্য করতে এখানে',
    welcomeMessage: 'হ্যালো! আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    startConversation: 'কাজ, আবাসন, স্বাস্থ্য বা আইনি বিষয় সম্পর্কে আমাকে যেকোনো কিছু জিজ্ঞাসা করুন',
    inputPlaceholder: 'এখানে আপনার বার্তা টাইপ করুন...',
    sendButton: 'পাঠান',
    typing: 'টাইপ করছে...',
    errorMessage: 'দুঃখিত, আমি একটি ত্রুটির সম্মুখীন হয়েছি। অনুগ্রহ করে আবার চেষ্টা করুন।',
    startListening: 'ভয়েস ইনপুট শুরু করুন',
    stopListening: 'ভয়েস ইনপুট বন্ধ করুন',
    listening: 'শুনছি...'
  },
  hi: {
    title: 'MigrantMate सहायक',
    subtitle: '24/7 आपकी मदद के लिए यहाँ',
    welcomeMessage: 'नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?',
    startConversation: 'काम, आवास, स्वास्थ्य या कानूनी मामलों के बारे में मुझसे कुछ भी पूछें',
    inputPlaceholder: 'अपना संदेश यहाँ टाइप करें...',
    sendButton: 'भेजें',
    typing: 'टाइप कर रहा है...',
    errorMessage: 'क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुनः प्रयास करें।',
    startListening: 'आवाज़ इनपुट शुरू करें',
    stopListening: 'आवाज़ इनपुट बंद करें',
    listening: 'सुन रहा है...'
  },
  th: {
    title: 'ผู้ช่วย MigrantMate',
    subtitle: 'พร้อมช่วยเหลือคุณตลอด 24/7',
    welcomeMessage: 'สวัสดี! วันนี้ฉันจะช่วยคุณได้อย่างไร?',
    startConversation: 'ถามฉันเกี่ยวกับงาน ที่อยู่อาศัย สุขภาพ หรือเรื่องกฎหมาย',
    inputPlaceholder: 'พิมพ์ข้อความของคุณที่นี่...',
    sendButton: 'ส่ง',
    typing: 'กำลังพิมพ์...',
    errorMessage: 'ขออภัย ฉันพบข้อผิดพลาด โปรดลองอีกครั้ง',
    startListening: 'เริ่มการป้อนเสียง',
    stopListening: 'หยุดการป้อนเสียง',
    listening: 'กำลังฟัง...'
  },
  vi: {
    title: 'Trợ lý MigrantMate',
    subtitle: 'Sẵn sàng giúp bạn 24/7',
    welcomeMessage: 'Xin chào! Hôm nay tôi có thể giúp gì cho bạn?',
    startConversation: 'Hỏi tôi bất cứ điều gì về công việc, nhà ở, sức khỏe hoặc vấn đề pháp lý',
    inputPlaceholder: 'Nhập tin nhắn của bạn ở đây...',
    sendButton: 'Gửi',
    typing: 'Đang nhập...',
    errorMessage: 'Xin lỗi, tôi gặp lỗi. Vui lòng thử lại.',
    startListening: 'Bắt đầu nhập giọng nói',
    stopListening: 'Dừng nhập giọng nói',
    listening: 'Đang nghe...'
  },
  id: {
    title: 'Asisten MigrantMate',
    subtitle: 'Siap membantu Anda 24/7',
    welcomeMessage: 'Halo! Bagaimana saya bisa membantu Anda hari ini?',
    startConversation: 'Tanyakan apa saja tentang pekerjaan, perumahan, kesehatan, atau masalah hukum',
    inputPlaceholder: 'Ketik pesan Anda di sini...',
    sendButton: 'Kirim',
    typing: 'Mengetik...',
    errorMessage: 'Maaf, saya mengalami kesalahan. Silakan coba lagi.',
    startListening: 'Mulai input suara',
    stopListening: 'Hentikan input suara',
    listening: 'Mendengarkan...'
  },
  tl: {
    title: 'MigrantMate Assistant',
    subtitle: 'Nandito para tumulong sa iyo 24/7',
    welcomeMessage: 'Kumusta! Paano kita matutulungan ngayon?',
    startConversation: 'Tanungin mo ako tungkol sa trabaho, pabahay, kalusugan, o legal na usapin',
    inputPlaceholder: 'I-type ang iyong mensahe dito...',
    sendButton: 'Ipadala',
    typing: 'Nagta-type...',
    errorMessage: 'Paumanhin, nakatagpo ako ng error. Pakisubukan muli.',
    startListening: 'Simulan ang voice input',
    stopListening: 'Ihinto ang voice input',
    listening: 'Nakikinig...'
  },
  my: {
    title: 'MigrantMate လုပ်ဖော်ကိုင်ဖက်',
    subtitle: '24/7 သင့်ကို ကူညီရန် ဤနေရာတွင်',
    welcomeMessage: 'မင်္ဂလာပါ! ဒီနေ့ ကျွန်တော် သင့်ကို ဘယ်လို ကူညီနိုင်မလဲ?',
    startConversation: 'အလုပ်၊ နေထိုင်ရာ၊ ကျန်းမာရေး သို့မဟုတ် ဥပဒေရေးရာ ကိစ္စများအကြောင်း ကျွန်တော့်ကို မေးပါ',
    inputPlaceholder: 'သင့်မက်ဆေ့ခ်ျကို ဤနေရာတွင် ရိုက်ထည့်ပါ...',
    sendButton: 'ပို့ပါ',
    typing: 'ရိုက်နေသည်...',
    errorMessage: 'တောင်းပန်ပါတယ်၊ အမှားတစ်ခု ကြုံတွေ့ခဲ့ရပါတယ်။ ထပ်စမ်းကြည့်ပါ။',
    startListening: 'အသံထည့်သွင်းမှု စတင်ပါ',
    stopListening: 'အသံထည့်သွင်းမှု ရပ်ပါ',
    listening: 'နားထောင်နေသည်...'
  }
};
