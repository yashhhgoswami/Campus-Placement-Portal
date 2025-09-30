import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import { 
  MdWork, 
  MdBusiness,
  MdPeople,
  MdCalendarToday,
  MdAccessTime,
  MdBusinessCenter,
  MdSearch,
  MdFilter,
  MdAdd,
  MdEdit,
  MdVisibility,
  MdLocationOn
} from 'react-icons/md';
import { getActivePlacementDrives, createPlacementDrive } from '../services/companyManagementService';

const PlacementDrivesScreen = () => {
  const navigate = useNavigate();
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDrive, setNewDrive] = useState({
    companyName: '',
    industry: '',
    positions: '',
    packageRange: '',
    applicationDeadline: '',
    interviewDate: '',
    requirements: '',
    description: ''
  });

  useEffect(() => {
    loadPlacementDrives();
  }, []);

  const loadPlacementDrives = async () => {
    try {
      setLoading(true);
      const result = await getActivePlacementDrives();
      setDrives(result.drives || []);
    } catch (error) {
      console.error('Error loading placement drives:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDrive = async () => {
    try {
      await createPlacementDrive(1, newDrive); // Mock company ID
      await loadPlacementDrives();
      setShowCreateModal(false);
      setNewDrive({
        companyName: '',
        industry: '',
        positions: '',
        packageRange: '',
        applicationDeadline: '',
        interviewDate: '',
        requirements: '',
        description: ''
      });
      alert('Placement drive created successfully!');
    } catch (error) {
      alert('Failed to create placement drive: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800';
      case 'Interview':
        return 'bg-blue-100 text-blue-800';
      case 'Selection':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDrives = drives.filter(drive => {
    const matchesSearch = drive.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || drive.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <InstituteNavbar />
        <div className="flex pt-16">
          <InstituteSidebar />
          <div className="flex-1 ml-64 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading placement drives...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InstituteNavbar />
      
      <div className="flex pt-16">
        <InstituteSidebar activePlacementDrives={drives.length} />
        
        <div className="flex-1 ml-64">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Placement Drives</h1>
                <p className="text-gray-600">Manage active placement drives and create new ones</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2"
              >
                <MdAdd />
                Create Drive
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search placement drives by company or industry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div className="relative">
                  <MdFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="interview">Interview</option>
                    <option value="selection">Selection</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Drives Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDrives.map((drive) => (
                <div key={drive.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MdBusiness className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{drive.companyName}</h3>
                        <p className="text-sm text-gray-600">{drive.industry}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(drive.status)}`}>
                      {drive.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MdWork className="mr-2 text-gray-400" />
                      {drive.totalPositions} positions
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdBusinessCenter className="mr-2 text-gray-400" />
                      {drive.packageRange}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdAccessTime className="mr-2 text-gray-400" />
                      Deadline: {new Date(drive.applicationDeadline).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdCalendarToday className="mr-2 text-gray-400" />
                      Interview: {new Date(drive.interviewDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Applications</span>
                      <span className="text-sm font-semibold text-emerald-600">
                        {drive.applicationsCount} / {drive.totalPositions * 3}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full" 
                        style={{ width: `${Math.min((drive.applicationsCount / (drive.totalPositions * 3)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center gap-1">
                      <MdVisibility className="text-sm" />
                      View
                    </button>
                    <button className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm flex items-center gap-1">
                      <MdEdit className="text-sm" />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDrives.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <MdWork className="mx-auto text-4xl text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No placement drives found</h3>
                <p className="text-gray-500 mb-4">No drives match your current filters.</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
                >
                  Create First Drive
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Drive Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create Placement Drive</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={newDrive.companyName}
                    onChange={(e) => setNewDrive({...newDrive, companyName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <input
                    type="text"
                    value={newDrive.industry}
                    onChange={(e) => setNewDrive({...newDrive, industry: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Positions</label>
                  <input
                    type="number"
                    value={newDrive.positions}
                    onChange={(e) => setNewDrive({...newDrive, positions: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Package Range</label>
                  <input
                    type="text"
                    value={newDrive.packageRange}
                    onChange={(e) => setNewDrive({...newDrive, packageRange: e.target.value})}
                    placeholder="e.g., ₹8-15 LPA"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                  <input
                    type="date"
                    value={newDrive.applicationDeadline}
                    onChange={(e) => setNewDrive({...newDrive, applicationDeadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Date</label>
                  <input
                    type="date"
                    value={newDrive.interviewDate}
                    onChange={(e) => setNewDrive({...newDrive, interviewDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newDrive.description}
                  onChange={(e) => setNewDrive({...newDrive, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDrive}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Create Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementDrivesScreen;