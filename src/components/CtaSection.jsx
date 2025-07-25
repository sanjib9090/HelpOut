import React from "react";
import { Button } from "./ui/Button";

const CtaSection = ({ navigateTo, theme }) => {
  return (
    <section className={`py-20 ${theme === "light" ? "bg-gradient-to-r from-emerald-600 to-blue-600" : "bg-gradient-to-r from-emerald-700 to-blue-700"}`}>
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
            className={`${
              theme === "light" ? "bg-white text-emerald-600 hover:bg-gray-50" : "bg-gray-800 text-emerald-400 hover:bg-gray-700"
            } font-semibold px-8 py-4 text-lg w-full sm:w-auto`}
            onClick={() => navigateTo("auth")}
          >
            Post a Task
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={`${
              theme === "light" ? "border-white text-white hover:bg-white hover:text-emerald-600" : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-emerald-400"
            } font-semibold px-8 py-4 text-lg w-full sm:w-auto`}
            onClick={() => navigateTo("auth")}
          >
            Start Helping
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;