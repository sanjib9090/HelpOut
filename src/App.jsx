import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import PostTaskPage from "./pages/PostTaskPage";
import TaskDetails from "./pages/TaskDetails";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

const ProtectedRoute = ({ children, isAuthenticated, navigateTo }) => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [pageParams, setPageParams] = useState({});

  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
  };

  if (!isAuthenticated && currentPage !== "landing" && currentPage !== "auth") {
    return <AuthPage navigateTo={navigateTo} />;
  }

  return children;
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [pageParams, setPageParams] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
  };

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigateTo("landing");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage navigateTo={navigateTo} isAuthenticated={isAuthenticated} theme={theme} toggleTheme={toggleTheme} />;
      case "auth":
        return <AuthPage navigateTo={navigateTo} login={login} />;
      case "home":
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} navigateTo={navigateTo}>
            <HomePage navigateTo={navigateTo} isAuthenticated={isAuthenticated} theme={theme} toggleTheme={toggleTheme} />
          </ProtectedRoute>
        );
      case "post-task":
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} navigateTo={navigateTo}>
            <PostTaskPage navigateTo={navigateTo} theme={theme} toggleTheme={toggleTheme} />
          </ProtectedRoute>
        );
      case "task":
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} navigateTo={navigateTo}>
            <TaskDetails navigateTo={navigateTo} taskId={pageParams.taskId} theme={theme} toggleTheme={toggleTheme} />
          </ProtectedRoute>
        );
      case "chat":
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} navigateTo={navigateTo}>
            <ChatPage navigateTo={navigateTo} chatId={pageParams.chatId} theme={theme} toggleTheme={toggleTheme} />
          </ProtectedRoute>
        );
      case "profile":
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} navigateTo={navigateTo}>
            <ProfilePage navigateTo={navigateTo} theme={theme} toggleTheme={toggleTheme} />
          </ProtectedRoute>
        );
      default:
        return <LandingPage navigateTo={navigateTo} isAuthenticated={isAuthenticated} theme={theme} toggleTheme={toggleTheme} />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      {renderPage()}
    </div>
  );
};

export default App;