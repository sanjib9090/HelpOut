import React from 'react';
import { Home, Plus, MessageCircle, User } from 'lucide-react';

const BottomNav = ({ navigateTo, currentPage }) => {
  return (
    <nav className="bottom-nav">
      <button
        onClick={() => navigateTo('home')}
        className={`bottom-nav-item ${currentPage === 'home' ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>Home</span>
      </button>
      <button
        onClick={() => navigateTo('post-task')}
        className={`bottom-nav-item ${currentPage === 'post-task' ? 'active' : ''}`}
      >
        <Plus size={20} />
        <span>Post</span>
      </button>
      <button
        onClick={() => navigateTo('chat', { chatId: 'all' })}
        className={`bottom-nav-item ${currentPage === 'chat' ? 'active' : ''}`}
      >
        <MessageCircle size={20} />
        <span>Messages</span>
      </button>
      <button
        onClick={() => navigateTo('profile')}
        className={`bottom-nav-item ${currentPage === 'profile' ? 'active' : ''}`}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;