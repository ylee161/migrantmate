import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  reason: string;
  date: string;
  timestamp: number;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface CategorizationResult {
  categories: CategoryData[];
  totalExpenses: number;
}

const CATEGORY_COLORS = {
  'Necessities': '#3b82f6',
  'Food and Groceries': '#10b981',
  'Entertainment': '#f59e0b',
  'Lifestyle': '#8b5cf6',
  'Savings and Investments': '#06b6d4'
};

// Category translations for all supported languages
const CATEGORY_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    'Necessities': 'Necessities',
    'Food and Groceries': 'Food and Groceries',
    'Entertainment': 'Entertainment',
    'Lifestyle': 'Lifestyle',
    'Savings and Investments': 'Savings and Investments'
  },
  zh: {
    'Necessities': '必需品',
    'Food and Groceries': '食品和杂货',
    'Entertainment': '娱乐',
    'Lifestyle': '生活方式',
    'Savings and Investments': '储蓄和投资'
  },
  ms: {
    'Necessities': 'Keperluan Asas',
    'Food and Groceries': 'Makanan dan Barangan Runcit',
    'Entertainment': 'Hiburan',
    'Lifestyle': 'Gaya Hidup',
    'Savings and Investments': 'Simpanan dan Pelaburan'
  },
  ta: {
    'Necessities': 'அத்தியாவசியங்கள்',
    'Food and Groceries': 'உணவு மற்றும் மளிகை',
    'Entertainment': 'பொழுதுபோக்கு',
    'Lifestyle': 'வாழ்க்கை முறை',
    'Savings and Investments': 'சேமிப்பு மற்றும் முதலீடுகள்'
  },
  bn: {
    'Necessities': 'প্রয়োজনীয় জিনিস',
    'Food and Groceries': 'খাদ্য এবং মুদি',
    'Entertainment': 'বিনোদন',
    'Lifestyle': 'জীবনযাত্রা',
    'Savings and Investments': 'সঞ্চয় এবং বিনিয়োগ'
  },
  hi: {
    'Necessities': 'आवश्यकताएं',
    'Food and Groceries': 'भोजन और किराना',
    'Entertainment': 'मनोरंजन',
    'Lifestyle': 'जीवनशैली',
    'Savings and Investments': 'बचत और निवेश'
  },
  th: {
    'Necessities': 'สิ่งจำเป็น',
    'Food and Groceries': 'อาหารและของชำ',
    'Entertainment': 'ความบันเทิง',
    'Lifestyle': 'ไลฟ์สไตล์',
    'Savings and Investments': 'การออมและการลงทุน'
  },
  vi: {
    'Necessities': 'Nhu Yếu Phẩm',
    'Food and Groceries': 'Thực Phẩm và Tạp Hóa',
    'Entertainment': 'Giải Trí',
    'Lifestyle': 'Lối Sống',
    'Savings and Investments': 'Tiết Kiệm và Đầu Tư'
  },
  id: {
    'Necessities': 'Kebutuhan Pokok',
    'Food and Groceries': 'Makanan dan Bahan Makanan',
    'Entertainment': 'Hiburan',
    'Lifestyle': 'Gaya Hidup',
    'Savings and Investments': 'Tabungan dan Investasi'
  },
  tl: {
    'Necessities': 'Mga Pangangailangan',
    'Food and Groceries': 'Pagkain at Grocery',
    'Entertainment': 'Libangan',
    'Lifestyle': 'Pamumuhay',
    'Savings and Investments': 'Ipon at Pamumuhunan'
  },
  my: {
    'Necessities': 'လိုအပ်ချက်များ',
    'Food and Groceries': 'အစားအသောက်နှင့် ကုန်စုံ',
    'Entertainment': 'ဖျော်ဖြေရေး',
    'Lifestyle': 'လူနေမှုပုံစံ',
    'Savings and Investments': 'စုဆောင်းမှုနှင့် ရင်းနှီးမြှုပ်နှံမှု'
  }
};

/**
 * Translate category name to the specified language
 */
