// Service for managing interviews and scheduling
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Mock data for development
const mockInterviews = [
  {
    id: 1,
    candidateName: 'Rajesh Kumar',
    candidateEmail: 'rajesh.kumar@email.com',
    candidateId: 1,
    position: 'Software Engineer',
    type: 'Technical Interview',
    date: '2025-10-05',
    time: '10:00 AM',
    duration: 60,
    status: 'Scheduled',
    interviewer: 'Priya Agarwal',
    interviewerId: 1,
    location: 'Video Call',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'Focus on React and Node.js experience, discuss fintech projects',
    round: 'Round 2',
    feedback: null,
    rating: null
  },
  {
    id: 2,
    candidateName: 'Sneha Patel',
    candidateEmail: 'sneha.patel@email.com',
    candidateId: 2,
    position: 'UX Designer',
    type: 'Portfolio Review',
    date: '2025-10-03',
    time: '2:00 PM',
    duration: 45,
    status: 'Completed',
    interviewer: 'Vikram Shah',
    interviewerId: 2,
    location: 'Bangalore Office - Conference Room 1',
    meetingLink: null,
    notes: 'Review mobile-first design portfolio and discuss Indian user experience',
    round: 'Round 1',
    feedback: 'Strong portfolio with excellent design thinking for Indian mobile users. Good communication skills.',
    rating: 4.5
  }
];

export const getInterviews = async (filters = {}) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredInterviews = [...mockInterviews];
    
    // Apply filters
    if (filters.status && filters.status !== 'all') {
      filteredInterviews = filteredInterviews.filter(
        interview => interview.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    
    if (filters.date) {
      filteredInterviews = filteredInterviews.filter(
        interview => interview.date === filters.date
      );
    }
    
    if (filters.interviewer) {
      filteredInterviews = filteredInterviews.filter(
        interview => interview.interviewer === filters.interviewer
      );
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredInterviews = filteredInterviews.filter(interview =>
        interview.candidateName.toLowerCase().includes(searchTerm) ||
        interview.position.toLowerCase().includes(searchTerm) ||
        interview.type.toLowerCase().includes(searchTerm)
      );
    }
    
    return {
      success: true,
      interviews: filteredInterviews,
      total: filteredInterviews.length
    };
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return {
      success: false,
      error: 'Failed to fetch interviews',
      interviews: [],
      total: 0
    };
  }
};

export const getInterviewById = async (interviewId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const interview = mockInterviews.find(i => i.id === parseInt(interviewId));
    
    if (!interview) {
      return {
        success: false,
        error: 'Interview not found'
      };
    }
    
    return {
      success: true,
      interview
    };
  } catch (error) {
    console.error('Error fetching interview:', error);
    return {
      success: false,
      error: 'Failed to fetch interview'
    };
  }
};

export const scheduleInterview = async (interviewData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const newInterview = {
      id: Date.now(),
      ...interviewData,
      status: 'Scheduled',
      feedback: null,
      rating: null
    };
    
    mockInterviews.push(newInterview);
    
    return {
      success: true,
      interview: newInterview,
      message: 'Interview scheduled successfully'
    };
  } catch (error) {
    console.error('Error scheduling interview:', error);
    return {
      success: false,
      error: 'Failed to schedule interview'
    };
  }
};

export const updateInterview = async (interviewId, updates) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const interviewIndex = mockInterviews.findIndex(i => i.id === parseInt(interviewId));
    
    if (interviewIndex === -1) {
      return {
        success: false,
        error: 'Interview not found'
      };
    }
    
    mockInterviews[interviewIndex] = {
      ...mockInterviews[interviewIndex],
      ...updates
    };
    
    return {
      success: true,
      interview: mockInterviews[interviewIndex],
      message: 'Interview updated successfully'
    };
  } catch (error) {
    console.error('Error updating interview:', error);
    return {
      success: false,
      error: 'Failed to update interview'
    };
  }
};

export const cancelInterview = async (interviewId, reason = '') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const interviewIndex = mockInterviews.findIndex(i => i.id === parseInt(interviewId));
    
    if (interviewIndex === -1) {
      return {
        success: false,
        error: 'Interview not found'
      };
    }
    
    mockInterviews[interviewIndex].status = 'Cancelled';
    mockInterviews[interviewIndex].cancellationReason = reason;
    
    return {
      success: true,
      message: 'Interview cancelled successfully'
    };
  } catch (error) {
    console.error('Error cancelling interview:', error);
    return {
      success: false,
      error: 'Failed to cancel interview'
    };
  }
};

