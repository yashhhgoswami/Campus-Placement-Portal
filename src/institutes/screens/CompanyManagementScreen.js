import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteNavbar from '../components/InstituteNavbar';
import InstituteSidebar from '../components/InstituteSidebar';
import { 
  MdBusiness, 
  MdCheckCircle, 
  MdCancel, 
  MdPending,
  MdSearch,
  MdFilter,
  MdLocationOn,
  MdWork,
  MdBusinessCenter,
  MdCalendarToday,
  MdEmail,
  MdPhone
} from 'react-icons/md';
import { getPendingCompanyApprovals, approveCompany, rejectCompany, getCompanyDetails } from '../services/companyManagementService';

const CompanyManagementScreen = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [processingAction, setProcessingAction] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const result = await getPendingCompanyApprovals();
      setCompanies(result.companies || []);
    } catch (error) {
      console.error('Error loading companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveCompany = async (companyId) => {
    try {
      setProcessingAction(companyId);
      await approveCompany(companyId, { approvedBy: 'TPO' });
      await loadCompanies();
      alert('Company approved successfully!');
    } catch (error) {
      alert('Failed to approve company: ' + error.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleRejectCompany = async (companyId) => {
    const reason = prompt('Please provide reason for rejection:');
    if (!reason) return;

    try {
      setProcessingAction(companyId);
      await rejectCompany(companyId, reason);
      await loadCompanies();
      alert('Company application rejected.');
    } catch (error) {
      alert('Failed to reject company: ' + error.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleViewDetails = async (companyId) => {
    try {
      const result = await getCompanyDetails(companyId);
      setSelectedCompany(result.company);
      setShowDetailsModal(true);
    } catch (error) {
      alert('Failed to load company details: ' + error.message);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || company.status === filterStatus;
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
              <p className="mt-4 text-gray-600">Loading companies...</p>
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
        <InstituteSidebar pendingCompanyApprovals={companies.length} />
        
        <div className="flex-1 ml-64">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
              <p className="text-gray-600">Review and approve company applications for placement drives</p>
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
                    placeholder="Search companies by name or industry..."
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
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Companies List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <MdBusiness className="text-emerald-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-600">{company.industry}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                      <MdPending className="inline mr-1" />
                      Pending
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MdLocationOn className="mr-2 text-gray-400" />
                      {company.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdBusinessCenter className="mr-2 text-gray-400" />
                      Package: {company.packageRange}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdWork className="mr-2 text-gray-400" />
                      {company.positions} positions available
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdCalendarToday className="mr-2 text-gray-400" />
                      Applied: {new Date(company.submittedDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(company.id)}
                      className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApproveCompany(company.id)}
                      disabled={processingAction === company.id}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm disabled:opacity-50"
                    >
                      {processingAction === company.id ? 'Approving...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleRejectCompany(company.id)}
                      disabled={processingAction === company.id}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <MdBusiness className="mx-auto text-4xl text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No companies found</h3>
                <p className="text-gray-500">No companies match your current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company Details Modal */}
      {showDetailsModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Company Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedCompany.name}</h3>
                <p className="text-gray-600 mb-4">{selectedCompany.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Company Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Industry:</span> {selectedCompany.industry}</p>
                      <p><span className="font-medium">Location:</span> {selectedCompany.location}</p>
                      <p><span className="font-medium">Package Range:</span> {selectedCompany.packageRange}</p>
                      <p><span className="font-medium">Positions:</span> {selectedCompany.positions}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center">
                        <MdEmail className="mr-2 text-gray-400" />
                        {selectedCompany.email}
                      </p>
                      <p className="flex items-center">
                        <MdPhone className="mr-2 text-gray-400" />
                        {selectedCompany.phone}
                      </p>
                      <p><span className="font-medium">Contact Person:</span> {selectedCompany.contactPerson}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Requirements</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedCompany.requirements?.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Benefits</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedCompany.benefits?.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagementScreen;