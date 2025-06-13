"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Send, Eye, TrendingUp, BookOpen, Search, Star, FileText, Video, LogOut, Users, Wand2, Upload, Share2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

// Types for localStorage data
interface CVData {
  id: string;
  name: string;
  content: string;
  template?: string;
}

interface VideoData {
  id: string;
  url: string;
}

interface JobApplication {
  id: string;
  jobId: string;
  companyName: string;
  position: string;
  date: string;
  status: string;
}

interface CourseProgress {
  id: string;
  progress: number;
  completed: boolean;
}

const CandidateDashboard = () => {
  const router = useRouter()
  const [userName, setUserName] = useState("Ứng viên Demo")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)
  
  // State for CV management
  const [cvList, setCVList] = useState<CVData[]>([])
  const [currentCV, setCurrentCV] = useState<CVData | null>(null)
  const [videoIntro, setVideoIntro] = useState<VideoData | null>(null)
  const [showCVPreview, setShowCVPreview] = useState(false)
  const [showVideoRecorder, setShowVideoRecorder] = useState(false)
  const [aiPrompt, setAIPrompt] = useState("")
  const [isGeneratingCV, setIsGeneratingCV] = useState(false)
  const [generatedCV, setGeneratedCV] = useState<string>("")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [shareLink, setShareLink] = useState("")
  const [showShareDialog, setShowShareDialog] = useState(false)
  
  // State for job applications
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([])
  
  // State for course progress
  const [courseProgress, setCourseProgress] = useState<{[key: string]: CourseProgress}>({
    "react-patterns": { id: "react-patterns", progress: 60, completed: false },
    "system-design": { id: "system-design", progress: 0, completed: false }
  })
  
  // State for community notifications
  const [hasSubscribed, setHasSubscribed] = useState(false)

  useEffect(() => {
    // Check both old and new storage format
    const userRole = localStorage.getItem("userRole")
    const userData = localStorage.getItem("user")
    const storedUserName = localStorage.getItem("userName")

    let isCandidate = false
    let userName = "Ứng viên Demo"

    if (userRole === "candidate") {
      isCandidate = true
      userName = storedUserName || "Ứng viên Demo"
    } else if (userData) {
      try {
        const user = JSON.parse(userData)
        if (user.role === "candidate") {
          isCandidate = true
          userName = user.name || "Ứng viên Demo"
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }

    if (!isCandidate) {
      router.push("/login")
      return
    }

    // Load stored data from localStorage
    loadUserData()
    
    setUserName(userName)
    setIsLoading(false)
  }, [router])
  
  // Load user data from localStorage
  const loadUserData = () => {
    try {
      // Load CV data
      const storedCVs = localStorage.getItem('candidate_cvs')
      if (storedCVs) {
        const cvs = JSON.parse(storedCVs)
        setCVList(cvs)
        if (cvs.length > 0) {
          setCurrentCV(cvs[0])
        }
      } else {
        // Set default CV if none exists
        const defaultCV = {
          id: "default-cv",
          name: "CV_NguyenVanA_Frontend.pdf",
          content: "Default CV content"
        }
        setCVList([defaultCV])
        setCurrentCV(defaultCV)
        localStorage.setItem('candidate_cvs', JSON.stringify([defaultCV]))
      }
      
      // Load video intro
      const storedVideo = localStorage.getItem('candidate_video')
      if (storedVideo) {
        setVideoIntro(JSON.parse(storedVideo))
      }
      
      // Load job applications
      const storedApplications = localStorage.getItem('job_applications')
      if (storedApplications) {
        setJobApplications(JSON.parse(storedApplications))
      } else {
        const defaultApplications = [
          {
            id: "app1",
            jobId: "job1",
            companyName: "TechCorp",
            position: "Frontend Developer",
            date: "2024-01-15",
            status: "Đang xem xét"
          },
          {
            id: "app2",
            jobId: "job2",
            companyName: "DesignStudio",
            position: "UX Designer",
            date: "2024-01-12",
            status: "Phỏng vấn"
          }
        ]
        setJobApplications(defaultApplications)
        localStorage.setItem('job_applications', JSON.stringify(defaultApplications))
      }
      
      // Load course progress
      const storedCourses = localStorage.getItem('course_progress')
      if (storedCourses) {
        setCourseProgress(JSON.parse(storedCourses))
      } else {
        localStorage.setItem('course_progress', JSON.stringify(courseProgress))
      }
      
      // Load notification subscription status
      const subscribed = localStorage.getItem('notifications_subscribed')
      setHasSubscribed(subscribed === 'true')
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("user")
    localStorage.removeItem("userName")
    router.push("/login")
  }
  
  // CV management functions
  const handleViewCV = () => {
    setShowCVPreview(true)
  }
  
  const handleEditCV = () => {
    router.push("/cv-builder")
  }
  
  const handleDownloadCV = () => {
    if (!currentCV) return
    
    // Create a blob and download it
    const blob = new Blob([currentCV.content], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = currentCV.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  const handleCreateCVWithAI = async () => {
    if (!aiPrompt.trim()) return
    
    setIsGeneratingCV(true)
    
    try {
      // Simulate API call to OpenAI with the API key
      // In a production environment, this should be done through a secure backend API
      // const apiKey = "AIzaSyBKdxd7U0N8FQnaSeUCKFxV9W8e-k6-vg4"
      
      // For demo purposes, using setTimeout to simulate API call
      setTimeout(() => {
        const cvContent = generateCVFromPrompt(aiPrompt)
        setGeneratedCV(cvContent)
        
        // Save the generated CV
        const newCV = {
          id: `cv-${Date.now()}`,
          name: `CV_Generated_${new Date().toISOString().slice(0, 10)}.pdf`,
          content: cvContent,
          template: selectedTemplate
        }
        
        const updatedCVs = [...cvList, newCV]
        setCVList(updatedCVs)
        setCurrentCV(newCV)
        localStorage.setItem('candidate_cvs', JSON.stringify(updatedCVs))
        
        // Generate a shareable link
        const shareableLink = `${window.location.origin}/shared-cv/${newCV.id}`
        setShareLink(shareableLink)
        
        setIsGeneratingCV(false)
      }, 2000)
    } catch (error) {
      console.error("Error generating CV:", error)
      setIsGeneratingCV(false)
    }
  }
  
  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template)
    
    if (currentCV) {
      const updatedCV = {
        ...currentCV,
        template
      }
      setCurrentCV(updatedCV)
      
      const updatedCVs = cvList.map(cv => 
        cv.id === currentCV.id ? updatedCV : cv
      )
      setCVList(updatedCVs)
      localStorage.setItem('candidate_cvs', JSON.stringify(updatedCVs))
    }
  }
  
  const handleUploadCV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result
      if (!content) return
      
      // Create new CV object
      const newCV: CVData = {
        id: `cv-${Date.now()}`,
        name: file.name,
        content: typeof content === 'string' ? content : JSON.stringify(content),
        template: "uploaded"
      }
      
      const updatedCVs = [...cvList, newCV]
      setCVList(updatedCVs)
      setCurrentCV(newCV)
      localStorage.setItem('candidate_cvs', JSON.stringify(updatedCVs))
      
      // Generate a shareable link
      const shareableLink = `${window.location.origin}/shared-cv/${newCV.id}`
      setShareLink(shareableLink)
    }
    
    reader.readAsText(file)
  }
  
  const handleShareCV = () => {
    if (!currentCV) return
    
    // Generate a shareable link if not already generated
    if (!shareLink) {
      const shareableLink = `${window.location.origin}/shared-cv/${currentCV.id}`
      setShareLink(shareableLink)
    }
    
    setShowShareDialog(true)
  }
  
  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        alert("Link đã được sao chép vào clipboard!")
      })
      .catch(err => {
        console.error('Không thể sao chép: ', err)
      })
  }
  
  // Function to simulate generating CV from prompt
  const generateCVFromPrompt = (prompt: string) => {
    return `# CV được tạo theo yêu cầu: "${prompt}"
    
Nguyễn Văn A
Frontend Developer
Email: nguyenvana@example.com
Phone: 0912345678
LinkedIn: linkedin.com/in/nguyenvana

## GIỚI THIỆU
Lập trình viên Frontend với hơn 3 năm kinh nghiệm trong việc phát triển ứng dụng web hiện đại và đáp ứng. Thành thạo JavaScript, TypeScript, React và NextJS. Có kinh nghiệm làm việc trong môi trường Agile và làm việc nhóm hiệu quả.

## KỸ NĂNG
- Frontend: React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3
- State Management: Redux, Context API
- Testing: Jest, React Testing Library
- Tools: Git, Webpack, npm/yarn
- Soft Skills: Teamwork, Problem Solving, Communication

## KINH NGHIỆM
### Senior Frontend Developer | TechViet | 2022 - Hiện tại
- Phát triển và duy trì các ứng dụng web frontend sử dụng React và Next.js
- Tối ưu hóa hiệu suất ứng dụng, cải thiện thời gian tải trang 30%
- Làm việc chặt chẽ với designers để đảm bảo UI/UX nhất quán
- Hướng dẫn và đào tạo các thành viên junior trong team

### Frontend Developer | StartupXYZ | 2020 - 2022
- Phát triển giao diện người dùng cho ứng dụng web thương mại điện tử
- Triển khai responsive design cho trải nghiệm người dùng tốt trên mọi thiết bị
- Tích hợp RESTful API và GraphQL cho các tính năng ứng dụng
- Tham gia vào quy trình code review và đảm bảo chất lượng code

## GIÁO DỤC
### Bằng Kỹ sư Công nghệ Thông tin | Đại học Bách Khoa | 2016 - 2020
- GPA: 3.6/4.0
- Chuyên ngành: Kỹ thuật phần mềm

## DỰ ÁN
### E-commerce Platform | 2022
- Phát triển frontend cho nền tảng thương mại điện tử sử dụng Next.js và TypeScript
- Triển khai thanh toán trực tuyến và hệ thống giỏ hàng
- Tối ưu hóa SEO và hiệu suất trang web

### Task Management App | 2021
- Xây dựng ứng dụng quản lý công việc với React và Redux
- Triển khai authentication và authorization
- Phát triển giao diện drag-and-drop cho quản lý tasks

## CHỨNG CHỈ
- AWS Certified Developer - Associate | 2023
- React Development - Professional Certificate | Meta | 2022
- JavaScript Algorithms and Data Structures | freeCodeCamp | 2021`
  }
  
  // Handle job application
  const handleApplyJob = (jobId: string, companyName: string, position: string) => {
    const newApplication = {
      id: `app-${Date.now()}`,
      jobId,
      companyName,
      position,
      date: new Date().toISOString().slice(0, 10),
      status: "Đã nộp hồ sơ"
    }
    
    const updatedApplications = [...jobApplications, newApplication]
    setJobApplications(updatedApplications)
    localStorage.setItem('job_applications', JSON.stringify(updatedApplications))
    
    alert(`Đã ứng tuyển thành công vào vị trí ${position} tại ${companyName}!`)
  }
  
  // Handle smart application - apply to multiple jobs at once
  const handleSmartApply = () => {
    const companyPositions = [
      { id: "smart-job-1", company: "TechGlobal", position: "Frontend Engineer" },
      { id: "smart-job-2", company: "DevStudio", position: "React Developer" },
      { id: "smart-job-3", company: "InnovateTech", position: "UI Developer" }
    ]
    
    const newApplications = companyPositions.map(job => ({
      id: `app-${Date.now()}-${job.id}`,
      jobId: job.id,
      companyName: job.company,
      position: job.position,
      date: new Date().toISOString().slice(0, 10),
      status: "Đã nộp hồ sơ"
    }))
    
    const updatedApplications = [...jobApplications, ...newApplications]
    setJobApplications(updatedApplications)
    localStorage.setItem('job_applications', JSON.stringify(updatedApplications))
    
    alert(`Đã ứng tuyển thành công vào ${newApplications.length} vị trí phù hợp!`)
  }
  
  // Handle course continuation
  const handleContinueCourse = (courseId: string) => {
    if (!courseProgress[courseId]) return
    
    const updatedProgress = {
      ...courseProgress,
      [courseId]: {
        ...courseProgress[courseId],
        progress: Math.min(courseProgress[courseId].progress + 10, 100),
        completed: courseProgress[courseId].progress + 10 >= 100
      }
    }
    
    setCourseProgress(updatedProgress)
    localStorage.setItem('course_progress', JSON.stringify(updatedProgress))
  }
  
  // Handle starting a course
  const handleStartCourse = (courseId: string) => {
    if (!courseProgress[courseId]) return
    
    const updatedProgress = {
      ...courseProgress,
      [courseId]: {
        ...courseProgress[courseId],
        progress: 10,
      }
    }
    
    setCourseProgress(updatedProgress)
    localStorage.setItem('course_progress', JSON.stringify(updatedProgress))
  }
  
  // Handle mentor/buddy connection
  const handleConnect = (type: 'mentor' | 'buddy') => {
    alert(`Yêu cầu kết nối với ${type === 'mentor' ? 'mentor' : 'buddy'} đã được gửi. Bạn sẽ nhận được thông báo khi có phản hồi.`)
  }
  
  // Handle notification subscription
  const handleSubscribeNotifications = () => {
    setHasSubscribed(true)
    localStorage.setItem('notifications_subscribed', 'true')
    alert("Đã đăng ký nhận thông báo khi tính năng cộng đồng ra mắt!")
  }
  
  // Handle video recording
  const handleRecordVideo = () => {
    setShowVideoRecorder(true)
  }
  
  const handleSaveVideo = (videoUrl: string) => {
    const newVideo = {
      id: `video-${Date.now()}`,
      url: videoUrl
    }
    
    setVideoIntro(newVideo)
    localStorage.setItem('candidate_video', JSON.stringify(newVideo))
    setShowVideoRecorder(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold">{userName}</h1>
            <p className="text-gray-500 text-sm">Ứng viên</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/cv-builder">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText size={16} />
              CV của tôi
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowVideoRecorder(true)}
          >
            <Video size={16} />
            Video giới thiệu
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleLogout}>
            <LogOut size={16} />
            Đăng xuất
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Đã ứng tuyển</p>
              <h2 className="text-3xl font-bold text-green-600">{jobApplications.length}</h2>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Send className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Lượt xem hồ sơ</p>
              <h2 className="text-3xl font-bold text-blue-600">48</h2>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Việc làm phù hợp</p>
              <h2 className="text-3xl font-bold text-purple-600">25</h2>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Khóa học hoàn thành</p>
              <h2 className="text-3xl font-bold text-orange-600">
                {Object.values(courseProgress).filter(course => course.completed).length}
              </h2>
            </div>
            <div className="bg-orange-100 p-2 rounded-full">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="dashboard">Tìm việc làm</TabsTrigger>
          <TabsTrigger value="applications">Đã ứng tuyển</TabsTrigger>
          <TabsTrigger value="cv">Quản lý CV</TabsTrigger>
          <TabsTrigger value="learning">Học tập</TabsTrigger>
          <TabsTrigger value="community">Cộng đồng</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* AI Search */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Tìm kiếm thông minh
                  </h2>
                  <p className="text-gray-500 text-sm">AI sẽ gợi ý việc làm phù hợp nhất với hồ sơ của bạn</p>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Vị trí, kỹ năng, công ty..." className="flex-1" />
                  <Button className="bg-green-600 hover:bg-green-700">Tìm kiếm AI</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <div>
            <h2 className="text-xl font-bold mb-4">Việc làm được đề xuất</h2>
            <p className="text-gray-500 mb-4">Dựa trên hồ sơ và sở thích của bạn</p>

            <div className="space-y-4">
              {/* Job 1 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">React Developer</h3>
                      <p className="text-gray-600">StartupXYZ</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Hà Nội
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          20-30 triệu
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline" className="bg-gray-100">
                          React
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100">
                          TypeScript
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100">
                          Node.js
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                        95% phù hợp
                      </Badge>
                      <Button 
                        className="mt-2 bg-green-600 hover:bg-green-700"
                        onClick={() => handleApplyJob("job1", "StartupXYZ", "React Developer")}
                      >
                        Ứng tuyển ngay
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job 2 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">Full Stack Developer</h3>
                      <p className="text-gray-600">TechViet</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          TP.HCM
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          25-35 triệu
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline" className="bg-gray-100">
                          JavaScript
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100">
                          Python
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100">
                          AWS
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                        88% phù hợp
                      </Badge>
                      <Button 
                        className="mt-2 bg-green-600 hover:bg-green-700"
                        onClick={() => handleApplyJob("job2", "TechViet", "Full Stack Developer")}
                      >
                        Ứng tuyển ngay
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Smart Apply */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">Ứng tuyển thông minh 1 chạm</h2>
              <p className="text-gray-600 mb-4">Gửi hồ sơ đến 5-10 công việc phù hợp nhất với 1 cú click</p>
              <Button 
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={handleSmartApply}
              >
                <Send className="h-4 w-4" />
                Ứng tuyển thông minh
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Việc làm đã ứng tuyển</h2>
            <p className="text-gray-500 mb-6">Theo dõi trạng thái ứng tuyển của bạn</p>

            <div className="space-y-4">
              {jobApplications.map((application) => (
                <Card key={application.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{application.position}</h3>
                        <p className="text-gray-600">{application.companyName}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Ứng tuyển ngày {application.date}
                        </div>
                      </div>
                      <Badge 
                        className={
                          application.status === "Đang xem xét" ? "bg-yellow-100 text-yellow-800" :
                          application.status === "Phỏng vấn" ? "bg-blue-100 text-blue-800" :
                          "bg-green-100 text-green-800"
                        }
                      >
                        {application.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* CV Management Tab */}
        <TabsContent value="cv" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CV Management */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">CV hiện tại</h2>
                <p className="text-gray-500 mb-6">Quản lý và tối ưu hóa CV của bạn</p>

                <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="font-medium mb-2">{currentCV?.name || "Chưa có CV"}</p>

                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleViewCV}
                      disabled={!currentCV}
                    >
                      Xem
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleEditCV}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownloadCV}
                      disabled={!currentCV}
                    >
                      Tải xuống
                    </Button>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2">
                      <Star className="h-4 w-4" />
                      Tạo CV mới với AI
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle>Tạo CV mới với AI</DialogTitle>
                      <DialogDescription>
                        Mô tả chi tiết về bản thân, kinh nghiệm và vị trí mong muốn. AI sẽ tạo CV phù hợp cho bạn.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="bg-green-50 p-4 rounded-md">
                        <h3 className="font-medium text-green-800 flex items-center gap-2">
                          <Wand2 className="h-4 w-4" />
                          AI Tạo CV Thông Minh
                        </h3>
                        <p className="text-sm text-green-700 mt-1">Nhập mô tả công việc để AI tạo CV phù hợp</p>
                      </div>
                      <Label htmlFor="ai-prompt">Prompt cho AI</Label>
                      <Textarea
                        id="ai-prompt"
                        placeholder="VD: Tôi là developer với 3 năm kinh nghiệm về React, TypeScript. Tôi muốn tạo CV ứng tuyển vị trí Frontend Developer tại các công ty sản phẩm..."
                        value={aiPrompt}
                        onChange={(e) => setAIPrompt(e.target.value)}
                        className="h-32"
                      />
                      {isGeneratingCV && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-500"></div>
                          Đang tạo CV...
                        </div>
                      )}
                    </div>
                    {generatedCV && (
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">Chọn mẫu CV</h3>
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div 
                            className="border rounded-md p-2 cursor-pointer hover:border-green-500 bg-green-50 border-green-500"
                            onClick={() => handleTemplateChange("modern")}
                          >
                            <div className="aspect-[3/4] bg-white rounded mb-2 flex items-center justify-center">
                              <FileText className="h-8 w-8 text-green-500" />
                            </div>
                            <p className="text-xs text-center font-medium">Modern</p>
                          </div>
                          <div 
                            className="border rounded-md p-2 cursor-pointer hover:border-green-500"
                            onClick={() => handleTemplateChange("classic")}
                          >
                            <div className="aspect-[3/4] bg-gray-50 rounded mb-2 flex items-center justify-center">
                              <FileText className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-xs text-center font-medium">Classic</p>
                          </div>
                          <div 
                            className="border rounded-md p-2 cursor-pointer hover:border-green-500"
                            onClick={() => handleTemplateChange("creative")}
                          >
                            <div className="aspect-[3/4] bg-gray-50 rounded mb-2 flex items-center justify-center">
                              <FileText className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-xs text-center font-medium">Creative</p>
                          </div>
                          <div 
                            className="border rounded-md p-2 cursor-pointer hover:border-green-500"
                            onClick={() => handleTemplateChange("minimal")}
                          >
                            <div className="aspect-[3/4] bg-gray-50 rounded mb-2 flex items-center justify-center">
                              <FileText className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-xs text-center font-medium">Minimal</p>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4 max-h-[400px] overflow-y-auto bg-white">
                          <div className="cv-preview">
                            <h1 className="text-2xl font-bold text-center mb-2">LE NGOC GIAU</h1>
                            <p className="text-center text-gray-600 mb-4">Ho Chi Minh City, Viet Nam</p>
                            
                            <div className="flex justify-center gap-4 text-sm mb-6">
                              <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                lengocgiau234@gmail.com
                              </span>
                              <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                0964184548
                              </span>
                            </div>
                            
                            <div className="mb-6">
                              <h2 className="text-lg font-bold border-b border-gray-300 mb-2 text-green-700">EDUCATION</h2>
                              <div className="flex justify-between mb-1">
                                <div className="font-bold">SaiGon University</div>
                                <div>2021 - present</div>
                              </div>
                              <div className="flex justify-between text-sm">
                                <div><em>A Final-year student - Software Engineering major - GPA - 3.49 / 4.0</em></div>
                                <div>Ho Chi Minh City, VietNam</div>
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h2 className="text-lg font-bold border-b border-gray-300 mb-2 text-green-700">COURSEWORK / SKILLS</h2>
                              <ul className="list-disc pl-5 grid grid-cols-3 gap-1 text-sm">
                                <li>Data Structure and Algorithms (DSA)</li>
                                <li>Database Management System (DBMS)</li>
                                <li>Operating Systems</li>
                                <li>Programming techniques</li>
                                <li>Oops Concepts</li>
                                <li>Software Engineering</li>
                                <li>Information System</li>
                                <li>And Design Analysis</li>
                                <li>Mobile Application</li>
                                <li>Website Programming</li>
                              </ul>
                            </div>
                            
                            <div className="mb-6">
                              <h2 className="text-lg font-bold border-b border-gray-300 mb-2 text-green-700">TECHNICAL SKILLS</h2>
                              <div className="mb-1">
                                <span className="font-bold">Frontend:</span> ReactJS, Angular, HTML, CSS, Bootstrap, TailwindCSS
                              </div>
                              <div className="mb-1">
                                <span className="font-bold">Backend:</span> Java (Spring Boot), PHP, C#(ASP.NET Core), Kotlin, SQL, TypeScript
                              </div>
                              <div className="mb-1">
                                <span className="font-bold">Database:</span> MySQL, SQL Server, SQLite
                              </div>
                              <div className="mb-1">
                                <span className="font-bold">Developer Tools & IDEs:</span> VS Code, PyCharm, IntelliJ, NetBeans, Android Studio, Eclipse
                              </div>
                              <div className="mb-1">
                                <span className="font-bold">Other Tools & Technologies:</span> Postman, GitHub, Figma, Canva, Cloud(Cloudinary), Testing(Selenium)
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h2 className="text-lg font-bold border-b border-gray-300 mb-2 text-green-700">EXPERIENCE</h2>
                              <div className="mb-3">
                                <div className="flex justify-between">
                                  <div className="font-bold">NTC Intern at Niteco VietNam</div>
                                  <div>March 2023 - July 2023</div>
                                </div>
                                <ul className="list-disc pl-5 text-sm">
                                  <li>Learned and Implemented Advanced Data Structure, Graph, Segment Tree</li>
                                  <li>Working on a Full Stack Project Using various Coding Methodologies.</li>
                                  <li>Developed a user-friendly question and answer forum with essential features.</li>
                                  <li>Implemented user authentication, search functionality, and a voting system for ranking answers.</li>
                                  <li>Handle the Database and created a responsive front-end using ReactJs and JavaScript.</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="mb-6">
                              <h2 className="text-lg font-bold border-b border-gray-300 mb-2 text-green-700">PROJECTS</h2>
                              <div className="mb-3">
                                <div className="flex justify-between">
                                  <div className="font-bold">E-commerce-phone-sale - HighTech</div>
                                  <div>2021-2022</div>
                                </div>
                                <div className="text-sm mb-1">HTML, CSS, JavaScript</div>
                                <div className="text-sm mb-1"><span className="font-medium">Number of members:</span> 1 person</div>
                                <div className="mb-1">
                                  <span className="font-medium">Admin:</span> Product, cart, comment, product category, news, banner, voucher and account...
                                </div>
                                <div className="mb-1">
                                  <span className="font-medium">Statistics:</span> Number of orders placed, Most purchased products, User ratings and comments, and Number of registered users and their activity on the website.
                                </div>
                                <div className="mb-1">
                                  <span className="font-medium">User:</span> Product Listings,Shopping Cart,Secure Checkout,User Registration/Login, Comments and Reviews,Password Recovery,Product Categories,News and Updates,Promotions and Discounts,User Account Management,Responsive Design,Customer Support.
                                </div>
                                <div className="mb-1">
                                  <span className="font-medium">GitHub Repository:</span> <a href="#" className="text-blue-600">Link GitHub</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <DialogFooter className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <label htmlFor="cv-upload" className="cursor-pointer">
                          <input 
                            type="file" 
                            id="cv-upload" 
                            accept=".pdf,.doc,.docx" 
                            className="hidden" 
                            onChange={handleUploadCV}
                          />
                          <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            <Upload className="h-4 w-4 mr-1" />
                            Upload PDF
                          </div>
                        </label>
                        <Button variant="outline" onClick={handleShareCV}>
                          <Share2 className="h-4 w-4 mr-1" />
                          Chia sẻ
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setAIPrompt("")}>Hủy</Button>
                        <Button 
                          type="submit" 
                          onClick={handleCreateCVWithAI}
                          disabled={isGeneratingCV || !aiPrompt.trim()}
                        >
                          {isGeneratingCV ? "Đang tạo..." : "Tạo CV"}
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Video Introduction */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Video giới thiệu</h2>
                <p className="text-gray-500 mb-6">Tạo video 30s để gây ấn tượng</p>

                <div className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center">
                  {videoIntro ? (
                    <>
                      <video 
                        className="w-full h-auto rounded-lg mb-4" 
                        controls
                        src={videoIntro.url}
                      />
                      <p className="font-medium mb-2">Video giới thiệu của bạn</p>
                    </>
                  ) : (
                    <>
                      <Video className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="font-medium mb-2">Chưa có video giới thiệu</p>
                    </>
                  )}

                  <Button 
                    className="mt-4 bg-green-600 hover:bg-green-700"
                    onClick={handleRecordVideo}
                  >
                    {videoIntro ? "Quay lại video" : "Quay video ngay"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Tab */}
        <TabsContent value="learning" className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Khóa học được đề xuất</h2>
            <p className="text-gray-500 mb-6">Dựa trên công việc bạn muốn ứng tuyển</p>

            <div className="space-y-4">
              {/* Course 1 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">Advanced React Patterns</h3>
                      <p className="text-gray-500">Thời lượng: 4 giờ</p>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Tiến độ</p>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={courseProgress["react-patterns"]?.progress || 0} 
                            className="h-2 flex-1"
                          />
                          <span className="text-sm font-medium">
                            {courseProgress["react-patterns"]?.progress || 0}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Mở khóa: Senior Frontend Developer positions
                        </Badge>
                      </div>
                    </div>
                    <Button onClick={() => handleContinueCourse("react-patterns")}>Tiếp tục</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Course 2 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">System Design Fundamentals</h3>
                      <p className="text-gray-500">Thời lượng: 6 giờ</p>
                      <div className="mt-2">
                        {courseProgress["system-design"]?.progress > 0 && (
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={courseProgress["system-design"]?.progress || 0} 
                              className="h-2 flex-1"
                            />
                            <span className="text-sm font-medium">
                              {courseProgress["system-design"]?.progress || 0}%
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Mở khóa: Tech Lead positions
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant={courseProgress["system-design"]?.progress > 0 ? "default" : "outline"}
                      onClick={() => courseProgress["system-design"]?.progress > 0 
                        ? handleContinueCourse("system-design") 
                        : handleStartCourse("system-design")
                      }
                    >
                      {courseProgress["system-design"]?.progress > 0 ? "Tiếp tục" : "Bắt đầu"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mentor-Buddy System */}
          <div>
            <h2 className="text-xl font-bold mb-4">Hệ thống Mentor - Buddy</h2>
            <p className="text-gray-500 mb-6">Kết nối với mentor và buddy để phát triển sự nghiệp</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Tìm Mentor</h3>
                  <p className="text-gray-500 mb-4">Được hướng dẫn kỹ năng, CV, phỏng vấn</p>
                  <Button 
                    variant="outline"
                    onClick={() => handleConnect('mentor')}
                  >
                    Kết nối
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Tìm Buddy</h3>
                  <p className="text-gray-500 mb-4">Đồng hành cùng mục tiêu nghề nghiệp</p>
                  <Button 
                    variant="outline"
                    onClick={() => handleConnect('buddy')}
                  >
                    Kết nối
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          <Card>
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Users className="h-10 w-10 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Sắp ra mắt</h2>
              <p className="text-gray-500 mb-6 max-w-md">Tính năng cộng đồng đang được phát triển</p>
              <Button 
                variant={hasSubscribed ? "outline" : "default"}
                onClick={handleSubscribeNotifications}
                disabled={hasSubscribed}
              >
                {hasSubscribed ? "Đã đăng ký nhận thông báo" : "Đăng ký nhận thông báo"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* CV Preview Dialog */}
      <Dialog open={showCVPreview} onOpenChange={setShowCVPreview}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>CV Preview</DialogTitle>
            <DialogDescription>
              {currentCV?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 border rounded-md bg-white">
            {currentCV ? (
              <pre className="whitespace-pre-wrap">{currentCV.content}</pre>
            ) : (
              <p className="text-center py-8">Không có CV để xem</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleDownloadCV}>Tải xuống</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Video Recorder Dialog */}
      <Dialog open={showVideoRecorder} onOpenChange={setShowVideoRecorder}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Quay video giới thiệu</DialogTitle>
            <DialogDescription>
              Tạo một video ngắn 30 giây để giới thiệu bản thân với nhà tuyển dụng
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-md p-4 text-center">
            <div className="bg-gray-100 p-8 rounded-lg mb-4">
              <Video className="h-16 w-16 text-gray-400 mx-auto" />
              <p className="mt-4">Thiết bị quay video chưa được kết nối</p>
              <p className="text-sm text-gray-500 mt-2">Vui lòng kết nối camera và microphone</p>
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline">Bắt đầu quay</Button>
              <Button 
                onClick={() => handleSaveVideo("https://example.com/sample-video.mp4")}
              >
                Lưu video demo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chia sẻ CV</DialogTitle>
            <DialogDescription>
              Link chia sẻ CV của bạn
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 border rounded-md bg-white">
            {shareLink && (
              <div className="flex justify-center">
                <p className="text-center text-gray-500">{shareLink}</p>
              </div>
            )}
            <div className="mt-4 flex justify-center gap-4">
              <Button variant="outline" onClick={handleCopyShareLink}>
                Sao chép link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CandidateDashboard
