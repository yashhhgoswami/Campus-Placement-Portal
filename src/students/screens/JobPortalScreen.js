import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentLayout from '../components/StudentLayout';
import {
  getAllJobs,
  getJobById,
  applyToJob,
  getStudentApplications,
  withdrawApplication
} from '../services/jobService';
import {
  MdWork,
  MdLocationOn,
  MdAccessTime,
  MdAttachMoney,
  MdBusiness,
  MdSearch,
  MdBookmark,
  MdSend,
  MdCheckCircle,
  MdCancel,
  MdVisibility
} from 'react-icons/md';

const JobPortalScreen = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    resume: '',
    coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    location: 'all',
    experience: 'all',
    skills: []
  });

  const loadJobData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllJobs(filters);
      setJobs(result.jobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadApplications = useCallback(async () => {
    try {
      const result = await getStudentApplications(user?.id || 1);
      setApplications(result.applications);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  }, [user?.id]);

  useEffect(() => {
    loadJobData();
  }, [loadJobData]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const handleViewJob = async (jobId) => {
    try {
      const result = await getJobById(jobId);
      setSelectedJob(result.job);
      setShowJobModal(true);
    } catch (error) {
      alert('Error loading job details');
    }
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
    setApplicationData({
      resume: 'resume_' + (user?.name || 'student').toLowerCase().replace(/\s+/g, '_') + '.pdf',
      coverLetter: `Dear Hiring Manager,\n\nI am excited to apply for the ${job.title} position at ${job.company}. As a motivated student with relevant skills in ${job.skills
        .slice(0, 3)
        .join(', ')}, I believe I would be a valuable addition to your team.\n\nI am particularly drawn to this opportunity because it aligns with my career goals and interests. I am eager to contribute to your team and learn from experienced professionals.\n\nThank you for considering my application. I look forward to hearing from you.\n\nBest regards,\n${user?.name || 'Student'}`
    });
  };

  const submitApplication = async () => {
    if (!selectedJob || !applicationData.coverLetter.trim()) return;

    try {
      setSubmitting(true);
      await applyToJob(selectedJob.id, user?.id || 1, applicationData);

      setShowApplicationModal(false);
      setApplicationData({ resume: '', coverLetter: '' });
      setSelectedJob(null);

      await Promise.all([loadJobData(), loadApplications()]);

      alert('Application submitted successfully!');
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWithdrawApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to withdraw this application?')) return;

    try {
      await withdrawApplication(applicationId, user?.id || 1);
      await loadApplications();
      alert('Application withdrawn successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getApplicationStatus = (status) => {
    const statusConfig = {
      applied: { icon: MdCheckCircle, color: 'text-blue-600', bg: 'bg-blue-100', text: 'Applied' },
      under_review: { icon: MdVisibility, color: 'text-amber-600', bg: 'bg-amber-100', text: 'Under Review' },
      shortlisted: { icon: MdBookmark, color: 'text-emerald-600', bg: 'bg-emerald-100', text: 'Shortlisted' },
      rejected: { icon: MdCancel, color: 'text-rose-600', bg: 'bg-rose-100', text: 'Rejected' }
    };
    return statusConfig[status] || statusConfig.applied;
  };

  const hasApplied = useMemo(
    () => (jobId) => applications.some((app) => app.jobId === jobId),
    [applications]
  );

  const headerContent = (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-emerald-600">Job portal</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Opportunities curated for you</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Track applications, explore new roles, and stay aligned with upcoming placement drives tailored to your profile.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('applications')}
          className="hidden sm:inline-flex items-center rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800"
        >
          View applications
        </button>
        <button
          onClick={() => setActiveTab('browse')}
          className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          Browse jobs
        </button>
      </div>
    </div>
  );

  if (loading && activeTab === 'browse') {
    return (
      <StudentLayout header={headerContent}>
        <div className="flex h-72 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
            <p className="mt-4 text-sm text-slate-500">Loading job opportunities...</p>
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
            onClick={() => setActiveTab('browse')}
            className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full ${
              activeTab === 'browse'
                ? 'text-emerald-600 after:bg-emerald-500'
                : 'text-slate-500 hover:text-slate-700 after:bg-transparent'
            }`}
          >
            Browse jobs
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`relative py-3 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full ${
              activeTab === 'applications'
                ? 'text-emerald-600 after:bg-emerald-500'
                : 'text-slate-500 hover:text-slate-700 after:bg-transparent'
            }`}
          >
            My applications
            {applications.length > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-white">
                {applications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === 'browse' && (
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                <div className="relative xl:col-span-2">
                  <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search jobs, companies, skills..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm shadow-inner focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
                <select
                  value={filters.type}
                  onChange={(e) => updateFilter('type', e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="all">All types</option>
                  <option value="internship">Internships</option>
                  <option value="job">Full-time jobs</option>
                </select>
                <select
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="all">All locations</option>
                  <option value="remote">Remote</option>
                  <option value="california">California</option>
                  <option value="new york">New York</option>
                  <option value="karnataka">Karnataka</option>
                </select>
                <select
                  value={filters.experience}
                  onChange={(e) => updateFilter('experience', e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="all">All levels</option>
                  <option value="entry">Entry level</option>
                  <option value="mid">Mid level</option>
                  <option value="senior">Senior level</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                    <div>
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
                        <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          job.type === 'internship'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {job.type === 'internship' ? 'Internship' : 'Full-time'}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center">
                          <MdBusiness className="mr-1 text-slate-400" />
                          {job.company}
                        </span>
                        <span className="flex items-center">
                          <MdLocationOn className="mr-1 text-slate-400" />
                          {job.location}
                          {job.remote && <span className="ml-1 text-emerald-600">(Remote)</span>}
                        </span>
                        <span className="flex items-center">
                          <MdAccessTime className="mr-1 text-slate-400" />
                          {job.type === 'internship' ? job.duration : 'Full-time'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm font-semibold text-slate-700">
                      {job.type === 'internship' ? job.stipend : job.salary}
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm text-slate-600">{job.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.slice(0, 5).map((skill, index) => (
                      <span key={index} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 5 && (
                      <span className="text-xs text-slate-400">+{job.skills.length - 5} more</span>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      <span>&bull;</span>
                      <span>{job.applicants} applicants</span>
                      <span>&bull;</span>
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewJob(job.id)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
                      >
                        View details
                      </button>
                      <button
                        onClick={() => handleApplyClick(job)}
                        disabled={hasApplied(job.id)}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                          hasApplied(job.id)
                            ? 'bg-slate-200 text-slate-500'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {hasApplied(job.id) ? 'Applied' : 'Apply now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {jobs.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                <MdWork className="mx-auto text-4xl text-slate-300" />
                <p className="mt-4 text-sm font-semibold text-slate-700">No jobs found</p>
                <p className="mt-2 text-xs text-slate-500">Try adjusting your filters or check back later for new opportunities.</p>
              </div>
            )}
          </section>
        )}

        {activeTab === 'applications' && (
          <section>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((application) => {
                  const statusConfig = getApplicationStatus(application.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div key={application.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{application.job.title}</h3>
                          <p className="text-sm text-slate-600">{application.job.company}</p>
                          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center">
                              <MdLocationOn className="mr-1 text-slate-400" />
                              {application.job.location}
                            </span>
                            <span className="flex items-center">
                              <MdAccessTime className="mr-1 text-slate-400" />
                              {application.job.type === 'internship' ? application.job.duration : 'Full-time'}
                            </span>
                            <span className="flex items-center">
                              <MdAttachMoney className="mr-1 text-slate-400" />
                              {application.job.type === 'internship'
                                ? application.job.stipend
                                : application.job.salary}
                            </span>
                          </div>
                          <p className="mt-3 text-xs text-slate-500">
                            Applied on {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${statusConfig.bg}`}>
                            <StatusIcon className={`text-sm ${statusConfig.color}`} />
                            <span className={statusConfig.color}>{statusConfig.text}</span>
                          </div>
                          {application.status === 'applied' && (
                            <button
                              onClick={() => handleWithdrawApplication(application.id)}
                              className="text-sm font-semibold text-rose-600 underline-offset-4 hover:underline"
                            >
                              Withdraw
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                <MdSend className="mx-auto text-4xl text-slate-300" />
                <p className="mt-4 text-sm font-semibold text-slate-700">No applications yet</p>
                <p className="mt-2 text-xs text-slate-500">You haven't applied to any roles yet. Start exploring opportunities.</p>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Browse jobs
                </button>
              </div>
            )}
          </section>
        )}
      </div>

      {showJobModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{selectedJob.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center">
                    <MdBusiness className="mr-2 text-slate-400" />
                    {selectedJob.company}
                  </span>
                  <span className="flex items-center">
                    <MdLocationOn className="mr-2 text-slate-400" />
                    {selectedJob.location}
                    {selectedJob.remote && <span className="ml-1 text-emerald-600">(Remote)</span>}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowJobModal(false)}
                className="text-2xl text-slate-400 transition hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-slate-900">Job description</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{selectedJob.description}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-slate-900">Requirements</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-slate-900">Required skills</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span key={index} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">Job details</h3>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Type</span>
                      <span className="font-semibold text-slate-700">
                        {selectedJob.type === 'internship' ? 'Internship' : 'Full-time'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-semibold text-slate-700">
                        {selectedJob.type === 'internship' ? selectedJob.duration : 'Permanent'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Compensation</span>
                      <span className="font-semibold text-slate-700">
                        {selectedJob.type === 'internship' ? selectedJob.stipend : selectedJob.salary}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Experience</span>
                      <span className="font-semibold text-slate-700">{selectedJob.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Posted</span>
                      <span className="font-semibold text-slate-700">
                        {new Date(selectedJob.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Deadline</span>
                      <span className="font-semibold text-slate-700">
                        {new Date(selectedJob.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Applicants</span>
                      <span className="font-semibold text-slate-700">{selectedJob.applicants}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowJobModal(false)}
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowJobModal(false);
                      handleApplyClick(selectedJob);
                    }}
                    disabled={hasApplied(selectedJob.id)}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      hasApplied(selectedJob.id)
                        ? 'bg-slate-200 text-slate-500'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {hasApplied(selectedJob.id) ? 'Applied' : 'Apply now'}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Apply for {selectedJob.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{selectedJob.company} • {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-2xl text-slate-400 transition hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">Resume</label>
                <input
                  type="text"
                  value={applicationData.resume}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, resume: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="resume_filename.pdf"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">Cover letter</label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData((prev) => ({ ...prev, coverLetter: e.target.value }))}
                  rows={8}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Write your cover letter here..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowApplicationModal(false)}
                disabled={submitting}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={submitApplication}
                disabled={submitting || !applicationData.coverLetter.trim()}
                className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Submit application'}
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentLayout>
  );
};

export default JobPortalScreen;