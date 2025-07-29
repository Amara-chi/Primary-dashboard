import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Brain, Lightbulb } from 'lucide-react';

const AITutor = ({ onChatOpen, theme }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showThought, setShowThought] = useState(false);
  const [currentThought, setCurrentThought] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const aiRef = useRef(null);

  const thoughts = [
    "Need help with your homework? I'm here! 🤓",
    "Great job on your recent assignments! 🌟",
    "Want to explore some fun learning activities? 🎯",
    "I can help explain difficult concepts! 💡",
    "Ready to tackle that math problem? 📊",
    "Let's make learning fun together! 🚀",
    "Your progress is amazing! Keep it up! 📈",
    "Have questions? Just click and ask! 💬"
  ];

  useEffect(() => {
    // Set initial position to bottom right on large screens
    const updatePosition = () => {
      if (window.innerWidth >= 1024) {
        setPosition({
          x: window.innerWidth - 120,
          y: window.innerHeight - 120
        });
      } else {
        setPosition({
          x: Math.min(100, window.innerWidth - 80),
          y: Math.min(100, window.innerHeight - 80)
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    // Random thoughts
    const thoughtInterval = setInterval(() => {
      if (!isDragging && !showThought) {
        const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
        setCurrentThought(randomThought);
        setShowThought(true);
        
        setTimeout(() => setShowThought(false), 4000);
      }
    }, 12000);

    // Initial thought
    setTimeout(() => {
      setCurrentThought(thoughts[0]);
      setShowThought(true);
      setTimeout(() => setShowThought(false), 3000);
    }, 3000);

    return () => {
      clearInterval(thoughtInterval);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isDragging]);

  // Mouse event handlers for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = aiRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div 
      ref={aiRef}
      className={`fixed z-20 cursor-${isDragging ? 'grabbing' : 'grab'} select-none`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`
      }}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        if (!isDragging) {
          onChatOpen();
        }
      }}
    >
      {/* Thought Bubble */}
      <AnimatePresence>
        {showThought && !isDragging && (
          <motion.div 
            className={`absolute -top-20 lg:-top-24 -left-12 lg:-left-16 ${
              theme === 'dark' 
                ? 'bg-slate-800 border-slate-600 text-white' 
                : 'bg-white border-gray-200 text-gray-800'
            } rounded-2xl p-4 shadow-2xl border-2 min-w-[200px] lg:min-w-[240px] z-30 pointer-events-none`}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="text-sm lg:text-base font-medium text-center">
              {currentThought}
            </div>
            <div className={`absolute -bottom-3 left-8 w-6 h-6 ${
              theme === 'dark' ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'
            } border-r-2 border-b-2 rotate-45`}></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Character */}
      <motion.div 
        className="relative"
        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30"
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: isHovered ? [0.3, 0.5, 0.3] : [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Main character */}
        <motion.div 
          className={`relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full border-4 ${
            theme === 'dark' ? 'border-slate-700' : 'border-white'
          } shadow-2xl flex items-center justify-center overflow-hidden`}
          animate={!isDragging ? { 
            rotate: [0, 5, -5, 0],
            y: [0, -5, 0]
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {/* Character face */}
          <motion.div 
            className="text-white text-2xl lg:text-3xl font-bold"
            animate={{ 
              scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🤖
          </motion.div>
          
          {/* Floating icons around character */}
          <motion.div 
            className="absolute -top-2 -right-2 text-yellow-400 text-sm lg:text-base"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            💡
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-1 -left-1 text-green-400 text-xs lg:text-sm"
            animate={{ 
              y: [0, -5, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            📚
          </motion.div>
        </motion.div>
        
        {/* Shadow */}
        <motion.div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 lg:w-16 h-3 lg:h-4 bg-black/20 rounded-full blur-sm"
          animate={{ 
            scale: isDragging ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: isDragging ? [0.2, 0.3, 0.2] : [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Drag indicator */}
        <AnimatePresence>
          {isDragging && (
            <motion.div 
              className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 ${
                theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-black/70 text-white'
              } px-3 py-1 rounded-lg text-xs font-medium`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Dragging...
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hover tooltip */}
        <AnimatePresence>
          {isHovered && !isDragging && !showThought && (
            <motion.div 
              className={`absolute -top-12 left-1/2 transform -translate-x-1/2 ${
                theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-black/70 text-white'
              } px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
            >
              Click to chat with AI Tutor!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AITutor;