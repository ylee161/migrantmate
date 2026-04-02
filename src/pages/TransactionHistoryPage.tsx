import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { LanguageCode } from '../translations';

interface TransactionHistoryPageProps {
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
    title: 'Transaction History',
    subtitle: 'View all your transactions',
    backButton: 'Back',
    noTransactions: 'No transactions yet',
    noTransactionsDesc: 'Start tracking your expenses and income in Budget Brother',
    amount: 'Amount',
    type: 'Type',
    reason: 'Reason',
    date: 'Date',
    actions: 'Actions',
    income: 'Income',
    expense: 'Expense',
    showing: 'Showing',
    of: 'of',
    transactions: 'transactions',
    previous: 'Previous',
    next: 'Next',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expenses',
    netBalance: 'Net Balance',
    deleteButton: 'Delete',
    deleteConfirm: 'Are you sure you want to delete this transaction?'
  },
  zh: {
    title: '交易历史',
    subtitle: '查看所有交易',
    backButton: '返回',
    noTransactions: '暂无交易',
    noTransactionsDesc: '在预算兄弟中开始跟踪您的支出和收入',
    amount: '金额',
    type: '类型',
    reason: '原因',
    date: '日期',
    actions: '操作',
    income: '收入',
    expense: '支出',
    showing: '显示',
    of: '共',
    transactions: '笔交易',
    previous: '上一页',
    next: '下一页',
    totalIncome: '总收入',
    totalExpense: '总支出',
    netBalance: '净余额',
    deleteButton: '删除',
    deleteConfirm: '确定要删除此交易吗？'
  },
  ms: {
    title: 'Sejarah Transaksi',
    subtitle: 'Lihat semua transaksi anda',
    backButton: 'Kembali',
    noTransactions: 'Tiada transaksi lagi',
    noTransactionsDesc: 'Mula jejaki perbelanjaan dan pendapatan anda di Budget Brother',
    amount: 'Jumlah',
    type: 'Jenis',
    reason: 'Sebab',
    date: 'Tarikh',
    actions: 'Tindakan',
    income: 'Pendapatan',
    expense: 'Perbelanjaan',
    showing: 'Menunjukkan',
    of: 'daripada',
    transactions: 'transaksi',
    previous: 'Sebelumnya',
    next: 'Seterusnya',
    totalIncome: 'Jumlah Pendapatan',
    totalExpense: 'Jumlah Perbelanjaan',
    netBalance: 'Baki Bersih',
    deleteButton: 'Padam',
    deleteConfirm: 'Adakah anda pasti mahu memadam transaksi ini?'
  },
  ta: {
    title: 'பரிவர்த்தனை வரலாறு',
    subtitle: 'உங்கள் அனைத்து பரிவர்த்தனைகளையும் காண்க',
    backButton: 'திரும்பு',
    noTransactions: 'இன்னும் பரிவர்த்தனைகள் இல்லை',
    noTransactionsDesc: 'பட்ஜெட் பிரதரில் உங்கள் செலவுகள் மற்றும் வருமானத்தை கண்காணிக்கத் தொடங்குங்கள்',
    amount: 'தொகை',
    type: 'வகை',
    reason: 'காரணம்',
    date: 'தேதி',
    actions: 'செயல்கள்',
    income: 'வருமானம்',
    expense: 'செலவு',
    showing: 'காட்டுகிறது',
    of: 'இல்',
    transactions: 'பரிவர்த்தனைகள்',
    previous: 'முந்தைய',
    next: 'அடுத்து',
    totalIncome: 'மொத்த வருமானம்',
    totalExpense: 'மொத்த செலவுகள்',
    netBalance: 'நிகர இருப்பு',
    deleteButton: 'நீக்கு',
    deleteConfirm: 'இந்த பரிவர்த்தனையை நீக்க விரும்புகிறீர்களா?'
  },
  bn: {
    title: 'লেনদেনের ইতিহাস',
    subtitle: 'আপনার সমস্ত লেনদেন দেখুন',
    backButton: 'ফিরে যান',
    noTransactions: 'এখনও কোনো লেনদেন নেই',
    noTransactionsDesc: 'বাজেট ব্রাদারে আপনার খরচ এবং আয় ট্র্যাক করা শুরু করুন',
    amount: 'পরিমাণ',
    type: 'ধরন',
    reason: 'কারণ',
    date: 'তারিখ',
    actions: 'কর্ম',
    income: 'আয়',
    expense: 'খরচ',
    showing: 'দেখাচ্ছে',
    of: 'এর মধ্যে',
    transactions: 'লেনদেন',
    previous: 'পূর্ববর্তী',
    next: 'পরবর্তী',
    totalIncome: 'মোট আয়',
    totalExpense: 'মোট খরচ',
    netBalance: 'নিট ব্যালেন্স',
    deleteButton: 'মুছুন',
    deleteConfirm: 'আপনি কি এই লেনদেন মুছে ফেলতে চান?'
  },
  hi: {
    title: 'लेनदेन इतिहास',
    subtitle: 'अपने सभी लेनदेन देखें',
    backButton: 'वापस',
    noTransactions: 'अभी तक कोई लेनदेन नहीं',
    noTransactionsDesc: 'बजट ब्रदर में अपने खर्च और आय को ट्रैक करना शुरू करें',
    amount: 'राशि',
    type: 'प्रकार',
    reason: 'कारण',
    date: 'तारीख',
    actions: 'कार्रवाई',
    income: 'आय',
    expense: 'खर्च',
    showing: 'दिखा रहा है',
    of: 'में से',
    transactions: 'लेनदेन',
    previous: 'पिछला',
    next: 'अगला',
    totalIncome: 'कुल आय',
    totalExpense: 'कुल खर्च',
    netBalance: 'शुद्ध शेष',
    deleteButton: 'हटाएं',
    deleteConfirm: 'क्या आप इस लेनदेन को हटाना चाहते हैं?'
  },
  th: {
    title: 'ประวัติธุรกรรม',
    subtitle: 'ดูธุรกรรมทั้งหมดของคุณ',
    backButton: 'กลับ',
    noTransactions: 'ยังไม่มีธุรกรรม',
    noTransactionsDesc: 'เริ่มติดตามรายจ่ายและรายได้ของคุณใน Budget Brother',
    amount: 'จำนวนเงิน',
    type: 'ประเภท',
    reason: 'เหตุผล',
    date: 'วันที่',
    actions: 'การดำเนินการ',
    income: 'รายได้',
    expense: 'รายจ่าย',
    showing: 'แสดง',
    of: 'จาก',
    transactions: 'ธุรกรรม',
    previous: 'ก่อนหน้า',
    next: 'ถัดไป',
    totalIncome: 'รายได้รวม',
    totalExpense: 'รายจ่ายรวม',
    netBalance: 'ยอดคงเหลือสุทธิ',
    deleteButton: 'ลบ',
    deleteConfirm: 'คุณแน่ใจหรือไม่ว่าต้องการลบธุรกรรมนี้?'
  },
  vi: {
    title: 'Lịch Sử Giao Dịch',
    subtitle: 'Xem tất cả giao dịch của bạn',
    backButton: 'Quay lại',
    noTransactions: 'Chưa có giao dịch nào',
    noTransactionsDesc: 'Bắt đầu theo dõi chi tiêu và thu nhập của bạn trong Budget Brother',
    amount: 'Số Tiền',
    type: 'Loại',
    reason: 'Lý Do',
    date: 'Ngày',
    actions: 'Hành Động',
    income: 'Thu Nhập',
    expense: 'Chi Tiêu',
    showing: 'Hiển thị',
    of: 'trong số',
    transactions: 'giao dịch',
    previous: 'Trước',
    next: 'Tiếp',
    totalIncome: 'Tổng Thu Nhập',
    totalExpense: 'Tổng Chi Tiêu',
    netBalance: 'Số Dư Ròng',
    deleteButton: 'Xóa',
    deleteConfirm: 'Bạn có chắc chắn muốn xóa giao dịch này không?'
  },
  id: {
    title: 'Riwayat Transaksi',
    subtitle: 'Lihat semua transaksi Anda',
    backButton: 'Kembali',
    noTransactions: 'Belum ada transaksi',
    noTransactionsDesc: 'Mulai lacak pengeluaran dan pendapatan Anda di Budget Brother',
    amount: 'Jumlah',
    type: 'Tipe',
    reason: 'Alasan',
    date: 'Tanggal',
    actions: 'Tindakan',
    income: 'Pendapatan',
    expense: 'Pengeluaran',
    showing: 'Menampilkan',
    of: 'dari',
    transactions: 'transaksi',
    previous: 'Sebelumnya',
    next: 'Berikutnya',
    totalIncome: 'Total Pendapatan',
    totalExpense: 'Total Pengeluaran',
    netBalance: 'Saldo Bersih',
    deleteButton: 'Hapus',
    deleteConfirm: 'Apakah Anda yakin ingin menghapus transaksi ini?'
  },
  tl: {
    title: 'Kasaysayan ng Transaksyon',
    subtitle: 'Tingnan ang lahat ng iyong mga transaksyon',
    backButton: 'Bumalik',
    noTransactions: 'Wala pang mga transaksyon',
    noTransactionsDesc: 'Magsimulang subaybayan ang iyong mga gastos at kita sa Budget Brother',
    amount: 'Halaga',
    type: 'Uri',
    reason: 'Dahilan',
    date: 'Petsa',
    actions: 'Mga Aksyon',
    income: 'Kita',
    expense: 'Gastos',
    showing: 'Nagpapakita ng',
    of: 'sa',
    transactions: 'mga transaksyon',
    previous: 'Nakaraan',
    next: 'Susunod',
    totalIncome: 'Kabuuang Kita',
    totalExpense: 'Kabuuang Gastos',
    netBalance: 'Net na Balanse',
    deleteButton: 'Tanggalin',
    deleteConfirm: 'Sigurado ka bang gusto mong tanggalin ang transaksyon na ito?'
  },
  my: {
    title: 'ငွေလွှဲမှု မှတ်တမ်း',
    subtitle: 'သင့်ငွေလွှဲမှုအားလုံးကို ကြည့်ပါ',
    backButton: 'နောက်သို့',
    noTransactions: 'ငွေလွှဲမှုများ မရှိသေးပါ',
    noTransactionsDesc: 'Budget Brother တွင် သင့်အသုံးစရိတ်များနှင့် ၀င်ငွေများကို ခြေရာခံခြင်း စတင်ပါ',
    amount: 'ပမာဏ',
    type: 'အမျိုးအစား',
    reason: 'အကြောင်းရင်း',
    date: 'ရက်စွဲ',
    actions: 'လုပ်ဆောင်ချက်များ',
    income: '၀င်ငွေ',
    expense: 'အသုံးစရိတ်',
    showing: 'ပြသနေသည်',
    of: 'မှ',
    transactions: 'ငွေလွှဲမှုများ',
    previous: 'ယခင်',
    next: 'နောက်',
    totalIncome: 'စုစုပေါင်း ၀င်ငွေ',
    totalExpense: 'စုစုပေါင်း အသုံးစရိတ်',
    netBalance: 'အသားတင် လက်ကျန်',
    deleteButton: 'ဖျက်ပါ',
    deleteConfirm: 'ဤငွေလွှဲမှုကို ဖျက်လိုသည်မှာ သေချာပါသလား?'
  }
};

