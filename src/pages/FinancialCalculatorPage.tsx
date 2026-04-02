import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Plus, Trash2 } from 'lucide-react';
import { LanguageCode } from '../translations';

interface FinancialCalculatorPageProps {
  currentLang: LanguageCode;
}

interface Deduction {
  id: string;
  name: string;
  amount: number;
}

interface Necessity {
  id: string;
  name: string;
  amount: number;
}

interface CalculatorTranslations {
  backButton: string;
  title: string;
  subtitle: string;
  grossSalary: string;
  grossSalaryPlaceholder: string;
  deductions: string;
  addDeduction: string;
  deductionName: string;
  deductionAmount: string;
  necessities: string;
  addNecessity: string;
  necessityName: string;
  necessityAmount: string;
  calculate: string;
  results: string;
  totalDeductions: string;
  totalNecessities: string;
  takeHomePay: string;
  disposableIncome: string;
  currency: string;
}

const calculatorTranslations: Record<LanguageCode, CalculatorTranslations> = {
  en: {
    backButton: 'Back to Home',
    title: 'Financial Calculator',
    subtitle: 'Calculate your take-home pay and disposable income',
    grossSalary: 'Gross Monthly Salary',
    grossSalaryPlaceholder: 'Enter your gross salary',
    deductions: 'Deductions',
    addDeduction: 'Add Deduction',
    deductionName: 'Deduction name (e.g., CPF, Tax)',
    deductionAmount: 'Amount',
    necessities: 'Monthly Necessities',
    addNecessity: 'Add Necessity',
    necessityName: 'Necessity name (e.g., Rent, Food)',
    necessityAmount: 'Amount',
    calculate: 'Calculate',
    results: 'Results',
    totalDeductions: 'Total Deductions',
    totalNecessities: 'Total Necessities',
    takeHomePay: 'Take-Home Pay',
    disposableIncome: 'Disposable Income',
    currency: 'SGD'
  },
  zh: {
    backButton: '返回',
    title: '财务计算器',
    subtitle: '计算您的实得工资和可支配收入',
    grossSalary: '月总工资',
    grossSalaryPlaceholder: '输入您的总工资',
    deductions: '扣除项',
    addDeduction: '添加扣除项',
    deductionName: '扣除项名称（例如：公积金、税）',
    deductionAmount: '金额',
    necessities: '每月必需品',
    addNecessity: '添加必需品',
    necessityName: '必需品名称（例如：租金、食物）',
    necessityAmount: '金额',
    calculate: '计算',
    results: '结果',
    totalDeductions: '总扣除额',
    totalNecessities: '总必需品',
    takeHomePay: '实得工资',
    disposableIncome: '可支配收入',
    currency: '新元'
  },
  ms: {
    backButton: 'Kembali',
    title: 'Kalkulator Kewangan',
    subtitle: 'Kira gaji bawa pulang dan pendapatan boleh guna anda',
    grossSalary: 'Gaji Kasar Bulanan',
    grossSalaryPlaceholder: 'Masukkan gaji kasar anda',
    deductions: 'Potongan',
    addDeduction: 'Tambah Potongan',
    deductionName: 'Nama potongan (cth: KWSP, Cukai)',
    deductionAmount: 'Jumlah',
    necessities: 'Keperluan Bulanan',
    addNecessity: 'Tambah Keperluan',
    necessityName: 'Nama keperluan (cth: Sewa, Makanan)',
    necessityAmount: 'Jumlah',
    calculate: 'Kira',
    results: 'Keputusan',
    totalDeductions: 'Jumlah Potongan',
    totalNecessities: 'Jumlah Keperluan',
    takeHomePay: 'Gaji Bawa Pulang',
    disposableIncome: 'Pendapatan Boleh Guna',
    currency: 'SGD'
  },
  ta: {
    backButton: 'பின்செல்',
    title: 'நிதி கணிப்பான்',
    subtitle: 'உங்கள் வீட்டிற்கு எடுத்துச் செல்லும் ஊதியம் மற்றும் செலவிடக்கூடிய வருமானத்தை கணக்கிடுங்கள்',
    grossSalary: 'மாதாந்திர மொத்த சம்பளம்',
    grossSalaryPlaceholder: 'உங்கள் மொத்த சம்பளத்தை உள்ளிடவும்',
    deductions: 'கழிவுகள்',
    addDeduction: 'கழிவு சேர்க்கவும்',
    deductionName: 'கழிவு பெயர் (எ.கா: CPF, வரி)',
    deductionAmount: 'தொகை',
    necessities: 'மாதாந்திர தேவைகள்',
    addNecessity: 'தேவை சேர்க்கவும்',
    necessityName: 'தேவை பெயர் (எ.கா: வாடகை, உணவு)',
    necessityAmount: 'தொகை',
    calculate: 'கணக்கிடு',
    results: 'முடிவுகள்',
    totalDeductions: 'மொத்த கழிவுகள்',
    totalNecessities: 'மொத்த தேவைகள்',
    takeHomePay: 'வீட்டிற்கு எடுத்துச் செல்லும் ஊதியம்',
    disposableIncome: 'செலவிடக்கூடிய வருமானம்',
    currency: 'SGD'
  },
  bn: {
    backButton: 'ফিরে যান',
    title: 'আর্থিক ক্যালকুলেটর',
    subtitle: 'আপনার বাড়িতে নেওয়া বেতন এবং ব্যয়যোগ্য আয় গণনা করুন',
    grossSalary: 'মাসিক মোট বেতন',
    grossSalaryPlaceholder: 'আপনার মোট বেতন লিখুন',
    deductions: 'কর্তন',
    addDeduction: 'কর্তন যোগ করুন',
    deductionName: 'কর্তনের নাম (যেমন: CPF, কর)',
    deductionAmount: 'পরিমাণ',
    necessities: 'মাসিক প্রয়োজনীয়তা',
    addNecessity: 'প্রয়োজনীয়তা যোগ করুন',
    necessityName: 'প্রয়োজনীয়তার নাম (যেমন: ভাড়া, খাবার)',
    necessityAmount: 'পরিমাণ',
    calculate: 'গণনা করুন',
    results: 'ফলাফল',
    totalDeductions: 'মোট কর্তন',
    totalNecessities: 'মোট প্রয়োজনীয়তা',
    takeHomePay: 'বাড়িতে নেওয়া বেতন',
    disposableIncome: 'ব্যয়যোগ্য আয়',
    currency: 'SGD'
  },
  hi: {
    backButton: 'वापस',
    title: 'वित्तीय कैलकुलेटर',
    subtitle: 'अपने घर ले जाने वाले वेतन और व्यय योग्य आय की गणना करें',
    grossSalary: 'मासिक सकल वेतन',
    grossSalaryPlaceholder: 'अपना सकल वेतन दर्ज करें',
    deductions: 'कटौती',
    addDeduction: 'कटौती जोड़ें',
    deductionName: 'कटौती का नाम (जैसे: CPF, कर)',
    deductionAmount: 'राशि',
    necessities: 'मासिक आवश्यकताएं',
    addNecessity: 'आवश्यकता जोड़ें',
    necessityName: 'आवश्यकता का नाम (जैसे: किराया, भोजन)',
    necessityAmount: 'राशि',
    calculate: 'गणना करें',
    results: 'परिणाम',
    totalDeductions: 'कुल कटौती',
    totalNecessities: 'कुल आवश्यकताएं',
    takeHomePay: 'घर ले जाने वाला वेतन',
    disposableIncome: 'व्यय योग्य आय',
    currency: 'SGD'
  },
  th: {
    backButton: 'กลับ',
    title: 'เครื่องคำนวณทางการเงิน',
    subtitle: 'คำนวณเงินเดือนสุทธิและรายได้ที่ใช้จ่ายได้ของคุณ',
    grossSalary: 'เงินเดือนรวมรายเดือน',
    grossSalaryPlaceholder: 'ใส่เงินเดือนรวมของคุณ',
    deductions: 'การหัก',
    addDeduction: 'เพิ่มการหัก',
    deductionName: 'ชื่อการหัก (เช่น CPF, ภาษี)',
    deductionAmount: 'จำนวน',
    necessities: 'ความจำเป็นรายเดือน',
    addNecessity: 'เพิ่มความจำเป็น',
    necessityName: 'ชื่อความจำเป็น (เช่น ค่าเช่า, อาหาร)',
    necessityAmount: 'จำนวน',
    calculate: 'คำนวณ',
    results: 'ผลลัพธ์',
    totalDeductions: 'การหักทั้งหมด',
    totalNecessities: 'ความจำเป็นทั้งหมด',
    takeHomePay: 'เงินเดือนสุทธิ',
    disposableIncome: 'รายได้ที่ใช้จ่ายได้',
    currency: 'SGD'
  },
  vi: {
    backButton: 'Quay lại',
    title: 'Máy Tính Tài Chính',
    subtitle: 'Tính lương thực nhận và thu nhập khả dụng của bạn',
    grossSalary: 'Lương Tổng Hàng Tháng',
    grossSalaryPlaceholder: 'Nhập lương tổng của bạn',
    deductions: 'Các Khoản Khấu Trừ',
    addDeduction: 'Thêm Khấu Trừ',
    deductionName: 'Tên khấu trừ (ví dụ: CPF, Thuế)',
    deductionAmount: 'Số tiền',
    necessities: 'Chi Phí Cần Thiết Hàng Tháng',
    addNecessity: 'Thêm Chi Phí Cần Thiết',
    necessityName: 'Tên chi phí (ví dụ: Tiền thuê, Thức ăn)',
    necessityAmount: 'Số tiền',
    calculate: 'Tính Toán',
    results: 'Kết Quả',
    totalDeductions: 'Tổng Khấu Trừ',
    totalNecessities: 'Tổng Chi Phí Cần Thiết',
    takeHomePay: 'Lương Thực Nhận',
    disposableIncome: 'Thu Nhập Khả Dụng',
    currency: 'SGD'
  },
  id: {
    backButton: 'Kembali',
    title: 'Kalkulator Keuangan',
    subtitle: 'Hitung gaji bersih dan pendapatan yang dapat dibelanjakan',
    grossSalary: 'Gaji Kotor Bulanan',
    grossSalaryPlaceholder: 'Masukkan gaji kotor Anda',
    deductions: 'Potongan',
    addDeduction: 'Tambah Potongan',
    deductionName: 'Nama potongan (mis: CPF, Pajak)',
    deductionAmount: 'Jumlah',
    necessities: 'Kebutuhan Bulanan',
    addNecessity: 'Tambah Kebutuhan',
    necessityName: 'Nama kebutuhan (mis: Sewa, Makanan)',
    necessityAmount: 'Jumlah',
    calculate: 'Hitung',
    results: 'Hasil',
    totalDeductions: 'Total Potongan',
    totalNecessities: 'Total Kebutuhan',
    takeHomePay: 'Gaji Bersih',
    disposableIncome: 'Pendapatan yang Dapat Dibelanjakan',
    currency: 'SGD'
  },
  tl: {
    backButton: 'Bumalik',
    title: 'Calculator ng Pananalapi',
    subtitle: 'Kalkulahin ang inyong take-home pay at disposable income',
    grossSalary: 'Kabuuang Buwanang Sahod',
    grossSalaryPlaceholder: 'Ilagay ang inyong kabuuang sahod',
    deductions: 'Mga Bawas',
    addDeduction: 'Magdagdag ng Bawas',
    deductionName: 'Pangalan ng bawas (hal: CPF, Buwis)',
    deductionAmount: 'Halaga',
    necessities: 'Buwanang Pangangailangan',
    addNecessity: 'Magdagdag ng Pangangailangan',
    necessityName: 'Pangalan ng pangangailangan (hal: Renta, Pagkain)',
    necessityAmount: 'Halaga',
    calculate: 'Kalkulahin',
    results: 'Mga Resulta',
    totalDeductions: 'Kabuuang Bawas',
    totalNecessities: 'Kabuuang Pangangailangan',
    takeHomePay: 'Take-Home Pay',
    disposableIncome: 'Disposable Income',
    currency: 'SGD'
  },
  my: {
    backButton: 'နောက်သို့',
    title: 'ငွေကြေးတွက်စက်',
    subtitle: 'သင့်အိမ်သို့ယူဆောင်သွားသည့်လစာနှင့် သုံးစွဲနိုင်သောဝင်ငွေကို တွက်ချက်ပါ',
    grossSalary: 'လစဉ်စုစုပေါင်းလစာ',
    grossSalaryPlaceholder: 'သင့်စုစုပေါင်းလစာကို ထည့်ပါ',
    deductions: 'နုတ်ယူမှုများ',
    addDeduction: 'နုတ်ယူမှု ထည့်ပါ',
    deductionName: 'နုတ်ယူမှုအမည် (ဥပမာ: CPF, အခွန်)',
    deductionAmount: 'ပမာဏ',
    necessities: 'လစဉ်လိုအပ်ချက်များ',
    addNecessity: 'လိုအပ်ချက် ထည့်ပါ',
    necessityName: 'လိုအပ်ချက်အမည် (ဥပမာ: အိမ်ငှား, အစားအစာ)',
    necessityAmount: 'ပမာဏ',
    calculate: 'တွက်ချက်ပါ',
    results: 'ရလဒ်များ',
    totalDeductions: 'စုစုပေါင်းနုတ်ယူမှုများ',
    totalNecessities: 'စုစုပေါင်းလိုအပ်ချက်များ',
    takeHomePay: 'အိမ်သို့ယူဆောင်သွားသည့်လစာ',
    disposableIncome: 'သုံးစွဲနိုင်သောဝင်ငွေ',
    currency: 'SGD'
  }
};

