import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, Filter, Star, Clock,
  Download, Eye, Heart, Bookmark, Play,
  ChevronRight, Award, Target, Users
} from 'lucide-react';

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const categories = [
    { id: 'all', name: 'All Books', emoji: '📚', count: 45 },
    { id: 'fiction', name: 'Fiction', emoji: '📖', count: 18 },
    { id: 'science', name: 'Science', emoji: '🔬', count: 12 },
    { id: 'history', name: 'History', emoji: '🏛️', count: 8 },
    { id: 'biography', name: 'Biography', emoji: '👤', count: 7 }
  ];

  const books = [
    {
      id: 1,
      title: 'The Magic School Bus: Solar System',
      author: 'Joanna Cole',
      category: 'science',
      rating: 4.8,
      pages: 32,
      readTime: '15 min',
      difficulty: 'Easy',
      cover: '🚌',
      description: 'Join Ms. Frizzle and her class on an amazing journey through space!',
      status: 'available',
      progress: 0,
      color: 'from-blue-500 to-cyan-500',
      tags: ['Space', 'Adventure', 'Educational']
    },
    {
      id: 2,
      title: 'Charlotte\'s Web',
      author: 'E.B. White',
      category: 'fiction',
      rating: 4.9,
      pages: 184,
      readTime: '3 hours',
      difficulty: 'Medium',
      cover: '🕷️',
      description: 'The story of a pig named Wilbur and his friendship with a spider.',
      status: 'reading',
      progress: 65,
      color: 'from-green-500 to-emerald-500',
      tags: ['Friendship', 'Animals', 'Classic']
    },
    {
      id: 3,
      title: 'National Geographic Kids: Ancient Egypt',
      author: 'National Geographic',
      category: 'history',
      rating: 4.7,
      pages: 64,
      readTime: '45 min',
      difficulty: 'Medium',
      cover: '🏺',
      description: 'Discover the mysteries and wonders of ancient Egyptian civilization.',
      status: 'completed',
      progress: 100,
      color: 'from-orange-500 to-red-500',
      tags: ['History', 'Culture', 'Ancient']
    },
    {
      id: 4,
      title: 'The Wild Robot',
      author: 'Peter Brown',
      category: 'fiction',
      rating: 4.8,
      pages: 279,
      readTime: '4 hours',
      difficulty: 'Medium',
      cover: '🤖',
      description: 'A robot learns to survive and adapt on a remote island.',
      status: 'available',
      progress: 0,
      color: 'from-purple-500 to-pink-500',
      tags: ['Adventure', 'Nature', 'Technology']
    },
    {
      id: 5,
      title: 'Who Was Albert Einstein?',
      author: 'Jess Brallier',
      category: 'biography',
      rating: 4.6,
      pages: 112,
      readTime: '2 hours',
      difficulty: 'Medium',
      cover: '🧠',
      description: 'Learn about the life of the famous scientist Albert Einstein.',
      status: 'available',
      progress: 0,
      color: 'from-indigo-500 to-blue-500',
      tags: ['Science', 'Biography', 'Genius']
    },
    {
      id: 6,
      title: 'Dog Man: Mothering Heights',
      author: 'Dav Pilkey',
      category: 'fiction',
      rating: 4.9,
      pages: 256,
      readTime: '2 hours',
      difficulty: 'Easy',
      cover: '🐕',
      description: 'The latest adventure of Dog Man and his friends!',
      status: 'reading',
      progress: 30,
      color: 'from-yellow-500 to-orange-500',
      tags: ['Comedy', 'Adventure', 'Superhero']
    }
  ];

  const readingStats = {
    booksRead: 23,
    totalPages: 2847,
    readingStreak: 12,
    favoriteGenre: 'Fiction',
    averageRating: 4.7,
    timeSpent: '45 hours'
  };

  const achievements = [
    { title: 'Bookworm', description: 'Read 20 books', icon: '🐛', unlocked: true },
    { title: 'Speed Reader', description: 'Read 5 books in a week', icon: '⚡', unlocked: true },
    { title: 'Genre Explorer', description: 'Read books from 5 different genres', icon: '🗺️', unlocked: false },
    { title: 'Page Turner', description: 'Read 3000 pages', icon: '📄', unlocked: false }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'reading': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                Digital Library 📚
              </motion.h1>
              <p className="text-lg lg:text-xl opacity-90">
                Explore amazing books and expand your knowledge
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
              📖
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Reading Stats */}
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
              📚
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{readingStats.booksRead}</p>
            <p className="text-sm opacity-90">Books Read</p>
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
              📄
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{readingStats.totalPages}</p>
            <p className="text-sm opacity-90">Pages Read</p>
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
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{readingStats.readingStreak}</p>
            <p className="text-sm opacity-90">Day Streak</p>
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
              ⭐
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{readingStats.averageRating}</p>
            <p className="text-sm opacity-90">Avg Rating</p>
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
              ⏰
            </motion.div>
            <p className="text-2xl lg:text-3xl font-bold">{readingStats.timeSpent}</p>
            <p className="text-sm opacity-90">Time Spent</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-4 lg:p-6 text-white shadow-xl"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-3xl lg:text-4xl mb-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎭
            </motion.div>
            <p className="text-lg lg:text-xl font-bold">{readingStats.favoriteGenre}</p>
            <p className="text-sm opacity-90">Favorite Genre</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Search and Categories */}
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-100 dark:border-gray-700"
        variants={itemVariants}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{category.emoji}</span>
              <span>{category.name}</span>
              <span className="text-sm opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Books Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedBook(book)}
            >
              {/* Book Cover */}
              <motion.div 
                className={`w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${book.color} flex items-center justify-center text-white shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-3xl lg:text-4xl">{book.cover}</span>
              </motion.div>

              {/* Book Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{book.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">{book.description}</p>
              </div>

              {/* Book Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{book.rating}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
                    {book.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{book.pages} pages</span>
                  <span>{book.readTime}</span>
                  <span className={`font-medium ${getDifficultyColor(book.difficulty)}`}>
                    {book.difficulty}
                  </span>
                </div>

                {/* Progress Bar */}
                {book.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium">{book.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full bg-gradient-to-r ${book.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${book.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {book.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <motion.button 
                  className={`flex-1 bg-gradient-to-r ${book.color} text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {book.status === 'available' ? (
                    <>
                      <Play className="w-4 h-4" />
                      Start Reading
                    </>
                  ) : book.status === 'reading' ? (
                    <>
                      <BookOpen className="w-4 h-4" />
                      Continue
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Review
                    </>
                  )}
                </motion.button>
                <motion.button 
                  className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Reading Achievements */}
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
          Reading Achievements
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className={`p-4 lg:p-6 rounded-xl text-center transition-all duration-300 ${
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

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBook(null)}
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
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedBook.color} text-white`}>
                    <span className="text-4xl">{selectedBook.cover}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedBook.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      by {selectedBook.author}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedBook.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Rating</h4>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-xl font-bold">{selectedBook.rating}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pages</h4>
                    <p className="text-xl font-bold text-gray-600 dark:text-gray-400">{selectedBook.pages}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Reading Time</h4>
                    <p className="text-xl font-bold text-gray-600 dark:text-gray-400">{selectedBook.readTime}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Difficulty</h4>
                    <p className={`text-xl font-bold ${getDifficultyColor(selectedBook.difficulty)}`}>
                      {selectedBook.difficulty}
                    </p>
                  </div>
                </div>

                {selectedBook.progress > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Reading Progress</h4>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-600 dark:text-blue-400">Progress</span>
                      <span className="text-2xl font-bold text-blue-600">{selectedBook.progress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${selectedBook.color}`}
                        style={{ width: `${selectedBook.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBook.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <motion.button 
                    className={`flex-1 bg-gradient-to-r ${selectedBook.color} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-5 h-5" />
                    {selectedBook.status === 'available' ? 'Start Reading' : 
                     selectedBook.status === 'reading' ? 'Continue Reading' : 'Read Again'}
                  </motion.button>
                  <motion.button 
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Bookmark className="w-5 h-5" />
                    Add to Favorites
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

export default Library;