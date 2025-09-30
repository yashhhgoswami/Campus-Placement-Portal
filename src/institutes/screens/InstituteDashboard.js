import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import StatsCard from '../components/StatsCard';
import { 
  MdPeople,
  MdBusiness,
  MdAnalytics,
  MdWork,
  MdTrendingUp,
  MdBusinessCenter,
  MdCalendarToday,
  MdArrowForward,
  MdAccessTime,
  MdCheckCircle,
  MdPending,
  MdAssignment
} from 'react-icons/md';
import { getOverviewAnalytics, getRecentActivities } from '../services/analyticsService';
import { getPendingCompanyApprovals, getActivePlacementDrives } from '../services/companyManagementService';
import { getUnplacedStudents, getStudentApplications } from '../services/studentManagementService';

const InstituteDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    overview: {},
    recentActivities: [],
    pendingCompanies: [],
    activeDrives: [],
    unplacedStudents: [],
    recentApplications: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          overviewResult,
          activitiesResult,
          pendingCompaniesResult,
          activeDrivesResult,
          unplacedStudentsResult,
          recentApplicationsResult
        ] = await Promise.all([
          getOverviewAnalytics().catch(() => ({ data: {} })),
          getRecentActivities(5).catch(() => ({ data: [] })),
          getPendingCompanyApprovals().catch(() => ({ companies: [] })),
          getActivePlacementDrives().catch(() => ({ drives: [] })),
          getUnplacedStudents().catch(() => ({ students: [] })),
          getStudentApplications(10).catch(() => ({ applications: [] }))
        ]);

        setDashboardData({
          overview: overviewResult.data || {},
          recentActivities: activitiesResult.data || [],
          pendingCompanies: (pendingCompaniesResult.companies || []).slice(0, 5),
          activeDrives: (activeDrivesResult.drives || []).slice(0, 4),
          unplacedStudents: (unplacedStudentsResult.students || []).slice(0, 8),
          recentApplications: (recentApplicationsResult.applications || []).slice(0, 6)
        });
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <InstituteNavbar />

      <div className="flex pt-16">
        {/* Sidebar */}
        <InstituteSidebar 
          pendingCompanyApprovals={dashboardData.pendingCompanies.length} 
          activePlacementDrives={dashboardData.activeDrives.length}
          unplacedStudents={dashboardData.unplacedStudents.length}
        />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TPO Dashboard</h1>
              <p className="text-gray-600">Welcome back! Manage placements, track student progress, and coordinate with companies.</p>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Pending Company Approvals"
                value={dashboardData.pendingCompanies?.length || '12'}
                icon={MdBusiness}
                color="orange"
                trend="down"
                trendValue="-2"
                description="Awaiting approval"
                onClick={() => navigate('/institute/companies')}
              />
              
              <StatsCard
                title="Active Placement Drives"
                value={dashboardData.activeDrives?.length || '8'}
                icon={MdWork}
                color="blue"
                trend="up"
                trendValue="+3"
                description="Currently running"
                onClick={() => navigate('/institute/placement-drives')}
              />
              
              <StatsCard
                title="Placement Rate"
                value={`${dashboardData.overview.placementRate || 92.5}%`}
                icon={MdTrendingUp}
                color="emerald"
                trend="up"
                trendValue="+2.3%"
                description="This academic year"
                onClick={() => navigate('/institute/analytics')}
              />
              
              <StatsCard
                title="Unplaced Students"
                value={dashboardData.unplacedStudents?.length || '338'}
                icon={MdPeople}
                color="red"
                trend="down"
                trendValue="-45"
                description="Need placement"
                onClick={() => navigate('/institute/students')}
              />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Average Package"
                value={`₹${((dashboardData.overview.averagePackage || 850000) / 100000).toFixed(1)}L`}
                icon={MdBusinessCenter}
                color="emerald"
                trend="up"
                trendValue="+15%"
                description="Current year average"
              />
              
              <StatsCard
                title="Top Package"
                value={`₹${((dashboardData.overview.topPackage || 5000000) / 100000).toFixed(0)}L`}
                icon={MdTrendingUp}
                color="blue"
                description="Highest this year"
              />
              
              <StatsCard
                title="Companies Registered"
                value={dashboardData.overview.totalCompanies || '156'}
                icon={MdCalendarToday}
                color="purple"
                description="Approved companies"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                  <button 
                    onClick={() => navigate('/institute/analytics')}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
                  >
                    View All <MdArrowForward className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {(dashboardData.recentActivities.length > 0 ? dashboardData.recentActivities : [
                    {
                      id: 1,
                      type: 'company',
                      title: 'New Company Registration',
                      description: 'TechCorp Solutions submitted placement drive request',
                      timestamp: new Date().toISOString(),
                      priority: 'medium'
                    },
                    {
                      id: 2,
                      type: 'placement',
                      title: 'Student Placement Confirmed',
                      description: '25 students placed through Microsoft India drive',
                      timestamp: new Date(Date.now() - 86400000).toISOString(),
                      priority: 'high'
                    },
                    {
                      id: 3,
                      type: 'application',
                      title: 'Application Deadline Extended',
                      description: 'Amazon Development Center extended deadline to Oct 20',
                      timestamp: new Date(Date.now() - 172800000).toISOString(),
                      priority: 'low'
                    }
                  ]).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'placement' ? 'bg-emerald-100' :
                        activity.type === 'company' ? 'bg-blue-100' :
                        activity.type === 'application' ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        {activity.type === 'placement' && <MdWork className="text-emerald-600 text-sm" />}
                        {activity.type === 'company' && <MdBusiness className="text-blue-600 text-sm" />}
                        {activity.type === 'application' && <MdAssignment className="text-purple-600 text-sm" />}
                        {activity.type === 'interview' && <MdCalendarToday className="text-orange-600 text-sm" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                        <p className="text-gray-600 text-xs mt-1">{activity.description}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                        activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {activity.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Company Approvals */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pending Company Approvals</h3>
                  <button 
                    onClick={() => navigate('/institute/companies')}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
                  >
                    View All <MdArrowForward className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {(dashboardData.pendingCompanies.length > 0 ? dashboardData.pendingCompanies : [
                    {
                      id: 1,
                      name: "TechCorp Solutions",
                      industry: "Software Development",
                      location: "Bangalore",
                      packageRange: "₹8-15 LPA",
                      positions: 25
                    },
                    {
                      id: 2,
                      name: "InnovateTech Pvt Ltd",
                      industry: "AI/ML",
                      location: "Hyderabad",
                      packageRange: "₹12-20 LPA",  
                      positions: 15
                    }
                  ]).map((company) => (
                    <div key={company.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                         onClick={() => navigate(`/institute/companies/${company.id}`)}>
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <MdBusiness className="text-orange-600 text-lg" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{company.name}</p>
                        <p className="text-gray-600 text-xs">{company.industry} • {company.location}</p>
                        <p className="text-gray-500 text-xs">Package: {company.packageRange} • {company.positions} positions</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                          <MdPending className="inline mr-1" />
                          Pending
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Placement Drives */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Placement Drives</h3>
                <button 
                  onClick={() => navigate('/institute/placement-drives')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
                >
                  View All <MdArrowForward className="ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(dashboardData.activeDrives.length > 0 ? dashboardData.activeDrives : [
                  {
                    id: 1,
                    companyName: "Microsoft India",
                    industry: "Technology",
                    status: "Active",
                    applicationDeadline: "2025-10-15",
                    totalPositions: 50,
                    packageRange: "₹15-25 LPA",
                    applicationsCount: 142
                  },
                  {
                    id: 2,
                    companyName: "Amazon Development Center",
                    industry: "E-commerce/Cloud",
                    status: "Interview",
                    applicationDeadline: "2025-10-10",
                    totalPositions: 35,
                    packageRange: "₹18-30 LPA",
                    applicationsCount: 98
                  }
                ]).map((drive) => (
                  <div key={drive.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors cursor-pointer"
                       onClick={() => navigate(`/institute/placement-drives/${drive.id}`)}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{drive.companyName}</h4>
                        <p className="text-gray-600 text-xs">{drive.industry}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        drive.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        drive.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {drive.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <MdAccessTime className="mr-1" />
                        Deadline: {new Date(drive.applicationDeadline).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MdWork className="mr-1" />
                        {drive.totalPositions} positions
                      </div>
                      <div className="flex items-center">
                        <MdBusinessCenter className="mr-1" />
                        {drive.packageRange}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Applications</span>
                        <span className="font-medium text-emerald-600">{drive.applicationsCount}/{drive.totalPositions * 3}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/institute/companies/pending')}
                  className="flex items-center space-x-3 p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors text-left"
                >
                  <MdCheckCircle className="text-orange-600 text-xl" />
                  <div>
                    <p className="font-medium text-orange-700">Approve Companies</p>
                    <p className="text-xs text-orange-600">Review pending requests</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/institute/placement-drives/create')}
                  className="flex items-center space-x-3 p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                >
                  <MdWork className="text-blue-600 text-xl" />
                  <div>
                    <p className="font-medium text-blue-700">Create Drive</p>
                    <p className="text-xs text-blue-600">Launch placement drive</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/institute/analytics')}
                  className="flex items-center space-x-3 p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-left"
                >
                  <MdAnalytics className="text-purple-600 text-xl" />
                  <div>
                    <p className="font-medium text-purple-700">View Analytics</p>
                    <p className="text-xs text-purple-600">Placement insights</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate('/institute/students/unplaced')}
                  className="flex items-center space-x-3 p-4 border-2 border-dashed border-red-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors text-left"
                >
                  <MdPeople className="text-red-600 text-xl" />
                  <div>
                    <p className="font-medium text-red-700">Track Students</p>
                    <p className="text-xs text-red-600">Monitor placement status</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;