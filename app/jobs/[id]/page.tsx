"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  MapPin,
  Building,
  Clock,
  DollarSign,
  Heart,
  Share2,
  Flag,
  Star,
  CheckCircle,
  Send,
  FileText,
  Video,
  Calendar,
  Award,
  Target,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ValidationErrors {
  [key: string]: string
}

export default function JobDetailPage() {
  const params = useParams()
  const [isApplying, setIsApplying] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    cvFile: null as File | null,
    videoFile: null as File | null,
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isShared, setIsShared] = useState(false)

  // Mock job data - in real app, fetch based on params.id
  const job = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Vietnam",
    location: "Hà Nội",
    salary: "20-30 triệu VNĐ",
    type: "Full-time",
    experience: "3-5 năm",
    posted: "2 ngày trước",
    deadline: "30/01/2024",
    urgent: true,
    featured: true,
    views: 156,
    applications: 24,
    description: `
      Chúng tôi đang tìm kiếm một Senior Frontend Developer tài năng để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi. 
      Bạn sẽ có cơ hội làm việc với các công nghệ hiện đại và tham gia vào việc xây dựng các ứng dụng web quy mô lớn.
    `,
    requirements: [
      "Có ít nhất 3 năm kinh nghiệm phát triển Frontend",
      "Thành thạo React, TypeScript, Next.js",
      "Kinh nghiệm với Tailwind CSS, SCSS",
      "Hiểu biết về RESTful API, GraphQL",
      "Kinh nghiệm với Git, CI/CD",
      "Khả năng làm việc nhóm tốt",
      "Tiếng Anh giao tiếp cơ bản",
    ],
    responsibilities: [
      "Phát triển và duy trì các ứng dụng web Frontend",
      "Tối ưu hóa hiệu suất ứng dụng",
      "Làm việc chặt chẽ với team Backend và Designer",
      "Code review và mentor junior developers",
      "Nghiên cứu và áp dụng công nghệ mới",
      "Tham gia vào quy trình Agile/Scrum",
    ],
    benefits: [
      "Lương cạnh tranh: 20-30 triệu VNĐ",
      "Thưởng hiệu suất hàng quý",
      "Bảo hiểm sức khỏe cao cấp",
      "Làm việc từ xa 2 ngày/tuần",
      "Laptop MacBook Pro",
      "Budget học tập 10 triệu/năm",
      "Team building hàng quý",
      "Môi trường làm việc trẻ trung, năng động",
    ],
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Git"],
    companyInfo: {
      name: "TechCorp Vietnam",
      size: "100-500 nhân viên",
      industry: "Công nghệ thông tin",
      website: "https://techcorp.vn",
      description:
        "TechCorp là công ty công nghệ hàng đầu tại Việt Nam, chuyên phát triển các giải pháp phần mềm cho doanh nghiệp.",
      logo: "/placeholder.svg?height=80&width=80",
    },
  }

  const relatedJobs = [
    {
      id: 2,
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "TP.HCM",
      salary: "15-20 triệu",
      type: "Remote",
    },
    {
      id: 3,
      title: "React Developer",
      company: "DevStudio",
      location: "Đà Nẵng",
      salary: "18-25 triệu",
      type: "Hybrid",
    },
  ]

  const validateApplication = (): boolean => {
    const newErrors: ValidationErrors = {}

    if (!applicationData.cvFile) {
      newErrors.cvFile = "Vui lòng tải lên CV của bạn"
    }

    if (applicationData.coverLetter.length > 1000) {
      newErrors.coverLetter = "Thư xin việc không được quá 1000 ký tự"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "cv" | "video") => {
    const file = event.target.files?.[0]
    if (!file) return

    if (type === "cv") {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, cvFile: "Chỉ chấp nhận file PDF, DOC, DOCX" })
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setErrors({ ...errors, cvFile: "File CV không được quá 5MB" })
        return
      }
      setApplicationData({ ...applicationData, cvFile: file })
      setErrors({ ...errors, cvFile: "" })
    } else if (type === "video") {
      const allowedTypes = ["video/mp4", "video/webm", "video/quicktime"]
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, videoFile: "Chỉ chấp nhận file MP4, WebM, MOV" })
        return
      }
      if (file.size > 50 * 1024 * 1024) {
        // 50MB
        setErrors({ ...errors, videoFile: "File video không được quá 50MB" })
        return
      }
      setApplicationData({ ...applicationData, videoFile: file })
      setErrors({ ...errors, videoFile: "" })
    }
  }

  const handleApply = async () => {
    if (!validateApplication()) return

    setIsApplying(true)

    // Mock application submission
    setTimeout(() => {
      setIsApplying(false)
      setIsDialogOpen(false)
      setApplicationData({
        coverLetter: "",
        cvFile: null,
        videoFile: null,
      })
      alert("Ứng tuyển thành công! Chúng tôi sẽ liên hệ với bạn sớm.")
    }, 2000)
  }

  const handleSaveJob = () => {
    setIsSaved(!isSaved)
    if (!isSaved) {
      alert("Đã lưu việc làm vào danh sách yêu thích!")
    } else {
      alert("Đã bỏ lưu việc làm!")
    }
  }

  const handleShareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Việc làm ${job.title} tại ${job.company}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setIsShared(true)
      setTimeout(() => setIsShared(false), 2000)
    }
  }

  const handleReportJob = () => {
    const reason = prompt("Lý do báo cáo:")
    if (reason) {
      alert("Đã gửi báo cáo. Cảm ơn bạn đã góp ý!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/jobs" className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600">
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại danh sách việc làm</span>
          </Link>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveJob}
              className={isSaved ? "bg-red-50 text-red-600 border-red-200" : ""}
            >
              <Heart className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Đã lưu" : "Lưu việc làm"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareJob}>
              <Share2 className="w-4 h-4 mr-2" />
              {isShared ? "Đã sao chép!" : "Chia sẻ"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReportJob}>
              <Flag className="w-4 h-4 mr-2" />
              Báo cáo
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                      {job.featured && (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <Star className="w-3 h-3 mr-1" />
                          Nổi bật
                        </Badge>
                      )}
                      {job.urgent && <Badge className="bg-red-100 text-red-700">Gấp</Badge>}
                    </div>

                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.posted}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-emerald-600 font-semibold text-lg">
                        <DollarSign className="w-5 h-5 mr-1" />
                        {job.salary}
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {job.type}
                      </Badge>
                      <span className="text-gray-600">{job.experience}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-2">
                      {job.views} lượt xem • {job.applications} ứng tuyển
                    </div>
                    <div className="text-sm text-red-600 font-medium">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Hạn nộp: {job.deadline}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Details Tabs */}
            <Card>
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">Mô tả công việc</TabsTrigger>
                  <TabsTrigger value="requirements">Yêu cầu</TabsTrigger>
                  <TabsTrigger value="benefits">Phúc lợi</TabsTrigger>
                  <TabsTrigger value="company">Về công ty</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                        Mô tả công việc
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{job.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-emerald-600" />
                        Trách nhiệm chính
                      </h3>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="p-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-emerald-600" />
                      Yêu cầu ứng viên
                    </h3>
                    <ul className="space-y-3">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="benefits" className="p-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-emerald-600" />
                      Quyền lợi được hưởng
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {job.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start p-3 bg-emerald-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="company" className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={job.companyInfo.logo || "/placeholder.svg"}
                        alt={job.companyInfo.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{job.companyInfo.name}</h3>
                        <div className="flex items-center space-x-4 text-gray-600 mt-1">
                          <span>{job.companyInfo.size}</span>
                          <span>•</span>
                          <span>{job.companyInfo.industry}</span>
                        </div>
                        <Link
                          href={job.companyInfo.website}
                          className="text-emerald-600 hover:underline text-sm"
                          target="_blank"
                        >
                          {job.companyInfo.website}
                        </Link>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Giới thiệu công ty</h4>
                      <p className="text-gray-700 leading-relaxed">{job.companyInfo.description}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ứng tuyển ngay</CardTitle>
                <CardDescription>Gửi hồ sơ của bạn để ứng tuyển vào vị trí này</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                      <Send className="w-4 h-4 mr-2" />
                      Ứng tuyển ngay
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Ứng tuyển: {job.title}</DialogTitle>
                      <DialogDescription>Gửi CV và thư xin việc của bạn</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>CV của bạn *</Label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-emerald-400 transition-colors ${
                            errors.cvFile ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload(e, "cv")}
                            className="hidden"
                            id="cv-upload"
                          />
                          <label htmlFor="cv-upload" className="cursor-pointer">
                            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            {applicationData.cvFile ? (
                              <p className="text-sm text-green-600">
                                <CheckCircle className="w-4 h-4 inline mr-1" />
                                {applicationData.cvFile.name}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-600">Kéo thả CV hoặc click để chọn file</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (tối đa 5MB)</p>
                          </label>
                        </div>
                        {errors.cvFile && (
                          <p className="text-red-500 text-sm flex items-center">
                            <XCircle className="w-4 h-4 mr-1" />
                            {errors.cvFile}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Thư xin việc (tùy chọn)</Label>
                        <Textarea
                          placeholder="Viết vài dòng giới thiệu về bản thân..."
                          value={applicationData.coverLetter}
                          onChange={(e) => {
                            setApplicationData({ ...applicationData, coverLetter: e.target.value })
                            if (errors.coverLetter) {
                              setErrors({ ...errors, coverLetter: "" })
                            }
                          }}
                          className={errors.coverLetter ? "border-red-500" : ""}
                          maxLength={1000}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{applicationData.coverLetter.length}/1000 ký tự</span>
                        </div>
                        {errors.coverLetter && (
                          <p className="text-red-500 text-sm flex items-center">
                            <XCircle className="w-4 h-4 mr-1" />
                            {errors.coverLetter}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Video giới thiệu (tùy chọn)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-400 transition-colors">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleFileUpload(e, "video")}
                            className="hidden"
                            id="video-upload"
                          />
                          <label htmlFor="video-upload" className="cursor-pointer">
                            <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            {applicationData.videoFile ? (
                              <p className="text-sm text-green-600">
                                <CheckCircle className="w-4 h-4 inline mr-1" />
                                {applicationData.videoFile.name}
                              </p>
                            ) : (
                              <p className="text-sm text-gray-600">Quay video 30s giới thiệu</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">MP4, WebM, MOV (tối đa 50MB)</p>
                          </label>
                        </div>
                        {errors.videoFile && (
                          <p className="text-red-500 text-sm flex items-center">
                            <XCircle className="w-4 h-4 mr-1" />
                            {errors.videoFile}
                          </p>
                        )}
                      </div>

                      <Button
                        onClick={handleApply}
                        disabled={isApplying}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      >
                        {isApplying ? "Đang gửi..." : "Gửi hồ sơ ứng tuyển"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full" onClick={handleSaveJob}>
                  <Heart className={`w-4 h-4 mr-2 ${isSaved ? "fill-current text-red-500" : ""}`} />
                  {isSaved ? "Đã lưu" : "Lưu việc làm"}
                </Button>

                <Separator />

                <div className="text-center text-sm text-gray-600">
                  <p>Bạn chưa có CV?</p>
                  <Link href="/cv-builder" className="text-emerald-600 hover:underline">
                    Tạo CV với AI ngay
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thống kê việc làm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lượt xem:</span>
                    <span className="font-medium">{job.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ứng viên:</span>
                    <span className="font-medium">{job.applications}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đăng:</span>
                    <span className="font-medium">{job.posted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hạn nộp:</span>
                    <span className="font-medium text-red-600">{job.deadline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Việc làm liên quan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <Link
                      key={relatedJob.id}
                      href={`/jobs/${relatedJob.id}`}
                      className="block border rounded-lg p-3 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-sm mb-1">{relatedJob.title}</h4>
                      <p className="text-gray-600 text-xs mb-2">{relatedJob.company}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{relatedJob.location}</span>
                        <span className="text-emerald-600 font-medium">{relatedJob.salary}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
