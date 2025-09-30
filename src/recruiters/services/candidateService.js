// Service for managing candidate database and operations
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Mock data for development
const mockCandidates = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91-9876543210',
    location: 'Bangalore, Karnataka',
    position: 'Software Engineer',
    experience: '5 years',
    education: 'B.Tech Computer Science - IIT Bombay',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    rating: 4.8,
    status: 'Available',
    lastActive: '2 days ago',
    appliedJobs: 3,
    avatar: null,
    summary: 'Full-stack developer with expertise in modern web technologies and fintech solutions...',
    resume: 'rajesh_kumar_resume.pdf',
    portfolio: 'https://rajeshkumar.dev',
    linkedIn: 'https://linkedin.com/in/rajeshkumar',
    expectedSalary: 1800000, // INR per annum
    noticePeriod: '30 days',
    workAuth: 'Indian Citizen'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543211',
    location: 'Mumbai, Maharashtra',
    position: 'Product Manager',
    experience: '7 years',
    education: 'MBA - IIM Ahmedabad',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
    rating: 4.9,
    status: 'Interviewing',
    lastActive: '1 day ago',
    appliedJobs: 2,
    avatar: null,
    summary: 'Experienced product manager with a track record of launching successful products in Indian e-commerce...',
    resume: 'priya_sharma_resume.pdf',
    portfolio: null,
    linkedIn: 'https://linkedin.com/in/priyasharma',
    expectedSalary: 2500000, // INR per annum
    noticePeriod: '60 days',
    workAuth: 'Indian Citizen'
  }
];

export const getCandidates = async (filters = {}) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredCandidates = [...mockCandidates];
    
    // Apply filters
    if (filters.status && filters.status !== 'all') {
      filteredCandidates = filteredCandidates.filter(
        candidate => candidate.status.toLowerCase() === filters.status.toLowerCase()
      );
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredCandidates = filteredCandidates.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm) ||
        candidate.position.toLowerCase().includes(searchTerm) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }
    
    return {
      success: true,
      candidates: filteredCandidates,
      total: filteredCandidates.length
    };
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return {
      success: false,
      error: 'Failed to fetch candidates',
      candidates: [],
      total: 0
    };
  }
};

export const getCandidateById = async (candidateId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const candidate = mockCandidates.find(c => c.id === parseInt(candidateId));
    
    if (!candidate) {
      return {
        success: false,
        error: 'Candidate not found'
      };
    }
    
    return {
      success: true,
      candidate
    };
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return {
      success: false,
      error: 'Failed to fetch candidate'
    };
  }
};

export const updateCandidateStatus = async (candidateId, status, notes = '') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would update the database
    const candidateIndex = mockCandidates.findIndex(c => c.id === parseInt(candidateId));
    
    if (candidateIndex === -1) {
      return {
        success: false,
        error: 'Candidate not found'
      };
    }
    
    mockCandidates[candidateIndex].status = status;
    
    return {
      success: true,
      message: 'Candidate status updated successfully'
    };
  } catch (error) {
    console.error('Error updating candidate status:', error);
    return {
      success: false,
      error: 'Failed to update candidate status'
    };
  }
};

export const addCandidateNotes = async (candidateId, notes) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would update the database
    return {
      success: true,
      message: 'Notes added successfully'
    };
  } catch (error) {
    console.error('Error adding notes:', error);
    return {
      success: false,
      error: 'Failed to add notes'
    };
  }
};

export const searchCandidates = async (query, filters = {}) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const searchTerm = query.toLowerCase();
    let results = mockCandidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm) ||
      candidate.position.toLowerCase().includes(searchTerm) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
      candidate.education.toLowerCase().includes(searchTerm) ||
      candidate.location.toLowerCase().includes(searchTerm)
    );
    
    // Apply additional filters
    if (filters.experience) {
      results = results.filter(candidate => {
        const years = parseInt(candidate.experience);
        switch (filters.experience) {
          case '0-2': return years <= 2;
          case '3-5': return years >= 3 && years <= 5;
          case '6-10': return years >= 6 && years <= 10;
          case '10+': return years > 10;
          default: return true;
        }
      });
    }
    
    if (filters.location) {
      results = results.filter(candidate =>
        candidate.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    return {
      success: true,
      candidates: results,
      total: results.length
    };
  } catch (error) {
    console.error('Error searching candidates:', error);
    return {
      success: false,
      error: 'Failed to search candidates',
      candidates: [],
      total: 0
    };
  }
};

export const getCandidateApplications = async (candidateId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock applications data
    const applications = [
      {
        id: 1,
        jobTitle: 'Senior Software Engineer - Fintech',
        company: 'PhonePe',
        status: 'Interview',
        appliedDate: '2025-09-15',
        lastUpdate: '2025-09-28'
      },
      {
        id: 2,
        jobTitle: 'Full Stack Developer',
        company: 'Zomato',
        status: 'Under Review',
        appliedDate: '2025-09-20',
        lastUpdate: '2025-09-25'
      }
    ];
    
    return {
      success: true,
      applications
    };
  } catch (error) {
    console.error('Error fetching candidate applications:', error);
    return {
      success: false,
      error: 'Failed to fetch applications',
      applications: []
    };
  }
};

export const getCandidateStats = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      stats: {
        total: mockCandidates.length,
        available: mockCandidates.filter(c => c.status === 'Available').length,
        interviewing: mockCandidates.filter(c => c.status === 'Interviewing').length,
        hired: mockCandidates.filter(c => c.status === 'Hired').length,
        averageRating: 4.7,
        newThisWeek: 12,
        newThisMonth: 45
      }
    };
  } catch (error) {
    console.error('Error fetching candidate stats:', error);
    return {
      success: false,
      error: 'Failed to fetch stats'
    };
  }
};