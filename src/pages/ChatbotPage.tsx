import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Upload } from 'lucide-react';
import { ChatInterface } from '../components/ChatInterface';
import { DocumentUploader } from '../components/DocumentUploader';
import { LanguageCode } from '../translations';
import { chatbotPageTranslations } from '../translations/chatbotPage';

interface ChatbotPageProps {
  currentLang: LanguageCode;
}

export function ChatbotPage({ currentLang }: ChatbotPageProps) {
  const navigate = useNavigate();
  const t = chatbotPageTranslations[currentLang];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">{t.backButton}</span>
        </button>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-800 rounded-2xl mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">{t.title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Uploader - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-cyan-800 p-3 rounded-xl">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{t.documentUploader.title}</h2>
                  <p className="text-sm text-slate-500">{t.documentUploader.subtitle}</p>
                </div>
              </div>
              <DocumentUploader />
            </div>
          </div>

          {/* Chat Interface - Right Column */}
          <div className="lg:col-span-2">
            <ChatInterface currentLang={currentLang} />
          </div>
        </div>
      </div>
    </div>
  );
}
