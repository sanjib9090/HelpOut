import React from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import Header from "../components/Header";
import {
  ArrowRight,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  Users,
  Zap,
  Shield,
  HandHeart
} from "lucide-react";

const benefits = [
  {
    icon: MapPin,
    title: "Hyperlocal Tasks",
    description: "Find help in your immediate neighborhood for quick and convenient service.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Get tasks done fast with our network of local service providers.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "OTP-verified completion ensures secure and trustworthy transactions.",
  },
  {
    icon: Star,
    title: "Rated Community",
    description: "Both task posters and providers are rated for quality assurance.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Post Your Task",
    description: "Describe what you need done, set your budget and deadline.",
  },
  {
    step: "02",
    title: "Get Applications",
    description: "Local service providers apply to complete your task.",
  },
  {
    step: "03",
    title: "Choose & Chat",
    description: "Select the best applicant and coordinate through our chat.",
  },
  {
    step: "04",
    title: "Complete & Rate",
    description: "Verify completion with OTP and rate each other.",
  },
];

const LandingPage = ({ navigateTo }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header navigateTo={navigateTo} currentPage="landing" isLoggedIn={false} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 lg:py-22">
        <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-16 lg:mb-0">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Hyperlocal Micro-Tasks
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Get Things Done
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}Locally
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with your neighbors to post micro-tasks or earn money by helping others. 
                From quick deliveries to tech support - HelpOut makes local help accessible.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg w-full sm:w-auto"
                  onClick={() => navigateTo('auth')}
                >
                  Start Helping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-semibold px-8 py-4 text-lg border-2 w-full sm:w-auto"
                  onClick={() => navigateTo('auth')}
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="animate-float shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Local Tasks</h3>
                      <p className="text-sm text-gray-600">Find help in your neighborhood</p>
                    </CardContent>
                  </Card>

                  <Card className="animate-float shadow-xl border-0 bg-white/80 backdrop-blur-sm mt-8">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Dual Roles</h3>
                      <p className="text-sm text-gray-600">Post tasks or provide services</p>
                    </CardContent>
                  </Card>

                  <Card className="animate-float shadow-xl border-0 bg-white/80 backdrop-blur-sm -mt-4">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
                      <p className="text-sm text-gray-600">OTP verification system</p>
                    </CardContent>
                  </Card>

                  <Card className="animate-float shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">Rated</h3>
                      <p className="text-sm text-gray-600">Community-driven ratings</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HelpOut?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for the modern neighborhood, designed for trust and efficiency.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, secure, and efficient process for both task posters and service providers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl font-bold text-emerald-100 mb-4">{step.step}</div>
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-300 to-blue-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Join our community to post tasks or help your neighbors today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-50 font-semibold px-8 py-4 text-lg w-full sm:w-auto"
              onClick={() => navigateTo('auth')}
            >
              Post a Task
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 font-semibold px-8 py-4 text-lg w-full sm:w-auto"
              onClick={() => navigateTo('auth')}
            >
              Start Helping
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
                    onClick={() => navigateTo('auth')}
                    className="hover:text-white transition-colors"
                  >
                    Get Started
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('terms')}
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo('privacy')}
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
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} HelpOut. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;