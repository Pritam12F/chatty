import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import {
  PlayCircle,
  MessageSquare,
  FileText,
  Clock,
  Plus,
  Youtube,
  Sparkles,
  TrendingUp,
  Video,
  ArrowRight,
  Star,
  BookOpen,
  Zap,
  Activity,
  Eye,
  Share2,
  Download,
  Filter,
} from "lucide-react";
import { getServerSession } from "next-auth";
import AddVideo from "@/components/add-video";
import { WelcomeHeader } from "@/components/welcome-header";
import { QuickActions } from "@/components/quick-actions";

export default async function Dashboard() {
  const recentChats = [
    {
      id: 1,
      title: "How to Build a React App",
      videoTitle: "React Tutorial for Beginners",
      duration: "45:32",
      chatCount: 12,
      createdAt: "2 hours ago",
      thumbnail: "/react-tutorial-thumbnail.png",
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      videoTitle: "Introduction to ML",
      duration: "1:23:15",
      chatCount: 8,
      createdAt: "1 day ago",
      thumbnail: "/machine-learning-thumbnail.jpg",
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      videoTitle: "Modern JavaScript Guide",
      duration: "32:18",
      chatCount: 15,
      createdAt: "3 days ago",
      thumbnail: "/javascript-es6-thumbnail.jpg",
    },
  ];

  const trendingVideos = [
    {
      id: 1,
      title: "Advanced Python Programming",
      channel: "CodeMaster",
      views: "2.3M",
      duration: "1:15:42",
      thumbnail: "/python-programming-tutorial.png",
      category: "Programming",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Web Design Principles 2024",
      channel: "DesignPro",
      views: "1.8M",
      duration: "58:30",
      thumbnail: "/web-design-tutorial.png",
      category: "Design",
      rating: 4.8,
    },
    {
      id: 3,
      title: "AI & Machine Learning Explained",
      channel: "TechGuru",
      views: "3.1M",
      duration: "2:05:15",
      thumbnail: "/ai-machine-learning.png",
      category: "AI/ML",
      rating: 4.9,
    },
    {
      id: 4,
      title: "Database Design Fundamentals",
      channel: "DataExpert",
      views: "950K",
      duration: "1:32:18",
      thumbnail: "/database-design-concept.png",
      category: "Database",
      rating: 4.7,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "summary",
      action: "Generated summary for",
      target: "React Hooks Deep Dive",
      time: "30 minutes ago",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "chat",
      action: "Started chat with",
      target: "TypeScript Best Practices",
      time: "2 hours ago",
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "analysis",
      action: "Analyzed video",
      target: "Node.js Performance Tips",
      time: "5 hours ago",
      icon: Video,
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "share",
      action: "Shared summary of",
      target: "CSS Grid Layout Guide",
      time: "1 day ago",
      icon: Share2,
      color: "text-orange-500",
    },
    {
      id: 5,
      type: "download",
      action: "Downloaded transcript for",
      target: "JavaScript Async/Await",
      time: "2 days ago",
      icon: Download,
      color: "text-indigo-500",
    },
  ];

  const features = [
    {
      title: "Smart Summaries",
      description: "AI-powered summaries that capture key insights",
      icon: Sparkles,
      usage: 89,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Interactive Chat",
      description: "Ask questions and get instant answers",
      icon: MessageSquare,
      usage: 76,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Chapter Generation",
      description: "Automatic video segmentation and timestamps",
      icon: BookOpen,
      usage: 92,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Quick Analysis",
      description: "Instant video analysis and key points extraction",
      icon: Zap,
      usage: 68,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const stats = [
    { label: "Videos Processed", value: "24", icon: Video, change: "+12%" },
    {
      label: "Chat Sessions",
      value: "156",
      icon: MessageSquare,
      change: "+23%",
    },
    {
      label: "Summaries Generated",
      value: "89",
      icon: FileText,
      change: "+8%",
    },
    { label: "Hours Saved", value: "47", icon: Clock, change: "+15%" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <WelcomeHeader />
        <AddVideo />
        <QuickActions />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border/50"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium bg-primary/10 text-primary border-primary/20"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Recent Chats */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        Recent Chats
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Continue your conversations or start new ones
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {recentChats.map((chat, index) => (
                    <div key={chat.id}>
                      <div className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
                        <div className="relative">
                          <img
                            src={
                              chat.thumbnail ||
                              "/placeholder.svg?height=60&width=100&query=video thumbnail"
                            }
                            alt={chat.videoTitle}
                            className="w-20 h-12 rounded-lg object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <PlayCircle className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground truncate text-base mb-1">
                            {chat.title}
                          </h4>
                          <p className="text-sm text-muted-foreground truncate mb-2">
                            {chat.videoTitle}
                          </p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-muted-foreground/80 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {chat.duration}
                            </span>
                            <span className="text-xs text-muted-foreground/80 flex items-center">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              {chat.chatCount} messages
                            </span>
                            <span className="text-xs text-muted-foreground/80">
                              {chat.createdAt}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Continue
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                      {index < recentChats.length - 1 && (
                        <Separator className="my-2 bg-border/50" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Activity */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-foreground">
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Your latest actions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0`}
                      >
                        <activity.icon
                          className={`w-4 h-4 ${activity.color}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="text-muted-foreground">
                            {activity.action}
                          </span>{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground/80 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">
                    Trending Videos
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Popular educational content you might enjoy
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  View All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30 bg-background/50"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="absolute top-2 right-2 text-xs bg-black/70 text-white border-0">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {video.category}
                      </Badge>
                      <h4 className="font-semibold text-foreground text-sm line-clamp-2 leading-tight">
                        {video.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {video.channel}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {video.views}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">
                            {video.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
