// Mock data for mentorship service - Faculty mentors from the same institute
const mockMentors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    title: 'Assistant Professor, Computer Science',
    company: 'VIT University',
    department: 'Computer Science & Engineering',
    position: 'Assistant Professor',
    expertise: ['Software Development', 'Machine Learning', 'Data Structures'],
    bio: 'PhD in Computer Science with 8+ years of teaching experience. Specializes in software engineering and machine learning. Passionate about mentoring students in technical skills and career development.',
    rating: 4.8,
    totalMentees: 15,
    availableSlots: 3,
    profileImage: null,
    status: 'available',
    graduationYear: 2015
  },
  {
    id: 2,
    name: 'Prof. Rajesh Kumar',
    title: 'Associate Professor, Management Studies',
    company: 'VIT University', 
    department: 'School of Management',
    position: 'Associate Professor',
    expertise: ['Business Strategy', 'Entrepreneurship', 'Leadership'],
    bio: 'MBA from IIM Ahmedabad with 12+ years in academia and industry. Former consultant with expertise in business strategy and startup mentorship. Guides students in management careers.',
    rating: 4.7,
    totalMentees: 22,
    availableSlots: 2,
    profileImage: null,
    status: 'available',
    graduationYear: 2012
  },
  {
    id: 3,
    name: 'Dr. Kavita Nair',
    title: 'Professor, Computer Science',
    company: 'VIT University',
    department: 'Computer Science & Engineering',
    position: 'Professor',
    expertise: ['Artificial Intelligence', 'Research Methodology', 'PhD Guidance'],
    bio: 'PhD in Computer Science from IIT Delhi with 15+ years of research experience. Published 40+ papers in AI/ML. Specializes in guiding students towards research careers and higher studies.',
    rating: 4.9,
    totalMentees: 8,
    availableSlots: 1,
    profileImage: null,
    status: 'available',
    graduationYear: 2008
  },
  {
    id: 4,
    name: 'Dr. Rohan Mehta',
    title: 'Assistant Professor, Design',
    company: 'VIT University',
    department: 'School of Design',
    position: 'Assistant Professor',
    expertise: ['UI/UX Design', 'Human-Computer Interaction', 'Design Thinking'],
    bio: 'PhD in Design with industry experience at leading tech companies. Helps students build strong design portfolios and understand user experience principles.',
    rating: 4.6,
    totalMentees: 12,
    availableSlots: 2,
    profileImage: null,
    status: 'available',
    graduationYear: 2017
  },
  {
    id: 5,
    name: 'Prof. Anita Singh',
    title: 'Associate Professor, Electronics',
    company: 'VIT University',
    department: 'Electronics & Communication',
    position: 'Associate Professor',
    expertise: ['Embedded Systems', 'IoT', 'Circuit Design'],
    bio: 'M.Tech from NIT with 10+ years of teaching experience. Industry collaborations with electronics companies. Mentors students in hardware design and embedded systems.',
    rating: 4.5,
    totalMentees: 18,
    availableSlots: 1,
    profileImage: null,
    status: 'available',
    graduationYear: 2014
  },
  {
    id: 6,
    name: 'Dr. Vikram Patel',
    title: 'Professor, Mechanical Engineering',
    company: 'VIT University',
    department: 'Mechanical Engineering',
    position: 'Professor',
    expertise: ['Automotive Engineering', 'CAD/CAM', 'Project Management'],
    bio: 'PhD in Mechanical Engineering with automotive industry background. Former design engineer at Tata Motors. Guides students in core engineering and automotive careers.',
    rating: 4.7,
    totalMentees: 20,
    availableSlots: 0,
    profileImage: null,
    status: 'busy',
    graduationYear: 2010
  }
];

