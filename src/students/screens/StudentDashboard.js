import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdCalendarToday,
  MdCheckCircle,
  MdLocationOn,
  MdPeople,
  MdWork
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import StudentLayout from '../components/StudentLayout';
import {
  getAllMentors,
  getActiveMentorships,
  getStudentMentorshipRequests
} from '../services/mentorshipService';
import {
  getRecommendedJobs,
  getStudentApplications
} from '../services/jobService';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    mentors: [],
    activeMentorships: [],
    pendingRequests: [],
    recommendedJobs: [],
    applications: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          mentorsResult,
          mentorshipsResult,
          requestsResult,
          jobsResult,
          applicationsResult
        ] = await Promise.all([
          getAllMentors(),
          getActiveMentorships(user?.id || 1),
          getStudentMentorshipRequests(user?.id || 1),
          getRecommendedJobs(user?.id || 1, ['JavaScript', 'Python', 'React']),
          getStudentApplications(user?.id || 1)
        ]);

        setDashboardData({
          mentors: mentorsResult.mentors,
          activeMentorships: mentorshipsResult.mentorships,
          pendingRequests: requestsResult.requests.filter((request) => request.status === 'pending'),
          recommendedJobs: jobsResult.jobs.slice(0, 4),
          applications: applicationsResult.applications
        });
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError('Failed to load your latest dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  // Hardcoded placement insights for demo
  const placementInsights = useMemo(() => {
    return {
      companiesApplied: 8,
      interviewsScheduled: 3,
      offersReceived: 2,
      applicationsInReview: 4,
      totalApplications: 12
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        label: 'Active Mentorships',
        value: 2, // Hardcoded for demo
        icon: <MdPeople className="text-blue-600 text-xl" />,
        accent: 'bg-blue-50'
      },
      {
        label: 'Companies Applied',
        value: placementInsights.companiesApplied,
        icon: <MdWork className="text-green-600 text-xl" />,
        accent: 'bg-emerald-50'
      },
      {
        label: 'Interviews Scheduled',
        value: placementInsights.interviewsScheduled,
        icon: <MdCalendarToday className="text-purple-600 text-xl" />,
        accent: 'bg-purple-50'
      },
      {
        label: 'Offers Received',
        value: placementInsights.offersReceived,
        icon: <MdCheckCircle className="text-orange-600 text-xl" />,
        accent: 'bg-orange-50'
      }
    ],
    [placementInsights]
  );

  const headerContent = (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-blue-600">Student Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Welcome back, {user?.name || 'Student'}!
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Keep track of mentorships, job opportunities, and your placement progress tailored for you.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/students/mentorship')}
          className="hidden sm:inline-flex items-center space-x-2 rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:border-blue-300 hover:text-blue-800"
        >
          <span>Find a mentor</span>
        </button>
        <button
          onClick={() => navigate('/students/jobs')}
          className="inline-flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <span>Explore jobs</span>
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <StudentLayout header={headerContent} sidebarProps={{ pendingRequestsCount: 0 }}>
        <div className="flex h-72 items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
            <p className="mt-4 text-sm text-slate-500">Loading your personalised dashboard...</p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  if (error) {
    return (
      <StudentLayout header={headerContent} sidebarProps={{ pendingRequestsCount: 0 }}>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
          <p className="text-sm font-medium text-rose-700">{error}</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      header={headerContent}
      sidebarProps={{ pendingRequestsCount: 1 }} // Hardcoded for demo
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl p-3" style={{ backgroundColor: 'transparent' }}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.accent}`}>
                  {stat.icon}
                </div>
              </div>
              <span className="text-3xl font-semibold text-slate-900">{stat.value}</span>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-600">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Recommended Jobs</h2>
              <p className="text-sm text-slate-500">Opportunities aligned with your skills and interests</p>
            </div>
            <button
              onClick={() => navigate('/students/jobs')}
              className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              View all &rarr;
            </button>
          </div>

          {dashboardData.recommendedJobs.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => navigate(`/students/jobs?highlight=${job.id}`)}
                  className="cursor-pointer rounded-xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-600">{job.company}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center">
                          <MdLocationOn className="mr-1 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <MdWork className="mr-1 text-slate-400" />
                          {job.type === 'internship' ? job.duration : 'Full-time'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        job.type === 'internship'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {job.type === 'internship' ? 'Internship' : 'Full-time'}
                      </span>
                      <span className="text-sm font-semibold text-slate-700">
                        {job.type === 'internship' ? job.stipend : job.salary}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
              <p className="text-sm text-slate-500">No personalised job matches yet. Update your skills to get better recommendations.</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Your Mentorships</h2>
              <p className="text-sm text-slate-500">Track progress and upcoming sessions</p>
            </div>
            <button
              onClick={() => navigate('/students/mentorship')}
              className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              View all
            </button>
          </div>

          {true ? ( // Always show hardcoded data for demo
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  progress: 65,
                  nextSession: 'March 15, 2024',
                  mentor: {
                    name: 'Dr. Priya Sharma',
                    title: 'Assistant Professor, Computer Science'
                  }
                },
                {
                  id: 2,
                  progress: 40,
                  nextSession: 'March 18, 2024', 
                  mentor: {
                    name: 'Prof. Rajesh Kumar',
                    title: 'Associate Professor, Software Engineering'
                  }
                }
              ].map((mentorship) => (
                <div key={mentorship.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      {mentorship.mentor.name
                        .split(' ')
                        .map((piece) => piece[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{mentorship.mentor.name}</p>
                      <p className="text-xs text-slate-500">{mentorship.mentor.title}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Progress</span>
                      <span>{mentorship.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${mentorship.progress}%` }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-slate-500">Next session: {mentorship.nextSession}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <MdPeople className="text-xl" />
              </div>
              <p className="mt-4 text-sm font-medium text-slate-700">No active mentorships</p>
              <p className="mt-2 text-xs text-slate-500">
                Kickstart your journey by requesting guidance from faculty mentors.
              </p>
              <button
                onClick={() => navigate('/students/mentorship')}
                className="mt-3 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700"
              >
                Find a mentor
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Placement Progress</h2>
            <p className="text-sm text-slate-500">Monitor your applications and see where you stand with recruiters</p>
          </div>
          <button
            onClick={() => navigate('/students/jobs?tab=applications')}
            className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            View all applications
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Total applications</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{placementInsights.totalApplications}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">In review</p>
            <p className="mt-2 text-2xl font-semibold text-amber-600">{placementInsights.applicationsInReview}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Interviews</p>
            <p className="mt-2 text-2xl font-semibold text-purple-600">{placementInsights.interviewsScheduled}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Offers</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-600">{placementInsights.offersReceived}</p>
          </div>
        </div>

        {true ? ( // Always show hardcoded data for demo
          <div className="space-y-4">
            {[
              {
                id: 1,
                status: 'offer_received',
                appliedDate: '2024-02-15',
                job: { title: 'Software Engineer', company: 'Google', location: 'Bangalore' }
              },
              {
                id: 2, 
                status: 'interview_scheduled',
                appliedDate: '2024-02-20',
                job: { title: 'Frontend Developer', company: 'Microsoft', location: 'Hyderabad' }
              },
              {
                id: 3,
                status: 'under_review', 
                appliedDate: '2024-02-25',
                job: { title: 'Data Analyst', company: 'Amazon', location: 'Mumbai' }
              },
              {
                id: 4,
                status: 'applied',
                appliedDate: '2024-03-01', 
                job: { title: 'Full Stack Developer', company: 'Flipkart', location: 'Bangalore' }
              },
              {
                id: 5,
                status: 'offer_received',
                appliedDate: '2024-02-10',
                job: { title: 'Backend Engineer', company: 'Paytm', location: 'Noida' }
              }
            ].map((application) => {
              const statusStyles = {
                applied: 'bg-blue-50 text-blue-700',
                under_review: 'bg-amber-50 text-amber-700',
                interview: 'bg-purple-50 text-purple-700',
                interview_scheduled: 'bg-purple-50 text-purple-700',
                offer: 'bg-emerald-50 text-emerald-700',
                offer_received: 'bg-emerald-50 text-emerald-700',
                rejected: 'bg-rose-50 text-rose-700'
              };

              const statusLabels = {
                applied: 'Applied',
                under_review: 'In review',
                interview: 'Interview scheduled',
                interview_scheduled: 'Interview scheduled',
                offer: 'Offer received',
                offer_received: 'Offer received',
                rejected: 'Not selected'
              };

              const statusClass = statusStyles[application.status] || 'bg-slate-100 text-slate-700';
              const statusLabel = statusLabels[application.status] || 'Status update';

              return (
                <div key={application.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{application.job?.title}</p>
                      <p className="text-xs text-slate-500">{application.job?.company}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span>Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
                        {application.job?.location && (
                          <span className="flex items-center">
                            <MdLocationOn className="mr-1 text-slate-400" />
                            {application.job.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
                      {statusLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
            <p className="text-sm text-slate-500">You haven't applied to any companies yet. Browse the job portal to get started.</p>
          </div>
        )}
      </section>
    </StudentLayout>
  );
};

export default StudentDashboard;