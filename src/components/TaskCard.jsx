import React from "react";
import { Card, CardContent } from "./ui/Card";
import { Clock, MapPin, Tag } from "lucide-react";

const TaskCard = ({ task, navigateTo, theme }) => {
  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
      <CardContent className="p-6">
        <h3 className={`text-lg font-semibold ${theme === "light" ? "text-gray-900" : "text-white"} mb-2`}>{task.title}</h3>
        <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"} mb-4`}>${task.budget} • {task.location}</p>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className={theme === "light" ? "text-gray-400" : "text-gray-300"} />
          <span className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>{new Date(task.deadline).toLocaleString()}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {task.tags.map((tag, index) => (
            <div key={index} className={`flex items-center gap-1 ${theme === "light" ? "bg-gray-100 text-gray-600" : "bg-gray-700 text-gray-300"} px-2 py-1 rounded-full text-xs`}>
              <Tag size={12} />
              <span>{tag}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigateTo("task", { taskId: task.id })}
          className={`w-full py-2 ${theme === "light" ? "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600" : "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"} text-white font-medium rounded-xl transition-all`}
        >
          View Details
        </button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;