export const completeInterview = async (interviewId, feedback, rating) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const interviewIndex = mockInterviews.findIndex(i => i.id === parseInt(interviewId));
    
    if (interviewIndex === -1) {
      return {
        success: false,
        error: 'Interview not found'
      };
    }
    
    mockInterviews[interviewIndex].status = 'Completed';
    mockInterviews[interviewIndex].feedback = feedback;
    mockInterviews[interviewIndex].rating = rating;
    mockInterviews[interviewIndex].completedAt = new Date().toISOString();
    
    return {
      success: true,
      interview: mockInterviews[interviewIndex],
      message: 'Interview completed successfully'
    };
  } catch (error) {
    console.error('Error completing interview:', error);
    return {
      success: false,
      error: 'Failed to complete interview'
    };
  }
};

export const getUpcomingInterviews = async (days = 7) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);
    
    const upcomingInterviews = mockInterviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      return interviewDate >= today && 
             interviewDate <= futureDate && 
             interview.status !== 'Completed' && 
             interview.status !== 'Cancelled';
    });
    
    return {
      success: true,
      interviews: upcomingInterviews
    };
  } catch (error) {
    console.error('Error fetching upcoming interviews:', error);
    return {
      success: false,
      error: 'Failed to fetch upcoming interviews',
      interviews: []
    };
  }
};

export const getInterviewsByCandidate = async (candidateId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const candidateInterviews = mockInterviews.filter(
      interview => interview.candidateId === parseInt(candidateId)
    );
    
    return {
      success: true,
      interviews: candidateInterviews
    };
  } catch (error) {
    console.error('Error fetching candidate interviews:', error);
    return {
      success: false,
      error: 'Failed to fetch candidate interviews',
      interviews: []
    };
  }
};

export const getInterviewStats = async (dateRange = '30days') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Calculate stats based on date range
    const stats = {
      scheduled: mockInterviews.filter(i => i.status === 'Scheduled').length,
      completed: mockInterviews.filter(i => i.status === 'Completed').length,
      cancelled: mockInterviews.filter(i => i.status === 'Cancelled').length,
      pending: mockInterviews.filter(i => i.status === 'Pending').length,
      averageRating: 4.2,
      averageDuration: 65,
      totalInterviews: mockInterviews.length,
      interviewTypes: [
        { type: 'Technical', count: 18, percentage: 40 },
        { type: 'Behavioral', count: 15, percentage: 33 },
        { type: 'Portfolio Review', count: 8, percentage: 18 },
        { type: 'System Design', count: 4, percentage: 9 }
      ]
    };
    
    return {
      success: true,
      stats
    };
  } catch (error) {
    console.error('Error fetching interview stats:', error);
    return {
      success: false,
      error: 'Failed to fetch interview stats'
    };
  }
};

export const getAvailableTimeSlots = async (date, interviewerId = null) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock available time slots
    const timeSlots = [
      { time: '9:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: true },
      { time: '1:00 PM', available: true },
      { time: '2:00 PM', available: false },
      { time: '3:00 PM', available: true },
      { time: '4:00 PM', available: true }
    ];
    
    return {
      success: true,
      timeSlots
    };
  } catch (error) {
    console.error('Error fetching time slots:', error);
    return {
      success: false,
      error: 'Failed to fetch available time slots',
      timeSlots: []
    };
  }
};

export const sendInterviewReminder = async (interviewId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would send email/SMS reminders
    return {
      success: true,
      message: 'Interview reminder sent successfully'
    };
  } catch (error) {
    console.error('Error sending interview reminder:', error);
    return {
      success: false,
      error: 'Failed to send interview reminder'
    };
  }
};

export const generateInterviewReport = async (filters = {}) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock report data
    const reportData = {
      totalInterviews: mockInterviews.length,
      completionRate: 84.5,
      averageRating: 4.2,
      feedbackSummary: 'Generally positive feedback with strong technical candidates',
      recommendations: [
        'Increase technical interview duration for senior roles',
        'Add more behavioral questions for leadership positions',
        'Implement structured feedback forms'
      ]
    };
    
    return {
      success: true,
      report: reportData
    };
  } catch (error) {
    console.error('Error generating interview report:', error);
    return {
      success: false,
      error: 'Failed to generate interview report'
    };
  }
};