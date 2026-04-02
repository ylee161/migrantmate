import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Mic, Send, Check, X, DollarSign, History, Lightbulb, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Trash2, Loader2, PieChart as PieChartIcon } from 'lucide-react';
import { LanguageCode } from '../translations';
import OpenAI from 'openai';
import { getPersonalizedBudgetAdvice, CategoryData } from '../services/budgetAdviceService';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface BudgetBrotherPageProps {
  currentLang: LanguageCode;
}

interface TransactionResult {
  amount: number;
  type: 'income' | 'expense';
  reason: string;
  confidence: string;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  reason: string;
  date: string;
  timestamp: number;
}

type TabType = 'none' | 'history' | 'advice';

const translations = {
  en: {
    title: 'Budget Brother',
    subtitle: 'Track your expenses and income',
    backButton: 'Back to Home',
    currentBalance: 'Current Balance',
    inputPlaceholder: 'Type or speak your transaction...',
    submitButton: 'Submit',
    speakButton: 'Speak',
    instructionText: 'Tell me about your transaction in your own language. For example: "I earned $500 from my salary" or "I spent $20 on lunch"',
    processing: 'Processing...',
    listeningText: 'Listening...',
    transactionResult: 'Transaction Details',
    amount: 'Amount',
    type: 'Type',
    reason: 'Reason',
    income: 'Income',
    expense: 'Expense',
    confirmButton: 'Confirm Transaction',
    cancelButton: 'Cancel',
    balanceUpdated: 'Balance updated successfully!',
    error: 'Error processing transaction. Please try again.',
    speechNotSupported: 'Speech recognition is not supported in your browser.',
    newBalance: 'New Balance',
    transactionHistory: 'Transaction History',
    viewHistory: 'View All Transactions',
    calculatedFromTransactions: 'Calculated from all transactions',
    getBudgetAdvice: 'Get Budget Advice',
    noTransactions: 'No transactions yet',
    noTransactionsDesc: 'Start tracking your expenses and income',
    date: 'Date',
    actions: 'Actions',
    showing: 'Showing',
    of: 'of',
    transactions: 'transactions',
    previous: 'Previous',
    next: 'Next',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expenses',
    netBalance: 'Net Balance',
    deleteButton: 'Delete',
    deleteConfirm: 'Are you sure you want to delete this transaction?',
    generateButton: 'Generate Advice',
    generating: 'Generating advice...',
    spendingBreakdown: 'Spending Breakdown',
    totalExpenses: 'Total Expenses',
    adviceTitle: 'Your Personalized Budget Advice'
  },
  zh: {
    title: '预算兄弟',
    subtitle: '跟踪您的支出和收入',
    backButton: '返回',
    currentBalance: '当前余额',
    inputPlaceholder: '输入或说出您的交易...',
    submitButton: '提交',
    speakButton: '说话',
    instructionText: '用您自己的语言告诉我您的交易。例如："我从工资中赚了500美元"或"我在午餐上花了20美元"',
    processing: '处理中...',
    listeningText: '正在听...',
    transactionResult: '交易详情',
    amount: '金额',
    type: '类型',
    reason: '原因',
    income: '收入',
    expense: '支出',
    confirmButton: '确认交易',
    cancelButton: '取消',
    balanceUpdated: '余额更新成功！',
    error: '处理交易时出错。请重试。',
    speechNotSupported: '您的浏览器不支持语音识别。',
    newBalance: '新余额',
    transactionHistory: '交易历史',
    viewHistory: '查看所有交易',
    calculatedFromTransactions: '从所有交易计算',
    getBudgetAdvice: '获取预算建议',
    noTransactions: '暂无交易',
    noTransactionsDesc: '开始跟踪您的支出和收入',
    date: '日期',
    actions: '操作',
    showing: '显示',
    of: '共',
    transactions: '笔交易',
    previous: '上一页',
    next: '下一页',
    totalIncome: '总收入',
    totalExpense: '总支出',
    netBalance: '净余额',
    deleteButton: '删除',
    deleteConfirm: '确定要删除此交易吗？',
    generateButton: '生成建议',
    generating: '正在生成建议...',
    spendingBreakdown: '支出细分',
    totalExpenses: '总支出',
    adviceTitle: '您的个性化预算建议'
  },
  ms: {
    title: 'Budget Brother',
    subtitle: 'Jejaki perbelanjaan dan pendapatan anda',
    backButton: 'Kembali',
    currentBalance: 'Baki Semasa',
    inputPlaceholder: 'Taip atau sebut transaksi anda...',
    submitButton: 'Hantar',
    speakButton: 'Bercakap',
    instructionText: 'Beritahu saya tentang transaksi anda dalam bahasa anda sendiri. Contohnya: "Saya dapat $500 dari gaji" atau "Saya belanja $20 untuk makan tengahari"',
    processing: 'Memproses...',
    listeningText: 'Mendengar...',
    transactionResult: 'Butiran Transaksi',
    amount: 'Jumlah',
    type: 'Jenis',
    reason: 'Sebab',
    income: 'Pendapatan',
    expense: 'Perbelanjaan',
    confirmButton: 'Sahkan Transaksi',
    cancelButton: 'Batal',
    balanceUpdated: 'Baki berjaya dikemas kini!',
    error: 'Ralat memproses transaksi. Sila cuba lagi.',
    speechNotSupported: 'Pengecaman suara tidak disokong dalam pelayar anda.',
    newBalance: 'Baki Baru',
    transactionHistory: 'Sejarah Transaksi',
    viewHistory: 'Lihat Semua Transaksi',
    calculatedFromTransactions: 'Dikira dari semua transaksi',
    getBudgetAdvice: 'Dapatkan Nasihat Bajet',
    noTransactions: 'Tiada transaksi lagi',
    noTransactionsDesc: 'Mula jejaki perbelanjaan dan pendapatan anda',
    date: 'Tarikh',
    actions: 'Tindakan',
    showing: 'Menunjukkan',
    of: 'daripada',
    transactions: 'transaksi',
    previous: 'Sebelumnya',
    next: 'Seterusnya',
    totalIncome: 'Jumlah Pendapatan',
    totalExpense: 'Jumlah Perbelanjaan',
    netBalance: 'Baki Bersih',
    deleteButton: 'Padam',
    deleteConfirm: 'Adakah anda pasti mahu memadam transaksi ini?',
    generateButton: 'Jana Nasihat',
    generating: 'Menjana nasihat...',
    spendingBreakdown: 'Pecahan Perbelanjaan',
    totalExpenses: 'Jumlah Perbelanjaan',
    adviceTitle: 'Nasihat Bajet Peribadi Anda'
  },
  ta: {
    title: 'பட்ஜெட் பிரதர்',
    subtitle: 'உங்கள் செலவுகள் மற்றும் வருமானத்தை கண்காணிக்கவும்',
    backButton: 'திரும்பு',
    currentBalance: 'தற்போதைய இருப்பு',
    inputPlaceholder: 'உங்கள் பரிவர்த்தனையை தட்டச்சு செய்யவும் அல்லது பேசவும்...',
    submitButton: 'சமர்ப்பி',
    speakButton: 'பேசு',
    instructionText: 'உங்கள் சொந்த மொழியில் உங்கள் பரிவர்த்தனையைப் பற்றி என்னிடம் சொல்லுங்கள். உதாரணமாக: "நான் என் சம்பளத்திலிருந்து $500 சம்பாதித்தேன்" அல்லது "நான் மதிய உணவுக்கு $20 செலவழித்தேன்"',
    processing: 'செயலாக்கம்...',
    listeningText: 'கேட்கிறது...',
    transactionResult: 'பரிவர்த்தனை விவரங்கள்',
    amount: 'தொகை',
    type: 'வகை',
    reason: 'காரணம்',
    income: 'வருமானம்',
    expense: 'செலவு',
    confirmButton: 'பரிவர்த்தனையை உறுதிப்படுத்து',
    cancelButton: 'ரத்து',
    balanceUpdated: 'இருப்பு வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
    error: 'பரிவர்த்தனையை செயலாக்குவதில் பிழை. மீண்டும் முயற்சிக்கவும்.',
    speechNotSupported: 'உங்கள் உலாவியில் பேச்சு அங்கீகாரம் ஆதரிக்கப்படவில்லை.',
    newBalance: 'புதிய இருப்பு',
    transactionHistory: 'பரிவர்த்தனை வரலாறு',
    viewHistory: 'அனைத்து பரிவர்த்தனைகளையும் காண்க',
    calculatedFromTransactions: 'அனைத்து பரிவர்த்தனைகளிலிருந்து கணக்கிடப்பட்டது',
    getBudgetAdvice: 'பட்ஜெட் ஆலோசனை பெறுங்கள்',
    noTransactions: 'இன்னும் பரிவர்த்தனைகள் இல்லை',
    noTransactionsDesc: 'உங்கள் செலவுகள் மற்றும் வருமானத்தை கண்காணிக்கத் தொடங்குங்கள்',
    date: 'தேதி',
    actions: 'செயல்கள்',
    showing: 'காட்டுகிறது',
    of: 'இல்',
    transactions: 'பரிவர்த்தனைகள்',
    previous: 'முந்தைய',
    next: 'அடுத்து',
    totalIncome: 'மொத்த வருமானம்',
    totalExpense: 'மொத்த செலவுகள்',
    netBalance: 'நிகர இருப்பு',
    deleteButton: 'நீக்கு',
    deleteConfirm: 'இந்த பரிவர்த்தனையை நீக்க விரும்புகிறீர்களா?',
    generateButton: 'ஆலோசனையை உருவாக்கு',
    generating: 'ஆலோசனையை உருவாக்குகிறது...',
    spendingBreakdown: 'செலவு பிரிவு',
    totalExpenses: 'மொத்த செலவுகள்',
    adviceTitle: 'உங்கள் தனிப்பயனாக்கப்பட்ட பட்ஜெட் ஆலோசனை'
  },
  bn: {
    title: 'বাজেট ব্রাদার',
    subtitle: 'আপনার খরচ এবং আয় ট্র্যাক করুন',
    backButton: 'ফিরে যান',
    currentBalance: 'বর্তমান ব্যালেন্স',
    inputPlaceholder: 'আপনার লেনদেন টাইপ করুন বা বলুন...',
    submitButton: 'জমা দিন',
    speakButton: 'বলুন',
    instructionText: 'আপনার নিজের ভাষায় আপনার লেনদেন সম্পর্কে আমাকে বলুন। উদাহরণস্বরূপ: "আমি আমার বেতন থেকে $500 আয় করেছি" বা "আমি দুপুরের খাবারে $20 খরচ করেছি"',
    processing: 'প্রক্রিয়াকরণ...',
    listeningText: 'শুনছি...',
    transactionResult: 'লেনদেনের বিবরণ',
    amount: 'পরিমাণ',
    type: 'ধরন',
    reason: 'কারণ',
    income: 'আয়',
    expense: 'খরচ',
    confirmButton: 'লেনদেন নিশ্চিত করুন',
    cancelButton: 'বাতিল',
    balanceUpdated: 'ব্যালেন্স সফলভাবে আপডেট হয়েছে!',
    error: 'লেনদেন প্রক্রিয়াকরণে ত্রুটি। আবার চেষ্টা করুন।',
    speechNotSupported: 'আপনার ব্রাউজারে বক্তৃতা স্বীকৃতি সমর্থিত নয়।',
    newBalance: 'নতুন ব্যালেন্স',
    transactionHistory: 'লেনদেনের ইতিহাস',
    viewHistory: 'সমস্ত লেনদেন দেখুন',
    calculatedFromTransactions: 'সমস্ত লেনদেন থেকে গণনা করা হয়েছে',
    getBudgetAdvice: 'বাজেট পরামর্শ পান',
    noTransactions: 'এখনও কোনো লেনদেন নেই',
    noTransactionsDesc: 'আপনার খরচ এবং আয় ট্র্যাক করা শুরু করুন',
    date: 'তারিখ',
    actions: 'কর্ম',
    showing: 'দেখাচ্ছে',
    of: 'এর মধ্যে',
    transactions: 'লেনদেন',
    previous: 'পূর্ববর্তী',
    next: 'পরবর্তী',
    totalIncome: 'মোট আয়',
    totalExpense: 'মোট খরচ',
    netBalance: 'নিট ব্যালেন্স',
    deleteButton: 'মুছুন',
    deleteConfirm: 'আপনি কি এই লেনদেন মুছে ফেলতে চান?',
    generateButton: 'পরামর্শ তৈরি করুন',
    generating: 'পরামর্শ তৈরি করা হচ্ছে...',
    spendingBreakdown: 'খরচের বিভাজন',
    totalExpenses: 'মোট খরচ',
    adviceTitle: 'আপনার ব্যক্তিগত বাজেট পরামর্শ'
  },
  hi: {
    title: 'बजट ब्रदर',
    subtitle: 'अपने खर्च और आय को ट्रैक करें',
    backButton: 'वापस',
    currentBalance: 'वर्तमान शेष',
    inputPlaceholder: 'अपना लेनदेन टाइप करें या बोलें...',
    submitButton: 'जमा करें',
    speakButton: 'बोलें',
    instructionText: 'अपनी भाषा में अपने लेनदेन के बारे में मुझे बताएं। उदाहरण के लिए: "मैंने अपने वेतन से $500 कमाए" या "मैंने दोपहर के भोजन पर $20 खर्च किए"',
    processing: 'प्रसंस्करण...',
    listeningText: 'सुन रहा है...',
    transactionResult: 'लेनदेन विवरण',
    amount: 'राशि',
    type: 'प्रकार',
    reason: 'कारण',
    income: 'आय',
    expense: 'खर्च',
    confirmButton: 'लेनदेन की पुष्टि करें',
    cancelButton: 'रद्द करें',
    balanceUpdated: 'शेष सफलतापूर्वक अपडेट किया गया!',
    error: 'लेनदेन प्रसंस्करण में त्रुटि। कृपया पुनः प्रयास करें।',
    speechNotSupported: 'आपके ब्राउज़र में वाक् पहचान समर्थित नहीं है।',
    newBalance: 'नया शेष',
    transactionHistory: 'लेनदेन इतिहास',
    viewHistory: 'सभी लेनदेन देखें',
    calculatedFromTransactions: 'सभी लेनदेन से गणना की गई',
    getBudgetAdvice: 'बजट सलाह प्राप्त करें',
    noTransactions: 'अभी तक कोई लेनदेन नहीं',
    noTransactionsDesc: 'अपने खर्च और आय को ट्रैक करना शुरू करें',
    date: 'तारीख',
    actions: 'कार्रवाई',
    showing: 'दिखा रहा है',
    of: 'में से',
    transactions: 'लेनदेन',
    previous: 'पिछला',
    next: 'अगला',
    totalIncome: 'कुल आय',
    totalExpense: 'कुल खर्च',
    netBalance: 'शुद्ध शेष',
    deleteButton: 'हटाएं',
    deleteConfirm: 'क्या आप इस लेनदेन को हटाना चाहते हैं?',
    generateButton: 'सलाह उत्पन्न करें',
    generating: 'सलाह उत्पन्न हो रही है...',
    spendingBreakdown: 'खर्च का विवरण',
    totalExpenses: 'कुल खर्च',
    adviceTitle: 'आपकी व्यक्तिगत बजट सलाह'
  },
  th: {
    title: 'Budget Brother',
    subtitle: 'ติดตามรายจ่ายและรายได้ของคุณ',
    backButton: 'กลับ',
    currentBalance: 'ยอดคงเหลือปัจจุบัน',
    inputPlaceholder: 'พิมพ์หรือพูดธุรกรรมของคุณ...',
    submitButton: 'ส่ง',
    speakButton: 'พูด',
    instructionText: 'บอกฉันเกี่ยวกับธุรกรรมของคุณในภาษาของคุณเอง ตัวอย่างเช่น: "ฉันได้รับ $500 จากเงินเดือน" หรือ "ฉันใช้ $20 สำหรับอาหารกลางวัน"',
    processing: 'กำลังประมวลผล...',
    listeningText: 'กำลังฟัง...',
    transactionResult: 'รายละเอียดธุรกรรม',
    amount: 'จำนวนเงิน',
    type: 'ประเภท',
    reason: 'เหตุผล',
    income: 'รายได้',
    expense: 'รายจ่าย',
    confirmButton: 'ยืนยันธุรกรรม',
    cancelButton: 'ยกเลิก',
    balanceUpdated: 'อัปเดตยอดคงเหลือสำเร็จ!',
    error: 'เกิดข้อผิดพลาดในการประมวลผลธุรกรรม โปรดลองอีกครั้ง',
    speechNotSupported: 'เบราว์เซอร์ของคุณไม่รองรับการรู้จำเสียง',
    newBalance: 'ยอดคงเหลือใหม่',
    transactionHistory: 'ประวัติธุรกรรม',
    viewHistory: 'ดูธุรกรรมทั้งหมด',
    calculatedFromTransactions: 'คำนวณจากธุรกรรมทั้งหมด',
    getBudgetAdvice: 'รับคำแนะนำงบประมาณ',
    noTransactions: 'ยังไม่มีธุรกรรม',
    noTransactionsDesc: 'เริ่มติดตามรายจ่ายและรายได้ของคุณ',
    date: 'วันที่',
    actions: 'การดำเนินการ',
    showing: 'แสดง',
    of: 'จาก',
    transactions: 'ธุรกรรม',
    previous: 'ก่อนหน้า',
    next: 'ถัดไป',
    totalIncome: 'รายได้รวม',
    totalExpense: 'รายจ่ายรวม',
    netBalance: 'ยอดคงเหลือสุทธิ',
    deleteButton: 'ลบ',
    deleteConfirm: 'คุณแน่ใจหรือไม่ว่าต้องการลบธุรกรรมนี้?',
    generateButton: 'สร้างคำแนะนำ',
    generating: 'กำลังสร้างคำแนะนำ...',
    spendingBreakdown: 'รายละเอียดการใช้จ่าย',
    totalExpenses: 'ค่าใช้จ่ายทั้งหมด',
    adviceTitle: 'คำแนะนำงบประมาณส่วนบุคคลของคุณ'
  },
  vi: {
    title: 'Budget Brother',
    subtitle: 'Theo dõi chi tiêu và thu nhập của bạn',
    backButton: 'Quay lại',
    currentBalance: 'Số Dư Hiện Tại',
    inputPlaceholder: 'Nhập hoặc nói giao dịch của bạn...',
    submitButton: 'Gửi',
    speakButton: 'Nói',
    instructionText: 'Hãy cho tôi biết về giao dịch của bạn bằng ngôn ngữ của bạn. Ví dụ: "Tôi kiếm được $500 từ lương" hoặc "Tôi đã chi $20 cho bữa trưa"',
    processing: 'Đang xử lý...',
    listeningText: 'Đang nghe...',
    transactionResult: 'Chi Tiết Giao Dịch',
    amount: 'Số Tiền',
    type: 'Loại',
    reason: 'Lý Do',
    income: 'Thu Nhập',
    expense: 'Chi Tiêu',
    confirmButton: 'Xác Nhận Giao Dịch',
    cancelButton: 'Hủy',
    balanceUpdated: 'Cập nhật số dư thành công!',
    error: 'Lỗi xử lý giao dịch. Vui lòng thử lại.',
    speechNotSupported: 'Trình duyệt của bạn không hỗ trợ nhận dạng giọng nói.',
    newBalance: 'Số Dư Mới',
    transactionHistory: 'Lịch Sử Giao Dịch',
    viewHistory: 'Xem Tất Cả Giao Dịch',
    calculatedFromTransactions: 'Được tính từ tất cả giao dịch',
    getBudgetAdvice: 'Nhận Lời Khuyên Ngân Sách',
    noTransactions: 'Chưa có giao dịch nào',
    noTransactionsDesc: 'Bắt đầu theo dõi chi tiêu và thu nhập của bạn',
    date: 'Ngày',
    actions: 'Hành Động',
    showing: 'Hiển thị',
    of: 'trong số',
    transactions: 'giao dịch',
    previous: 'Trước',
    next: 'Tiếp',
    totalIncome: 'Tổng Thu Nhập',
    totalExpense: 'Tổng Chi Tiêu',
    netBalance: 'Số Dư Ròng',
    deleteButton: 'Xóa',
    deleteConfirm: 'Bạn có chắc chắn muốn xóa giao dịch này không?',
    generateButton: 'Tạo Lời Khuyên',
    generating: 'Đang tạo lời khuyên...',
    spendingBreakdown: 'Phân Tích Chi Tiêu',
    totalExpenses: 'Tổng Chi Tiêu',
    adviceTitle: 'Lời Khuyên Ngân Sách Cá Nhân Của Bạn'
  },
  id: {
    title: 'Budget Brother',
    subtitle: 'Lacak pengeluaran dan pendapatan Anda',
    backButton: 'Kembali',
    currentBalance: 'Saldo Saat Ini',
    inputPlaceholder: 'Ketik atau ucapkan transaksi Anda...',
    submitButton: 'Kirim',
    speakButton: 'Bicara',
    instructionText: 'Beritahu saya tentang transaksi Anda dalam bahasa Anda sendiri. Misalnya: "Saya mendapat $500 dari gaji" atau "Saya menghabiskan $20 untuk makan siang"',
    processing: 'Memproses...',
    listeningText: 'Mendengarkan...',
    transactionResult: 'Detail Transaksi',
    amount: 'Jumlah',
    type: 'Tipe',
    reason: 'Alasan',
    income: 'Pendapatan',
    expense: 'Pengeluaran',
    confirmButton: 'Konfirmasi Transaksi',
    cancelButton: 'Batal',
    balanceUpdated: 'Saldo berhasil diperbarui!',
    error: 'Kesalahan memproses transaksi. Silakan coba lagi.',
    speechNotSupported: 'Pengenalan suara tidak didukung di browser Anda.',
    newBalance: 'Saldo Baru',
    transactionHistory: 'Riwayat Transaksi',
    viewHistory: 'Lihat Semua Transaksi',
    calculatedFromTransactions: 'Dihitung dari semua transaksi',
    getBudgetAdvice: 'Dapatkan Saran Anggaran',
    noTransactions: 'Belum ada transaksi',
    noTransactionsDesc: 'Mulai lacak pengeluaran dan pendapatan Anda',
    date: 'Tanggal',
    actions: 'Tindakan',
    showing: 'Menampilkan',
    of: 'dari',
    transactions: 'transaksi',
    previous: 'Sebelumnya',
    next: 'Berikutnya',
    totalIncome: 'Total Pendapatan',
    totalExpense: 'Total Pengeluaran',
    netBalance: 'Saldo Bersih',
    deleteButton: 'Hapus',
    deleteConfirm: 'Apakah Anda yakin ingin menghapus transaksi ini?',
    generateButton: 'Buat Saran',
    generating: 'Membuat saran...',
    spendingBreakdown: 'Rincian Pengeluaran',
    totalExpenses: 'Total Pengeluaran',
    adviceTitle: 'Saran Anggaran Pribadi Anda'
  },
  tl: {
    title: 'Budget Brother',
    subtitle: 'Subaybayan ang iyong mga gastos at kita',
    backButton: 'Bumalik',
    currentBalance: 'Kasalukuyang Balanse',
    inputPlaceholder: 'I-type o sabihin ang iyong transaksyon...',
    submitButton: 'Isumite',
    speakButton: 'Magsalita',
    instructionText: 'Sabihin sa akin ang tungkol sa iyong transaksyon sa iyong sariling wika. Halimbawa: "Kumita ako ng $500 mula sa aking sahod" o "Gumasta ako ng $20 sa tanghalian"',
    processing: 'Pinoproseso...',
    listeningText: 'Nakikinig...',
    transactionResult: 'Mga Detalye ng Transaksyon',
    amount: 'Halaga',
    type: 'Uri',
    reason: 'Dahilan',
    income: 'Kita',
    expense: 'Gastos',
    confirmButton: 'Kumpirmahin ang Transaksyon',
    cancelButton: 'Kanselahin',
    balanceUpdated: 'Matagumpay na na-update ang balanse!',
    error: 'Error sa pagproseso ng transaksyon. Pakisubukan muli.',
    speechNotSupported: 'Ang pagkilala sa pananalita ay hindi suportado sa iyong browser.',
    newBalance: 'Bagong Balanse',
    transactionHistory: 'Kasaysayan ng Transaksyon',
    viewHistory: 'Tingnan ang Lahat ng Transaksyon',
    calculatedFromTransactions: 'Kinalkula mula sa lahat ng transaksyon',
    getBudgetAdvice: 'Kumuha ng Payo sa Budget',
    noTransactions: 'Wala pang mga transaksyon',
    noTransactionsDesc: 'Magsimulang subaybayan ang iyong mga gastos at kita',
    date: 'Petsa',
    actions: 'Mga Aksyon',
    showing: 'Nagpapakita ng',
    of: 'sa',
    transactions: 'mga transaksyon',
    previous: 'Nakaraan',
    next: 'Susunod',
    totalIncome: 'Kabuuang Kita',
    totalExpense: 'Kabuuang Gastos',
    netBalance: 'Net na Balanse',
    deleteButton: 'Tanggalin',
    deleteConfirm: 'Sigurado ka bang gusto mong tanggalin ang transaksyon na ito?',
    generateButton: 'Lumikha ng Payo',
    generating: 'Lumilikha ng payo...',
    spendingBreakdown: 'Detalye ng Paggastos',
    totalExpenses: 'Kabuuang Gastos',
    adviceTitle: 'Ang Iyong Personalized na Payo sa Budget'
  },
  my: {
    title: 'Budget Brother',
    subtitle: 'သင့်အသုံးစရိတ်များနှင့် ၀င်ငွေများကို ခြေရာခံပါ',
    backButton: 'နောက်သို့',
    currentBalance: 'လက်ရှိလက်ကျန်',
    inputPlaceholder: 'သင့်ငွေလွှဲမှုကို ရိုက်ထည့်ပါ သို့မဟုတ် ပြောပါ...',
    submitButton: 'တင်သွင်းပါ',
    speakButton: 'ပြောပါ',
    instructionText: 'သင့်ကိုယ်ပိုင်ဘာသာစကားဖြင့် သင့်ငွေလွှဲမှုအကြောင်း ကျွန်ုပ်အား ပြောပြပါ။ ဥပမာ: "ကျွန်ုပ် လစာမှ $500 ရရှိခဲ့သည်" သို့မဟုတ် "ကျွန်ုပ် နေ့လည်စာအတွက် $20 သုံးစွဲခဲ့သည်"',
    processing: 'စီမံဆောင်ရွက်နေသည်...',
    listeningText: 'နားထောင်နေသည်...',
    transactionResult: 'ငွေလွှဲမှု အသေးစိတ်',
    amount: 'ပမာဏ',
    type: 'အမျိုးအစား',
    reason: 'အကြောင်းရင်း',
    income: '၀င်ငွေ',
    expense: 'အသုံးစရိတ်',
    confirmButton: 'ငွေလွှဲမှုကို အတည်ပြုပါ',
    cancelButton: 'ပယ်ဖျက်ပါ',
    balanceUpdated: 'လက်ကျန်ကို အောင်မြင်စွာ အပ်ဒိတ်လုပ်ပြီးပါပြီ!',
    error: 'ငွေလွှဲမှု စီမံဆောင်ရွက်ရာတွင် အမှား။ ထပ်မံကြိုးစားပါ။',
    speechNotSupported: 'သင့်ဘရောက်ဆာတွင် အသံအသိအမှတ်ပြုမှု မပံ့ပိုးပါ။',
    newBalance: 'လက်ကျန်အသစ်',
    transactionHistory: 'ငွေလွှဲမှု မှတ်တမ်း',
    viewHistory: 'ငွေလွှဲမှုအားလုံးကို ကြည့်ပါ',
    calculatedFromTransactions: 'ငွေလွှဲမှုအားလုံးမှ တွက်ချက်ထားသည်',
    getBudgetAdvice: 'ဘတ်ဂျက် အကြံဉာဏ် ရယူပါ',
    noTransactions: 'ငွေလွှဲမှုများ မရှိသေးပါ',
    noTransactionsDesc: 'သင့်အသုံးစရိတ်များနှင့် ၀င်ငွေများကို ခြေရာခံ စတင်ပါ',
    date: 'ရက်စွဲ',
    actions: 'လုပ်ဆောင်ချက်များ',
    showing: 'ပြသနေသည်',
    of: 'မှ',
    transactions: 'ငွေလွှဲမှုများ',
    previous: 'ယခင်',
    next: 'နောက်',
    totalIncome: 'စုစုပေါင်း ၀င်ငွေ',
    totalExpense: 'စုစုပေါင်း အသုံးစရိတ်',
    netBalance: 'အသားတင် လက်ကျန်',
    deleteButton: 'ဖျက်ပါ',
    deleteConfirm: 'ဤငွေလွှဲမှုကို ဖျက်လိုသည်မှာ သေချာပါသလား?',
    generateButton: 'အကြံဉာဏ် ထုတ်ပါ',
    generating: 'အကြံဉာဏ် ထုတ်နေသည်...',
    spendingBreakdown: 'အသုံးစရိတ် ခွဲခြမ်းစိတ်ဖြာမှု',
    totalExpenses: 'စုစုပေါင်း အသုံးစရိတ်',
    adviceTitle: 'သင့်ကိုယ်ပိုင် ဘတ်ဂျက် အကြံဉာဏ်'
  }
};

