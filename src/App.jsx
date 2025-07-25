import React, { useState } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    // Simulate login when navigating from auth page to home
    if (page === 'home' && currentPage === 'auth') {
      setIsLoggedIn(true);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage navigateTo={navigateTo} />;
      case 'auth':
        return <AuthPage navigateTo={navigateTo} />;
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'post-task':
        return <PostTaskPage navigateTo={navigateTo} />;
      case 'task':
        return <TaskDetails navigateTo={navigateTo} taskId={pageParams.taskId} />;
      case 'chat':
        return <ChatPage navigateTo={navigateTo} chatId={pageParams.chatId} />;
      case 'profile':
        return <ProfilePage navigateTo={navigateTo} />;
      default:
        return <LandingPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
};

export default App;