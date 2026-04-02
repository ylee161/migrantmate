import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, DollarSign, Clock, FileText, AlertCircle, Users, Scale, Heart, MessageCircle } from 'lucide-react';
import { LanguageCode } from '../translations';

interface LearnMyRightsPageProps {
  currentLang: LanguageCode;
}

interface Right {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
}

const translations: Record<LanguageCode, {
  backButton: string;
  title: string;
  subtitle: string;
  learnMoreButton: string;
  rights: {
    fairWages: { title: string; description: string };
    workingHours: { title: string; description: string };
    writtenContract: { title: string; description: string };
    safeWorkplace: { title: string; description: string };
    medicalCare: { title: string; description: string };
    restDays: { title: string; description: string };
    legalProtection: { title: string; description: string };
    noDiscrimination: { title: string; description: string };
  };
}> = {
  en: {
    backButton: 'Back to Help',
    title: 'Your Rights as a Migrant Worker',
    subtitle: 'Know your rights and protect yourself',
    learnMoreButton: 'Want to Learn More?',
    rights: {
      fairWages: {
        title: 'Fair Wages',
        description: 'You have the right to receive your full salary on time, without illegal deductions.'
      },
      workingHours: {
        title: 'Regulated Working Hours',
        description: 'Your working hours should not exceed legal limits, and overtime must be compensated.'
      },
      writtenContract: {
        title: 'Written Employment Contract',
        description: 'You must receive a written contract in a language you understand before starting work.'
      },
      safeWorkplace: {
        title: 'Safe Working Conditions',
        description: 'Your employer must provide a safe workplace with proper equipment and training.'
      },
      medicalCare: {
        title: 'Access to Medical Care',
        description: 'You have the right to medical treatment and should have health insurance coverage.'
      },
      restDays: {
        title: 'Rest Days & Leave',
        description: 'You are entitled to weekly rest days, public holidays, and annual leave.'
      },
      legalProtection: {
        title: 'Legal Protection',
        description: 'You can seek help from authorities if your rights are violated without fear of retaliation.'
      },
      noDiscrimination: {
        title: 'Freedom from Discrimination',
        description: 'You should be treated fairly regardless of nationality, race, religion, or gender.'
      }
    }
  },
  zh: {
    backButton: '返回',
    title: '您作为移民工人的权利',
    subtitle: '了解您的权利并保护自己',
    learnMoreButton: '想了解更多？',
    rights: {
      fairWages: {
        title: '公平工资',
        description: '您有权按时获得全额工资，不得非法扣除。'
      },
      workingHours: {
        title: '规定工作时间',
        description: '您的工作时间不应超过法定限制，加班必须获得补偿。'
      },
      writtenContract: {
        title: '书面雇佣合同',
        description: '开始工作前，您必须收到一份您能理解的语言的书面合同。'
      },
      safeWorkplace: {
        title: '安全工作条件',
        description: '您的雇主必须提供配备适当设备和培训的安全工作场所。'
      },
      medicalCare: {
        title: '获得医疗护理',
        description: '您有权获得医疗治疗，并应有健康保险。'
      },
      restDays: {
        title: '休息日和假期',
        description: '您有权享受每周休息日、公共假期和年假。'
      },
      legalProtection: {
        title: '法律保护',
        description: '如果您的权利受到侵犯，您可以向当局寻求帮助，无需担心报复。'
      },
      noDiscrimination: {
        title: '免受歧视',
        description: '无论国籍、种族、宗教或性别，您都应受到公平对待。'
      }
    }
  },
  ms: {
    backButton: 'Kembali',
    title: 'Hak Anda sebagai Pekerja Migran',
    subtitle: 'Ketahui hak anda dan lindungi diri anda',
    learnMoreButton: 'Ingin Tahu Lebih Lanjut?',
    rights: {
      fairWages: {
        title: 'Gaji yang Adil',
        description: 'Anda berhak menerima gaji penuh tepat pada waktunya, tanpa potongan haram.'
      },
      workingHours: {
        title: 'Waktu Kerja Terkawal',
        description: 'Waktu kerja anda tidak boleh melebihi had undang-undang, dan kerja lebih masa mesti diberi pampasan.'
      },
      writtenContract: {
        title: 'Kontrak Pekerjaan Bertulis',
        description: 'Anda mesti menerima kontrak bertulis dalam bahasa yang anda faham sebelum mula bekerja.'
      },
      safeWorkplace: {
        title: 'Keadaan Kerja Selamat',
        description: 'Majikan anda mesti menyediakan tempat kerja yang selamat dengan peralatan dan latihan yang sesuai.'
      },
      medicalCare: {
        title: 'Akses kepada Rawatan Perubatan',
        description: 'Anda berhak mendapat rawatan perubatan dan harus mempunyai perlindungan insurans kesihatan.'
      },
      restDays: {
        title: 'Hari Rehat & Cuti',
        description: 'Anda berhak mendapat hari rehat mingguan, cuti umum, dan cuti tahunan.'
      },
      legalProtection: {
        title: 'Perlindungan Undang-undang',
        description: 'Anda boleh mendapatkan bantuan daripada pihak berkuasa jika hak anda dilanggar tanpa rasa takut akan tindakan balas.'
      },
      noDiscrimination: {
        title: 'Bebas daripada Diskriminasi',
        description: 'Anda harus dilayan dengan adil tanpa mengira kewarganegaraan, bangsa, agama, atau jantina.'
      }
    }
  },
  ta: {
    backButton: 'பின்செல்',
    title: 'புலம்பெயர்ந்த தொழிலாளியாக உங்கள் உரிமைகள்',
    subtitle: 'உங்கள் உரிமைகளை அறிந்து உங்களைப் பாதுகாத்துக் கொள்ளுங்கள்',
    learnMoreButton: 'மேலும் அறிய விரும்புகிறீர்களா?',
    rights: {
      fairWages: {
        title: 'நியாயமான ஊதியம்',
        description: 'சட்டவிரோத கழிவுகள் இல்லாமல், சரியான நேரத்தில் உங்கள் முழு சம்பளத்தையும் பெற உங்களுக்கு உரிமை உண்டு.'
      },
      workingHours: {
        title: 'ஒழுங்குபடுத்தப்பட்ட வேலை நேரம்',
        description: 'உங்கள் வேலை நேரம் சட்ட வரம்புகளை மீறக்கூடாது, மேலும் கூடுதல் நேர வேலைக்கு ஊதியம் வழங்கப்பட வேண்டும்.'
      },
      writtenContract: {
        title: 'எழுத்துப்பூர்வ வேலை ஒப்பந்தம்',
        description: 'வேலை தொடங்கும் முன் நீங்கள் புரிந்துகொள்ளும் மொழியில் எழுத்துப்பூர்வ ஒப்பந்தத்தைப் பெற வேண்டும்.'
      },
      safeWorkplace: {
        title: 'பாதுகாப்பான பணி சூழல்',
        description: 'உங்கள் முதலாளி சரியான உபகரணங்கள் மற்றும் பயிற்சியுடன் பாதுகாப்பான பணியிடத்தை வழங்க வேண்டும்.'
      },
      medicalCare: {
        title: 'மருத்துவ பராமரிப்பு அணுகல்',
        description: 'மருத்துவ சிகிச்சை பெற உங்களுக்கு உரிமை உண்டு மற்றும் சுகாதார காப்பீடு இருக்க வேண்டும்.'
      },
      restDays: {
        title: 'ஓய்வு நாட்கள் & விடுப்பு',
        description: 'வாராந்திர ஓய்வு நாட்கள், பொது விடுமுறைகள் மற்றும் வருடாந்திர விடுப்புக்கு நீங்கள் தகுதியுடையவர்.'
      },
      legalProtection: {
        title: 'சட்ட பாதுகாப்பு',
        description: 'உங்கள் உரிமைகள் மீறப்பட்டால், பதிலடி பயம் இல்லாமல் அதிகாரிகளிடம் உதவி கேட்கலாம்.'
      },
      noDiscrimination: {
        title: 'பாகுபாடு இல்லாத சுதந்திரம்',
        description: 'தேசியம், இனம், மதம் அல்லது பாலினம் பொருட்படுத்தாமல் நீங்கள் நியாயமாக நடத்தப்பட வேண்டும்.'
      }
    }
  },
  bn: {
    backButton: 'ফিরে যান',
    title: 'অভিবাসী শ্রমিক হিসাবে আপনার অধিকার',
    subtitle: 'আপনার অধিকার জানুন এবং নিজেকে রক্ষা করুন',
    learnMoreButton: 'আরও জানতে চান?',
    rights: {
      fairWages: {
        title: 'ন্যায্য মজুরি',
        description: 'অবৈধ কর্তন ছাড়াই সময়মতো আপনার সম্পূর্ণ বেতন পাওয়ার অধিকার আপনার আছে।'
      },
      workingHours: {
        title: 'নিয়ন্ত্রিত কাজের সময়',
        description: 'আপনার কাজের সময় আইনি সীমা অতিক্রম করা উচিত নয়, এবং অতিরিক্ত সময়ের জন্য ক্ষতিপূরণ দিতে হবে।'
      },
      writtenContract: {
        title: 'লিখিত চাকরির চুক্তি',
        description: 'কাজ শুরু করার আগে আপনাকে অবশ্যই আপনার বোঝার ভাষায় একটি লিখিত চুক্তি পেতে হবে।'
      },
      safeWorkplace: {
        title: 'নিরাপদ কাজের পরিবেশ',
        description: 'আপনার নিয়োগকর্তাকে অবশ্যই যথাযথ সরঞ্জাম এবং প্রশিক্ষণ সহ একটি নিরাপদ কর্মক্ষেত্র প্রদান করতে হবে।'
      },
      medicalCare: {
        title: 'চিকিৎসা সেবার অ্যাক্সেস',
        description: 'চিকিৎসা পাওয়ার অধিকার আপনার আছে এবং স্বাস্থ্য বীমা থাকা উচিত।'
      },
      restDays: {
        title: 'বিশ্রামের দিন ও ছুটি',
        description: 'আপনি সাপ্তাহিক বিশ্রামের দিন, সরকারি ছুটি এবং বার্ষিক ছুটি পাওয়ার অধিকারী।'
      },
      legalProtection: {
        title: 'আইনি সুরক্ষা',
        description: 'আপনার অধিকার লঙ্ঘিত হলে প্রতিশোধের ভয় ছাড়াই কর্তৃপক্ষের কাছে সাহায্য চাইতে পারেন।'
      },
      noDiscrimination: {
        title: 'বৈষম্য থেকে মুক্তি',
        description: 'জাতীয়তা, জাতি, ধর্ম বা লিঙ্গ নির্বিশেষে আপনার সাথে ন্যায্য আচরণ করা উচিত।'
      }
    }
  },
  hi: {
    backButton: 'वापस',
    title: 'प्रवासी कर्मचारी के रूप में आपके अधिकार',
    subtitle: 'अपने अधिकारों को जानें और खुद को सुरक्षित रखें',
    learnMoreButton: 'और जानना चाहते हैं?',
    rights: {
      fairWages: {
        title: 'उचित वेतन',
        description: 'अवैध कटौती के बिना समय पर अपना पूरा वेतन प्राप्त करने का अधिकार आपको है।'
      },
      workingHours: {
        title: 'नियमित कार्य घंटे',
        description: 'आपके कार्य घंटे कानूनी सीमा से अधिक नहीं होने चाहिए, और ओवरटाइम के लिए मुआवजा दिया जाना चाहिए।'
      },
      writtenContract: {
        title: 'लिखित रोजगार अनुबंध',
        description: 'काम शुरू करने से पहले आपको अपनी समझ की भाषा में एक लिखित अनुबंध प्राप्त करना होगा।'
      },
      safeWorkplace: {
        title: 'सुरक्षित कार्य स्थितियां',
        description: 'आपके नियोक्ता को उचित उपकरण और प्रशिक्षण के साथ एक सुरक्षित कार्यस्थल प्रदान करना चाहिए।'
      },
      medicalCare: {
        title: 'चिकित्सा देखभाल की पहुंच',
        description: 'चिकित्सा उपचार प्राप्त करने का अधिकार आपको है और स्वास्थ्य बीमा होना चाहिए।'
      },
      restDays: {
        title: 'आराम के दिन और छुट्टी',
        description: 'आप साप्ताहिक आराम के दिन, सार्वजनिक छुट्टियों और वार्षिक छुट्टी के हकदार हैं।'
      },
      legalProtection: {
        title: 'कानूनी सुरक्षा',
        description: 'यदि आपके अधिकारों का उल्लंघन होता है तो आप प्रतिशोध के डर के बिना अधिकारियों से मदद मांग सकते हैं।'
      },
      noDiscrimination: {
        title: 'भेदभाव से मुक्ति',
        description: 'राष्ट्रीयता, जाति, धर्म या लिंग की परवाह किए बिना आपके साथ निष्पक्ष व्यवहार किया जाना चाहिए।'
      }
    }
  },
  th: {
    backButton: 'กลับ',
    title: 'สิทธิของคุณในฐานะแรงงานข้ามชาติ',
    subtitle: 'รู้สิทธิของคุณและปกป้องตัวเอง',
    learnMoreButton: 'ต้องการเรียนรู้เพิ่มเติม?',
    rights: {
      fairWages: {
        title: 'ค่าจ้างที่เป็นธรรม',
        description: 'คุณมีสิทธิ์ได้รับเงินเดือนเต็มจำนวนตรงเวลาโดยไม่มีการหักเงินที่ผิดกฎหมาย'
      },
      workingHours: {
        title: 'ชั่วโมงการทำงานที่กำหนด',
        description: 'ชั่วโมงการทำงานของคุณไม่ควรเกินขอบเขตทางกฎหมาย และต้องได้รับค่าตอบแทนสำหรับการทำงานล่วงเวลา'
      },
      writtenContract: {
        title: 'สัญญาจ้างงานเป็นลายลักษณ์อักษร',
        description: 'คุณต้องได้รับสัญญาเป็นลายลักษณ์อักษรในภาษาที่คุณเข้าใจก่อนเริ่มทำงาน'
      },
      safeWorkplace: {
        title: 'สภาพการทำงานที่ปลอดภัย',
        description: 'นายจ้างของคุณต้องจัดหาสถานที่ทำงานที่ปลอดภัยพร้อมอุปกรณ์และการฝึกอบรมที่เหมาะสม'
      },
      medicalCare: {
        title: 'การเข้าถึงการดูแลทางการแพทย์',
        description: 'คุณมีสิทธิ์ได้รับการรักษาพยาบาลและควรมีประกันสุขภาพ'
      },
      restDays: {
        title: 'วันหยุดและการลา',
        description: 'คุณมีสิทธิ์ได้รับวันหยุดประจำสัปดาห์ วันหยุดนักขัตฤกษ์ และวันลาพักร้อนประจำปี'
      },
      legalProtection: {
        title: 'การคุ้มครองทางกฎหมาย',
        description: 'คุณสามารถขอความช่วยเหลือจากหน่วยงานราชการหากสิทธิของคุณถูกละเมิดโดยไม่ต้องกลัวการตอบโต้'
      },
      noDiscrimination: {
        title: 'เสรีภาพจากการเลือกปฏิบัติ',
        description: 'คุณควรได้รับการปฏิบัติอย่างเป็นธรรมโดยไม่คำนึงถึงสัญชาติ เชื้อชาติ ศาสนา หรือเพศ'
      }
    }
  },
  vi: {
    backButton: 'Quay lại',
    title: 'Quyền Của Bạn Với Tư Cách Là Lao Động Di Cư',
    subtitle: 'Biết quyền của bạn và bảo vệ bản thân',
    learnMoreButton: 'Muốn Tìm Hiểu Thêm?',
    rights: {
      fairWages: {
        title: 'Tiền Lương Công Bằng',
        description: 'Bạn có quyền nhận đủ lương đúng hạn mà không bị khấu trừ bất hợp pháp.'
      },
      workingHours: {
        title: 'Giờ Làm Việc Được Quy Định',
        description: 'Giờ làm việc của bạn không được vượt quá giới hạn pháp luật và làm thêm giờ phải được trả công.'
      },
      writtenContract: {
        title: 'Hợp Đồng Lao Động Bằng Văn Bản',
        description: 'Bạn phải nhận được hợp đồng bằng văn bản bằng ngôn ngữ bạn hiểu trước khi bắt đầu làm việc.'
      },
      safeWorkplace: {
        title: 'Điều Kiện Làm Việc An Toàn',
        description: 'Người sử dụng lao động phải cung cấp nơi làm việc an toàn với thiết bị và đào tạo phù hợp.'
      },
      medicalCare: {
        title: 'Tiếp Cận Chăm Sóc Y Tế',
        description: 'Bạn có quyền được điều trị y tế và nên có bảo hiểm y tế.'
      },
      restDays: {
        title: 'Ngày Nghỉ & Nghỉ Phép',
        description: 'Bạn được hưởng ngày nghỉ hàng tuần, ngày lễ và nghỉ phép hàng năm.'
      },
      legalProtection: {
        title: 'Bảo Vệ Pháp Lý',
        description: 'Bạn có thể tìm kiếm sự giúp đỡ từ cơ quan chức năng nếu quyền của bạn bị vi phạm mà không sợ bị trả thù.'
      },
      noDiscrimination: {
        title: 'Tự Do Khỏi Phân Biệt Đối Xử',
        description: 'Bạn nên được đối xử công bằng bất kể quốc tịch, chủng tộc, tôn giáo hay giới tính.'
      }
    }
  },
  id: {
    backButton: 'Kembali',
    title: 'Hak Anda sebagai Pekerja Migran',
    subtitle: 'Ketahui hak Anda dan lindungi diri Anda',
    learnMoreButton: 'Ingin Tahu Lebih Banyak?',
    rights: {
      fairWages: {
        title: 'Upah yang Adil',
        description: 'Anda berhak menerima gaji penuh tepat waktu tanpa pemotongan ilegal.'
      },
      workingHours: {
        title: 'Jam Kerja yang Diatur',
        description: 'Jam kerja Anda tidak boleh melebihi batas hukum, dan lembur harus diberi kompensasi.'
      },
      writtenContract: {
        title: 'Kontrak Kerja Tertulis',
        description: 'Anda harus menerima kontrak tertulis dalam bahasa yang Anda pahami sebelum mulai bekerja.'
      },
      safeWorkplace: {
        title: 'Kondisi Kerja yang Aman',
        description: 'Pemberi kerja Anda harus menyediakan tempat kerja yang aman dengan peralatan dan pelatihan yang tepat.'
      },
      medicalCare: {
        title: 'Akses ke Perawatan Medis',
        description: 'Anda berhak mendapat perawatan medis dan harus memiliki asuransi kesehatan.'
      },
      restDays: {
        title: 'Hari Istirahat & Cuti',
        description: 'Anda berhak mendapat hari istirahat mingguan, hari libur nasional, dan cuti tahunan.'
      },
      legalProtection: {
        title: 'Perlindungan Hukum',
        description: 'Anda dapat mencari bantuan dari pihak berwenang jika hak Anda dilanggar tanpa takut pembalasan.'
      },
      noDiscrimination: {
        title: 'Bebas dari Diskriminasi',
        description: 'Anda harus diperlakukan secara adil tanpa memandang kewarganegaraan, ras, agama, atau jenis kelamin.'
      }
    }
  },
  tl: {
    backButton: 'Bumalik',
    title: 'Ang Inyong mga Karapatan bilang Migrant Worker',
    subtitle: 'Alamin ang inyong mga karapatan at protektahan ang inyong sarili',
    learnMoreButton: 'Gusto Ninyong Matuto ng Higit Pa?',
    rights: {
      fairWages: {
        title: 'Patas na Sahod',
        description: 'May karapatan kayong makatanggap ng buong sahod sa tamang oras, nang walang ilegal na bawas.'
      },
      workingHours: {
        title: 'Reguladong Oras ng Trabaho',
        description: 'Ang inyong oras ng trabaho ay hindi dapat lumampas sa legal na limitasyon, at ang overtime ay dapat bayaran.'
      },
      writtenContract: {
        title: 'Nakasulat na Kontrata sa Trabaho',
        description: 'Dapat kayong makatanggap ng nakasulat na kontrata sa wikang inyong nauunawaan bago magsimula ng trabaho.'
      },
      safeWorkplace: {
        title: 'Ligtas na Kondisyon sa Trabaho',
        description: 'Ang inyong employer ay dapat magbigay ng ligtas na lugar ng trabaho na may tamang kagamitan at pagsasanay.'
      },
      medicalCare: {
        title: 'Access sa Medikal na Pag-aalaga',
        description: 'May karapatan kayong sa medikal na paggamot at dapat may health insurance coverage.'
      },
      restDays: {
        title: 'Araw ng Pahinga at Leave',
        description: 'May karapatan kayo sa lingguhang araw ng pahinga, pampublikong holiday, at taunang leave.'
      },
      legalProtection: {
        title: 'Legal na Proteksyon',
        description: 'Maaari kayong humingi ng tulong sa mga awtoridad kung ang inyong mga karapatan ay nilabag nang walang takot sa paghihiganti.'
      },
      noDiscrimination: {
        title: 'Kalayaan mula sa Diskriminasyon',
        description: 'Dapat kayong tratuhin nang patas anuman ang nasyonalidad, lahi, relihiyon, o kasarian.'
      }
    }
  },
  my: {
    backButton: 'နောက်သို့',
    title: 'ရွှေ့ပြောင်းအလုပ်သမားအနေဖြင့် သင်၏အခွင့်အရေးများ',
    subtitle: 'သင်၏အခွင့်အရေးများကို သိရှိပြီး သင့်ကိုယ်သင် ကာကွယ်ပါ',
    learnMoreButton: 'ပိုမိုလေ့လာလိုပါသလား?',
    rights: {
      fairWages: {
        title: 'တရားမျှတသော လုပ်ခ',
        description: 'တရားမဝင် နုတ်ယူမှုများမရှိဘဲ အချိန်မီ သင်၏ လုပ်ခအပြည့်အစုံကို ရယူပိုင်ခွင့် သင့်တွင်ရှိသည်။'
      },
      workingHours: {
        title: 'စည်းမျဉ်းသတ်မှတ်ထားသော အလုပ်ချိန်',
        description: 'သင်၏အလုပ်ချိန်သည် ဥပဒေကန့်သတ်ချက်ကို မကျော်လွန်သင့်ဘဲ၊ အချိန်ပို လုပ်ငန်းအတွက် လျော်ကြေးပေးရမည်။'
      },
      writtenContract: {
        title: 'စာဖြင့်ရေးသား အလုပ်စာချုပ်',
        description: 'အလုပ်မစတင်မီ သင်နားလည်သော ဘာသာစကားဖြင့် စာဖြင့်ရေးသား စာချုပ်ကို သင်ရရှိရမည်။'
      },
      safeWorkplace: {
        title: 'ဘေးကင်းသော အလုပ်ခွင်အခြေအနေများ',
        description: 'သင်၏အလုပ်ရှင်သည် သင့်လျော်သော ကိရိယာများနှင့် လေ့ကျင့်မှုများပါသော ဘေးကင်းသော အလုပ်ခွင်ကို ပံ့ပိုးပေးရမည်။'
      },
      medicalCare: {
        title: 'ဆေးဝါးကုသမှု ရယူခွင့်',
        description: 'ဆေးဝါးကုသမှု ရယူပိုင်ခွင့် သင့်တွင်ရှိပြီး ကျန်းမာရေးအာမခံ ရှိသင့်သည်။'
      },
      restDays: {
        title: 'အနားယူရက်များနှင့် ခွင့်',
        description: 'သင်သည် အပတ်စဉ် အနားယူရက်များ၊ အများပြည်သူ အားလပ်ရက်များနှင့် နှစ်စဉ်ခွင့်များ ရပိုင်ခွင့်ရှိသည်။'
      },
      legalProtection: {
        title: 'ဥပဒေရေးရာ ကာကွယ်မှု',
        description: 'သင်၏အခွင့်အရေးများ ချိုးဖောက်ခံရပါက တုံ့ပြန်မှု ကြောက်ရွံ့စရာမရှိဘဲ အာဏာပိုင်များထံမှ အကူအညီ ရှာဖွေနိုင်သည်။'
      },
      noDiscrimination: {
        title: 'ခွဲခြားဆက်ဆံမှုမှ လွတ်ကင်းခွင့်',
        description: 'နိုင်ငံသား၊ လူမျိုး၊ ဘာသာ သို့မဟုတ် ကျား/မ မခွဲခြားဘဲ သင့်အား တရားမျှတစွာ ဆက်ဆံသင့်သည်။'
      }
    }
  }
};

