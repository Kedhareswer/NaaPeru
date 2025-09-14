"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Code,
  GitBranch,
  GitCommit,
  Star,
  ExternalLink,
  Linkedin,
  Github,
  TrendingUp,
  Users,
  Activity,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  Share2,
  Clock,
  GitPullRequest,
  GitFork,
  Calendar,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { GitHubCalendar } from "@/components/ui/git-hub-calendar"

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
  topics: string[]
  watchers_count: number
}

interface GitHubEvent {
  id: string
  type: string
  repo: {
    name: string
    url: string
  }
  payload: any
  created_at: string
}

interface GitHubUser {
  login: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

interface GitHubContribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4 // 0 = no contributions, 4 = many contributions
}

interface LinkedInPost {
  id: string
  content: string
  date: string
  likes: number
  comments: number
  shares: number
  url: string
  type: "article" | "post" | "achievement"
  category: string
}

// Fallback LinkedIn posts in case API fails
const linkedInPosts: LinkedInPost[] = [
  {
    id: "1",
    content:
      "🚀 Excited to share my latest insights on machine learning pitfalls and how to avoid them. From data preprocessing challenges to model evaluation traps, I've compiled practical strategies that every data scientist should know.",
    date: "2025-01-06",
    likes: 45,
    comments: 12,
    shares: 8,
    url: "https://www.linkedin.com/posts/kedhareswernaidu_machinelearning-datascience-datacleaning-activity-7292594788757848064-cTIG",
    type: "article",
    category: "Machine Learning",
  },
  {
    id: "2",
    content:
      "🎯 Mastering Gradient Descent: The Journey to Smarter Predictions. Explore how gradient descent optimizes machine learning models through iterative refinement, using practical examples to demonstrate its power.",
    date: "2025-01-20",
    likes: 38,
    comments: 9,
    shares: 6,
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7264226589834448896",
    type: "article",
    category: "Data Science",
  },
  {
    id: "3",
    content:
      "💡 Just completed a comprehensive project on image processing using deep learning. Achieved 90% accuracy in sketch rendering with 30% optimization in processing speed. The technical insights are fascinating!",
    date: "2024-12-15",
    likes: 52,
    comments: 15,
    shares: 11,
    url: "https://www.linkedin.com/in/kedhareswernaidu/",
    type: "post",
    category: "Computer Vision",
  },
  {
    id: "4",
    content:
      "🏆 Thrilled to announce my recent work on endoscopy image enhancement using advanced computer vision techniques. This project focuses on improving medical image quality for better diagnostic accuracy.",
    date: "2024-11-28",
    likes: 41,
    comments: 8,
    shares: 7,
    url: "https://www.linkedin.com/in/kedhareswernaidu/",
    type: "achievement",
    category: "Healthcare AI",
  },
]

