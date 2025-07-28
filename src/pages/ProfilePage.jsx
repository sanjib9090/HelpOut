import React, { useState } from 'react';
import { Star, MapPin, Phone, Mail, Edit, LogOut } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Button } from '../components/ui/Button';

const ProfilePage = ({ navigateTo, theme, toggleTheme, isAuthenticated, logout }) => {
  const [activeTab, setActiveTab] = useState('posted');

  // Mock user data
  const user = {
    name: 'Sanjib Barad',
    email: 'sanjibbarad06@gmail.com',
    phone: '9090566290',
    location: 'BBSR',
    avatar: 'S',
    tagline: 'Helping out the community!',
    memberSince: 'July 22, 2025',
    ratings: {
      poster: 'N/A',
      provider: 4.8,
      totalReviews: 15
    }
  };

  const postedTasks = [
    { id: 1, title: 'Help move furniture to 3rd floor apartment', status: 'open', completedDate: 'Jul 22, 2025' },
    { id: 2, title: 'Pet sitting for weekend getaway', status: 'open', completedDate: 'Jul 21, 2025' },
    { id: 3, title: 'Deep clean apartment before move-out', status: 'open', completedDate: 'Jul 20, 2025' },
    { id: 4, title: 'Set up smart home devices', status: 'open', completedDate: 'Jul 19, 2025' },
    { id: 5, title: 'Grocery pickup and delivery', status: 'open', completedDate: 'Jul 18, 2025' }
  ];

  const completedTasks = [
    {
      id: 6,
      title: 'Computer repair and setup',
      status: 'completed',
      completedDate: 'Jul 20, 2025',
      rating: 5,
      review: 'Excellent work! Very professional and knowledgeable.'
    },
    {
      id: 7,
      title: 'Furniture assembly',
      status: 'completed',
      completedDate: 'Jul 18, 2025',
      rating: 4,
      review: 'Quick and efficient service.'
    },
    {
      id: 8,
      title: 'Garden maintenance',
      status: 'completed',
      completedDate: 'Jul 15, 2025',
      rating: 5,
      review: 'Great attention to detail!'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        navigateTo={navigateTo}
        currentPage="home"
        isAuthenticated={isAuthenticated}
        theme={theme}
        toggleTheme={toggleTheme}
        logout={logout}
      />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-24 sm:pb-8 scroll-pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-3xl">{user.avatar}</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={() => navigateTo('edit-profile')}
                  >
                    <Edit size={16} />
                    Edit Profile
                  </Button>
                  <Button
                    className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    onClick={logout}
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="text-center md:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{user.tagline}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Mail size={16} />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Phone size={16} />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <MapPin size={16} />
                      <span>{user.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Member since {user.memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ratings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">📋</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">As Poster</h3>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span className="font-semibold text-gray-900 dark:text-white">{user.ratings.poster}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 dark:text-emerald-300 font-semibold">👤</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">As Service Provider</h3>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span className="font-semibold text-gray-900 dark:text-white">{user.ratings.provider}</span>
                    <span className="text-gray-500 dark:text-gray-400">({user.ratings.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task History */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="inline-flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <button
                  onClick={() => setActiveTab('posted')}
                  className={`px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    activeTab === 'posted' ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300' : ''
                  }`}
                  aria-selected={activeTab === 'posted'}
                >
                  Posted Tasks
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    activeTab === 'completed' ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300' : ''
                  }`}
                  aria-selected={activeTab === 'completed'}
                >
                  Completed Tasks
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {activeTab === 'posted' ? 'Tasks you\'ve posted' : 'Tasks you\'ve completed'}
              </h3>

              {activeTab === 'posted' ? (
                <div className="space-y-3">
                  {postedTasks.map(task => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      onClick={() => navigateTo('task', { taskId: task.id })}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Posted on {task.completedDate}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 text-xs rounded-full">
                          {task.status}
                        </span>
                        <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors" aria-label="View task details">
                          →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {completedTasks.map(task => (
                    <div
                      key={task.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                      onClick={() => navigateTo('task', { taskId: task.id })}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < task.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'} 
                              fill="currentColor" 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Completed on {task.completedDate}</p>
                      {task.review && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{task.review}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav navigateTo={navigateTo} currentPage="profile" theme={theme} />
    </div>
  );
};

export default ProfilePage;