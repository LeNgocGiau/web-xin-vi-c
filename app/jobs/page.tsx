"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  Heart,
  Clock,
  Building,
  DollarSign,
  Star,
  Eye,
  ChevronDown,
  X,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function JobsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [location, setLocation] = useState(searchParams.get("location") || "")
  const [jobType, setJobType] = useState(searchParams.get("type") || "")
  const [salaryRange, setSalaryRange] = useState([5, 50])
  const [showFilters, setShowFilters] = useState(false)
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const [selectedFilters, setSelectedFilters] = useState({
    jobTypes: [] as string[],
    experiences: [] as string[],
    companies: [] as string[],
    skills: [] as string[],
  })

  // Vietnam provinces
  const vietnamProvinces = [
    "Hà Nội",
    "TP.HCM",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
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
    "Phú Yên",
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
  ]

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Vietnam",
      location: "Hà Nội",
      salary: "20-30 triệu",
      salaryMin: 20,
      salaryMax: 30,
      type: "Full-time",
      experience: "3-5 năm",
      posted: "2 ngày trước",
      urgent: true,
      featured: true,
      description: "Tìm kiếm Senior Frontend Developer có kinh nghiệm với React, TypeScript...",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      benefits: ["Bảo hiểm sức khỏe", "Thưởng hiệu suất", "Làm việc từ xa"],
      views: 156,
      applications: 24,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignStudio",
      location: "TP.HCM",
      salary: "15-25 triệu",
      salaryMin: 15,
      salaryMax: 25,
      type: "Remote",
      experience: "2-4 năm",
      posted: "1 ngày trước",
      urgent: false,
      featured: false,
      description: "Cần tuyển UX/UI Designer sáng tạo, có kinh nghiệm thiết kế mobile app...",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      benefits: ["Flexible time", "Laptop provided", "Training budget"],
      views: 89,
      applications: 18,
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Đà Nẵng",
      salary: "18-28 triệu",
      salaryMin: 18,
      salaryMax: 28,
      type: "Hybrid",
      experience: "2-5 năm",
      posted: "3 ngày trước",
      urgent: false,
      featured: true,
      description: "Startup công nghệ tìm kiếm Full Stack Developer năng động...",
      skills: ["Node.js", "React", "MongoDB", "AWS"],
      benefits: ["Stock options", "Free lunch", "Gym membership"],
      views: 234,
      applications: 45,
    },
    {
      id: 4,
      title: "Marketing Manager",
      company: "E-commerce Co",
      location: "Hà Nội",
      salary: "25-35 triệu",
      salaryMin: 25,
      salaryMax: 35,
      type: "Full-time",
      experience: "3-6 năm",
      posted: "1 tuần trước",
      urgent: false,
      featured: false,
      description: "Quản lý chiến lược marketing cho sản phẩm e-commerce...",
      skills: ["Digital Marketing", "SEO", "Google Ads", "Analytics"],
      benefits: ["Performance bonus", "Travel opportunities", "Training"],
      views: 178,
      applications: 32,
    },
  ]

  const jobTypes = ["Full-time", "Part-time", "Remote", "Hybrid", "Freelance", "Internship"]
  const experienceLevels = ["Intern", "0-1 năm", "1-3 năm", "3-5 năm", "5+ năm"]
  const companies = ["TechCorp", "DesignStudio", "StartupXYZ", "E-commerce Co"]
  const popularSkills = ["React", "Node.js", "Python", "Java", "PHP", "Angular", "Vue.js", "AWS"]

  useEffect(() => {
    // Load saved jobs from localStorage
    const saved = localStorage.getItem("savedJobs")
    if (saved) {
      setSavedJobs(JSON.parse(saved))
    }
  }, [])

  const filteredJobs = jobs.filter((job) => {
    // Search query filter
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    // Location filter
    const matchesLocation =
      !location || location === "all" || job.location.toLowerCase().includes(location.toLowerCase())

    // Job type filter
    const matchesJobType = !jobType || jobType === "all" || job.type === jobType

    // Advanced filters
    const matchesJobTypes = selectedFilters.jobTypes.length === 0 || selectedFilters.jobTypes.includes(job.type)

    const matchesExperience =
      selectedFilters.experiences.length === 0 || selectedFilters.experiences.includes(job.experience)

    const matchesCompany =
      selectedFilters.companies.length === 0 ||
      selectedFilters.companies.some((company) => job.company.includes(company))

    const matchesSkills =
      selectedFilters.skills.length === 0 || selectedFilters.skills.some((skill) => job.skills.includes(skill))

    // Salary range filter
    const matchesSalary = job.salaryMin >= salaryRange[0] && job.salaryMax <= salaryRange[1]

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesJobTypes &&
      matchesExperience &&
      matchesCompany &&
      matchesSkills &&
      matchesSalary
    )
  })

  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string, checked: boolean) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: checked ? [...prev[filterType], value] : prev[filterType].filter((item) => item !== value),
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      jobTypes: [],
      experiences: [],
      companies: [],
      skills: [],
    })
    setSalaryRange([5, 50])
    setLocation("")
    setJobType("")
    setSearchQuery("")
  }

  const handleSaveJob = (jobId: number) => {
    const newSavedJobs = savedJobs.includes(jobId) ? savedJobs.filter((id) => id !== jobId) : [...savedJobs, jobId]

    setSavedJobs(newSavedJobs)
    localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs))

    const action = savedJobs.includes(jobId) ? "bỏ lưu" : "lưu"
    alert(`Đã ${action} việc làm!`)
  }

  const handleApplyJob = (jobId: number) => {
    router.push(`/jobs/${jobId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">JobFind</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/jobs" className="text-emerald-600 font-medium">
              Tìm việc làm
            </Link>
            <Link href="/companies" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Công ty
            </Link>
            <Link href="/courses" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Khóa học
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Cộng đồng
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500" asChild>
              <Link href="/login">Đăng ký</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Vị trí, công ty, kỹ năng..."
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="pl-10 h-12">
                      <SelectValue placeholder="Địa điểm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả địa điểm</SelectItem>
                      {vietnamProvinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Loại công việc" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả loại</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="h-12 bg-gradient-to-r from-emerald-500 to-teal-500">Tìm kiếm</Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500">Từ khóa phổ biến:</span>
                  {["Frontend", "Backend", "Designer", "Marketing", "Remote"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-emerald-100"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Bộ lọc</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                  </Button>

                  {(selectedFilters.jobTypes.length > 0 ||
                    selectedFilters.experiences.length > 0 ||
                    selectedFilters.companies.length > 0 ||
                    selectedFilters.skills.length > 0 ||
                    salaryRange[0] !== 5 ||
                    salaryRange[1] !== 50) && (
                    <Button variant="ghost" onClick={clearAllFilters} className="text-red-600">
                      <X className="w-4 h-4 mr-1" />
                      Xóa bộ lọc
                    </Button>
                  )}
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-6 p-4 border-t">
                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Job Type Filter */}
                    <div>
                      <h4 className="font-medium mb-3">Hình thức làm việc</h4>
                      <div className="space-y-2">
                        {jobTypes.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type}
                              checked={selectedFilters.jobTypes.includes(type)}
                              onCheckedChange={(checked) => handleFilterChange("jobTypes", type, checked as boolean)}
                            />
                            <label htmlFor={type} className="text-sm cursor-pointer">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience Filter */}
                    <div>
                      <h4 className="font-medium mb-3">Kinh nghiệm</h4>
                      <div className="space-y-2">
                        {experienceLevels.map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                              id={level}
                              checked={selectedFilters.experiences.includes(level)}
                              onCheckedChange={(checked) =>
                                handleFilterChange("experiences", level, checked as boolean)
                              }
                            />
                            <label htmlFor={level} className="text-sm cursor-pointer">
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Salary Range */}
                    <div>
                      <h4 className="font-medium mb-3">Mức lương (triệu VNĐ)</h4>
                      <div className="px-2">
                        <Slider
                          value={salaryRange}
                          onValueChange={setSalaryRange}
                          max={100}
                          min={0}
                          step={5}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{salaryRange[0]} triệu</span>
                          <span>{salaryRange[1]} triệu</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills Filter */}
                    <div>
                      <h4 className="font-medium mb-3">Kỹ năng</h4>
                      <div className="space-y-2">
                        {popularSkills.slice(0, 6).map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={skill}
                              checked={selectedFilters.skills.includes(skill)}
                              onCheckedChange={(checked) => handleFilterChange("skills", skill, checked as boolean)}
                            />
                            <label htmlFor={skill} className="text-sm cursor-pointer">
                              {skill}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tìm thấy {filteredJobs.length} việc làm</h1>
            <p className="text-gray-600">
              {searchQuery && `Kết quả cho "${searchQuery}"`}
              {location && location !== "all" && ` tại ${location}`}
            </p>
          </div>

          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="salary-high">Lương cao nhất</SelectItem>
              <SelectItem value="salary-low">Lương thấp nhất</SelectItem>
              <SelectItem value="relevant">Liên quan nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h2
                        className="text-xl font-semibold hover:text-emerald-600 transition-colors cursor-pointer"
                        onClick={() => handleApplyJob(job.id)}
                      >
                        {job.title}
                      </h2>
                      {job.featured && (
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          <Star className="w-3 h-3 mr-1" />
                          Nổi bật
                        </Badge>
                      )}
                      {job.urgent && <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Gấp</Badge>}
                    </div>

                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
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

                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-emerald-600 font-semibold">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                        <Badge variant="outline">{job.type}</Badge>
                        <span className="text-sm text-gray-500">{job.experience}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {job.views}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {job.applications} ứng tuyển
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 ml-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveJob(job.id)}
                      className={savedJobs.includes(job.id) ? "bg-red-50 text-red-600 border-red-200" : ""}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                      {savedJobs.includes(job.id) ? "Đã lưu" : "Lưu"}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-500 to-teal-500"
                      onClick={() => handleApplyJob(job.id)}
                    >
                      Ứng tuyển ngay
                    </Button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Phúc lợi:</span>
                    <div className="flex flex-wrap gap-1">
                      {job.benefits.map((benefit) => (
                        <Badge key={benefit} variant="outline" className="text-xs text-green-600 border-green-200">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Xem thêm việc làm
          </Button>
        </div>
      </div>
    </div>
  )
}
