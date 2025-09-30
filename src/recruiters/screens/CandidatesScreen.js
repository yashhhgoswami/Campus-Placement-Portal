import React, { useState, useEffect } from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdPerson, 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdWork, 
  MdSchool,
  MdSearch,
  MdFilterList,
  MdDownload,
  MdStar,
  MdStarBorder,
  MdVisibility,
  MdMessage,
  MdCalendarToday
} from 'react-icons/md';

const CandidatesScreen = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  // Mock data for candidates
  useEffect(() => {
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
        summary: 'Full-stack developer with expertise in modern web technologies, experienced in building scalable applications for Indian fintech companies...'
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
        summary: 'Experienced product manager with a track record of launching successful products in Indian e-commerce and digital payments sector...'
      },
      {
        id: 3,
        name: 'Arjun Singh',
        email: 'arjun.singh@email.com',
        phone: '+91-9876543212',
        location: 'Delhi, NCR',
        position: 'Data Scientist',
        experience: '4 years',
        education: 'M.Tech Data Science - IISc Bangalore',
        skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
        rating: 4.7,
        status: 'Available',
        lastActive: '3 hours ago',
        appliedJobs: 5,
        avatar: null,
        summary: 'Data scientist specializing in machine learning and predictive analytics for Indian retail and healthcare domains...'
      },
      {
        id: 4,
        name: 'Sneha Patel',
        email: 'sneha.patel@email.com',
        phone: '+91-9876543213',
        location: 'Pune, Maharashtra',
        position: 'UX Designer',
        experience: '3 years',
        education: 'B.Des Design - NID Ahmedabad',
        skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
        rating: 4.6,
        status: 'Available',
        lastActive: '5 hours ago',
        appliedJobs: 4,
        avatar: null,
        summary: 'Creative UX designer focused on user-centered design and accessibility for Indian mobile-first applications...'
      }
    ];

    setTimeout(() => {
      setCandidates(mockCandidates);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || candidate.status.toLowerCase() === filterBy.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'interviewing': return 'text-blue-600 bg-blue-100';
      case 'hired': return 'text-purple-600 bg-purple-100';
      case 'declined': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<MdStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<MdStar key="half" className="text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<MdStarBorder key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading candidates...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
                <p className="text-gray-600">Manage your candidate database</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200">
                  <MdDownload />
                  <span>Export</span>
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
                    placeholder="Search candidates by name, position, or skills..."
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
                    <option value="available">Available</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="hired">Hired</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="experience">Experience</option>
                  <option value="recent">Recently Active</option>
                </select>
              </div>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <MdPerson className="text-orange-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.position}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(candidate.rating)}
                    <span className="text-sm text-gray-600 ml-2">{candidate.rating}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MdWork className="mr-2 text-gray-400" />
                      <span>{candidate.experience} experience</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdLocationOn className="mr-2 text-gray-400" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdSchool className="mr-2 text-gray-400" />
                      <span>{candidate.education}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{candidate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {candidate.summary}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                        <MdVisibility />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <MdMessage />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <MdCalendarToday />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Active {candidate.lastActive}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCandidates.length === 0 && (
              <div className="text-center py-12">
                <MdPerson className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesScreen;