"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Clock, Users, Star, BookOpen, Award, Search, Filter, Bell } from "lucide-react"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([1, 3])
  const [notifications, setNotifications] = useState<number[]>([])

  const categories = [
    { id: "all", name: "Tất cả", count: 156 },
    { id: "programming", name: "Lập trình", count: 45 },
    { id: "design", name: "Thiết kế", count: 32 },
    { id: "marketing", name: "Marketing", count: 28 },
    { id: "business", name: "Kinh doanh", count: 25 },
    { id: "data", name: "Data Science", count: 26 },
  ]

  const courses = [
    {
      id: 1,
      title: "React.js từ cơ bản đến nâng cao",
      instructor: "Nguyễn Văn A",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      description:
        "Học React.js từ những kiến thức cơ bản nhất đến các kỹ thuật nâng cao. Khóa học bao gồm hooks, context, routing và nhiều hơn nữa.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "12 giờ",
      students: 1234,
      rating: 4.8,
      reviews: 156,
      price: "Miễn phí",
      level: "Trung cấp",
      category: "programming",
      progress: 65,
      tags: ["React", "JavaScript", "Frontend"],
      lessons: 24,
      certificate: true,
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Trần Thị B",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      description: "Nắm vững các nguyên tắc cơ bản của UI/UX Design. Từ research, wireframe đến prototype và testing.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "8 giờ",
      students: 892,
      rating: 4.9,
      reviews: 89,
      price: "499,000đ",
      level: "Cơ bản",
      category: "design",
      tags: ["UI", "UX", "Figma", "Design Thinking"],
      lessons: 16,
      certificate: true,
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      instructor: "Lê Văn C",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      description:
        "Xây dựng chiến lược marketing số hiệu quả. Học cách sử dụng các công cụ và kênh marketing hiện đại.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "10 giờ",
      students: 567,
      rating: 4.7,
      reviews: 67,
      price: "799,000đ",
      level: "Nâng cao",
      category: "marketing",
      progress: 30,
      tags: ["SEO", "SEM", "Social Media", "Analytics"],
      lessons: 20,
      certificate: true,
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Phạm Thị D",
      instructorAvatar: "/placeholder.svg?height=40&width=40",
      description: "Học Python để phân tích dữ liệu và machine learning. Từ pandas, numpy đến scikit-learn.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "15 giờ",
      students: 743,
      rating: 4.6,
      reviews: 94,
      price: "999,000đ",
      level: "Trung cấp",
      category: "data",
      tags: ["Python", "Data Analysis", "Machine Learning"],
      lessons: 30,
      certificate: true,
    },
  ]

  const handleEnroll = (courseId: number) => {
    if (enrolledCourses.includes(courseId)) {
      alert("Bạn đã đăng ký khóa học này!")
    } else {
      setEnrolledCourses((prev) => [...prev, courseId])
      alert("Đăng ký khóa học thành công!")
    }
  }

  const handleContinue = (courseId: number) => {
    alert("Tiếp tục học khóa học...")
  }

  const handleNotification = (courseId: number) => {
    if (notifications.includes(courseId)) {
      setNotifications((prev) => prev.filter((id) => id !== courseId))
      alert("Đã tắt thông báo cho khóa học này")
    } else {
      setNotifications((prev) => [...prev, courseId])
      alert("Đã bật thông báo cho khóa học này")
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Khóa học</h1>
          <p className="text-gray-600">Nâng cao kỹ năng với các khóa học chất lượng cao</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm khóa học, giảng viên, kỹ năng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.name}
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* My Learning Progress */}
        {enrolledCourses.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Khóa học của tôi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses
                  .filter((course) => enrolledCourses.includes(course.id))
                  .map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{course.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={course.progress || 0} className="flex-1" />
                          <span className="text-xs text-gray-600">{course.progress || 0}%</span>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleContinue(course.id)} className="flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        Tiếp tục
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                {course.price === "Miễn phí" && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-green-500">Miễn phí</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNotification(course.id)}
                    className={notifications.includes(course.id) ? "text-blue-500" : ""}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={course.instructorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{course.instructor}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">{course.price}</span>
                    {course.certificate && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <Award className="h-3 w-3" />
                        Có chứng chỉ
                      </div>
                    )}
                  </div>

                  {enrolledCourses.includes(course.id) ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContinue(course.id)}
                        className="flex items-center gap-1"
                      >
                        <Play className="h-3 w-3" />
                        Tiếp tục
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleEnroll(course.id)} className="flex items-center gap-1">
                      Bắt đầu
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Không tìm thấy khóa học nào</h3>
            <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  )
}
