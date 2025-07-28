import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import PostTaskPage from './pages/PostTaskPage';
import TaskDetails from './pages/TaskDetails';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [pageParams, setPageParams] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('light');

  // Global dark mode toggle
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    if (page === 'home' && currentPage === 'auth') {
      setIsAuthenticated(true);
    }
    
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
    setPageParams({});
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage navigateTo={navigateTo} isAuthenticated={isAuthenticated} theme={theme} toggleTheme={toggleTheme} logout={logout} />;
      case 'auth':
        return <AuthPage navigateTo={navigateTo} theme={theme} toggleTheme={toggleTheme} />;
      case 'home':
        return <HomePage navigateTo={navigateTo} isAuthenticated={isAuthenticated} theme={theme} toggleTheme={toggleTheme} logout={logout} />;
      case 'post-task':
        return <PostTaskPage navigateTo={navigateTo} theme={theme} toggleTheme={toggleTheme} logout={logout} />;
      case 'task':
        return <TaskDetails navigateTo={navigateTo} taskId={pageParams.taskId} theme={theme} toggleTheme={toggleTheme} logout={logout} />;
      case 'chat':
        return <ChatPage navigateTo={navigateTo} chatId={pageParams.chatId} theme={theme} toggleTheme={toggleTheme} logout={logout} />;
      case 'profile':
        return <ProfilePage navigateTo={navigateTo} isAuthenticated={isAuthenticated} theme={theme} toggleTheme={toggleTheme} logout={logout} />;
      default:
        return <LandingPage navigateTo={navigateTo} isAuthenticated={isAuthenticated} theme={theme} toggleTheme={toggleTheme} logout={logout} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
};

export default App;
