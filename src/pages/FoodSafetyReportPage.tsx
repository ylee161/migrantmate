import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, AlertTriangle, Mail, Edit3, Send, Loader2, CheckCircle, Info } from 'lucide-react';
import { useState, useRef } from 'react';
import { LanguageCode } from '../translations';
import { generateFoodSafetyEmail } from '../services/foodSafetyEmailService';

interface FoodSafetyReportPageProps {
  currentLang: LanguageCode;
}

interface PageTranslations {
  backButton: string;
  title: string;
  subtitle: string;
  importantNotice: {
    title: string;
    imageIncluded: string;
    recipient: string;
    recipientEmail: string;
  };
  uploadSection: {
    title: string;
    description: string;
    uploadButton: string;
    takePhoto: string;
    dragDrop: string;
    fileSelected: string;
  };
  descriptionSection: {
    title: string;
    placeholder: string;
    label: string;
  };
  locationSection: {
    title: string;
    placeholder: string;
    label: string;
  };
  generateButton: string;
  emailSection: {
    title: string;
    description: string;
    editPrompt: string;
    sendButton: string;
    generating: string;
  };
  success: {
    title: string;
    message: string;
    backButton: string;
  };
  errors: {
    noPhoto: string;
    noDescription: string;
    noLocation: string;
    generationFailed: string;
    sendFailed: string;
  };
}