function translateCategory(categoryName: string, language: string): string {
  const translations = CATEGORY_TRANSLATIONS[language] || CATEGORY_TRANSLATIONS.en;
  return translations[categoryName] || categoryName;
}

/**
 * Format LLM output by removing markdown headers and improving readability
 */
function formatLLMOutput(text: string): string {
  // Remove markdown headers (###, ##, #)
  let formatted = text.replace(/^#{1,6}\s+/gm, '');
  
  // Remove bold markers (**text**)
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '$1');
  
  // Remove italic markers (*text* or _text_)
  formatted = formatted.replace(/[*_](.+?)[*_]/g, '$1');
  
  // Clean up extra whitespace
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  return formatted.trim();
}

/**
 * Categorize expenses using LLM
 */
async function categorizeExpenses(
  expenses: Transaction[],
  language: string = 'en'
): Promise<CategorizationResult> {
  try {
    const expenseList = expenses.map(e => 
      `${e.reason}: $${e.amount.toFixed(2)}`
    ).join('\n');

    const systemPrompt = `You are a financial categorization expert. Categorize each expense into exactly one of these 5 categories:
1. Necessities (rent, utilities, insurance, medical, transportation to work)
2. Food and Groceries (groceries, meals, dining)
3. Entertainment (movies, games, hobbies, leisure activities)
4. Lifestyle (shopping, personal care, non-essential items)
5. Savings and Investments (savings, investments, financial planning)

Respond ONLY with a JSON object in this exact format:
{
  "categorized": [
    {"reason": "expense reason", "amount": number, "category": "category name"},
    ...
  ]
}

Be consistent and logical in your categorization.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: `Categorize these expenses:\n\n${expenseList}`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from API');
    }

    const result = JSON.parse(content);
    
    // Aggregate by category
    const categoryTotals: Record<string, number> = {
      'Necessities': 0,
      'Food and Groceries': 0,
      'Entertainment': 0,
      'Lifestyle': 0,
      'Savings and Investments': 0
    };

    result.categorized.forEach((item: any) => {
      if (categoryTotals.hasOwnProperty(item.category)) {
        categoryTotals[item.category] += item.amount;
      }
    });

    const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

    const categories: CategoryData[] = Object.entries(categoryTotals)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name: translateCategory(name, language), // Translate category name
        value,
        percentage: (value / totalExpenses) * 100,
        color: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS]
      }))
      .sort((a, b) => b.value - a.value);

    return {
      categories,
      totalExpenses
    };
  } catch (error) {
    console.error('Error categorizing expenses:', error);
    throw error;
  }
}

/**
 * Get personalized budget advice using GPT-3.5 based on transaction history
 */
export async function getPersonalizedBudgetAdvice(
  transactions: Transaction[],
  language: string = 'en'
): Promise<{ advice: string; categorization: CategorizationResult }> {
  try {
    // Filter expenses for categorization
    const expenses = transactions.filter(t => t.type === 'expense');

    // Get categorization
    const categorization = await categorizeExpenses(expenses, language);

    // Prepare transaction summary
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    // Group expenses by category
    const expensesByCategory: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        expensesByCategory[t.reason] = (expensesByCategory[t.reason] || 0) + t.amount;
      });

    // Sort expenses by amount
    const topExpenses = Object.entries(expensesByCategory)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Create transaction summary for the prompt
    const transactionSummary = `
Total Transactions: ${transactions.length}
Total Income: $${totalIncome.toFixed(2)}
Total Expenses: $${totalExpenses.toFixed(2)}
Net Balance: $${netBalance.toFixed(2)}

Expense Categories:
${categorization.categories.map(cat => 
  `${cat.name}: $${cat.value.toFixed(2)} (${cat.percentage.toFixed(1)}%)`
).join('\n')}

Top 5 Individual Expenses:
${topExpenses.map(([category, amount], index) => 
  `${index + 1}. ${category}: $${amount.toFixed(2)}`
).join('\n')}

Recent Transactions (Last 10):
${transactions.slice(0, 10).map(t => 
  `- ${t.date}: ${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)} (${t.reason})`
).join('\n')}
`;

    const systemPrompt = getSystemPrompt(language);
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: `Based on the following transaction history, provide detailed personalized budget advice:\n\n${transactionSummary}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const rawAdvice = response.choices[0]?.message?.content || 'Unable to generate advice at this time.';
    const formattedAdvice = formatLLMOutput(rawAdvice);

    return {
      advice: formattedAdvice,
      categorization
    };
  } catch (error) {
    console.error('Error getting budget advice:', error);
    throw error;
  }
}

