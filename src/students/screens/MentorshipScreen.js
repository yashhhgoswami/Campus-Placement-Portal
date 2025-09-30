import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentLayout from '../components/StudentLayout';
import {
  getAllMentors,
  getActiveMentorships,
  getStudentMentorshipRequests,
  requestMentorship,
  cancelMentorshipRequest
} from '../services/mentorshipService';
import {
  MdPeople,
  MdStar,
  MdWork,
  MdMessage,
  MdCancel,
  MdCheckCircle,
  MdPending,
  MdSearch,
  MdFilter
} from 'react-icons/md';

const MentorshipScreen = () => {
  const { user } = useAuth();
  const [mentors, setMentors] = useState([]);
  const [activeMentorships, setActiveMentorships] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestGoals, setRequestGoals] = useState(['']);
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);

  const loadMentorshipData = useCallback(async () => {
    try {
      setLoading(true);
      const [mentorsResult, mentorshipsResult, requestsResult] = await Promise.all([
        getAllMentors(),
        getActiveMentorships(user?.id || 1),
        getStudentMentorshipRequests(user?.id || 1)
      ]);

      setMentors(mentorsResult.mentors);
      setActiveMentorships(mentorshipsResult.mentorships);
      setMentorshipRequests(requestsResult.requests);
    } catch (error) {
      console.error('Error loading mentorship data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadMentorshipData();
  }, [loadMentorshipData]);

  const handleRequestMentorship = (mentor) => {
    setSelectedMentor(mentor);
    setShowRequestModal(true);
    setRequestMessage(
      `Hi ${mentor.name.split(' ')[0]}, I'm interested in your mentorship and would love to learn from your experience in ${mentor.expertise[0]}.`
    );
  };

  const submitMentorshipRequest = async () => {
    if (!selectedMentor || !requestMessage.trim()) return;

    try {
      setSubmitting(true);
      const goals = requestGoals.filter((goal) => goal.trim() !== '');

      await requestMentorship(selectedMentor.id, user?.id || 1, requestMessage, goals);

      setShowRequestModal(false);
      setRequestMessage('');
      setRequestGoals(['']);
      setSelectedMentor(null);

      await loadMentorshipData();

      alert('Mentorship request sent successfully!');
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelRequest = async (requestId) => {
    if (!window.confirm('Are you sure you want to cancel this request?')) return;

    try {
      await cancelMentorshipRequest(requestId, user?.id || 1);
      await loadMentorshipData();
      alert('Request cancelled successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  const addGoal = () => {
    setRequestGoals([...requestGoals, '']);
  };

  const updateGoal = (index, value) => {
    const newGoals = [...requestGoals];
    newGoals[index] = value;
    setRequestGoals(newGoals);
  };

  const removeGoal = (index) => {
    const newGoals = requestGoals.filter((_, i) => i !== index);
    setRequestGoals(newGoals);
  };

  const filteredMentors = useMemo(() =>
    mentors.filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesExpertise =
        expertiseFilter === 'all' ||
        mentor.expertise.some((exp) => exp.toLowerCase().includes(expertiseFilter.toLowerCase()));

      return matchesSearch && matchesExpertise;
    }),
    [mentors, searchTerm, expertiseFilter]
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <MdPending className="text-yellow-500" />;
      case 'accepted':
        return <MdCheckCircle className="text-green-500" />;
      case 'rejected':
        return <MdCancel className="text-red-500" />;
      default:
        return null;
    }
  };

  const pendingRequestsCount = mentorshipRequests.filter((request) => request.status === 'pending').length;

  const headerContent = (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-blue-600">Faculty Mentorship</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Connect with faculty mentors</h1>
        <p className="mt-2 text-sm text-slate-600 max-w-xl">
          Request guidance from experienced faculty members in your institute. Get personalized mentorship for your academic and career journey.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('discover')}
          className="hidden sm:inline-flex items-center rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:text-blue-800"
        >
          Browse mentors
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          View My Requests
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <StudentLayout header={headerContent} sidebarProps={{ pendingRequestsCount }}>
        <div className="flex h-72 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
            <p className="mt-4 text-sm text-slate-500">Loading mentorship opportunities...</p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout header={headerContent} sidebarProps={{ pendingRequestsCount }}>
      <div className="rounded-2xl border border-slate-200 bg-white px-4 pt-4">
        <div className="flex flex-wrap gap-4 border-b border-slate-100 px-2">
          <button
            onClick={() => setActiveTab('discover')}
            className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full ${
              activeTab === 'discover'
                ? 'text-blue-600 after:bg-blue-500'
                : 'text-slate-500 hover:text-slate-700 after:bg-transparent'
            }`}
          >
            Discover Mentors
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full ${
              activeTab === 'requests'
                ? 'text-blue-600 after:bg-blue-500'
                : 'text-slate-500 hover:text-slate-700 after:bg-transparent'
            }`}
          >
            My Requests
            {pendingRequestsCount > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
                {pendingRequestsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full ${
              activeTab === 'active'
                ? 'text-blue-600 after:bg-blue-500'
                : 'text-slate-500 hover:text-slate-700 after:bg-transparent'
            }`}
          >
            Active Mentorships
            {activeMentorships.length > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                {activeMentorships.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === 'discover' && (
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search faculty mentors by name, department, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm shadow-inner focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div className="relative">
                  <MdFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={expertiseFilter}
                    onChange={(e) => setExpertiseFilter(e.target.value)}
                    className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-8 text-sm focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="all">All Expertise</option>
                    <option value="software">Software Development</option>
                    <option value="product">Product Management</option>
                    <option value="design">Design</option>
                    <option value="research">Research</option>
                    <option value="leadership">Leadership</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {filteredMentors.map((mentor) => (
                <div key={mentor.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
                      {mentor.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{mentor.name}</h3>
                      <p className="text-sm text-slate-600">{mentor.title}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-amber-500">
                      <MdStar className="text-base" />
                      <span>{mentor.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center">
                      <MdWork className="mr-2 text-slate-400" />
                      {mentor.position}, {mentor.department}
                    </div>
                    <div className="flex items-center">
                      <MdPeople className="mr-2 text-slate-400" />
                      {mentor.totalMentees} mentees • Industry: {mentor.company}
                    </div>
                  </div>

                  <p className="mb-4 line-clamp-3 text-sm text-slate-700">{mentor.bio}</p>

                  <div className="mb-4">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.slice(0, 4).map((skill, index) => (
                        <span key={index} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        mentor.availableSlots > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {mentor.availableSlots > 0
                        ? `${mentor.availableSlots} slots available`
                        : 'Fully booked'}
                    </span>
                    <button
                      onClick={() => handleRequestMentorship(mentor)}
                      disabled={
                        mentor.availableSlots <= 0 ||
                        mentorshipRequests.some((request) => request.mentorId === mentor.id)
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        mentor.availableSlots > 0 &&
                        !mentorshipRequests.some((request) => request.mentorId === mentor.id)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {mentorshipRequests.some((request) => request.mentorId === mentor.id)
                        ? 'Requested'
                        : 'Request mentorship'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredMentors.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                <MdPeople className="mx-auto text-4xl text-slate-300" />
                <p className="mt-4 text-sm font-medium text-slate-700">No mentors match your filters yet.</p>
                <p className="mt-2 text-xs text-slate-500">Try adjusting your search or explore a different expertise area.</p>
              </div>
            )}
          </section>
        )}

        {activeTab === 'requests' && (
          <section>
            {mentorshipRequests.length > 0 ? (
              <div className="space-y-4">
                {mentorshipRequests.map((request) => (
                  <div key={request.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                            {request.mentor.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{request.mentor.name}</h3>
                            <p className="text-sm text-slate-600">
                              {request.mentor.title} at {request.mentor.company}
                            </p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-slate-800">Your message</h4>
                          <p className="mt-1 text-sm text-slate-600">{request.message}</p>
                        </div>

                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-slate-800">Goals</h4>
                          <ul className="mt-1 space-y-1 text-sm text-slate-600">
                            {request.goals.map((goal, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <p className="text-xs text-slate-500">
                          Requested on {new Date(request.requestDate).toLocaleDateString()}
                          {request.acceptedDate && (
                            <>
                              {' '}
                              • Accepted on {new Date(request.acceptedDate).toLocaleDateString()}
                            </>
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                          request.status === 'pending'
                            ? 'bg-amber-50 text-amber-700'
                            : request.status === 'accepted'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-600'
                        }`}>
                          {getStatusIcon(request.status)}
                          <span className="capitalize">{request.status}</span>
                        </div>
                        {request.status === 'pending' && (
                          <button
                            onClick={() => handleCancelRequest(request.id)}
                            className="text-sm font-medium text-rose-600 underline-offset-4 hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                <MdMessage className="mx-auto text-4xl text-slate-300" />
                <p className="mt-4 text-sm font-semibold text-slate-700">No mentorship requests yet</p>
                <p className="mt-2 text-xs text-slate-500">
                  Start building your mentorship journey by reaching out to experienced faculty mentors.
                </p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Discover mentors
                </button>
              </div>
            )}
          </section>
        )}

        {activeTab === 'active' && (
          <section>
            {activeMentorships.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {activeMentorships.map((mentorship) => (
                  <div key={mentorship.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
                        {mentorship.mentor.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">{mentorship.mentor.name}</h3>
                        <p className="text-sm text-slate-600">
                          {mentorship.mentor.title} at {mentorship.mentor.company}
                        </p>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <p>Started {new Date(mentorship.startDate).toLocaleDateString()}</p>
                        <p>{mentorship.totalSessions} sessions completed</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">Progress</h4>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>Overall progress</span>
                            <span>{mentorship.progress}%</span>
                          </div>
                          <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{ width: `${mentorship.progress}%` }}
                            />
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-slate-500">Next session: {mentorship.nextSession}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">Goals</h4>
                        <ul className="mt-2 space-y-1 text-sm text-slate-600">
                          {mentorship.goals.map((goal, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                        Schedule session
                      </button>
                      <button className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                        Send message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                <MdPeople className="mx-auto text-4xl text-slate-300" />
                <p className="mt-4 text-sm font-semibold text-slate-700">No active mentorships yet</p>
                <p className="mt-2 text-xs text-slate-500">Request a mentor to start your personalised growth journey.</p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Find a mentor
                </button>
              </div>
            )}
          </section>
        )}
      </div>

      {showRequestModal && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Request mentorship</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Personalise your message to let the mentor know how they can support you best.
                </p>
              </div>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-2xl text-slate-400 transition hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {selectedMentor.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedMentor.name}</h3>
                  <p className="text-xs text-slate-600">
                    {selectedMentor.position}, {selectedMentor.department} • Industry: {selectedMentor.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">Your message</label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Introduce yourself and share what you hope to learn from this mentor..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">Your goals</label>
                <div className="space-y-2">
                  {requestGoals.map((goal, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => updateGoal(index, e.target.value)}
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="What outcomes are you aiming for?"
                      />
                      {requestGoals.length > 1 && (
                        <button
                          onClick={() => removeGoal(index)}
                          className="rounded-lg border border-rose-100 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addGoal}
                  className="mt-3 inline-flex items-center text-xs font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  + Add another goal
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowRequestModal(false)}
                disabled={submitting}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={submitMentorshipRequest}
                disabled={submitting || !requestMessage.trim()}
                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Sending...' : 'Send request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default MentorshipScreen;