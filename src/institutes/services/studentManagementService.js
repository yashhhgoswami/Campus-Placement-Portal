// Student Management Service
// Handles student placement tracking and management for TPO

// Mock data for development
const mockUnplacedStudents = [
  {
    id: 1,
    name: "Rahul Sharma",
    rollNumber: "CS21B001",
    branch: "Computer Science",
    cgpa: 8.5,
    email: "rahul.sharma@college.edu",
    phone: "+91-9876543210",
    skills: ["Java", "Python", "React", "Spring Boot"],
    appliedCompanies: 5,
    interviewsAttended: 2,
    status: "seeking",
    preferredLocations: ["Bangalore", "Hyderabad"],
    expectedPackage: "₹8-12 LPA"
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNumber: "IT21B023",
    branch: "Information Technology",
    cgpa: 9.1,
    email: "priya.patel@college.edu",
    phone: "+91-9876543211",
    skills: ["JavaScript", "Node.js", "MongoDB", "AWS"],
    appliedCompanies: 8,
    interviewsAttended: 4,
    status: "seeking",
    preferredLocations: ["Mumbai", "Pune"],
    expectedPackage: "₹10-15 LPA"
  },
  {
    id: 3,
    name: "Arjun Kumar",
    rollNumber: "EC21B045",
    branch: "Electronics & Communication",
    cgpa: 7.8,
    email: "arjun.kumar@college.edu",
    phone: "+91-9876543212",
    skills: ["C++", "MATLAB", "VLSI", "Embedded Systems"],
    appliedCompanies: 3,
    interviewsAttended: 1,
    status: "seeking",
    preferredLocations: ["Chennai", "Bangalore"],
    expectedPackage: "₹6-10 LPA"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    rollNumber: "CS21B078",
    branch: "Computer Science",
    cgpa: 8.9,
    email: "sneha.reddy@college.edu",
    phone: "+91-9876543213",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Science"],
    appliedCompanies: 6,
    interviewsAttended: 3,
    status: "seeking",
    preferredLocations: ["Hyderabad", "Bangalore"],
    expectedPackage: "₹12-18 LPA"
  },
  {
    id: 5,
    name: "Vikash Singh",
    rollNumber: "ME21B089",
    branch: "Mechanical Engineering",
    cgpa: 7.5,
    email: "vikash.singh@college.edu",
    phone: "+91-9876543214",
    skills: ["AutoCAD", "SolidWorks", "Project Management", "Quality Control"],
    appliedCompanies: 4,
    interviewsAttended: 2,
    status: "seeking",
    preferredLocations: ["Delhi", "Gurgaon"],
    expectedPackage: "₹5-8 LPA"
  },
  {
    id: 6,
    name: "Ananya Gupta",
    rollNumber: "IT21B056",
    branch: "Information Technology",
    cgpa: 8.7,
    email: "ananya.gupta@college.edu",
    phone: "+91-9876543215",
    skills: ["React", "Angular", "UI/UX Design", "Figma"],
    appliedCompanies: 7,
    interviewsAttended: 3,
    status: "seeking",
    preferredLocations: ["Mumbai", "Bangalore"],
    expectedPackage: "₹9-14 LPA"
  },
  {
    id: 7,
    name: "Rohit Agarwal",
    rollNumber: "CS21B034",
    branch: "Computer Science",
    cgpa: 8.2,
    email: "rohit.agarwal@college.edu",
    phone: "+91-9876543216",
    skills: ["Java", "Spring", "Microservices", "Docker"],
    appliedCompanies: 5,
    interviewsAttended: 2,
    status: "seeking",
    preferredLocations: ["Pune", "Mumbai"],
    expectedPackage: "₹8-13 LPA"
  },
  {
    id: 8,
    name: "Kavya Nair",
    rollNumber: "EC21B067",
    branch: "Electronics & Communication",
    cgpa: 8.4,
    email: "kavya.nair@college.edu",
    phone: "+91-9876543217",
    skills: ["Python", "IoT", "Raspberry Pi", "Circuit Design"],
    appliedCompanies: 4,
    interviewsAttended: 1,
    status: "seeking",
    preferredLocations: ["Kochi", "Bangalore"],
    expectedPackage: "₹7-11 LPA"
  }
];

