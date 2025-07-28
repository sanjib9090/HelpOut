import React, { useState } from 'react';
import { Search, Filter, Plus, Clipboard, User } from 'lucide-react';
import Header from "../components/Header";
import BottomNav from '../components/BottomNav';
import TaskCard from '../components/TaskCard';

const HomePage = ({ navigateTo, isAuthenticated, theme, toggleTheme, logout }) => {
  const [userRole, setUserRole] = useState('provider');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const tasks = [
    {
      id: 1,
      title: 'Help move furniture to new apartment',
      budget: 80,
      location: 'Downtown Portland, OR',
      deadline: '2024-12-31T13:30:00',
      category: 'moving',
      urgency: 'medium',
      negotiable: true,
      tags: ['Physical Work', 'Vehicle Required'],
      status: 'open'
    },
    {
      id: 2,
      title: "Dog walking while I'm at work",
      budget: 120,
      location: 'Sellwood, Portland, OR',
      deadline: '2024-12-31T13:30:00',
      category: 'pet care',
      urgency: 'high',
      tags: ['Pet Care', 'High Urgency'],
      status: 'open'
    },
    {
      id: 3,
      title: 'Fix leaky kitchen faucet',
      budget: 60,
      location: 'Hawthorne, Portland, OR',
      deadline: '2024-12-27T22:30:00',
      category: 'handyman',
      urgency: 'medium',
      negotiable: true,
      tags: ['Handyman', 'Tools Needed'],
      status: 'open'
    }
  ];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gradient-to-br from-emerald-50 via-white to-blue-50" : "bg-gray-900"}`}>
      <Header
        navigateTo={navigateTo}
        currentPage="home"
        isAuthenticated={isAuthenticated}
        theme={theme}
        toggleTheme={toggleTheme}
        logout={logout}
      />

      <main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 pb-32">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 pt-4">
            <div>
              <h1 className={`text-4xl sm:text-3xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"} mb-6`}>
                Welcome back, Sanjib! 👋
              </h1>
              <p className={`text-sm sm:text-base ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                {userRole === 'poster'
                  ? 'Manage your posted tasks and find help from your community.'
                  : 'Discover opportunities to help your neighbors and earn money.'}
              </p>
            </div>

            <div className={`flex flex-row items-center gap-2 sm:gap-4 ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"} rounded-2xl p-2 shadow-lg border dark:border-gray-700 w-full sm:w-auto`}>
              <button
                onClick={() => setUserRole('poster')}
                className={`flex items-center justify-center gap-1 sm:gap-2 rounded-xl px-3 py-3 sm:px-4 sm:py-2 text-xs sm:text-base font-medium transition-all w-full sm:w-auto text-center ${
                  userRole === 'poster'
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 text-white shadow-md'
                    : theme === 'light'
                      ? 'text-gray-600 hover:text-gray-900'
                      : 'text-gray-300 hover:text-white'
                }`}
              >
                <Clipboard size={16} className="sm:size-5" />
                Task Poster
              </button>

              <button
                onClick={() => setUserRole('provider')}
                className={`flex items-center justify-center gap-1 sm:gap-2 rounded-xl px-3 py-3 sm:px-4 sm:py-2 text-xs sm:text-base font-medium transition-all w-full sm:w-auto text-center ${
                  userRole === 'provider'
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 text-white shadow-md'
                    : theme === 'light'
                      ? 'text-gray-600 hover:text-gray-900'
                      : 'text-gray-300 hover:text-white'
                }`}
              >
                <User size={16} className="sm:size-5" />
                Service Provider
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 sm:mb-6">
            <div className="flex-1 relative w-full">
              <Search className={`absolute left-4 top-3 w-5 h-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-300'} mb-4 sm:mb-6`} />
              <input
                type="text"
                placeholder={userRole === 'poster' ? 'Search your tasks...' : 'Search available tasks...'}
                className={`w-full pl-12 pr-4 py-3 ${theme === 'light' ? 'bg-white border-gray-200 text-gray-800' : 'bg-gray-800 border-gray-700 text-white'} rounded-xl shadow-sm focus:outline-none focus:ring-2 dark:focus:ring-gray-800 focus:ring-blue-400`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 ${theme === 'light' ? 'text-gray-700 bg-white border-gray-200' : 'text-gray-300 bg-gray-800 border-gray-700'} font-medium px-4 py-3 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition w-full md:w-auto`}
              aria-expanded={showFilters}
              aria-label="Toggle filters"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className={`rounded-2xl shadow-md border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'} p-4 sm:p-6`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-1`}>Category</label>
                  <select className={`w-full py-2 px-3 ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-800' : 'bg-gray-700 border-gray-600 text-white'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-800`}>
                    <option>All Categories</option>
                    <option>Moving</option>
                    <option>Pet Care</option>
                    <option>Handyman</option>
                    <option>Cleaning</option>
                    <option>Delivery</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-1`}>Urgency</label>
                  <select className={`w-full py-2 px-3 ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-800' : 'bg-gray-700 border-gray-600 text-white'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-800`}>
                    <option>All Urgency</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-1`}>Price Range</label>
                  <select className={`w-full py-2 px-3 ${theme === 'light' ? 'bg-gray-50 border-gray-800 text-gray-800' : 'bg-gray-700 border-gray-600 text-white'} border rounded-xl focus:outline-none focus:ring-blue-400 dark:focus:ring-gray-800 focus:ring-2 `}>
                    <option>All Prices</option>
                    <option>$0 - $25</option>
                    <option>$25 - $50</option>
                    <option>$50 - $100</option>
                    <option>$100+</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-1`}>Location</label>
                  <input
                    type="text"
                    placeholder="Filter by location..."
                    className={`w-full py-2 px-3 ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-800' : 'bg-gray-700 border-gray-600 text-white'} border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-800`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          <h2 className="text-xl sm:text-2xl font-bold">
            {userRole === 'poster' ? 'Your Posted Tasks' : 'Available Tasks Near You'}
          </h2>
          {userRole === 'poster' && (
            <button
              onClick={() => navigateTo('post-task')}
              className={`hidden md:inline-flex items-center gap-2 ${theme === 'light' ? 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600' : 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700'} text-white font-medium rounded-xl px-4 py-2 shadow-lg transition-all w-full md:w-auto`}
            >
              <Plus size={20} />
              Post New Task
            </button>
          )}
        </div>

        <div className="space-y-6">
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} navigateTo={navigateTo} theme={theme} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className={`mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-300'}`}>
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className={`text-lg font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2`}>No tasks found</h3>
              <p className={`text-sm sm:text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-4`}>
                {userRole === 'poster'
                  ? "You haven't posted any tasks yet."
                  : 'No tasks match your search criteria.'}
              </p>
              {userRole === 'poster' && (
                <button
                  onClick={() => navigateTo('post-task')}
                  className={`inline-flex items-center gap-2 ${theme === 'light' ? 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600' : 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700'} text-white font-medium rounded-xl px-4 py-2 shadow-lg transition-all`}
                >
                  Post Your First Task
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {userRole === 'poster' && (
        <button
          onClick={() => navigateTo('post-task')}
          className={`fixed bottom-24 right-4 sm:right-6 md:hidden flex items-center justify-center w-14 h-14 rounded-full ${theme === 'light' ? 'bg-gradient-to-br from-emerald-500 to-blue-500' : 'bg-gradient-to-br from-emerald-600 to-blue-600'} text-white shadow-xl hover:scale-105 transition`}
          aria-label="Post New Task"
        >
          <Plus size={28} />
        </button>
      )}

      <BottomNav navigateTo={navigateTo} currentPage="home" theme={theme} />
    </div>
  );
};

export default HomePage;