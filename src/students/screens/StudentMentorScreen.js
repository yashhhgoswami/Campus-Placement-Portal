import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentLayout from '../components/StudentLayout';
import {
  MdPeople,
  MdSearch,
  MdLocationOn,
  MdSchool,
  MdMessage,
  MdConnectWithoutContact,
  MdVerified
} from 'react-icons/md';

const StudentMentorScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const loadMentorData = async () => {
      try {
        setLoading(true);
        const mockMentors = [
          {
            id: 1,
            name: 'Prof. Arjun Sharma',
            yearsOfExperience: 12,
            specialization: 'Computer Science & Engineering',
            institution: 'IIT Bombay',
            role: 'Associate Professor',
            location: 'Mumbai, India',
            graduationYear: 2010,
            expertise: ['Full Stack Development', 'Industry Projects', 'Placements'],
            isVerified: true,
            connections: 248,
            availableSlots: 3,
            profileImage: 'https://via.placeholder.com/150'
          },
          {
            id: 2,
            name: 'Dr. Priya Patel',
            yearsOfExperience: 15,
            specialization: 'Business Administration',
            institution: 'IIM Ahmedabad',
            role: 'Professor & TPO Lead',
            location: 'Ahmedabad, India',
            graduationYear: 2008,
            expertise: ['Strategic Management', 'Industry Collaborations', 'Leadership'],
            isVerified: true,
            connections: 312,
            availableSlots: 5,
            profileImage: 'https://via.placeholder.com/150'
          },
          {
            id: 3,
            name: 'Prof. Sneha Agarwal',
            yearsOfExperience: 9,
            specialization: 'Data Science',
            institution: 'BITS Pilani',
            role: 'Assistant Professor',
            location: 'Pilani, India',
            graduationYear: 2013,
            expertise: ['Machine Learning', 'Career Guidance', 'Research Mentorship'],
            isVerified: true,
            connections: 189,
            availableSlots: 2,
            profileImage: 'https://via.placeholder.com/150'
          }
        ];
        setMentors(mockMentors);
      } catch (error) {
        console.error('Failed to load mentor data', error);
      } finally {
        setLoading(false);
      }
    };

    loadMentorData();
  }, []);

  const filteredMentors = useMemo(
    () =>
      mentors
        .filter((mentor) => {
          if (!searchTerm) return true;
          const query = searchTerm.toLowerCase();
          return (
            mentor.name.toLowerCase().includes(query) ||
            mentor.specialization.toLowerCase().includes(query) ||
            mentor.expertise.some((item) => item.toLowerCase().includes(query))
          );
        })
        .filter((mentor) => {
          if (filterBy === 'all') return true;
          if (filterBy === 'verified') return mentor.isVerified;
          if (filterBy === 'available') return mentor.availableSlots > 0;
          return true;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case 'name':
              return a.name.localeCompare(b.name);
            case 'experience':
              return b.yearsOfExperience - a.yearsOfExperience;
            case 'slots':
              return b.availableSlots - a.availableSlots;
            default:
              return b.graduationYear - a.graduationYear;
          }
        }),
    [mentors, searchTerm, filterBy, sortBy]
  );

  const handleConnect = (mentorId) => {
    console.log('Requesting mentorship with mentor', mentorId, 'from student', user?.name);
  };

  const handleMessage = (mentorId) => {
    console.log('Sending message to mentor', mentorId, 'from student', user?.name);
  };

  const headerContent = (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-indigo-600">Faculty mentor network</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Connect with faculty mentors</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Discover verified mentors, explore their expertise, and request guidance to accelerate your placement journey.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setFilterBy('available')}
          className="hidden sm:inline-flex items-center rounded-lg border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:border-indigo-300 hover:text-indigo-800"
        >
          Available this week
        </button>
        <button
          onClick={() => setFilterBy('verified')}
          className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          View verified mentors
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <StudentLayout header={headerContent}>
        <div className="flex h-72 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600" />
            <p className="mt-4 text-sm text-slate-500">Loading mentor network...</p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout header={headerContent}>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search mentors by name, expertise, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm shadow-inner focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="all">All mentors</option>
            <option value="verified">Verified mentors</option>
            <option value="available">Available this week</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="recent">Newest mentors</option>
            <option value="name">Name (A-Z)</option>
            <option value="experience">Experience</option>
            <option value="slots">Available slots</option>
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <img
                src={mentor.profileImage}
                alt={mentor.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-lg font-semibold text-slate-900">{mentor.name}</h3>
                  {mentor.isVerified && <MdVerified className="text-indigo-500" />}
                </div>
                <p className="text-indigo-600 text-sm font-semibold">{mentor.role}</p>
                <p className="text-sm text-slate-600">{mentor.institution}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center">
                    <MdSchool className="mr-1 text-slate-400" />
                    {mentor.specialization}
                  </span>
                  <span className="flex items-center">
                    <MdLocationOn className="mr-1 text-slate-400" />
                    {mentor.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.slice(0, 4).map((item, index) => (
                  <span key={index} className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    {item}
                  </span>
                ))}
                {mentor.expertise.length > 4 && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                    +{mentor.expertise.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{mentor.yearsOfExperience} years experience</span>
                <span>{mentor.connections} mentorships</span>
              </div>
              <div className="text-sm font-semibold text-emerald-600">
                {mentor.availableSlots > 0 ? `${mentor.availableSlots} slots available this week` : 'Booked for this week'}
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => handleConnect(mentor.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <MdConnectWithoutContact className="text-base" />
                Request mentorship
              </button>
              <button
                onClick={() => handleMessage(mentor.id)}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-indigo-200 hover:text-indigo-700"
              >
                <MdMessage className="text-base" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {filteredMentors.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <MdPeople className="mx-auto text-4xl text-slate-300" />
          <p className="mt-4 text-sm font-semibold text-slate-700">No mentors found</p>
          <p className="mt-2 text-xs text-slate-500">Try adjusting your search criteria or filters to explore more mentors.</p>
        </div>
      )}
    </StudentLayout>
  );
};

export default StudentMentorScreen;
