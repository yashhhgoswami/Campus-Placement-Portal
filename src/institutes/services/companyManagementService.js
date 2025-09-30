// Company Management Service
// Handles company approval workflow and management for TPO

// Mock data for development
const mockPendingCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    industry: "Software Development",
    location: "Bangalore",
    packageRange: "₹8-15 LPA",
    positions: 25,
    submittedDate: "2025-09-28",
    status: "pending"
  },
  {
    id: 2,
    name: "InnovateTech Pvt Ltd",
    industry: "AI/ML",
    location: "Hyderabad",
    packageRange: "₹12-20 LPA",
    positions: 15,
    submittedDate: "2025-09-25",
    status: "pending"
  },
  {
    id: 3,
    name: "DataFlow Systems",
    industry: "Data Analytics",
    location: "Mumbai",
    packageRange: "₹10-18 LPA",
    positions: 20,
    submittedDate: "2025-09-26",
    status: "pending"
  },
  {
    id: 4,
    name: "CloudSync Technologies",
    industry: "Cloud Computing",
    location: "Pune",
    packageRange: "₹9-16 LPA",
    positions: 18,
    submittedDate: "2025-09-24",
    status: "pending"
  },
  {
    id: 5,
    name: "WebCraft Solutions",
    industry: "Web Development",
    location: "Chennai",
    packageRange: "₹7-12 LPA",
    positions: 30,
    submittedDate: "2025-09-27",
    status: "pending"
  }
];

const mockActiveDrives = [
  {
    id: 1,
    companyName: "Microsoft India",
    industry: "Technology",
    status: "Active",
    applicationDeadline: "2025-10-15",
    totalPositions: 50,
    packageRange: "₹15-25 LPA",
    applicationsCount: 142,
    interviewDate: "2025-10-20"
  },
  {
    id: 2,
    companyName: "Amazon Development Center",
    industry: "E-commerce/Cloud",
    status: "Interview",
    applicationDeadline: "2025-10-10",
    totalPositions: 35,
    packageRange: "₹18-30 LPA",
    applicationsCount: 98,
    interviewDate: "2025-10-18"
  },
  {
    id: 3,
    companyName: "Infosys Limited",
    industry: "IT Services",
    status: "Active",
    applicationDeadline: "2025-10-20",
    totalPositions: 80,
    packageRange: "₹6-12 LPA",
    applicationsCount: 245,
    interviewDate: "2025-10-25"
  },
  {
    id: 4,
    companyName: "Wipro Technologies",
    industry: "IT Consulting",
    status: "Selection",
    applicationDeadline: "2025-10-05",
    totalPositions: 60,
    packageRange: "₹5-10 LPA",
    applicationsCount: 180,
    interviewDate: "2025-10-12"
  }
];

// API Functions
export const getPendingCompanyApprovals = async () => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      companies: mockPendingCompanies,
      total: mockPendingCompanies.length
    };
  } catch (error) {
    throw new Error('Failed to fetch pending company approvals');
  }
};

export const getActivePlacementDrives = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      drives: mockActiveDrives,
      total: mockActiveDrives.length
    };
  } catch (error) {
    throw new Error('Failed to fetch active placement drives');
  }
};

export const approveCompany = async (companyId, approvalData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In real implementation, this would make an API call
    return {
      success: true,
      message: 'Company approved successfully',
      companyId: companyId
    };
  } catch (error) {
    throw new Error('Failed to approve company');
  }
};

export const rejectCompany = async (companyId, rejectionReason) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      message: 'Company application rejected',
      companyId: companyId
    };
  } catch (error) {
    throw new Error('Failed to reject company');
  }
};

export const getCompanyDetails = async (companyId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const company = mockPendingCompanies.find(c => c.id === parseInt(companyId));
    if (!company) {
      throw new Error('Company not found');
    }
    
    return {
      success: true,
      company: {
        ...company,
        description: "Leading technology company focused on innovative solutions",
        requirements: ["B.Tech/M.Tech in CS/IT", "Strong programming skills", "Good communication"],
        benefits: ["Health insurance", "Performance bonus", "Training programs"],
        contactPerson: "HR Manager",
        email: `hr@${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: "+91-9876543210"
      }
    };
  } catch (error) {
    throw new Error('Failed to fetch company details');
  }
};

export const createPlacementDrive = async (companyId, driveData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Placement drive created successfully',
      driveId: Date.now(),
      companyId: companyId
    };
  } catch (error) {
    throw new Error('Failed to create placement drive');
  }
};