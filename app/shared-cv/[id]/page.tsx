"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ArrowLeft } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

interface CVData {
  id: string;
  name: string;
  content: string;
  template?: string;
}

export default function SharedCVPage() {
  const router = useRouter()
  const params = useParams()
  const [cv, setCv] = useState<CVData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Fetch CV data from localStorage
    try {
      const cvId = params.id as string
      const storedCVs = localStorage.getItem('candidate_cvs')
      
      if (storedCVs) {
        const cvList = JSON.parse(storedCVs) as CVData[]
        const foundCV = cvList.find(cv => cv.id === cvId)
        
        if (foundCV) {
          setCv(foundCV)
        } else {
          setError("CV không tồn tại hoặc đã bị xóa")
        }
      } else {
        setError("Không tìm thấy CV")
      }
    } catch (err) {
      console.error("Error fetching CV:", err)
      setError("Đã xảy ra lỗi khi tải CV")
    } finally {
      setLoading(false)
    }
  }, [params.id])
  
  const handleDownload = () => {
    if (!cv) return
    
    // Create a blob and download it
    const blob = new Blob([cv.content], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = cv.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                <p>{error}</p>
              </div>
              <Link href="/">
                <Button>Trở về trang chủ</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Trở về trang chủ
            </Button>
          </Link>
          <Button 
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Tải xuống CV
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-8">
            {cv ? (
              <div className={`cv-preview cv-${cv.template || 'modern'}`}>
                <div className="border p-8 rounded-md bg-white">
                  <pre className="whitespace-pre-wrap">{cv.content}</pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">CV không tồn tại</h2>
                <p className="text-gray-500 mb-6">CV này không tồn tại hoặc đã bị xóa</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 