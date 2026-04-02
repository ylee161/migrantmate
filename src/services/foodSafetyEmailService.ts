import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface EmailGenerationParams {
  description: string;
  location: string;
  language: string;
}

export async function generateFoodSafetyEmail(params: EmailGenerationParams): Promise<string> {
  const { description, location, language } = params;

  const languageMap: Record<string, string> = {
    en: 'English',
    zh: 'Chinese (Simplified)',
    ms: 'Malay',
    ta: 'Tamil',
    bn: 'Bengali',
    hi: 'Hindi',
    th: 'Thai',
    vi: 'Vietnamese',
    id: 'Indonesian',
    tl: 'Tagalog',
    my: 'Burmese'
  };

  const targetLanguage = languageMap[language] || 'English';

  const prompt = `You are a professional assistant helping a migrant worker in Singapore report a food safety issue to the Singapore Food Agency (SFA).

Generate a formal, professional email in ${targetLanguage} using the following information provided by the user:

**Issue Description:**
${description}

**Location:**
${location}

**Instructions:**
1. Create a clear, professional subject line appropriate for a food safety report
2. Write a formal email body that:
   - Opens with a respectful greeting
   - States the purpose clearly (reporting a food safety concern)
   - Incorporates the user's issue description naturally into the email
   - Includes the exact location details provided
   - Mentions that a photo is attached as evidence
   - Requests appropriate investigation and action
   - Closes professionally
3. Use formal language suitable for government correspondence
4. Keep the email concise but comprehensive
5. DO NOT ask the user for any information they have already provided
6. Format the email properly with clear paragraphs

Format the email as:
Subject: [Subject Line]

Dear Sir/Madam,

[Email Body - incorporating the user's description and location naturally]

Yours sincerely,
[Concerned Resident]

IMPORTANT: 
- Write the ENTIRE email in ${targetLanguage}
- Use the user's exact description and location details
- Make it sound natural and professional
- Do not add placeholder text or ask for more information`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional email writer specializing in formal government correspondence. You help migrant workers communicate effectively with Singapore authorities about food safety concerns. You write clear, respectful, and professional emails that incorporate all provided information without asking for additional details.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const emailContent = response.choices[0]?.message?.content;
    if (!emailContent) {
      throw new Error('No email content generated');
    }

    return emailContent.trim();
  } catch (error) {
    console.error('Error generating food safety email:', error);
    throw error;
  }
}