export function TransactionHistoryPage({ currentLang }: TransactionHistoryPageProps) {
  const navigate = useNavigate();
  const t = translations[currentLang];
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem('budgetBrotherTransactions');
    if (savedTransactions) {
      const parsed = JSON.parse(savedTransactions);
      setTransactions(parsed);
    }
  }, []);

  const deleteTransaction = (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      const updatedTransactions = transactions.filter(t => t.id !== id);
      setTransactions(updatedTransactions);
      localStorage.setItem('budgetBrotherTransactions', JSON.stringify(updatedTransactions));
      
      // Adjust current page if we deleted the last item on the current page
      const newTotalPages = Math.ceil(updatedTransactions.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // Pagination
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/budget-brother')}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t.backButton}</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-800 mb-4">
            <History className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
            {t.title}
          </h1>
          <p className="text-xl text-slate-600">
            {t.subtitle}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              {/* <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div> */}
              <h3 className="text-slate-600 font-medium">{t.totalIncome}</h3>
            </div>
            <p className="text-3xl font-bold text-black-600">
              ${totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              {/* <div className="p-3 bg-red-100 rounded-xl">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div> */}
              <h3 className="text-slate-600 font-medium">{t.totalExpense}</h3>
            </div>
            <p className="text-3xl font-bold text-black-600">
              ${totalExpense.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              {/* <div className="p-3 bg-blue-100 rounded-xl">
                <History className="w-6 h-6 text-blue-600" />
              </div> */}
              <h3 className="text-slate-600 font-medium">{t.netBalance}</h3>
            </div>
            <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-black-600' : 'text-black-600'}`}>
              ${netBalance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Transactions List */}
        {transactions.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <History className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.noTransactions}</h2>
            <p className="text-slate-600 mb-6">{t.noTransactionsDesc}</p>
            <button
              onClick={() => navigate('/budget-brother')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {t.backButton}
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
              {/* Table Header */}
              <div className="bg-cyan-800 px-6 py-4">
                <div className="grid grid-cols-5 gap-4 text-white font-semibold">
                  <div>{t.date}</div>
                  <div>{t.type}</div>
                  <div>{t.reason}</div>
                  <div className="text-right">{t.amount}</div>
                  <div className="text-center">{t.actions}</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-slate-200">
                {currentTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={`px-6 py-4 hover:bg-slate-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    <div className="grid grid-cols-5 gap-4 items-center">
                      <div className="text-slate-600">{transaction.date}</div>
                      <div>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            transaction.type === 'income'
                              ? 'bg-slate-100 text-green-700'
                              : 'bg-slate-100 text-red-700'
                          }`}
                        >
                          {/* {transaction.type === 'income' ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )} */}
                          {transaction.type === 'income' ? t.income : t.expense}
                        </span>
                      </div>
                      <div className="text-slate-900 font-medium">{transaction.reason}</div>
                      <div
                        className={`text-right text-lg font-bold ${
                          transaction.type === 'income' ? 'text-black-600' : 'text-black-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                      <div className="text-center">
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-slate-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                          title={t.deleteButton}
                        >
                          <Trash2 className="w-4 h-4" />
                          {t.deleteButton}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="text-slate-600">
                    {t.showing} {startIndex + 1}-{Math.min(endIndex, transactions.length)} {t.of}{' '}
                    {transactions.length} {t.transactions}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      {t.previous}
                    </button>

                    <div className="px-4 py-2 bg-slate-100 text-black rounded-xl font-bold">
                      {currentPage}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {t.next}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
