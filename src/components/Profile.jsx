import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Edit, Camera, Award, Star, 
  BookOpen, Trophy, Target, Calendar,
  Settings, Bell, Shield, Palette
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('👦');
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    grade: '5th Grade',
    age: 10,
    school: 'Sunshine Elementary',
    favoriteSubject: 'Science',
    hobbies: ['Reading', 'Drawing', 'Soccer'],
    bio: 'I love learning new things and exploring the world around me!'
  });

  const avatars = [
    '👦', '👧', '🧒', '👶', '🦸‍♂️', '🦸‍♀️', 
    '🧙‍♂️', '🧙‍♀️', '🦄', '🐻', '🦊', '🐱', 
    '🐶', '🐸', '🦉', '🐼'
  ];

  const themes = [
    { name: 'Ocean Blue', colors: 'from-blue-400 to-cyan-500', emoji: '🌊' },
    { name: 'Forest Green', colors: 'from-green-400 to-emerald-500', emoji: '🌲' },
    { name: 'Sunset Orange', colors: 'from-orange-400 to-red-500', emoji: '🌅' },
    { name: 'Purple Magic', colors: 'from-purple-400 to-pink-500', emoji: '🔮' },
    { name: 'Golden Sun', colors: 'from-yellow-400 to-orange-500', emoji: '☀️' },
    { name: 'Rose Garden', colors: 'from-pink-400 to-rose-500', emoji: '🌹' }
  ];

  const achievements = [
    { 
      title: 'Honor Roll Student', 
      description: 'Maintained A average for 3 consecutive months', 
      icon: '🏆', 
      date: '2024-03-01',
      category: 'Academic',
      rarity: 'gold'
    },
    { 
      title: 'Reading Champion', 
      description: 'Read 25 books this school year', 
      icon: '📚', 
      date: '2024-02-15',
      category: 'Reading',
      rarity: 'platinum'
    },
    { 
      title: 'Math Wizard', 
      description: 'Perfect scores on 5 consecutive math tests', 
      icon: '🧮', 
      date: '2024-02-28',
      category: 'Mathematics',
      rarity: 'gold'
    },
    { 
      title: 'Science Explorer', 
      description: 'Completed 15 science experiments', 
      icon: '🔬', 
      date: '2024-01-20',
      category: 'Science',
      rarity: 'silver'
    },
    { 
      title: 'Creative Artist', 
      description: 'Created 10 amazing art projects', 
      icon: '🎨', 
      date: '2024-03-05',
      category: 'Art',
      rarity: 'gold'
    },
    { 
      title: 'Team Player', 
      description: 'Excellent collaboration in group projects', 
      icon: '🤝', 
      date: '2024-02-10',
      category: 'Social',
      rarity: 'silver'
    }
  ];

  const stats = {
    totalPoints: 2847,
    level: 15,
    nextLevelPoints: 3000,
    booksRead: 23,
    testsCompleted: 45,
    projectsFinished: 12,
    studyStreak: 18
  };

  const subjects = [
    { name: 'Mathematics', level: 12, progress: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'Science', level: 14, progress: 92, color: 'from-green-500 to-emerald-500' },
    { name: 'English', level: 13, progress: 78, color: 'from-purple-500 to-pink-500' },
    { name: 'History', level: 10, progress: 65, color: 'from-orange-500 to-red-500' },
    { name: 'Art', level: 16, progress: 95, color: 'from-pink-500 to-rose-500' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'platinum': return 'from-gray-400 to-gray-600 border-gray-500';
      case 'gold': return 'from-yellow-400 to-yellow-600 border-yellow-500';
      case 'silver': return 'from-gray-300 to-gray-500 border-gray-400';
      default: return 'from-bronze-400 to-bronze-600 border-bronze-500';
    }
  };

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
        className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden"
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
                My Profile 👤
              </motion.h1>
              <p className="text-lg lg:text-xl opacity-90">
                Customize your learning experience and track your journey
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
              ⭐
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Profile Card */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          <div className="text-center mb-6">
            <motion.div 
              className="relative inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-xl">
                <span className="text-4xl lg:text-6xl">{selectedAvatar}</span>
              </div>
              <motion.button 
                className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4" />
              </motion.button>
            </motion.div>
            
            <motion.h2 
              className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {profileData.name}
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-400 mb-1">{profileData.grade}</p>
            <p className="text-gray-500 dark:text-gray-500">{profileData.school}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About Me</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{profileData.bio}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Favorite Subject</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{profileData.favoriteSubject}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hobbies</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.hobbies.map((hobby, index) => (
                  <motion.span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.1 }}
                  >
                    {hobby}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats & Progress */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          variants={itemVariants}
        >
          {/* Level Progress */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-yellow-100 dark:border-slate-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  🎯
                </motion.div>
                Level {stats.level}
              </h3>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">{stats.totalPoints}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                <span>Progress to Level {stats.level + 1}</span>
                <span>{stats.totalPoints}/{stats.nextLevelPoints}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                <motion.div 
                  className="bg-gradient-to-r from-orange-400 to-yellow-500 h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.totalPoints / stats.nextLevelPoints) * 100}%` }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-700"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                📚
              </motion.div>
              <p className="text-2xl font-bold text-blue-600">{stats.booksRead}</p>
              <p className="text-sm text-blue-600">Books Read</p>
            </motion.div>

            <motion.div
              className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center border border-green-200 dark:border-green-700"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📝
              </motion.div>
              <p className="text-2xl font-bold text-green-600">{stats.testsCompleted}</p>
              <p className="text-sm text-green-600">Tests Done</p>
            </motion.div>

            <motion.div
              className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center border border-purple-200 dark:border-purple-700"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎨
              </motion.div>
              <p className="text-2xl font-bold text-purple-600">{stats.projectsFinished}</p>
              <p className="text-sm text-purple-600">Projects</p>
            </motion.div>

            <motion.div
              className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center border border-red-200 dark:border-red-700"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-3xl mb-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥
              </motion.div>
              <p className="text-2xl font-bold text-red-600">{stats.studyStreak}</p>
              <p className="text-sm text-red-600">Day Streak</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Subject Levels */}
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
        variants={itemVariants}
      >
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            📊
          </motion.div>
          Subject Mastery Levels
        </h2>
        
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {subject.name}
                </h3>
                <div className="text-right">
                  <motion.div 
                    className={`text-2xl font-bold bg-gradient-to-r ${subject.color} bg-clip-text text-transparent`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Level {subject.level}
                  </motion.div>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  <span>Mastery Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <motion.div 
                    className={`h-3 rounded-full bg-gradient-to-r ${subject.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Avatar Selection Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditing(false)}
          >
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Choose Your Avatar
                </h2>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
                {avatars.map((avatar, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl border-4 transition-all duration-300 flex items-center justify-center text-3xl lg:text-4xl ${
                      selectedAvatar === avatar
                        ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 scale-110'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-blue-300 hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
              
              <motion.button 
                onClick={() => setIsEditing(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Avatar
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;