export default function LatestInsights() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [userStats, setUserStats] = useState<GitHubUser | null>(null)
  const [posts, setPosts] = useState<LinkedInPost[]>(linkedInPosts)
  const [contributions, setContributions] = useState<GitHubContribution[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "github" | "linkedin">("all")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [githubUsername, setGithubUsername] = useState<string>("Kedhareswer")
  const [linkedinUsername, setLinkedinUsername] = useState<string>("kedhareswernaidu")

  // Fetch GitHub contribution data using our secure API endpoint
  const fetchGitHubContributions = async () => {
    try {
      // Use our secure server-side endpoint
      const response = await fetch('/api/github/activity');
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Use the contributions data from the API response
      if (data.contributions) {
        setContributions(data.contributions);
      } else {
        // Fall back to mock data if the format is unexpected
        throw new Error('Unexpected response format');
      }
      
      return true;
    } catch (err) {
      console.error("Error fetching GitHub contributions:", err);
      // If API fails, generate mock data as fallback
      generateMockContributions();
      return false;
    }
  };

  // Generate mock contributions data as fallback
  const generateMockContributions = () => {
    const today = new Date()
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(today.getFullYear() - 1)
    
    const mockData: GitHubContribution[] = []
    let currentDate = new Date(oneYearAgo)
    
    while (currentDate <= today) {
      // Generate random contribution count and level
      const count = Math.floor(Math.random() * 10)
      let level: 0 | 1 | 2 | 3 | 4 = 0
      
      if (count === 0) level = 0
      else if (count < 3) level = 1
      else if (count < 5) level = 2
      else if (count < 8) level = 3
      else level = 4
      
      mockData.push({
        date: currentDate.toISOString().split('T')[0],
        count,
        level
      })
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    setContributions(mockData)
  }

  // Fetch GitHub user data, repositories, and events using our secure API endpoint
  const fetchGitHubData = async () => {
    try {
      setLoading(true)

      // Use our secure server-side endpoint
      const response = await fetch('/api/github/activity');
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Update user stats if available
      if (data.user) {
        setUserStats({
          login: data.user.login || githubUsername,
          public_repos: data.user.public_repos || 0,
          followers: data.user.followers || 0,
          following: data.user.following || 0,
          created_at: data.user.created_at || new Date().toISOString()
        });
      }

      // Update repositories if available
      if (data.repos) {
        setRepos(data.repos);
      }

      // Update events if available
      if (data.activities) {
        setEvents(data.activities.map((activity: any) => ({
          id: activity.id || Math.random().toString(36).substr(2, 9),
          type: activity.type || 'PushEvent',
          repo: {
            name: activity.repo || `${githubUsername}/unknown-repo`,
            url: activity.url || `https://github.com/${githubUsername}/unknown-repo`
          },
          payload: {},
          created_at: activity.date || new Date().toISOString()
        })));
      }

      // Update contributions if available
      if (data.contributions) {
        setContributions(data.contributions);
      } else {
        // Fall back to mock data if contributions are not in the expected format
        generateMockContributions();
      }

      return true;
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      setError("Failed to load GitHub data. Using sample data instead.");
      
      // Fallback to sample data
      setUserStats({
        login: githubUsername,
        public_repos: 12,
        followers: 24,
        following: 8,
        created_at: "2021-01-01T00:00:00Z"
      });

      // Generate mock data as fallback
      generateMockContributions();
      
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Fetch LinkedIn data using our secure server-side API endpoint
  const fetchLinkedInData = async () => {
    try {
      // Fetch from our secure API route
      const response = await fetch('/api/linkedin/activity');
      
      if (!response.ok) {
        throw new Error(`LinkedIn API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // If we have real data from LinkedIn API, process it
      if (data.data && Array.isArray(data.data)) {
        const processedPosts = data.data.map((post: any) => ({
          id: post.id || Math.random().toString(36).substr(2, 9),
          content: post.commentary?.text || 'New activity on LinkedIn',
          date: post.created?.time || new Date().toISOString(),
          likes: post.socialDetail?.totalLikes || 0,
          comments: post.socialDetail?.comments?.total || 0,
          shares: post.socialDetail?.shares?.total || 0,
          url: post.permalink || '#',
          type: 'post',
          category: 'professional'
        }));
        
        setPosts(processedPosts);
      } else {
        // Fall back to mock data if no real data is available
        setPosts(linkedInPosts);
      }
      
      return true;
    } catch (err) {
      console.error("Error fetching LinkedIn data:", err);
      // Fall back to mock data if API fails
      setPosts(linkedInPosts);
      return false;
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchGitHubData(),
        fetchLinkedInData()
      ])
    }

    fetchAllData()

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchAllData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [githubUsername, linkedinUsername])

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return <GitCommit className="w-4 h-4" />
      case "PullRequestEvent":
        return <GitPullRequest className="w-4 h-4" />
      case "CreateEvent":
        return <GitBranch className="w-4 h-4" />
      case "WatchEvent":
        return <Star className="w-4 h-4" />
      case "ForkEvent":
        return <GitFork className="w-4 h-4" />
      default:
        return <Code className="w-4 h-4" />
    }
  }

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case "PushEvent":
        const commitCount = event.payload.commits?.length || 0
        return `Pushed ${commitCount} commit${commitCount !== 1 ? "s" : ""}`
      case "PullRequestEvent":
        return `${event.payload.action} pull request`
      case "CreateEvent":
        return `Created ${event.payload.ref_type}`
      case "WatchEvent":
        return "Starred repository"
      case "ForkEvent":
        return "Forked repository"
      default:
        return event.type.replace("Event", "")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="w-4 h-4" />
      case "achievement":
        return <Star className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-gray-100',
      'bg-green-100',
      'bg-green-300',
      'bg-green-500',
      'bg-green-700'
    ]
    return colors[level]
  }

  const filteredContent = () => {
    const githubContent = events.slice(0, 5).map((event) => ({
      type: "github" as const,
      id: event.id,
      date: event.created_at,
      content: event,
    }))

    const linkedinContent = posts.slice(0, 4).map((post) => ({
      type: "linkedin" as const,
      id: post.id,
      date: post.date,
      content: post,
    }))

    let allContent = [...githubContent, ...linkedinContent]

    if (activeTab === "github") {
      allContent = githubContent
    } else if (activeTab === "linkedin") {
      allContent = linkedinContent
    }

    return allContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-zinc-50" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full text-sm text-zinc-600 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Activity className="w-4 h-4" />
            Live updates • Last refreshed {formatDate(lastUpdated.toISOString())}
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Latest Insights & Activity
          </motion.h2>

          <motion.div
            className="w-16 h-px bg-zinc-300 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="text-zinc-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Real-time updates from my development journey, research insights, and professional activities across GitHub
            and LinkedIn.
          </motion.p>
        </motion.div>

        {/* Github Calender */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="p-6 bg-white border-zinc-200">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-zinc-600" />
              Github Calender
            </h3>
            
            {loading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
              </div>
            ) : (
              <div className="overflow-x-auto pb-2">
                <GitHubCalendar
                  data={contributions.map((c) => ({ date: c.date, count: c.count }))}
                />
              </div>
            )}
          </Card>
        </motion.div>

        {/* Live Statistics */}
        {userStats && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-6 text-center bg-white border-zinc-200">
              <div className="flex items-center justify-center mb-2">
                <Code className="w-5 h-5 text-zinc-600 mr-2" />
                <span className="text-2xl font-light">{userStats.public_repos}</span>
              </div>
              <p className="text-sm text-zinc-500">Public Repos</p>
            </Card>

            <Card className="p-6 text-center bg-white border-zinc-200">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-zinc-600 mr-2" />
                <span className="text-2xl font-light">{userStats.followers}</span>
              </div>
              <p className="text-sm text-zinc-500">Followers</p>
            </Card>

            <Card className="p-6 text-center bg-white border-zinc-200">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-5 h-5 text-zinc-600 mr-2" />
                <span className="text-2xl font-light">
                  {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
                </span>
              </div>
              <p className="text-sm text-zinc-500">Total Stars</p>
            </Card>

            <Card className="p-6 text-center bg-white border-zinc-200">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-zinc-600 mr-2" />
                <span className="text-2xl font-light">{events.length}</span>
              </div>
              <p className="text-sm text-zinc-500">Recent Activities</p>
            </Card>
          </motion.div>
        )}

        {/* Filter Tabs */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white border border-zinc-200 rounded-xl p-1 flex">
            {[
              { key: "all", label: "All Activity", icon: Activity },
              { key: "github", label: "GitHub", icon: Github },
              { key: "linkedin", label: "LinkedIn", icon: Linkedin },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 mb-4">{error}</p>
            <div className="flex justify-center gap-4">
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-zinc-600 hover:text-zinc-900"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
              <a
                href={`https://www.linkedin.com/in/${linkedinUsername}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-zinc-600 hover:text-zinc-900"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                View on LinkedIn
              </a>
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {filteredContent().map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.type === "github" ? (
                  <Card className="p-6 bg-white border-zinc-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                        {getEventIcon((item.content as GitHubEvent).type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Github className="w-4 h-4 text-zinc-500" />
                          <span className="text-sm font-medium text-zinc-900">GitHub Activity</span>
                        </div>
                        <p className="text-zinc-700 mb-2">{getEventDescription(item.content as GitHubEvent)}</p>
                        <p className="text-sm text-zinc-500 mb-3">{(item.content as GitHubEvent).repo.name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDate(item.date)}
                          </span>
                          <a
                            href={`https://github.com/${(item.content as GitHubEvent).repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 bg-white border-zinc-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        {getPostTypeIcon((item.content as LinkedInPost).type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Linkedin className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-zinc-900">LinkedIn Post</span>
                          <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                            {(item.content as LinkedInPost).category}
                          </span>
                        </div>
                        <p className="text-zinc-700 mb-3 line-clamp-3 leading-relaxed">
                          {(item.content as LinkedInPost).content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-zinc-500">
                            <span className="flex items-center">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {(item.content as LinkedInPost).likes}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              {(item.content as LinkedInPost).comments}
                            </span>
                            <span className="flex items-center">
                              <Share2 className="w-3 h-3 mr-1" />
                              {(item.content as LinkedInPost).shares}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-zinc-400 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDate(item.date)}
                            </span>
                            <a
                              href={(item.content as LinkedInPost).url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Links */}
        <motion.div
          className="flex justify-center gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            View GitHub Profile
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={`https://www.linkedin.com/in/${linkedinUsername}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-all duration-200"
          >
            <Linkedin className="w-4 h-4" />
            View LinkedIn Profile
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
