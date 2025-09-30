import StudentPlacementsScreen from './StudentPlacementsScreen';// Redirect to new placement screen// Redirect to new placement screen// Redirect to new placement screen



export default StudentPlacementsScreen;export { default } from './StudentPlacementsScreen';
export { default } from './StudentPlacementsScreen';export { default } from './StudentPlacementsScreen';

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    questions: {},
    dietaryRequirements: '',
    additionalInfo: ''
  });

  const loadEventsData = useCallback(async () => {
    setLoading(true);

    const mockEvents = [
      {
        id: 1,
        title: 'Alumni Career Fair 2024',
        description:
          'Connect with alumni from top Indian companies and explore career opportunities across various industries. Network with professionals from leading Indian corporations.',
        type: 'career',
        date: '2024-02-15',
        time: '10:00 AM - 4:00 PM',
        location: 'University Campus - Central Auditorium, Bangalore',
        mode: 'in-person',
        organizer: 'Career Services',
        organizerAvatar: 'https://via.placeholder.com/40x40/6B73FF/FFFFFF?text=CS',
        maxAttendees: 500,
        currentAttendees: 234,
        registrationDeadline: '2024-02-10',
        isPaid: false,
        price: 0,
        tags: ['Career', 'Networking', 'Job Fair'],
        speakers: [
          { name: 'Priya Sharma', title: 'Sr. Engineer at Infosys', company: 'Infosys' },
          { name: 'Arjun Gupta', title: 'Product Manager at Flipkart', company: 'Flipkart' }
        ],
        agenda: [
          { time: '10:00 AM', activity: 'Registration & Welcome Coffee' },
          { time: '11:00 AM', activity: 'Opening Keynote' },
          { time: '12:00 PM', activity: 'Company Booths & Networking' },
          { time: '2:00 PM', activity: 'Panel Discussion: Career Paths in Tech' },
          { time: '3:30 PM', activity: 'One-on-One Career Consultations' }
        ],
        requirements: ['Business attire required', 'Bring multiple copies of your resume'],
        image: 'https://via.placeholder.com/400x200/6B73FF/FFFFFF?text=Career+Fair',
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'Tech Talk: AI in Healthcare India',
        description:
          'Join us for an insightful discussion on how artificial intelligence is revolutionizing healthcare in India. Learn from industry experts about innovations in Indian healthcare tech.',
        type: 'workshop',
        date: '2024-02-20',
        time: '6:00 PM - 8:00 PM',
        location: 'Virtual Event',
        mode: 'virtual',
        organizer: 'Computer Science Department',
        organizerAvatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=CS',
        maxAttendees: 200,
        currentAttendees: 156,
        registrationDeadline: '2024-02-18',
        isPaid: false,
        price: 0,
        tags: ['Technology', 'AI', 'Healthcare'],
        speakers: [
          { name: 'Dr. Kavita Nair', title: 'Data Scientist at Microsoft Research India', company: 'Microsoft Research India' },
          { name: 'Dr. James Wilson', title: 'Chief Medical Officer', company: 'MedTech Solutions' }
        ],
        agenda: [
          { time: '6:00 PM', activity: 'Welcome & Introductions' },
          { time: '6:15 PM', activity: 'Keynote: AI in Medical Diagnosis' },
          { time: '7:00 PM', activity: 'Case Studies & Demo' },
          { time: '7:30 PM', activity: 'Q&A Session' }
        ],
        requirements: ['Laptop/device for virtual attendance', 'Basic understanding of AI concepts helpful'],
        image: 'https://via.placeholder.com/400x200/10B981/FFFFFF?text=AI+Healthcare',
        status: 'upcoming',
        meetingLink: 'https://zoom.us/j/1234567890'
      },
      {
        id: 3,
        title: 'Startup Pitch Competition',
        description:
          'Watch student entrepreneurs pitch their innovative startup ideas to a panel of investors and alumni. Great networking opportunity!',
        type: 'competition',
        date: '2024-03-05',
        time: '2:00 PM - 6:00 PM',
        location: 'Innovation Hub - Conference Room A',
        mode: 'hybrid',
        organizer: 'Entrepreneurship Club',
        organizerAvatar: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=EC',
        maxAttendees: 150,
        currentAttendees: 89,
        registrationDeadline: '2024-03-01',
        isPaid: true,
        price: 15,
        tags: ['Entrepreneurship', 'Startups', 'Innovation'],
        speakers: [
          { name: 'David Kim', title: 'Venture Partner', company: 'Tech Ventures' },
          { name: 'Lisa Zhang', title: 'Startup Founder', company: 'EduTech Inc' }
        ],
        agenda: [
          { time: '2:00 PM', activity: 'Registration & Networking' },
          { time: '2:30 PM', activity: 'Opening Remarks' },
          { time: '3:00 PM', activity: 'Startup Pitches (Round 1)' },
          { time: '4:30 PM', activity: 'Break & Networking' },
          { time: '5:00 PM', activity: 'Final Pitches & Judging' },
          { time: '5:45 PM', activity: 'Awards & Closing' }
        ],
        requirements: ['Registration fee: $15', 'Valid student ID required'],
        image: 'https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Startup+Pitch',
        status: 'upcoming'
      },
      {
        id: 4,
        title: 'Alumni Homecoming Weekend',
        description:
          'Annual homecoming celebration with alumni networking, campus tours, and special events. Reconnect with the university community.',
        type: 'social',
        date: '2024-03-15',
        time: '9:00 AM - 10:00 PM',
        location: 'Multiple Campus Locations',
        mode: 'in-person',
        organizer: 'Alumni Relations',
        organizerAvatar: 'https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=AR',
        maxAttendees: 1000,
        currentAttendees: 567,
        registrationDeadline: '2024-03-10',
        isPaid: true,
        price: 25,
        tags: ['Alumni', 'Networking', 'Social'],
        speakers: [
          { name: 'President Smith', title: 'University President', company: 'University' },
          { name: 'Various Alumni', title: 'Distinguished Speakers', company: 'Multiple Companies' }
        ],
        agenda: [
          { time: '9:00 AM', activity: 'Registration & Welcome Breakfast' },
          { time: '10:30 AM', activity: 'Campus Tours' },
          { time: '12:00 PM', activity: 'Alumni Luncheon' },
          { time: '2:00 PM', activity: 'Department Reunions' },
          { time: '4:00 PM', activity: 'Career Fair' },
          { time: '6:00 PM', activity: 'Evening Gala Dinner' },
          { time: '8:00 PM', activity: 'Entertainment & Dancing' }
        ],
        requirements: ['Event ticket: $25', 'Formal attire for evening gala'],
        image: 'https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Homecoming',
        status: 'upcoming'
      }
    ];

    const mockRegisteredEvents = [1, 2];
    const mockSavedEvents = [3];

    let filteredEvents = mockEvents;

    if (filterBy !== 'all') {
      filteredEvents = filteredEvents.filter((event) => event.type === filterBy);
    }

    if (searchTerm) {
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    filteredEvents.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
          return b.currentAttendees - a.currentAttendees;
        case 'price':
          return a.price - b.price;
        default:
          return new Date(a.date) - new Date(b.date);
      }
    });

    setEvents(filteredEvents);
    setRegisteredEvents(mockRegisteredEvents);
    setSavedEvents(mockSavedEvents);
    setLoading(false);
  }, [filterBy, sortBy, searchTerm]);

  useEffect(() => {
    loadEventsData();
  }, [loadEventsData]);

  const handleRegisterEvent = (event) => {
    setSelectedEvent(event);
    setRegistrationData({
      questions: {},
      dietaryRequirements: '',
      additionalInfo: ''
    });
    setShowRegistrationModal(true);
  };

  const submitRegistration = async () => {
    if (!selectedEvent) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRegisteredEvents((prev) => [...prev, selectedEvent.id]);

      setShowRegistrationModal(false);
      setSelectedEvent(null);
      alert('Registration successful! You will receive a confirmation email shortly.');
    } catch (error) {
      alert('Error registering for event');
    }
  };

  const handleSaveEvent = (eventId) => {
    setSavedEvents((prev) => (prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]));
  };

  const isRegistered = (eventId) => registeredEvents.includes(eventId);
  const isSaved = (eventId) => savedEvents.includes(eventId);

  const getEventsByTab = () => {
    switch (activeTab) {
      case 'registered':
        return events.filter((event) => isRegistered(event.id));
      case 'saved':
        return events.filter((event) => isSaved(event.id));
      default:
        return events;
    }
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      career: MdBusiness,
      workshop: MdSchool,
      competition: MdGroup,
      social: MdPeople
    };
    return icons[type] || MdEvent;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      career: 'bg-blue-100 text-blue-700',
      workshop: 'bg-green-100 text-green-700',
      competition: 'bg-purple-100 text-purple-700',
      social: 'bg-orange-100 text-orange-700'
    };
    return colors[type] || 'bg-slate-100 text-slate-700';
  };

  const headerContent = (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-purple-600">Events & workshops</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Stay in sync with upcoming happenings</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Explore placement drives, mentor meetups, and alumni gatherings curated for students. Register early to secure your seat.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('registered')}
          className="hidden sm:inline-flex items-center rounded-lg border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:border-purple-300 hover:text-purple-800"
        >
          My registrations
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
        >
          Browse events
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <StudentLayout header={headerContent}>
        <div className="flex h-72 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600" />
            <p className="mt-4 text-sm text-slate-500">Loading events...</p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout header={headerContent}>
      <div className="rounded-2xl border border-slate-200 bg-white px-4 pt-4">
        <div className="flex flex-wrap gap-4 border-b border-slate-100 px-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full ${
              activeTab === 'upcoming'
                ? 'text-purple-600 after:bg-purple-500'
                : 'text-slate-500 hover:text-slate-700 after:bg-transparent'
            }`}
          >
            Upcoming events
          </button>
          <button
            onClick={() => setActiveTab('registered')}
            className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full ${
              activeTab === 'registered'
                ? 'text-purple-600 after:bg-purple-500'
                : 'text-slate-500 hover:text-slate-700 after:bg-transparent'
            }`}
          >
            My registrations
            {registeredEvents.length > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-purple-500 px-2 py-0.5 text-xs font-semibold text-white">
                {registeredEvents.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full ${
              activeTab === 'saved'
                ? 'text-purple-600 after:bg-purple-500'
                : 'text-slate-500 hover:text-slate-700 after:bg-transparent'
            }`}
          >
            Saved events
            {savedEvents.length > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-purple-500 px-2 py-0.5 text-xs font-semibold text-white">
                {savedEvents.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'upcoming' && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm shadow-inner focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              <option value="all">All types</option>
              <option value="career">Career events</option>
              <option value="workshop">Workshops</option>
              <option value="competition">Competitions</option>
              <option value="social">Social events</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              <option value="date">Sort by date</option>
              <option value="title">Sort by title</option>
              <option value="popularity">Sort by popularity</option>
              <option value="price">Sort by price</option>
            </select>
          </div>
        </section>
      )}

      <div className="space-y-6">
        {getEventsByTab().map((event) => {
          const EventTypeIcon = getEventTypeIcon(event.type);

          return (
            <div
              key={event.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img src={event.image} alt={event.title} className="h-48 w-full object-cover md:h-full" />
                </div>

                <div className="md:w-2/3 p-6">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${getEventTypeColor(event.type)}`}>
                          <EventTypeIcon className="mr-2" />
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                          event.isPaid ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {event.isPaid ? `₹${event.price}` : 'Free'}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">{event.description}</p>

                      <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 md:grid-cols-2">
                        <div className="flex items-center">
                          <MdCalendarToday className="mr-2 text-purple-500" />
                          <span>
                            {new Date(event.date).toLocaleDateString()} • {event.time}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MdLocationOn className="mr-2 text-purple-500" />
                          <span className="flex items-center gap-1">
                            {event.location}
                            {event.mode === 'virtual' && <MdVideoCall className="text-blue-500" />}
                            {event.mode === 'hybrid' && <MdPlace className="text-emerald-500" />}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MdPeople className="mr-2 text-purple-500" />
                          <span>
                            {event.currentAttendees}/{event.maxAttendees} attendees
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MdAccessTime className="mr-2 text-purple-500" />
                          <span>Register by {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                        <img src={event.organizerAvatar} alt={event.organizer} className="h-6 w-6 rounded-full" />
                        <span>Organised by {event.organizer}</span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <span key={index} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleSaveEvent(event.id)}
                        className="rounded-full p-2 text-slate-400 transition hover:text-purple-500"
                      >
                        {isSaved(event.id) ? <MdBookmark className="text-purple-500" /> : <MdBookmarkBorder />}
                      </button>
                      <button className="rounded-full p-2 text-slate-400 transition hover:text-slate-600">
                        <MdShare />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                        className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-purple-200 hover:text-purple-700"
                      >
                        <MdInfo className="mr-2" />
                        View details
                      </button>
                      {!isRegistered(event.id) ? (
                        <button
                          onClick={() => handleRegisterEvent(event)}
                          className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
                        >
                          Register now
                        </button>
                      ) : (
                        <button
                          disabled
                          className="inline-flex items-center rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700"
                        >
                          <MdCheckCircle className="mr-2" />
                          Registered
                        </button>
                      )}
                    </div>

                    <div className="text-right text-xs text-slate-500">
                      <div className="mb-1 h-2 w-full rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-purple-600"
                          style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                        />
                      </div>
                      <span>{Math.round((event.currentAttendees / event.maxAttendees) * 100)}% full</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {getEventsByTab().length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <MdEvent className="mx-auto text-4xl text-slate-300" />
          <p className="mt-4 text-sm font-semibold text-slate-700">
            {activeTab === 'registered' && 'No registered events yet'}
            {activeTab === 'saved' && 'No saved events yet'}
            {activeTab === 'upcoming' && 'No events found'}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {activeTab === 'registered' && "You haven't registered for any events yet."}
            {activeTab === 'saved' && "You haven't saved any events yet."}
            {activeTab === 'upcoming' && 'Try adjusting your search criteria or filters.'}
          </p>
        </div>
      )}

      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{selectedEvent.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center">
                    <MdCalendarToday className="mr-2" />
                    {new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.time}
                  </span>
                  <span className="flex items-center">
                    <MdLocationOn className="mr-2" />
                    {selectedEvent.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-2xl text-slate-400 transition hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="h-64 w-full rounded-2xl object-cover"
                />

                <section>
                  <h3 className="text-lg font-semibold text-slate-900">About this event</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{selectedEvent.description}</p>
                </section>

                {selectedEvent.speakers.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-slate-900">Speakers</h3>
                    <div className="mt-3 space-y-3">
                      {selectedEvent.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                            <MdMic className="text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{speaker.name}</p>
                            <p className="text-sm text-slate-600">
                              {speaker.title} • {speaker.company}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section>
                  <h3 className="text-lg font-semibold text-slate-900">Agenda</h3>
                  <div className="mt-3 space-y-3">
                    {selectedEvent.agenda.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <span className="w-20 text-xs font-semibold text-slate-500">{item.time}</span>
                        <p className="flex-1 text-sm text-slate-600">{item.activity}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {selectedEvent.requirements.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-slate-900">Requirements</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                      {selectedEvent.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-3 mt-1 h-1.5 w-1.5 rounded-full bg-purple-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <aside className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">Event details</h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Organizer</span>
                      <span className="font-semibold text-slate-700">{selectedEvent.organizer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mode</span>
                      <span className="font-semibold text-slate-700 capitalize">{selectedEvent.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Price</span>
                      <span className="font-semibold text-slate-700">
                        {selectedEvent.isPaid ? `₹${selectedEvent.price}` : 'Free'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Capacity</span>
                      <span className="font-semibold text-slate-700">{selectedEvent.maxAttendees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Registered</span>
                      <span className="font-semibold text-slate-700">{selectedEvent.currentAttendees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Deadline</span>
                      <span className="font-semibold text-slate-700">
                        {new Date(selectedEvent.registrationDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-purple-200 hover:text-purple-700"
                  >
                    Close
                  </button>
                  {!isRegistered(selectedEvent.id) ? (
                    <button
                      onClick={() => {
                        setShowEventModal(false);
                        handleRegisterEvent(selectedEvent);
                      }}
                      className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
                    >
                      Register now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700"
                    >
                      <MdCheckCircle className="mr-2 inline" />
                      Registered
                    </button>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Register for event</h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="text-2xl text-slate-400 transition hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">{selectedEvent.title}</h3>
              <p className="mt-1 text-xs text-slate-500">
                {new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.time}
              </p>
              <p className="mt-1 text-xs text-slate-500">{selectedEvent.location}</p>
              {selectedEvent.isPaid && (
                <p className="mt-1 text-xs font-semibold text-slate-700">Price: ₹{selectedEvent.price}</p>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">Dietary requirements (optional)</label>
                <textarea
                  value={registrationData.dietaryRequirements}
                  onChange={(e) =>
                    setRegistrationData((prev) => ({ ...prev, dietaryRequirements: e.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Any dietary restrictions or allergies?"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">Additional information (optional)</label>
                <textarea
                  value={registrationData.additionalInfo}
                  onChange={(e) =>
                    setRegistrationData((prev) => ({ ...prev, additionalInfo: e.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Any questions or special requests?"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-purple-200 hover:text-purple-700"
              >
                Cancel
              </button>
              <button
                onClick={submitRegistration}
                className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
              >
                {selectedEvent.isPaid ? `Pay ₹${selectedEvent.price} & register` : 'Register free'}
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default StudentEventsScreen;