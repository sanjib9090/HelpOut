import React from "react";
import { HandHeart } from "lucide-react";

const Footer = ({ navigateTo, theme }) => {
  return (
    <footer className={`py-12 ${theme === "light" ? "bg-gray-900" : "bg-gray-800"} text-white`}>
      <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <HandHeart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">HelpOut</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting neighbors for micro-tasks and community help.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => navigateTo("auth")}
                  className="hover:text-white transition-colors"
                >
                  Get Started
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("terms")}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo("privacy")}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@helpout.app</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Community St, Portland, OR</li>
            </ul>
          </div>
        </div>
        <div className={`mt-8 pt-8 border-t ${theme === "light" ? "border-gray-800" : "border-gray-700"} text-center text-sm text-gray-400`}>
          © {new Date().getFullYear()} HelpOut. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;