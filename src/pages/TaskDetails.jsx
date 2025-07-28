import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, User, MessageCircle, Star } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Button } from '../components/ui/Button';
import { Input } from '../components/Input';

const TaskDetails = ({ navigateTo, taskId, theme, toggleTheme, isLoggedIn }) => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRole] = useState('provider');
  const [otpError, setOtpError] = useState('');

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

    const handleOtpSubmit = () => {
      if (otp.every(digit => digit.length === 1)) {
        console.log('OTP Verified:', otp.join(''));
        onClose();
      } else {
        setOtpError('Please enter a valid 4-digit OTP');
      }
    };

    return (
      <div className={`fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 transform transition-all duration-300 scale-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enter the 4-digit OTP to proceed
            </p>
            <div className="flex gap-3 justify-center mb-4">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10"
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[index] = e.target.value;
                    setOtp(newOtp);
                    setOtpError('');
                    if (e.target.value && index < 3) {
                      document.getElementById(`otp-${index + 1}`).focus();
                    }
                  }}
                  id={`otp-${index}`}
                />
              ))}
            </div>
            {otpError && (
              <p className="text-sm text-red-600 dark:text-red-400 text-center animate-pulse">{otpError}</p>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-md px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 text-white font-medium rounded-md px-6 py-3 hover:from-emerald-600 hover:to-blue-600 dark:hover:from-emerald-700 dark:hover:to-blue-700"
              onClick={handleOtpSubmit}
            >
              Verify
            </Button>
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
      <div className={`fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 transform transition-all duration-300 scale-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rate & Review</h3>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">{task.poster.avatar}</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{task.poster.name}</h4>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Rating</label>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-colors ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'
                    } hover:text-yellow-400`}
                  >
                    <Star fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Comment (optional)</label>
              <textarea
                placeholder="Share your experience..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-blue-400 focus:ring focus:ring-emerald-500/10 dark:focus:ring-blue-400/10 min-h-[140px]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-md px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Skip
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 text-white font-medium rounded-md px-6 py-3 hover:from-emerald-600 hover:to-blue-600 dark:hover:from-emerald-700 dark:hover:to-blue-700"
              onClick={() => {
                console.log('Review Submitted:', { rating, comment });
                onClose();
              }}
            >
              Submit Review
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header
        showNav={false}
        navigateTo={navigateTo}
        currentPage="task"
        theme={theme}
        toggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-24 sm:pb-8 scroll-pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Task Details</h1>
          </div>

          {/* Task Info */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${task.budget}</div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                task.status === 'open' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
              }`}>
                {task.status}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">{task.title}</h2>

            <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-4">
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
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                {task.category}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                task.urgency === 'high' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300' : 'bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300'
              }`}>
                {task.urgency} urgency
              </span>
              {task.negotiable && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-semibold">
                  Negotiable
                </span>
              )}
              {task.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{task.description}</p>
            </div>

            {task.requirements && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
                <p className="text-gray-700 dark:text-gray-300">{task.requirements}</p>
              </div>
            )}
          </div>

          {/* Poster Info */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Posted by</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center">
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{task.poster.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{task.poster.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Star size={16} className="text-yellow-400" fill="currentColor" />
                    <span>{task.poster.rating} ({task.poster.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => navigateTo('chat', { chatId: task.id })}
                className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Message
              </Button>
            </div>
          </div>

          {/* Actions */}
          {userRole === 'provider' && task.status === 'open' && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Apply for this task</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Interested in helping? Send a message to introduce yourself and discuss details.
              </p>
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 text-white font-medium rounded-md px-6 py-3 hover:from-emerald-600 hover:to-blue-600 dark:hover:from-emerald-700 dark:hover:to-blue-700 min-h-14"
                  onClick={() => navigateTo('chat', { chatId: task.id })}
                >
                  Apply Now
                </Button>
                <Button
                  className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Save for Later
                </Button>
              </div>
            </div>
          )}

          {userRole === 'poster' && task.applicants.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Applicants ({task.applicants.length})
              </h3>
              <div className="space-y-4">
                {task.applicants.map(applicant => (
                  <div key={applicant.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{applicant.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{applicant.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                          <Star size={14} className="text-yellow-400" fill="currentColor" />
                          <span>{applicant.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigateTo('chat', { chatId: task.id })}
                        className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Chat
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 text-white font-medium rounded-md px-3 py-1 text-sm hover:from-emerald-600 hover:to-blue-600 dark:hover:from-emerald-700 dark:hover:to-blue-700"
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Task Progress (for selected provider) */}
          {userRole === 'provider' && task.status === 'in_progress' && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Task Progress</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => setShowOtpModal(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 text-white font-medium rounded-md px-6 py-3 hover:from-emerald-600 hover:to-blue-600 dark:hover:from-emerald-700 dark:hover:to-blue-700 min-h-14"
                >
                  Start Task (Enter OTP)
                </Button>
                <Button
                  onClick={() => setShowOtpModal(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 dark:from-emerald-600 dark:to-blue-600 text-white font-medium rounded-md px-6 py-3 hover:from-emerald-600 hover:to-blue-600 dark:hover:from-emerald-700 dark:hover:to-blue-700 min-h-14"
                >
                  Complete Task (Enter OTP)
                </Button>
                <Button
                  onClick={() => setShowRatingModal(true)}
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-md px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 min-h-14"
                >
                  Rate & Review
                </Button>
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

      <BottomNav navigateTo={navigateTo} currentPage="task" theme={theme} />
    </div>
  );
};

export default TaskDetails;