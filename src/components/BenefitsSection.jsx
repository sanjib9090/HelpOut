import React from "react";
import { Card, CardContent } from "./ui/Card";
import { MapPin, Clock, Shield, Star } from "lucide-react";

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

const BenefitsSection = ({ theme }) => {
  return (
    <section className={`py-20 ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-7 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl lg:text-4xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"} mb-4`}>
            Why Choose HelpOut?
          </h2>
          <p className={`text-xl ${theme === "light" ? "text-gray-600" : "text-gray-300"} max-w-3xl mx-auto`}>
            Built for the modern neighborhood, designed for trust and efficiency.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className={`text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${theme === "light" ? "bg-gradient-to-r from-emerald-100 to-blue-100" : "bg-gradient-to-r from-emerald-900 to-blue-900"} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`w-8 h-8 ${theme === "light" ? "text-emerald-600" : "text-emerald-400"}`} />
                </div>
                <h3 className={`text-xl font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} mb-3`}>{benefit.title}</h3>
                <p className={`leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;