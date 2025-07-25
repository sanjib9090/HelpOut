import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Image, Star } from 'lucide-react';
import Header from '../components/Header';

const ChatPage = ({ navigateTo, chatId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock data
  const chat = {
    taskId: 1,
    taskTitle: 'Help move furniture to new apartment',
    taskBudget: 80,
    otherUser: {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 4.8,
      isOnline: true
    }
  };

  const mockMessages = [
    {
      id: 1,
      senderId: 'other',
      content: 'Hi! I saw your application for the furniture moving task. Are you available this weekend?',
      timestamp: '2024-12-23T10:30:00',
      type: 'text'
    },
    {
      id: 2,
      senderId: 'me',
      content: 'Yes, I\'m available both Saturday and Sunday. I have a pickup truck and experience with furniture moving.',
      timestamp: '2024-12-23T10:32:00',
      type: 'text'
    },
    {
      id: 3,
      senderId: 'other',
      content: 'Perfect! The move is from downtown to Sellwood. About 3 hours of work. When would work best for you?',
      timestamp: '2024-12-23T10:35:00',
      type: 'text'
    },
    {
      id: 4,
      senderId: 'me',
      content: 'Saturday morning around 9 AM would be ideal. Should I bring any specific equipment?',
      timestamp: '2024-12-23T10:38:00',
      type: 'text'
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      senderId: 'me',
      content: message,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Mock response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        senderId: 'other',
        content: 'Sounds great! I\'ll send you the exact address and contact details.',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header showNav={false} navigateTo={navigateTo} currentPage="chat" />
      
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('home')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-700 font-semibold">{chat.otherUser.avatar}</span>
              </div>
              {chat.otherUser.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{chat.otherUser.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star size={12} className="text-yellow-400" fill="currentColor" />
                <span>{chat.otherUser.rating}</span>
                <span>•</span>
                <span className="text-green-600">Online</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigateTo('task', { taskId: chat.taskId })}
            className="btn btn-outline btn-sm"
          >
            View Task
          </button>
        </div>
      </div>

      {/* Task Context */}
      <div className="bg-primary-50 border-b border-primary-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-primary-900">{chat.taskTitle}</h4>
            <p className="text-sm text-primary-700">Budget: ${chat.taskBudget}</p>
          </div>
          <button
            onClick={() => navigateTo('task', { taskId: chat.taskId })}
            className="text-primary-600 hover:text-primary-800 text-sm transition-colors"
          >
            View Details →
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  msg.senderId === 'me' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white text-gray-900 border'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.senderId === 'me' ? 'text-primary-100' : 'text-gray-500'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Paperclip size={20} />
            </button>
            
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Image size={20} />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary-500 pr-12 transition-colors"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                  message.trim() 
                    ? 'bg-primary-500 text-white hover:bg-primary-600' 
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;