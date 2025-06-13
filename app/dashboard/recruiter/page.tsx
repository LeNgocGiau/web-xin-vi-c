"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Search,
  Users,
  FileText,
  TrendingUp,
  Star,
  MapPin,
  Clock,
  Eye,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  Edit,
  RefreshCw,
  MoreHorizontal,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  XCircle,
  CheckCircle,
  Video,
} from "lucide-react"

// Danh sách 63 tỉnh thành Việt Nam
const vietnamProvinces = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
  "Phú Yên",
  "Cần Thơ",
  "Đà Nẵng",
  "Hải Phòng",
  "Hà Nội",
  "TP. Hồ Chí Minh",
]

interface ValidationErrors {
  [key: string]: string
}

// Interface cho tin tuyển dụng
interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  description: string;
  requirements: string;
  benefits: string;
  deadline: string;
  posted: string;
  applications: number;
  views: number;
  status: string;
  statusColor: string;
  companyName: string;
  skills?: string[];
  hasVideo?: boolean;
  verified?: boolean;
  available?: boolean;
  match?: number;
}

// Interface cho ứng viên
interface Candidate {
  id: string;
  name: string;
  position: string;
  skills: string[];
  experience: string;
  education: string;
  location: string;
  hasVideo: boolean;
  verified: boolean;
  available: boolean;
  match: number;
  lastActive: string;
  email: string;
  phone: string;
}

// Interface cho đơn ứng tuyển
interface Application {
  id: string;
  candidateName: string;
  position: string;
  appliedDate: string;
  status: string;
  match: number;
  email: string;
  phone: string;
  jobId: string;
}

// Interface cho chi tiết ứng viên
interface CandidateDetail {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  skills: string[];
  experience: string;
  education: string;
  summary: string;
  cvContent: string;
  matchScore: number;
  appliedDate: string;
  status: string;
  hasVideo: boolean;
  jobId: string;
}