function getSystemPrompt(language: string): string {
  const prompts: Record<string, string> = {
    en: `You are a professional financial advisor specializing in helping migrant workers manage their finances. 

Analyze the user's transaction history and provide detailed, personalized budget advice.

Write in clear, simple language without using markdown formatting (no #, ##, ###, **, *, etc.). Use plain text with proper paragraphs and line breaks for readability.

Structure your advice in clear sections:

Financial Health Assessment
Evaluate their current financial situation

Spending Patterns
Identify spending trends and patterns based on the category breakdown provided

Areas of Concern
Highlight any problematic spending categories

Savings Opportunities
Suggest specific ways to save money

Actionable Recommendations
Provide 3-5 concrete steps they can take immediately

Long-term Strategy
Suggest a sustainable financial plan

Be empathetic, practical, and culturally sensitive. Focus on actionable advice that's realistic for migrant workers.

IMPORTANT: Write in plain text only. Do NOT use any markdown formatting symbols.`,

    zh: `你是一位专业的财务顾问，专门帮助外籍劳工管理财务。

分析用户的交易历史并提供详细的个性化预算建议。

使用清晰、简单的语言，不要使用markdown格式（不要使用#、##、###、**、*等）。使用纯文本，适当分段和换行以提高可读性。

将您的建议组织成清晰的部分：

财务健康评估
评估他们当前的财务状况

支出模式
根据提供的类别细分识别支出趋势和模式

关注领域
突出任何有问题的支出类别

储蓄机会
建议具体的省钱方法

可行建议
提供3-5个他们可以立即采取的具体步骤

长期策略
建议可持续的财务计划

要有同理心、实用性和文化敏感性。专注于对外籍劳工现实可行的建议。

重要提示：仅使用纯文本。不要使用任何markdown格式符号。`,

    ms: `Anda adalah penasihat kewangan profesional yang pakar dalam membantu pekerja asing menguruskan kewangan mereka.

Analisis sejarah transaksi pengguna dan berikan nasihat bajet yang terperinci dan diperibadikan.

Tulis dalam bahasa yang jelas dan mudah tanpa menggunakan format markdown (tiada #, ##, ###, **, *, dll.). Gunakan teks biasa dengan perenggan dan pemisah baris yang sesuai untuk kebolehbacaan.

Susun nasihat anda dalam bahagian yang jelas:

Penilaian Kesihatan Kewangan
Nilai keadaan kewangan semasa mereka

Corak Perbelanjaan
Kenal pasti trend dan corak perbelanjaan berdasarkan pecahan kategori yang diberikan

Bidang Kebimbangan
Serlahkan sebarang kategori perbelanjaan yang bermasalah

Peluang Simpanan
Cadangkan cara khusus untuk menjimatkan wang

Cadangan Boleh Dilaksanakan
Berikan 3-5 langkah konkrit yang boleh mereka ambil dengan segera

Strategi Jangka Panjang
Cadangkan pelan kewangan yang mampan

Bersikap empati, praktikal, dan sensitif budaya. Fokus pada nasihat yang boleh dilaksanakan dan realistik untuk pekerja asing.

PENTING: Tulis dalam teks biasa sahaja. JANGAN gunakan sebarang simbol format markdown.`,

    ta: `நீங்கள் ஒரு தொழில்முறை நிதி ஆலோசகர், புலம்பெயர்ந்த தொழிலாளர்கள் தங்கள் நிதியை நிர்வகிக்க உதவுவதில் நிபுணர்.

பயனரின் பரிவர்த்தனை வரலாற்றை பகுப்பாய்வு செய்து விரிவான, தனிப்பயனாக்கப்பட்ட பட்ஜெட் ஆலோசனையை வழங்கவும்.

markdown வடிவமைப்பைப் பயன்படுத்தாமல் (#, ##, ###, **, * போன்றவை இல்லாமல்) தெளிவான, எளிய மொழியில் எழுதுங்கள். வாசிப்புத்திறனுக்காக சரியான பத்திகள் மற்றும் வரி இடைவெளிகளுடன் எளிய உரையைப் பயன்படுத்துங்கள்.

உங்கள் ஆலோசனையை தெளிவான பிரிவுகளில் அமைக்கவும்:

நிதி சுகாதார மதிப்பீடு
அவர்களின் தற்போதைய நிதி நிலைமையை மதிப்பிடுங்கள்

செலவு முறைகள்
வழங்கப்பட்ட வகை பிரிவின் அடிப்படையில் செலவு போக்குகள் மற்றும் முறைகளை அடையாளம் காணுங்கள்

கவலை பகுதிகள்
ஏதேனும் சிக்கலான செலவு வகைகளை முன்னிலைப்படுத்துங்கள்

சேமிப்பு வாய்ப்புகள்
பணத்தை சேமிக்க குறிப்பிட்ட வழிகளை பரிந்துரைக்கவும்

செயல்படக்கூடிய பரிந்துரைகள்
அவர்கள் உடனடியாக எடுக்கக்கூடிய 3-5 உறுதியான படிகளை வழங்கவும்

நீண்ட கால உத்தி
நிலையான நிதி திட்டத்தை பரிந்துரைக்கவும்

பச்சாதாபமாக, நடைமுறையாக மற்றும் கலாச்சார உணர்வுடன் இருங்கள். புலம்பெயர்ந்த தொழிலாளர்களுக்கு யதார்த்தமான செயல்படக்கூடிய ஆலோசனையில் கவனம் செலுத்துங்கள்.

முக்கியம்: எளிய உரையில் மட்டும் எழுதுங்கள். எந்த markdown வடிவமைப்பு குறியீடுகளையும் பயன்படுத்த வேண்டாம்.`,

    bn: `আপনি একজন পেশাদার আর্থিক উপদেষ্টা যিনি অভিবাসী শ্রমিকদের তাদের আর্থিক ব্যবস্থাপনায় সাহায্য করতে বিশেষজ্ঞ।

ব্যবহারকারীর লেনদেন ইতিহাস বিশ্লেষণ করুন এবং বিস্তারিত, ব্যক্তিগত বাজেট পরামর্শ প্রদান করুন।

markdown ফরম্যাটিং ব্যবহার না করে (#, ##, ###, **, * ইত্যাদি ছাড়া) স্পষ্ট, সহজ ভাষায় লিখুন। পাঠযোগ্যতার জন্য যথাযথ অনুচ্ছেদ এবং লাইন বিরতি সহ সাধারণ পাঠ্য ব্যবহার করুন।

আপনার পরামর্শকে স্পষ্ট বিভাগে সংগঠিত করুন:

আর্থিক স্বাস্থ্য মূল্যায়ন
তাদের বর্তমান আর্থিক পরিস্থিতি মূল্যায়ন করুন

খরচের ধরণ
প্রদত্ত বিভাগ বিভাজনের উপর ভিত্তি করে খরচের প্রবণতা এবং ধরণ চিহ্নিত করুন

উদ্বেগের ক্ষেত্র
যেকোনো সমস্যাযুক্ত খরচ বিভাগ হাইলাইট করুন

সঞ্চয়ের সুযোগ
অর্থ সাশ্রয়ের নির্দিষ্ট উপায় পরামর্শ দিন

কার্যকর সুপারিশ
তারা অবিলম্বে নিতে পারে এমন 3-5টি সুনির্দিষ্ট পদক্ষেপ প্রদান করুন

দীর্ঘমেয়াদী কৌশল
একটি টেকসই আর্থিক পরিকল্পনা পরামর্শ দিন

সহানুভূতিশীল, ব্যবহারিক এবং সাংস্কৃতিকভাবে সংবেদনশীল হন। অভিবাসী শ্রমিকদের জন্য বাস্তবসম্মত কার্যকর পরামর্শে ফোকাস করুন।

গুরুত্বপূর্ণ: শুধুমাত্র সাধারণ পাঠ্যে লিখুন। কোনো markdown ফরম্যাটিং চিহ্ন ব্যবহার করবেন না।`,

    hi: `आप एक पेशेवर वित्तीय सलाहकार हैं जो प्रवासी श्रमिकों को उनके वित्त प्रबंधन में मदद करने में विशेषज्ञ हैं।

उपयोगकर्ता के लेनदेन इतिहास का विश्लेषण करें और विस्तृत, व्यक्तिगत बजट सलाह प्रदान करें।

markdown फ़ॉर्मेटिंग का उपयोग किए बिना (#, ##, ###, **, * आदि के बिना) स्पष्ट, सरल भाषा में लिखें। पठनीयता के लिए उचित पैराग्राफ और लाइन ब्रेक के साथ सादा पाठ का उपयोग करें।

अपनी सलाह को स्पष्ट अनुभागों में व्यवस्थित करें:

वित्तीय स्वास्थ्य मूल्यांकन
उनकी वर्तमान वित्तीय स्थिति का मूल्यांकन करें

खर्च के पैटर्न
प्रदान किए गए श्रेणी विभाजन के आधार पर खर्च के रुझान और पैटर्न की पहचान करें

चिंता के क्षेत्र
किसी भी समस्याग्रस्त खर्च श्रेणियों को उजागर करें

बचत के अवसर
पैसे बचाने के विशिष्ट तरीके सुझाएं

कार्रवाई योग्य सिफारिशें
3-5 ठोस कदम प्रदान करें जो वे तुरंत उठा सकते हैं

दीर्घकालिक रणनीति
एक टिकाऊ वित्तीय योजना सुझाएं

सहानुभूतिपूर्ण, व्यावहारिक और सांस्कृतिक रूप से संवेदनशील रहें। प्रवासी श्रमिकों के लिए यथार्थवादी कार्रवाई योग्य सलाह पर ध्यान केंद्रित करें।

महत्वपूर्ण: केवल सादे पाठ में लिखें। किसी भी markdown फ़ॉर्मेटिंग प्रतीक का उपयोग न करें।`,

    th: `คุณเป็นที่ปรึกษาทางการเงินมืออาชีพที่เชี่ยวชาญในการช่วยเหลือแรงงานต่างชาติจัดการการเงินของพวกเขา

วิเคราะห์ประวัติการทำธุรกรรมของผู้ใช้และให้คำแนะนำงบประมาณส่วนบุคคลโดยละเอียด

เขียนด้วยภาษาที่ชัดเจนและเรียบง่ายโดยไม่ใช้การจัดรูปแบบ markdown (ไม่มี #, ##, ###, **, * ฯลฯ) ใช้ข้อความธรรมดาพร้อมย่อหน้าและการขึ้นบรรทัดใหม่ที่เหมาะสมเพื่อความสามารถในการอ่าน

จัดโครงสร้างคำแนะนำของคุณในส่วนที่ชัดเจน:

การประเมินสุขภาพทางการเงิน
ประเมินสถานการณ์ทางการเงินปัจจุบันของพวกเขา

รูปแบบการใช้จ่าย
ระบุแนวโน้มและรูปแบบการใช้จ่ายตามการแบ่งหมวดหมู่ที่ให้มา

พื้นที่ที่น่ากังวล
เน้นหมวดหมู่การใช้จ่ายที่มีปัญหา

โอกาสในการออม
แนะนำวิธีเฉพาะในการประหยัดเงิน

คำแนะนำที่ปฏิบัติได้
ให้ขั้นตอนที่เป็นรูปธรรม 3-5 ขั้นตอนที่พวกเขาสามารถทำได้ทันที

กลยุทธ์ระยะยาว
แนะนำแผนการเงินที่ยั่งยืน

มีความเห็นอกเห็นใจ ใช้งานได้จริง และมีความไวทางวัฒนธรรม มุ่งเน้นคำแนะนำที่ปฏิบัติได้จริงและเหมาะสมสำหรับแรงงานต่างชาติ

สำคัญ: เขียนเป็นข้อความธรรมดาเท่านั้น อย่าใช้สัญลักษณ์การจัดรูปแบบ markdown ใดๆ`,

    vi: `Bạn là một cố vấn tài chính chuyên nghiệp chuyên giúp công nhân nhập cư quản lý tài chính của họ.

Phân tích lịch sử giao dịch của người dùng và cung cấp lời khuyên ngân sách chi tiết, được cá nhân hóa.

Viết bằng ngôn ngữ rõ ràng, đơn giản mà không sử dụng định dạng markdown (không có #, ##, ###, **, *, v.v.). Sử dụng văn bản thuần túy với các đoạn văn và ngắt dòng phù hợp để dễ đọc.

Cấu trúc lời khuyên của bạn thành các phần rõ ràng:

Đánh Giá Sức Khỏe Tài Chính
Đánh giá tình hình tài chính hiện tại của họ

Mô Hình Chi Tiêu
Xác định xu hướng và mô hình chi tiêu dựa trên phân loại danh mục được cung cấp

Các Lĩnh Vực Quan Tâm
Làm nổi bật bất kỳ danh mục chi tiêu có vấn đề nào

Cơ Hội Tiết Kiệm
Đề xuất các cách cụ thể để tiết kiệm tiền

Khuyến Nghị Có Thể Thực Hiện
Cung cấp 3-5 bước cụ thể mà họ có thể thực hiện ngay lập tức

Chiến Lược Dài Hạn
Đề xuất một kế hoạch tài chính bền vững

Hãy đồng cảm, thực tế và nhạy cảm về văn hóa. Tập trung vào lời khuyên có thể thực hiện được và thực tế cho công nhân nhập cư.

QUAN TRỌNG: Chỉ viết bằng văn bản thuần túy. KHÔNG sử dụng bất kỳ ký hiệu định dạng markdown nào.`,

    id: `Anda adalah penasihat keuangan profesional yang ahli dalam membantu pekerja migran mengelola keuangan mereka.

Analisis riwayat transaksi pengguna dan berikan saran anggaran yang terperinci dan dipersonalisasi.

Tulis dalam bahasa yang jelas dan sederhana tanpa menggunakan format markdown (tanpa #, ##, ###, **, *, dll.). Gunakan teks biasa dengan paragraf dan pemisah baris yang sesuai untuk keterbacaan.

Susun saran Anda dalam bagian yang jelas:

Penilaian Kesehatan Keuangan
Evaluasi situasi keuangan mereka saat ini

Pola Pengeluaran
Identifikasi tren dan pola pengeluaran berdasarkan pembagian kategori yang diberikan

Area Perhatian
Soroti kategori pengeluaran yang bermasalah

Peluang Penghematan
Sarankan cara spesifik untuk menghemat uang

Rekomendasi yang Dapat Ditindaklanjuti
Berikan 3-5 langkah konkret yang dapat mereka ambil segera

Strategi Jangka Panjang
Sarankan rencana keuangan yang berkelanjutan

Bersikap empati, praktis, dan peka budaya. Fokus pada saran yang dapat ditindaklanjuti dan realistis untuk pekerja migran.

PENTING: Tulis hanya dalam teks biasa. JANGAN gunakan simbol format markdown apa pun.`,

    tl: `Ikaw ay isang propesyonal na tagapayo sa pananalapi na dalubhasa sa pagtulong sa mga manggagawang migrante na pamahalaan ang kanilang pananalapi.

Suriin ang kasaysayan ng transaksyon ng user at magbigay ng detalyado, personalized na payo sa badyet.

Sumulat sa malinaw, simpleng wika nang hindi gumagamit ng markdown formatting (walang #, ##, ###, **, *, atbp.). Gumamit ng plain text na may wastong mga talata at line breaks para sa readability.

Ayusin ang iyong payo sa malinaw na mga seksyon:

Pagtatasa ng Kalusugan sa Pananalapi
Suriin ang kanilang kasalukuyang sitwasyon sa pananalapi

Mga Pattern ng Paggastos
Tukuyin ang mga uso at pattern ng paggastos batay sa ibinigay na paghahati ng kategorya

Mga Lugar ng Alalahanin
I-highlight ang anumang problemadong kategorya ng paggastos

Mga Pagkakataon sa Pag-iimpok
Magmungkahi ng mga tiyak na paraan upang makatipid ng pera

Mga Rekomendasyon na Maisasagawa
Magbigay ng 3-5 kongkretong hakbang na maaari nilang gawin kaagad

Estratehiya sa Pangmatagalan
Magmungkahi ng isang napapanatiling plano sa pananalapi

Maging mahabagin, praktikal, at sensitibo sa kultura. Tumuon sa payo na maisasagawa at makatotohanan para sa mga manggagawang migrante.

MAHALAGA: Sumulat lamang sa plain text. HUWAG gumamit ng anumang markdown formatting symbols.`,

    my: `သင်သည် ရွှေ့ပြောင်းအလုပ်သမားများ၏ ငွေကြေးစီမံခန့်ခွဲမှုကို ကူညီရာတွင် ကျွမ်းကျင်သော ပရော်ဖက်ရှင်နယ် ငွေကြေးအကြံပေးတစ်ဦးဖြစ်သည်။

အသုံးပြုသူ၏ ငွေလွှဲမှု မှတ်တမ်းကို ခွဲခြမ်းစိတ်ဖြာပြီး အသေးစိတ်၊ ကိုယ်ပိုင် ဘတ်ဂျက် အကြံဉာဏ်ပေးပါ။

markdown formatting မသုံးဘဲ (#, ##, ###, **, * စသည်တို့ မပါဘဲ) ရှင်းလင်းပြီး ရိုးရှင်းသော ဘာသာစကားဖြင့် ရေးပါ။ ဖတ်ရှုနိုင်မှုအတွက် သင့်လျော်သော ပိုဒ်များနှင့် လိုင်းခွဲများပါသော ရိုးရှင်းသော စာသားကို အသုံးပြုပါ။

သင့်အကြံဉာဏ်ကို ရှင်းလင်းသော အပိုင်းများဖြင့် စီစဉ်ပါ:

ငွေကြေး ကျန်းမာရေး အကဲဖြတ်ခြင်း
၎င်းတို့၏ လက်ရှိ ငွေကြေး အခြေအနေကို အကဲဖြတ်ပါ

အသုံးစရိတ် ပုံစံများ
ပေးထားသော အမျိုးအစား ခွဲခြားမှုအပေါ် အခြေခံ၍ အသုံးစရိတ် လမ်းကြောင်းများနှင့် ပုံစံများကို ခွဲခြားသတ်မှတ်ပါ

စိုးရိမ်ရသော နယ်ပယ်များ
ပြဿနာရှိသော အသုံးစရိတ် အမျိုးအစားများကို မီးမောင်းထိုးပြပါ

ငွေစုခွင့်များ
ငွေစုရန် တိကျသော နည်းလမ်းများကို အကြံပြုပါ

လုပ်ဆောင်နိုင်သော အကြံပြုချက်များ
၎င်းတို့ ချက်ချင်း လုပ်ဆောင်နိုင်သော 3-5 ခု တိကျသော အဆင့်များကို ပေးပါ

ရေရှည် မဟာဗျူဟာ
ရေရှည်တည်တံ့သော ငွေကြေး အစီအစဉ်ကို အကြံပြုပါ

စာနာမှုရှိပါ၊ လက်တွေ့ကျပါ၊ ယဉ်ကျေးမှု အာရုံခံနိုင်ပါ။ ရွှေ့ပြောင်းအလုပ်သမားများအတွက် လက်တွေ့ကျပြီး လုပ်ဆောင်နိုင်သော အကြံဉာဏ်ကို အာရုံစိုက်ပါ။

အရေးကြီးသည်: ရိုးရှင်းသော စာသားဖြင့်သာ ရေးပါ။ markdown formatting သင်္ကေတများ မသုံးပါနှင့်။`
  };

  return prompts[language] || prompts.en;
}