export function LearnMyRightsPage({ currentLang }: LearnMyRightsPageProps) {
  const navigate = useNavigate();
  const t = translations[currentLang];

  const rights: Right[] = [
    {
      icon: DollarSign,
      title: t.rights.fairWages.title,
      description: t.rights.fairWages.description,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Clock,
      title: t.rights.workingHours.title,
      description: t.rights.workingHours.description,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: FileText,
      title: t.rights.writtenContract.title,
      description: t.rights.writtenContract.description,
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      icon: Shield,
      title: t.rights.safeWorkplace.title,
      description: t.rights.safeWorkplace.description,
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      icon: Heart,
      title: t.rights.medicalCare.title,
      description: t.rights.medicalCare.description,
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Users,
      title: t.rights.restDays.title,
      description: t.rights.restDays.description,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Scale,
      title: t.rights.legalProtection.title,
      description: t.rights.legalProtection.description,
      gradient: 'from-slate-600 to-slate-800'
    },
    {
      icon: AlertCircle,
      title: t.rights.noDiscrimination.title,
      description: t.rights.noDiscrimination.description,
      gradient: 'from-red-500 to-rose-600'
    }
  ];

  const handleLearnMore = () => {
    navigate('/chatbot', { 
      state: { 
        autoSendQuery: 'Tell me more about the legal rights of migrant workers in Singapore'
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Header */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 via-transparent to-green-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<button
          onClick={() => navigate('/help')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backButton}</span>
        </button>

          <div className="text-center mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              {t.title}
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Rights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {rights.map((right, index) => {
            const Icon = right.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-slate-100"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${right.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {right.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {right.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learn More Button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center">
          <button
            onClick={handleLearnMore}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-bold text-lg"
          >
            <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            {t.learnMoreButton}
          </button>
        </div>
      </section>
    </div>
  );
}
