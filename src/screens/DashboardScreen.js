import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const DASHBOARD_TABS = [
  { key: 'overview', label: 'Dashboard Overview', icon: 'fa-gauge-high' },
  { key: 'approvals', label: 'Approval Queue', icon: 'fa-inbox' },
  { key: 'calendar', label: 'Interview Calendar', icon: 'fa-calendar-day' },
  { key: 'progress', label: 'Student Progress', icon: 'fa-user-graduate' },
  { key: 'analytics', label: 'Reports & Analytics', icon: 'fa-chart-line' },
  { key: 'resources', label: 'Mentor Resources', icon: 'fa-book-open' }
];

const DEFAULT_TAB = 'overview';
const DASHBOARD_TAB_KEYS = new Set(DASHBOARD_TABS.map((tab) => tab.key));

const getValidTab = (search) => {
  const query = new URLSearchParams(search);
  const tabParam = query.get('tab');

  if (!tabParam) {
    return DEFAULT_TAB;
  }

  return DASHBOARD_TAB_KEYS.has(tabParam) ? tabParam : DEFAULT_TAB;
};

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const mentorName = user?.name || 'Faculty Mentor';

  const summaryCards = [
    {
      title: 'Pending Approvals',
      value: 6,
      helper: 'Applications waiting for your sign-off',
      icon: 'fa-file-signature',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Interviews This Week',
      value: 4,
      helper: 'Across your assigned mentees',
      icon: 'fa-calendar-day',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Students Needing Support',
      value: 12,
      helper: 'Flagged as at-risk or unplaced',
      icon: 'fa-user-clock',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600'
    },
    {
      title: 'Feedback Overdue',
      value: 5,
      helper: 'Internship evaluations awaiting submission',
      icon: 'fa-clipboard-check',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    }
  ];

  const approvalQueue = [
    {
      student: 'Rahul Kumar',
      opportunity: 'Robotics Lab Fellowship – InnovateX',
      due: 'Due today',
      status: 'Awaiting mentor signature',
      priority: 'High'
    },
    {
      student: 'Sneha Agarwal',
      opportunity: 'Data Analytics Internship – QuantSphere',
      due: 'Due tomorrow',
      status: 'Placement cell approved',
      priority: 'Medium'
    },
    {
      student: 'Anil Mehta',
      opportunity: 'IoT Pilot Project – SmartWorks',
      due: 'Resume update received',
      status: 'Review revised documents',
      priority: 'Follow-up'
    }
  ];

  const upcomingInterviews = [
    {
      student: 'Priya Patel',
      employer: 'InnovateX Labs',
      schedule: 'Oct 3, 2025 · 10:00 AM',
      mode: 'On-campus · Innovation Hub',
      support: 'Share mock interview prompts'
    },
    {
      student: 'Vikram Singh',
      employer: 'Tesseract Robotics',
      schedule: 'Oct 4, 2025 · 02:30 PM',
      mode: 'Virtual · Teams link',
      support: 'Confirm lab availability for assessment'
    },
    {
      student: 'Sarah Wilson',
      employer: 'GreenGrid Energy',
      schedule: 'Oct 6, 2025 · 11:15 AM',
      mode: 'Hybrid · Placement Hall B',
      support: 'Mentor check-in scheduled'
    }
  ];

  const studentProgress = [
    {
      student: 'Vikram Singh',
      track: 'AI Residency Program',
      stage: 'Interview Round 2',
      status: 'On Track',
      nextAction: 'Document technical feedback by Oct 2'
    },
    {
      student: 'Sarah Wilson',
      track: 'Cybersecurity Internship',
      stage: 'Awaiting mentor approval',
      status: 'At Risk',
      nextAction: 'Approve application before Oct 1 deadline'
    },
    {
      student: 'Arjun Sharma',
      track: 'Full-time Placement',
      stage: 'Offer extended',
      status: 'Follow-up',
      nextAction: 'Confirm acceptance and schedule debrief'
    }
  ];

  const recentUpdates = [
    {
      time: '1 hour ago',
      detail: 'Placement cell published 5 new industry projects tagged for Electronics & AI departments.'
    },
    {
      time: '2 hours ago',
      detail: 'Rahul Kumar uploaded revised resume for Robotics Lab Fellowship approval.'
    },
    {
      time: 'Yesterday',
      detail: 'Supervisor feedback recorded for Sneha Agarwal’s summer internship; certificate auto-generated.'
    }
  ];

  const resourceLinks = [
    {
      title: 'Mentor Handbook',
      description: 'Review evaluation rubrics and approval SLAs set by the placement cell.',
      actionLabel: 'Download Guide'
    },
    {
      title: 'Share New Opportunity',
      description: 'Submit an industry collaboration or internship lead for verification.',
      actionLabel: 'Open Form'
    },
    {
      title: 'Update Availability',
      description: 'Sync your weekly mentoring hours and interview slots with the campus calendar.',
      actionLabel: 'Manage Calendar'
    }
  ];

  const approvalsMetrics = [
    {
      title: 'Awaiting signature',
      value: 6,
      helper: 'Prioritise before 8:00 PM today',
      icon: 'fa-file-circle-check',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Documents pending',
      value: 3,
      helper: 'Students awaiting feedback on resumes',
      icon: 'fa-file-pen',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Follow-ups scheduled',
      value: 4,
      helper: 'Check-in reminders set for this week',
      icon: 'fa-bell',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    }
  ];

  const calendarPreparation = [
    {
      task: 'Share InnovateX technical brief with mentees',
      due: 'Oct 2 · 6:00 PM',
      owner: 'AI & Robotics cohort',
      status: 'Pending review'
    },
    {
      task: 'Confirm lab availability for Tesseract Robotics',
      due: 'Oct 3 · 11:00 AM',
      owner: 'Facilities coordination',
      status: 'Booked'
    },
    {
      task: 'Schedule mock interviews for GreenGrid Energy',
      due: 'Oct 4 · 5:00 PM',
      owner: 'Mentor interview pod',
      status: 'In progress'
    }
  ];

  const analyticsHighlights = [
    {
      title: 'Offers accepted',
      value: '18',
      change: '+12% vs last cohort',
      icon: 'fa-handshake-angle',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Internship conversions',
      value: '68%',
      change: '+6 pts in 4 weeks',
      icon: 'fa-rocket',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Feedback score',
      value: '4.6 / 5',
      change: '↑ 0.4 vs previous term',
      icon: 'fa-star',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    }
  ];

  const pipelineHealth = [
    { stage: 'Applications submitted', count: 42, conversion: '86%' },
    { stage: 'Interviews scheduled', count: 24, conversion: '57%' },
    { stage: 'Offers released', count: 11, conversion: '46%' },
    { stage: 'Offers accepted', count: 9, conversion: '82%' }
  ];

  const mentorSupportContacts = [
    {
      role: 'Placement Cell Lead',
      name: 'Dr. Asha Rao',
      email: 'asha.rao@campus.edu',
      phone: '+91 99876 54321'
    },
    {
      role: 'Industry Relations',
      name: 'Karan Malhotra',
      email: 'karan.m@campus.edu',
      phone: '+91 98765 12345'
    }
  ];

  const tabCopy = useMemo(
    () => ({
      overview: {
        subtitle: 'Mentor dashboard',
        title: `Welcome back, ${mentorName}`,
        description:
          'Stay on top of approval requests, upcoming interviews, and learner outcomes. The placement cell synchronises updates in real time so you can focus on coaching.'
      },
      approvals: {
        subtitle: 'Approval workspace',
        title: 'Prioritise pending submissions',
        description: 'Review documents, verify collaborations, and unblock mentees awaiting your sign-off.'
      },
      calendar: {
        subtitle: 'Interview calendar',
        title: 'Coordinate interviews without conflicts',
        description: 'Sync with placement timelines and confirm preparation tasks ahead of each employer visit.'
      },
      progress: {
        subtitle: 'Progress tracker',
        title: 'Coach mentees through every milestone',
        description: 'Monitor application stages, spot risks early, and record next actions for your cohort.'
      },
      analytics: {
        subtitle: 'Mentor analytics',
        title: 'Review the effectiveness of your mentorship',
        description: 'Track conversion metrics, offer ratios, and sentiment to refine coaching strategies.'
      },
      resources: {
        subtitle: 'Resource library',
        title: 'Surface guides, templates, and contacts',
        description: 'Keep playbooks and support channels within reach for faster mentor responses.'
      }
    }),
    [mentorName]
  );

  const [activeTab, setActiveTab] = useState(() => getValidTab(location.search));

  useEffect(() => {
    setActiveTab(getValidTab(location.search));
  }, [location.search]);

  const handleTabChange = (tabKey) => {
    const sanitized = DASHBOARD_TAB_KEYS.has(tabKey) ? tabKey : DEFAULT_TAB;
    setActiveTab(sanitized);

    const search = sanitized === DEFAULT_TAB ? '' : `?tab=${sanitized}`;
    const targetPath = `/dashboard${search}`;
    const currentPath = `${location.pathname}${location.search}`;

    if (currentPath !== targetPath) {
      navigate(targetPath, { replace: false });
    }
  };

  const SummaryCardsSection = () => (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {summaryCards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-start">
          <div className={`p-3 rounded-lg ${card.iconBg}`}>
            <i className={`fas ${card.icon} text-xl ${card.iconColor}`}></i>
          </div>
          <div className="ml-4">
            <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">{card.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
            <p className="text-sm text-gray-600 mt-2">{card.helper}</p>
          </div>
        </div>
      ))}
    </section>
  );

  const ApprovalQueuePanel = ({
    heading = 'Approval & Guidance Queue',
    description = 'Review learner submissions before the placement cell deadlines.',
    showCTA = true
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        {showCTA && (
          <button
            onClick={() => handleTabChange('approvals')}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            View all
          </button>
        )}
      </div>
      <div className="divide-y divide-gray-100">
        {approvalQueue.map((item) => (
          <div key={item.student} className="px-6 py-4 flex items-start justify-between">
            <div>
              <p className="font-semibold text-gray-900">{item.student}</p>
              <p className="text-sm text-gray-600 mt-1">{item.opportunity}</p>
              <p className="text-xs text-gray-500 mt-2">{item.status}</p>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  item.priority === 'High'
                    ? 'bg-rose-100 text-rose-700'
                    : item.priority === 'Medium'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {item.priority}
              </span>
              <p className="text-xs text-gray-500 mt-3">{item.due}</p>
              <button className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-700">
                Open request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const UpcomingInterviewsPanel = ({
    heading = 'Upcoming Interviews',
    description = 'Synced with academic timetable to avoid clashes.',
    showCTA = true
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        {showCTA && (
          <button
            onClick={() => handleTabChange('calendar')}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Open calendar
          </button>
        )}
      </div>
      <div className="px-6 py-4 space-y-4">
        {upcomingInterviews.map((interview) => (
          <div key={`${interview.student}-${interview.schedule}`} className="border border-gray-100 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900">{interview.student}</p>
            <p className="text-sm text-gray-600 mt-1">{interview.employer}</p>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <i className="fas fa-clock mr-2"></i>
              {interview.schedule}
            </p>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <i className="fas fa-location-dot mr-2"></i>
              {interview.mode}
            </p>
            <p className="text-xs text-purple-600 mt-3">{interview.support}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const StudentProgressPanel = ({
    heading = 'Student Progress Snapshot',
    description = 'Monitor each mentee’s journey from application to offer.',
    showCTA = true
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        {showCTA && (
          <button
            onClick={() => handleTabChange('progress')}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Export list
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              {['Student', 'Track', 'Current Stage', 'Status', 'Next Action'].map((headingLabel) => (
                <th
                  key={headingLabel}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {headingLabel}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {studentProgress.map((row) => (
              <tr key={row.student}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-700 mr-3">
                      {row.student
                        .split(' ')
                        .map((name) => name[0])
                        .join('')}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{row.student}</p>
                      <p className="text-xs text-gray-500">Assigned mentee</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.track}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.stage}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'On Track'
                        ? 'bg-emerald-100 text-emerald-700'
                        : row.status === 'At Risk'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const RecentUpdatesPanel = ({
    heading = 'Recent Updates',
    description = 'Automated logs from students, supervisors, and placement cell.'
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <div className="px-6 py-4 space-y-4">
        {recentUpdates.map((update) => (
          <div key={update.detail} className="flex items-start space-x-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-purple-500"></span>
            <div>
              <p className="text-xs text-gray-500">{update.time}</p>
              <p className="text-sm text-gray-700 mt-1">{update.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MentorResourcesPanel = ({ compact = false, showCTA = true }) => (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Quick actions for mentors</h3>
          <p className="text-sm text-gray-600">
            Keep resources and communication touchpoints in sync with the placement office.
          </p>
        </div>
        {showCTA && (
          <button
            onClick={() => handleTabChange('resources')}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Manage resources
          </button>
        )}
      </div>
      <div
        className={`grid grid-cols-1 ${compact ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 px-6 py-6`}
      >
        {resourceLinks.map((resource) => (
          <div
            key={resource.title}
            className="border border-gray-100 rounded-lg p-4 hover:border-purple-200 transition-colors"
          >
            <h4 className="text-sm font-semibold text-gray-900">{resource.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{resource.description}</p>
            <button className="mt-4 text-sm font-medium text-purple-600 hover:text-purple-700">
              {resource.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  const ApprovalInsightsGrid = () => (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {approvalsMetrics.map((metric) => (
        <div key={metric.title} className="bg-white border border-gray-200 rounded-xl p-6 flex items-start">
          <div className={`p-3 rounded-lg ${metric.iconBg}`}>
            <i className={`fas ${metric.icon} text-lg ${metric.iconColor}`}></i>
          </div>
          <div className="ml-4">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{metric.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
            <p className="text-sm text-gray-600 mt-2">{metric.helper}</p>
          </div>
        </div>
      ))}
    </section>
  );

  const CalendarPreparationPanel = () => (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Interview preparation checklist</h3>
          <p className="text-sm text-gray-600">Align prep tasks with the placement calendar and avoid last-minute rushes.</p>
        </div>
        <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-purple-50 text-sm text-purple-700 font-medium">
          Next 7 days
        </span>
      </div>
      <div className="divide-y divide-gray-100">
        {calendarPreparation.map((item) => (
          <div
            key={item.task}
            className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-semibold text-gray-900">{item.task}</p>
              <p className="text-sm text-gray-600 mt-1">{item.owner}</p>
            </div>
            <div className="mt-3 md:mt-0 text-sm text-gray-500 md:text-right">
              <p className="font-medium text-gray-700">{item.due}</p>
              <p>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const AnalyticsHighlightsGrid = () => (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {analyticsHighlights.map((card) => (
        <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.iconBg}`}>
              <i className={`fas ${card.icon} text-lg ${card.iconColor}`}></i>
            </div>
          </div>
          <p className="text-sm text-emerald-600 mt-4">{card.change}</p>
        </div>
      ))}
    </section>
  );

  const PipelineHealthPanel = () => (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Placement pipeline health</h3>
          <p className="text-sm text-gray-600">Track how mentees progress across each milestone.</p>
        </div>
        <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600 font-medium">
          Updated 15 mins ago
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              {['Stage', 'Students', 'Conversion Rate'].map((headingLabel) => (
                <th
                  key={headingLabel}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {headingLabel}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {pipelineHealth.map((item) => (
              <tr key={item.stage}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{item.stage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.count}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.conversion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const MentorSupportPanel = () => (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Support contacts</h3>
        <p className="text-sm text-gray-600 mt-1">Reach the placement cell team when you need quick intervention.</p>
      </div>
      <div className="px-6 py-4 space-y-4">
        {mentorSupportContacts.map((contact) => (
          <div
            key={contact.email}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-gray-100 rounded-lg p-4"
          >
            <div>
              <p className="font-semibold text-gray-900">{contact.role}</p>
              <p className="text-sm text-gray-600">{contact.name}</p>
            </div>
            <div className="mt-3 sm:mt-0 text-sm text-gray-500">
              <p>
                <i className="fas fa-envelope mr-2"></i>
                {contact.email}
              </p>
              <p className="mt-1">
                <i className="fas fa-phone mr-2"></i>
                {contact.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <SummaryCardsSection />
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <ApprovalQueuePanel />
              </div>
              <UpcomingInterviewsPanel />
            </section>
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <StudentProgressPanel />
              </div>
              <RecentUpdatesPanel />
            </section>
            <MentorResourcesPanel compact />
          </>
        );
      case 'approvals':
        return (
          <>
            <ApprovalInsightsGrid />
            <ApprovalQueuePanel
              heading="Requests awaiting your review"
              description="Approve student applications, employer collaborations, and documentation to keep the pipeline moving."
              showCTA={false}
            />
            <RecentUpdatesPanel
              heading="Activity log"
              description="Latest submissions and reminders from mentees linked to your approval queue."
            />
          </>
        );
      case 'calendar':
        return (
          <>
            <UpcomingInterviewsPanel
              heading="Scheduled interviews"
              description="All interviews synced with classroom timetables and employer availability."
              showCTA={false}
            />
            <CalendarPreparationPanel />
          </>
        );
      case 'progress':
        return (
          <>
            <StudentProgressPanel
              heading="Mentee progress tracker"
              description="Drill into each student’s current stage and capture the next mentoring action."
              showCTA={false}
            />
            <RecentUpdatesPanel
              heading="Coaching notes & alerts"
              description="Mentor reminders, placement cell nudges, and feedback summaries to review with mentees."
            />
          </>
        );
      case 'analytics':
        return (
          <>
            <AnalyticsHighlightsGrid />
            <PipelineHealthPanel />
          </>
        );
      case 'resources':
        return (
          <>
            <MentorResourcesPanel compact={false} showCTA={false} />
            <MentorSupportPanel />
          </>
        );
      default:
        return null;
    }
  };

  const currentCopy = tabCopy[activeTab] || tabCopy[DEFAULT_TAB];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-30">
        <Navbar />
      </div>

      <div className="flex pt-16">
        <aside className="w-72 bg-white shadow-lg fixed h-full z-20 top-16">
          <div className="p-6 border-b border-gray-100">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Mentor workspace</p>
            <h2 className="mt-2 text-xl font-semibold text-gray-900">Guide internship journeys</h2>
            <p className="mt-2 text-sm text-gray-600">
              Track approvals, interviews, and learner progress from one place.
            </p>
          </div>

          <nav className="px-4 py-6 space-y-2">
            {DASHBOARD_TABS.map((item) => {
              const isActive = activeTab === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => handleTabChange(item.key)}
                  className={`flex w-full items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <i className={`fas ${item.icon} text-lg`}></i>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 ml-72">
          <header className="bg-white shadow-sm border-b px-8 py-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{currentCopy.subtitle}</p>
                <h1 className="text-2xl font-bold text-gray-900">{currentCopy.title}</h1>
                <p className="mt-2 text-sm text-gray-600 max-w-xl">{currentCopy.description}</p>
              </div>
              <div className="hidden sm:flex items-center space-x-3">
                <button
                  onClick={() => handleTabChange('calendar')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-purple-700 border border-purple-200 hover:border-purple-400 hover:text-purple-800"
                >
                  Sync Calendar
                </button>
                <button
                  onClick={() => handleTabChange('approvals')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 shadow-sm"
                >
                  Review Approvals
                </button>
              </div>
            </div>
          </header>

          <div className="p-8 space-y-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardScreen;

