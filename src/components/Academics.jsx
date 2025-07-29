import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Calculator, Microscope, Globe, 
  Palette, Music, Trophy, Clock, Star,
  ChevronRight, Play, Users, Target, Award
} from 'lucide-react';

const Academics = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-700',
      progress: 85,
      grade: 'A',
      nextTopic: 'Fractions & Decimals',
      recentScore: 92,
      totalLessons: 24,
      completedLessons: 20,
      emoji: '🔢'
    },
    {
      id: 'science',
      name: 'Science',
      icon: Microscope,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-700',
      progress: 78,
      grade: 'B+',
      nextTopic: 'Solar System',
      recentScore: 88,
      totalLessons: 20,
      completedLessons: 16,
      emoji: '🔬'
    },
    {
      id: 'english',
      name: 'English',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-700',
      progress: 90,
      grade: 'A',
      nextTopic: 'Creative Writing',
      recentScore: 95,
      totalLessons: 18,
      completedLessons: 16,
      emoji: '📚'
    },
    {
      id: 'social',
      name: 'Social Studies',
      icon: Globe,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-700',
      progress: 72,
      grade: 'B',
      nextTopic: 'Ancient Civilizations',
      recentScore: 82,
      totalLessons: 16,
      completedLessons: 12,
      emoji: '🌍'
    },
    {
      id: 'art',
      name: 'Art & Creativity',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-700',
      progress: 95,
      grade: 'A+',
      nextTopic: 'Digital Art',
      recentScore: 98,
      totalLessons: 12,
      completedLessons: 11,
      emoji: '🎨'
    },
    {
      id: 'music',
      name: 'Music',
      icon: Music,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-700',
      progress: 68,
      grade: 'B',
      nextTopic: 'Rhythm Patterns',
      recentScore: 85,
      totalLessons: 14,
      completedLessons: 10,
      emoji: '🎵'
    }
  ];

  const weeklySchedule = [
    { day: 'Monday', subjects: ['Math', 'Science', 'English'], highlight: true },
    { day: 'Tuesday', subjects: ['Social Studies', 'Art', 'Music'], highlight: false },
    { day: 'Wednesday', subjects: ['Math', 'English', 'Science'], highlight: false },
    { day: 'Thursday', subjects: ['Art', 'Music', 'Social Studies'], highlight: false },
    { day: 'Friday', subjects: ['Math', 'Science', 'English'], highlight: false }
  ];

  const achievements = [
    { title: 'Math Champion', description: 'Solved 100 problems correctly', icon: '🏆', subject: 'math' },
    { title: 'Science Explorer', description: 'Completed 10 experiments', icon: '🔬', subject: 'science' },
    { title: 'Creative Writer', description: 'Wrote 5 amazing stories', icon: '✍️', subject: 'english' },
    { title: 'History Buff', description: 'Mastered ancient civilizations', icon: '🏛️', subject: 'social' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="p-4 lg:p-8 space-y-6 lg:space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <motion.h1 
                className="text-3xl lg:text-5xl font-bold mb-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Academic Progress 📚
              </motion.h1>
              <p className="text-lg lg:text-xl opacity-90">
                Track your learning journey across all subjects
              </p>
            </div>
            <motion.div 
              className="text-6xl lg:text-8xl"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🎓
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Subject Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        variants={containerVariants}
      >
        {subjects.map((subject, index) => {
          const Icon = subject.icon;
          return (
            <motion.div
              key={subject.id}
              className={`${subject.bgColor} rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border-2 ${subject.borderColor} hover:shadow-2xl transition-all duration-300 cursor-pointer`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSubject(subject)}
            >
              {/* Subject Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className={`p-4 rounded-2xl bg-gradient-to-r ${subject.color} text-white shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
                </motion.div>
                <div className="text-right">
                  <motion.div 
                    className={`text-3xl lg:text-4xl font-bold ${
                      subject.grade.includes('A') ? 'text-green-600' : 
                      subject.grade.includes('B') ? 'text-blue-600' : 'text-orange-600'
                    }`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {subject.grade}
                  </motion.div>
                </div>
              </div>

              {/* Subject Info */}
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {subject.name}
              </h3>
              
              <div className="space-y-3">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div 
                      className={`h-3 rounded-full bg-gradient-to-r ${subject.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Recent Score</p>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">{subject.recentScore}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Lessons</p>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      {subject.completedLessons}/{subject.totalLessons}
                    </p>
                  </div>
                </div>

                {/* Next Topic */}
                <div className={`p-3 rounded-xl bg-gradient-to-r ${subject.color} bg-opacity-10`}>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Topic:</p>
                  <p className="font-bold text-gray-900 dark:text-white">{subject.nextTopic}</p>
                </div>
              </div>

              {/* Action Button */}
              <motion.button 
                className={`w-full mt-4 bg-gradient-to-r ${subject.color} text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5" />
                Continue Learning
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Weekly Schedule & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Weekly Schedule */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              📅
            </motion.div>
            Weekly Schedule
          </h2>
          
          <div className="space-y-4">
            {weeklySchedule.map((day, index) => (
              <motion.div
                key={day.day}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  day.highlight 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700' 
                    : 'bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-gray-600'
                }`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-lg ${
                    day.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {day.day}
                    {day.highlight && (
                      <motion.span 
                        className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded-full"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Today
                      </motion.span>
                    )}
                  </h3>
                  <div className="flex gap-2">
                    {day.subjects.map((subject, idx) => (
                      <motion.span 
                        key={idx}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.1 }}
                      >
                        {subject}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div 
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-yellow-100 dark:border-slate-600"
          variants={itemVariants}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              🏆
            </motion.div>
            Recent Achievements
          </h2>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow-lg border-2 border-yellow-200 dark:border-yellow-600"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="text-3xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                  <motion.div 
                    className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-full text-xs"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    NEW!
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subject Detail Modal */}
      <AnimatePresence>
        {selectedSubject && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSubject(null)}
          >
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedSubject.color} text-white`}>
                    <selectedSubject.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedSubject.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Current Grade: {selectedSubject.grade}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Progress Overview</h3>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSubject.progress}%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Complete</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSubject.recentScore}%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last Score</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {selectedSubject.completedLessons}/{selectedSubject.totalLessons}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Lessons</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Next Up</h3>
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedSubject.color} bg-opacity-10`}>
                    <p className="font-bold text-gray-900 dark:text-white">{selectedSubject.nextTopic}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Ready to continue your learning journey!
                    </p>
                  </div>
                </div>
                
                <motion.button 
                  className={`w-full bg-gradient-to-r ${selectedSubject.color} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-6 h-6" />
                  Start Learning {selectedSubject.nextTopic}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Academics;