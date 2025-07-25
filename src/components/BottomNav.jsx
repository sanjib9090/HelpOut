import React from "react";
import { Home, Plus, MessageCircle, User } from "lucide-react";

const BottomNav = ({ navigateTo, currentPage, theme }) => {
  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${theme === "light" ? "bg-white border-t border-gray-200" : "bg-gray-900 border-t border-gray-700"} md:hidden z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => navigateTo("home")}
            className={`flex flex-col items-center gap-1 ${currentPage === "home" ? (theme === "light" ? "text-primary-600" : "text-primary-400") : (theme === "light" ? "text-gray-600" : "text-gray-300")} hover:text-primary-600 dark:hover:text-primary-400 transition-colors`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => navigateTo("post-task")}
            className={`flex flex-col items-center gap-1 ${currentPage === "post-task" ? (theme === "light" ? "text-primary-600" : "text-primary-400") : (theme === "light" ? "text-gray-600" : "text-gray-300")} hover:text-primary-600 dark:hover:text-primary-400 transition-colors`}
          >
            <Plus size={24} />
            <span className="text-xs">Post</span>
          </button>
          <button
            onClick={() => navigateTo("chat", { chatId: "all" })}
            className={`flex flex-col items-center gap-1 ${currentPage === "chat" ? (theme === "light" ? "text-primary-600" : "text-primary-400") : (theme === "light" ? "text-gray-600" : "text-gray-300")} hover:text-primary-600 dark:hover:text-primary-400 transition-colors`}
          >
            <MessageCircle size={24} />
            <span className="text-xs">Messages</span>
          </button>
          <button
            onClick={() => navigateTo("profile")}
            className={`flex flex-col items-center gap-1 ${currentPage === "profile" ? (theme === "light" ? "text-primary-600" : "text-primary-400") : (theme === "light" ? "text-gray-600" : "text-gray-300")} hover:text-primary-600 dark:hover:text-primary-400 transition-colors`}
          >
            <User size={24} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;