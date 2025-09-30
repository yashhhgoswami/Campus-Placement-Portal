import React from 'react';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';

const StudentLayout = ({ header, sidebarProps, children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <StudentNavbar />

      <div className="flex pt-16">
        <StudentSidebar {...sidebarProps} />

        <main className="flex-1 ml-64 min-h-[calc(100vh-4rem)]">
          {header && (
            <div className="bg-white border-b border-slate-200 shadow-sm px-8 py-6">
              {typeof header === 'function' ? header() : header}
            </div>
          )}

          <div className="px-8 py-8 space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
