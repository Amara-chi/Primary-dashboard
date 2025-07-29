import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Trophy, Clock, Star, 
  TrendingUp, Calendar, Bell, Award,
  ChevronRight, Play, Users, Target
} from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
    
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { 
      title: 'Current Grade', 
      value: 'Grade 5', 
      icon: Trophy, 
      color: 'from-yellow-400 to-orange-500',
      change: '+2 levels',
      trend: 'up'
    },
    { 
      title: 'Assignments Due', 
      value: '3', 
      icon: Clock, 
      color: 'from-red-400 to-pink-500',
      change: 'This week',
      trend: 'neutral'
    },
    { 
      title: 'Overall Score', 
      value: '87%', 
      icon: Star, 
      color: 'from-blue-400 to-cyan-500',
      change: '+5% this month',
      trend: 'up'
    },
    { 
      title: 'Study Streak', 
      value: '12 Days', 
      icon: TrendingUp, 
      color: 'from-green-400 to-emerald-500',
      change: 'Personal best!',
      trend: 'up'
    },
  ];

  const recentActivities = [
    { 
      subject: 'Mathematics', 
      activity: 'Completed Algebra Quiz', 
      score: 95, 
      time: '2 hours ago',
      icon: '📊',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    { 
      subject: 'Science', 
      activity: 'Submitted Lab Report', 
      score: 88, 
      time: '1 day ago',
      icon: '🔬',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    },
    { 
      subject: 'English', 
      activity: 'Essay: "My Summer Vacation"', 
      score: 92, 
      time: '2 days ago',
      icon: '📝',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    },
    { 
      subject: 'History', 
      activity: 'Ancient Civilizations Test', 
      score: 85, 
      time: '3 days ago',
      icon: '🏛️',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
    },
  ];

  const upcomingEvents = [
    { title: 'Math Test - Fractions', date: 'Tomorrow', time: '10:00 AM', type: 'test' },
    { title: 'Science Fair Project Due', date: 'Friday', time: '3:00 PM', type: 'assignment' },
    { title: 'Library Reading Session', date: 'Monday', time: '2:00 PM', type: 'activity' },
    { title: 'Parent-Teacher Meeting', date: 'Next Week', time: '4:00 PM', type: 'meeting' },
  ];

  const achievements = [
    { title: 'Math Wizard', description: 'Solved 100 math problems', icon: '🧮', unlocked: true },
    { title: 'Bookworm', description: 'Read 25 books this year', icon: '📚', unlocked: true },
    { title: 'Science Explorer', description: 'Completed 10 experiments', icon: '🔬', unlocked: true },
    { title: 'Perfect Attendance', description: 'No absences this month', icon: '🎯', unlocked: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="p-4 lg:p-8 space-y-6 lg:space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden"
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
                {greeting}, Alex! 👋
              </motion.h1>
              <p className="text-lg lg:text-xl opacity-90 mb-4">
                Ready to continue your learning journey?
              </p>
              <div className="flex items-center gap-4 text-sm lg:text-base opacity-80">
                <span>{currentTime.toLocaleDateString()}</span>
                <span>•</span>
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
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
        
        {/* Floating elements */}
        <div className="absolute top-4 right-20 text-2xl opacity-30 animate-bounce">⭐</div>
        <div className="absolute bottom-4 left-20 text-xl opacity-20 animate-pulse">📚</div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        variants={containerVariants}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                {stat.trend === 'up' && (
                  <motion.div 
                    className="text-green-500"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {stat.title}
              </h3>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                {stat.change}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Recent Activities */}
        <motion.div 
          className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                📈
              </motion.div>
              Recent Activities
            </h2>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className={`p-3 rounded-xl ${activity.color}`}>
                  <span className="text-xl">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {activity.subject}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.activity}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {activity.time}
                  </p>
                </div>
                <div className="text-right">
                  <motion.div 
                    className={`text-2xl font-bold ${
                      activity.score >= 90 ? 'text-green-600' : 
                      activity.score >= 80 ? 'text-blue-600' : 'text-orange-600'
                    }`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {activity.score}%
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📅
            </motion.div>
            Upcoming Events
          </h2>
          
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 border border-blue-100 dark:border-slate-600"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {event.date} • {event.time}
                    </p>
                  </div>
                  <motion.div 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'test' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                      event.type === 'assignment' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                      event.type === 'activity' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {event.type}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div 
        className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-yellow-100 dark:border-slate-600"
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
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                achievement.unlocked 
                  ? 'bg-white dark:bg-slate-700 shadow-lg border-2 border-yellow-200 dark:border-yellow-600' 
                  : 'bg-gray-100 dark:bg-slate-600 opacity-60'
              }`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={achievement.unlocked ? { scale: 1.05, y: -5 } : {}}
            >
              <motion.div 
                className={`text-3xl lg:text-4xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}
                animate={achievement.unlocked ? { 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {achievement.icon}
              </motion.div>
              <h3 className={`font-bold text-sm lg:text-base mb-1 ${
                achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-xs ${
                achievement.unlocked ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
              {achievement.unlocked && (
                <motion.div 
                  className="mt-2 bg-yellow-500 text-white font-bold py-1 px-2 rounded-full text-xs"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  UNLOCKED! 🎉
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;