const translations: Record<LanguageCode, PageTranslations> = {
  en: {
    backButton: 'Back to Home',
    title: 'Food Safety Report',
    subtitle: 'Report food safety concerns with photo evidence',
    importantNotice: {
      title: 'Important Information',
      imageIncluded: 'Your uploaded photo will be included in the email report',
      recipient: 'This report will be sent to',
      recipientEmail: 'foodincident@sfa.gov.sg (Singapore Food Agency)'
    },
    uploadSection: {
      title: 'Upload Photo Evidence',
      description: 'Take a clear photo of the food safety issue',
      uploadButton: 'Choose Photo',
      takePhoto: 'Take Photo',
      dragDrop: 'or drag and drop here',
      fileSelected: 'Photo selected'
    },
    descriptionSection: {
      title: 'Describe the Issue',
      placeholder: 'Please describe what you observed, including details about the food, location, date, and any health concerns...',
      label: 'Issue Description'
    },
    locationSection: {
      title: 'Location Details',
      placeholder: 'Enter the exact location (restaurant name, address, stall number, etc.)',
      label: 'Location'
    },
    generateButton: 'Generate Report Email',
    emailSection: {
      title: 'Review & Edit Email',
      description: 'Review the generated email and make any changes before sending',
      editPrompt: 'You can edit the email content below',
      sendButton: 'Send Report',
      generating: 'Generating email...'
    },
    success: {
      title: 'Report Sent Successfully!',
      message: 'Your food safety report has been submitted to the authorities. They will review your case and take appropriate action.',
      backButton: 'Back to Help'
    },
    errors: {
      noPhoto: 'Please upload a photo of the food safety issue',
      noDescription: 'Please describe the issue',
      noLocation: 'Please provide the location details',
      generationFailed: 'Failed to generate email. Please try again.',
      sendFailed: 'Failed to send report. Please try again.'
    }
  },
  zh: {
    backButton: '返回',
    title: '食品安全报告',
    subtitle: '通过照片证据报告食品安全问题',
    importantNotice: {
      title: '重要信息',
      imageIncluded: '您上传的照片将包含在电子邮件报告中',
      recipient: '此报告将发送至',
      recipientEmail: 'foodincident@sfa.gov.sg（新加坡食品局）'
    },
    uploadSection: {
      title: '上传照片证据',
      description: '拍摄食品安全问题的清晰照片',
      uploadButton: '选择照片',
      takePhoto: '拍照',
      dragDrop: '或拖放到此处',
      fileSelected: '已选择照片'
    },
    descriptionSection: {
      title: '描述问题',
      placeholder: '请描述您观察到的情况，包括食物、地点、日期和任何健康问题的详细信息...',
      label: '问题描述'
    },
    locationSection: {
      title: '地点详情',
      placeholder: '输入确切位置（餐厅名称、地址、摊位号等）',
      label: '地点'
    },
    generateButton: '生成报告电子邮件',
    emailSection: {
      title: '审查和编辑电子邮件',
      description: '在发送之前审查生成的电子邮件并进行任何更改',
      editPrompt: '您可以在下面编辑电子邮件内容',
      sendButton: '发送报告',
      generating: '正在生成电子邮件...'
    },
    success: {
      title: '报告发送成功！',
      message: '您的食品安全报告已提交给当局。他们将审查您的案件并采取适当行动。',
      backButton: '返回帮助'
    },
    errors: {
      noPhoto: '请上传食品安全问题的照片',
      noDescription: '请描述问题',
      noLocation: '请提供地点详情',
      generationFailed: '生成电子邮件失败。请重试。',
      sendFailed: '发送报告失败。请重试。'
    }
  },
  ms: {
    backButton: 'Kembali',
    title: 'Laporan Keselamatan Makanan',
    subtitle: 'Laporkan kebimbangan keselamatan makanan dengan bukti foto',
    importantNotice: {
      title: 'Maklumat Penting',
      imageIncluded: 'Foto yang anda muat naik akan disertakan dalam laporan e-mel',
      recipient: 'Laporan ini akan dihantar kepada',
      recipientEmail: 'foodincident@sfa.gov.sg (Agensi Makanan Singapura)'
    },
    uploadSection: {
      title: 'Muat Naik Bukti Foto',
      description: 'Ambil foto yang jelas tentang isu keselamatan makanan',
      uploadButton: 'Pilih Foto',
      takePhoto: 'Ambil Foto',
      dragDrop: 'atau seret dan lepas di sini',
      fileSelected: 'Foto dipilih'
    },
    descriptionSection: {
      title: 'Huraikan Isu',
      placeholder: 'Sila huraikan apa yang anda perhatikan, termasuk butiran tentang makanan, lokasi, tarikh, dan sebarang kebimbangan kesihatan...',
      label: 'Penerangan Isu'
    },
    locationSection: {
      title: 'Butiran Lokasi',
      placeholder: 'Masukkan lokasi tepat (nama restoran, alamat, nombor gerai, dll.)',
      label: 'Lokasi'
    },
    generateButton: 'Jana E-mel Laporan',
    emailSection: {
      title: 'Semak & Edit E-mel',
      description: 'Semak e-mel yang dijana dan buat sebarang perubahan sebelum menghantar',
      editPrompt: 'Anda boleh mengedit kandungan e-mel di bawah',
      sendButton: 'Hantar Laporan',
      generating: 'Menjana e-mel...'
    },
    success: {
      title: 'Laporan Berjaya Dihantar!',
      message: 'Laporan keselamatan makanan anda telah diserahkan kepada pihak berkuasa. Mereka akan menyemak kes anda dan mengambil tindakan yang sesuai.',
      backButton: 'Kembali ke Bantuan'
    },
    errors: {
      noPhoto: 'Sila muat naik foto isu keselamatan makanan',
      noDescription: 'Sila huraikan isu',
      noLocation: 'Sila berikan butiran lokasi',
      generationFailed: 'Gagal menjana e-mel. Sila cuba lagi.',
      sendFailed: 'Gagal menghantar laporan. Sila cuba lagi.'
    }
  },
  ta: {
    backButton: 'பின்செல்',
    title: 'உணவு பாதுகாப்பு அறிக்கை',
    subtitle: 'புகைப்பட ஆதாரத்துடன் உணவு பாதுகாப்பு கவலைகளை தெரிவிக்கவும்',
    importantNotice: {
      title: 'முக்கியமான தகவல்',
      imageIncluded: 'நீங்கள் பதிவேற்றிய புகைப்படம் மின்னஞ்சல் அறிக்கையில் சேர்க்கப்படும்',
      recipient: 'இந்த அறிக்கை அனுப்பப்படும்',
      recipientEmail: 'foodincident@sfa.gov.sg (சிங்கப்பூர் உணவு நிறுவனம்)'
    },
    uploadSection: {
      title: 'புகைப்பட ஆதாரத்தை பதிவேற்றவும்',
      description: 'உணவு பாதுகாப்பு பிரச்சினையின் தெளிவான புகைப்படத்தை எடுக்கவும்',
      uploadButton: 'புகைப்படத்தைத் தேர்ந்தெடுக்கவும்',
      takePhoto: 'புகைப்படம் எடுக்கவும்',
      dragDrop: 'அல்லது இங்கே இழுத்து விடவும்',
      fileSelected: 'புகைப்படம் தேர்ந்தெடுக்கப்பட்டது'
    },
    descriptionSection: {
      title: 'பிரச்சினையை விவரிக்கவும்',
      placeholder: 'நீங்கள் கவனித்ததை விவரிக்கவும், உணவு, இடம், தேதி மற்றும் ஏதேனும் சுகாதார கவலைகள் பற்றிய விவரங்கள் உட்பட...',
      label: 'பிரச்சினை விளக்கம்'
    },
    locationSection: {
      title: 'இட விவரங்கள்',
      placeholder: 'சரியான இடத்தை உள்ளிடவும் (உணவகம் பெயர், முகவரி, கடை எண், போன்றவை)',
      label: 'இடம்'
    },
    generateButton: 'அறிக்கை மின்னஞ்சலை உருவாக்கவும்',
    emailSection: {
      title: 'மின்னஞ்சலை மதிப்பாய்வு செய்து திருத்தவும்',
      description: 'உருவாக்கப்பட்ட மின்னஞ்சலை மதிப்பாய்வு செய்து அனுப்புவதற்கு முன் ஏதேனும் மாற்றங்களைச் செய்யவும்',
      editPrompt: 'கீழே மின்னஞ்சல் உள்ளடக்கத்தை திருத்தலாம்',
      sendButton: 'அறிக்கையை அனுப்பவும்',
      generating: 'மின்னஞ்சல் உருவாக்கப்படுகிறது...'
    },
    success: {
      title: 'அறிக்கை வெற்றிகரமாக அனுப்பப்பட்டது!',
      message: 'உங்கள் உணவு பாதுகாப்பு அறிக்கை அதிகாரிகளுக்கு சமர்ப்பிக்கப்பட்டுள்ளது. அவர்கள் உங்கள் வழக்கை மதிப்பாய்வு செய்து பொருத்தமான நடவடிக்கை எடுப்பார்கள்.',
      backButton: 'உதவிக்கு திரும்பு'
    },
    errors: {
      noPhoto: 'உணவு பாதுகாப்பு பிரச்சினையின் புகைப்படத்தை பதிவேற்றவும்',
      noDescription: 'பிரச்சினையை விவரிக்கவும்',
      noLocation: 'இட விவரங்களை வழங்கவும்',
      generationFailed: 'மின்னஞ்சல் உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      sendFailed: 'அறிக்கையை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.'
    }
  },
  bn: {
    backButton: 'ফিরে যান',
    title: 'খাদ্য নিরাপত্তা রিপোর্ট',
    subtitle: 'ছবির প্রমাণ সহ খাদ্য নিরাপত্তা উদ্বেগ রিপোর্ট করুন',
    importantNotice: {
      title: 'গুরুত্বপূর্ণ তথ্য',
      imageIncluded: 'আপনার আপলোড করা ছবি ইমেল রিপোর্টে অন্তর্ভুক্ত করা হবে',
      recipient: 'এই রিপোর্ট পাঠানো হবে',
      recipientEmail: 'foodincident@sfa.gov.sg (সিঙ্গাপুর খাদ্য সংস্থা)'
    },
    uploadSection: {
      title: 'ছবির প্রমাণ আপলোড করুন',
      description: 'খাদ্য নিরাপত্তা সমস্যার একটি স্পষ্ট ছবি তুলুন',
      uploadButton: 'ছবি নির্বাচন করুন',
      takePhoto: 'ছবি তুলুন',
      dragDrop: 'বা এখানে টেনে আনুন',
      fileSelected: 'ছবি নির্বাচিত'
    },
    descriptionSection: {
      title: 'সমস্যা বর্ণনা করুন',
      placeholder: 'আপনি যা পর্যবেক্ষণ করেছেন তা বর্ণনা করুন, খাবার, অবস্থান, তারিখ এবং কোনো স্বাস্থ্য উদ্বেগ সম্পর্কে বিস্তারিত সহ...',
      label: 'সমস্যা বিবরণ'
    },
    locationSection: {
      title: 'অবস্থান বিবরণ',
      placeholder: 'সঠিক অবস্থান লিখুন (রেস্তোরাঁর নাম, ঠিকানা, স্টল নম্বর, ইত্যাদি)',
      label: 'অবস্থান'
    },
    generateButton: 'রিপোর্ট ইমেল তৈরি করুন',
    emailSection: {
      title: 'ইমেল পর্যালোচনা ও সম্পাদনা করুন',
      description: 'পাঠানোর আগে তৈরি করা ইমেল পর্যালোচনা করুন এবং কোনো পরিবর্তন করুন',
      editPrompt: 'আপনি নীচে ইমেল বিষয়বস্তু সম্পাদনা করতে পারেন',
      sendButton: 'রিপোর্ট পাঠান',
      generating: 'ইমেল তৈরি হচ্ছে...'
    },
    success: {
      title: 'রিপোর্ট সফলভাবে পাঠানো হয়েছে!',
      message: 'আপনার খাদ্য নিরাপত্তা রিপোর্ট কর্তৃপক্ষের কাছে জমা দেওয়া হয়েছে। তারা আপনার মামলা পর্যালোচনা করবে এবং উপযুক্ত পদক্ষেপ নেবে।',
      backButton: 'সাহায্যে ফিরে যান'
    },
    errors: {
      noPhoto: 'খাদ্য নিরাপত্তা সমস্যার একটি ছবি আপলোড করুন',
      noDescription: 'সমস্যা বর্ণনা করুন',
      noLocation: 'অবস্থান বিবরণ প্রদান করুন',
      generationFailed: 'ইমেল তৈরি করতে ব্যর্থ। আবার চেষ্টা করুন।',
      sendFailed: 'রিপোর্ট পাঠাতে ব্যর্থ। আবার চেষ্টা করুন।'
    }
  },
  hi: {
    backButton: 'वापस',
    title: 'खाद्य सुरक्षा रिपोर्ट',
    subtitle: 'फोटो साक्ष्य के साथ खाद्य सुरक्षा चिंताओं की रिपोर्ट करें',
    importantNotice: {
      title: 'महत्वपूर्ण जानकारी',
      imageIncluded: 'आपकी अपलोड की गई तस्वीर ईमेल रिपोर्ट में शामिल की जाएगी',
      recipient: 'यह रिपोर्ट भेजी जाएगी',
      recipientEmail: 'foodincident@sfa.gov.sg (सिंगापुर खाद्य एजेंसी)'
    },
    uploadSection: {
      title: 'फोटो साक्ष्य अपलोड करें',
      description: 'खाद्य सुरक्षा समस्या की स्पष्ट तस्वीर लें',
      uploadButton: 'फोटो चुनें',
      takePhoto: 'फोटो लें',
      dragDrop: 'या यहां खींचें और छोड़ें',
      fileSelected: 'फोटो चयनित'
    },
    descriptionSection: {
      title: 'समस्या का वर्णन करें',
      placeholder: 'कृपया वर्णन करें कि आपने क्या देखा, भोजन, स्थान, तारीख और किसी भी स्वास्थ्य चिंता के बारे में विवरण सहित...',
      label: 'समस्या विवरण'
    },
    locationSection: {
      title: 'स्थान विवरण',
      placeholder: 'सटीक स्थान दर्ज करें (रेस्तरां का नाम, पता, स्टॉल नंबर, आदि)',
      label: 'स्थान'
    },
    generateButton: 'रिपोर्ट ईमेल जेनरेट करें',
    emailSection: {
      title: 'ईमेल की समीक्षा और संपादन करें',
      description: 'भेजने से पहले जेनरेट किए गए ईमेल की समीक्षा करें और कोई भी परिवर्तन करें',
      editPrompt: 'आप नीचे ईमेल सामग्री संपादित कर सकते हैं',
      sendButton: 'रिपोर्ट भेजें',
      generating: 'ईमेल जेनरेट हो रहा है...'
    },
    success: {
      title: 'रिपोर्ट सफलतापूर्वक भेजी गई!',
      message: 'आपकी खाद्य सुरक्षा रिपोर्ट अधिकारियों को सबमिट कर दी गई है। वे आपके मामले की समीक्षा करेंगे और उचित कार्रवाई करेंगे।',
      backButton: 'सहायता पर वापस जाएं'
    },
    errors: {
      noPhoto: 'कृपया खाद्य सुरक्षा समस्या की एक तस्वीर अपलोड करें',
      noDescription: 'कृपया समस्या का वर्णन करें',
      noLocation: 'कृपया स्थान विवरण प्रदान करें',
      generationFailed: 'ईमेल जेनरेट करने में विफल। कृपया पुनः प्रयास करें।',
      sendFailed: 'रिपोर्ट भेजने में विफल। कृपया पुनः प्रयास करें।'
    }
  },
  th: {
    backButton: 'กลับ',
    title: 'รายงานความปลอดภัยด้านอาหาร',
    subtitle: 'รายงานความกังวลด้านความปลอดภัยของอาหารพร้อมหลักฐานภาพถ่าย',
    importantNotice: {
      title: 'ข้อมูลสำคัญ',
      imageIncluded: 'ภาพถ่ายที่คุณอัปโหลดจะรวมอยู่ในรายงานอีเมล',
      recipient: 'รายงานนี้จะถูกส่งไปยัง',
      recipientEmail: 'foodincident@sfa.gov.sg (หน่วยงานอาหารสิงคโปร์)'
    },
    uploadSection: {
      title: 'อัปโหลดหลักฐานภาพถ่าย',
      description: 'ถ่ายภาพที่ชัดเจนของปัญหาความปลอดภัยด้านอาหาร',
      uploadButton: 'เลือกภาพถ่าย',
      takePhoto: 'ถ่ายภาพ',
      dragDrop: 'หรือลากและวางที่นี่',
      fileSelected: 'เลือกภาพถ่ายแล้ว'
    },
    descriptionSection: {
      title: 'อธิบายปัญหา',
      placeholder: 'โปรดอธิบายสิ่งที่คุณสังเกตเห็น รวมถึงรายละเอียดเกี่ยวกับอาหาร สถานที่ วันที่ และความกังวลด้านสุขภาพใดๆ...',
      label: 'คำอธิบายปัญหา'
    },
    locationSection: {
      title: 'รายละเอียดสถานที่',
      placeholder: 'ป้อนสถานที่ที่แน่นอน (ชื่อร้านอาหาร ที่อยู่ หมายเลขร้าน ฯลฯ)',
      label: 'สถานที่'
    },
    generateButton: 'สร้างอีเมลรายงาน',
    emailSection: {
      title: 'ตรวจสอบและแก้ไขอีเมล',
      description: 'ตรวจสอบอีเมลที่สร้างขึ้นและทำการเปลี่ยนแปลงใดๆ ก่อนส่ง',
      editPrompt: 'คุณสามารถแก้ไขเนื้อหาอีเมลด้านล่างได้',
      sendButton: 'ส่งรายงาน',
      generating: 'กำลังสร้างอีเมล...'
    },
    success: {
      title: 'ส่งรายงานสำเร็จ!',
      message: 'รายงานความปลอดภัยด้านอาหารของคุณได้ถูกส่งไปยังหน่วยงานที่เกี่ยวข้องแล้ว พวกเขาจะตรวจสอบกรณีของคุณและดำเนินการที่เหมาะสม',
      backButton: 'กลับไปที่ความช่วยเหลือ'
    },
    errors: {
      noPhoto: 'โปรดอัปโหลดภาพถ่ายของปัญหาความปลอดภัยด้านอาหาร',
      noDescription: 'โปรดอธิบายปัญหา',
      noLocation: 'โปรดให้รายละเอียดสถานที่',
      generationFailed: 'ไม่สามารถสร้างอีเมลได้ โปรดลองอีกครั้ง',
      sendFailed: 'ไม่สามารถส่งรายงานได้ โปรดลองอีกครั้ง'
    }
  },
  vi: {
    backButton: 'Quay lại',
    title: 'Báo Cáo An Toàn Thực Phẩm',
    subtitle: 'Báo cáo các vấn đề an toàn thực phẩm với bằng chứng hình ảnh',
    importantNotice: {
      title: 'Thông Tin Quan Trọng',
      imageIncluded: 'Ảnh bạn tải lên sẽ được đính kèm trong email báo cáo',
      recipient: 'Báo cáo này sẽ được gửi đến',
      recipientEmail: 'foodincident@sfa.gov.sg (Cơ Quan Thực Phẩm Singapore)'
    },
    uploadSection: {
      title: 'Tải Lên Bằng Chứng Hình Ảnh',
      description: 'Chụp ảnh rõ ràng về vấn đề an toàn thực phẩm',
      uploadButton: 'Chọn Ảnh',
      takePhoto: 'Chụp Ảnh',
      dragDrop: 'hoặc kéo và thả vào đây',
      fileSelected: 'Đã chọn ảnh'
    },
    descriptionSection: {
      title: 'Mô Tả Vấn Đề',
      placeholder: 'Vui lòng mô tả những gì bạn quan sát được, bao gồm chi tiết về thực phẩm, địa điểm, ngày tháng và bất kỳ mối lo ngại về sức khỏe nào...',
      label: 'Mô Tả Vấn Đề'
    },
    locationSection: {
      title: 'Chi Tiết Địa Điểm',
      placeholder: 'Nhập địa điểm chính xác (tên nhà hàng, địa chỉ, số quầy, v.v.)',
      label: 'Địa Điểm'
    },
    generateButton: 'Tạo Email Báo Cáo',
    emailSection: {
      title: 'Xem Xét & Chỉnh Sửa Email',
      description: 'Xem xét email được tạo và thực hiện bất kỳ thay đổi nào trước khi gửi',
      editPrompt: 'Bạn có thể chỉnh sửa nội dung email bên dưới',
      sendButton: 'Gửi Báo Cáo',
      generating: 'Đang tạo email...'
    },
    success: {
      title: 'Đã Gửi Báo Cáo Thành Công!',
      message: 'Báo cáo an toàn thực phẩm của bạn đã được gửi đến cơ quan chức năng. Họ sẽ xem xét trường hợp của bạn và thực hiện hành động thích hợp.',
      backButton: 'Quay Lại Trợ Giúp'
    },
    errors: {
      noPhoto: 'Vui lòng tải lên ảnh về vấn đề an toàn thực phẩm',
      noDescription: 'Vui lòng mô tả vấn đề',
      noLocation: 'Vui lòng cung cấp chi tiết địa điểm',
      generationFailed: 'Không thể tạo email. Vui lòng thử lại.',
      sendFailed: 'Không thể gửi báo cáo. Vui lòng thử lại.'
    }
  },
  id: {
    backButton: 'Kembali',
    title: 'Laporan Keamanan Pangan',
    subtitle: 'Laporkan masalah keamanan pangan dengan bukti foto',
    importantNotice: {
      title: 'Informasi Penting',
      imageIncluded: 'Foto yang Anda unggah akan disertakan dalam laporan email',
      recipient: 'Laporan ini akan dikirim ke',
      recipientEmail: 'foodincident@sfa.gov.sg (Badan Pangan Singapura)'
    },
    uploadSection: {
      title: 'Unggah Bukti Foto',
      description: 'Ambil foto yang jelas tentang masalah keamanan pangan',
      uploadButton: 'Pilih Foto',
      takePhoto: 'Ambil Foto',
      dragDrop: 'atau seret dan lepas di sini',
      fileSelected: 'Foto dipilih'
    },
    descriptionSection: {
      title: 'Jelaskan Masalah',
      placeholder: 'Harap jelaskan apa yang Anda amati, termasuk detail tentang makanan, lokasi, tanggal, dan kekhawatiran kesehatan apa pun...',
      label: 'Deskripsi Masalah'
    },
    locationSection: {
      title: 'Detail Lokasi',
      placeholder: 'Masukkan lokasi yang tepat (nama restoran, alamat, nomor kios, dll.)',
      label: 'Lokasi'
    },
    generateButton: 'Buat Email Laporan',
    emailSection: {
      title: 'Tinjau & Edit Email',
      description: 'Tinjau email yang dihasilkan dan buat perubahan apa pun sebelum mengirim',
      editPrompt: 'Anda dapat mengedit konten email di bawah ini',
      sendButton: 'Kirim Laporan',
      generating: 'Membuat email...'
    },
    success: {
      title: 'Laporan Berhasil Dikirim!',
      message: 'Laporan keamanan pangan Anda telah dikirimkan kepada pihak berwenang. Mereka akan meninjau kasus Anda dan mengambil tindakan yang sesuai.',
      backButton: 'Kembali ke Bantuan'
    },
    errors: {
      noPhoto: 'Harap unggah foto masalah keamanan pangan',
      noDescription: 'Harap jelaskan masalah',
      noLocation: 'Harap berikan detail lokasi',
      generationFailed: 'Gagal membuat email. Silakan coba lagi.',
      sendFailed: 'Gagal mengirim laporan. Silakan coba lagi.'
    }
  },
  tl: {
    backButton: 'Bumalik',
    title: 'Ulat ng Kaligtasan sa Pagkain',
    subtitle: 'Iulat ang mga alalahanin sa kaligtasan ng pagkain gamit ang larawan',
    importantNotice: {
      title: 'Mahalagang Impormasyon',
      imageIncluded: 'Ang inyong na-upload na larawan ay isasama sa email na ulat',
      recipient: 'Ang ulat na ito ay ipapadala sa',
      recipientEmail: 'foodincident@sfa.gov.sg (Ahensya ng Pagkain ng Singapore)'
    },
    uploadSection: {
      title: 'Mag-upload ng Larawan na Ebidensya',
      description: 'Kumuha ng malinaw na larawan ng isyu sa kaligtasan ng pagkain',
      uploadButton: 'Pumili ng Larawan',
      takePhoto: 'Kumuha ng Larawan',
      dragDrop: 'o i-drag at i-drop dito',
      fileSelected: 'Napili ang larawan'
    },
    descriptionSection: {
      title: 'Ilarawan ang Isyu',
      placeholder: 'Pakiusap na ilarawan kung ano ang inyong naobserbahan, kasama ang mga detalye tungkol sa pagkain, lokasyon, petsa, at anumang alalahanin sa kalusugan...',
      label: 'Paglalarawan ng Isyu'
    },
    locationSection: {
      title: 'Mga Detalye ng Lokasyon',
      placeholder: 'Ilagay ang eksaktong lokasyon (pangalan ng restaurant, address, numero ng tindahan, atbp.)',
      label: 'Lokasyon'
    },
    generateButton: 'Gumawa ng Email ng Ulat',
    emailSection: {
      title: 'Suriin at I-edit ang Email',
      description: 'Suriin ang nabuong email at gumawa ng anumang pagbabago bago ipadala',
      editPrompt: 'Maaari mong i-edit ang nilalaman ng email sa ibaba',
      sendButton: 'Ipadala ang Ulat',
      generating: 'Gumagawa ng email...'
    },
    success: {
      title: 'Matagumpay na Naipadala ang Ulat!',
      message: 'Ang inyong ulat sa kaligtasan ng pagkain ay naisumite na sa mga awtoridad. Susuriin nila ang inyong kaso at gagawa ng naaangkop na aksyon.',
      backButton: 'Bumalik sa Tulong'
    },
    errors: {
      noPhoto: 'Pakiusap na mag-upload ng larawan ng isyu sa kaligtasan ng pagkain',
      noDescription: 'Pakiusap na ilarawan ang isyu',
      noLocation: 'Pakiusap na magbigay ng mga detalye ng lokasyon',
      generationFailed: 'Nabigo ang paggawa ng email. Pakisubukan muli.',
      sendFailed: 'Nabigo ang pagpapadala ng ulat. Pakisubukan muli.'
    }
  },
  my: {
    backButton: 'နောက်သို့',
    title: 'အစားအသောက်ဘေးကင်းရေး အစီရင်ခံစာ',
    subtitle: 'ဓာတ်ပုံအထောက်အထားဖြင့် အစားအသောက်ဘေးကင်းရေး စိုးရိမ်မှုများကို တင်ပြပါ',
    importantNotice: {
      title: 'အရေးကြီးသော အချက်အလက်',
      imageIncluded: 'သင်တင်သွင်းထားသော ဓာတ်ပုံကို အီးမေးလ် အစီရင်ခံစာတွင် ထည့်သွင်းပါမည်',
      recipient: 'ဤအစီရင်ခံစာကို ပို့ပေးမည်',
      recipientEmail: 'foodincident@sfa.gov.sg (စင်ကာပူ အစားအသောက် အေဂျင်စီ)'
    },
    uploadSection: {
      title: 'ဓာတ်ပုံအထောက်အထား တင်ပါ',
      description: 'အစားအသောက်ဘေးကင်းရေး ပြဿနာ၏ ရှင်းလင်းသော ဓာတ်ပုံကို ရိုက်ပါ',
      uploadButton: 'ဓာတ်ပုံရွေးပါ',
      takePhoto: 'ဓာတ်ပုံရိုက်ပါ',
      dragDrop: 'သို့မဟုတ် ဤနေရာတွင် ဆွဲယူပါ',
      fileSelected: 'ဓာတ်ပုံရွေးချယ်ပြီး'
    },
    descriptionSection: {
      title: 'ပြဿနာကို ဖော်ပြပါ',
      placeholder: 'သင်တွေ့ရှိခဲ့သည့်အရာကို ဖော်ပြပါ၊ အစားအစာ၊ နေရာ၊ ရက်စွဲနှင့် မည်သည့်ကျန်းမာရေး စိုးရိမ်မှုများ အကြောင်း အသေးစိတ်များ အပါအဝင်...',
      label: 'ပြဿနာ ဖော်ပြချက်'
    },
    locationSection: {
      title: 'နေရာ အသေးစိတ်များ',
      placeholder: 'အတိအကျ နေရာကို ထည့်ပါ (စားသောက်ဆိုင် အမည်၊ လိပ်စာ၊ ဆိုင်နံပါတ်၊ စသည်)',
      label: 'နေရာ'
    },
    generateButton: 'အစီရင်ခံစာ အီးမေးလ် ဖန်တီးပါ',
    emailSection: {
      title: 'အီးမေးလ်ကို ပြန်လည်သုံးသပ်ပြီး တည်းဖြတ်ပါ',
      description: 'ဖန်တီးထားသော အီးမေးလ်ကို ပြန်လည်သုံးသပ်ပြီး မပို့မီ မည်သည့်ပြောင်းလဲမှုများကို ပြုလုပ်ပါ',
      editPrompt: 'အောက်တွင် အီးမေးလ် အကြောင်းအရာကို တည်းဖြတ်နိုင်ပါသည်',
      sendButton: 'အစီရင်ခံစာ ပေးပို့ပါ',
      generating: 'အီးမေးလ် ဖန်တီးနေသည်...'
    },
    success: {
      title: 'အစီရင်ခံစာ အောင်မြင်စွာ ပေးပို့ပြီး!',
      message: 'သင့်အစားအသောက်ဘေးကင်းရေး အစီရင်ခံစာကို အာဏာပိုင်များထံ တင်သွင်းပြီးပါပြီ။ သူတို့သည် သင့်အမှုကို ပြန်လည်သုံးသပ်ပြီး သင့်လျော်သော အရေးယူမှုများ ပြုလုပ်ပါမည်။',
      backButton: 'အကူအညီသို့ ပြန်သွားပါ'
    },
    errors: {
      noPhoto: 'အစားအသောက်ဘေးကင်းရေး ပြဿနာ၏ ဓာတ်ပုံကို တင်ပါ',
      noDescription: 'ပြဿနာကို ဖော်ပြပါ',
      noLocation: 'နေရာ အသေးစိတ်များကို ပေးပါ',
      generationFailed: 'အီးမေးလ် ဖန်တီးရန် မအောင်မြင်ပါ။ ထပ်မံကြိုးစားပါ။',
      sendFailed: 'အစီရင်ခံစာ ပေးပို့ရန် မအောင်မြင်ပါ။ ထပ်မံကြိုးစားပါ။'
    }
  }
};

