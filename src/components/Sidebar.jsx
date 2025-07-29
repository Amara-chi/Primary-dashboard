import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, BookOpen, FileText, TrendingUp, 
  Library, Calendar, User, GraduationCap,
  Sun, Moon, Settings
} from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange, isOpen, onToggle, theme, onThemeToggle }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'academics', label: 'Academics', icon: BookOpen, gradient: 'from-green-500 to-emerald-500' },
    { id: 'assignments', label: 'Assignments', icon: FileText, gradient: 'from-orange-500 to-red-500' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, gradient: 'from-purple-500 to-pink-500' },
    { id: 'library', label: 'Library', icon: Library, gradient: 'from-indigo-500 to-blue-500' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, gradient: 'from-teal-500 to-green-500' },
    { id: 'profile', label: 'Profile', icon: User, gradient: 'from-pink-500 to-rose-500' },
  ];

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: -288, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <motion.div 
      className={`fixed left-0 top-0 h-screen w-72 z-50 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800' 
          : 'bg-gradient-to-b from-white via-gray-50 to-white'
      } shadow-2xl border-r ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      } backdrop-blur-xl`}
      variants={sidebarVariants}
      animate={isOpen ? "open" : "closed"}
      initial="closed"
    >
      {/* Close button for mobile */}
      <button
        onClick={onToggle}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
      >
        ✕
      </button>
      
      {/* School Logo */}
      <motion.div 
        className="p-6 border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-4">
          <motion.div 
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <GraduationCap className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <motion.h1 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              EduPrime
            </motion.h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Primary School Portal</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                if (window.innerWidth < 1024) onToggle();
              }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-105`
                  : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} hover:transform hover:scale-105`
              }`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient effect */}
              {!isActive && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              )}
              
              <motion.div
                animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
              <span className="font-semibold text-lg">{item.label}</span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute right-4 w-2 h-2 bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Theme Toggle & Settings */}
      <motion.div 
        className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={onThemeToggle}
          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <motion.div
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </motion.div>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>
        
        <motion.div 
          className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'} rounded-xl p-4 text-center`}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.div 
            className="text-2xl mb-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎓
          </motion.div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-blue-600'}`}>
            Keep Learning!
          </p>
          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-blue-500'}`}>
            You're doing great!
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;