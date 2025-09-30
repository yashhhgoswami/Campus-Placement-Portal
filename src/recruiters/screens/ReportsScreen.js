import React, { useState, useEffect } from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdAssessment, 
  MdFileDownload, 
  MdDateRange,
  MdTrendingUp,
  MdPeople,
  MdWork,
  MdEmail,
  MdCalendarToday,
  MdBarChart,
  MdPieChart,
  MdTimeline,
  MdFilterList,
  MdRefresh,
  MdSchedule,
  MdCheckCircle,
  MdCancel,
  MdHourglassEmpty
} from 'react-icons/md';

const ReportsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [reportData, setReportData] = useState({});

  // Mock data for reports
  useEffect(() => {
    const mockReportData = {
      overview: {
        totalApplications: 247,
        interviewsScheduled: 45,
        interviewsCompleted: 38,
        hires: 12,
        conversionRate: 4.9,
        averageTimeToHire: 18,
        topPerformingJobs: [
          { title: 'Software Engineer - Fintech', applications: 89, hires: 5 },
          { title: 'Product Manager - E-commerce', applications: 54, hires: 3 },
          { title: 'Data Scientist - Retail Analytics', applications: 43, hires: 2 },
          { title: 'UX Designer - Mobile Apps', applications: 61, hires: 2 }
        ]
      },
      pipeline: {
        stages: [
          { name: 'Applied', count: 247, percentage: 100 },
          { name: 'Screening', count: 89, percentage: 36.0 },
          { name: 'Interview', count: 45, percentage: 18.2 },
          { name: 'Final Round', count: 18, percentage: 7.3 },
          { name: 'Offer', count: 12, percentage: 4.9 }
        ]
      },
      interviews: {
        scheduled: 45,
        completed: 38,
        cancelled: 7,
        noShow: 3,
        averageRating: 4.2,
        interviewTypes: [
          { type: 'Technical', count: 18, avgDuration: 75 },
          { type: 'Behavioral', count: 15, avgDuration: 45 },
          { type: 'Portfolio Review', count: 8, avgDuration: 60 },
          { type: 'System Design', count: 4, avgDuration: 90 }
        ]
      },
      performance: {
        responseTime: 2.3,
        candidateSatisfaction: 4.4,
        offerAcceptanceRate: 83.3,
        sourcingChannels: [
          { channel: 'Naukri.com', applications: 98, hires: 5 },
          { channel: 'Employee Referrals', applications: 67, hires: 4 },
          { channel: 'LinkedIn India', applications: 45, hires: 2 },
          { channel: 'Company Careers Page', applications: 37, hires: 1 }
        ]
      }
    };

    setTimeout(() => {
      setReportData(mockReportData);
      setLoading(false);
    }, 1000);
  }, [dateRange]);

  const reportTypes = [
    { id: 'overview', name: 'Overview', icon: MdAssessment, description: 'High-level recruitment metrics' },
    { id: 'pipeline', name: 'Pipeline Analysis', icon: MdTimeline, description: 'Candidate funnel breakdown' },
    { id: 'interviews', name: 'Interview Reports', icon: MdCalendarToday, description: 'Interview performance & metrics' },
    { id: 'performance', name: 'Performance', icon: MdTrendingUp, description: 'Efficiency & satisfaction metrics' }
  ];

  const generateReport = () => {
    // Mock report generation
    console.log(`Generating ${selectedReport} report for ${dateRange}`);
  };

  const exportReport = (format) => {
    // Mock export functionality
    console.log(`Exporting ${selectedReport} report as ${format}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalApplications}</p>
              <p className="text-sm text-green-600">↗ +12% vs last month</p>
            </div>
            <MdPeople className="text-blue-600 text-2xl" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interviews</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.interviewsCompleted}</p>
              <p className="text-sm text-green-600">↗ +8% vs last month</p>
            </div>
            <MdCalendarToday className="text-green-600 text-2xl" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hires</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.hires}</p>
              <p className="text-sm text-green-600">↗ +15% vs last month</p>
            </div>
            <MdCheckCircle className="text-purple-600 text-2xl" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.conversionRate}%</p>
              <p className="text-sm text-green-600">↗ +0.5% vs last month</p>
            </div>
            <MdTrendingUp className="text-orange-600 text-2xl" />
          </div>
        </div>
      </div>

      {/* Top Performing Jobs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Jobs</h3>
        <div className="space-y-4">
          {reportData.overview.topPerformingJobs.map((job, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.applications} applications</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{job.hires} hires</p>
                <p className="text-sm text-gray-500">{((job.hires / job.applications) * 100).toFixed(1)}% rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPipelineReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recruitment Pipeline</h3>
        <div className="space-y-4">
          {reportData.pipeline.stages.map((stage, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{stage.name}</span>
                <span className="text-sm text-gray-600">{stage.count} candidates ({stage.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-orange-600 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${stage.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInterviewsReport = () => (
    <div className="space-y-6">
      {/* Interview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.interviews.scheduled}</p>
            </div>
            <MdSchedule className="text-blue-600 text-2xl" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.interviews.completed}</p>
            </div>
            <MdCheckCircle className="text-green-600 text-2xl" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.interviews.cancelled}</p>
            </div>
            <MdCancel className="text-red-600 text-2xl" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.interviews.averageRating}</p>
            </div>
            <MdTrendingUp className="text-purple-600 text-2xl" />
          </div>
        </div>
      </div>

      {/* Interview Types */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Types</h3>
        <div className="space-y-4">
          {reportData.interviews.interviewTypes.map((type, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{type.type}</h4>
                <p className="text-sm text-gray-600">{type.count} interviews</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-orange-600">{type.avgDuration} min</p>
                <p className="text-sm text-gray-500">avg duration</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPerformanceReport = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.performance.responseTime} days</p>
              <p className="text-sm text-green-600">↗ 15% faster</p>
            </div>
            <MdHourglassEmpty className="text-blue-600 text-2xl" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Candidate Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.performance.candidateSatisfaction}/5</p>
              <p className="text-sm text-green-600">↗ +0.2 vs last month</p>
            </div>
            <MdTrendingUp className="text-green-600 text-2xl" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Offer Acceptance</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.performance.offerAcceptanceRate}%</p>
              <p className="text-sm text-green-600">↗ +5% vs last month</p>
            </div>
            <MdCheckCircle className="text-purple-600 text-2xl" />
          </div>
        </div>
      </div>

      {/* Sourcing Channels */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sourcing Channels</h3>
        <div className="space-y-4">
          {reportData.performance.sourcingChannels.map((channel, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{channel.channel}</h4>
                <p className="text-sm text-gray-600">{channel.applications} applications</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{channel.hires} hires</p>
                <p className="text-sm text-gray-500">{((channel.hires / channel.applications) * 100).toFixed(1)}% conversion</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview': return renderOverviewReport();
      case 'pipeline': return renderPipelineReport();
      case 'interviews': return renderInterviewsReport();
      case 'performance': return renderPerformanceReport();
      default: return renderOverviewReport();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      
      <div className="flex pt-16">
        <RecruiterSidebar />
        
        <div className="flex-1 ml-72">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                <p className="text-gray-600">Generate comprehensive recruitment reports</p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="1year">Last Year</option>
                </select>
                <button
                  onClick={() => exportReport('pdf')}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  <MdFileDownload />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Report Type Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Types</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  
                  return (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedReport === report.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`text-2xl mb-2 ${
                        selectedReport === report.id ? 'text-orange-600' : 'text-gray-400'
                      }`} />
                      <h3 className={`font-medium mb-1 ${
                        selectedReport === report.id ? 'text-orange-900' : 'text-gray-900'
                      }`}>
                        {report.name}
                      </h3>
                      <p className={`text-sm ${
                        selectedReport === report.id ? 'text-orange-700' : 'text-gray-600'
                      }`}>
                        {report.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Report Content */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {reportTypes.find(r => r.id === selectedReport)?.name} Report
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={generateReport}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <MdRefresh />
                    <span>Refresh</span>
                  </button>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => exportReport('xlsx')}
                      className="px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Excel
                    </button>
                    <button
                      onClick={() => exportReport('csv')}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      CSV
                    </button>
                  </div>
                </div>
              </div>

              {renderReportContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsScreen;