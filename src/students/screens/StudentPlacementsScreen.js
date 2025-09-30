import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdCalendarToday,
  MdCheckCircle,
  MdLocationOn,
  MdTrendingUp,
  MdWork
} from 'react-icons/md';
import StudentLayout from '../components/StudentLayout';
import { useAuth } from '../../context/AuthContext';

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

const StudentPlacementsScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPlacementData = async () => {
      try {
        setLoading(true);
        
        // Hardcoded placement data for demo purposes
        const hardcodedApplications = [
          {
            id: 1,
            appliedDate: '2025-09-12',
            status: 'interview_scheduled',
            job: {
              id: 1,
              title: 'Software Engineering Intern',
              company: 'Infosys',
              location: 'Bangalore, Karnataka'
            }
          },
          {
            id: 2,
            appliedDate: '2025-09-15',
            status: 'offer_received',
            job: {
              id: 3,
              title: 'Junior Frontend Developer',
              company: 'Paytm',
              location: 'Noida, Uttar Pradesh'
            }
          },
          {
            id: 3,
            appliedDate: '2025-09-20',
            status: 'under_review',
            job: {
              id: 4,
              title: 'UX Design Intern',
              company: 'Zomato',
              location: 'Gurgaon, Haryana'
            }
          },
          {
            id: 4,
            appliedDate: '2025-09-25',
            status: 'applied',
            job: {
              id: 5,
              title: 'Data Science Intern',
              company: 'Swiggy',
              location: 'Bangalore, Karnataka'
            }
          },
          {
            id: 5,
            appliedDate: '2025-09-18',
            status: 'interview_scheduled',
            job: {
              id: 2,
              title: 'Product Management Intern',
              company: 'Flipkart',
              location: 'Bangalore, Karnataka'
            }
          },
          {
            id: 6,
            appliedDate: '2025-09-10',
            status: 'offer_received',
            job: {
              id: 6,
              title: 'Mobile App Developer',
              company: 'TikTok',
              location: 'Los Angeles, CA'
            }
          },
          {
            id: 7,
            appliedDate: '2025-09-08',
            status: 'under_review',
            job: {
              id: 7,
              title: 'Backend Developer',
              company: 'Microsoft',
              location: 'Hyderabad, Telangana'
            }
          },
          {
            id: 8,
            appliedDate: '2025-09-05',
            status: 'applied',
            job: {
              id: 8,
              title: 'DevOps Engineer',
              company: 'Amazon',
              location: 'Bangalore, Karnataka'
            }
          },
          {
            id: 9,
            appliedDate: '2025-09-03',
            status: 'rejected',
            job: {
              id: 3,
              title: 'Junior Frontend Developer',
              company: 'Paytm',
              location: 'Noida, Uttar Pradesh'
            }
          },
          {
            id: 10,
            appliedDate: '2025-08-28',
            status: 'under_review',
            job: {
              id: 4,
              title: 'UX Design Intern',
              company: 'Zomato',
              location: 'Gurgaon, Haryana'
            }
          },
          {
            id: 11,
            appliedDate: '2025-08-25',
            status: 'interview_scheduled',
            job: {
              id: 5,
              title: 'Data Science Intern',
              company: 'Swiggy',
              location: 'Bangalore, Karnataka'
            }
          },
          {
            id: 12,
            appliedDate: '2025-08-20',
            status: 'applied',
            job: {
              id: 6,
              title: 'Mobile App Developer',
              company: 'TikTok',
              location: 'Los Angeles, CA'
            }
          }
        ];

        const hardcodedRecommendedJobs = [
          {
            id: 9,
            title: 'Full Stack Developer Intern',
            company: 'Google',
            type: 'internship',
            stipend: '₹50,000/month',
            location: 'Bangalore, Karnataka'
          },
          {
            id: 10,
            title: 'AI Research Intern',
            company: 'OpenAI',
            type: 'internship',
            stipend: '$8,000/month',
            location: 'San Francisco, CA'
          },
          {
            id: 11,
            title: 'Cloud Engineer',
            company: 'IBM',
            type: 'job',
            salary: '₹8,00,000 - ₹12,00,000',
            location: 'Pune, Maharashtra'
          }
        ];

        setApplications(hardcodedApplications);
        setRecommendedJobs(hardcodedRecommendedJobs);
        setPendingRequests(1); // One pending mentorship request
        
      } catch (err) {
        console.error('Failed to load placement insights:', err);
        setError('Unable to load placement insights right now. Please try again in a moment.');
      } finally {
        setLoading(false);
      }
    };

    loadPlacementData();
  }, [user?.id]);

  const placementInsights = useMemo(() => {
    const companies = new Set(applications.map((app) => app.job?.company).filter(Boolean));
    const statusCounts = applications.reduce((acc, application) => {
      acc[application.status] = (acc[application.status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalApplications: applications.length,
      companiesApplied: companies.size,
      inReview: statusCounts['under_review'] || 0,
      interviews:
        (statusCounts['interview_scheduled'] || 0) + (statusCounts['interview'] || 0),
      offers: (statusCounts['offer_received'] || 0) + (statusCounts['offer'] || 0)
    };
  }, [applications]);

  const pipelineStages = useMemo(
    () => [
      {
        key: 'applied',
        label: 'Applications submitted',
        description: 'The Roles you have shown interest in',
        value: placementInsights.totalApplications,
        icon: <MdWork className="text-blue-600" />
      },
      {
        key: 'under_review',
        label: 'In review with recruiters',
        description: 'Applications currently being evaluated',
        value: placementInsights.inReview,
        icon: <MdTrendingUp className="text-amber-600" />
      },
      {
        key: 'interview',
        label: 'Interviews scheduled',
        description: 'Upcoming interview conversations scheduled',
        value: placementInsights.interviews,
        icon: <MdCalendarToday className="text-purple-600" />
      },
      {
        key: 'offer',
        label: 'Offers received',
        description: 'Confirmed offers waiting for your response',
        value: placementInsights.offers,
        icon: <MdCheckCircle className="text-emerald-600" />
      }
    ],
    [placementInsights]
  );

  const topCompanies = useMemo(() => {
    const counts = applications.reduce((acc, app) => {
      if (app.job?.company) {
        acc[app.job.company] = (acc[app.job.company] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [applications]);

  const sortedApplications = useMemo(
    () =>
      [...applications].sort(
        (a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      ),
    [applications]
  );

  const headerContent = (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-blue-600">Placement overview</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Track your placement journey</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Monitor every step from application to offer, keep an eye on company interest, and plan your next career move.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/students/jobs?tab=applications')}
          className="hidden sm:inline-flex items-center rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:text-blue-800"
        >
          View applications
        </button>
        <button
          onClick={() => navigate('/students/jobs')}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Browse new roles
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <StudentLayout header={headerContent} sidebarProps={{ pendingRequestsCount: pendingRequests }}>
        <div className="flex h-72 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
            <p className="mt-4 text-sm text-slate-500">Gathering your placement insights…</p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  if (error) {
    return (
      <StudentLayout header={headerContent} sidebarProps={{ pendingRequestsCount: pendingRequests }}>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
          <p className="text-sm font-medium text-rose-700">{error}</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout header={headerContent} sidebarProps={{ pendingRequestsCount: pendingRequests }}>
      <div className="space-y-6">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: 'Total applications',
              value: placementInsights.totalApplications,
              accent: 'bg-blue-50',
              icon: <MdWork className="text-blue-600 text-xl" />
            },
            {
              title: 'Companies applied',
              value: placementInsights.companiesApplied,
              accent: 'bg-emerald-50',
              icon: <MdTrendingUp className="text-emerald-600 text-xl" />
            },
            {
              title: 'Interviews scheduled',
              value: placementInsights.interviews,
              accent: 'bg-purple-50',
              icon: <MdCalendarToday className="text-purple-600 text-xl" />
            },
            {
              title: 'Offers received',
              value: placementInsights.offers,
              accent: 'bg-emerald-50',
              icon: <MdCheckCircle className="text-emerald-600 text-xl" />
            }
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.accent}`}>
                  {card.icon}
                </div>
                <span className="text-3xl font-semibold text-slate-900">{card.value}</span>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-600">{card.title}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Placement pipeline</h2>
              <p className="text-sm text-slate-500">Understand how your applications are progressing through each stage</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Conversion rate {placementInsights.totalApplications > 0
                ? `${Math.round(((placementInsights.offers || 0) / placementInsights.totalApplications) * 100)}%`
                : '0%'}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pipelineStages.map((stage) => {
              const progress = placementInsights.totalApplications
                ? Math.round((stage.value / placementInsights.totalApplications) * 100)
                : 0;

              return (
                <div key={stage.key} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                      {stage.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{stage.label}</p>
                      <p className="text-xs text-slate-500">{stage.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>{stage.value} {stage.value === 1 ? 'role' : 'roles'}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Application timeline</h2>
                <p className="text-sm text-slate-500">Recent activity and next steps across your applications</p>
              </div>
            </div>

            {sortedApplications.length > 0 ? (
              <div className="mt-6 space-y-4">
                {sortedApplications.map((application) => {
                  const statusClass = statusStyles[application.status] || 'bg-slate-100 text-slate-700';
                  const statusLabel = statusLabels[application.status] || 'Status update';

                  return (
                    <div key={application.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
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
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>
                            {statusLabel}
                          </span>
                          <button
                            onClick={() => navigate(`/students/jobs?highlight=${application.job?.id || ''}`)}
                            className="text-xs font-semibold text-blue-600 underline-offset-4 hover:underline"
                          >
                            View job
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-10 text-center">
                <p className="text-sm text-slate-500">
                  You haven't applied to any roles yet. Start exploring opportunities in the job portal to build your placement pipeline.
                </p>
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">Top companies engaging with you</h3>
              <p className="mt-1 text-sm text-slate-500">Companies where you have active applications and traction</p>

              {topCompanies.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {topCompanies.map((company) => (
                    <div key={company.company} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{company.company}</p>
                        <p className="text-xs text-slate-500">{company.count} {company.count === 1 ? 'application' : 'applications'}</p>
                      </div>
                      <span className="text-xs font-semibold text-blue-600">{Math.round((company.count / (placementInsights.totalApplications || 1)) * 100)}% of pipeline</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-lg border border-dashed border-slate-200 p-6 text-center">
                  <p className="text-xs text-slate-500">Apply to roles to see which companies are most responsive.</p>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">Recommended follow-ups</h3>
                <button
                  onClick={() => navigate('/students/jobs')}
                  className="text-xs font-semibold text-blue-600 underline-offset-4 hover:underline"
                >
                  View more
                </button>
              </div>
              <p className="mt-1 text-sm text-slate-500">Keep momentum with these tailored opportunities.</p>

              {recommendedJobs.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="rounded-lg border border-slate-200 p-4">
                      <p className="text-sm font-semibold text-slate-900">{job.title}</p>
                      <p className="text-xs text-slate-500">{job.company}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                        <span>{job.type === 'internship' ? 'Internship' : 'Full-time'}</span>
                        <span>{job.type === 'internship' ? job.stipend : job.salary}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/students/jobs?highlight=${job.id}`)}
                        className="mt-3 inline-flex items-center text-xs font-semibold text-blue-600 underline-offset-4 hover:underline"
                      >
                        Review listing
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-lg border border-dashed border-slate-200 p-6 text-center">
                  <p className="text-xs text-slate-500">Update your profile skills to unlock more tailored roles.</p>
                </div>
              )}
            </section>
          </aside>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentPlacementsScreen;
