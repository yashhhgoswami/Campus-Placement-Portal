// Service for managing messages and communications
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Mock data for development
const mockConversations = [
  {
    id: 1,
    candidateName: 'Rajesh Kumar',
    candidateEmail: 'rajesh.kumar@email.com',
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
        type: 'text',
        read: true
      },
      {
        id: 2,
        sender: 'recruiter',
        content: 'Hi Rajesh, thank you for your interest! I reviewed your application and it looks impressive. Would you be available for a brief phone screening this week?',
        timestamp: '9:45 AM',
        type: 'text',
        read: true
      },
      {
        id: 3,
        sender: 'candidate',
        content: 'That sounds great! I\'m available Tuesday through Thursday between 2-5 PM IST. Please let me know what works best for you.',
        timestamp: '10:20 AM',
        type: 'text',
        read: true
      },
      {
        id: 4,
        sender: 'candidate',
        content: 'Thank you for considering my application. I look forward to hearing back from you.',
        timestamp: '10:30 AM',
        type: 'text',
        read: false
      }
    ]
  },
  {
    id: 2,
    candidateName: 'Priya Sharma',
    candidateEmail: 'priya.sharma@email.com',
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
        type: 'text',
        read: true
      },
      {
        id: 2,
        sender: 'candidate',
        content: 'I can do the interview on Wednesday at 3 PM IST. Should I prepare anything specific about Indian market dynamics?',
        timestamp: 'Yesterday 2:30 PM',
        type: 'text',
        read: true
      }
    ]
  }
];

export const getConversations = async (filters = {}) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredConversations = [...mockConversations];
    
    // Apply filters
    if (filters.unread) {
      filteredConversations = filteredConversations.filter(conv => conv.unread);
    }
    
    if (filters.starred) {
      filteredConversations = filteredConversations.filter(conv => conv.starred);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredConversations = filteredConversations.filter(conv =>
        conv.candidateName.toLowerCase().includes(searchTerm) ||
        conv.candidateRole.toLowerCase().includes(searchTerm) ||
        conv.lastMessage.toLowerCase().includes(searchTerm)
      );
    }
    
    return {
      success: true,
      conversations: filteredConversations
    };
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return {
      success: false,
      error: 'Failed to fetch conversations',
      conversations: []
    };
  }
};

export const getConversationById = async (conversationId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const conversation = mockConversations.find(c => c.id === parseInt(conversationId));
    
    if (!conversation) {
      return {
        success: false,
        error: 'Conversation not found'
      };
    }
    
    return {
      success: true,
      conversation
    };
  } catch (error) {
    console.error('Error fetching conversation:', error);
    return {
      success: false,
      error: 'Failed to fetch conversation'
    };
  }
};

export const sendMessage = async (conversationId, message, attachments = []) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newMessage = {
      id: Date.now(),
      sender: 'recruiter',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      read: true,
      attachments
    };
    
    // In a real app, this would update the database
    const conversationIndex = mockConversations.findIndex(c => c.id === parseInt(conversationId));
    
    if (conversationIndex !== -1) {
      mockConversations[conversationIndex].messages.push(newMessage);
      mockConversations[conversationIndex].lastMessage = message;
      mockConversations[conversationIndex].timestamp = 'Just now';
    }
    
    return {
      success: true,
      message: newMessage
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      success: false,
      error: 'Failed to send message'
    };
  }
};

export const markAsRead = async (conversationId, messageIds = []) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // In a real app, this would update the database
    const conversationIndex = mockConversations.findIndex(c => c.id === parseInt(conversationId));
    
    if (conversationIndex !== -1) {
      mockConversations[conversationIndex].unread = false;
      
      if (messageIds.length > 0) {
        mockConversations[conversationIndex].messages = mockConversations[conversationIndex].messages.map(msg =>
          messageIds.includes(msg.id) ? { ...msg, read: true } : msg
        );
      }
    }
    
    return {
      success: true,
      message: 'Messages marked as read'
    };
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return {
      success: false,
      error: 'Failed to mark messages as read'
    };
  }
};

export const toggleStar = async (conversationId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const conversationIndex = mockConversations.findIndex(c => c.id === parseInt(conversationId));
    
    if (conversationIndex === -1) {
      return {
        success: false,
        error: 'Conversation not found'
      };
    }
    
    mockConversations[conversationIndex].starred = !mockConversations[conversationIndex].starred;
    
    return {
      success: true,
      starred: mockConversations[conversationIndex].starred
    };
  } catch (error) {
    console.error('Error toggling star:', error);
    return {
      success: false,
      error: 'Failed to toggle star'
    };
  }
};

export const archiveConversation = async (conversationId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would update the database
    return {
      success: true,
      message: 'Conversation archived'
    };
  } catch (error) {
    console.error('Error archiving conversation:', error);
    return {
      success: false,
      error: 'Failed to archive conversation'
    };
  }
};

export const deleteConversation = async (conversationId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would update the database
    const conversationIndex = mockConversations.findIndex(c => c.id === parseInt(conversationId));
    
    if (conversationIndex !== -1) {
      mockConversations.splice(conversationIndex, 1);
    }
    
    return {
      success: true,
      message: 'Conversation deleted'
    };
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return {
      success: false,
      error: 'Failed to delete conversation'
    };
  }
};

export const createNewConversation = async (candidateId, initialMessage) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // In a real app, this would create a new conversation in the database
    const newConversation = {
      id: Date.now(),
      candidateName: 'New Candidate',
      candidateEmail: 'candidate@email.com',
      candidateRole: 'Unknown',
      lastMessage: initialMessage,
      timestamp: 'Just now',
      unread: false,
      starred: false,
      avatar: null,
      messages: [
        {
          id: 1,
          sender: 'recruiter',
          content: initialMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
          read: true
        }
      ]
    };
    
    mockConversations.unshift(newConversation);
    
    return {
      success: true,
      conversation: newConversation
    };
  } catch (error) {
    console.error('Error creating conversation:', error);
    return {
      success: false,
      error: 'Failed to create conversation'
    };
  }
};

export const getMessageStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const totalConversations = mockConversations.length;
    const unreadCount = mockConversations.filter(conv => conv.unread).length;
    const starredCount = mockConversations.filter(conv => conv.starred).length;
    
    return {
      success: true,
      stats: {
        total: totalConversations,
        unread: unreadCount,
        starred: starredCount,
        todayMessages: 15,
        responseTime: 2.5 // hours
      }
    };
  } catch (error) {
    console.error('Error fetching message stats:', error);
    return {
      success: false,
      error: 'Failed to fetch stats'
    };
  }
};

export const searchMessages = async (query) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const searchTerm = query.toLowerCase();
    const results = [];
    
    mockConversations.forEach(conversation => {
      const matchingMessages = conversation.messages.filter(message =>
        message.content.toLowerCase().includes(searchTerm)
      );
      
      if (matchingMessages.length > 0) {
        results.push({
          conversation,
          messages: matchingMessages
        });
      }
    });
    
    return {
      success: true,
      results
    };
  } catch (error) {
    console.error('Error searching messages:', error);
    return {
      success: false,
      error: 'Failed to search messages',
      results: []
    };
  }
};