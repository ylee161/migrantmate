# Multilingual Support Dashboard

A web application helping Singapore's foreign workers access assistance for common problems.

## Features

- 11-language support (English, Chinese, Malay, Tamil, Bengali, Hindi, Thai, Burmese, Tagalog, Vietnamese, Indonesian)
- AI-powered chat assistant using OpenAI
- Language-adaptive responses
- **Speech-to-text input** - Speak in your language and have it converted to text
- 6 problem categories: Financial, Food, Housing, Legal, Travel, Health

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file and add your OpenAI API key:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

## Speech-to-Text Feature

The chat interface includes voice input functionality:
- Click the microphone button to start recording
- Speak in your selected language
- The speech will be automatically converted to text
- Click the microphone again to stop recording
- The text will appear in the input field

**Browser Support**: Speech recognition works best in Chrome, Edge, and Safari. Make sure to allow microphone access when prompted.

**Language Support**: The speech recognition automatically adapts to the currently selected language.

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key (required for chat functionality)

## Security Note

This implementation uses the OpenAI API directly from the browser for demonstration purposes. For production use, you should:
- Implement a backend proxy to handle API calls
- Never expose your API key in the frontend
- Add rate limiting and usage monitoring
