"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Briefcase, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ValidationErrors {
  [key: string]: string
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [loginErrors, setLoginErrors] = useState<ValidationErrors>({})

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate" as "candidate" | "recruiter",
  })
  const [registerErrors, setRegisterErrors] = useState<ValidationErrors>({})

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const calculatePasswordStrength = (password: string) => {
    let score = 0
    let label = "Rất yếu"
    let color = "bg-red-500"

    if (password.length >= 8) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    switch (score) {
      case 0:
      case 1:
        label = "Rất yếu"
        color = "bg-red-500"
        break
      case 2:
        label = "Yếu"
        color = "bg-orange-500"
        break
      case 3:
        label = "Trung bình"
        color = "bg-yellow-500"
        break
      case 4:
        label = "Mạnh"
        color = "bg-blue-500"
        break
      case 5:
        label = "Rất mạnh"
        color = "bg-green-500"
        break
    }

    setPasswordStrength({ score, label, color })
  }

  const validateLogin = (): boolean => {
    const errors: ValidationErrors = {}

    // Special case for admin
    if (loginData.email === "admin") {
      if (!loginData.password) {
        errors.password = "Vui lòng nhập mật khẩu"
      }
    } else {
      if (!loginData.email) {
        errors.email = "Vui lòng nhập email"
      } else if (!validateEmail(loginData.email)) {
        errors.email = "Email không hợp lệ"
      }

      if (!loginData.password) {
        errors.password = "Vui lòng nhập mật khẩu"
      }
    }

    setLoginErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateRegister = (): boolean => {
    const errors: ValidationErrors = {}

    if (!registerData.name.trim()) {
      errors.name = "Vui lòng nhập họ tên"
    } else if (registerData.name.trim().length < 2) {
      errors.name = "Họ tên phải có ít nhất 2 ký tự"
    }

    if (!registerData.email) {
      errors.email = "Vui lòng nhập email"
    } else if (!validateEmail(registerData.email)) {
      errors.email = "Email không hợp lệ"
    }

    if (!registerData.password) {
      errors.password = "Vui lòng nhập mật khẩu"
    } else if (registerData.password.length < 6) {
      errors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (!registerData.confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu"
    } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    setRegisterErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLogin = async () => {
    if (!validateLogin()) return

    setIsLoading(true)
    setAlert(null)

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", loginData.email, loginData.password)

      // Check for admin credentials first
      if (loginData.email === "admin" && loginData.password === "admin") {
        console.log("Admin login successful")

        // Clear any existing data
        localStorage.clear()

        // Store admin info in both formats for compatibility
        localStorage.setItem("userRole", "admin")
        localStorage.setItem("userName", "Administrator")
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "Administrator",
            email: "admin",
            role: "admin",
          }),
        )

        setAlert({ type: "success", message: "Đăng nhập Admin thành công!" })

        setTimeout(() => {
          router.push("/dashboard/admin")
        }, 1000)
        setIsLoading(false)
        return
      }

      // Define demo accounts
      const demoAccounts = [
        { email: "hr@company.com", password: "123456", role: "recruiter", name: "HR Manager" },
        { email: "recruiter@demo.com", password: "demo123", role: "recruiter", name: "Nhà tuyển dụng Demo" },
        { email: "user@example.com", password: "123456", role: "candidate", name: "Ứng viên Demo" },
        { email: "candidate@demo.com", password: "demo123", role: "candidate", name: "Ứng viên Demo" },
      ]

      // Check demo accounts
      const account = demoAccounts.find((acc) => acc.email === loginData.email && acc.password === loginData.password)

      if (account) {
        console.log("Demo account login successful:", account)

        // Clear any existing data
        localStorage.clear()

        // Store user info in both formats for compatibility
        localStorage.setItem("userRole", account.role)
        localStorage.setItem("userName", account.name)
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: account.name,
            email: account.email,
            role: account.role,
          }),
        )

        setAlert({
          type: "success",
          message: `Đăng nhập ${account.role === "recruiter" ? "Nhà tuyển dụng" : "Ứng viên"} thành công!`,
        })

        setTimeout(() => {
          if (account.role === "recruiter") {
            router.push("/dashboard/recruiter")
          } else {
            router.push("/") // Candidates go to homepage
          }
        }, 1000)
      } else {
        console.log("Login failed - no matching account")
        setAlert({ type: "error", message: "Email hoặc mật khẩu không đúng!" })
      }

      setIsLoading(false)
    }, 1000) // Reduced delay for better UX
  }

  const handleRegister = async () => {
    if (!validateRegister()) return

    setIsLoading(true)
    setAlert(null)

    // Simulate API call
    setTimeout(() => {
      // Clear any existing data
      localStorage.clear()

      // Store user info
      localStorage.setItem("userRole", registerData.role)
      localStorage.setItem("userName", registerData.name)
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          role: registerData.role,
        }),
      )

      setAlert({ type: "success", message: "Đăng ký thành công!" })

      // Redirect based on role
      setTimeout(() => {
        if (registerData.role === "recruiter") {
          router.push("/dashboard/recruiter")
        } else {
          router.push("/") // Candidates go to homepage
        }
      }, 1000)

      setIsLoading(false)
    }, 1500)
  }

  const handleDemoLogin = (email: string, password: string, role: string, name: string) => {
    console.log("Demo login clicked:", email, password, role, name)

    // Clear any existing data
    localStorage.clear()

    // Store user info in both formats
    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", name)
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: name,
        email: email,
        role: role,
      }),
    )

    // Redirect based on role
    if (role === "admin") {
      router.push("/dashboard/admin")
    } else if (role === "recruiter") {
      router.push("/dashboard/recruiter")
    } else {
      router.push("/") // Candidates go to homepage
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">JobFind</span>
          </Link>
          <p className="text-gray-600">Chào mừng bạn quay trở lại</p>
        </div>

        {/* Alert */}
        {alert && (
          <Alert
            className={`mb-6 ${alert.type === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
          >
            {alert.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={alert.type === "success" ? "text-green-700" : "text-red-700"}>
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-xl border-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Đăng nhập</TabsTrigger>
              <TabsTrigger value="register">Đăng ký</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Đăng nhập</CardTitle>
                <CardDescription>Nhập thông tin để truy cập tài khoản</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email hoặc Username</Label>
                  <Input
                    id="login-email"
                    type="text"
                    placeholder="your@email.com hoặc admin"
                    value={loginData.email}
                    onChange={(e) => {
                      setLoginData({ ...loginData, email: e.target.value })
                      if (loginErrors.email) {
                        setLoginErrors({ ...loginErrors, email: "" })
                      }
                    }}
                    className={loginErrors.email ? "border-red-500" : ""}
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {loginErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={loginData.password}
                      onChange={(e) => {
                        setLoginData({ ...loginData, password: e.target.value })
                        if (loginErrors.password) {
                          setLoginErrors({ ...loginErrors, password: "" })
                        }
                      }}
                      className={loginErrors.password ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {loginErrors.password}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>

                <div className="text-center">
                  <Link href="/forgot-password" className="text-sm text-emerald-600 hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
              </CardContent>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Đăng ký</CardTitle>
                <CardDescription>Tạo tài khoản mới để bắt đầu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Họ và tên</Label>
                  <Input
                    id="register-name"
                    placeholder="Nguyễn Văn A"
                    value={registerData.name}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, name: e.target.value })
                      if (registerErrors.name) {
                        setRegisterErrors({ ...registerErrors, name: "" })
                      }
                    }}
                    className={registerErrors.name ? "border-red-500" : ""}
                  />
                  {registerErrors.name && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {registerErrors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    value={registerData.email}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, email: e.target.value })
                      if (registerErrors.email) {
                        setRegisterErrors({ ...registerErrors, email: "" })
                      }
                    }}
                    className={registerErrors.email ? "border-red-500" : ""}
                  />
                  {registerErrors.email && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {registerErrors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Tối thiểu 6 ký tự"
                      value={registerData.password}
                      onChange={(e) => {
                        setRegisterData({ ...registerData, password: e.target.value })
                        calculatePasswordStrength(e.target.value)
                        if (registerErrors.password) {
                          setRegisterErrors({ ...registerErrors, password: "" })
                        }
                      }}
                      className={registerErrors.password ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Password Strength Indicator */}
                  {registerData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{passwordStrength.label}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        <p>Mật khẩu mạnh cần có:</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                          <li className={registerData.password.length >= 8 ? "text-green-600" : ""}>Ít nhất 8 ký tự</li>
                          <li className={/[a-z]/.test(registerData.password) ? "text-green-600" : ""}>Chữ thường</li>
                          <li className={/[A-Z]/.test(registerData.password) ? "text-green-600" : ""}>Chữ hoa</li>
                          <li className={/[0-9]/.test(registerData.password) ? "text-green-600" : ""}>Số</li>
                          <li className={/[^A-Za-z0-9]/.test(registerData.password) ? "text-green-600" : ""}>
                            Ký tự đặc biệt
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {registerErrors.password && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {registerErrors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Xác nhận mật khẩu</Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    value={registerData.confirmPassword}
                    onChange={(e) => {
                      setRegisterData({ ...registerData, confirmPassword: e.target.value })
                      if (registerErrors.confirmPassword) {
                        setRegisterErrors({ ...registerErrors, confirmPassword: "" })
                      }
                    }}
                    className={registerErrors.confirmPassword ? "border-red-500" : ""}
                  />
                  {registerErrors.confirmPassword && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {registerErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Bạn là:</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="candidate"
                        checked={registerData.role === "candidate"}
                        onChange={(e) => setRegisterData({ ...registerData, role: e.target.value as "candidate" })}
                        className="text-emerald-600"
                      />
                      <span>Ứng viên</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={registerData.role === "recruiter"}
                        onChange={(e) => setRegisterData({ ...registerData, role: e.target.value as "recruiter" })}
                        className="text-emerald-600"
                      />
                      <span>Nhà tuyển dụng</span>
                    </label>
                  </div>
                </div>

                <Button
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Demo Accounts */}
        <Card className="mt-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
              Tài khoản demo - Click để đăng nhập nhanh
            </CardTitle>
            <CardDescription>Bấm vào tài khoản bên dưới để đăng nhập ngay lập tức</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Admin Account */}
            <Button
              variant="outline"
              className="w-full justify-start p-4 h-auto border-red-200 hover:border-red-300 hover:bg-red-50"
              onClick={() => handleDemoLogin("admin", "admin", "admin", "Administrator")}
            >
              <div className="text-left">
                <div className="font-medium text-red-700">👑 Administrator</div>
                <div className="text-sm text-gray-500">admin / admin</div>
                <div className="text-xs text-red-600">Quản trị hệ thống</div>
              </div>
            </Button>

            {/* Recruiter Accounts */}
            <Button
              variant="outline"
              className="w-full justify-start p-4 h-auto border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
              onClick={() => handleDemoLogin("hr@company.com", "123456", "recruiter", "HR Manager")}
            >
              <div className="text-left">
                <div className="font-medium text-emerald-700">🏢 HR Manager</div>
                <div className="text-sm text-gray-500">hr@company.com / 123456</div>
                <div className="text-xs text-emerald-600">Nhà tuyển dụng</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start p-4 h-auto border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
              onClick={() => handleDemoLogin("recruiter@demo.com", "demo123", "recruiter", "Nhà tuyển dụng Demo")}
            >
              <div className="text-left">
                <div className="font-medium text-emerald-700">🏢 Nhà tuyển dụng Demo</div>
                <div className="text-sm text-gray-500">recruiter@demo.com / demo123</div>
                <div className="text-xs text-emerald-600">Nhà tuyển dụng</div>
              </div>
            </Button>

            {/* Candidate Accounts */}
            <Button
              variant="outline"
              className="w-full justify-start p-4 h-auto border-blue-200 hover:border-blue-300 hover:bg-blue-50"
              onClick={() => handleDemoLogin("user@example.com", "123456", "candidate", "Ứng viên Demo")}
            >
              <div className="text-left">
                <div className="font-medium text-blue-700">👤 Ứng viên Demo</div>
                <div className="text-sm text-gray-500">user@example.com / 123456</div>
                <div className="text-xs text-blue-600">Ứng viên tìm việc</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start p-4 h-auto border-blue-200 hover:border-blue-300 hover:bg-blue-50"
              onClick={() => handleDemoLogin("candidate@demo.com", "demo123", "candidate", "Ứng viên Demo")}
            >
              <div className="text-left">
                <div className="font-medium text-blue-700">👤 Ứng viên Demo 2</div>
                <div className="text-sm text-gray-500">candidate@demo.com / demo123</div>
                <div className="text-xs text-blue-600">Ứng viên tìm việc</div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>
            Bằng cách đăng ký, bạn đồng ý với{" "}
            <Link href="/terms" className="text-emerald-600 hover:underline">
              Điều khoản sử dụng
            </Link>{" "}
            và{" "}
            <Link href="/privacy" className="text-emerald-600 hover:underline">
              Chính sách bảo mật
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
