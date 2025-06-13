"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  FileText,
  TrendingUp,
  Shield,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  UserCheck,
  Building,
  X,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Define TypeScript interfaces
interface User {
  id: number
  name: string
  email: string
  type: string
  registeredDate: string
  status: string
}

interface Content {
  id: number
  title: string
  type: string
  author: string
  submittedDate: string
  status: string
}

interface Activity {
  id: number
  action: string
  user: string
  timestamp: string
  type: string
}

interface ToastMessage {
  show: boolean
  message: string
  type: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [accountType, setAccountType] = useState("all")
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 1,
      name: "Công ty ABC",
      email: "hr@abc.com",
      type: "Nhà tuyển dụng",
      registeredDate: "2024-01-15",
      status: "Chờ duyệt",
    },
    {
      id: 2,
      name: "Nguyễn Văn X",
      email: "user@example.com",
      type: "Ứng viên",
      registeredDate: "2024-01-14",
      status: "Cần xác minh",
    },
  ])
  const [showUserDetailDialog, setShowUserDetailDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Công ty ABC",
      email: "hr@abc.com",
      type: "Nhà tuyển dụng",
      registeredDate: "2024-01-15",
      status: "Chờ duyệt",
    },
    {
      id: 2,
      name: "Nguyễn Văn X",
      email: "user@example.com",
      type: "Ứng viên",
      registeredDate: "2024-01-14",
      status: "Cần xác minh",
    },
    {
      id: 3,
      name: "Công ty XYZ",
      email: "contact@xyz.com",
      type: "Nhà tuyển dụng",
      registeredDate: "2024-01-10",
      status: "Đã duyệt",
    },
    {
      id: 4,
      name: "Trần Thị Y",
      email: "tranthy@example.com",
      type: "Ứng viên",
      registeredDate: "2024-01-08",
      status: "Đã xác minh",
    },
  ])
  const [toastMessage, setToastMessage] = useState({ show: false, message: "", type: "" })
  const [pendingContent, setPendingContent] = useState<Content[]>([
    {
      id: 1,
      title: "Senior Developer - Công ty XYZ",
      type: "Tin tuyển dụng",
      author: "HR Manager",
      submittedDate: "2024-01-16",
      status: "Chờ duyệt",
    },
    {
      id: 2,
      title: "Câu chuyện thành công của tôi",
      type: "Bài viết cộng đồng",
      author: "Nguyễn Văn A",
      submittedDate: "2024-01-15",
      status: "Cần kiểm tra",
    },
  ])
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [showContentDetailDialog, setShowContentDetailDialog] = useState(false)

  // Variables for user roles
  const [newRecruiterEmail, setNewRecruiterEmail] = useState("")
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [newAdminName, setNewAdminName] = useState("")

  // Add activities state
  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    {
      id: 1,
      action: "Người dùng mới đăng ký",
      user: "user123@email.com",
      timestamp: "5 phút trước",
      type: "user",
    },
    {
      id: 2,
      action: "Tin tuyển dụng được đăng",
      user: "TechCorp",
      timestamp: "15 phút trước",
      type: "job",
    },
    {
      id: 3,
      action: "Báo cáo nội dung vi phạm",
      user: "user456@email.com",
      timestamp: "1 giờ trước",
      type: "report",
    },
  ])

  useEffect(() => {
    console.log("Admin dashboard - checking auth...")

    // Check both old and new storage format
    const userRole = localStorage.getItem("userRole")
    const userData = localStorage.getItem("user")

    console.log("userRole:", userRole)
    console.log("userData:", userData)

    let isAdmin = false

    if (userRole === "admin") {
      isAdmin = true
      console.log("Admin access granted via userRole")
    } else if (userData) {
      try {
        const user = JSON.parse(userData)
        console.log("Parsed user data:", user)
        if (user.role === "admin") {
          isAdmin = true
          console.log("Admin access granted via user data")
        }
      } catch (e) {
        console.error("Error parsing user data:", e)
      }
    }

    if (!isAdmin) {
      console.log("Access denied - redirecting to login")
      router.push("/login")
      return
    }

    console.log("Admin access granted")
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    )
  }

  const systemStats = {
    totalUsers: 15420,
    totalJobs: 2340,
    totalCompanies: 890,
    monthlyGrowth: 12.5,
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
  }

  // Handle user search
  const handleSearch = () => {
    // Filter users based on search query and account type
    const filteredUsers = users.filter(user => {
      const matchesQuery = searchQuery === "" || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = accountType === "all" || user.type.toLowerCase().includes(accountType.toLowerCase())
      
      return matchesQuery && matchesType
    })
    
    // Update the users state with filtered results
    setUsers(filteredUsers)
    
    // Show toast message about search results
    setToastMessage({
      show: true,
      message: `Tìm thấy ${filteredUsers.length} người dùng phù hợp`,
      type: "info"
    })
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setToastMessage({ show: false, message: "", type: "" })
    }, 3000)
  }

  // Reset search filters
  const resetSearch = () => {
    setSearchQuery("")
    setAccountType("all")
    
    // Reset to original user list (would normally come from database)
    setUsers([
      {
        id: 1,
        name: "Công ty ABC",
        email: "hr@abc.com",
        type: "Nhà tuyển dụng",
        registeredDate: "2024-01-15",
        status: "Chờ duyệt",
      },
      {
        id: 2,
        name: "Nguyễn Văn X",
        email: "user@example.com",
        type: "Ứng viên",
        registeredDate: "2024-01-14",
        status: "Cần xác minh",
      },
      {
        id: 3,
        name: "Công ty XYZ",
        email: "contact@xyz.com",
        type: "Nhà tuyển dụng",
        registeredDate: "2024-01-10",
        status: "Đã duyệt",
      },
      {
        id: 4,
        name: "Trần Thị Y",
        email: "tranthy@example.com",
        type: "Ứng viên",
        registeredDate: "2024-01-08",
        status: "Đã xác minh",
      },
    ])
  }

  // Show user details
  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user)
    setShowUserDetailDialog(true)
  }

  // Approve user
  const handleApproveUser = (userId: number) => {
    // Update the user status in the users list
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { 
          ...user, 
          status: user.type === "Nhà tuyển dụng" ? "Đã duyệt" : "Đã xác minh"
        }
      }
      return user
    })
    setUsers(updatedUsers)
    
    // Update the pending users list by removing the approved user
    const updatedPendingUsers = pendingUsers.filter(user => user.id !== userId)
    setPendingUsers(updatedPendingUsers)
    
    // Show success message
    setToastMessage({
      show: true,
      message: "Đã duyệt người dùng thành công",
      type: "success"
    })
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setToastMessage({ show: false, message: "", type: "" })
    }, 3000)
  }

  // Reject user
  const handleRejectUser = (userId: number) => {
    // Update the user status in the users list
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, status: "Đã từ chối" }
      }
      return user
    })
    setUsers(updatedUsers)
    
    // Update the pending users list by removing the rejected user
    const updatedPendingUsers = pendingUsers.filter(user => user.id !== userId)
    setPendingUsers(updatedPendingUsers)
    
    // Show success message
    setToastMessage({
      show: true,
      message: "Đã từ chối người dùng",
      type: "error"
    })
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setToastMessage({ show: false, message: "", type: "" })
    }, 3000)
  }

  // Handle content view
  const handleViewContent = (content: Content) => {
    setSelectedContent(content)
    setShowContentDetailDialog(true)
  }
  
  // Approve content
  const handleApproveContent = (contentId: number) => {
    // Update content status
    const updatedContent = pendingContent.map(content => {
      if (content.id === contentId) {
        return { ...content, status: "Đã duyệt" }
      }
      return content
    })
    setPendingContent(updatedContent.filter(content => content.status !== "Đã duyệt"))
    
    // Close dialog if the approved content is currently being viewed
    if (selectedContent && selectedContent.id === contentId) {
      setShowContentDetailDialog(false)
    }
    
    // Show success message
    setToastMessage({
      show: true,
      message: "Đã duyệt nội dung thành công",
      type: "success"
    })
    
    setTimeout(() => {
      setToastMessage({ show: false, message: "", type: "" })
    }, 3000)
  }
  
  // Reject content
  const handleRejectContent = (contentId: number) => {
    // Update content status
    const updatedContent = pendingContent.map(content => {
      if (content.id === contentId) {
        return { ...content, status: "Đã từ chối" }
      }
      return content
    })
    setPendingContent(updatedContent.filter(content => content.status !== "Đã từ chối"))
    
    // Close dialog if the rejected content is currently being viewed
    if (selectedContent && selectedContent.id === contentId) {
      setShowContentDetailDialog(false)
    }
    
    // Show success message
    setToastMessage({
      show: true,
      message: "Đã từ chối nội dung",
      type: "error"
    })
    
    setTimeout(() => {
      setToastMessage({ show: false, message: "", type: "" })
    }, 3000)
  }

  // Grant recruiter permissions
  const handleGrantRecruiterRole = () => {
    if (!newRecruiterEmail) {
      setToastMessage({
        show: true,
        message: "Vui lòng nhập email người dùng",
        type: "error"
      })
      return
    }
    
    // In a real app, this would call an API to update the user's role
    
    // Show success message
    setToastMessage({
      show: true,
      message: `Đã cấp quyền nhà tuyển dụng cho ${newRecruiterEmail}`,
      type: "success"
    })
    
    // Reset input
    setNewRecruiterEmail("")
    
    setTimeout(() => {
      setToastMessage({ show: false, message: "", type: "" })
    }, 3000)
  }
  
  // Create sub-admin
  const handleCreateSubAdmin = () => {
    if (!newAdminEmail || !newAdminName) {
      setToastMessage({
        show: true,
        message: "Vui lòng nhập đầy đủ thông tin admin",
        type: "error"
      })
      return
    }
    
    // In a real app, this would call an API to create a new admin user
    
    // Show success message
    setToastMessage({
      show: true,
      message: `Đã tạo admin phụ ${newAdminName} (${newAdminEmail})`,
      type: "success"
    })
    
    // Reset inputs
    setNewAdminEmail("")
    setNewAdminName("")
    
    setTimeout(() => {
      setToastMessage({ show: false, message: "", type: "" })
    }, 3000)
  }

  // Function to load more activities
  const handleLoadMoreActivities = () => {
    // In a real app, this would fetch more activities from an API
    const newActivities = [
      {
        id: 4,
        action: "Ứng viên nộp hồ sơ",
        user: "candidate789@email.com",
        timestamp: "3 giờ trước",
        type: "user",
      },
      {
        id: 5,
        action: "Công ty cập nhật thông tin",
        user: "GlobalTech",
        timestamp: "4 giờ trước",
        type: "job",
      }
    ]
    
    setRecentActivities([...recentActivities, ...newActivities])
    
    // Show success message
    setToastMessage({
      show: true,
      message: "Đã tải thêm hoạt động gần đây",
      type: "info"
    })
    
    setTimeout(() => {
      setToastMessage({ show: false, message: "", type: "" })
    }, 3000)
  }
  
  // Function to clear all activities
  const handleClearActivities = () => {
    setRecentActivities([])
    
    // Show success message
    setToastMessage({
      show: true,
      message: "Đã xóa tất cả hoạt động gần đây",
      type: "info"
    })
    
    setTimeout(() => {
      setToastMessage({ show: false, message: "", type: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast message */}
      {toastMessage.show && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toastMessage.type === "success" 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : toastMessage.type === "error"
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-blue-50 text-blue-800 border border-blue-200"
          }`}>
            {toastMessage.message}
          </div>
        </div>
      )}

      {/* User Detail Dialog */}
      <Dialog open={showUserDetailDialog} onOpenChange={setShowUserDetailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết người dùng</DialogTitle>
            <button
              onClick={() => setShowUserDetailDialog(false)}
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full h-6 w-6 transition-colors hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Loại tài khoản</p>
                  <p className="font-medium">{selectedUser.type}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Ngày đăng ký</p>
                  <p className="font-medium">{selectedUser.registeredDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Trạng thái</p>
                  <Badge 
                    variant={
                      selectedUser.status === "Đã duyệt" || selectedUser.status === "Đã xác minh" 
                        ? "outline" 
                        : selectedUser.status === "Đã từ chối" 
                          ? "destructive" 
                          : "outline"
                    } 
                    className={
                      selectedUser.status === "Đã duyệt" || selectedUser.status === "Đã xác minh"
                        ? "text-green-600 border-green-600" 
                        : selectedUser.status === "Chờ duyệt" || selectedUser.status === "Cần xác minh" 
                          ? "text-yellow-600 border-yellow-600"
                          : ""
                    }
                  >
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-2">Thông tin bổ sung</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedUser.type === "Nhà tuyển dụng" 
                    ? "Thông tin về công ty đang chờ xác minh. Vui lòng kiểm tra kỹ thông tin dưới đây trước khi phê duyệt."
                    : "Thông tin về ứng viên đang chờ xác minh. Vui lòng kiểm tra kỹ thông tin dưới đây trước khi phê duyệt."
                  }
                </p>
              </div>
              
              {/* User action buttons */}
              <div className="flex space-x-2 mt-4 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowUserDetailDialog(false)}
                >
                  Đóng
                </Button>
                {(selectedUser.status === "Chờ duyệt" || selectedUser.status === "Cần xác minh") && (
                  <>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveUser(selectedUser.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Duyệt
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleRejectUser(selectedUser.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Từ chối
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Content Detail Dialog */}
      <Dialog open={showContentDetailDialog} onOpenChange={setShowContentDetailDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Chi tiết nội dung</DialogTitle>
            <button
              onClick={() => setShowContentDetailDialog(false)}
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full h-6 w-6 transition-colors hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          
          {selectedContent && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{selectedContent.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Loại nội dung</p>
                  <p className="font-medium">{selectedContent.type}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Tác giả</p>
                  <p className="font-medium">{selectedContent.author}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Ngày gửi</p>
                  <p className="font-medium">{selectedContent.submittedDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Trạng thái</p>
                  <Badge 
                    variant={
                      selectedContent.status === "Đã duyệt" 
                        ? "outline" 
                        : selectedContent.status === "Đã từ chối" 
                          ? "destructive" 
                          : "outline"
                    } 
                    className={
                      selectedContent.status === "Đã duyệt"
                        ? "text-green-600 border-green-600" 
                        : selectedContent.status === "Chờ duyệt" || selectedContent.status === "Cần kiểm tra" 
                          ? "text-yellow-600 border-yellow-600"
                          : ""
                    }
                  >
                    {selectedContent.status}
                  </Badge>
                </div>
              </div>
              
              <div className="border p-3 rounded-md">
                <p className="text-sm text-gray-600 mb-2">
                  {selectedContent.type === "Tin tuyển dụng" 
                    ? "Nội dung tin tuyển dụng đang chờ xét duyệt. Nội dung phải tuân thủ quy định về đăng tin và không chứa thông tin sai lệch."
                    : "Bài viết cộng đồng đang chờ xét duyệt. Nội dung phải phù hợp với tiêu chuẩn cộng đồng và không vi phạm điều khoản sử dụng."
                  }
                </p>
              </div>
              
              {/* Content action buttons */}
              <div className="flex space-x-2 mt-4 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowContentDetailDialog(false)}
                >
                  Đóng
                </Button>
                {(selectedContent.status === "Chờ duyệt" || selectedContent.status === "Cần kiểm tra") && (
                  <>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveContent(selectedContent.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Phê duyệt
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleRejectContent(selectedContent.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Từ chối
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Quản trị hệ thống</h1>
              <p className="text-sm text-gray-600">JobFind Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Cài đặt
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
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
                  <p className="text-sm text-gray-600">Tổng người dùng</p>
                  <p className="text-2xl font-bold text-blue-600">{systemStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Việc làm</p>
                  <p className="text-2xl font-bold text-emerald-600">{systemStats.totalJobs.toLocaleString()}</p>
                </div>
                <FileText className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Công ty</p>
                  <p className="text-2xl font-bold text-purple-600">{systemStats.totalCompanies}</p>
                </div>
                <Building className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tăng trưởng tháng</p>
                  <p className="text-2xl font-bold text-orange-600">+{systemStats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">Quản lý người dùng</TabsTrigger>
            <TabsTrigger value="content">Duyệt nội dung</TabsTrigger>
            <TabsTrigger value="permissions">Phân quyền</TabsTrigger>
            <TabsTrigger value="analytics">Thống kê</TabsTrigger>
            <TabsTrigger value="activities">Hoạt động</TabsTrigger>
          </TabsList>

          {/* Users Management Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* Search Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Tìm kiếm người dùng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Input 
                    placeholder="Email, tên người dùng..." 
                    className="md:col-span-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select 
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    <option value="all">Tất cả loại tài khoản</option>
                    <option value="Ứng viên">Ứng viên</option>
                    <option value="Nhà tuyển dụng">Nhà tuyển dụng</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <div className="flex space-x-2">
                    <Button 
                      className="bg-gradient-to-r from-red-500 to-pink-500 flex-grow"
                      onClick={handleSearch}
                    >
                      <Search className="w-4 h-4 mr-1" />
                      Tìm kiếm
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-3"
                      onClick={resetSearch}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                      </svg>
                      Đặt lại
                    </Button>
                  </div>
                </div>
                
                {/* Search Results */}
                {searchQuery && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Kết quả tìm kiếm ({users.length})</h3>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{user.name}</h3>
                              <p className="text-gray-600">{user.email}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                <span>Loại: {user.type}</span>
                                <span>Đăng ký: {user.registeredDate}</span>
                              </div>
                            </div>
                            <Badge 
                              variant={
                                user.status === "Đã duyệt" || user.status === "Đã xác minh" 
                                  ? "outline" 
                                  : user.status === "Đã từ chối" 
                                    ? "destructive" 
                                    : "outline"
                              } 
                              className={
                                user.status === "Đã duyệt" || user.status === "Đã xác minh"
                                  ? "text-green-600 border-green-600" 
                                  : user.status === "Chờ duyệt" || user.status === "Cần xác minh" 
                                    ? "text-yellow-600 border-yellow-600"
                                    : ""
                              }
                            >
                              {user.status}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewUserDetails(user)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Xem chi tiết
                            </Button>
                            {(user.status === "Chờ duyệt" || user.status === "Cần xác minh") && (
                              <>
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApproveUser(user.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Duyệt
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleRejectUser(user.id)}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Từ chối
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Tài khoản chờ duyệt</span>
                  <Badge variant="destructive">{pendingUsers.length}</Badge>
                </CardTitle>
                <CardDescription>Duyệt tài khoản nhà tuyển dụng và xác minh người dùng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>Loại: {user.type}</span>
                            <span>Đăng ký: {user.registeredDate}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          {user.status}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewUserDetails(user)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Xem chi tiết
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveUser(user.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Duyệt
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectUser(user.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Từ chối
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Moderation Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Nội dung chờ duyệt</span>
                  <Badge variant="destructive">{pendingContent.length}</Badge>
                </CardTitle>
                <CardDescription>Kiểm duyệt tin tuyển dụng và nội dung cộng đồng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingContent.map((content) => (
                    <div key={content.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{content.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>Loại: {content.type}</span>
                            <span>Tác giả: {content.author}</span>
                            <span>Gửi: {content.submittedDate}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          {content.status}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewContent(content)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Xem nội dung
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveContent(content.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Phê duyệt
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectContent(content.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Từ chối
                        </Button>
                      </div>
                    </div>
                  ))}

                  {pendingContent.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                      <p>Không có nội dung nào chờ duyệt</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cấp quyền nhà tuyển dụng</CardTitle>
                  <CardDescription>Cấp quyền đăng tin tuyển dụng cho doanh nghiệp</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Email người dùng" 
                      value={newRecruiterEmail}
                      onChange={(e) => setNewRecruiterEmail(e.target.value)}
                    />
                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      onClick={handleGrantRecruiterRole}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Cấp quyền nhà tuyển dụng
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tạo Admin phụ</CardTitle>
                  <CardDescription>Tạo tài khoản admin để hỗ trợ quản lý</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Email admin mới"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                    />
                    <Input 
                      placeholder="Tên hiển thị"
                      value={newAdminName}
                      onChange={(e) => setNewAdminName(e.target.value)}
                    />
                    <Button 
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500"
                      onClick={handleCreateSubAdmin}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Tạo Admin phụ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thống kê người dùng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Ứng viên</span>
                      <span className="font-semibold">12,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Nhà tuyển dụng</span>
                      <span className="font-semibold">890</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Admin</span>
                      <span className="font-semibold">15</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tài khoản bị khóa</span>
                      <span className="font-semibold text-red-600">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hoạt động hệ thống</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Đăng ký mới (hôm nay)</span>
                      <span className="font-semibold text-green-600">+45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tin tuyển dụng mới</span>
                      <span className="font-semibold text-blue-600">+12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ứng tuyển thành công</span>
                      <span className="font-semibold text-purple-600">89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Báo cáo vi phạm</span>
                      <span className="font-semibold text-orange-600">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Hoạt động gần đây</CardTitle>
                  <CardDescription>Theo dõi các hoạt động quan trọng trên hệ thống</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLoadMoreActivities}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    Tải thêm
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 border-red-200"
                    onClick={handleClearActivities}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                    Xóa tất cả
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === "user"
                              ? "bg-blue-100"
                              : activity.type === "job"
                                ? "bg-green-100"
                                : "bg-red-100"
                          }`}
                        >
                          {activity.type === "user" && <Users className="w-4 h-4 text-blue-600" />}
                          {activity.type === "job" && <FileText className="w-4 h-4 text-green-600" />}
                          {activity.type === "report" && <AlertTriangle className="w-4 h-4 text-red-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.user}</p>
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 text-gray-300">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                      <p className="text-lg mb-1">Không có hoạt động nào</p>
                      <p className="text-sm">Các hoạt động sẽ xuất hiện ở đây khi người dùng tương tác với hệ thống</p>
                      <Button onClick={handleLoadMoreActivities} className="mt-4">
                        Tải hoạt động
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
