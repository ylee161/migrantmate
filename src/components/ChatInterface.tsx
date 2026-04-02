import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Bot, User, Loader2, Mic, MicOff } from 'lucide-react';
import { getChatbotResponse, ChatMessage } from '../services/chatbotService';
import { LanguageCode } from '../translations';
import { chatInterfaceTranslations } from '../translations/chatInterface';

interface ChatInterfaceProps {
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

export function ChatInterface({ currentLang }: ChatInterfaceProps) {
  const location = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoSentRef = useRef(false);
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

  // Handle auto-send query from navigation state
  useEffect(() => {
    const autoSendQuery = location.state?.autoSendQuery;
    
    if (autoSendQuery && !hasAutoSentRef.current) {
      hasAutoSentRef.current = true;
      handleAutoSend(autoSendQuery);
    }
  }, [location.state]);

  const handleAutoSend = async (query: string) => {
    const userMessage: ChatMessage = {
      role: 'user',
      content: query
    };

    setMessages([userMessage]);
    setIsLoading(true);

    try {
      const response = await getChatbotResponse([userMessage], currentLang);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };

      setMessages([userMessage, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: t.errorMessage
      };
      setMessages([userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-cyan-800 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-3 rounded-full">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.title}</h2>
            <p className="text-sm text-white/90">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">{t.welcomeMessage}</p>
            <p className="text-slate-400 text-sm mt-2">{t.startConversation}</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-3 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-slate-200'
                    : 'bg-slate-200'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-slate-600" />
                ) : (
                  <Bot className="w-5 h-5 text-slate-600" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-cyan-800 text-white'
                    : 'bg-white text-slate-800 shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[80%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <Bot className="w-5 h-5 text-slate-600" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                  <span className="text-sm text-slate-500">{t.typing}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-200">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
          />
          
          {speechSupported && (
            <button
              type="button"
              onClick={toggleListening}
              disabled={isLoading}
              className={`px-4 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ${
                isListening
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
              title={isListening ? t.stopListening : t.startListening}
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5" />
                  <span className="font-medium">{t.listening}</span>
                </>
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          )}

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span className="font-medium">{t.sendButton}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
