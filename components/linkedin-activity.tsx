'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, MessageSquare, ThumbsUp, Share2, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface LinkedInPost {
  id: string
  content: string
  date: string
  likes: number
  comments: number
  shares: number
  url: string
}

// Mock data - would be replaced with actual LinkedIn API data
const mockPosts: LinkedInPost[] = [
  {
    id: '1',
    content: 'Excited to share my latest insights on machine learning pitfalls and how to avoid them. Check out my new article!',
    date: '2023-05-15',
    likes: 45,
    comments: 12,
    shares: 8,
    url: 'https://www.linkedin.com/posts/kedhareswernaidu_machinelearning-datascience-datacleaning-activity-7292594788757848064-cTIG'
  },
  {
    id: '2',
    content: 'Just completed a new project on image processing using deep learning. The results are promising with 90% accuracy in sketch rendering.',
    date: '2023-05-10',
    likes: 32,
    comments: 7,
    shares: 5,
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7264226589834448896'
  },
  {
    id: '3',
    content: 'Attended an insightful workshop on the future of AI and its implications for data science professionals. The possibilities are endless!',
    date: '2023-05-05',
    likes: 28,
    comments: 5,
    shares: 3,
    url: 'https://www.linkedin.com/in/kedhareswernaidu/'
  }
]

export default function LinkedInActivity() {
  const [posts, setPosts] = useState<LinkedInPost[]>(mockPosts)
  const [loading, setLoading] = useState(false)

  // In a real implementation, this would fetch data from LinkedIn API
  useEffect(() => {
    // Simulating API call
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Linkedin className="mr-2 h-5 w-5 text-[#0077B5]" />
        LinkedIn Activity
      </h3>
      
      {loading ? (
        <div className="h-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="p-4 hover:bg-gray-50 transition-colors">
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">{post.content}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      {post.comments}
                    </span>
                    <span className="flex items-center">
                      <Share2 className="w-3 h-3 mr-1" />
                      {post.shares}
                    </span>
                  </div>
                  
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(post.date)}
                  </span>
                </div>
              </Card>
            </motion.a>
          ))}
          
          <motion.a
            href="https://www.linkedin.com/in/kedhareswernaidu/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm text-blue-600 hover:text-blue-800 transition-colors mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            View full LinkedIn profile
          </motion.a>
        </div>
      )}
    </div>
  )
}