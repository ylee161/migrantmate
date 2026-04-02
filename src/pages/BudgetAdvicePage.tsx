import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lightbulb, TrendingUp, Loader2, PieChart as PieChartIcon } from 'lucide-react';
import { LanguageCode } from '../translations';
import { getPersonalizedBudgetAdvice, CategoryData } from '../services/budgetAdviceService';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BudgetAdvicePageProps {
  currentLang: LanguageCode;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  reason: string;
  date: string;
  timestamp: number;
}

const translations = {
  en: {
    title: 'Budget Advice',
    subtitle: 'Get personalized financial guidance',
    backButton: 'Back',
    generateButton: 'Generate Advice',
    generating: 'Generating advice...',
    noTransactions: 'No transactions found. Start tracking your expenses in Budget Brother to get personalized advice.',
    error: 'Failed to generate advice. Please try again.',
    spendingBreakdown: 'Spending Breakdown',
    totalExpenses: 'Total Expenses',
    adviceTitle: 'Your Personalized Budget Advice'
  },
  zh: {
    title: '预算建议',
    subtitle: '获取个性化财务指导',
    backButton: '返回',
    generateButton: '生成建议',
    generating: '正在生成建议...',
    noTransactions: '未找到交易记录。在预算兄弟中开始跟踪您的支出以获得个性化建议。',
    error: '生成建议失败。请重试。',
    spendingBreakdown: '支出细分',
    totalExpenses: '总支出',
    adviceTitle: '您的个性化预算建议'
  },
  ms: {
    title: 'Nasihat Bajet',
    subtitle: 'Dapatkan panduan kewangan yang diperibadikan',
    backButton: 'Kembali',
    generateButton: 'Jana Nasihat',
    generating: 'Menjana nasihat...',
    noTransactions: 'Tiada transaksi dijumpai. Mula jejaki perbelanjaan anda dalam Budget Brother untuk mendapat nasihat yang diperibadikan.',
    error: 'Gagal menjana nasihat. Sila cuba lagi.',
    spendingBreakdown: 'Pecahan Perbelanjaan',
    totalExpenses: 'Jumlah Perbelanjaan',
    adviceTitle: 'Nasihat Bajet Peribadi Anda'
  },
  ta: {
    title: 'பட்ஜெட் ஆலோசனை',
    subtitle: 'தனிப்பயனாக்கப்பட்ட நிதி வழிகாட்டுதலைப் பெறுங்கள்',
    backButton: 'திரும்பு',
    generateButton: 'ஆலோசனையை உருவாக்கு',
    generating: 'ஆலோசனையை உருவாக்குகிறது...',
    noTransactions: 'பரிவர்த்தனைகள் எதுவும் கிடைக்கவில்லை. தனிப்பயனாக்கப்பட்ட ஆலோசனையைப் பெற பட்ஜெட் பிரதரில் உங்கள் செலவுகளைக் கண்காணிக்கத் தொடங்குங்கள்.',
    error: 'ஆலோசனையை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    spendingBreakdown: 'செலவு பிரிவு',
    totalExpenses: 'மொத்த செலவுகள்',
    adviceTitle: 'உங்கள் தனிப்பயனாக்கப்பட்ட பட்ஜெட் ஆலோசனை'
  },
  bn: {
    title: 'বাজেট পরামর্শ',
    subtitle: 'ব্যক্তিগত আর্থিক নির্দেশনা পান',
    backButton: 'ফিরে যান',
    generateButton: 'পরামর্শ তৈরি করুন',
    generating: 'পরামর্শ তৈরি করা হচ্ছে...',
    noTransactions: 'কোনো লেনদেন পাওয়া যায়নি। ব্যক্তিগত পরামর্শ পেতে বাজেট ব্রাদারে আপনার খরচ ট্র্যাক করা শুরু করুন।',
    error: 'পরামর্শ তৈরি করতে ব্যর্থ। আবার চেষ্টা করুন।',
    spendingBreakdown: 'খরচের বিভাজন',
    totalExpenses: 'মোট খরচ',
    adviceTitle: 'আপনার ব্যক্তিগত বাজেট পরামর্শ'
  },
  hi: {
    title: 'बजट सलाह',
    subtitle: 'व्यक्तिगत वित्तीय मार्गदर्शन प्राप्त करें',
    backButton: 'वापस',
    generateButton: 'सलाह उत्पन्न करें',
    generating: 'सलाह उत्पन्न हो रही है...',
    noTransactions: 'कोई लेनदेन नहीं मिला। व्यक्तिगत सलाह प्राप्त करने के लिए बजट ब्रदर में अपने खर्चों को ट्रैक करना शुरू करें।',
    error: 'सलाह उत्पन्न करने में विफल। कृपया पुनः प्रयास करें।',
    spendingBreakdown: 'खर्च का विवरण',
    totalExpenses: 'कुल खर्च',
    adviceTitle: 'आपकी व्यक्तिगत बजट सलाह'
  },
  th: {
    title: 'คำแนะนำงบประมาณ',
    subtitle: 'รับคำแนะนำทางการเงินส่วนบุคคล',
    backButton: 'กลับ',
    generateButton: 'สร้างคำแนะนำ',
    generating: 'กำลังสร้างคำแนะนำ...',
    noTransactions: 'ไม่พบธุรกรรม เริ่มติดตามค่าใช้จ่ายของคุณใน Budget Brother เพื่อรับคำแนะนำส่วนบุคคล',
    error: 'ไม่สามารถสร้างคำแนะนำได้ โปรดลองอีกครั้ง',
    spendingBreakdown: 'รายละเอียดการใช้จ่าย',
    totalExpenses: 'ค่าใช้จ่ายทั้งหมด',
    adviceTitle: 'คำแนะนำงบประมาณส่วนบุคคลของคุณ'
  },
  vi: {
    title: 'Lời Khuyên Ngân Sách',
    subtitle: 'Nhận hướng dẫn tài chính cá nhân hóa',
    backButton: 'Quay lại',
    generateButton: 'Tạo Lời Khuyên',
    generating: 'Đang tạo lời khuyên...',
    noTransactions: 'Không tìm thấy giao dịch. Bắt đầu theo dõi chi tiêu của bạn trong Budget Brother để nhận lời khuyên cá nhân hóa.',
    error: 'Không thể tạo lời khuyên. Vui lòng thử lại.',
    spendingBreakdown: 'Phân Tích Chi Tiêu',
    totalExpenses: 'Tổng Chi Tiêu',
    adviceTitle: 'Lời Khuyên Ngân Sách Cá Nhân Của Bạn'
  },
  id: {
    title: 'Saran Anggaran',
    subtitle: 'Dapatkan panduan keuangan yang dipersonalisasi',
    backButton: 'Kembali',
    generateButton: 'Buat Saran',
    generating: 'Membuat saran...',
    noTransactions: 'Tidak ada transaksi ditemukan. Mulai lacak pengeluaran Anda di Budget Brother untuk mendapatkan saran yang dipersonalisasi.',
    error: 'Gagal membuat saran. Silakan coba lagi.',
    spendingBreakdown: 'Rincian Pengeluaran',
    totalExpenses: 'Total Pengeluaran',
    adviceTitle: 'Saran Anggaran Pribadi Anda'
  },
  tl: {
    title: 'Payo sa Budget',
    subtitle: 'Kumuha ng personalized na gabay sa pananalapi',
    backButton: 'Bumalik',
    generateButton: 'Lumikha ng Payo',
    generating: 'Lumilikha ng payo...',
    noTransactions: 'Walang nahanap na transaksyon. Magsimulang subaybayan ang iyong mga gastos sa Budget Brother upang makakuha ng personalized na payo.',
    error: 'Nabigo ang paglikha ng payo. Pakisubukan muli.',
    spendingBreakdown: 'Detalye ng Paggastos',
    totalExpenses: 'Kabuuang Gastos',
    adviceTitle: 'Ang Iyong Personalized na Payo sa Budget'
  },
  my: {
    title: 'ဘတ်ဂျက် အကြံဉာဏ်',
    subtitle: 'ကိုယ်ပိုင် ငွေကြေး လမ်းညွှန်မှု ရယူပါ',
    backButton: 'နောက်သို့',
    generateButton: 'အကြံဉာဏ် ထုတ်ပါ',
    generating: 'အကြံဉာဏ် ထုတ်နေသည်...',
    noTransactions: 'ငွေလွှဲမှု မတွေ့ပါ။ ကိုယ်ပိုင် အကြံဉာဏ် ရရှိရန် Budget Brother တွင် သင့်အသုံးစရိတ်များကို ခြေရာခံ စတင်ပါ။',
    error: 'အကြံဉာဏ် ထုတ်ရန် မအောင်မြင်ပါ။ ထပ်မံကြိုးစားပါ။',
    spendingBreakdown: 'အသုံးစရိတ် ခွဲခြမ်းစိတ်ဖြာမှု',
    totalExpenses: 'စုစုပေါင်း အသုံးစရိတ်',
    adviceTitle: 'သင့်ကိုယ်ပိုင် ဘတ်ဂျက် အကြံဉာဏ်'
  }
};

