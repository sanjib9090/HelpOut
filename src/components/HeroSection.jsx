import React from "react";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { ArrowRight, MapPin, Users, Shield, Star, Zap } from "lucide-react";

const HeroSection = ({ navigateTo, theme }) => {
  return (
    <section className="relative overflow-hidden py-14 lg:py-22">
      <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-16 lg:mb-0">
            <div className={`inline-flex items-center gap-2 ${theme === "light" ? "bg-emerald-100 text-emerald-800" : "bg-emerald-900 text-emerald-200"} px-4 py-2 rounded-full text-sm font-medium mb-6`}>
              <Zap className="w-4 h-4" />
              Hyperlocal Micro-Tasks
            </div>

            <h1 className={`text-4xl lg:text-6xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"} leading-tight mb-6`}>
              Get Things Done
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Locally
              </span>
            </h1>

            <p className={`text-xl ${theme === "light" ? "text-gray-600" : "text-gray-300"} mb-8 leading-relaxed`}>
              Connect with your neighbors to post micro-tasks or earn money by helping others. 
              From quick deliveries to tech support - HelpOut makes local help accessible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`${
                  theme === "light"
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                    : "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                } text-white font-semibold px-8 py-4 text-lg w-full sm:w-auto`}
                onClick={() => navigateTo("auth")}
              >
                Start Helping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`font-semibold px-8 py-4 text-lg border-2 w-full sm:w-auto ${theme === "light" ? "border-gray-300 text-gray-700" : "border-gray-600 text-gray-300"}`}
                onClick={() => navigateTo("auth")}
              >
                Learn More
              </Button>
            </div>

            <div className={`flex items-center gap-8 mt-12 pt-8 ${theme === "light" ? "border-t border-gray-200" : "border-t border-gray-700"}`}>
              <div className="text-center">
                <div className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>10K+</div>
                <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>5K+</div>
                <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Active Users</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>4.9★</div>
                <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Average Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <Card className={`animate-float shadow-xl border-0 ${theme === "light" ? "bg-white/80" : "bg-gray-800/80"} backdrop-blur-sm`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${theme === "light" ? "bg-emerald-100" : "bg-emerald-900"} rounded-xl flex items-center justify-center mb-4`}>
                      <MapPin className={`w-6 h-6 ${theme === "light" ? "text-emerald-600" : "text-emerald-400"}`} />
                    </div>
                    <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} mb-2`}>Local Tasks</h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Find help in your neighborhood</p>
                  </CardContent>
                </Card>

                <Card className={`animate-float shadow-xl border-0 ${theme === "light" ? "bg-white/80" : "bg-gray-800/80"} backdrop-blur-sm mt-8`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${theme === "light" ? "bg-blue-100" : "bg-blue-900"} rounded-xl flex items-center justify-center mb-4`}>
                      <Users className={`w-6 h-6 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`} />
                    </div>
                    <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} mb-2`}>Dual Roles</h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Post tasks or provide services</p>
                  </CardContent>
                </Card>

                <Card className={`animate-float shadow-xl border-0 ${theme === "light" ? "bg-white/80" : "bg-gray-800/80"} backdrop-blur-sm -mt-4`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${theme === "light" ? "bg-purple-100" : "bg-purple-900"} rounded-xl flex items-center justify-center mb-4`}>
                      <Shield className={`w-6 h-6 ${theme === "light" ? "text-purple-600" : "text-purple-400"}`} />
                    </div>
                    <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} mb-2`}>Secure</h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>OTP verification system</p>
                  </CardContent>
                </Card>

                <Card className={`animate-float shadow-xl border-0 ${theme === "light" ? "bg-white/80" : "bg-gray-800/80"} backdrop-blur-sm`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${theme === "light" ? "bg-yellow-100" : "bg-yellow-900"} rounded-xl flex items-center justify-center mb-4`}>
                      <Star className={`w-6 h-6 ${theme === "light" ? "text-yellow-600" : "text-yellow-400"}`} />
                    </div>
                    <h3 className={`font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} mb-2`}>Rated</h3>
                    <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>Community-driven ratings</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className={`absolute inset-0 ${theme === "light" ? "bg-gradient-to-r from-emerald-400/20 to-blue-400/20" : "bg-gradient-to-r from-emerald-800/20 to-blue-800/20"} rounded-3xl transform rotate-3 scale-105 -z-10`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;