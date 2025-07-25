import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const TaskCard = ({ task, navigateTo }) => {
  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  return (
    <div
      onClick={() => navigateTo('task', { taskId: task.id })}
      className="task-card cursor-pointer"
    >
      <div className="task-price">${task.budget}</div>
      <h3 className="task-title">{task.title}</h3>
      
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
        <MapPin size={16} />
        <span>{task.location}</span>
      </div>
      
      <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
        <Clock size={16} />
        <span>Due: {formatDeadline(task.deadline)}</span>
        {formatDeadline(task.deadline) === 'Expired' && (
          <span className="tag tag-urgent">Expired</span>
        )}
      </div>
      
      <div className="flex flex-wrap gap-1">
        {task.category && <span className="tag">{task.category}</span>}
        {task.urgency && <span className={`tag ${task.urgency === 'high' ? 'tag-urgent' : ''}`}>
          {task.urgency} urgency
        </span>}
        {task.negotiable && <span className="tag tag-negotiable">Negotiable</span>}
        {task.tags && task.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;