export function BudgetAdvicePage({ currentLang }: BudgetAdvicePageProps) {
  const navigate = useNavigate();
  const t = translations[currentLang];

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [advice, setAdvice] = useState<string>('');
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const savedTransactions = localStorage.getItem('budgetBrotherTransactions');
    if (savedTransactions) {
      const parsed: Transaction[] = JSON.parse(savedTransactions);
      setTransactions(parsed);
    }
  }, []);

  const handleGenerateAdvice = async () => {
    if (transactions.length === 0) {
      setError(t.noTransactions);
      return;
    }

    setIsLoading(true);
    setError('');
    setAdvice('');
    setCategories([]);

    try {
      const result = await getPersonalizedBudgetAdvice(transactions, currentLang);
      setAdvice(result.advice);
      setCategories(result.categorization.categories);
      setTotalExpenses(result.categorization.totalExpenses);
    } catch (err) {
      console.error('Error generating advice:', err);
      setError(t.error);
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backButton}</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-800 mb-4">
            <Lightbulb className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
            {t.title}
          </h1>
          <p className="text-xl text-slate-600">
            {t.subtitle}
          </p>
        </div>

        {/* Generate Button */}
        <div className="mb-8 text-center">
          <button
            onClick={handleGenerateAdvice}
            disabled={isLoading || transactions.length === 0}
            className="px-8 py-4 bg-cyan-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                {t.generating}
              </>
            ) : (
              <>
                <TrendingUp className="w-6 h-6" />
                {t.generateButton}
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Results */}
        {(advice || categories.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            {categories.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <PieChartIcon className="w-6 h-6 text-cyan-800" />
                  <h2 className="text-2xl font-bold text-slate-900">{t.spendingBreakdown}</h2>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-600">{t.totalExpenses}</p>
                  <p className="text-3xl font-bold text-slate-900">${totalExpenses.toFixed(2)}</p>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                      outerRadius={100}
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

                <div className="mt-6 space-y-2">
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

            {/* Advice */}
            {advice && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.adviceTitle}</h2>
                <div className="prose prose-slate max-w-none">
                  <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {advice}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
