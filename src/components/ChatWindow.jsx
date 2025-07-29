import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Volume2, VolumeX, Send, Bot, User } from 'lucide-react';

const ChatWindow = ({ onClose, theme }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your AI Tutor. I'm here to help you with your studies! What subject would you like to explore today? 🎓", 
      sender: 'ai', 
      timestamp: new Date() 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [synthesis, setSynthesis] = useState(null);
  const messagesEndRef = useRef(null);

  const aiResponses = [
    "That's a great question! Let me help you understand that concept better. 📚",
    "Excellent work! You're really getting the hang of this! 🌟",
    "Don't worry if it seems difficult at first. Learning takes practice! 💪",
    "Let's break this down into smaller, easier steps. 🔍",
    "I'm impressed by your curiosity! That's the key to great learning! 🗝️",
    "Would you like me to explain that in a different way? 🤔",
    "You're asking all the right questions! Keep it up! 🎯",
    "That's exactly right! You've mastered this concept! 🏆"
  ];

  const subjectHelp = {
    math: "Math can be fun! Let's solve problems step by step. What math topic are you working on? 🔢",
    science: "Science is all around us! What scientific concept would you like to explore? 🔬",
    english: "Language is powerful! Are you working on reading, writing, or grammar? 📝",
    history: "History tells amazing stories! What time period interests you? 🏛️",
    art: "Creativity has no limits! What kind of art project are you working on? 🎨"
  };

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }

    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }

    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for subject-specific help
    for (const [subject, response] of Object.entries(subjectHelp)) {
      if (message.includes(subject)) {
        return response;
      }
    }
    
    // Check for specific keywords
    if (message.includes('help') || message.includes('explain')) {
      return "I'd be happy to help! Can you tell me more about what you're working on? 🤝";
    }
    
    if (message.includes('homework') || message.includes('assignment')) {
      return "Let's tackle that homework together! What subject is it for? 📋";
    }
    
    if (message.includes('test') || message.includes('exam')) {
      return "Test preparation is important! What subject are you studying for? I can help you review! 📖";
    }
    
    if (message.includes('difficult') || message.includes('hard')) {
      return "Don't worry! Every expert was once a beginner. Let's work through this together! 💪";
    }
    
    // Default responses
    return aiResponses[Math.floor(Math.random() * aiResponses.length)];
  };

  const handleUserMessage = (message) => {
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // AI Response after a delay
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: messages.length + 2,
        text: generateAIResponse(message),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Speak the AI response
      speakMessage(aiResponse.text);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      handleUserMessage(inputMessage);
      setInputMessage('');
    }
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const speakMessage = (text) => {
    if (synthesis) {
      // Remove emojis for speech
      const cleanText = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 lg:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={`${
          theme === 'dark' 
            ? 'bg-slate-800 border-slate-600' 
            : 'bg-white border-gray-200'
        } rounded-3xl w-full max-w-2xl h-[90vh] lg:h-[600px] flex flex-col shadow-2xl border-2`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl p-4 lg:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              className="text-3xl lg:text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤖
            </motion.div>
            <div>
              <h3 className="text-lg lg:text-2xl font-bold">AI Tutor</h3>
              <p className="text-blue-100 text-sm lg:text-base">Your Personal Learning Assistant</p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 p-2 lg:p-3 rounded-full transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6" />
          </motion.button>
        </div>

        {/* Messages */}
        <div className={`flex-1 p-4 lg:p-6 overflow-y-auto ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-slate-800 to-slate-900' 
            : 'bg-gradient-to-b from-blue-50 to-purple-50'
        }`}>
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} px-2 lg:px-0`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className={`flex items-start gap-3 max-w-xs lg:max-w-md ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    {/* Avatar */}
                    <motion.div 
                      className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-green-500 to-teal-500'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 lg:w-5 lg:h-5" />
                      ) : (
                        <Bot className="w-4 h-4 lg:w-5 lg:h-5" />
                      )}
                    </motion.div>
                    
                    {/* Message bubble */}
                    <motion.div
                      className={`px-4 lg:px-6 py-3 lg:py-4 rounded-2xl shadow-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : theme === 'dark'
                          ? 'bg-slate-700 text-white border border-slate-600'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <p className="text-sm lg:text-base font-medium">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' 
                          ? 'text-blue-100' 
                          : theme === 'dark' 
                          ? 'text-gray-400' 
                          : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  className="flex justify-start px-2 lg:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white">
                      <Bot className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      theme === 'dark' ? 'bg-slate-700' : 'bg-white'
                    } shadow-lg border ${theme === 'dark' ? 'border-slate-600' : 'border-gray-200'}`}>
                      <div className="flex space-x-1">
                        <motion.div 
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 lg:p-6 border-t-2 ${
          theme === 'dark' ? 'border-slate-600 bg-slate-800' : 'border-gray-200 bg-white'
        } rounded-b-2xl`}>
          <div className="flex gap-2 lg:gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your studies..."
              className={`flex-1 px-4 py-3 border-2 rounded-2xl focus:outline-none text-base lg:text-lg transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              }`}
            />
            
            {/* Voice Controls */}
            <motion.button
              onClick={startListening}
              disabled={isListening}
              className={`p-3 rounded-2xl font-bold transition-all duration-300 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isListening ? <MicOff className="w-5 h-5 lg:w-6 lg:h-6" /> : <Mic className="w-5 h-5 lg:w-6 lg:h-6" />}
            </motion.button>
            
            <motion.button
              onClick={isSpeaking ? stopSpeaking : () => speakMessage("Hello! I'm your AI tutor, ready to help you learn!")}
              className={`p-3 rounded-2xl font-bold transition-all duration-300 ${
                isSpeaking
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5 lg:w-6 lg:h-6" /> : <Volume2 className="w-5 h-5 lg:w-6 lg:h-6" />}
            </motion.button>
            
            <motion.button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 lg:px-6 py-3 rounded-2xl font-bold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5 lg:w-6 lg:h-6" />
            </motion.button>
          </div>
          
          <AnimatePresence>
            {isListening && (
              <motion.div 
                className="text-center mt-3 text-red-600 font-bold animate-pulse text-sm lg:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                🎤 Listening... Speak now!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatWindow;