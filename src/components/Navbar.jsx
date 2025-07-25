import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "./ui/Button";
import { HandHeart, Home, MessageCircle, User } from "lucide-react";

const Navbar = ({ navigateTo }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <HandHeart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              HelpOut
            </span>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigateTo("home")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-primary-600"
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              <button
                onClick={() => navigateTo("chat", { chatId: "all" })}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-primary-600"
              >
                <MessageCircle size={20} />
                <span>Messages</span>
              </button>
              <button
                onClick={() => navigateTo("profile")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-primary-600"
              >
                <User size={20} />
                <span>Profile</span>
              </button>
              <Button
                variant="outline"
                size="responsive"
                onClick={() => {
                  logout();
                  navigateTo("landing");
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="responsive"
                onClick={() => navigateTo("auth")}
              >
                Sign In
              </Button>
              <Button size="responsive" onClick={() => navigateTo("auth")}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;