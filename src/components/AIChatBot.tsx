import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Calendar, 
  Utensils, 
  ChefHat, 
  Bot, 
  User,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickAction?: {
    type: 'menu' | 'reservation';
    label: string;
  };
}

const QUICK_PROMPTS = [
  '👑 What are your signature dishes?',
  '🥗 Are there Jain & Vegetarian options?',
  '🌶️ How spicy is the Saffron Biryani?',
  '📅 How do I reserve a table?',
  '🍸 Signature drinks & pairings?',
  '🏢 Tell me about Ashivam Technologies',
];

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Namaste & Welcome to **Saffron & Stone**! I am your AI Dining Concierge. Ask me anything about our dishes, spice levels, Jain/Veg options, table bookings, or our dining partner Ashivam Technologies.`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Call full-stack backend endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages.map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      let botReply = '';
      if (response.ok) {
        const data = await response.json();
        botReply = data.reply || '';
      }

      if (!botReply) {
        throw new Error('No reply received from server');
      }

      // Check if reply suggests menu or reservation
      let quickAction: ChatMessage['quickAction'] = undefined;
      const lower = (query + ' ' + botReply).toLowerCase();
      if (lower.includes('reserv') || lower.includes('book') || lower.includes('table')) {
        quickAction = { type: 'reservation', label: 'Book a Table Now' };
      } else if (lower.includes('menu') || lower.includes('dish') || lower.includes('order')) {
        quickAction = { type: 'menu', label: 'Explore Our Menu' };
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Offline fallback handling
      const fallbackReply = `We are delighted to assist you! For reservations and instant service, you can also call our reception at **${RESTAURANT_INFO.phone}** or reserve directly through our booking section.`;
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          sender: 'bot',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quickAction: { type: 'reservation', label: 'Go to Reservations' },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (type: 'menu' | 'reservation') => {
    setIsOpen(false);
    const targetId = type === 'menu' ? 'menu' : 'reservations';
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to render bold text nicely
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-stone-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Trigger Button in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {!isOpen && hasUnread && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 text-cream-100 text-xs shadow-xl border border-amber-500/30 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Have dining doubts? Ask AI!</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close dining concierge' : 'Open AI dining concierge'}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-terracotta-500 text-stone-950 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-stone-950" />
          ) : (
            <>
              <ChefHat className="w-7 h-7 text-stone-950" />
              {hasUnread && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full" />
              )}
            </>
          )}
        </button>
      </div>

      {/* Slide-Up Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-w-[420px] h-[550px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white p-4 flex items-center justify-between border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm font-semibold text-cream-100">AI Dining Concierge</h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Gemini AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Saffron & Stone · Always Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-stone-50 border-b border-stone-100 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Suggestions:
            </span>
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="text-[11px] whitespace-nowrap bg-white hover:bg-amber-50 hover:text-amber-800 text-stone-600 px-2.5 py-1 rounded-full border border-stone-200 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                        : 'bg-white text-stone-700 border border-stone-200/80 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{formatText(msg.text)}</p>

                    {/* Optional Quick Action Button */}
                    {msg.quickAction && (
                      <div className="mt-2.5 pt-2 border-t border-stone-100">
                        <button
                          onClick={() => handleActionClick(msg.quickAction!.type)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-[11px] transition-colors cursor-pointer border border-amber-200"
                        >
                          {msg.quickAction.type === 'reservation' ? (
                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <Utensils className="w-3.5 h-3.5 text-amber-600" />
                          )}
                          <span>{msg.quickAction.label}</span>
                          <ChevronRight className="w-3 h-3 text-amber-600" />
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-stone-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-2xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-stone-400 ml-1">Consulting Kitchen...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about dishes, spice levels, bookings..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-stone-900 placeholder:text-stone-400 bg-stone-50"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className="bg-stone-100 px-3 py-1.5 text-center text-[10px] text-stone-500 flex items-center justify-center gap-1">
            <span>Powered by Ashivam Technologies & Gemini AI</span>
          </div>

        </div>
      )}
    </>
  );
};
