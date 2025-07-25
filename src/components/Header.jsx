import React from 'react';
import { Home, MessageCircle, User, HandHeart } from 'lucide-react';
import { Button } from './ui/Button';

const Header = ({ navigateTo, currentPage, isLoggedIn = false }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
              <HandHeart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">HelpOut</span>
          </button>

          {/* Conditional Navigation or Auth Buttons */}
          {currentPage === 'landing' && !isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="responsive"
                onClick={() => navigateTo('auth')}
              >
                Sign In
              </Button>
              <Button
                size="responsive"
                onClick={() => navigateTo('auth')}
              >
                Get Started
              </Button>
            </div>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigateTo('home')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'home'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              <button
                onClick={() => navigateTo('chat', { chatId: 'all' })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'chat'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <MessageCircle size={20} />
                <span>Messages</span>
              </button>
              <button
                onClick={() => navigateTo('profile')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'profile'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <User size={20} />
                <span>Profile</span>
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;