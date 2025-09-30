import React, { useState, useEffect } from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruiterSidebar from '../components/RecruiterSidebar';
import { 
  MdDescription, 
  MdCloudUpload, 
  MdDownload, 
  MdVisibility,
  MdDelete,
  MdSearch,
  MdFilterList,
  MdFolder,
  MdInsertDriveFile,
  MdPictureAsPdf,
  MdImage,
  MdVideoLibrary,
  MdShare,
  MdStar,
  MdStarBorder,
  MdMoreVert,
  MdPerson,
  MdCalendarToday,
  MdFileUpload
} from 'react-icons/md';

const DocumentsScreen = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Mock data for documents
  useEffect(() => {
    const mockDocuments = [
      {
        id: 1,
        name: 'Rajesh_Kumar_Resume.pdf',
        type: 'pdf',
        size: '2.4 MB',
        uploadDate: '2025-10-01',
        candidateName: 'Rajesh Kumar',
        candidateId: 1,
        category: 'Resume',
        starred: true,
        tags: ['Software Engineer', 'React', 'Node.js', 'Fintech'],
        downloadCount: 5,
        notes: 'Strong technical background with fintech experience, good match for senior roles'
      },
      {
        id: 2,
        name: 'Priya_Sharma_Portfolio.pdf',
        type: 'pdf',
        size: '8.1 MB',
        uploadDate: '2025-09-30',
        candidateName: 'Priya Sharma',
        candidateId: 2,
        category: 'Portfolio',
        starred: false,
        tags: ['Product Manager', 'Strategy', 'Leadership', 'E-commerce'],
        downloadCount: 3,
        notes: 'Impressive portfolio with clear project outcomes in Indian e-commerce'
      },
      {
        id: 3,
        name: 'Arjun_Singh_CoverLetter.docx',
        type: 'docx',
        size: '156 KB',
        uploadDate: '2025-09-29',
        candidateName: 'Arjun Singh',
        candidateId: 3,
        category: 'Cover Letter',
        starred: false,
        tags: ['Data Scientist', 'Machine Learning', 'Python', 'Retail Analytics'],
        downloadCount: 2,
        notes: 'Well-written cover letter with specific examples from Indian retail projects'
      },
      {
        id: 4,
        name: 'Sneha_Patel_Certificate.pdf',
        type: 'pdf',
        size: '1.2 MB',
        uploadDate: '2025-09-28',
        candidateName: 'Sneha Patel',
        candidateId: 4,
        category: 'Certificate',
        starred: true,
        tags: ['UX Designer', 'Figma', 'Design Systems', 'Mobile UX'],
        downloadCount: 1,
        notes: 'UX Design certification from Google with focus on mobile-first design'
      },
      {
        id: 5,
        name: 'Fintech_Project_Presentation.pptx',
        type: 'pptx',
        size: '15.3 MB',
        uploadDate: '2025-09-27',
        candidateName: 'Aditya Mishra',
        candidateId: 5,
        category: 'Presentation',
        starred: false,
        tags: ['System Design', 'Architecture', 'Scalability', 'Fintech'],
        downloadCount: 7,
        notes: 'Technical presentation on scalable fintech architecture for Indian market'
      },
      {
        id: 6,
        name: 'React_Native_Code_Sample.zip',
        type: 'zip',
        size: '3.8 MB',
        uploadDate: '2025-09-26',
        candidateName: 'Rajesh Kumar',
        candidateId: 1,
        category: 'Code Sample',
        starred: false,
        tags: ['JavaScript', 'React Native', 'Mobile App', 'Payment Gateway'],
        downloadCount: 4,
        notes: 'Code samples demonstrating mobile app development with payment integration'
      }
    ];

    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1000);
  }, []);

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return MdPictureAsPdf;
      case 'docx':
      case 'doc': return MdDescription;
      case 'pptx':
      case 'ppt': return MdInsertDriveFile;
      case 'zip':
      case 'rar': return MdFolder;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return MdImage;
      case 'mp4':
      case 'avi':
      case 'mov': return MdVideoLibrary;
      default: return MdInsertDriveFile;
    }
  };

  const getFileColor = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return 'text-red-600 bg-red-100';
      case 'docx':
      case 'doc': return 'text-blue-600 bg-blue-100';
      case 'pptx':
      case 'ppt': return 'text-orange-600 bg-orange-100';
      case 'zip':
      case 'rar': return 'text-yellow-600 bg-yellow-100';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'text-green-600 bg-green-100';
      case 'mp4':
      case 'avi':
      case 'mov': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'resume': return 'text-blue-600 bg-blue-100';
      case 'portfolio': return 'text-purple-600 bg-purple-100';
      case 'cover letter': return 'text-green-600 bg-green-100';
      case 'certificate': return 'text-yellow-600 bg-yellow-100';
      case 'presentation': return 'text-orange-600 bg-orange-100';
      case 'code sample': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || doc.category.toLowerCase() === filterBy.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const toggleStar = (documentId) => {
    setDocuments(documents.map(doc => 
      doc.id === documentId ? { ...doc, starred: !doc.starred } : doc
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
                <p className="text-gray-600">Manage resumes, portfolios & candidate files</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    List
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200">
                  <MdCloudUpload />
                  <span>Upload</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents by name, candidate, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <MdFilterList className="text-gray-400" />
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="resume">Resume</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="cover letter">Cover Letter</option>
                    <option value="certificate">Certificate</option>
                    <option value="presentation">Presentation</option>
                    <option value="code sample">Code Sample</option>
                  </select>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name A-Z</option>
                  <option value="size">File Size</option>
                  <option value="downloads">Most Downloaded</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Documents</p>
                    <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                  </div>
                  <MdInsertDriveFile className="text-blue-600 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resumes</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {documents.filter(doc => doc.category === 'Resume').length}
                    </p>
                  </div>
                  <MdPictureAsPdf className="text-red-600 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Portfolios</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {documents.filter(doc => doc.category === 'Portfolio').length}
                    </p>
                  </div>
                  <MdFolder className="text-purple-600 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Starred</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {documents.filter(doc => doc.starred).length}
                    </p>
                  </div>
                  <MdStar className="text-yellow-600 text-2xl" />
                </div>
              </div>
            </div>

            {/* Documents Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDocuments.map((document) => {
                  const FileIcon = getFileIcon(document.type);
                  
                  return (
                    <div key={document.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                      {/* File Icon and Actions */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileColor(document.type)}`}>
                          <FileIcon className="text-xl" />
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => toggleStar(document.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            {document.starred ? (
                              <MdStar className="text-yellow-500" />
                            ) : (
                              <MdStarBorder className="text-gray-400" />
                            )}
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MdMoreVert className="text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {/* Document Info */}
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-900 mb-1 truncate" title={document.name}>
                          {document.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                            {document.category}
                          </span>
                          <span className="text-xs text-gray-500">{document.size}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MdPerson className="mr-1 text-gray-400" />
                          <span>{document.candidateName}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MdCalendarToday className="mr-1 text-gray-400" />
                          <span>{document.uploadDate}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {document.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                          {document.tags.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{document.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                            <MdVisibility />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Download">
                            <MdDownload />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Share">
                            <MdShare />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500">
                          {document.downloadCount} downloads
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDocuments.map((document) => {
                        const FileIcon = getFileIcon(document.type);
                        
                        return (
                          <tr key={document.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${getFileColor(document.type)}`}>
                                  <FileIcon className="text-sm" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{document.name}</div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {document.tags.slice(0, 2).map((tag, index) => (
                                      <span key={index} className="px-1 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{document.candidateName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                                {document.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.size}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.uploadDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => toggleStar(document.id)}
                                  className="text-gray-400 hover:text-yellow-600"
                                >
                                  {document.starred ? <MdStar /> : <MdStarBorder />}
                                </button>
                                <button className="text-gray-400 hover:text-blue-600">
                                  <MdVisibility />
                                </button>
                                <button className="text-gray-400 hover:text-green-600">
                                  <MdDownload />
                                </button>
                                <button className="text-gray-400 hover:text-red-600">
                                  <MdDelete />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <MdDescription className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsScreen;