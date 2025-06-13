"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Eye,
  Plus,
  Trash2,
  Upload,
  Wand2,
  Save,
  Share2,
  ArrowLeft,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

interface ValidationErrors {
  [key: string]: string
}

interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  current: boolean
}

interface Education {
  id: number
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  gpa: string
}

interface Project {
  id: number
  name: string
  description: string
  technologies: string
  link: string
}

export default function CVBuilderPage() {
  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    experience: [] as Experience[],
    education: [] as Education[],
    skills: [] as string[],
    projects: [] as Project[],
    certifications: [],
  })

  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [showPreview, setShowPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Thiết kế hiện đại, phù hợp cho IT",
      preview: "/placeholder.svg?height=300&width=200",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Phong cách truyền thống, chuyên nghiệp",
      preview: "/placeholder.svg?height=300&width=200",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Sáng tạo, phù hợp cho Designer",
      preview: "/placeholder.svg?height=300&width=200",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Tối giản, dễ đọc",
      preview: "/placeholder.svg?height=300&width=200",
    },
  ]

  // Validation functions
  const validateEmail = (email: string): string => {
    if (!email) return "Email là bắt buộc"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Email không hợp lệ"
    return ""
  }

  const validatePhone = (phone: string): string => {
    if (!phone) return "Số điện thoại là bắt buộc"
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) return "Số điện thoại không hợp lệ"
    return ""
  }

  const validateRequired = (value: string, fieldName: string): string => {
    if (!value.trim()) return `${fieldName} là bắt buộc`
    return ""
  }

  const validatePersonalInfo = (): boolean => {
    const newErrors: ValidationErrors = {}

    const nameError = validateRequired(cvData.personalInfo.fullName, "Họ tên")
    if (nameError) newErrors.fullName = nameError

    const emailError = validateEmail(cvData.personalInfo.email)
    if (emailError) newErrors.email = emailError

    const phoneError = validatePhone(cvData.personalInfo.phone)
    if (phoneError) newErrors.phone = phoneError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerateWithAI = async () => {
    if (!jobDescription.trim()) {
      setErrors({ jobDescription: "Vui lòng nhập mô tả công việc" })
      return
    }

    setIsGeneratingWithAI(true)
    setErrors({})

    // Mock AI generation
    setTimeout(() => {
      setCvData({
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          summary: `${cvData.personalInfo.fullName || "Ứng viên"} với kinh nghiệm phù hợp cho vị trí được mô tả. Có khả năng làm việc độc lập và theo nhóm, đam mê học hỏi công nghệ mới và phát triển kỹ năng chuyên môn.`,
        },
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Git", "Problem Solving", "Team Work"],
      })
      setIsGeneratingWithAI(false)
    }, 3000)
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    }
    setCvData({
      ...cvData,
      experience: [...cvData.experience, newExp],
    })
  }

  const updateExperience = (id: number, field: keyof Experience, value: string | boolean) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const removeExperience = (id: number) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now(),
      school: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    setCvData({
      ...cvData,
      education: [...cvData.education, newEdu],
    })
  }

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    setCvData({
      ...cvData,
      education: cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: number) => {
    setCvData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    }
    setCvData({
      ...cvData,
      projects: [...cvData.projects, newProject],
    })
  }

  const updateProject = (id: number, field: keyof Project, value: string) => {
    setCvData({
      ...cvData,
      projects: cvData.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    })
  }

  const removeProject = (id: number) => {
    setCvData({
      ...cvData,
      projects: cvData.projects.filter((project) => project.id !== id),
    })
  }

  const addSkill = () => {
    if (!newSkill.trim()) {
      setErrors({ newSkill: "Vui lòng nhập tên kỹ năng" })
      return
    }

    if (cvData.skills.includes(newSkill.trim())) {
      setErrors({ newSkill: "Kỹ năng này đã tồn tại" })
      return
    }

    setCvData({
      ...cvData,
      skills: [...cvData.skills, newSkill.trim()],
    })
    setNewSkill("")
    setErrors({ ...errors, newSkill: "" })
  }

  const removeSkill = (skillToRemove: string) => {
    setCvData({
      ...cvData,
      skills: cvData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const addPopularSkill = (skill: string) => {
    if (!cvData.skills.includes(skill)) {
      setCvData({
        ...cvData,
        skills: [...cvData.skills, skill],
      })
    }
  }

  const handleSave = async () => {
    if (!validatePersonalInfo()) return

    setIsSaving(true)

    // Mock save
    setTimeout(() => {
      setSaveSuccess(true)
      setIsSaving(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1500)
  }

  const handleDownload = () => {
    if (!validatePersonalInfo()) {
      alert("Vui lòng điền đầy đủ thông tin cá nhân trước khi tải xuống")
      return
    }

    // Mock download
    alert("Đang tải xuống CV...")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/dashboard/candidate"
            className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại Dashboard</span>
          </Link>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Đang lưu..." : "Lưu"}
            </Button>

            <Dialog open={showPreview} onOpenChange={setShowPreview}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Xem trước
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Xem trước CV</DialogTitle>
                  <DialogDescription>
                    Đây là bản xem trước CV của bạn với template{" "}
                    {templates.find((t) => t.id === selectedTemplate)?.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="bg-white p-8 border rounded-lg">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">{cvData.personalInfo.fullName || "Họ tên"}</h1>
                    <div className="text-gray-600 mt-2">
                      <p>
                        {cvData.personalInfo.email} | {cvData.personalInfo.phone}
                      </p>
                      <p>{cvData.personalInfo.address}</p>
                    </div>
                  </div>

                  {cvData.personalInfo.summary && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">Tóm tắt</h2>
                      <p className="text-gray-700">{cvData.personalInfo.summary}</p>
                    </div>
                  )}

                  {cvData.skills.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">Kỹ năng</h2>
                      <div className="flex flex-wrap gap-2">
                        {cvData.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {cvData.experience.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-2">Kinh nghiệm làm việc</h2>
                      {cvData.experience.map((exp) => (
                        <div key={exp.id} className="mb-4">
                          <h3 className="font-medium">
                            {exp.position} - {exp.company}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {exp.startDate} - {exp.current ? "Hiện tại" : exp.endDate}
                          </p>
                          <p className="text-gray-700 mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Tải xuống
            </Button>

            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Chia sẻ
            </Button>
          </div>
        </div>
      </header>

      {saveSuccess && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-green-700">CV đã được lưu thành công!</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CV Builder Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Assistant */}
            <Card className="border-emerald-200 bg-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-700">
                  <Wand2 className="w-5 h-5 mr-2" />
                  AI Tạo CV Thông Minh
                </CardTitle>
                <CardDescription>Nhập mô tả công việc để AI tạo CV phù hợp</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Dán job description hoặc mô tả công việc bạn muốn ứng tuyển..."
                    value={jobDescription}
                    onChange={(e) => {
                      setJobDescription(e.target.value)
                      if (errors.jobDescription) {
                        setErrors({ ...errors, jobDescription: "" })
                      }
                    }}
                    rows={4}
                    className={errors.jobDescription ? "border-red-500" : ""}
                  />
                  {errors.jobDescription && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.jobDescription}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleGenerateWithAI}
                    disabled={isGeneratingWithAI}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isGeneratingWithAI ? "Đang tạo..." : "Tạo CV với AI"}
                  </Button>
                  <Select defaultValue="professional">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Chuyên nghiệp</SelectItem>
                      <SelectItem value="creative">Sáng tạo</SelectItem>
                      <SelectItem value="concise">Rút gọn</SelectItem>
                      <SelectItem value="career-change">Chuyển ngành</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* CV Form Tabs */}
            <Card>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="personal">Cá nhân</TabsTrigger>
                  <TabsTrigger value="experience">Kinh nghiệm</TabsTrigger>
                  <TabsTrigger value="education">Học vấn</TabsTrigger>
                  <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
                  <TabsTrigger value="projects">Dự án</TabsTrigger>
                  <TabsTrigger value="others">Khác</TabsTrigger>
                </TabsList>

                {/* Personal Info Tab */}
                <TabsContent value="personal" className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên *</Label>
                      <Input
                        id="fullName"
                        value={cvData.personalInfo.fullName}
                        onChange={(e) => {
                          setCvData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, fullName: e.target.value },
                          })
                          if (errors.fullName) {
                            setErrors({ ...errors, fullName: "" })
                          }
                        }}
                        placeholder="Nguyễn Văn A"
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={cvData.personalInfo.email}
                        onChange={(e) => {
                          setCvData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, email: e.target.value },
                          })
                          if (errors.email) {
                            setErrors({ ...errors, email: "" })
                          }
                        }}
                        placeholder="email@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        value={cvData.personalInfo.phone}
                        onChange={(e) => {
                          setCvData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, phone: e.target.value },
                          })
                          if (errors.phone) {
                            setErrors({ ...errors, phone: "" })
                          }
                        }}
                        placeholder="0123456789"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        value={cvData.personalInfo.address}
                        onChange={(e) =>
                          setCvData({
                            ...cvData,
                            personalInfo: { ...cvData.personalInfo, address: e.target.value },
                          })
                        }
                        placeholder="Hà Nội, Việt Nam"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">Tóm tắt bản thân</Label>
                    <Textarea
                      id="summary"
                      value={cvData.personalInfo.summary}
                      onChange={(e) =>
                        setCvData({
                          ...cvData,
                          personalInfo: { ...cvData.personalInfo, summary: e.target.value },
                        })
                      }
                      placeholder="Mô tả ngắn gọn về bản thân, mục tiêu nghề nghiệp..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Ảnh đại diện</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Kéo thả ảnh hoặc click để chọn</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG tối đa 2MB</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Experience Tab */}
                <TabsContent value="experience" className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Kinh nghiệm làm việc</h3>
                    <Button onClick={addExperience} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm kinh nghiệm
                    </Button>
                  </div>

                  {cvData.experience.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Chưa có kinh nghiệm làm việc</p>
                      <p className="text-sm">Click "Thêm kinh nghiệm" để bắt đầu</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cvData.experience.map((exp, index) => (
                        <Card key={exp.id} className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Kinh nghiệm {index + 1}</h4>
                            <Button variant="outline" size="sm" onClick={() => removeExperience(exp.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Công ty *</Label>
                              <Input
                                placeholder="Tên công ty"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Vị trí *</Label>
                              <Input
                                placeholder="Chức danh"
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Từ ngày</Label>
                              <Input
                                type="date"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Đến ngày</Label>
                              <div className="space-y-2">
                                <Input
                                  type="date"
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                  disabled={exp.current}
                                />
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`current-${exp.id}`}
                                    checked={exp.current}
                                    onChange={(e) => {
                                      updateExperience(exp.id, "current", e.target.checked)
                                      if (e.target.checked) {
                                        updateExperience(exp.id, "endDate", "")
                                      }
                                    }}
                                    className="rounded"
                                  />
                                  <Label htmlFor={`current-${exp.id}`} className="text-sm">
                                    Đang làm việc tại đây
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mt-4">
                            <Label>Mô tả công việc</Label>
                            <Textarea
                              placeholder="Mô tả chi tiết về công việc, thành tích..."
                              rows={3}
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Education Tab */}
                <TabsContent value="education" className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Học vấn</h3>
                    <Button onClick={addEducation} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm học vấn
                    </Button>
                  </div>

                  {cvData.education.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Chưa có thông tin học vấn</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cvData.education.map((edu, index) => (
                        <Card key={edu.id} className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Học vấn {index + 1}</h4>
                            <Button variant="outline" size="sm" onClick={() => removeEducation(edu.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Trường học *</Label>
                              <Input
                                placeholder="Tên trường"
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Bằng cấp *</Label>
                              <Input
                                placeholder="Cử nhân, Thạc sĩ..."
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Chuyên ngành</Label>
                              <Input
                                placeholder="Công nghệ thông tin..."
                                value={edu.major}
                                onChange={(e) => updateEducation(edu.id, "major", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>GPA</Label>
                              <Input
                                placeholder="3.5/4.0"
                                value={edu.gpa}
                                onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Từ năm</Label>
                              <Input
                                type="number"
                                placeholder="2018"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Đến năm</Label>
                              <Input
                                type="number"
                                placeholder="2022"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Skills Tab */}
                <TabsContent value="skills" className="p-6 space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Kỹ năng</h3>

                    <div className="space-y-2">
                      <Label>Thêm kỹ năng</Label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Nhập kỹ năng..."
                          value={newSkill}
                          onChange={(e) => {
                            setNewSkill(e.target.value)
                            if (errors.newSkill) {
                              setErrors({ ...errors, newSkill: "" })
                            }
                          }}
                          className={errors.newSkill ? "border-red-500" : ""}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addSkill()
                            }
                          }}
                        />
                        <Button onClick={addSkill}>Thêm</Button>
                      </div>
                      {errors.newSkill && (
                        <p className="text-red-500 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          {errors.newSkill}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Kỹ năng của bạn ({cvData.skills.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {cvData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {skill}
                              <button
                                className="ml-2 text-red-500 hover:text-red-700"
                                onClick={() => removeSkill(skill)}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                          {cvData.skills.length === 0 && <p className="text-gray-500 text-sm">Chưa có kỹ năng nào</p>}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Kỹ năng phổ biến</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "JavaScript",
                            "Python",
                            "React",
                            "Node.js",
                            "SQL",
                            "Git",
                            "Docker",
                            "AWS",
                            "TypeScript",
                            "Vue.js",
                            "Angular",
                            "PHP",
                          ].map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="cursor-pointer hover:bg-emerald-50"
                              onClick={() => addPopularSkill(skill)}
                            >
                              + {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Projects Tab */}
                <TabsContent value="projects" className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Dự án</h3>
                    <Button onClick={addProject} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm dự án
                    </Button>
                  </div>

                  {cvData.projects.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Chưa có dự án nào</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cvData.projects.map((project, index) => (
                        <Card key={project.id} className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Dự án {index + 1}</h4>
                            <Button variant="outline" size="sm" onClick={() => removeProject(project.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Tên dự án *</Label>
                              <Input
                                placeholder="Tên dự án"
                                value={project.name}
                                onChange={(e) => updateProject(project.id, "name", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Mô tả dự án</Label>
                              <Textarea
                                placeholder="Mô tả chi tiết về dự án, vai trò của bạn..."
                                rows={3}
                                value={project.description}
                                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                              />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Công nghệ sử dụng</Label>
                                <Input
                                  placeholder="React, Node.js, MongoDB..."
                                  value={project.technologies}
                                  onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Link dự án</Label>
                                <Input
                                  placeholder="https://github.com/..."
                                  value={project.link}
                                  onChange={(e) => updateProject(project.id, "link", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Others Tab */}
                <TabsContent value="others" className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Chứng chỉ</h3>
                    <div className="space-y-2">
                      <Input placeholder="Tên chứng chỉ" />
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input placeholder="Tổ chức cấp" />
                        <Input type="date" placeholder="Ngày cấp" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm chứng chỉ
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Ngôn ngữ</h3>
                    <div className="space-y-2">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input placeholder="Ngôn ngữ" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Trình độ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Cơ bản</SelectItem>
                            <SelectItem value="intermediate">Trung bình</SelectItem>
                            <SelectItem value="advanced">Khá</SelectItem>
                            <SelectItem value="fluent">Thành thạo</SelectItem>
                            <SelectItem value="native">Bản ngữ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm ngôn ngữ
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Sở thích</h3>
                    <Textarea placeholder="Mô tả sở thích, hoạt động ngoại khóa..." rows={3} />
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Template Selection & Preview */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Chọn mẫu CV</CardTitle>
                <CardDescription>Chọn thiết kế phù hợp với ngành nghề</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedTemplate === template.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <img
                        src={template.preview || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <p className="text-xs text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CV Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Xem trước CV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Xem trước CV</p>
                    <p className="text-sm">Điền thông tin để xem CV</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống PDF
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowPreview(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Xem toàn màn hình
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ CV
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
