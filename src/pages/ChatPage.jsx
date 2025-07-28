import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Image, Star, MapPin, Clock } from 'lucide-react';
import NavHeader from '../components/Header';

const ChatPage = ({ navigateTo, chatId, theme, toggleTheme, isLoggedIn }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const inputWrapperRef = useRef(null);
  const profileHeaderRef = useRef(null);

  // Mock data for chats
  const ongoingTasks = [
    {
      id: '1',
      title: 'Help move furniture to new apartment',
      budget: '75',
      location: 'Downtown Portland, OR',
      dueDate: '2024-12-31T14:00:00',
      status: 'Open'
    },
    {
      id: '2',
      title: 'Pet sitting for weekend getaway',
      budget: '50',
      location: 'Sellwood, OR',
      dueDate: '2024-12-29T10:00:00',
      status: 'Ongoing'
    }
  ];

  const chats = [
    {
      id: '1',
      taskId: '1',
      title: 'Help move furniture to new apartment',
      budget: '75',
      user: { name: 'Sarah Johnson', avatar: 'SJ', rating: '4.8', online: true },
      lastMessage: 'Sounds great! I\'ll send you the details soon.',
      timestamp: '2024-12-24T11:45:00',
      unread: 1
    },
    {
      id: '2',
      taskId: '2',
      title: 'Pet sitting for weekend getaway',
      budget: '50',
      user: { name: 'Mike Chen', avatar: 'MC', rating: '4.9', online: false },
      lastMessage: 'Are you free this Saturday?',
      timestamp: '2024-12-24T10:20:00',
      unread: 2
    },
    {
      id: '3',
      taskId: '3',
      title: 'Deep clean apartment',
      budget: '100',
      user: { name: 'Lisa Park', avatar: 'LP', rating: '4.7', online: true },
      lastMessage: 'Can you start at 9 AM?',
      timestamp: '2024-12-24T09:30:00',
      unread: 0
    }
  ];

  // Mock messages
  const mockMessages = {
    '1': [
      { id: '1', sender: 'other', text: 'Hi! I saw your application for the furniture moving task. Are you available this weekend?', time: '2024-12-24T11:30:00', type: 'text' },
      { id: '2', sender: 'me', text: 'Yes, I\'m free both days. I have a truck and moving experience.', time: '2024-12-24T11:32:00', type: 'text' },
      { id: '3', sender: 'other', text: 'Great! It’s a move from downtown to Sellwood, about 3 hours. When works best?', time: '2024-12-24T11:35:00', type: 'text' },
      { id: '4', sender: 'me', text: 'Saturday at 9 AM is perfect. Any specific equipment needed?', time: '2024-12-24T11:38:00', type: 'text' }
    ],
    '2': [
      { id: '1', sender: 'other', text: 'Hi, can you pet sit this weekend?', time: '2024-12-24T10:15:00', type: 'text' },
      { id: '2', sender: 'me', text: 'Sure! What kind of pets?', time: '2024-12-24T10:17:00', type: 'text' }
    ],
    '3': [
      { id: '1', sender: 'other', text: 'Need a deep clean for my apartment. 9 AM work?', time: '2024-12-24T09:25:00', type: 'text' },
      { id: '2', sender: 'me', text: 'Yes, 9 AM is fine. How big is the apartment?', time: '2024-12-24T09:28:00', type: 'text' }
    ]
  };

  const activeChat = chats.find(c => c.id === chatId) || null;

  useEffect(() => {
    if (chatId && activeChat) {
      setMessages(mockMessages[chatId] || []);
    }
  }, [chatId]);

  useEffect(() => {
    setTimeout(scrollToBottom, 100); // Delay for DOM rendering
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: 'me',
      text: message,
      time: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setTimeout(scrollToBottom, 100); // Delay for DOM rendering

    // Keep focus to prevent keyboard closing
    messageInputRef.current?.focus();

    // Mock response
    setTimeout(() => {
      const response = {
        id: (messages.length + 2).toString(),
        sender: 'other',
        text: 'Got it! I’ll reply soon.',
        time: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, response]);
      setTimeout(scrollToBottom, 100);
    }, 1000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle keyboard visibility and adjust positions
  useEffect(() => {
    const inputWrapper = inputWrapperRef.current;
    const messagesContainer = document.querySelector('.messages-container');

    const handleResize = () => {
      if (inputWrapper && messagesContainer) {
        const visualViewport = window.visualViewport;
        let keyboardHeight = 0;

        if (visualViewport) {
          keyboardHeight = Math.max(0, window.innerHeight - visualViewport.height);
          inputWrapper.style.position = 'fixed';
          inputWrapper.style.bottom = `${keyboardHeight}px`;
          inputWrapper.style.left = '0';
          inputWrapper.style.right = '0';
          inputWrapper.style.zIndex = '40';
          messagesContainer.style.paddingBottom = `${keyboardHeight + inputWrapper.offsetHeight + 80}px`; // Increased padding
        } else {
          inputWrapper.style.position = 'fixed';
          inputWrapper.style.bottom = '0';
          inputWrapper.style.left = '0';
          inputWrapper.style.right = '0';
          inputWrapper.style.zIndex = '40';
          messagesContainer.style.paddingBottom = `${Math.max(inputWrapper.offsetHeight, 80) + 80}px`; // Ensure min padding
        }

        setTimeout(scrollToBottom, 100); // Ensure scroll after layout changes
      }
    };

    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('focusin', handleResize);
    window.addEventListener('focusout', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('focusin', handleResize);
      window.removeEventListener('focusout', handleResize);
      if (messagesContainer) {
        messagesContainer.style.paddingBottom = '';
      }
    };
  }, []);

  // Dynamically adjust task context position
  useEffect(() => {
    const profileHeader = profileHeaderRef.current;
    const taskContext = document.querySelector('.task-context');
    if (profileHeader && taskContext) {
      taskContext.style.top = `${profileHeader.offsetHeight}px`;
    }
  }, []);

  // Chat List Page
  if (!chatId || !activeChat) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <NavHeader
          showNav={false}
          navigateTo={navigateTo}
          currentPage="chat"
          theme={theme}
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
        />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigateTo('home')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Your Chats</h1>
            </div>

            {/* Ongoing Tasks */}
            {ongoingTasks.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Ongoing Tasks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ongoingTasks.map(task => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => navigateTo('task', { taskId: task.id })}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">${task.budget}</div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.status === 'Open'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400'
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-400'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{task.title}</h3>
                      <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>Due: {formatDate(task.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat List */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">Messages</h2>
              <div className="space-y-3">
                {chats.map(chat => (
                  <div
                    key={chat.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => navigateTo('chat', { chatId: chat.id })}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-emerald-200 dark:bg-emerald-700 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{chat.user.avatar}</span>
                      </div>
                      {chat.user.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900 dark:text-white">{chat.user.name}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(chat.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{chat.lastMessage}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{chat.title}</p>
                      {chat.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">{chat.unread}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Chat Conversation Page
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      {/* Sticky Chat Profile Header */}
      <div
        ref={profileHeaderRef}
        className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2 z-30 pt-[env(safe-area-inset-top, 0px)] sm:px-4 sm:py-3"
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigateTo('chat')}
            className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Back to chat list"
          >
            <ArrowLeft size={18} className="text-gray-600 dark:text-gray-300 sm:w-5 sm:h-5" />
          </button>
          <div className="flex items-center gap-2 sm:gap-3 flex-1">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-200 dark:bg-emerald-700 rounded-full flex items-center justify-center">
                <span className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold">{activeChat?.user.avatar}</span>
              </div>
              {activeChat?.user.online && (
                <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border border-white dark:border-gray-800"></div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white truncate">{activeChat?.user.name}</h3>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <Star size={10} className="text-yellow-400" fill="currentColor" />
                <span>{activeChat?.user.rating}</span>
                <span>•</span>
                <span className="text-green-600 dark:text-green-400">{activeChat?.user.online ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigateTo('task', { taskId: activeChat?.taskId })}
            className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="View task details"
          >
            View Task
          </button>
        </div>
      </div>

      {/* Sticky Task Context */}
      <div className="sticky task-context bg-emerald-50 dark:bg-emerald-900 border-b border-emerald-100 dark:border-emerald-800 px-3 py-2 sm:px-4 sm:py-3 z-30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-sm sm:text-base text-emerald-900 dark:text-emerald-300">{activeChat?.title}</h4>
            <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400">Budget: ${activeChat?.budget}</p>
          </div>
          <button
            onClick={() => navigateTo('task', { taskId: activeChat?.taskId })}
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 text-xs sm:text-sm transition-colors"
            aria-label="View task details"
          >
            View Task Details
          </button>
        </div>
      </div>

      {/* Scrollable Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6 messages-container">
        <div className="max-w-[90vw] mx-auto space-y-3 sm:space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-3 py-2 rounded-2xl break-words ${
                  msg.sender === 'me'
                    ? 'bg-emerald-500 dark:bg-emerald-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="text-xs sm:text-sm">{msg.text}</p>
                <p className={`text-[10px] sm:text-xs mt-1 ${msg.sender === 'me' ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {formatTime(msg.time)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div
        ref={inputWrapperRef}
        className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-3 py-2 sm:px-4 sm:py-3 pb-[env(safe-area-inset-bottom, 0px)] fixed bottom-0 left-0 right-0 z-40"
      >
        <form onSubmit={handleSendMessage} className="max-w-[90vw] mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="p-1 sm:p-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors"
              aria-label="Attach file"
            >
              <Paperclip size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              className="p-1 sm:p-2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors"
              aria-label="Attach image"
            >
              <Image size={18} className="sm:w-5 sm:h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                ref={messageInputRef}
                type="text"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 pr-10 sm:pr-12 transition-colors"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message..."
                aria-label="Type a message"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className={`absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 rounded-full transition-colors ${
                  message.trim()
                    ? 'bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500'
                }`}
                aria-label="Send message"
              >
                <Send size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;