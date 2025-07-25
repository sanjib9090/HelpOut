import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, User, MessageCircle, Star } from 'lucide-react';
import Header from '../components/Header';

const TaskDetails = ({ navigateTo, taskId }) => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRole] = useState('provider');

  // Mock task data
  const task = {
    id: 1,
    title: 'Help move furniture to new apartment',
    description: 'Need help moving a couch, dining table, and several boxes to my new apartment on the 3rd floor. The move is local (about 5 miles). Looking for someone with a vehicle who can help with heavy lifting.',
    budget: 80,
    location: 'Downtown Portland, OR',
    deadline: '2024-12-30T13:30:00',
    category: 'moving',
    urgency: 'medium',
    negotiable: true,
    tags: ['Physical Work', 'Vehicle Required'],
    status: 'open',
    requirements: 'Must have a vehicle (truck or large SUV preferred). Experience with furniture moving is a plus.',
    poster: {
      name: 'Sarah Johnson',
      rating: 4.8,
      reviews: 23,
      avatar: 'SJ'
    },
    applicants: [
      { id: 1, name: 'Mike Chen', rating: 4.9, avatar: 'MC' },
      { id: 2, name: 'Lisa Park', rating: 4.7, avatar: 'LP' }
    ]
  };

  const OtpModal = ({ isOpen, onClose, title }) => {
    const [otp, setOtp] = useState(['', '', '', '']);

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              ✕
            </button>
          </div>
          <div className="modal-body">
            <p className="text-gray-600 mb-4">
              Enter the 4-digit OTP to proceed
            </p>
            <div className="flex gap-3 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[index] = e.target.value;
                    setOtp(newOtp);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button className="btn btn-primary">
              Verify
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RatingModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h3 className="modal-title">Rate & Review</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              ✕
            </button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-semibold">{task.poster.avatar}</span>
              </div>
              <h4 className="font-semibold">{task.poster.name}</h4>
            </div>

            <div className="mb-4">
              <label className="form-label">Rating</label>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-colors ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-400`}
                  >
                    <Star fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Comment (optional)</label>
              <textarea
                placeholder="Share your experience..."
                className="form-textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn btn-secondary">
              Skip
            </button>
            <button className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNav={false} navigateTo={navigateTo} currentPage="task" />
      
      <main className="container py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Task Details</h1>
          </div>

          {/* Task Info */}
          <div className="card p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="task-price">${task.budget}</div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                task.status === 'open' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {task.status}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">{task.title}</h2>

            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{task.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Due: Dec 30, 2024 at 1:30 PM</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="tag">{task.category}</span>
              <span className={`tag ${task.urgency === 'high' ? 'tag-urgent' : ''}`}>
                {task.urgency} urgency
              </span>
              {task.negotiable && <span className="tag tag-negotiable">Negotiable</span>}
              {task.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{task.description}</p>
            </div>

            {task.requirements && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                <p className="text-gray-700">{task.requirements}</p>
              </div>
            )}
          </div>

          {/* Poster Info */}
          <div className="card p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Posted by</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold">{task.poster.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{task.poster.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span>{task.poster.rating} ({task.poster.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigateTo('chat', { chatId: task.id })}
                className="btn btn-outline"
              >
                <MessageCircle size={16} />
                Message
              </button>
            </div>
          </div>

          {/* Actions */}
          {userRole === 'provider' && task.status === 'open' && (
            <div className="card p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Apply for this task</h3>
              <p className="text-gray-600 mb-4">
                Interested in helping? Send a message to introduce yourself and discuss details.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigateTo('chat', { chatId: task.id })}
                  className="btn btn-primary flex-1"
                >
                  Apply Now
                </button>
                <button className="btn btn-outline">
                  Save for Later
                </button>
              </div>
            </div>
          )}

          {userRole === 'poster' && task.applicants.length > 0 && (
            <div className="card p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Applicants ({task.applicants.length})
              </h3>
              <div className="space-y-4">
                {task.applicants.map(applicant => (
                  <div key={applicant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-semibold">{applicant.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{applicant.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star size={14} className="text-yellow-400" fill="currentColor" />
                          <span>{applicant.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigateTo('chat', { chatId: task.id })}
                        className="btn btn-outline btn-sm"
                      >
                        Chat
                      </button>
                      <button className="btn btn-primary btn-sm">
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Task Progress (for selected provider) */}
          {userRole === 'provider' && task.status === 'in_progress' && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Task Progress</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowOtpModal(true)}
                  className="btn btn-primary w-full"
                >
                  Start Task (Enter OTP)
                </button>
                <button 
                  onClick={() => setShowOtpModal(true)}
                  className="btn btn-primary w-full"
                >
                  Complete Task (Enter OTP)
                </button>
                <button 
                  onClick={() => setShowRatingModal(true)}
                  className="btn btn-outline w-full"
                >
                  Rate & Review
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <OtpModal 
        isOpen={showOtpModal} 
        onClose={() => setShowOtpModal(false)}
        title="Verify Task Progress"
      />
      
      <RatingModal 
        isOpen={showRatingModal} 
        onClose={() => setShowRatingModal(false)} 
      />
    </div>
  );
};

export default TaskDetails;