export function FinancialCalculatorPage({ currentLang }: FinancialCalculatorPageProps) {
  const navigate = useNavigate();
  const t = calculatorTranslations[currentLang];

  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [deductions, setDeductions] = useState<Deduction[]>([
    { id: '1', name: 'CPF', amount: 0 }
  ]);
  const [necessities, setNecessities] = useState<Necessity[]>([
    { id: '1', name: 'Rent', amount: 0 },
    { id: '2', name: 'Food', amount: 0 }
  ]);
  const [showResults, setShowResults] = useState(false);

  const addDeduction = () => {
    setDeductions([...deductions, { id: Date.now().toString(), name: '', amount: 0 }]);
  };

  const removeDeduction = (id: string) => {
    setDeductions(deductions.filter(d => d.id !== id));
  };

  const updateDeduction = (id: string, field: 'name' | 'amount', value: string | number) => {
    setDeductions(deductions.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const addNecessity = () => {
    setNecessities([...necessities, { id: Date.now().toString(), name: '', amount: 0 }]);
  };

  const removeNecessity = (id: string) => {
    setNecessities(necessities.filter(n => n.id !== id));
  };

  const updateNecessity = (id: string, field: 'name' | 'amount', value: string | number) => {
    setNecessities(necessities.map(n => 
      n.id === id ? { ...n, [field]: value } : n
    ));
  };

  const totalDeductions = deductions.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalNecessities = necessities.reduce((sum, n) => sum + (Number(n.amount) || 0), 0);
  const takeHomePay = grossSalary - totalDeductions;
  const disposableIncome = takeHomePay - totalNecessities;

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-transparent to-teal-100/50"></div>
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
              <DollarSign className="w-10 h-10 text-white" />
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

      {/* Calculator Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-8">
          {/* Gross Salary */}
          <div>
            <label className="block text-lg font-semibold text-slate-900 mb-3">
              {t.grossSalary}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                {t.currency}
              </span>
              <input
                type="number"
                value={grossSalary || ''}
                onChange={(e) => setGrossSalary(Number(e.target.value))}
                placeholder={t.grossSalaryPlaceholder}
                className="w-full pl-16 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-2 focus:border-cyan-700 transition-all text-lg"
              />
            </div>
          </div>

          {/* Deductions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{t.deductions}</h3>
              <button
                onClick={addDeduction}
                className="flex items-center gap-2 px-4 py-2 border-cyan-800 rounded-lg hover:bg-slate-100 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                {t.addDeduction}
              </button>
            </div>
            <div className="space-y-3">
              {deductions.map((deduction) => (
                <div key={deduction.id} className="flex gap-3">
                  <input
                    type="text"
                    value={deduction.name}
                    onChange={(e) => updateDeduction(deduction.id, 'name', e.target.value)}
                    placeholder={t.deductionName}
                    className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-2 focus:border-cyan-700 transition-all"
                  />
                  <div className="relative w-40">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                      {t.currency}
                    </span>
                    <input
                      type="number"
                      value={deduction.amount || ''}
                      onChange={(e) => updateDeduction(deduction.id, 'amount', Number(e.target.value))}
                      placeholder={t.deductionAmount}
                      className="w-full pl-12 pr-3 py-2 border-2 border-slate-200 rounded-lg focus:border-2 focus:border-cyan-700 transition-all"
                    />
                  </div>
                  <button
                    onClick={() => removeDeduction(deduction.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Necessities */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{t.necessities}</h3>
              <button
                onClick={addNecessity}
                className="flex items-center gap-2 px-4 py-2 border-cyan-800 text-slate-900 rounded-lg hover:bg-slate-100 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                {t.addNecessity}
              </button>
            </div>
            <div className="space-y-3">
              {necessities.map((necessity) => (
                <div key={necessity.id} className="flex gap-3">
                  <input
                    type="text"
                    value={necessity.name}
                    onChange={(e) => updateNecessity(necessity.id, 'name', e.target.value)}
                    placeholder={t.necessityName}
                    className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-2 focus:border-cyan-700 transition-all"
                  />
                  <div className="relative w-40">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                      {t.currency}
                    </span>
                    <input
                      type="number"
                      value={necessity.amount || ''}
                      onChange={(e) => updateNecessity(necessity.id, 'amount', Number(e.target.value))}
                      placeholder={t.necessityAmount}
                      className="w-full pl-12 pr-3 py-2 border-2 border-slate-200 rounded-lg focus:border-2 focus:border-cyan-700 transition-all"
                    />
                  </div>
                  <button
                    onClick={() => removeNecessity(necessity.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-4 bg-cyan-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {t.calculate}
          </button>

          {/* Results */}
          {showResults && (
            <div className="mt-8 p-6 bg-slate-50 rounded-xl border-2 border-cyan-800">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">{t.results}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="text-slate-700 font-medium">{t.totalDeductions}</span>
                  <span className="text-xl font-bold text-black">
                    {t.currency} {totalDeductions.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="text-slate-700 font-medium">{t.takeHomePay}</span>
                  <span className="text-xl font-bold text-black">
                    {t.currency} {takeHomePay.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="text-slate-700 font-medium">{t.totalNecessities}</span>
                  <span className="text-xl font-bold text-black">
                    {t.currency} {totalNecessities.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white border-cyan-800 rounded-lg">
                  <span className="text-black font-bold text-lg">{t.disposableIncome}</span>
                  <span className="text-2xl font-bold text-black">
                    {t.currency} {disposableIncome.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
