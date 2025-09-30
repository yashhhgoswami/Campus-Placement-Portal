import React, { useState, useEffect } from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdCalendarToday, 
  MdAccessTime, 
  MdPerson, 
  MdVideoCall,
  MdLocationOn,
  MdAdd,
  MdEdit,
  MdDelete,
  MdCheck,
  MdClose,
  MdSchedule,
  MdPhone,
  MdEmail,
  MdFilterList,
  MdSearch
} from 'react-icons/md';

const InterviewsScreen = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // Mock data for interviews
  useEffect(() => {
    const mockInterviews = [
      {
        id: 1,
        candidateName: 'Rajesh Kumar',
        candidateEmail: 'rajesh.kumar@email.com',
        position: 'Software Engineer',
        type: 'Technical Interview',
        date: '2025-10-05',
        time: '10:00 AM',
        duration: 60,
        status: 'Scheduled',
        interviewer: 'Priya Agarwal',
        location: 'Video Call',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        notes: 'Focus on React and Node.js experience, discuss fintech projects',
        round: 'Round 2'
      },
      {
        id: 2,
        candidateName: 'Sneha Patel',
        candidateEmail: 'sneha.patel@email.com',
        position: 'UX Designer',
        type: 'Portfolio Review',
        date: '2025-10-03',
        time: '2:00 PM',
        duration: 45,
        status: 'Completed',
        interviewer: 'Vikram Shah',
        location: 'Bangalore Office - Conference Room 1',
        meetingLink: null,
        notes: 'Review mobile-first design portfolio and discuss Indian user experience',
        round: 'Round 1'
      },
      {
        id: 3,
        candidateName: 'Arjun Gupta',
        candidateEmail: 'arjun.gupta@email.com',
        position: 'Product Manager',
        type: 'Behavioral Interview',
        date: '2025-10-04',
        time: '11:30 AM',
        duration: 45,
        status: 'Confirmed',
        interviewer: 'Meera Krishnan',
        location: 'Video Call',
        meetingLink: 'https://zoom.us/j/123456789',
        notes: 'Leadership and product strategy for Indian market',
        round: 'Round 3'
      },
      {
        id: 4,
        candidateName: 'Kavya Reddy',
        candidateEmail: 'kavya.reddy@email.com',
        position: 'Data Scientist',
        type: 'Technical Assessment',
        date: '2025-10-06',
        time: '3:30 PM',
        duration: 90,
        status: 'Pending',
        interviewer: 'Rohit Jain',
        location: 'Hyderabad Office - Tech Lab',
        meetingLink: null,
        notes: 'Machine learning and Python coding challenge, focus on retail analytics',
        round: 'Round 2'
      },
      {
        id: 5,
        candidateName: 'Aditya Mishra',
        candidateEmail: 'aditya.mishra@email.com',
        position: 'Software Engineer',
        type: 'System Design',
        date: '2025-10-02',
        time: '4:00 PM',
        duration: 60,
        status: 'Completed',
        interviewer: 'Ankit Verma',
        location: 'Video Call',
        meetingLink: 'https://teams.microsoft.com/xyz',
        notes: 'Design scalable web application for Indian e-commerce',
        round: 'Round 3'
      }
    ];

    setTimeout(() => {
      setInterviews(mockInterviews);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-purple-600 bg-purple-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getInterviewTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'technical interview':
      case 'technical assessment':
        return MdSchedule;
      case 'behavioral interview':
        return MdPerson;
      case 'portfolio review':
        return MdEdit;
      case 'system design':
        return MdSchedule;
      default:
        return MdCalendarToday;
    }
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || interview.status.toLowerCase() === filterBy.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const upcomingInterviews = filteredInterviews.filter(interview => 
    new Date(interview.date) >= new Date() && interview.status !== 'Completed'
  );

  const pastInterviews = filteredInterviews.filter(interview => 
    new Date(interview.date) < new Date() || interview.status === 'Completed'
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading interviews...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Interviews</h1>
                <p className="text-gray-600">Schedule & manage candidate interviews</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Calendar
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200">
                  <MdAdd />
                  <span>Schedule Interview</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search interviews by candidate, position, or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <MdFilterList className="text-gray-400" />
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Interviews</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <MdCalendarToday className="text-blue-600 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <MdSchedule className="text-green-600 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Confirmation</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                  <MdAccessTime className="text-yellow-600 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">28</p>
                  </div>
                  <MdCheck className="text-purple-600 text-2xl" />
                </div>
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h2>
              </div>
              <div className="p-6">
                {upcomingInterviews.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview) => {
                      const TypeIcon = getInterviewTypeIcon(interview.type);
                      
                      return (
                        <div key={interview.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <TypeIcon className="text-orange-600 text-xl" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{interview.candidateName}</h3>
                                <p className="text-sm text-gray-600">{interview.position} - {interview.type}</p>
                                <p className="text-sm text-gray-500">{interview.round}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-1">
                                <MdCalendarToday className="text-gray-400 text-sm" />
                                <span className="text-sm font-medium text-gray-900">{interview.date}</span>
                              </div>
                              <div className="flex items-center space-x-2 mb-1">
                                <MdAccessTime className="text-gray-400 text-sm" />
                                <span className="text-sm text-gray-600">{interview.time} ({interview.duration} min)</span>
                              </div>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                                {interview.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <MdPerson className="text-gray-400" />
                                <span>{interview.interviewer}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {interview.location.includes('Video') ? (
                                  <MdVideoCall className="text-gray-400" />
                                ) : (
                                  <MdLocationOn className="text-gray-400" />
                                )}
                                <span>{interview.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <MdEdit />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                <MdCheck />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <MdClose />
                              </button>
                            </div>
                          </div>
                          
                          {interview.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">{interview.notes}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MdCalendarToday className="mx-auto text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-600">No upcoming interviews scheduled</p>
                  </div>
                )}
              </div>
            </div>

            {/* Past Interviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Past Interviews</h2>
              </div>
              <div className="p-6">
                {pastInterviews.length > 0 ? (
                  <div className="space-y-4">
                    {pastInterviews.map((interview) => {
                      const TypeIcon = getInterviewTypeIcon(interview.type);
                      
                      return (
                        <div key={interview.id} className="border border-gray-200 rounded-lg p-4 opacity-75">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                <TypeIcon className="text-gray-500 text-xl" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-700">{interview.candidateName}</h3>
                                <p className="text-sm text-gray-500">{interview.position} - {interview.type}</p>
                                <p className="text-sm text-gray-400">{interview.round}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-1">
                                <MdCalendarToday className="text-gray-400 text-sm" />
                                <span className="text-sm text-gray-600">{interview.date}</span>
                              </div>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                                {interview.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MdSchedule className="mx-auto text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-600">No past interviews found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsScreen;