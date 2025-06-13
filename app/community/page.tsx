"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, TrendingUp, Users, Award } from "lucide-react"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newPost, setNewPost] = useState("")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const posts = [
    {
      id: 1,
      author: {
        name: "Nguyễn Văn A",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Frontend Developer",
        company: "TechCorp",
      },
      content:
        "Vừa hoàn thành dự án React đầu tiên! Cảm ơn cộng đồng JobFind đã hỗ trợ tôi trong suốt quá trình học tập. Từ một người không biết gì về lập trình, giờ tôi đã có thể tự tin ứng tuyển vào các vị trí Frontend Developer.",
      timestamp: "2 giờ trước",
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ["React", "Frontend", "Success Story"],
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      author: {
        name: "Trần Thị B",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "UX Designer",
        company: "DesignStudio",
      },
      content:
        "Chia sẻ một số tips để chuẩn bị cho buổi phỏng vấn UX Designer:\n\n1. Chuẩn bị portfolio chi tiết\n2. Hiểu rõ về công ty và sản phẩm\n3. Luyện tập trình bày case study\n4. Chuẩn bị câu hỏi để hỏi interviewer\n\nChúc các bạn thành công! 💪",
      timestamp: "5 giờ trước",
      likes: 45,
      comments: 12,
      shares: 8,
      tags: ["UX Design", "Interview Tips", "Career Advice"],
    },
    {
      id: 3,
      author: {
        name: "Lê Văn C",
        avatar: "/placeholder.svg?height=40&width=40",
        title: "Marketing Manager",
        company: "StartupXYZ",
      },
      content:
        "Startup của chúng tôi đang tuyển thêm 2 vị trí Marketing Executive. Ai quan tâm có thể inbox mình nhé! Môi trường trẻ, năng động, nhiều cơ hội phát triển.",
      timestamp: "1 ngày trước",
      likes: 18,
      comments: 15,
      shares: 5,
      tags: ["Job Opening", "Marketing", "Startup"],
    },
  ]

  const trendingTopics = [
    { name: "Remote Work", posts: 156 },
    { name: "AI in Recruitment", posts: 89 },
    { name: "Salary Negotiation", posts: 67 },
    { name: "Career Switch", posts: 45 },
    { name: "Interview Tips", posts: 123 },
  ]

  const successStories = [
    {
      name: "Phạm Thị D",
      story: "Từ thất nghiệp 6 tháng đến Senior Developer",
      timeframe: "3 tháng",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Hoàng Văn E",
      story: "Chuyển ngành từ kế toán sang Data Science",
      timeframe: "8 tháng",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleShare = (postId: number) => {
    alert("Đã chia sẻ bài viết!")
  }

  const handleComment = (postId: number) => {
    alert("Tính năng bình luận sẽ được phát triển trong phiên bản tiếp theo!")
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      alert("Bài viết đã được đăng thành công!")
      setNewPost("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Chủ đề thịnh hành
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{topic.name}</span>
                    <Badge variant="secondary">{topic.posts}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Câu chuyện thành công
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {successStories.map((story, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={story.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{story.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{story.name}</p>
                      <p className="text-xs text-gray-600">{story.story}</p>
                      <p className="text-xs text-blue-600">{story.timeframe}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Cộng đồng JobFind</h1>
                <p className="text-gray-600">Kết nối, chia sẻ và học hỏi cùng cộng đồng</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>12,345 thành viên</span>
              </div>
            </div>

            {/* Search */}
            <div className="flex gap-4">
              <Input
                placeholder="Tìm kiếm bài viết, chủ đề..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button>Tìm kiếm</Button>
            </div>

            {/* Create Post */}
            <Card>
              <CardHeader>
                <CardTitle>Chia sẻ với cộng đồng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Bạn đang nghĩ gì? Chia sẻ kinh nghiệm, câu hỏi hoặc thành tựu của bạn..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      📷 Ảnh
                    </Button>
                    <Button variant="outline" size="sm">
                      📊 Khảo sát
                    </Button>
                    <Button variant="outline" size="sm">
                      🎯 Thẻ
                    </Button>
                  </div>
                  <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                    Đăng bài
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {post.author.title}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{post.author.company}</p>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-gray-800 whitespace-pre-line mb-3">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post image"
                          className="w-full rounded-lg max-h-64 object-cover"
                        />
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 ${likedPosts.includes(post.id) ? "text-red-500" : ""}`}
                        >
                          <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                          {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleComment(post.id)}
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(post.id)}
                          className="flex items-center gap-2"
                        >
                          <Share2 className="h-4 w-4" />
                          {post.shares}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline">Xem thêm bài viết</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