const mockStudentApplications = [
  {
    id: 1,
    studentId: 1,
    studentName: "Rahul Sharma",
    companyName: "TechCorp Solutions",
    position: "Software Developer",
    appliedDate: "2025-09-25",
    status: "under_review",
    interviewDate: null,
    feedback: null
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Priya Patel",
    companyName: "Microsoft India",
    position: "Full Stack Developer",
    appliedDate: "2025-09-28",
    status: "shortlisted",
    interviewDate: "2025-10-15",
    feedback: "Strong technical background"
  },
  {
    id: 3,
    studentName: "Arjun Kumar",
    companyName: "Amazon Development Center",
    position: "Software Engineer",
    appliedDate: "2025-09-26",
    status: "interview_scheduled",
    interviewDate: "2025-10-12",
    feedback: null
  },
  {
    id: 4,
    studentId: 4,
    studentName: "Sneha Reddy",
    companyName: "Google India",
    position: "Data Scientist",
    appliedDate: "2025-09-27",
    status: "selected",
    interviewDate: "2025-10-05",
    feedback: "Excellent problem-solving skills"
  },
  {
    id: 5,
    studentId: 5,
    studentName: "Vikash Singh",
    companyName: "Mahindra & Mahindra",
    position: "Mechanical Engineer",
    appliedDate: "2025-09-24",
    status: "rejected",
    interviewDate: "2025-10-02",
    feedback: "Need more experience in automotive domain"
  },
  {
    id: 6,
    studentId: 6,
    studentName: "Ananya Gupta",
    companyName: "Flipkart",
    position: "UI/UX Designer",
    appliedDate: "2025-09-29",
    status: "under_review",
    interviewDate: null,
    feedback: null
  }
];

// API Functions
export const getUnplacedStudents = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      students: mockUnplacedStudents,
      total: mockUnplacedStudents.length
    };
  } catch (error) {
    throw new Error('Failed to fetch unplaced students');
  }
};

export const getStudentApplications = async (limit = 10) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      applications: mockStudentApplications.slice(0, limit),
      total: mockStudentApplications.length
    };
  } catch (error) {
    throw new Error('Failed to fetch student applications');
  }
};

export const getStudentDetails = async (studentId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const student = mockUnplacedStudents.find(s => s.id === parseInt(studentId));
    if (!student) {
      throw new Error('Student not found');
    }
    
    return {
      success: true,
      student: {
        ...student,
        resume: `/resumes/${student.rollNumber}_resume.pdf`,
        projects: [
          "E-commerce Web Application",
          "Student Management System",
          "Weather Prediction ML Model"
        ],
        achievements: [
          "Coding Competition Winner - 2024",
          "Best Project Award - Final Year",
          "Technical Society Member"
        ],
        mentorFeedback: "Good technical skills, needs confidence building"
      }
    };
  } catch (error) {
    throw new Error('Failed to fetch student details');
  }
};

export const updateStudentStatus = async (studentId, status, notes = '') => {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      success: true,
      message: 'Student status updated successfully',
      studentId: studentId,
      newStatus: status
    };
  } catch (error) {
    throw new Error('Failed to update student status');
  }
};

export const getPlacementStatistics = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return {
      success: true,
      statistics: {
        totalStudents: 4500,
        placedStudents: 4162,
        unplacedStudents: 338,
        placementRate: 92.5,
        averagePackage: 8.5,
        topPackage: 50.0,
        companiesVisited: 156,
        activeApplications: 245,
        interviewsScheduled: 89
      }
    };
  } catch (error) {
    throw new Error('Failed to fetch placement statistics');
  }
};

export const exportStudentData = async (filters = {}) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real implementation, this would generate and return a file
    return {
      success: true,
      message: 'Student data exported successfully',
      downloadUrl: '/exports/students_export.xlsx'
    };
  } catch (error) {
    throw new Error('Failed to export student data');
  }
};

export const sendPlacementReminder = async (studentIds, message) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      message: `Reminder sent to ${studentIds.length} students`,
      sentCount: studentIds.length
    };
  } catch (error) {
    throw new Error('Failed to send placement reminder');
  }
};