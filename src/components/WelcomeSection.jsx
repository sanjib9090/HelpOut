import React, { useState } from "react";
import { Clipboard, User } from "lucide-react";

const WelcomeSection = ({ navigateTo, theme }) => {
  const [userRole, setUserRole] = useState("provider");

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 pt-4">
        <div>
          <h1 className={`text-4xl sm:text-3xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"} mb-6`}>
            Welcome back, Sanjib! 👋
          </h1>
          <p className={`text-sm sm:text-base ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            {userRole === "poster"
              ? "Manage your posted tasks and find help from your community."
              : "Discover opportunities to help your neighbors and earn money."}
          </p>
        </div>

        <div className={`flex flex-row items-center gap-2 sm:gap-4 ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"} rounded-2xl p-2 shadow-lg border w-full sm:w-auto`}>
          <button
            onClick={() => setUserRole("poster")}
            className={`flex items-center justify-center gap-1 sm:gap-2 rounded-xl px-3 py-3 sm:px-4 sm:py-2 text-xs sm:text-base font-medium transition-all w-full sm:w-auto text-center ${
              userRole === "poster"
                ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md"
                : theme === "light"
                ? "text-gray-600 hover:text-gray-900"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <Clipboard size={16} className="sm:size-5" />
            Task Poster
          </button>

          <button
            onClick={() => setUserRole("provider")}
            className={`flex items-center justify-center gap-1 sm:gap-2 rounded-xl px-3 py-3 sm:px-4 sm:py-2 text-xs sm:text-base font-medium transition-all w-full sm:w-auto text-center ${
              userRole === "provider"
                ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md"
                : theme === "light"
                ? "text-gray-600 hover:text-gray-900"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <User size={16} className="sm:size-5" />
            Service Provider
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;