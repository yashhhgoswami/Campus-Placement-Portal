import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdWork,
  MdTrendingUp,
  MdPerson
} from 'react-icons/md';

const StudentSidebar = ({ pendingRequestsCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: MdDashboard,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: MdPeople,
      label: 'Mentorship',
      path: '/students/mentorship',
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : null
    },
    {
      icon: MdWork,
      label: 'Job Portal',
      path: '/students/jobs'
    },
    {
      icon: MdTrendingUp,
      label: 'Placements',
      path: '/students/placements'
    },
    {
      icon: MdPerson,
      label: 'Profile',
      path: '/students/profile'
    }
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }

    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-20 top-16">
      <div className="px-6 py-5 border-b border-slate-100">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Student Portal</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">Navigate</h2>
      </div>
      <nav className="px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`group flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100 shadow-sm'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <span
                className={`mr-3 flex h-9 w-9 items-center justify-center rounded-lg border ${
                  active
                    ? 'border-blue-100 bg-blue-600 text-white'
                    : 'border-transparent bg-blue-50 text-blue-600 group-hover:border-blue-200'
                }`}
              >
                <Icon className="text-base" />
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="ml-2 inline-flex items-center rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default StudentSidebar;