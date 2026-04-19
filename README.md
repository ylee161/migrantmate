# MigrantMate 🌏

A multilingual support dashboard helping Singapore's foreign workers access assistance for common problems — in their own language.

## Features

- 🌐 **11-language support** — English, Chinese, Malay, Tamil, Bengali, Hindi, Thai, Burmese, Tagalog, Vietnamese, Indonesian
- 🤖 **AI chat assistant** powered by OpenAI GPT-3.5
- 🎙️ **Speech-to-text input** — speak in your language, get text instantly
- 🔐 **Auth system** via Supabase (login / signup)
- 💰 **Budget Brother** — expense tracking and financial advice
- 🍱 **Community Food Share** — find and share food resources
- 🏠 **Emergency Shelter** — locate shelter options
- ⚖️ **Learn My Rights** — worker rights information
- 🎉 **Community Events & Activities** — social activities nearby
- 📋 **Food Safety Reporting**
- 💸 **Remittance Assistance & Discounts**

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Auth & Database**: Supabase
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Maps**: Leaflet / React-Leaflet
- **Charts**: Recharts

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) project (free tier works)
- An [OpenAI](https://platform.openai.com) API key

### 1. Clone the repository

```bash
git clone https://github.com/ylee161/migrantmate.git
cd migrantmate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Then open `.env` and fill in your values:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
```

**Where to get these:**
- **OpenAI key**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Supabase URL & Anon Key**: [app.supabase.com](https://app.supabase.com) → Your Project → Settings → API

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Supabase Setup

You'll need to enable **Email/Password authentication** in your Supabase project:

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project → **Authentication** → **Providers**
3. Enable **Email** provider

The app uses Supabase for:
- User authentication (signup / login)
- Storing budget transactions
- File uploads (document uploader)
- Group chat messages

---

## Speech-to-Text

The chat interface includes voice input:
- Click the **microphone** button to start recording
- Speak in your selected language
- Speech is automatically converted to text
- Click again to stop

**Browser support**: Works best in Chrome, Edge, and Safari. Allow microphone access when prompted.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `VITE_OPENAI_API_KEY` | ✅ | OpenAI API key for the AI chat assistant |
| `VITE_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Your Supabase anon/public key |

> ⚠️ **Security note**: These variables are prefixed with `VITE_` and are included in the browser bundle. They are intentionally public-facing (Supabase anon key, OpenAI key via browser). For production, consider routing OpenAI calls through a backend proxy to prevent API key abuse.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Security Notes

- `.env` is in `.gitignore` and is **never committed** to the repository
- Always use `.env.example` as the template — never put real keys there
- The Supabase anon key is safe to expose (it's controlled by Row-Level Security policies)
- The OpenAI key is exposed client-side — set usage limits on your OpenAI account dashboard
