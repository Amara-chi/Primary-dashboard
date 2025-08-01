import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Award, Target, Calendar,
  BarChart3, PieChart, LineChart, Star,
  Trophy, Medal, Crown, Zap
} from 'lucide-react';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const overallStats = {
    currentGrade: 'A-',
    gpa: 3.7,
    rank: 5,
    totalStudents: 28,
    improvement: '+12%',
    streak: 15
  };

  const subjectProgress = [
    { 
      name: 'Mathematics', 
      current: 87, 
      previous: 82, 
      trend: 'up',
      grade: 'A-',
      color: 'from-blue-500 to-cyan-500',
      icon: '🔢',
      strengths: ['Algebra', 'Geometry'],
      improvements: ['Word Problems']
    },
    { 
      name: 'Science', 
      current: 91, 
      previous: 88, 
      trend: 'up',
      grade: 'A',
      color: 'from-green-500 to-emerald-500',
      icon: '🔬',
      strengths: ['Biology', 'Chemistry'],
      improvements: ['Physics']
    },
    { 
      name: 'English', 
      current: 89, 
      previous: 91, 
      trend: 'down',
      grade: 'B+',
      color: 'from-purple-500 to-pink-500',
      icon: '📚',
      strengths: ['Reading', 'Vocabulary'],
      improvements: ['Grammar']
    },
    { 
      name: 'Social Studies', 
      current: 85, 
      previous: 83, 
      trend: 'up',
      grade: 'B+',
      color: 'from-orange-500 to-red-500',
      icon: '🌍',
      strengths: ['History', 'Geography'],
      improvements: ['Current Events']
    },
    { 
      name: 'Art', 
      current: 95, 
      previous: 93, 
      trend: 'up',
      grade: 'A+',
      color: 'from-pink-500 to-rose-500',
      icon: '🎨',
      strengths: ['Drawing', 'Color Theory'],
      improvements: ['Sculpture']
    }
  ];

  const achievements = [
    { 
      title: 'Honor Roll', 
      description: 'Maintained A average for 3 months', 
      icon: '🏆', 
      date: '2024-03-01',
      rarity: 'gold'
    },
    { 
      title: 'Perfect Attendance', 
      description: 'No absences this semester', 
      icon: '🎯', 
      date: '2024-02-15',
      rarity: 'silver'
    },
    { 
      title: 'Math Wizard', 
      description: 'Scored 100% on 5 consecutive tests', 
      icon: '🧮', 
      date: '2024-02-28',
      rarity: 'gold'
    },
    { 
      title: 'Science Fair Winner', 
      description: 'First place in school science fair', 
      icon: '🥇', 
      date: '2024-01-20',
      rarity: 'platinum'
    },
    { 
      title: 'Reading Champion', 
      description: 'Read 25 books this year', 
      icon: '📖', 
      date: '2024-03-05',
      rarity: 'gold'
    },
    { 
      title: 'Team Player', 
      description: 'Excellent collaboration skills', 
      icon: '🤝', 
      date: '2024-02-10',
      rarity: 'silver'
    }
  ];

  const monthlyProgress = [
    { month: 'Sep', score: 78 },
    { month: 'Oct', score: 82 },
    { month: 'Nov', score: 85 },
    { month: 'Dec', score: 87 },
    { month: 'Jan', score: 89 },
    { month: 'Feb', score: 88 },
    { month: 'Mar', score: 91 }
  ];

  const skillsRadar = [
    { skill: 'Problem Solving', score: 85 },
    { skill: 'Critical Thinking', score: 90 },
    { skill: 'Creativity', score: 95 },
    { skill: 'Communication', score: 88 },
    { skill: 'Collaboration', score: 92 },
    { skill: 'Leadership', score: 78 }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'platinum': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      default: return 'from-bronze-400 to-bronze-600';
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
        className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden"
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
                Progress Report 📊
              </motion.h1>
              <p className="text-lg lg:text-xl opacity-90">
                Track your academic journey and celebrate achievements
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
              📈
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Overall Stats */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6"
        variants={containerVariants}
      >
        <motion.div
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 lg:p-6 text-white shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              🎯
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{overallStats.currentGrade}</p>
            <p className="text-sm opacity-90">Current Grade</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 lg:p-6 text-white shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📊
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{overallStats.gpa}</p>
            <p className="text-sm opacity-90">GPA</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 lg:p-6 text-white shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">#{overallStats.rank}</p>
            <p className="text-sm opacity-90">Class Rank</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 lg:p-6 text-white shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👥
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{overallStats.totalStudents}</p>
            <p className="text-sm opacity-90">Total Students</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-4 lg:p-6 text-white shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              📈
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{overallStats.improvement}</p>
            <p className="text-sm opacity-90">Improvement</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 lg:p-6 text-white shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{overallStats.streak}</p>
            <p className="text-sm opacity-90">Day Streak</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Subject Progress */}
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
        variants={itemVariants}
      >
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            📚
          </motion.div>
          Subject Performance
        </h2>
        
        <div className="space-y-6">
          {subjectProgress.map((subject, index) => (
            <motion.div
              key={subject.name}
              className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <motion.div 
                    className={`p-3 rounded-xl bg-gradient-to-r ${subject.color} text-white shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-2xl">{subject.icon}</span>
                  </motion.div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                      {subject.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {subject.current}%
                      </span>
                      <motion.div 
                        className={`flex items-center gap-1 ${
                          subject.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}
                        animate={{ y: subject.trend === 'up' ? [-2, 2, -2] : [2, -2, 2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <TrendingUp className={`w-4 h-4 ${subject.trend === 'down' ? 'rotate-180' : ''}`} />
                        <span className="text-sm font-medium">
                          {subject.trend === 'up' ? '+' : ''}{subject.current - subject.previous}%
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <motion.div 
                    className={`text-3xl font-bold ${
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
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mb-4">
                <motion.div 
                  className={`h-4 rounded-full bg-gradient-to-r ${subject.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.current}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              
              {/* Strengths and Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Strengths</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.strengths.map((strength, idx) => (
                      <motion.span 
                        key={idx}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.1 }}
                      >
                        {strength}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Areas to Improve</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.improvements.map((improvement, idx) => (
                      <motion.span 
                        key={idx}
                        className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.1 }}
                      >
                        {improvement}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Progress Chart & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Monthly Progress Chart */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              📈
            </motion.div>
            Monthly Progress
          </h2>
          
          <div className="space-y-4">
            {monthlyProgress.map((month, index) => (
              <motion.div
                key={month.month}
                className="flex items-center gap-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {month.month}
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-6 relative">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-6 rounded-full flex items-center justify-end pr-3"
                    initial={{ width: 0 }}
                    animate={{ width: `${month.score}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  >
                    <span className="text-white text-sm font-bold">{month.score}%</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Radar */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              🎯
            </motion.div>
            Key Skills
          </h2>
          
          <div className="space-y-4">
            {skillsRadar.map((skill, index) => (
              <motion.div
                key={skill.skill}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.skill}
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {skill.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.score}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Progress;