const mockMentorshipRequests = [
  {
    id: 1,
    studentId: 1,
    mentorId: 1,
    status: 'pending',
    requestDate: '2025-09-25',
    message: 'Dear Dr. Sharma, I am interested in improving my programming skills and would greatly appreciate your mentorship in software development.',
    goals: ['Master data structures and algorithms', 'Learn software engineering best practices', 'Prepare for technical interviews']
  },
  {
    id: 2,
    studentId: 1,
    mentorId: 2,
    status: 'accepted',
    requestDate: '2025-09-20',
    acceptedDate: '2025-09-22',
    message: 'Dear Prof. Kumar, I am exploring management and entrepreneurship as career paths and would love your guidance.',
    goals: ['Understand business strategy', 'Develop leadership skills', 'Learn about startup ecosystem']
  }
];

const mockActiveMentorships = [
  {
    id: 1,
    studentId: 1,
    mentorId: 2,
    startDate: '2025-09-22',
    status: 'active',
    nextSession: '2025-10-05',
    totalSessions: 3,
    goals: ['Understand business strategy', 'Develop leadership skills', 'Learn about startup ecosystem'],
    progress: 65
  },
  {
    id: 2,
    studentId: 1,
    mentorId: 3,
    startDate: '2025-09-15',
    status: 'active',
    nextSession: '2025-10-08',
    totalSessions: 5,
    goals: ['Research methodology', 'Paper writing skills', 'Graduate school preparation'],
    progress: 40
  }
];

export const getAllMentors = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      mentors: mockMentors,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch mentors');
  }
};

export const getMentorById = async (mentorId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mentor = mockMentors.find(m => m.id === parseInt(mentorId));
    if (!mentor) {
      throw new Error('Mentor not found');
    }
    
    return {
      mentor,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch mentor details');
  }
};

export const requestMentorship = async (mentorId, studentId, message, goals) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mentor = mockMentors.find(m => m.id === parseInt(mentorId));
    if (!mentor) {
      throw new Error('Mentor not found');
    }
    
    if (mentor.availableSlots <= 0) {
      throw new Error('This mentor has no available slots at the moment');
    }
    
    // Check if already requested
    const existingRequest = mockMentorshipRequests.find(
      r => r.studentId === parseInt(studentId) && r.mentorId === parseInt(mentorId)
    );
    
    if (existingRequest) {
      throw new Error('You have already sent a request to this mentor');
    }
    
    const newRequest = {
      id: mockMentorshipRequests.length + 1,
      studentId: parseInt(studentId),
      mentorId: parseInt(mentorId),
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      message,
      goals
    };
    
    mockMentorshipRequests.push(newRequest);
    
    return {
      message: `Mentorship request sent to ${mentor.name}! They will review and respond soon.`,
      request: newRequest,
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to send mentorship request');
  }
};

export const getStudentMentorshipRequests = async (studentId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const requests = mockMentorshipRequests
      .filter(r => r.studentId === parseInt(studentId))
      .map(request => {
        const mentor = mockMentors.find(m => m.id === request.mentorId);
        return {
          ...request,
          mentor
        };
      });
    
    return {
      requests,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch mentorship requests');
  }
};

export const getActiveMentorships = async (studentId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const mentorships = mockActiveMentorships
      .filter(m => m.studentId === parseInt(studentId))
      .map(mentorship => {
        const mentor = mockMentors.find(m => m.id === mentorship.mentorId);
        return {
          ...mentorship,
          mentor
        };
      });
    
    return {
      mentorships,
      success: true
    };
  } catch (error) {
    throw new Error('Failed to fetch active mentorships');
  }
};

export const cancelMentorshipRequest = async (requestId, studentId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const requestIndex = mockMentorshipRequests.findIndex(
      r => r.id === parseInt(requestId) && r.studentId === parseInt(studentId)
    );
    
    if (requestIndex === -1) {
      throw new Error('Request not found');
    }
    
    mockMentorshipRequests.splice(requestIndex, 1);
    
    return {
      message: 'Mentorship request cancelled successfully',
      success: true
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to cancel request');
  }
};