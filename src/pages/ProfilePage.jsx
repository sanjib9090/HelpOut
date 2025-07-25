import React, { useState } from 'react';
import { Star, MapPin, Phone, Mail, Edit } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const ProfilePage = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('posted');

  // Mock user data
  const user = {
    name: 'Sanjib Barad',
    email: 'sanjibbarad06@gmail.com',
    phone: '9090566290',
    location: 'bbsr',
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
    {
      id: 1,
      title: 'Help move furniture to 3rd floor apartment',
      status: 'open',
      completedDate: 'Jul 22, 2025'
    },
    {
      id: 2,
      title: 'Pet sitting for weekend getaway',
      status: 'open',
      completedDate: 'Jul 22, 2025'
    },
    {
      id: 3,
      title: 'Deep clean apartment before move-out',
      status: 'open',
      completedDate: 'Jul 22, 2025'
    },
    {
      id: 4,
      title: 'Set up smart home devices',
      status: 'open',
      completedDate: 'Jul 22, 2025'
    },
    {
      id: 5,
      title: 'Grocery pickup and delivery',
      status: 'open',
      completedDate: 'Jul 22, 2025'
    }
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
    <div className="min-h-screen bg-gray-50">
      <Header navigateTo={navigateTo} currentPage="profile" />
      
      <main className="container py-6 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="card p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-3xl">{user.avatar}</span>
                </div>
                <button className="btn btn-outline btn-sm">
                  <Edit size={16} />
                  Edit Profile
                </button>
              </div>
              
              <div className="flex-1">
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  <p className="text-gray-600 mb-4">{user.tagline}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
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
                  
                  <p className="text-sm text-gray-500">
                    Member since {user.memberSince}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ratings</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">📋</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">As Poster</h3>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span className="font-semibold">{user.ratings.poster}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">👤</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">As Service Provider</h3>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span className="font-semibold">{user.ratings.provider}</span>
                    <span className="text-gray-500">({user.ratings.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task History */}
          <div className="card p-6">
            <div className="flex justify-center mb-6">
              <div className="role-toggle">
                <button
                  onClick={() => setActiveTab('posted')}
                  className={`role-toggle-btn ${activeTab === 'posted' ? 'active' : ''}`}
                >
                  Posted Tasks
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`role-toggle-btn ${activeTab === 'completed' ? 'active' : ''}`}
                >
                  Completed Tasks
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                {activeTab === 'posted' ? 'Tasks you\'ve posted' : 'Tasks you\'ve completed'}
              </h3>

              {activeTab === 'posted' ? (
                <div className="space-y-3">
                  {postedTasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">Completed on {task.completedDate}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full">
                          {task.status}
                        </span>
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">
                          →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {completedTasks.map(task => (
                    <div key={task.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < task.rating ? 'text-yellow-400' : 'text-gray-300'} 
                              fill="currentColor" 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Completed on {task.completedDate}</p>
                      {task.review && (
                        <p className="text-sm text-gray-700 italic">"{task.review}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav navigateTo={navigateTo} currentPage="profile" />
    </div>
  );
};

export default ProfilePage;