'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ConversationStarter {
  question: string;
  response: string;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. I can help you learn about AI, development projects, and technical expertise.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [typingText, setTypingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText]);

  const conversationStarters: ConversationStarter[] = [
    {
      question: "What technologies do you work with daily?",
      response: "I work primarily with React and Next.js for frontend development, Node.js and Python for backend services, and TypeScript for type safety. I specialize in building AI applications, RAG systems, and full-stack solutions using modern frameworks. I also work extensively with Docker, PostgreSQL, and cloud platforms like AWS and Google Cloud."
    },
    {
      question: "Can you describe a challenging project you've worked on?",
      response: "I've developed complex AI-powered applications with sophisticated user interfaces and backend systems. The challenges often involve creating intuitive interfaces while handling large datasets, implementing real-time features, and ensuring optimal performance. I focus on clean architecture, scalable solutions, and user experience optimization."
    },
    {
      question: "How do you ensure code quality and security?",
      response: "I implement comprehensive testing strategies with Jest and Cypress, use TypeScript for type safety, and follow security-first development practices. I focus on code reviews, automated testing, proper authentication flows, and secure API integrations. Clean code principles and documentation are also key priorities."
    },
    {
      question: "What's your experience with team collaboration?",
      response: "I have extensive experience working in agile environments, leading technical discussions, and mentoring developers. I believe in clear communication, knowledge sharing through documentation, and collaborative problem-solving. I've successfully coordinated between frontend, backend, and AI teams on complex projects."
    }
  ];

  const simulateAIResponse = async (userMessage: string) => {
    setIsThinking(true);
    
    // Check if this is a conversation starter
    const starter = conversationStarters.find(s => s.question === userMessage);
    let response: string;
    
    if (starter) {
      response = starter.response;
    } else {
      // For any freeform message, use the OpenRouter credit gag message
      response = "I've ran out of free OpenRouter credits for now... :( But feel free to reach out directly via email or LinkedIn to discuss AI work, development projects, and technical expertise!";
    }
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsThinking(false);
    
    // Simulate typing effect
    let currentText = '';
    for (let i = 0; i < response.length; i++) {
      currentText += response[i];
      setTypingText(currentText);
      // Scroll to bottom during typing
      setTimeout(() => scrollToBottom(), 10);
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'ai',
      content: response,
      timestamp: new Date()
    }]);
    
    setTypingText('');
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    await simulateAIResponse(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStarterClick = async (starter: ConversationStarter) => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: starter.question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    await simulateAIResponse(starter.question);
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl z-50 flex items-center justify-center"
        style={{
          background: 'linear-gradient(to right, var(--primary-500), var(--secondary-500))'
        }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.3)",
            "0 0 40px rgba(147, 51, 234, 0.5)",
            "0 0 20px rgba(59, 130, 246, 0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div>
          {isOpen ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </div>
      </motion.button>

      {/* AI Interface Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 sm:bottom-28 sm:right-8 w-[calc(100vw-2rem)] max-w-sm sm:w-96 h-[70vh] sm:h-[500px] bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl z-40 flex flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-gray-700" style={{
              background: 'linear-gradient(to right, var(--primary-500), var(--secondary-500))',
              opacity: 0.2
            }}>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base">AI Assistant</h3>
                  <p className="text-gray-400 text-xs">Powered by AI</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4" style={{ minHeight: 0 }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-2xl ${
                    message.type === 'user' 
                      ? 'text-white' 
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}
                  style={message.type === 'user' ? {
                    background: 'linear-gradient(to right, var(--primary-500), var(--secondary-500))'
                  } : {}}>
                    <p className="text-xs sm:text-sm">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 border border-gray-700 p-2 sm:p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary-400)' }}></div>
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary-400)', animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--primary-400)', animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-gray-400 text-xs">Processing...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {typingText && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 border border-gray-700 p-2 sm:p-3 rounded-2xl max-w-[85%] sm:max-w-[80%]">
                    <p className="text-xs sm:text-sm text-gray-100 break-words">{typingText}</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Conversation Starters */}
            {messages.length === 1 && (
              <div className="px-3 sm:px-4 py-2 border-t border-gray-700 flex-shrink-0">
                <p className="text-gray-400 text-xs mb-2 sm:mb-3">Quick questions to get started:</p>
                <div className="space-y-1 sm:space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
                  {conversationStarters.map((starter, index) => (
                    <button
                      key={index}
                      onClick={() => handleStarterClick(starter)}
                      className="w-full text-left p-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-gray-200 text-xs transition-colors"
                      disabled={isThinking}
                    >
                      {starter.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-gray-700 flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about AI work..."
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-3 sm:px-4 py-2 text-white placeholder-gray-400 focus:outline-none transition-colors text-sm"
                  style={{
                    borderColor: inputValue ? 'var(--primary-400)' : '#4b5563'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary-400)'}
                  onBlur={(e) => e.target.style.borderColor = inputValue ? 'var(--primary-400)' : '#4b5563'}
                  disabled={isThinking}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isThinking}
                  className="p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  style={{
                    background: 'linear-gradient(to right, var(--primary-500), var(--secondary-500))'
                  }}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
