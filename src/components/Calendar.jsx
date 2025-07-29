import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight,
  Clock, MapPin, Users, Bell, Plus, Filter,
  BookOpen, TestTube, Palette, Music, Trophy
} from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Math Test - Fractions',
      type: 'test',
      subject: 'Mathematics',
      date: '2024-03-15',
      time: '10:00 AM',
      duration: '1 hour',
      location: 'Room 205',
      description: 'Test covering addition and subtraction of fractions',
      color: 'from-red-500 to-pink-500',
      icon: '📊',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Science Fair Project Due',
      type: 'assignment',
      subject: 'Science',
      date: '2024-03-18',
      time: '3:00 PM',
      duration: '30 minutes',
      location: 'Science Lab',
      description: 'Submit your completed science fair project',
      color: 'from-green-500 to-emerald-500',
      icon: '🔬',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Art Class - Watercolors',
      type: 'class',
      subject: 'Art',
      date: '2024-03-16',
      time: '2:00 PM',
      duration: '45 minutes',
      location: 'Art Room',
      description: 'Learn watercolor painting techniques',
      color: 'from-purple-500 to-pink-500',
      icon: '🎨',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Library Reading Session',
      type: 'activity',
      subject: 'English',
      date: '2024-03-19',
      time: '2:00 PM',
      duration: '1 hour',
      location: 'Library',
      description: 'Group reading and discussion session',
      color: 'from-blue-500 to-cyan-500',
      icon: '📚',
      priority: 'low'
    },
    {
      id: 5,
      title: 'Music Recital Practice',
      type: 'practice',
      subject: 'Music',
      date: '2024-03-17',
      time: '11:00 AM',
      duration: '30 minutes',
      location: 'Music Room',
      description: 'Practice for the upcoming spring recital',
      color: 'from-indigo-500 to-purple-500',
      icon: '🎵',
      priority: 'medium'
    },
    {
      id: 6,
      title: 'Parent-Teacher Conference',
      type: 'meeting',
      subject: 'General',
      date: '2024-03-20',
      time: '4:00 PM',
      duration: '20 minutes',
      location: 'Classroom 3B',
      description: 'Quarterly progress discussion',
      color: 'from-orange-500 to-red-500',
      icon: '👥',
      priority: 'high'
    },
    {
      id: 7,
      title: 'Field Trip - Natural History Museum',
      type: 'trip',
      subject: 'Science',
      date: '2024-03-22',
      time: '9:00 AM',
      duration: '4 hours',
      location: 'Museum',
      description: 'Educational trip to explore dinosaur exhibits',
      color: 'from-teal-500 to-green-500',
      icon: '🦕',
      priority: 'medium'
    }
  ];

  const eventTypes = [
    { id: 'all', name: 'All Events', color: 'bg-gray-500', count: events.length },
    { id: 'test', name: 'Tests', color: 'bg-red-500', count: events.filter(e => e.type === 'test').length },
    { id: 'assignment', name: 'Assignments', color: 'bg-green-500', count: events.filter(e => e.type === 'assignment').length },
    { id: 'class', name: 'Classes', color: 'bg-blue-500', count: events.filter(e => e.type === 'class').length },
    { id: 'activity', name: 'Activities', color: 'bg-purple-500', count: events.filter(e => e.type === 'activity').length }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
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

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
                School Calendar 📅
              </motion.h1>
              <p className="text-lg lg:text-xl opacity-90">
                Stay organized with your schedule and events
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
              🗓️
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Event Type Filters */}
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-100 dark:border-gray-700"
        variants={itemVariants}
      >
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <motion.button
              key={type.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${type.color} text-white shadow-lg hover:shadow-xl`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{type.name}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{type.count}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Calendar */}
        <motion.div 
          className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.h2 
              className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </motion.h2>
            
            <motion.button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              return (
                <motion.div
                  key={index}
                  className={`min-h-[80px] lg:min-h-[100px] p-2 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    !day 
                      ? 'border-transparent' 
                      : isToday(day)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : isSelected(day)
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => day && setSelectedDate(day)}
                  whileHover={day ? { scale: 1.02 } : {}}
                  whileTap={day ? { scale: 0.98 } : {}}
                >
                  {day && (
                    <>
                      <div className={`text-sm lg:text-base font-semibold mb-1 ${
                        isToday(day) ? 'text-blue-600' : 'text-gray-900 dark:text-white'
                      }`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event, eventIndex) => (
                          <motion.div
                            key={event.id}
                            className={`text-xs p-1 rounded bg-gradient-to-r ${event.color} text-white truncate`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: eventIndex * 0.1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                            }}
                          >
                            {event.title}
                          </motion.div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Events List */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
          variants={itemVariants}
        >
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              📋
            </motion.div>
            Events for {selectedDate.toLocaleDateString()}
          </h2>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {getEventsForDate(selectedDate).length === 0 ? (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">📅</div>
                <p className="text-gray-500 dark:text-gray-400">No events scheduled for this day</p>
              </motion.div>
            ) : (
              getEventsForDate(selectedDate).map((event, index) => (
                <motion.div
                  key={event.id}
                  className={`p-4 rounded-xl border-l-4 ${getPriorityColor(event.priority)} cursor-pointer hover:shadow-lg transition-all duration-300`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start gap-3">
                    <motion.div 
                      className={`p-2 rounded-lg bg-gradient-to-r ${event.color} text-white`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-lg">{event.icon}</span>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.time} ({event.duration})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{event.subject}</span>
                        </div>
                      </div>
                    </div>
                    <motion.div 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {event.priority.toUpperCase()}
                    </motion.div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
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
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedEvent.color} text-white`}>
                    <span className="text-3xl">{selectedEvent.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedEvent.subject}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedEvent.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Date
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedEvent.time}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedEvent.location}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Duration</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedEvent.duration}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <motion.button 
                    className={`flex-1 bg-gradient-to-r ${selectedEvent.color} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Bell className="w-5 h-5" />
                    Set Reminder
                  </motion.button>
                  <motion.button 
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="w-5 h-5" />
                    Add to Calendar
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

export default Calendar;