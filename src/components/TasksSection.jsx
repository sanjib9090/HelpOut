import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import TaskCard from "./TaskCard";

const TasksSection = ({ navigateTo, theme }) => {
  const [userRole] = useState("provider");
  const [searchTerm] = useState("");

  const tasks = [
    {
      id: 1,
      title: "Help move furniture to new apartment",
      budget: 80,
      location: "Downtown Portland, OR",
      deadline: "2024-12-30T13:30:00",
      category: "moving",
      urgency: "medium",
      negotiable: true,
      tags: ["Physical Work", "Vehicle Required"],
      status: "open",
    },
    {
      id: 2,
      title: "Dog walking while I'm at work",
      budget: 120,
      location: "Sellwood, Portland, OR",
      deadline: "2024-12-30T13:30:00",
      category: "pet care",
      urgency: "high",
      negotiable: false,
      tags: ["Pet Care", "High Urgency"],
      status: "open",
    },
    {
      id: 3,
      title: "Fix leaky kitchen faucet",
      budget: 60,
      location: "Hawthorne, Portland, OR",
      deadline: "2024-12-27T22:30:00",
      category: "handyman",
      urgency: "medium",
      negotiable: true,
      tags: ["Handyman", "Tools Needed"],
      status: "open",
    },
  ];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
        <h2 className="text-xl sm:text-2xl font-bold">
          {userRole === "poster" ? "Your Posted Tasks" : "Available Tasks Near You"}
        </h2>
        {userRole === "poster" && (
          <button
            onClick={() => navigateTo("post-task")}
            className={`hidden md:inline-flex items-center gap-2 ${theme === "light" ? "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600" : "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"} text-white font-medium rounded-xl px-4 py-2 shadow transition-all w-full md:w-auto`}
          >
            <Plus size={20} />
            Post New Task
          </button>
        )}
      </div>

      <div className="space-y-6">
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} navigateTo={navigateTo} theme={theme} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className={`mb-4 ${theme === "light" ? "text-gray-400" : "text-gray-300"}`}>
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className={`text-lg font-medium ${theme === "light" ? "text-gray-900" : "text-white"} mb-2`}>No tasks found</h3>
            <p className={`text-sm sm:text-base ${theme === "light" ? "text-gray-600" : "text-gray-300"} mb-4`}>
              {userRole === "poster"
                ? "You haven't posted any tasks yet."
                : "No tasks match your search criteria."}
            </p>
            {userRole === "poster" && (
              <button
                onClick={() => navigateTo("post-task")}
                className={`inline-flex items-center gap-2 ${theme === "light" ? "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600" : "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"} text-white font-medium rounded-xl px-4 py-2 shadow transition-all`}
              >
                Post Your First Task
              </button>
            )}
          </div>
        )}
      </div>

      {userRole === "poster" && (
        <button
          onClick={() => navigateTo("post-task")}
          className={`fixed bottom-24 right-4 sm:right-6 md:hidden flex items-center justify-center w-14 h-14 rounded-full ${theme === "light" ? "bg-gradient-to-br from-emerald-500 to-blue-500" : "bg-gradient-to-br from-emerald-600 to-blue-600"} text-white shadow-xl hover:scale-105 transition`}
          aria-label="Post New Task"
        >
          <Plus size={28} />
        </button>
      )}
    </>
  );
};

export default TasksSection;