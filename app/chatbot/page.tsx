'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Send, Bot, User, MapPin, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const mockConversations = [
  {
    userMessage: "Where is the best location to place charging stations in this area?",
    botResponse: "Based on Manhattan map analysis, I recommend 3 optimal locations:\n\n1. **Prince Mohammed Bin Abdulaziz Road** - High traffic area near city center, 5km coverage radius can serve 85,000 residents.\n\n2. **Quba District** - Strategic zone near Quba Mosque with high vehicle density, suitable for DC Fast Charger.\n\n3. **King Fahd Road Corridor** - Easy access from highway, ideal for Ultra-Fast Charger serving long-distance travel.\n\nWould you like me to explain technical details for any of these locations?"
  },
  {
    userMessage: "What coverage area can be achieved at Prince Mohammed Bin Abdulaziz Road location?",
    botResponse: "For **Prince Mohammed Bin Abdulaziz Road** location, achievable coverage area:\n\n📍 **Coverage Details:**\n- Radius: 5 km\n- Population served: ~85,000 people\n- Potential EV vehicles: 2,400 units\n- Average charging time: 30-45 minutes (DC Fast)\n\n📊 **Demographics:**\n- Area type: Mixed commercial-residential\n- Income level: Medium-high\n- EV adoption probability: 73%\n\n⚡ **Charger Recommendation:**\n- 4x DC Fast Chargers (50kW)\n- 2x Ultra-Fast Chargers (150kW)\n- 1x Solar Canopy (20kW capacity)\n\nThis location scores 8.9/10 for optimal placement."
  },
  {
    userMessage: "Compare with Quba District location",
    botResponse: "Comparison **Prince Mohammed Road** vs **Quba District**:\n\n| Metric | Prince Mohammed | Quba District |\n|--------|----------------|---------------|\n| Coverage | 5 km | 4.2 km |\n| Population | 85,000 | 62,000 |\n| Traffic Score | 8.9/10 | 7.8/10 |\n| Cost | 850K SAR | 620K SAR |\n| ROI Period | 2.1 years | 2.8 years |\n| Religious Tourism | Medium | Very High |\n\n**Conclusion:**\n- Prince Mohammed: Better for daily commuters\n- Quba: More strategic for religious tourism peak seasons\n\nRecommendation: Deploy both for maximum coverage!"
  }
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I am AMTHAL AI Assistant. I can help you analyze Manhattan map and recommend optimal locations for EV charging stations. What would you like to know?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: Date.now(),
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate thinking time (2-3 seconds)
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => !msg.isTyping));

      const conversation = mockConversations[currentConversationIndex % mockConversations.length];
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: conversation.botResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setCurrentConversationIndex(prev => prev + 1);
    }, 2500);
  };

  const handleSend = () => {
    if (inputValue.trim() === '' || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    simulateBotResponse(inputValue);
    setInputValue('');
  };

  const handleQuickQuestion = (question: string) => {
    if (isTyping) return;
    
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    simulateBotResponse(question);
  };

  const quickQuestions = [
    "Where is the best location for charging stations?",
    "What is the coverage area in this region?",
    "Compare 2 different locations",
    "Analyze equity score for this area",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-[#276FB0]/30 to-[#134474]/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-[#134474]/30 to-[#0D263F]/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-8 py-8 relative">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#276FB0] to-[#134474] bg-clip-text text-transparent flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-[#276FB0]" />
            AI Chatbot Assistant
          </h1>
          <p className="text-gray-700 text-lg">
            Ask anything about optimal locations for EV charging stations in Manhattan
          </p>
        </div>

        {/* Main Content - Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Side - Map */}
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl overflow-hidden">
            <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#276FB0]" />
              <span className="font-semibold text-gray-700">Manhattan Region</span>
            </div>
            
            <div className="relative w-full h-full">
              <Image
                src="/assets/maps2.jpeg"
                alt="Manhattan Map"
                fill
                className="object-cover"
                priority
              />
              
              {/* Interactive Markers */}
              <div className="absolute top-1/3 left-1/2 w-4 h-4 -ml-2 -mt-2">
                <div className="absolute inset-0 bg-[#276FB0] rounded-full animate-ping"></div>
                <div className="absolute inset-0 bg-[#276FB0] rounded-full"></div>
              </div>
              
              <div className="absolute top-2/3 right-1/3 w-4 h-4 -ml-2 -mt-2">
                <div className="absolute inset-0 bg-[#134474] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-0 bg-[#134474] rounded-full"></div>
              </div>

              <div className="absolute bottom-1/4 left-1/3 w-4 h-4 -ml-2 -mt-2">
                <div className="absolute inset-0 bg-[#0D263F] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-0 bg-[#0D263F] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="flex flex-col bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#276FB0]/10 to-[#134474]/10 backdrop-blur-sm border-b border-white/30 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#276FB0] to-[#134474] rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">AMTHAL AI Assistant</h3>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online & Ready
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ maxHeight: 'calc(100vh - 450px)' }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-gray-400 to-gray-600' 
                        : 'bg-gradient-to-br from-[#276FB0] to-[#134474]'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div>
                      {message.isTyping ? (
                        <div className="bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 shadow-md border border-white/40">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 text-[#276FB0] animate-spin" />
                            <span className="text-sm text-gray-600">AI is thinking...</span>
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-[#276FB0] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                              <span className="w-2 h-2 bg-[#276FB0] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                              <span className="w-2 h-2 bg-[#276FB0] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`rounded-2xl px-4 py-3 shadow-md ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-[#276FB0] to-[#134474] text-white'
                            : 'bg-white/60 backdrop-blur-md border border-white/40 text-gray-800'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        </div>
                      )}
                      <p className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Quick Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      disabled={isTyping}
                      className="text-xs px-3 py-2 bg-white/50 backdrop-blur-sm hover:bg-white/80 rounded-xl border border-white/40 text-gray-700 hover:text-[#276FB0] transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="border-t border-white/30 p-4 bg-gradient-to-t from-white/50 to-transparent backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about charging station locations..."
                  disabled={isTyping}
                  className="flex-1 bg-white/60 backdrop-blur-md border border-white/40 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#276FB0] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 placeholder-gray-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping || inputValue.trim() === ''}
                  className="bg-gradient-to-r from-[#276FB0] to-[#134474] text-white rounded-xl px-6 py-3 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