// Component thông báo tùy chỉnh
const Toast = ({ 
  message, 
  type, 
  onClose 
}: { 
  message: string; 
  type: string; 
  onClose: () => void 
}) => {
  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-md shadow-md p-4 flex items-center justify-between space-x-4 ${
        type === "success"
          ? "bg-green-50 text-green-800 border border-green-200"
          : type === "error"
          ? "bg-red-50 text-red-800 border border-red-200"
          : "bg-blue-50 text-blue-800 border border-blue-200"
      }`}
    >
      <div className="flex items-center space-x-2">
        {type === "success" ? (
          <CheckCircle className="w-5 h-5 text-green-500" />
        ) : type === "error" ? (
          <XCircle className="w-5 h-5 text-red-500" />
        ) : (
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <span className="font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default function RecruiterDashboard() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false)
  const [showCreateJobDialog, setShowCreateJobDialog] = useState(false)
  const [showCandidateDialog, setShowCandidateDialog] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  
  // State cho tin tuyển dụng
  const [jobPosts, setJobPosts] = useState<JobPost[]>([])
  const [isEditingJob, setIsEditingJob] = useState(false)
  const [editingJobId, setEditingJobId] = useState<string | null>(null)
  
  // State cho đơn ứng tuyển
  const [recentApplications, setRecentApplications] = useState<Application[]>([])
  
  // State cho thông báo
  const [toast, setToast] = useState<{ show: boolean; message: string; type: string }>({
    show: false,
    message: "",
    type: "info",
  })
  
  const [jobFormData, setJobFormData] = useState({
    title: "",
    department: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    description: "",
    requirements: "",
    benefits: "",
    deadline: "",
  })

  const [filters, setFilters] = useState({
    skills: [] as string[],
    experience: "",
    education: "",
    hasVideo: false,
    verified: false,
    available: false,
  })
  
  // State cho dialog xem danh sách ứng viên
  const [showApplicantsDialog, setShowApplicantsDialog] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null)
  const [jobApplicants, setJobApplicants] = useState<CandidateDetail[]>([])
  const [showCVPreview, setShowCVPreview] = useState(false)
  const [selectedCV, setSelectedCV] = useState<{content: string, name: string} | null>(null)
  
  // State cho đánh giá ứng viên
  const [candidateRatings, setCandidateRatings] = useState<{[key: string]: number}>({})
  const [filterMinMatch, setFilterMinMatch] = useState(0)

  useEffect(() => {
    // Check both old and new storage format
    const userRole = localStorage.getItem("userRole")
    const userData = localStorage.getItem("user")
    const storedUserName = localStorage.getItem("userName")

    let isRecruiter = false
    let userName = "Công ty"

    if (userRole === "recruiter") {
      isRecruiter = true
      userName = storedUserName || "Công ty"
    } else if (userData) {
      try {
        const user = JSON.parse(userData)
        if (user.role === "recruiter") {
          isRecruiter = true
          userName = user.name || "Công ty"
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }

    if (!isRecruiter) {
      router.push("/login")
      return
    }

    setCompanyName(userName)
    
    // Load data from localStorage
    loadJobPosts()
    loadApplications()
  }, [router])
  
  // Load job posts from localStorage
  const loadJobPosts = () => {
    try {
      const storedJobs = localStorage.getItem('job_posts')
      if (storedJobs) {
        setJobPosts(JSON.parse(storedJobs))
      } else {
        // Set default job posts if none exists
        const defaultJobs = [
          {
            id: "job-1",
            title: "Senior Frontend Developer",
            department: "Engineering",
            posted: "2024-01-15",
            applications: 24,
            views: 156,
            status: "Đang tuyển",
            statusColor: "bg-green-100 text-green-700",
            location: "Hà Nội",
            salary: "20-30 triệu",
            type: "full-time",
            experience: "3-5",
            description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer...",
            requirements: "Thành thạo React, TypeScript...",
            benefits: "Lương thưởng hấp dẫn, môi trường làm việc quốc tế...",
            deadline: "2024-02-15",
            companyName: companyName
          },
          {
            id: "job-2",
            title: "UX/UI Designer",
            department: "Design",
            posted: "2024-01-12",
            applications: 18,
            views: 89,
            status: "Đang tuyển",
            statusColor: "bg-green-100 text-green-700",
            location: "TP.HCM",
            salary: "15-25 triệu",
            type: "full-time",
            experience: "1-3",
            description: "Chúng tôi đang tìm kiếm một UX/UI Designer...",
            requirements: "Thành thạo Figma, Adobe XD...",
            benefits: "Lương thưởng hấp dẫn, môi trường làm việc quốc tế...",
            deadline: "2024-02-12",
            companyName: companyName
          }
        ]
        setJobPosts(defaultJobs)
        localStorage.setItem('job_posts', JSON.stringify(defaultJobs))
      }
    } catch (error) {
      console.error("Error loading job posts:", error)
      showToast("Đã xảy ra lỗi khi tải tin tuyển dụng", "error")
    }
  }
  
  // Load applications from localStorage
  const loadApplications = () => {
    try {
      const storedApplications = localStorage.getItem('job_applications')
      if (storedApplications) {
        setRecentApplications(JSON.parse(storedApplications))
      } else {
        // Set default applications if none exists
        const defaultApplications = [
          {
            id: "app-1",
            candidateName: "Lê Văn C",
            position: "Backend Developer",
            appliedDate: "2024-01-16",
            status: "Mới",
            match: 92,
            email: "levanc@email.com",
            phone: "0111222333",
            jobId: "job-1"
          },
          {
            id: "app-2",
            candidateName: "Phạm Thị D",
            position: "Product Manager",
            appliedDate: "2024-01-15",
            status: "Đã xem",
            match: 85,
            email: "phamthid@email.com",
            phone: "0444555666",
            jobId: "job-2"
          }
        ]
        setRecentApplications(defaultApplications)
        localStorage.setItem('job_applications', JSON.stringify(defaultApplications))
      }
    } catch (error) {
      console.error("Error loading applications:", error)
      showToast("Đã xảy ra lỗi khi tải hồ sơ ứng tuyển", "error")
    }
  }
  
  // Hiển thị thông báo tùy chỉnh
  const showToast = (message: string, type: string = "info") => {
    setToast({
      show: true,
      message,
      type
    })
    
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, 3000)
  }

  const validateJobForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!jobFormData.title.trim()) newErrors.title = "Tiêu đề công việc là bắt buộc"
    if (!jobFormData.department.trim()) newErrors.department = "Phòng ban là bắt buộc"
    if (!jobFormData.location.trim()) newErrors.location = "Địa điểm là bắt buộc"
    if (!jobFormData.salary.trim()) newErrors.salary = "Mức lương là bắt buộc"
    if (!jobFormData.type.trim()) newErrors.type = "Loại công việc là bắt buộc"
    if (!jobFormData.description.trim()) newErrors.description = "Mô tả công việc là bắt buộc"
    if (!jobFormData.deadline.trim()) newErrors.deadline = "Hạn nộp hồ sơ là bắt buộc"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreateJob = () => {
    if (!validateJobForm()) return

    // Tạo tin tuyển dụng mới hoặc cập nhật tin hiện có
    if (isEditingJob && editingJobId) {
      // Cập nhật tin tuyển dụng
      const updatedJobs = jobPosts.map(job => {
        if (job.id === editingJobId) {
          return {
            ...job,
            ...jobFormData,
            status: "Đang tuyển",
            statusColor: "bg-green-100 text-green-700",
          }
        }
        return job
      })
      
      setJobPosts(updatedJobs)
      localStorage.setItem('job_posts', JSON.stringify(updatedJobs))
      showToast("Đã cập nhật tin tuyển dụng thành công!", "success")
    } else {
      // Tạo tin tuyển dụng mới
      const newJob: JobPost = {
        id: `job-${Date.now()}`,
        ...jobFormData,
        posted: new Date().toISOString().slice(0, 10),
        applications: 0,
        views: 0,
        status: "Đang tuyển",
        statusColor: "bg-green-100 text-green-700",
        companyName: companyName
      }
      
      const updatedJobs = [...jobPosts, newJob]
      setJobPosts(updatedJobs)
      localStorage.setItem('job_posts', JSON.stringify(updatedJobs))
      showToast("Đã tạo tin tuyển dụng thành công!", "success")
    }
    
    // Reset form
    setShowCreateJobDialog(false)
    setIsEditingJob(false)
    setEditingJobId(null)
    setJobFormData({
      title: "",
      department: "",
      location: "",
      salary: "",
      type: "",
      experience: "",
      description: "",
      requirements: "",
      benefits: "",
      deadline: "",
    })
  }

  const handleViewCandidate = (candidate: any) => {
    setSelectedCandidate(candidate)
    setShowCandidateDialog(true)
  }

  // Xử lý khi liên hệ ứng viên
  const handleContactCandidate = (candidate: any) => {
    if ('name' in candidate) {
      showToast(`Đã gửi email liên hệ đến ${candidate.name}`, "success")
    } else if ('candidateName' in candidate) {
      showToast(`Đã gửi email liên hệ đến ${candidate.candidateName}`, "success")
    } else {
      showToast(`Đã gửi email liên hệ`, "success")
    }
  }

  const handleDownloadCV = (candidate: any) => {
    showToast(`Đang tải CV của ${candidate.candidateName || candidate.name}...`, "info")
    
    // Simulate download
    setTimeout(() => {
      showToast(`Đã tải CV thành công!`, "success")
    }, 1500)
  }

  // Xử lý khi lên lịch phỏng vấn
  const handleScheduleInterview = (candidate: any) => {
    if ('name' in candidate) {
      showToast(`Đã lên lịch phỏng vấn với ${candidate.name}`, "success")
    } else if ('candidateName' in candidate) {
      showToast(`Đã lên lịch phỏng vấn với ${candidate.candidateName}`, "success")
    } else {
      showToast(`Đã lên lịch phỏng vấn`, "success")
    }
  }

  const handleRateCandidate = (candidate: any) => {
    const rating = prompt("Đánh giá ứng viên (1-5 sao):")
    if (rating && Number.parseInt(rating) >= 1 && Number.parseInt(rating) <= 5) {
      showToast(`Đã đánh giá ${candidate.candidateName || candidate.name}: ${rating} sao`, "success")
    }
  }

  const handleRefreshJob = (jobId: string) => {
    // Cập nhật ngày đăng tin và tăng views
    const updatedJobs = jobPosts.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          posted: new Date().toISOString().slice(0, 10),
          views: job.views + Math.floor(Math.random() * 10) // Tăng lượt xem một chút
        }
      }
      return job
    })
    
    setJobPosts(updatedJobs)
    localStorage.setItem('job_posts', JSON.stringify(updatedJobs))
    showToast("Đã làm mới tin tuyển dụng thành công!", "success")
  }

  const handleEditJob = (jobId: string) => {
    const jobToEdit = jobPosts.find(job => job.id === jobId)
    if (jobToEdit) {
      setJobFormData({
        title: jobToEdit.title,
        department: jobToEdit.department,
        location: jobToEdit.location,
        salary: jobToEdit.salary,
        type: jobToEdit.type,
        experience: jobToEdit.experience,
        description: jobToEdit.description,
        requirements: jobToEdit.requirements,
        benefits: jobToEdit.benefits,
        deadline: jobToEdit.deadline,
      })
      
      setIsEditingJob(true)
      setEditingJobId(jobId)
      setShowCreateJobDialog(true)
    }
  }

  const handleViewApplicants = (jobId: string) => {
    setSelectedJobId(jobId)
    
    // Tìm job được chọn
    const job = jobPosts.find(job => job.id === jobId)
    if (job) {
      setSelectedJob(job)
    }
    
    // Tạo dữ liệu mẫu ứng viên cho job này
    const candidateDetails: CandidateDetail[] = [
      {
        id: `candidate-1`,
        name: "Nguyễn Văn A",
        position: job?.title || "Frontend Developer",
        email: "nguyenvana@example.com",
        phone: "0987654321",
        address: "Hà Nội, Việt Nam",
        skills: ["React", "TypeScript", "Node.js", "Git", "Responsive Design"],
        experience: "3-5 năm",
        education: "Đại học Bách Khoa Hà Nội",
        summary: "Frontend Developer với 4 năm kinh nghiệm phát triển ứng dụng web. Chuyên môn về React, TypeScript và xây dựng UI responsive.",
        cvContent: `# NGUYỄN VĂN A
## Frontend Developer
Email: nguyenvana@example.com | Điện thoại: 0987654321 | Hà Nội, Việt Nam

### GIỚI THIỆU
Frontend Developer với 4 năm kinh nghiệm phát triển ứng dụng web.`,
        matchScore: 95,
        appliedDate: "2024-01-16",
        status: "Đã xem",
        hasVideo: true,
        jobId: jobId
      },
      {
        id: `candidate-2`,
        name: "Trần Thị B",
        position: job?.title || "Frontend Developer",
        email: "tranthib@example.com",
        phone: "0123456789",
        address: "TP HCM, Việt Nam",
        skills: ["React", "JavaScript", "HTML", "CSS", "Bootstrap"],
        experience: "1-3 năm",
        education: "Đại học FPT",
        summary: "Frontend Developer với 2 năm kinh nghiệm. Có kiến thức vững về HTML, CSS và JavaScript.",
        cvContent: `# TRẦN THỊ B
## Frontend Developer
Email: tranthib@example.com | Điện thoại: 0123456789 | TP HCM, Việt Nam

### GIỚI THIỆU
Frontend Developer với 2 năm kinh nghiệm.`,
        matchScore: 80,
        appliedDate: "2024-01-15",
        status: "Mới",
        hasVideo: false,
        jobId: jobId
      },
      {
        id: `candidate-3`,
        name: "Lê Văn C",
        position: job?.title || "Frontend Developer",
        email: "levanc@example.com",
        phone: "0369852147",
        address: "Đà Nẵng, Việt Nam",
        skills: ["Angular", "TypeScript", "SCSS", "RxJS", "Git"],
        experience: "3-5 năm",
        education: "Đại học Đà Nẵng",
        summary: "Senior Frontend Developer với 5 năm kinh nghiệm, chuyên về Angular và TypeScript.",
        cvContent: `# LÊ VĂN C
## Senior Frontend Developer
Email: levanc@example.com | Điện thoại: 0369852147 | Đà Nẵng, Việt Nam

### GIỚI THIỆU
Senior Frontend Developer với 5 năm kinh nghiệm.`,
        matchScore: 85,
        appliedDate: "2024-01-14",
        status: "Phỏng vấn",
        hasVideo: true,
        jobId: jobId
      }
    ]
    
    setJobApplicants(candidateDetails)
    setShowApplicantsDialog(true)
    showToast(`Đang xem ${candidateDetails.length} ứng viên cho vị trí ${job?.title}`, "info")
  }

  // Xử lý khi xem CV của ứng viên
  const handleViewCV = (candidate: CandidateDetail) => {
    setSelectedCV({
      content: candidate.cvContent,
      name: `CV_${candidate.name.replace(/\s+/g, '_')}.pdf`
    })
    setShowCVPreview(true)
  }

  // Xử lý khi đánh giá % phù hợp của ứng viên
  const handleRateCandidateMatch = (candidateId: string, score: number) => {
    const updatedRatings = {
      ...candidateRatings,
      [candidateId]: score
    }
    
    setCandidateRatings(updatedRatings)
    
    // Cập nhật điểm phù hợp của ứng viên
    const updatedApplicants = jobApplicants.map(applicant => {
      if (applicant.id === candidateId) {
        return {
          ...applicant,
          matchScore: score
        }
      }
      return applicant
    })
    
    setJobApplicants(updatedApplicants)
    showToast(`Đã đánh giá ứng viên ${score}% phù hợp`, "success")
  }

  const filteredJobs = jobPosts.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (job.department && job.department.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    
    return matchesSearch && matchesLocation;
  });

  const exportToPDF = () => {
    showToast("Đang xuất báo cáo PDF...", "info")
    setTimeout(() => {
      showToast("Đã xuất báo cáo PDF thành công!", "success")
    }, 1500)
  }

  const exportToExcel = () => {
    showToast("Đang xuất báo cáo Excel...", "info")
    setTimeout(() => {
      showToast("Đã xuất báo cáo Excel thành công!", "success")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">{companyName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="font-semibold">{companyName}</h1>
              <p className="text-sm text-gray-600">Nhà tuyển dụng</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Dialog open={showCreateJobDialog} onOpenChange={setShowCreateJobDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500">
                  <Plus className="w-4 h-4 mr-2" />
                  Đăng tin tuyển dụng
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tạo tin tuyển dụng mới</DialogTitle>
                  <DialogDescription>Điền thông tin chi tiết về vị trí tuyển dụng</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tiêu đề công việc *</Label>
                      <Input
                        placeholder="VD: Senior Frontend Developer"
                        value={jobFormData.title}
                        onChange={(e) => {
                          setJobFormData({ ...jobFormData, title: e.target.value })
                          if (errors.title) setErrors({ ...errors, title: "" })
                        }}
                        className={errors.title ? "border-red-500" : ""}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Phòng ban *</Label>
                      <Select
                        value={jobFormData.department}
                        onValueChange={(value) => {
                          setJobFormData({ ...jobFormData, department: value })
                          if (errors.department) setErrors({ ...errors, department: "" })
                        }}
                      >
                        <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                          <SelectValue placeholder="Chọn phòng ban" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.department && (
                        <p className="text-red-500 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          {errors.department}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Địa điểm *</Label>
                      <Select
                        value={jobFormData.location}
                        onValueChange={(value) => {
                          setJobFormData({ ...jobFormData, location: value })
                          if (errors.location) setErrors({ ...errors, location: "" })
                        }}
                      >
                        <SelectTrigger className={errors.location ? "border-red-500" : ""}>
                          <SelectValue placeholder="Chọn tỉnh/thành phố" />
                        </SelectTrigger>
                        <SelectContent>
                          {vietnamProvinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.location && (
                        <p className="text-red-500 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          {errors.location}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Mức lương *</Label>
                      <Input
                        placeholder="VD: 15-25 triệu VNĐ"
                        value={jobFormData.salary}
                        onChange={(e) => {
                          setJobFormData({ ...jobFormData, salary: e.target.value })
                          if (errors.salary) setErrors({ ...errors, salary: "" })
                        }}
                        className={errors.salary ? "border-red-500" : ""}
                      />
                      {errors.salary && (
                        <p className="text-red-500 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          {errors.salary}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Loại công việc *</Label>
                      <Select
                        value={jobFormData.type}
                        onValueChange={(value) => {
                          setJobFormData({ ...jobFormData, type: value })
                          if (errors.type) setErrors({ ...errors, type: "" })
                        }}
                      >
                        <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                          <SelectValue placeholder="Chọn loại công việc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-red-500 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          {errors.type}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Kinh nghiệm yêu cầu</Label>
                      <Select
                        value={jobFormData.experience}
                        onValueChange={(value) => setJobFormData({ ...jobFormData, experience: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mức kinh nghiệm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="intern">Thực tập sinh</SelectItem>
                          <SelectItem value="0-1">0-1 năm</SelectItem>
                          <SelectItem value="1-3">1-3 năm</SelectItem>
                          <SelectItem value="3-5">3-5 năm</SelectItem>
                          <SelectItem value="5+">5+ năm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Mô tả công việc *</Label>
                    <Textarea
                      placeholder="Mô tả chi tiết về công việc, trách nhiệm..."
                      rows={4}
                      value={jobFormData.description}
                      onChange={(e) => {
                        setJobFormData({ ...jobFormData, description: e.target.value })
                        if (errors.description) setErrors({ ...errors, description: "" })
                      }}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Yêu cầu ứng viên</Label>
                    <Textarea
                      placeholder="Kỹ năng, kinh nghiệm, bằng cấp yêu cầu..."
                      rows={3}
                      value={jobFormData.requirements}
                      onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quyền lợi</Label>
                    <Textarea
                      placeholder="Lương thưởng, phúc lợi, môi trường làm việc..."
                      rows={3}
                      value={jobFormData.benefits}
                      onChange={(e) => setJobFormData({ ...jobFormData, benefits: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Hạn nộp hồ sơ *</Label>
                    <Input
                      type="date"
                      value={jobFormData.deadline}
                      onChange={(e) => {
                        setJobFormData({ ...jobFormData, deadline: e.target.value })
                        if (errors.deadline) setErrors({ ...errors, deadline: "" })
                      }}
                      className={errors.deadline ? "border-red-500" : ""}
                    />
                    {errors.deadline && (
                      <p className="text-red-500 text-sm flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.deadline}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleCreateJob} className="bg-gradient-to-r from-emerald-500 to-teal-500">
                      Đăng tin tuyển dụng
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateJobDialog(false)}>
                      Hủy
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                localStorage.removeItem("userRole")
                localStorage.removeItem("userName")
                router.push("/login")
              }}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tin đăng tuyển</p>
                  <p className="text-2xl font-bold text-emerald-600">8</p>
                </div>
                <FileText className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ứng viên mới</p>
                  <p className="text-2xl font-bold text-blue-600">42</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Lượt xem tin</p>
                  <p className="text-2xl font-bold text-purple-600">1,245</p>
                </div>
                <Eye className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tỷ lệ phù hợp</p>
                  <p className="text-2xl font-bold text-orange-600">87%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="candidates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="candidates">Tìm ứng viên</TabsTrigger>
            <TabsTrigger value="applications">Hồ sơ ứng tuyển</TabsTrigger>
            <TabsTrigger value="jobs">Quản lý tin đăng</TabsTrigger>
            <TabsTrigger value="analytics">Thống kê</TabsTrigger>
          </TabsList>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-6">
            {/* Smart Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Tìm kiếm ứng viên thông minh
                </CardTitle>
                <CardDescription>AI sẽ tìm ứng viên phù hợp nhất với yêu cầu công việc</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Kỹ năng, kinh nghiệm..."
                    className="md:col-span-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tỉnh/thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {vietnamProvinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500">
                    <Search className="w-4 h-4 mr-2" />
                    Tìm kiếm AI
                  </Button>
                </div>

                <div className="flex items-center space-x-4 mt-4">
                  <Button variant="outline" size="sm" onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}>
                    <Filter className="w-4 h-4 mr-2" />
                    Bộ lọc nâng cao
                  </Button>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasVideo"
                        checked={filters.hasVideo}
                        onCheckedChange={(checked) => setFilters({ ...filters, hasVideo: checked as boolean })}
                      />
                      <Label htmlFor="hasVideo" className="text-sm">
                        Có video giới thiệu
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={filters.verified}
                        onCheckedChange={(checked) => setFilters({ ...filters, verified: checked as boolean })}
                      />
                      <Label htmlFor="verified" className="text-sm">
                        Kỹ năng xác thực
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="available"
                        checked={filters.available}
                        onCheckedChange={(checked) => setFilters({ ...filters, available: checked as boolean })}
                      />
                      <Label htmlFor="available" className="text-sm">
                        Sẵn sàng đi làm
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Advanced Filters */}
                {showAdvancedFilter && (
                  <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium mb-4">Bộ lọc nâng cao</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Kinh nghiệm</Label>
                        <Select
                          value={filters.experience}
                          onValueChange={(value) => setFilters({ ...filters, experience: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kinh nghiệm" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 năm</SelectItem>
                            <SelectItem value="1-3">1-3 năm</SelectItem>
                            <SelectItem value="3-5">3-5 năm</SelectItem>
                            <SelectItem value="5+">5+ năm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Học vấn</Label>
                        <Select
                          value={filters.education}
                          onValueChange={(value) => setFilters({ ...filters, education: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn học vấn" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="highschool">Trung học phổ thông</SelectItem>
                            <SelectItem value="college">Cao đẳng</SelectItem>
                            <SelectItem value="university">Đại học</SelectItem>
                            <SelectItem value="master">Thạc sĩ</SelectItem>
                            <SelectItem value="phd">Tiến sĩ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Kỹ năng</Label>
                        <Input placeholder="VD: React, Node.js..." />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedLocation("")
                      setFilters({
                        skills: [],
                        experience: "",
                        education: "",
                        hasVideo: false,
                        verified: false,
                        available: false,
                      })
                      setSearchQuery("")
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Candidate Results */}
            <Card>
              <CardHeader>
                <CardTitle>Ứng viên phù hợp ({filteredJobs.length})</CardTitle>
                <CardDescription>Được sắp xếp theo độ phù hợp với yêu cầu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">{job.title.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-gray-600">{job.department}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <span>Kinh nghiệm: {job.experience}</span>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {job.posted}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{job.match}% phù hợp</span>
                          </div>
                          <div className="flex space-x-1">
                            {job.hasVideo && (
                              <Badge variant="outline" className="text-xs">
                                📹 Video
                              </Badge>
                            )}
                            {job.verified && (
                              <Badge variant="outline" className="text-xs text-green-600">
                                ✓ Xác thực
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {job.skills?.map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleViewApplicants(job.id)}>
                            <Eye className="w-4 h-4 mr-1" />
                            Xem ứng viên
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-500 to-teal-500"
                            onClick={() => handleContactCandidate(job)}
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Liên hệ
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Hồ sơ ứng tuyển mới</CardTitle>
                <CardDescription>Quản lý và đánh giá ứng viên</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{application.candidateName}</h3>
                          <p className="text-gray-600">{application.position}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <Mail className="w-3 h-3" />
                            <span>{application.email}</span>
                            <Phone className="w-3 h-3 ml-2" />
                            <span>{application.phone}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">{application.match}% phù hợp</span>
                          </div>
                          <Badge variant={application.status === "Mới" ? "default" : "secondary"}>
                            {application.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          Ứng tuyển ngày {application.appliedDate}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleDownloadCV(application)}>
                            <Download className="w-4 h-4 mr-1" />
                            Tải CV
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRateCandidate(application)}>
                            Đánh giá
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-500 to-teal-500"
                            onClick={() => handleScheduleInterview(application)}
                          >
                            Phỏng vấn
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tin đăng tuyển dụng</CardTitle>
                    <CardDescription>Quản lý các tin tuyển dụng của công ty</CardDescription>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-teal-500"
                    onClick={() => {
                      setIsEditingJob(false);
                      setEditingJobId(null);
                      setJobFormData({
                        title: "",
                        department: "",
                        location: "",
                        salary: "",
                        type: "",
                        experience: "",
                        description: "",
                        requirements: "",
                        benefits: "",
                        deadline: "",
                      });
                      setShowCreateJobDialog(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo tin mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobPosts.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <p className="text-gray-600">{job.department}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </div>
                            <span>{job.salary}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={job.statusColor}>{job.status}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleEditJob(job.id)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRefreshJob(job.id)}>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Làm mới
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600">{job.applications}</div>
                          <div className="text-sm text-gray-600">Ứng viên</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{job.views}</div>
                          <div className="text-sm text-gray-600">Lượt xem</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Đăng ngày</div>
                          <div className="font-medium">{job.posted}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditJob(job.id)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Chỉnh sửa
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRefreshJob(job.id)}>
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Làm mới
                          </Button>
                        </div>
                        <Button size="sm" onClick={() => handleViewApplicants(job.id)}>
                          <Users className="w-4 h-4 mr-1" />
                          Xem ứng viên ({job.applications})
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              {/* Export Options */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Báo cáo thống kê</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={exportToPDF}>
                        <FileText className="w-4 h-4 mr-2" />
                        Xuất PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={exportToExcel}>
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Xuất Excel
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Select defaultValue="last30days">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn khoảng thời gian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last7days">7 ngày qua</SelectItem>
                        <SelectItem value="last30days">30 ngày qua</SelectItem>
                        <SelectItem value="last3months">3 tháng qua</SelectItem>
                        <SelectItem value="last6months">6 tháng qua</SelectItem>
                        <SelectItem value="lastyear">1 năm qua</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="engineering">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phòng ban" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="hanoi">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn địa điểm" />
                      </SelectTrigger>
                      <SelectContent>
                        {vietnamProvinces.slice(0, 5).map((province) => (
                          <SelectItem key={province} value={province.toLowerCase().replace(/\s+/g, "")}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Thống kê tuyển dụng
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Tổng số ứng viên</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Ứng viên phù hợp</span>
                        <span className="font-semibold text-emerald-600">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Đã phỏng vấn</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Đã tuyển dụng</span>
                        <span className="font-semibold text-green-600">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tỷ lệ thành công</span>
                        <span className="font-semibold text-blue-600">5.1%</span>
                      </div>
                    </div>

                    {/* Simple Chart Visualization */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Phễu tuyển dụng</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-20 text-sm">Ứng tuyển</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div className="bg-blue-500 h-4 rounded-full" style={{ width: "100%" }}></div>
                          </div>
                          <div className="w-12 text-sm text-right">156</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 text-sm">Phù hợp</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div className="bg-emerald-500 h-4 rounded-full" style={{ width: "57%" }}></div>
                          </div>
                          <div className="w-12 text-sm text-right">89</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 text-sm">Phỏng vấn</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div className="bg-yellow-500 h-4 rounded-full" style={{ width: "15%" }}></div>
                          </div>
                          <div className="w-12 text-sm text-right">24</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 text-sm">Tuyển dụng</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-4">
                            <div className="bg-green-500 h-4 rounded-full" style={{ width: "5%" }}></div>
                          </div>
                          <div className="w-12 text-sm text-right">8</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="w-5 h-5 mr-2" />
                      Hiệu quả tin đăng
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Tỷ lệ xem tin</span>
                        <span className="font-semibold">12.5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tỷ lệ ứng tuyển</span>
                        <span className="font-semibold text-emerald-600">3.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Thời gian trung bình</span>
                        <span className="font-semibold">14 ngày</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Chi phí mỗi ứng viên</span>
                        <span className="font-semibold">125,000 VNĐ</span>
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Hiệu suất theo thời gian</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Tuần 1</span>
                          <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                          <span>80%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Tuần 2</span>
                          <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <span>65%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Tuần 3</span>
                          <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                          </div>
                          <span>90%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Tuần 4</span>
                          <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                          <span>75%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Skills Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Kỹ năng được tìm kiếm nhiều nhất</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { skill: "React", count: 45, percentage: 90 },
                        { skill: "Node.js", count: 38, percentage: 76 },
                        { skill: "TypeScript", count: 32, percentage: 64 },
                        { skill: "Python", count: 28, percentage: 56 },
                        { skill: "Java", count: 25, percentage: 50 },
                      ].map((item) => (
                        <div key={item.skill} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.skill}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Location Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Phân bố ứng viên theo địa điểm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { location: "Hà Nội", count: 68, percentage: 85 },
                        { location: "TP.HCM", count: 52, percentage: 65 },
                        { location: "Đà Nẵng", count: 24, percentage: 30 },
                        { location: "Hải Phòng", count: 12, percentage: 15 },
                      ].map((item) => (
                        <div key={item.location} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.location}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Candidate Detail Dialog */}
        <Dialog open={showCandidateDialog} onOpenChange={setShowCandidateDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Hồ sơ ứng viên</DialogTitle>
              <DialogDescription>Thông tin chi tiết về ứng viên</DialogDescription>
            </DialogHeader>
            {selectedCandidate && (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xl">{selectedCandidate.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{selectedCandidate.name}</h3>
                    <p className="text-gray-600">{selectedCandidate.position}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{selectedCandidate.match}% phù hợp</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {selectedCandidate.verified && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Xác thực
                      </Badge>
                    )}
                    {selectedCandidate.hasVideo && <Badge className="bg-blue-100 text-blue-700">📹 Video</Badge>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Thông tin liên hệ</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{selectedCandidate.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{selectedCandidate.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{selectedCandidate.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Kinh nghiệm</h4>
                      <p className="text-sm text-gray-600">{selectedCandidate.experience}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Học vấn</h4>
                      <p className="text-sm text-gray-600">{selectedCandidate.education}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Kỹ năng</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedCandidate.skills?.map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Trạng thái</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Hoạt động gần nhất:</span>
                          <span className="text-gray-600">{selectedCandidate.lastActive}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Sẵn sàng làm việc:</span>
                          <Badge variant={selectedCandidate.available ? "default" : "secondary"}>
                            {selectedCandidate.available ? "Có" : "Không"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t">
                  <Button
                    onClick={() => handleContactCandidate(selectedCandidate)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Liên hệ
                  </Button>
                  <Button variant="outline" onClick={() => handleDownloadCV(selectedCandidate)}>
                    <Download className="w-4 h-4 mr-2" />
                    Tải CV
                  </Button>
                  <Button variant="outline" onClick={() => handleScheduleInterview(selectedCandidate)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Phỏng vấn
                  </Button>
                  <Button variant="outline" onClick={() => handleRateCandidate(selectedCandidate)}>
                    <Star className="w-4 h-4 mr-2" />
                    Đánh giá
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog xem danh sách ứng viên */}
        <Dialog open={showApplicantsDialog} onOpenChange={setShowApplicantsDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ứng viên cho vị trí {selectedJob?.title}</DialogTitle>
              <DialogDescription>
                {jobApplicants.length} ứng viên đã ứng tuyển - Công ty {selectedJob?.companyName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Bộ lọc ứng viên */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row items-stretch gap-4">
                    <div className="flex-1">
                      <label htmlFor="match-filter" className="text-sm font-medium">
                        Lọc theo % phù hợp (tối thiểu)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id="match-filter"
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={filterMinMatch}
                          onChange={(e) => setFilterMinMatch(parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="w-10 text-center font-medium">{filterMinMatch}%</span>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button variant="outline" onClick={() => setFilterMinMatch(0)}>
                        Xóa bộ lọc
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Danh sách ứng viên */}
              <div className="space-y-4">
                {jobApplicants
                  .filter(applicant => applicant.matchScore >= filterMinMatch)
                  .map(applicant => (
                    <Card key={applicant.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-xl">
                                {applicant.name.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{applicant.name}</h3>
                                <p className="text-gray-600">{applicant.position}</p>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> {applicant.email}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" /> {applicant.phone}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <Badge className={
                                applicant.status === "Mới" ? "bg-blue-100 text-blue-800" :
                                applicant.status === "Đã xem" ? "bg-gray-100 text-gray-800" :
                                applicant.status === "Phỏng vấn" ? "bg-green-100 text-green-800" :
                                "bg-gray-100 text-gray-800"
                              }>
                                {applicant.status}
                              </Badge>
                              <div className="flex items-center mt-2">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs" style={{
                                  backgroundColor: applicant.matchScore >= 90 ? "#10b981" :
                                    applicant.matchScore >= 80 ? "#0ea5e9" :
                                    applicant.matchScore >= 70 ? "#f59e0b" : "#ef4444"
                                }}>
                                  {applicant.matchScore}%
                                </div>
                                <div className="ml-2">
                                  <label htmlFor={`rating-${applicant.id}`} className="text-xs text-gray-500">
                                    Đánh giá % phù hợp
                                  </label>
                                  <select
                                    id={`rating-${applicant.id}`}
                                    value={candidateRatings[applicant.id] || applicant.matchScore}
                                    onChange={(e) => handleRateCandidateMatch(applicant.id, parseInt(e.target.value))}
                                    className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  >
                                    {[100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40].map(score => (
                                      <option key={score} value={score}>{score}%</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-sm text-gray-700">{applicant.summary}</p>
                          </div>
                          
                          <div className="mt-3">
                            <h4 className="text-sm font-medium">Kỹ năng</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {applicant.skills.map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Kinh nghiệm:</span> {applicant.experience}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Học vấn:</span> {applicant.education}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Ngày ứng tuyển:</span> {applicant.appliedDate}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 flex items-center justify-between mt-3 border-t">
                          <div className="flex items-center gap-2">
                            {applicant.hasVideo && (
                              <Badge variant="outline" className="text-xs">
                                <Video className="w-3 h-3 mr-1" /> Có video giới thiệu
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewCV(applicant)}>
                              <FileText className="w-4 h-4 mr-1" /> Xem CV
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleContactCandidate(applicant)}>
                              <Mail className="w-4 h-4 mr-1" /> Liên hệ
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleScheduleInterview(applicant)}>
                              <Calendar className="w-4 h-4 mr-1" /> Phỏng vấn
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dialog xem CV */}
        <Dialog open={showCVPreview} onOpenChange={setShowCVPreview}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>CV - {selectedCV?.name}</DialogTitle>
            </DialogHeader>
            <div className="p-6 bg-white rounded-md border">
              {selectedCV && (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">{selectedCV.content}</pre>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCVPreview(false)}>
                Đóng
              </Button>
              <Button 
                onClick={() => {
                  if (selectedCV) {
                    const blob = new Blob([selectedCV.content], { type: 'text/plain' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = selectedCV.name
                    a.click()
                    URL.revokeObjectURL(url)
                    showToast("Đã tải xuống CV", "success")
                  }
                }}
              >
                <Download className="w-4 h-4 mr-1" /> Tải xuống
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Toast Notification */}
        {toast.show && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false, message: "", type: "info" })} />
        )}
      </div>
    </div>
  )
}
