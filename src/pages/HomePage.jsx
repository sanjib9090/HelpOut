import React from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import WelcomeSection from "../components/WelcomeSection";
import SearchAndFilters from "../components/SearchAndFilters";
import TasksSection from "../components/TasksSection";

const HomePage = ({ navigateTo, isAuthenticated, theme, toggleTheme }) => {
  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gradient-to-br from-emerald-50 via-white to-blue-50" : "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"}`}>
      <Header
        navigateTo={navigateTo}
        currentPage="home"
        isAuthenticated={isAuthenticated}
        logout={() => navigateTo("landing")}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 pb-32">
        <WelcomeSection navigateTo={navigateTo} theme={theme} />
        <SearchAndFilters theme={theme} />
        <TasksSection navigateTo={navigateTo} theme={theme} />
      </main>
      <BottomNav navigateTo={navigateTo} currentPage="home" theme={theme} />
    </div>
  );
};

export default HomePage;