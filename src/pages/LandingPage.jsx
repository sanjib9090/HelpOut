import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";

const LandingPage = ({ navigateTo, isAuthenticated, theme, toggleTheme }) => {
  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gradient-to-br from-emerald-50 via-white to-blue-50" : "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800"}`}>
      <Header
        navigateTo={navigateTo}
        currentPage="landing"
        isAuthenticated={isAuthenticated}
        logout={() => navigateTo("landing")}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <HeroSection navigateTo={navigateTo} theme={theme} />
      <BenefitsSection theme={theme} />
      <HowItWorksSection theme={theme} />
      <CtaSection navigateTo={navigateTo} theme={theme} />
      <Footer navigateTo={navigateTo} theme={theme} />
    </div>
  );
};

export default LandingPage;