import React from "react";
import { Button } from "./ui/Button";
import { HandHeart, Home, MessageCircle, User, Sun, Moon } from "lucide-react";

const Header = ({ showNav = true, navigateTo, currentPage, isAuthenticated = false, logout, theme, toggleTheme }) => {
  // Debug log to verify props (remove in production)
  console.log("Header props:", { currentPage, isAuthenticated, theme });

  const isLandingPage = currentPage === "landing";
  const navClass = isLandingPage
    ? "bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700"
    : "bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700";
  const containerClass = isLandingPage
    ? "max-w-7xl mx-auto px-7 sm:px-6 lg:px-8"
    : "container";
  const logoSizeClass = isLandingPage ? "w-10 h-10" : "w-8 h-8";
  const textSizeClass = isLandingPage
    ? "text-2xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
    : "text-xl text-gray-900 dark:text-white";

  return (
    <header className={`sticky top-0 z-50 ${navClass}`}>
      <div className={containerClass}>
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigateTo(isAuthenticated ? "home" : "landing")}
            className="flex items-center gap-3"
          >
            <div className={`${logoSizeClass} bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg`}>
              <HandHeart className="w-6 h-6 text-white" />
            </div>
            <span className={`font-bold ${textSizeClass}`}>
              HelpOut
            </span>
          </button>

          {showNav && (
            <nav className="flex items-center gap-4 md:gap-6">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigateTo("home")}
                    className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      currentPage === "home"
                        ? "bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400"
                        : "text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                    }`}
                  >
                    <Home size={20} />
                    <span>Home</span>
                  </button>
                  <button
                    onClick={() => navigateTo("chat", { chatId: "all" })}
                    className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      currentPage === "chat"
                        ? "bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400"
                        : "text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                    }`}
                  >
                    <MessageCircle size={20} />
                    <span>Messages</span>
                  </button>
                  <button
                    onClick={() => navigateTo("profile")}
                    className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      currentPage === "profile"
                        ? "bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400"
                        : "text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                    }`}
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </button>
                  <Button
                    variant="outline"
                    size="responsive"
                    onClick={logout}
                    className="dark:border-gray-600 dark:text-gray-300 dark:hover:text-white"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="responsive"
                    onClick={() => navigateTo("auth")}
                    className="dark:text-gray-300 dark:hover:text-white"
                  >
                    Sign In
                  </Button>
                  <Button
                    size="responsive"
                    onClick={() => navigateTo("auth")}
                    className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    Get Started
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="responsive"
                onClick={toggleTheme}
                className="dark:text-gray-300 dark:hover:text-white"
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;