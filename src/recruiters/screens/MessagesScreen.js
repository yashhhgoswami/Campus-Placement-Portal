import React, { useState, useEffect } from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdSend, 
  MdAttachFile, 
  MdSearch, 
  MdMoreVert,
  MdPerson,
  MdNotifications,
  MdFilterList,
  MdAdd,
  MdStar,
  MdArchive,
  MdDelete,
  MdReply
} from 'react-icons/md';

const MessagesScreen = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock data for conversations
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        candidateName: 'Rajesh Kumar',
        candidateRole: 'Software Engineer',
        lastMessage: 'Thank you for considering my application. I look forward to hearing back from you.',
        timestamp: '10:30 AM',
        unread: true,
        starred: false,
        avatar: null,
        messages: [
          {
            id: 1,
            sender: 'candidate',
            content: 'Namaste! I just submitted my application for the Software Engineer position. I wanted to follow up and express my enthusiasm for this role with your company.',
            timestamp: '9:15 AM',
            type: 'text'
          },
          {
            id: 2,
            sender: 'recruiter',
            content: 'Hi Rajesh, thank you for your interest! I reviewed your application and it looks impressive. Would you be available for a brief phone screening this week?',
            timestamp: '9:45 AM',
            type: 'text'
          },
          {
            id: 3,
            sender: 'candidate',
            content: 'That sounds great! I\'m available Tuesday through Thursday between 2-5 PM IST. Please let me know what works best for you.',
            timestamp: '10:20 AM',
            type: 'text'
          },
          {
            id: 4,
            sender: 'candidate',
            content: 'Thank you for considering my application. I look forward to hearing back from you.',
            timestamp: '10:30 AM',
            type: 'text'
          }
        ]
      },
      {
        id: 2,
        candidateName: 'Priya Sharma',
        candidateRole: 'Product Manager',
        lastMessage: 'I can do the interview on Wednesday at 3 PM IST. Should I prepare anything specific?',
        timestamp: 'Yesterday',
        unread: false,
        starred: true,
        avatar: null,
        messages: [
          {
            id: 1,
            sender: 'recruiter',
            content: 'Hi Priya, I would like to schedule a follow-up interview for the Product Manager position. Are you available this week?',
            timestamp: 'Yesterday 2:00 PM',
            type: 'text'
          },
          {
            id: 2,
            sender: 'candidate',
            content: 'I can do the interview on Wednesday at 3 PM IST. Should I prepare anything specific about Indian market dynamics?',
            timestamp: 'Yesterday 2:30 PM',
            type: 'text'
          }
        ]
      },
      {
        id: 3,
        candidateName: 'Arjun Singh',
        candidateRole: 'Data Scientist',
        lastMessage: 'Here\'s my updated portfolio with recent projects on Indian retail analytics.',
        timestamp: '2 days ago',
        unread: false,
        starred: false,
        avatar: null,
        messages: [
          {
            id: 1,
            sender: 'candidate',
            content: 'Here\'s my updated portfolio with recent projects on Indian retail analytics and customer behavior prediction.',
            timestamp: '2 days ago',
            type: 'text'
          }
        ]
      },
      {
        id: 4,
        candidateName: 'Sneha Patel',
        candidateRole: 'UX Designer',
        lastMessage: 'Thank you for the feedback on my design challenge for the mobile app.',
        timestamp: '3 days ago',
        unread: false,
        starred: false,
        avatar: null,
        messages: [
          {
            id: 1,
            sender: 'candidate',
            content: 'Thank you for the feedback on my design challenge for the mobile-first Indian user experience.',
            timestamp: '3 days ago',
            type: 'text'
          }
        ]
      }
    ];

    setTimeout(() => {
      setConversations(mockConversations);
      setSelectedConversation(mockConversations[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now(),
      sender: 'recruiter',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: newMessage,
          timestamp: 'Just now'
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      timestamp: 'Just now'
    });
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.candidateRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      
      <div className="flex pt-16">
        <RecruiterSidebar />
        
        <div className="flex-1 ml-72">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                <p className="text-gray-600">Communication hub for candidate conversations</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200">
                  <MdAdd />
                  <span>New Message</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex h-[calc(100vh-8rem)]">
            {/* Conversations List */}
            <div className="w-1/3 bg-white border-r border-gray-200">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex border-b border-gray-200">
                <button className="flex-1 px-4 py-3 text-sm font-medium text-orange-600 border-b-2 border-orange-600">
                  All
                </button>
                <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Unread
                </button>
                <button className="flex-1 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Starred
                </button>
              </div>

              {/* Conversation List */}
              <div className="overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedConversation?.id === conversation.id ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MdPerson className="text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium truncate ${conversation.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {conversation.candidateName}
                          </p>
                          <div className="flex items-center space-x-1">
                            {conversation.starred && <MdStar className="text-yellow-400 text-sm" />}
                            <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{conversation.candidateRole}</p>
                        <p className={`text-sm truncate ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <MdPerson className="text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{selectedConversation.candidateName}</h3>
                          <p className="text-sm text-gray-500">{selectedConversation.candidateRole}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <MdStar />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <MdArchive />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                          <MdMoreVert />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'recruiter'
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'recruiter' ? 'text-orange-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="bg-white border-t border-gray-200 p-4">
                    <div className="flex items-end space-x-3">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <MdAttachFile />
                      </button>
                      <div className="flex-1">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MdSend />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MdSend className="mx-auto text-6xl text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesScreen;