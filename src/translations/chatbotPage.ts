import { LanguageCode } from './types';

interface ChatbotPageTranslation {
  title: string;
  subtitle: string;
  backButton: string;
  documentUploader: {
    title: string;
    subtitle: string;
  };
  helpTips: {
    title: string;
    tips: string[];
  };
}

export const chatbotPageTranslations: Record<LanguageCode, ChatbotPageTranslation> = {
  en: {
    title: 'Chat with MigrantMate',
    subtitle: 'Get instant help and guidance for any questions you have',
    backButton: 'Back to Menu',
    documentUploader: {
      title: 'Upload Documents',
      subtitle: 'Share files for better assistance'
    },
    helpTips: {
      title: 'How I Can Help',
      tips: [
        'Answer questions about work permits and contracts',
        'Provide guidance on housing and accommodation',
        'Help with financial planning and budgeting',
        'Explain healthcare and insurance options',
        'Assist with legal rights and disputes',
        'Guide you on travel and remittance services'
      ]
    }
  },
  zh: {
    title: '与 MigrantMate 聊天',
    subtitle: '立即获得您所有问题的帮助和指导',
    backButton: '返回菜单',
    documentUploader: {
      title: '上传文件',
      subtitle: '分享文件以获得更好的帮助'
    },
    helpTips: {
      title: '我能如何帮助',
      tips: [
        '回答有关工作准证和合同的问题',
        '提供住房和住宿指导',
        '帮助财务规划和预算',
        '解释医疗保健和保险选项',
        '协助处理法律权利和纠纷',
        '指导您使用旅行和汇款服务'
      ]
    }
  },
  ms: {
    title: 'Berbual dengan MigrantMate',
    subtitle: 'Dapatkan bantuan dan panduan segera untuk sebarang soalan anda',
    backButton: 'Kembali ke Menu',
    documentUploader: {
      title: 'Muat Naik Dokumen',
      subtitle: 'Kongsi fail untuk bantuan yang lebih baik'
    },
    helpTips: {
      title: 'Bagaimana Saya Boleh Membantu',
      tips: [
        'Menjawab soalan tentang permit kerja dan kontrak',
        'Memberikan panduan tentang perumahan dan penginapan',
        'Membantu dengan perancangan kewangan dan belanjawan',
        'Menerangkan pilihan penjagaan kesihatan dan insurans',
        'Membantu dengan hak undang-undang dan pertikaian',
        'Membimbing anda tentang perkhidmatan perjalanan dan kiriman wang'
      ]
    }
  },
  ta: {
    title: 'MigrantMate உடன் அரட்டையடிக்கவும்',
    subtitle: 'உங்களுக்கு உள்ள எந்த கேள்விகளுக்கும் உடனடி உதவி மற்றும் வழிகாட்டுதலைப் பெறுங்கள்',
    backButton: 'மெனுவுக்குத் திரும்பு',
    documentUploader: {
      title: 'ஆவணங்களைப் பதிவேற்றவும்',
      subtitle: 'சிறந்த உதவிக்காக கோப்புகளைப் பகிரவும்'
    },
    helpTips: {
      title: 'நான் எப்படி உதவ முடியும்',
      tips: [
        'வேலை அனுமதிகள் மற்றும் ஒப்பந்தங்கள் பற்றிய கேள்விகளுக்கு பதிலளிக்கவும்',
        'வீடு மற்றும் தங்குமிடம் குறித்த வழிகாட்டுதலை வழங்கவும்',
        'நிதி திட்டமிடல் மற்றும் பட்ஜெட்டில் உதவவும்',
        'சுகாதாரம் மற்றும் காப்பீட்டு விருப்பங்களை விளக்கவும்',
        'சட்ட உரிமைகள் மற்றும் தகராறுகளில் உதவவும்',
        'பயணம் மற்றும் பணம் அனுப்பும் சேவைகளில் உங்களுக்கு வழிகாட்டவும்'
      ]
    }
  },
  bn: {
    title: 'MigrantMate এর সাথে চ্যাট করুন',
    subtitle: 'আপনার যেকোনো প্রশ্নের জন্য তাৎক্ষণিক সাহায্য এবং নির্দেশনা পান',
    backButton: 'মেনুতে ফিরে যান',
    documentUploader: {
      title: 'নথি আপলোড করুন',
      subtitle: 'ভাল সহায়তার জন্য ফাইল শেয়ার করুন'
    },
    helpTips: {
      title: 'আমি কীভাবে সাহায্য করতে পারি',
      tips: [
        'কাজের অনুমতি এবং চুক্তি সম্পর্কে প্রশ্নের উত্তর দিন',
        'আবাসন এবং থাকার ব্যবস্থা সম্পর্কে নির্দেশনা প্রদান করুন',
        'আর্থিক পরিকল্পনা এবং বাজেটে সাহায্য করুন',
        'স্বাস্থ্যসেবা এবং বীমা বিকল্পগুলি ব্যাখ্যা করুন',
        'আইনি অধিকার এবং বিরোধে সহায়তা করুন',
        'ভ্রমণ এবং রেমিট্যান্স সেবায় আপনাকে গাইড করুন'
      ]
    }
  },
  hi: {
    title: 'MigrantMate के साथ चैट करें',
    subtitle: 'अपने किसी भी प्रश्न के लिए तुरंत सहायता और मार्गदर्शन प्राप्त करें',
    backButton: 'मेनू पर वापस जाएं',
    documentUploader: {
      title: 'दस्तावेज़ अपलोड करें',
      subtitle: 'बेहतर सहायता के लिए फ़ाइलें साझा करें'
    },
    helpTips: {
      title: 'मैं कैसे मदद कर सकता हूं',
      tips: [
        'कार्य परमिट और अनुबंधों के बारे में प्रश्नों का उत्तर दें',
        'आवास और रहने की व्यवस्था पर मार्गदर्शन प्रदान करें',
        'वित्तीय योजना और बजट में मदद करें',
        'स्वास्थ्य सेवा और बीमा विकल्पों की व्याख्या करें',
        'कानूनी अधिकारों और विवादों में सहायता करें',
        'यात्रा और प्रेषण सेवाओं पर आपका मार्गदर्शन करें'
      ]
    }
  },
  th: {
    title: 'แชทกับ MigrantMate',
    subtitle: 'รับความช่วยเหลือและคำแนะนำทันทีสำหรับคำถามใดๆ ของคุณ',
    backButton: 'กลับไปที่เมนู',
    documentUploader: {
      title: 'อัปโหลดเอกสาร',
      subtitle: 'แชร์ไฟล์เพื่อรับความช่วยเหลือที่ดีขึ้น'
    },
    helpTips: {
      title: 'ฉันสามารถช่วยได้อย่างไร',
      tips: [
        'ตอบคำถามเกี่ยวกับใบอนุญาตทำงานและสัญญา',
        'ให้คำแนะนำเกี่ยวกับที่อยู่อาศัยและที่พัก',
        'ช่วยเหลือในการวางแผนทางการเงินและงบประมาณ',
        'อธิบายตัวเลือกการดูแลสุขภาพและประกันภัย',
        'ช่วยเหลือเกี่ยวกับสิทธิทางกฎหมายและข้อพิพาท',
        'แนะนำคุณเกี่ยวกับบริการเดินทางและการโอนเงิน'
      ]
    }
  },
  vi: {
    title: 'Trò chuyện với MigrantMate',
    subtitle: 'Nhận trợ giúp và hướng dẫn ngay lập tức cho bất kỳ câu hỏi nào của bạn',
    backButton: 'Quay lại Menu',
    documentUploader: {
      title: 'Tải lên Tài liệu',
      subtitle: 'Chia sẻ tệp để được hỗ trợ tốt hơn'
    },
    helpTips: {
      title: 'Tôi Có Thể Giúp Gì',
      tips: [
        'Trả lời câu hỏi về giấy phép lao động và hợp đồng',
        'Cung cấp hướng dẫn về nhà ở và chỗ ở',
        'Giúp lập kế hoạch tài chính và ngân sách',
        'Giải thích các lựa chọn chăm sóc sức khỏe và bảo hiểm',
        'Hỗ trợ về quyền pháp lý và tranh chấp',
        'Hướng dẫn bạn về dịch vụ du lịch và chuyển tiền'
      ]
    }
  },
  id: {
    title: 'Obrolan dengan MigrantMate',
    subtitle: 'Dapatkan bantuan dan panduan instan untuk pertanyaan apa pun yang Anda miliki',
    backButton: 'Kembali ke Menu',
    documentUploader: {
      title: 'Unggah Dokumen',
      subtitle: 'Bagikan file untuk bantuan yang lebih baik'
    },
    helpTips: {
      title: 'Bagaimana Saya Bisa Membantu',
      tips: [
        'Menjawab pertanyaan tentang izin kerja dan kontrak',
        'Memberikan panduan tentang perumahan dan akomodasi',
        'Membantu perencanaan keuangan dan penganggaran',
        'Menjelaskan opsi perawatan kesehatan dan asuransi',
        'Membantu hak hukum dan sengketa',
        'Membimbing Anda tentang layanan perjalanan dan pengiriman uang'
      ]
    }
  },
  tl: {
    title: 'Makipag-chat sa MigrantMate',
    subtitle: 'Kumuha ng agarang tulong at gabay para sa anumang tanong na mayroon ka',
    backButton: 'Bumalik sa Menu',
    documentUploader: {
      title: 'Mag-upload ng Mga Dokumento',
      subtitle: 'Magbahagi ng mga file para sa mas mahusay na tulong'
    },
    helpTips: {
      title: 'Paano Ako Makakatulong',
      tips: [
        'Sagutin ang mga tanong tungkol sa work permit at kontrata',
        'Magbigay ng gabay sa pabahay at tirahan',
        'Tumulong sa pagpaplano ng pananalapi at badyet',
        'Ipaliwanag ang mga opsyon sa healthcare at insurance',
        'Tumulong sa mga legal na karapatan at alitan',
        'Gabayan ka sa mga serbisyo sa paglalakbay at pagpapadala ng pera'
      ]
    }
  },
  my: {
    title: 'MigrantMate နှင့် စကားပြောပါ',
    subtitle: 'သင့်မေးခွန်းများအတွက် ချက်ချင်း အကူအညီနှင့် လမ်းညွှန်မှု ရယူပါ',
    backButton: 'မီနူးသို့ ပြန်သွားပါ',
    documentUploader: {
      title: 'စာရွက်စာတမ်းများ တင်ပါ',
      subtitle: 'ပိုမိုကောင်းမွန်သော အကူအညီအတွက် ဖိုင်များ မျှဝေပါ'
    },
    helpTips: {
      title: 'ကျွန်တော် ဘယ်လို ကူညီနိုင်မလဲ',
      tips: [
        'အလုပ်ခွင့်ပြုလက်မှတ်နှင့် စာချုပ်များအကြောင်း မေးခွန်းများကို ဖြေကြားပါ',
        'နေထိုင်ရာနှင့် တည်းခိုရာအကြောင်း လမ်းညွှန်မှု ပေးပါ',
        'ငွေကြေးစီမံကိန်းနှင့် ဘတ်ဂျက်တွင် ကူညီပါ',
        'ကျန်းမာရေးစောင့်ရှောက်မှုနှင့် အာမခံရွေးချယ်မှုများကို ရှင်းပြပါ',
        'ဥပဒေရေးရာ အခွင့်အရေးများနှင့် အငြင်းပွားမှုများတွင် ကူညီပါ',
        'ခရီးသွားနှင့် ငွေလွှဲဝန်ဆောင်မှုများအကြောင်း လမ်းညွှန်ပါ'
      ]
    }
  }
};
