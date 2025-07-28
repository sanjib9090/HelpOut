import React from 'react';
import { Home, Plus, MessageCircle, User } from 'lucide-react';

const BottomNav = ({ navigateTo, currentPage, theme }) => {
  return (
    <nav className={`bottom-nav dark:bg-gray-900 dark:border-gray-700 sm:hidden`}>
      <button
        onClick={() => navigateTo('home')}
        className={`bottom-nav-item dark:text-gray-300 dark:hover:text-blue-400 ${currentPage === 'home' ? 'active dark:text-blue-400' : ''}`}
      >
        <Home size={20} />
        <span>Home</span>
      </button>
      <button
        onClick={() => navigateTo('post-task')}
        className={`bottom-nav-item dark:text-gray-300 dark:hover:text-blue-400 ${currentPage === 'post-task' ? 'active dark:text-blue-400' : ''}`}
      >
        <Plus size={20} />
        <span>Post</span>
      </button>
      <button
        onClick={() => navigateTo('chat', { chatId: 'all' })}
        className={`bottom-nav-item dark:text-gray-300 dark:hover:text-blue-400 ${currentPage === 'chat' ? 'active dark:text-blue-400' : ''}`}
      >
        <MessageCircle size={20} />
        <span>Messages</span>
      </button>
      <button
        onClick={() => navigateTo('profile')}
        className={`bottom-nav-item dark:text-gray-300 dark:hover:text-blue-400 ${currentPage === 'profile' ? 'active dark:text-blue-400' : ''}`}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;