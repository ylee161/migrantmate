import { MessageCircle } from 'lucide-react';

interface FloatingChatBubbleProps {
  onClick: () => void;
}

export function FloatingChatBubble({ onClick }: FloatingChatBubbleProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Open Chatbot"
    >
      <div className="relative">
        {/* Main bubble - completely static, no animations */}
        <div className="relative w-16 h-16 bg-cyan-800 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Chat with us
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
        </div>
      </div>
    </button>
  );
}
