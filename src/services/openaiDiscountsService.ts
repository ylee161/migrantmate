import OpenAI from 'openai';

export interface DiscountLocation {
  id: string;
  name: string;
  category: 'food' | 'shopping' | 'entertainment' | 'services';
  discount: string;
  description: string;
  location: string;
  coordinates: [number, number];
  validUntil: string;
  terms: string;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

/**
 * Fetch discount locations from OpenAI API
 */
export async function fetchDiscountLocations(userLocation: [number, number]): Promise<DiscountLocation[]> {
  try {
    const prompt = `You are a helpful assistant that provides information about discounts and deals available for migrant workers in Singapore.

Given the user's location at coordinates [${userLocation[0]}, ${userLocation[1]}], provide a list of 15-20 real discount locations in Singapore that would be helpful for migrant workers. Focus on areas like Little India, Geylang, Golden Mile, Chinatown, and other areas popular with migrant communities.

For each location, provide:
1. Shop/establishment name (real businesses)
2. Category (food, shopping, entertainment, or services)
3. Discount amount (realistic percentage or dollar amount)
4. Brief description of what they offer
5. Full address in Singapore
6. Exact coordinates (latitude, longitude) - must be real Singapore coordinates
7. Valid until date (use realistic future dates)
8. Terms and conditions

Format your response as a valid JSON array with this exact structure:
[
  {
    "name": "Shop Name",
    "category": "food",
    "discount": "20% off",
    "description": "Description of offerings",
    "location": "Full address, Singapore",
    "coordinates": [latitude, longitude],
    "validUntil": "2024-12-31",
    "terms": "Terms and conditions"
  }
]

IMPORTANT: 
- Use ONLY real Singapore businesses and locations
- Coordinates must be valid Singapore coordinates (latitude ~1.3, longitude ~103.8)
- Ensure coordinates match the actual location addresses
- Return ONLY the JSON array, no additional text
- Include a good mix of categories
- Focus on migrant-friendly establishments`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides accurate information about discounts and deals in Singapore. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const discounts = JSON.parse(content);

    // Add unique IDs to each discount
    return discounts.map((discount: Omit<DiscountLocation, 'id'>, index: number) => ({
      ...discount,
      id: `openai-${Date.now()}-${index}`
    }));

  } catch (error) {
    console.error('Error fetching discounts from OpenAI:', error);
    throw error;
  }
}

/**
 * Fetch additional discounts based on a specific category
 */
export async function fetchDiscountsByCategory(
  category: string,
  userLocation: [number, number]
): Promise<DiscountLocation[]> {
  try {
    const prompt = `You are a helpful assistant that provides information about ${category} discounts and deals available for migrant workers in Singapore.

Given the user's location at coordinates [${userLocation[0]}, ${userLocation[1]}], provide a list of 10 real ${category} discount locations in Singapore.

For each location, provide:
1. Shop/establishment name (real businesses)
2. Category (must be: ${category})
3. Discount amount (realistic percentage or dollar amount)
4. Brief description of what they offer
5. Full address in Singapore
6. Exact coordinates (latitude, longitude) - must be real Singapore coordinates
7. Valid until date (use realistic future dates)
8. Terms and conditions

Format your response as a valid JSON array with this exact structure:
[
  {
    "name": "Shop Name",
    "category": "${category}",
    "discount": "20% off",
    "description": "Description of offerings",
    "location": "Full address, Singapore",
    "coordinates": [latitude, longitude],
    "validUntil": "2024-12-31",
    "terms": "Terms and conditions"
  }
]

IMPORTANT: 
- Use ONLY real Singapore businesses and locations
- Coordinates must be valid Singapore coordinates (latitude ~1.3, longitude ~103.8)
- Ensure coordinates match the actual location addresses
- Return ONLY the JSON array, no additional text`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides accurate information about discounts and deals in Singapore. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const discounts = JSON.parse(content);

    // Add unique IDs to each discount
    return discounts.map((discount: Omit<DiscountLocation, 'id'>, index: number) => ({
      ...discount,
      id: `openai-${category}-${Date.now()}-${index}`
    }));

  } catch (error) {
    console.error(`Error fetching ${category} discounts from OpenAI:`, error);
    throw error;
  }
}
