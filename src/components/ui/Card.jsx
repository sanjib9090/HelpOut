import React from "react";

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={`rounded-xl shadow-md transition-all ${className || ""} dark:bg-gray-800 dark:border-gray-700`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={`p-4 ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

export { Card, CardContent };