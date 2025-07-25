import React from "react";
import { Card, CardContent } from "./ui/Card";
import { CheckCircle } from "lucide-react";

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

const HowItWorksSection = ({ theme }) => {
  return (
    <section className={`py-20 ${theme === "light" ? "bg-gradient-to-br from-gray-50 to-emerald-50" : "bg-gradient-to-br from-gray-900 to-gray-800"}`}>
      <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl lg:text-4xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"} mb-4`}>
            How It Works
          </h2>
          <p className={`text-xl ${theme === "light" ? "text-gray-600" : "text-gray-300"} max-w-3xl mx-auto`}>
            Simple, secure, and efficient process for both task posters and service providers.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <div key={index} className="relative">
              <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
                <CardContent className="p-8 text-center">
                  <div className={`text-6xl font-bold ${theme === "light" ? "text-emerald-100" : "text-emerald-900"} mb-4`}>{step.step}</div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${theme === "light" ? "from-emerald-500 to-blue-500" : "from-emerald-600 to-blue-600"} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} mb-3`}>{step.title}</h3>
                  <p className={`leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>{step.description}</p>
                </CardContent>
              </Card>
              {index < howItWorks.length - 1 && (
                <div className={`hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 ${theme === "light" ? "bg-gradient-to-r from-emerald-300 to-blue-300" : "bg-gradient-to-r from-emerald-700 to-blue-700"} transform -translate-y-1/2`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;