"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Building, Users, Star, Eye, Briefcase, Heart, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CompaniesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [followedCompanies, setFollowedCompanies] = useState<number[]>([])

  const companies = [
    {
      id: 1,
      name: "TechCorp Vietnam",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Công nghệ thông tin",
      size: "100-500 nhân viên",
      location: "Hà Nội",
      description: "Công ty công nghệ hàng đầu chuyên phát triển giải pháp phần mềm cho doanh nghiệp",
      openJobs: 12,
      rating: 4.5,
      reviews: 89,
      benefits: ["Bảo hiểm sức khỏe", "Thưởng hiệu suất", "Làm việc từ xa"],
      featured: true,
      website: "https://techcorp.vn",
    },
    {
      id: 2,
      name: "DesignStudio",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Thiết kế & Sáng tạo",
      size: "50-100 nhân viên",
      location: "TP.HCM",
      description: "Studio thiết kế chuyên nghiệp với đội ngũ designer tài năng",
      openJobs: 8,
      rating: 4.3,
      reviews: 45,
      benefits: ["Flexible time", "Creative workspace", "Training budget"],
      featured: false,
      website: "https://designstudio.vn",
    },
    {
      id: 3,
      name: "StartupXYZ",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "E-commerce",
      size: "10-50 nhân viên",
      location: "Đà Nẵng",
      description: "Startup công nghệ năng động trong lĩnh vực thương mại điện tử",
      openJobs: 15,
      rating: 4.7,
      reviews: 23,
      benefits: ["Stock options", "Free lunch", "Gym membership"],
      featured: true,
      website: "https://startupxyz.com",
    },
    {
      id: 4,
      name: "Marketing Pro",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Marketing & Quảng cáo",
      size: "200-500 nhân viên",
      location: "Hà Nội",
      description: "Công ty marketing hàng đầu với nhiều năm kinh nghiệm",
      openJobs: 6,
      rating: 4.2,
      reviews: 156,
      benefits: ["Performance bonus", "Travel opportunities", "Training"],
      featured: false,
      website: "https://marketingpro.vn",
    },
  ]

  const industries = [
    "Công nghệ thông tin",
    "Thiết kế & Sáng tạo",
    "Marketing & Quảng cáo",
    "E-commerce",
    "Tài chính & Ngân hàng",
    "Giáo dục",
    "Y tế",
  ]

  const companySizes = ["1-10 nhân viên", "10-50 nhân viên", "50-100 nhân viên", "100-500 nhân viên", "500+ nhân viên"]

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = !selectedIndustry || selectedIndustry === "all" || company.industry === selectedIndustry
    const matchesSize = !selectedSize || selectedSize === "all" || company.size === selectedSize

    return matchesSearch && matchesIndustry && matchesSize
  })

  const handleFollowCompany = (companyId: number) => {
    const newFollowed = followedCompanies.includes(companyId)
      ? followedCompanies.filter((id) => id !== companyId)
      : [...followedCompanies, companyId]

    setFollowedCompanies(newFollowed)

    const action = followedCompanies.includes(companyId) ? "bỏ theo dõi" : "theo dõi"
    alert(`Đã ${action} công ty!`)
  }

  const handleViewCompany = (companyId: number) => {
    router.push(`/companies/${companyId}`)
  }

  const handleViewJobs = (companyId: number) => {
    router.push(`/companies/${companyId}/jobs`)
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
            <Link href="/jobs" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Tìm việc làm
            </Link>
            <Link href="/companies" className="text-emerald-600 font-medium">
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
        {/* Search & Filter Section */}
        <div className="mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Tìm công ty theo tên, mô tả..."
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Ngành nghề" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả ngành nghề</SelectItem>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Quy mô" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả quy mô</SelectItem>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500">Ngành nghề phổ biến:</span>
                  {["IT", "Marketing", "Design", "E-commerce"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-emerald-100"
                      onClick={() => setSelectedIndustry(industries.find((i) => i.includes(tag)) || "")}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tìm thấy {filteredCompanies.length} công ty</h1>
            <p className="text-gray-600">Khám phá các công ty hàng đầu tại Việt Nam</p>
          </div>

          <Select defaultValue="featured">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Nổi bật</SelectItem>
              <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
              <SelectItem value="jobs">Nhiều việc làm nhất</SelectItem>
              <SelectItem value="name">Tên A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Company Listings */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="w-16 h-16 rounded-lg object-cover border cursor-pointer"
                    onClick={() => handleViewCompany(company.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h2
                        className="text-xl font-semibold hover:text-emerald-600 transition-colors cursor-pointer"
                        onClick={() => handleViewCompany(company.id)}
                      >
                        {company.name}
                      </h2>
                      {company.featured && (
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          <Star className="w-3 h-3 mr-1" />
                          Nổi bật
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-gray-600 text-sm mb-2">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {company.industry}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {company.size}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {company.location}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{company.rating}</span>
                        <span className="text-gray-500 ml-1">({company.reviews} đánh giá)</span>
                      </div>
                      <div className="flex items-center text-emerald-600 font-medium">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {company.openJobs} việc làm
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFollowCompany(company.id)}
                      className={
                        followedCompanies.includes(company.id)
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : ""
                      }
                    >
                      <Heart
                        className={`w-4 h-4 mr-1 ${followedCompanies.includes(company.id) ? "fill-current" : ""}`}
                      />
                      {followedCompanies.includes(company.id) ? "Đang theo dõi" : "Theo dõi"}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={company.website} target="_blank">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Website
                      </Link>
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{company.description}</p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Phúc lợi nổi bật:</h4>
                    <div className="flex flex-wrap gap-1">
                      {company.benefits.map((benefit) => (
                        <Badge key={benefit} variant="outline" className="text-xs text-green-600 border-green-200">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <Button variant="outline" size="sm" onClick={() => handleViewCompany(company.id)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Xem chi tiết
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-500 to-teal-500"
                      onClick={() => handleViewJobs(company.id)}
                    >
                      Xem việc làm ({company.openJobs})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Xem thêm công ty
          </Button>
        </div>
      </div>
    </div>
  )
}
