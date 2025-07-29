import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Academics from './components/Academics.jsx';
import Assignments from './components/Assignments.jsx';
import Progress from './components/Progress.jsx';
import Library from './components/Library.jsx';
import Calendar from './components/Calendar.jsx';
import Profile from './components/Profile.jsx';
import FloatingParticles from './components/FloatingParticles.jsx';
import AITutor from './components/AITutor.jsx';
import ChatWindow from './components/ChatWindow.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Add smooth scrolling and theme management
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const renderContent = () => {
    const components = {
      dashboard: Dashboard,
      academics: Academics,
      assignments: Assignments,
      progress: Progress,
      library: Library,
      calendar: Calendar,
      profile: Profile
    };
    
    const Component = components[activeSection] || Dashboard;
    
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    );
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      } relative overflow-x-hidden`}>
        
        {/* Floating Background Particles */}
        <FloatingParticles theme={theme} />
        
        {/* AI Tutor */}
        <AITutor onChatOpen={() => setChatOpen(true)} theme={theme} />
        
        {/* Chat Window */}
        <AnimatePresence>
          {chatOpen && (
            <ChatWindow 
              onClose={() => setChatOpen(false)} 
              theme={theme}
            />
          )}
        </AnimatePresence>
        
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
        
        {/* Main Content */}
        <div className="lg:ml-72 min-h-screen relative z-10">
          {/* Mobile Header */}
          <motion.div 
            className="lg:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between sticky top-0 z-30"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <motion.div 
                  className="w-full h-0.5 bg-white rounded"
                  animate={{ rotate: sidebarOpen ? 45 : 0, y: sidebarOpen ? 6 : 0 }}
                />
                <motion.div 
                  className="w-full h-0.5 bg-white rounded"
                  animate={{ opacity: sidebarOpen ? 0 : 1 }}
                />
                <motion.div 
                  className="w-full h-0.5 bg-white rounded"
                  animate={{ rotate: sidebarOpen ? -45 : 0, y: sidebarOpen ? -6 : 0 }}
                />
              </div>
            </button>
            
            <motion.h1 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              EduPrime
            </motion.h1>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </motion.div>
            </button>
          </motion.div>
          
          {renderContent()}
        </div>
        
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;