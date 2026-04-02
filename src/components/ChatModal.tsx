import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Mic, MicOff } from 'lucide-react';
import { getChatbotResponse, ChatMessage } from '../services/chatbotService';
import { LanguageCode } from '../translations';
import { chatInterfaceTranslations } from '../translations/chatInterface';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
}

// Language code mapping for Web Speech API
const speechLanguageCodes: Record<LanguageCode, string> = {
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

export function ChatModal({ isOpen, onClose, currentLang }: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const t = chatInterfaceTranslations[currentLang];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = speechLanguageCodes[currentLang];

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentLang]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = speechLanguageCodes[currentLang];
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatbotResponse([...messages, userMessage], currentLang);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: t.errorMessage
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Clear messages when closing
    setMessages([]);
    setInput('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto w-96 h-[600px]">
        {/* Header */}
        <div className="bg-cyan-800 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{t.title}</h3>
              <p className="text-xs text-white/90">{t.subtitle}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-8">
              <Bot className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 text-sm">{t.welcomeMessage}</p>
              <p className="text-slate-400 text-xs mt-1">{t.startConversation}</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[85%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-slate-200'
                      : 'bg-slate-200'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <div
                  className={`rounded-xl px-3 py-2 ${
                    message.role === 'user'
                      ? 'bg-cyan-800 text-white'
                      : 'bg-white text-slate-800 shadow-sm'
                  }`}
                >
                  <p className="text-xs leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[85%]">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-slate-600" />
                </div>
                <div className="bg-white rounded-xl px-3 py-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                    <span className="text-xs text-slate-500">{t.typing}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.inputPlaceholder}
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-800 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
            />
            
            {speechSupported && (
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading}
                className={`p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  isListening
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
                title={isListening ? t.stopListening : t.startListening}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>
            )}

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