export function FoodSafetyReportPage({ currentLang }: FoodSafetyReportPageProps) {
  const navigate = useNavigate();
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleGenerateEmail = async () => {
    // Validation
    if (!selectedFile) {
      setError(t.errors.noPhoto);
      return;
    }
    if (!description.trim()) {
      setError(t.errors.noDescription);
      return;
    }
    if (!location.trim()) {
      setError(t.errors.noLocation);
      return;
    }

    setError('');
    setIsGenerating(true);

    try {
      const email = await generateFoodSafetyEmail({
        description: description.trim(),
        location: location.trim(),
        language: currentLang
      });
      setGeneratedEmail(email);
    } catch (err) {
      console.error('Error generating email:', err);
      setError(t.errors.generationFailed);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendReport = async () => {
    if (!generatedEmail.trim()) {
      return;
    }

    setIsSending(true);
    setError('');

    try {
      // In a real implementation, this would send the email via a backend service
      // For now, we'll simulate the sending process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      setShowSuccess(true);
    } catch (err) {
      console.error('Error sending report:', err);
      setError(t.errors.sendFailed);
    } finally {
      setIsSending(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {t.success.title}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {t.success.message}
          </p>
          <button
            onClick={() => navigate('/help')}
            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            {t.success.backButton}
          </button>
        </div>
      </div>
    );
  }

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

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-cyan-800 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          {/* Important Notice */}
          <div className="bg-slate-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-cyan-800" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t.importantNotice.title}
                </h3>
                <div className="space-y-2">
                  <p className="text-slate-700 font-medium flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-cyan-800 flex-shrink-0 mt-0.5" />
                    <span>{t.importantNotice.imageIncluded}</span>
                  </p>
                  <p className="text-slate-700 font-medium flex items-start gap-2">
                    <Mail className="w-5 h-5 text-cyan-800 flex-shrink-0 mt-0.5" />
                    <span>
                      {t.importantNotice.recipient}:{' '}
                      <span className="text-cyan-800 font-bold">
                        {t.importantNotice.recipientEmail}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {/* Photo Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Camera className="w-6 h-6 text-cyan-800" />
              {t.uploadSection.title}
            </h2>
            <p className="text-slate-600 mb-6">{t.uploadSection.description}</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {!previewUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-cyan-800 hover:bg-slate-50 transition-all duration-300"
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 font-semibold mb-2">
                  {t.uploadSection.uploadButton}
                </p>
                <p className="text-slate-500 text-sm">{t.uploadSection.dragDrop}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white/90 backdrop-blur-sm text-slate-900 rounded-lg font-semibold hover:bg-white transition-all duration-300 flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </button>
                  </div>
                </div>
                <p className="text-green-600 font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {t.uploadSection.fileSelected}
                </p>
              </div>
            )}
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Edit3 className="w-6 h-6 text-cyan-800" />
              {t.descriptionSection.title}
            </h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descriptionSection.placeholder}
              rows={6}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-transparent resize-none"
            />
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan-800" />
              {t.locationSection.title}
            </h2>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t.locationSection.placeholder}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-transparent"
            />
          </div>

          {/* Generate Email Button */}
          {!generatedEmail && (
            <button
              onClick={handleGenerateEmail}
              disabled={isGenerating}
              className="w-full px-8 py-4 bg-cyan-800 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  {t.emailSection.generating}
                </>
              ) : (
                <>
                  <Mail className="w-6 h-6" />
                  {t.generateButton}
                </>
              )}
            </button>
          )}

          {/* Email Preview & Edit Section */}
          {generatedEmail && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-cyan-800" />
                {t.emailSection.title}
              </h2>
              <p className="text-slate-600 mb-4">{t.emailSection.description}</p>
              <p className="text-sm text-slate-500 mb-4">{t.emailSection.editPrompt}</p>
              
              <textarea
                value={generatedEmail}
                onChange={(e) => setGeneratedEmail(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-transparent resize-none font-mono text-sm"
              />

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setGeneratedEmail('')}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-300"
                >
                  Regenerate
                </button>
                <button
                  onClick={handleSendReport}
                  disabled={isSending}
                  className="flex-1 px-6 py-3 bg-cyan-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.emailSection.sendButton}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
