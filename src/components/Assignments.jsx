import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Clock, CheckCircle, AlertCircle, 
  Calendar, Star, Upload, Download, Eye,
  Filter, Search, Plus, BookOpen
} from 'lucide-react';

const Assignments = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = [
    {
      id: 1,
      title: 'Math: Fraction Problems',
      subject: 'Mathematics',
      dueDate: '2024-03-15',
      status: 'pending',
      priority: 'high',
      description: 'Complete exercises 1-20 on fraction addition and subtraction',
      points: 25,
      submittedDate: null,
      grade: null,
      feedback: null,
      attachments: ['worksheet.pdf'],
      estimatedTime: '45 minutes',
      icon: '🔢',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Science: Solar System Report',
      subject: 'Science',
      dueDate: '2024-03-18',
      status: 'in-progress',
      priority: 'medium',
      description: 'Research and write a 2-page report about your favorite planet',
      points: 40,
      submittedDate: null,
      grade: null,
      feedback: null,
      attachments: ['research_template.docx'],
      estimatedTime: '2 hours',
      icon: '🪐',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      title: 'English: Creative Story',
      subject: 'English',
      dueDate: '2024-03-12',
      status: 'submitted',
      priority: 'medium',
      description: 'Write a creative story with at least 500 words',
      points: 30,
      submittedDate: '2024-03-10',
      grade: 'A-',
      feedback: 'Great creativity! Work on paragraph structure.',
      attachments: ['my_story.docx'],
      estimatedTime: '1.5 hours',
      icon: '📝',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'History: Ancient Egypt Timeline',
      subject: 'Social Studies',
      dueDate: '2024-03-20',
      status: 'not-started',
      priority: 'low',
      description: 'Create a timeline of major events in Ancient Egypt',
      points: 35,
      submittedDate: null,
      grade: null,
      feedback: null,
      attachments: ['timeline_template.pdf'],
      estimatedTime: '1 hour',
      icon: '🏛️',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'Art: Self Portrait',
      subject: 'Art',
      dueDate: '2024-03-14',
      status: 'submitted',
      priority: 'low',
      description: 'Draw a self-portrait using any medium of your choice',
      points: 20,
      submittedDate: '2024-03-13',
      grade: 'A+',
      feedback: 'Excellent work! Very creative use of colors.',
      attachments: ['portrait.jpg'],
      estimatedTime: '1 hour',
      icon: '🎨',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'submitted': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'not-started': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-5 h-5" />;
      case 'in-progress': return <Clock className="w-5 h-5" />;
      case 'submitted': return <CheckCircle className="w-5 h-5" />;
      case 'not-started': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesFilter = filter === 'all' || assignment.status === filter;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    inProgress: assignments.filter(a => a.status === 'in-progress').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    avgGrade: 'A-'
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
                Assignments 📝
              </motion.h1>
              <p className="text-lg lg:text-xl opacity-90">
                Stay on top of your homework and projects
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
              📚
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              📊
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 lg:p-6 shadow-xl border border-red-200 dark:border-red-700"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⏰
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold text-red-600">{stats.pending}</p>
            <p className="text-sm text-red-600">Pending</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4 lg:p-6 shadow-xl border border-yellow-200 dark:border-yellow-700"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔄
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
            <p className="text-sm text-yellow-600">In Progress</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 lg:p-6 shadow-xl border border-green-200 dark:border-green-700"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✅
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold text-green-600">{stats.submitted}</p>
            <p className="text-sm text-green-600">Submitted</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 lg:p-6 shadow-xl border border-blue-200 dark:border-blue-700"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              🏆
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold text-blue-600">{stats.avgGrade}</p>
            <p className="text-sm text-blue-600">Avg Grade</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-100 dark:border-gray-700"
        variants={itemVariants}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'in-progress', 'submitted', 'not-started'].map((filterOption) => (
              <motion.button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  filter === filterOption
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace('-', ' ')}
              </motion.button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Assignments List */}
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredAssignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.01, y: -2 }}
              onClick={() => setSelectedAssignment(assignment)}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                {/* Assignment Icon */}
                <motion.div 
                  className={`p-4 rounded-2xl bg-gradient-to-r ${assignment.color} text-white shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-2xl">{assignment.icon}</span>
                </motion.div>

                {/* Assignment Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                      {assignment.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                        {assignment.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <Star className={`w-5 h-5 ${getPriorityColor(assignment.priority)}`} />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400">{assignment.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <BookOpen className="w-4 h-4" />
                      {assignment.subject}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {assignment.estimatedTime}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4" />
                      {assignment.points} points
                    </div>
                  </div>

                  {assignment.grade && (
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-green-600">Grade: {assignment.grade}</span>
                      {assignment.feedback && (
                        <span className="text-sm text-gray-600 dark:text-gray-400 italic">
                          "{assignment.feedback}"
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Status Icon */}
                <motion.div 
                  className={`p-3 rounded-full ${getStatusColor(assignment.status)}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {getStatusIcon(assignment.status)}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Assignment Detail Modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAssignment(null)}
          >
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedAssignment.color} text-white`}>
                    <span className="text-3xl">{selectedAssignment.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedAssignment.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedAssignment.subject}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAssignment(null)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedAssignment.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Due Date</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Points</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedAssignment.points}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAssignment.status)}`}>
                      {selectedAssignment.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Est. Time</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedAssignment.estimatedTime}</p>
                  </div>
                </div>

                {selectedAssignment.grade && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                    <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">Grade & Feedback</h4>
                    <p className="text-2xl font-bold text-green-600 mb-2">{selectedAssignment.grade}</p>
                    {selectedAssignment.feedback && (
                      <p className="text-green-700 dark:text-green-300 italic">"{selectedAssignment.feedback}"</p>
                    )}
                  </div>
                )}
                
                {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Attachments</h3>
                    <div className="space-y-2">
                      {selectedAssignment.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-xl">
                          <FileText className="w-5 h-5 text-gray-500" />
                          <span className="flex-1 text-gray-700 dark:text-gray-300">{attachment}</span>
                          <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4">
                  {selectedAssignment.status !== 'submitted' && (
                    <motion.button 
                      className={`flex-1 bg-gradient-to-r ${selectedAssignment.color} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Upload className="w-5 h-5" />
                      Submit Assignment
                    </motion.button>
                  )}
                  <motion.button 
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-5 h-5" />
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Assignments;