const sampleTransactions: Transaction[] = [
  { id: '1', amount: 2500, type: 'income', reason: 'Monthly Salary', date: '2024-01-01', timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000 },
  { id: '2', amount: 800, type: 'expense', reason: 'Rent Payment', date: '2024-01-02', timestamp: Date.now() - 29 * 24 * 60 * 60 * 1000 },
  { id: '3', amount: 150, type: 'expense', reason: 'Groceries', date: '2024-01-05', timestamp: Date.now() - 26 * 24 * 60 * 60 * 1000 },
  { id: '4', amount: 50, type: 'expense', reason: 'Transportation', date: '2024-01-07', timestamp: Date.now() - 24 * 24 * 60 * 60 * 1000 },
  { id: '5', amount: 200, type: 'income', reason: 'Freelance Work', date: '2024-01-10', timestamp: Date.now() - 21 * 24 * 60 * 60 * 1000 },
  { id: '6', amount: 100, type: 'expense', reason: 'Utilities', date: '2024-01-12', timestamp: Date.now() - 19 * 24 * 60 * 60 * 1000 },
  { id: '7', amount: 75, type: 'expense', reason: 'Dining Out', date: '2024-01-15', timestamp: Date.now() - 16 * 24 * 60 * 60 * 1000 },
  { id: '8', amount: 300, type: 'income', reason: 'Bonus', date: '2024-01-18', timestamp: Date.now() - 13 * 24 * 60 * 60 * 1000 },
  { id: '9', amount: 120, type: 'expense', reason: 'Phone Bill', date: '2024-01-20', timestamp: Date.now() - 11 * 24 * 60 * 60 * 1000 },
  { id: '10', amount: 200, type: 'expense', reason: 'Shopping', date: '2024-01-22', timestamp: Date.now() - 9 * 24 * 60 * 60 * 1000 },
  { id: '11', amount: 80, type: 'expense', reason: 'Entertainment', date: '2024-01-25', timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000 },
  { id: '12', amount: 150, type: 'expense', reason: 'Medical', date: '2024-01-27', timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000 },
  { id: '13', amount: 100, type: 'income', reason: 'Gift', date: '2024-01-28', timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 },
  { id: '14', amount: 90, type: 'expense', reason: 'Internet', date: '2024-01-29', timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 },
  { id: '15', amount: 85, type: 'expense', reason: 'Gas', date: '2024-01-30', timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000 }
];

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export function BudgetBrotherPage({ currentLang }: BudgetBrotherPageProps) {
  const navigate = useNavigate();
  const t = translations[currentLang];

  const [balance, setBalance] = useState<number>(0);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);
  const [error, setError] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>('none');
  
  // Transaction history state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Budget advice state
  const [advice, setAdvice] = useState<string>('');
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);
  const [adviceError, setAdviceError] = useState<string>('');

  useEffect(() => {
    const savedTransactions = localStorage.getItem('budgetBrotherTransactions');
    if (!savedTransactions) {
      localStorage.setItem('budgetBrotherTransactions', JSON.stringify(sampleTransactions));
      setTransactions(sampleTransactions);
    } else {
      setTransactions(JSON.parse(savedTransactions));
    }
    
    const newBalance = calculateBalance();
    setBalance(newBalance);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const newBalance = calculateBalance();
        setBalance(newBalance);
        const savedTransactions = localStorage.getItem('budgetBrotherTransactions');
        if (savedTransactions) {
          setTransactions(JSON.parse(savedTransactions));
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const calculateBalance = () => {
    const savedTransactions = localStorage.getItem('budgetBrotherTransactions');
    if (savedTransactions) {
      const transactions: Transaction[] = JSON.parse(savedTransactions);
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      return totalIncome - totalExpense;
    }
    return 0;
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError(t.speechNotSupported);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const languageMap: Record<LanguageCode, string> = {
      en: 'en-US',
      zh: 'zh-CN',
      ms: 'ms-MY',
      ta: 'ta-IN',
      bn: 'bn-IN',
      hi: 'hi-IN',
      th: 'th-TH',
      vi: 'vi-VN',
      id: 'id-ID',
      tl: 'tl-PH',
      my: 'my-MM'
    };

    recognition.lang = languageMap[currentLang] || 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setError(t.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processTransaction = async () => {
    if (!inputText.trim()) {
      setError('Please enter a transaction');
      return;
    }

    setIsProcessing(true);
    setError('');
    setTransactionResult(null);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a financial transaction parser. Analyze the user's input and extract:
1. The amount of money (as a positive number)
2. Whether it's income or expense
3. The reason/description

Respond ONLY with a JSON object in this exact format:
{
  "amount": <number>,
  "type": "income" or "expense",
  "reason": "<brief description>",
  "confidence": "high" or "medium" or "low"
}

If you cannot determine the transaction details with confidence, set confidence to "low" and make your best guess.`
          },
          {
            role: 'user',
            content: inputText
          }
        ],
        temperature: 0.3,
        max_tokens: 200
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from API');
      }

      const result = JSON.parse(content);
      setTransactionResult(result);
      setIsProcessing(false);
    } catch (err) {
      console.error('Error processing transaction:', err);
      setError(t.error);
      setIsProcessing(false);
    }
  };

  const confirmTransaction = () => {
    if (!transactionResult) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: transactionResult.amount,
      type: transactionResult.type,
      reason: transactionResult.reason,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now()
    };

    const savedTransactions = localStorage.getItem('budgetBrotherTransactions');
    const transactions: Transaction[] = savedTransactions ? JSON.parse(savedTransactions) : [];
    transactions.unshift(newTransaction);
    localStorage.setItem('budgetBrotherTransactions', JSON.stringify(transactions));
    
    setTransactions(transactions);
    const newBalance = calculateBalance();
    setBalance(newBalance);
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    setInputText('');
    setTransactionResult(null);
  };

  const cancelTransaction = () => {
    setTransactionResult(null);
    setInputText('');
    setError('');
  };

  const deleteTransaction = (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      const updatedTransactions = transactions.filter(t => t.id !== id);
      setTransactions(updatedTransactions);
      localStorage.setItem('budgetBrotherTransactions', JSON.stringify(updatedTransactions));
      
      const newBalance = calculateBalance();
      setBalance(newBalance);
      
      const newTotalPages = Math.ceil(updatedTransactions.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleGenerateAdvice = async () => {
    if (transactions.length === 0) {
      setAdviceError(t.noTransactions);
      return;
    }

    setIsLoadingAdvice(true);
    setAdviceError('');
    setAdvice('');
    setCategories([]);

    try {
      const result = await getPersonalizedBudgetAdvice(transactions, currentLang);
      setAdvice(result.advice);
      setCategories(result.categorization.categories);
      setTotalExpenses(result.categorization.totalExpenses);
    } catch (err) {
      console.error('Error generating advice:', err);
      setAdviceError(t.error);
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  const handleTabClick = (tab: TabType) => {
    if (activeTab === tab) {
      setActiveTab('none');
    } else {
      setActiveTab(tab);
      if (tab === 'advice' && !advice && !isLoadingAdvice) {
        handleGenerateAdvice();
      }
    }
  };

  // Transaction history calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900">{data.name}</p>
          <p className="text-slate-600">${data.value.toFixed(2)}</p>
          <p className="text-sm text-slate-500">{data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backButton}</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-800 mb-4">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
            {t.title}
          </h1>
          <p className="text-xl text-slate-600">
            {t.subtitle}
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-semibold">{t.balanceUpdated}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="text-center">
            <p className="text-slate-600 text-lg mb-2">{t.currentBalance}</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-8 h-8 text-black-600" />
              <span className="text-5xl font-bold text-black">
                {balance.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-slate-500 italic">{t.calculatedFromTransactions}</p>
          </div>
        </div>

        {transactionResult && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              {t.transactionResult}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">{t.type}:</span>
                <span className={`font-medium ${
                  transactionResult.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transactionResult.type === 'income' ? t.income : t.expense}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">{t.amount}:</span>
                <span className="text-2xl font-bold text-slate-900">
                  ${transactionResult.amount.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-600 font-medium">{t.reason}:</span>
                <span className="text-slate-900 font-medium">{transactionResult.reason}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <span className="text-slate-600 font-medium">{t.newBalance}:</span>
                <span className="text-2xl font-bold text-black">
                  ${(transactionResult.type === 'income' 
                    ? balance + transactionResult.amount 
                    : balance - transactionResult.amount
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={cancelTransaction}
                className="flex-1 px-6 py-4 bg-white-600 border border-red-200 text-red-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                {t.cancelButton}
              </button>
              <button
                onClick={confirmTransaction}
                className="flex-1 px-6 py-4 bg-white-600 border border-green-200 text-green-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                {t.confirmButton}
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.inputPlaceholder}
                className="flex-1 px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
                disabled={isProcessing || isListening}
              />
              <button
                onClick={startListening}
                disabled={isProcessing || isListening}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-slate-200 text-black hover:shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Mic className="w-6 h-6" />
              </button>
              <button
                onClick={processTransaction}
                disabled={isProcessing || isListening || !inputText.trim()}
                className="px-6 py-4 bg-cyan-800 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                {t.submitButton}
              </button>
            </div>
            {isListening && (
              <p className="text-purple-600 text-sm mt-2 animate-pulse">{t.listeningText}</p>
            )}
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
            <p className="text-slate-700 text-sm leading-relaxed">
              {t.instructionText}
            </p>
          </div>
        </div>

        {isProcessing && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-slate-600 text-lg">{t.processing}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Tab Bar */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => handleTabClick('history')}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-cyan-800 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <History className="w-5 h-5" />
              {t.transactionHistory}
            </button>
            <button
              onClick={() => handleTabClick('advice')}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'advice'
                  ? 'bg-cyan-800 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Lightbulb className="w-5 h-5" />
              {t.getBudgetAdvice}
            </button>
          </div>

          {/* Transaction History Content */}
          {activeTab === 'history' && (
            <div className="p-6 animate-fade-in">
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{t.noTransactions}</h3>
                  <p className="text-slate-600">{t.noTransactionsDesc}</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h3 className="text-slate-600 font-medium mb-1">{t.totalIncome}</h3>
                      <p className="text-2xl font-bold text-black-600">
                        ${totalIncome.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h3 className="text-slate-600 font-medium mb-1">{t.totalExpense}</h3>
                      <p className="text-2xl font-bold text-black-600">
                        ${totalExpense.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h3 className="text-slate-600 font-medium mb-1">{t.netBalance}</h3>
                      <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-black-600' : 'text-black-600'}`}>
                        ${netBalance.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {currentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                                transaction.type === 'income'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {/* {transaction.type === 'income' ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )} */}
                              {transaction.type === 'income' ? t.income : t.expense}
                            </span>
                            <span className="text-sm text-slate-500">{transaction.date}</span>
                          </div>
                          <p className="font-medium text-slate-900">{transaction.reason}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`text-xl font-bold ${
                              transaction.type === 'income' ? 'text-black-600' : 'text-black-600'
                            }`}
                          >
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </span>
                          <button
                            onClick={() => deleteTransaction(transaction.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title={t.deleteButton}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
                      <div className="text-slate-600 text-sm">
                        {t.showing} {startIndex + 1}-{Math.min(endIndex, transactions.length)} {t.of}{' '}
                        {transactions.length} {t.transactions}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          {t.previous}
                        </button>
                        <div className="px-4 py-2 bg-cyan-800 text-white rounded-xl font-bold">
                          {currentPage}
                        </div>
                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          {t.next}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Budget Advice Content */}
          {activeTab === 'advice' && (
            <div className="p-6 animate-fade-in">
              {isLoadingAdvice ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-800 mr-3" />
                  <p className="text-slate-600 text-lg">{t.generating}</p>
                </div>
              ) : adviceError ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-700">{adviceError}</p>
                </div>
              ) : advice ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {categories.length > 0 && (
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <PieChartIcon className="w-6 h-6 text-cyan-800" />
                        <h3 className="text-xl font-bold text-slate-900">{t.spendingBreakdown}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-slate-600">{t.totalExpenses}</p>
                        <p className="text-2xl font-bold text-slate-900">${totalExpenses.toFixed(2)}</p>
                      </div>

                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={categories}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="mt-4 space-y-2">
                        {categories.map((category, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: category.color }}
                              />
                              <span className="font-medium text-slate-900">{category.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-slate-900">${category.value.toFixed(2)}</p>
                              <p className="text-sm text-slate-600">{category.percentage.toFixed(1)}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{t.adviceTitle}</h3>
                    <div className="prose prose-slate max-w-none">
                      <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {advice}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <button
                    onClick={handleGenerateAdvice}
                    disabled={transactions.length === 0}
                    className="px-8 py-4 bg-cyan-800 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto"
                  >
                    <TrendingUp className="w-6 h-6" />
                    {t.generateButton}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
