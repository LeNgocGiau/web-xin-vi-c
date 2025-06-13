"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  TrendingUp,
  Star,
  Play,
  BookOpen,
  MessageCircle,
  User,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedJobType, setSelectedJobType] = useState("")

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

  const jobTypes = ["Full-time", "Part-time", "Remote", "Hybrid", "Freelance", "Internship"]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedLocation) params.set("location", selectedLocation)
    if (selectedJobType) params.set("type", selectedJobType)

    router.push(`/jobs?${params.toString()}`)
  }

  const handleJobClick = (jobId: number) => {
    router.push(`/jobs/${jobId}`)
  }

  const handleCompanyClick = (companyId: number) => {
    router.push(`/companies/${companyId}`)
  }

  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      companyId: 1,
      location: "Hà Nội",
      salary: "15-25 triệu",
      type: "Full-time",
      tags: ["React", "TypeScript", "Next.js"],
      urgent: true,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignStudio",
      companyId: 2,
      location: "TP.HCM",
      salary: "12-20 triệu",
      type: "Remote",
      tags: ["Figma", "Adobe XD", "Prototyping"],
    },
    {
      id: 3,
      title: "Marketing Manager",
      company: "StartupXYZ",
      companyId: 3,
      location: "Đà Nẵng",
      salary: "18-30 triệu",
      type: "Hybrid",
      tags: ["Digital Marketing", "SEO", "Analytics"],
    },
  ]

  const successStories = [
    {
      name: "Nguyễn Văn A",
      story: "Từ phục vụ quán cà phê sang làm văn phòng",
      days: 7,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Trần Thị B",
      story: "Chuyển ngành từ kế toán sang IT",
      days: 14,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">JobFind</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/jobs" className="text-gray-600 hover:text-emerald-600 transition-colors">
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
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Xin chào, {user.name}</span>
                {user.role === "candidate" && (
                  <Button variant="ghost" asChild>
                    <Link href="/dashboard/candidate">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Đăng nhập</Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  asChild
                >
                  <Link href="/login">Đăng ký</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Tìm việc làm
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"> mơ ước</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Nền tảng tìm việc thông minh với AI hỗ trợ tạo CV, video giới thiệu và kết nối cộng đồng
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="p-6 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Vị trí, công ty, kỹ năng..."
                    className="pl-10 h-12 border-gray-200 focus:border-emerald-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="pl-10 h-12 border-gray-200 focus:border-emerald-500">
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
                  <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-emerald-500">
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
                <Button
                  className="h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  onClick={handleSearch}
                >
                  Tìm kiếm
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-gray-500">Từ khóa phổ biến:</span>
                {["Frontend", "Marketing", "Designer", "Remote", "Part-time"].map((tag) => (
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
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">10K+</div>
              <div className="text-gray-600">Việc làm</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">5K+</div>
              <div className="text-gray-600">Công ty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">50K+</div>
              <div className="text-gray-600">Ứng viên</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">95%</div>
              <div className="text-gray-600">Thành công</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Việc làm nổi bật</h2>
            <Button variant="outline" asChild>
              <Link href="/jobs">Xem tất cả</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleJobClick(job.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="group-hover:text-emerald-600 transition-colors">{job.title}</CardTitle>
                      <CardDescription
                        className="text-lg font-medium text-gray-700 cursor-pointer hover:text-emerald-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCompanyClick(job.companyId)
                        }}
                      >
                        {job.company}
                      </CardDescription>
                    </div>
                    {job.urgent && <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Gấp</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-600">{job.salary}</span>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tính năng AI thông minh</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sử dụng trí tuệ nhân tạo để tối ưu hóa quá trình tìm việc và tuyển dụng
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Tạo CV Thông Minh</h3>
              <p className="text-gray-600 mb-4">
                Nhập mô tả công việc, AI sẽ tạo CV phù hợp với nhiều phong cách khác nhau
              </p>
              <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50" asChild>
                <Link href="/cv-builder">Thử ngay</Link>
              </Button>
            </Card>

            <Card className="text-center p-6 border-2 border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Giới Thiệu</h3>
              <p className="text-gray-600 mb-4">
                Quay video 30s giới thiệu bản thân để gây ấn tượng với nhà tuyển dụng
              </p>
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                onClick={() => alert("Tính năng đang phát triển!")}
              >
                Tạo video
              </Button>
            </Card>

            <Card className="text-center p-6 border-2 border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ứng Tuyển Thông Minh</h3>
              <p className="text-gray-600 mb-4">Gửi hồ sơ đến 5-10 công việc phù hợp nhất chỉ với 1 cú click</p>
              <Button
                variant="outline"
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                onClick={() => {
                  if (user) {
                    alert("Đang tìm kiếm các công việc phù hợp với hồ sơ của bạn...")
                  } else {
                    router.push("/login")
                  }
                }}
              >
                Khám phá
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Câu chuyện thành công</h2>
            <p className="text-gray-600">Những người đã thay đổi cuộc đời nhờ JobFind</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <img
                    src={story.avatar || "/placeholder.svg"}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold">{story.name}</h4>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Được nhận việc sau {story.days} ngày
                      </Badge>
                    </div>
                    <p className="text-gray-600 italic">"{story.story}"</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              <Link href="/community">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chia sẻ câu chuyện của bạn
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Phát triển kỹ năng cùng JobFind</h2>
              <p className="text-gray-600 mb-6">
                Học các khóa học mini được AI gợi ý dựa trên công việc bạn muốn ứng tuyển. Hoàn thành khóa học để mở
                khóa quyền ứng tuyển vào những vị trí mơ ước.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span>Khóa học được cá nhân hóa theo JD</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span>Hệ thống Mentor - Buddy hỗ trợ</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span>Chứng chỉ kỹ năng được xác thực</span>
                </div>
              </div>
              <Button
                className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                asChild
              >
                <Link href="/courses">Khám phá khóa học</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                  <p className="text-gray-600">Hình ảnh minh họa khóa học</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">JobFind</span>
              </div>
              <p className="text-gray-400">Nền tảng tìm việc thông minh hàng đầu Việt Nam</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Dành cho ứng viên</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/jobs" className="hover:text-white transition-colors">
                    Tìm việc làm
                  </Link>
                </li>
                <li>
                  <Link href="/cv-builder" className="hover:text-white transition-colors">
                    Tạo CV
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Khóa học
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Cộng đồng
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Dành cho nhà tuyển dụng</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/post-job" className="hover:text-white transition-colors">
                    Đăng tin tuyển dụng
                  </Link>
                </li>
                <li>
                  <Link href="/search-candidates" className="hover:text-white transition-colors">
                    Tìm ứng viên
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Bảng giá
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Điều khoản sử dụng
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobFind. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
