import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentLayout from '../components/StudentLayout';
import {
  MdEdit,
  MdSave,
  MdCancel,
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdSchool,
  MdWork,
  MdCode,
  MdAdd,
  MdDelete,
  MdGrade,
  MdCalendarToday,
  MdLink
} from 'react-icons/md';

const StudentProfileScreen = () => {
  const { user, updateCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    major: user?.major || '',
    currentYear: user?.currentYear || '',
    gpa: user?.gpa || '',
    graduationYear: user?.graduationYear || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
    projects: user?.projects || [],
    achievements: user?.achievements || [],
    linkedin: user?.linkedin || '',
    github: user?.github || '',
    website: user?.website || '',
    profilePicture: user?.profilePicture || null
  });

  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '', link: '' });
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '', date: '' });

  useEffect(() => {
    setProfileData((prev) => ({
      ...prev,
      ...user,
      skills: user?.skills || [],
      projects:
        user?.projects || [
          {
            id: 1,
            title: 'E-commerce Website',
            description: 'Full-stack e-commerce platform built with React and Node.js',
            technologies: 'React, Node.js, MongoDB, Express',
            link: 'https://github.com/student/ecommerce-project'
          }
        ],
      achievements:
        user?.achievements || [
          {
            id: 1,
            title: "Dean's List",
            description: 'Achieved Dean\'s List for academic excellence',
            date: '2024-05-15'
          }
        ]
    }));
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove)
    }));
  };

  const handleAddProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      const project = {
        id: Date.now(),
        ...newProject,
        technologies: newProject.technologies.split(',').map((tech) => tech.trim())
      };
      setProfileData((prev) => ({
        ...prev,
        projects: [...prev.projects, project]
      }));
      setNewProject({ title: '', description: '', technologies: '', link: '' });
    }
  };

  const handleRemoveProject = (projectId) => {
    setProfileData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== projectId)
    }));
  };

  const handleAddAchievement = () => {
    if (newAchievement.title.trim() && newAchievement.description.trim()) {
      const achievement = {
        id: Date.now(),
        ...newAchievement
      };
      setProfileData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievement]
      }));
      setNewAchievement({ title: '', description: '', date: '' });
    }
  };

  const handleRemoveAchievement = (achievementId) => {
    setProfileData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((achievement) => achievement.id !== achievementId)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      updateCurrentUser(profileData);
      setIsEditing(false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData((prev) => ({
      ...prev,
      ...user
    }));
    setIsEditing(false);
  };

  const headerActions = !isEditing ? (
    <button
      onClick={() => setIsEditing(true)}
      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
    >
      <MdEdit />
      Edit profile
    </button>
  ) : (
    <div className="flex gap-2">
      <button
        onClick={handleSave}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <MdSave />
        {loading ? 'Saving…' : 'Save changes'}
      </button>
      <button
        onClick={handleCancel}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
      >
        <MdCancel />
        Cancel
      </button>
    </div>
  );

  const headerContent = (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-blue-600">Student profile</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Manage your placement-ready profile</h1>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Keep your academic journey, projects, and achievements up to date so recruiters and mentors can get to know you better.
        </p>
      </div>
      {headerActions}
    </div>
  );

  if (loading && !isEditing) {
    return (
      <StudentLayout header={headerContent}>
        <div className="flex h-72 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
            <p className="mt-4 text-sm text-slate-500">Loading profile…</p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout header={headerContent}>
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-slate-900">
            <MdPerson className="mr-2 text-blue-500" />
            Basic information
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Full name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <p className="text-sm font-medium text-slate-900">{profileData.name || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <p className="flex items-center text-sm text-slate-700">
                  <MdEmail className="mr-2 text-slate-400" />
                  {profileData.email || 'Not provided'}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="+91 98765 43210"
                />
              ) : (
                <p className="flex items-center text-sm text-slate-700">
                  <MdPhone className="mr-2 text-slate-400" />
                  {profileData.phone || 'Not provided'}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="City, State"
                />
              ) : (
                <p className="flex items-center text-sm text-slate-700">
                  <MdLocationOn className="mr-2 text-slate-400" />
                  {profileData.location || 'Not provided'}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-600">Bio</label>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Share a short introduction, interests, and career goals…"
              />
            ) : (
              <p className="text-sm text-slate-700">{profileData.bio || 'No bio provided'}</p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-slate-900">
            <MdSchool className="mr-2 text-indigo-500" />
            Academic information
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Major</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="text-sm text-slate-700">{profileData.major || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Current year</label>
              {isEditing ? (
                <select
                  value={profileData.currentYear}
                  onChange={(e) => handleInputChange('currentYear', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Select year</option>
                  <option value="First Year">First year</option>
                  <option value="Second Year">Second year</option>
                  <option value="Third Year">Third year</option>
                  <option value="Final Year">Final year</option>
                </select>
              ) : (
                <p className="text-sm text-slate-700">{profileData.currentYear || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">CGPA</label>
              {isEditing ? (
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={profileData.gpa}
                  onChange={(e) => handleInputChange('gpa', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="flex items-center text-sm text-slate-700">
                  <MdGrade className="mr-2 text-slate-400" />
                  {profileData.gpa ? `${profileData.gpa}/10.0` : 'Not provided'}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Expected graduation</label>
              {isEditing ? (
                <input
                  type="number"
                  value={profileData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              ) : (
                <p className="flex items-center text-sm text-slate-700">
                  <MdCalendarToday className="mr-2 text-slate-400" />
                  {profileData.graduationYear || 'Not provided'}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-slate-900">
            <MdCode className="mr-2 text-sky-500" />
            Skills
          </h2>
          {isEditing && (
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="Add a skill"
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                onClick={handleAddSkill}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <MdAdd />
              </button>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {profileData.skills.length > 0 ? (
              profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                >
                  {skill}
                  {isEditing && (
                    <button onClick={() => handleRemoveSkill(skill)} className="text-blue-500 hover:text-blue-700">
                      <MdDelete size={14} />
                    </button>
                  )}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-500">No skills added yet</p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-slate-900">
            <MdLink className="mr-2 text-purple-500" />
            Social links
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {['linkedin', 'github', 'website'].map((field) => (
              <div key={field}>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  {field === 'linkedin' ? 'LinkedIn' : field === 'github' ? 'GitHub' : 'Portfolio website'}
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profileData[field] || ''}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-purple-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
                    placeholder="https://"
                  />
                ) : profileData[field] ? (
                  <a
                    href={profileData[field]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-purple-600 underline-offset-4 hover:underline"
                  >
                    View link
                  </a>
                ) : (
                  <p className="text-sm text-slate-500">Not provided</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-slate-900">
            <MdWork className="mr-2 text-emerald-500" />
            Projects
          </h2>
          {isEditing && (
            <div className="mb-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-700">Add new project</h3>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Project title"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <input
                  type="url"
                  value={newProject.link}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, link: e.target.value }))}
                  placeholder="Project link (optional)"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Project description"
                  rows={3}
                  className="md:col-span-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <input
                  type="text"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, technologies: e.target.value }))}
                  placeholder="Technologies (comma separated)"
                  className="md:col-span-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
              <button
                onClick={handleAddProject}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <MdAdd />
                Add project
              </button>
            </div>
          )}
          <div className="space-y-4">
            {profileData.projects.length > 0 ? (
              profileData.projects.map((project) => (
                <div key={project.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{project.description}</p>
                      {project.technologies && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {(Array.isArray(project.technologies) ? project.technologies : project.technologies.split(',')).map((tech, index) => (
                            <span key={index} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center text-xs font-semibold text-emerald-600 underline-offset-4 hover:underline"
                        >
                          View project
                        </a>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveProject(project.id)}
                        className="text-rose-500 transition hover:text-rose-700"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No projects added yet</p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center text-xl font-semibold text-slate-900">
            <MdGrade className="mr-2 text-amber-500" />
            Achievements
          </h2>
          {isEditing && (
            <div className="mb-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-700">Add new achievement</h3>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  type="text"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Achievement title"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
                <input
                  type="date"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement((prev) => ({ ...prev, date: e.target.value }))}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
                <textarea
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Achievement description"
                  rows={3}
                  className="md:col-span-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
              <button
                onClick={handleAddAchievement}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
              >
                <MdAdd />
                Add achievement
              </button>
            </div>
          )}
          <div className="space-y-4">
            {profileData.achievements.length > 0 ? (
              profileData.achievements.map((achievement) => (
                <div key={achievement.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">{achievement.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{achievement.description}</p>
                      {achievement.date && (
                        <p className="mt-2 text-xs text-slate-500">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveAchievement(achievement.id)}
                        className="text-rose-500 transition hover:text-rose-700"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No achievements added yet</p>
            )}
          </div>
        </section>
      </div>
    </StudentLayout>
  );
};

export default StudentProfileScreen;