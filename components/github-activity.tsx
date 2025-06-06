'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Code, GitBranch, GitCommit, GitPullRequest, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface GitHubContribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4 // 0 = no contributions, 4 = many contributions
}

interface GitHubActivity {
  type: 'commit' | 'pr' | 'issue' | 'star'
  repo: string
  title: string
  url: string
  date: string
}

// Mock data - would be replaced with actual GitHub API data
const mockContributions: GitHubContribution[] = Array.from({ length: 365 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - 365 + i)
  return {
    date: date.toISOString().split('T')[0],
    count: Math.floor(Math.random() * 5),
    level: Math.floor(Math.random() * 5) as 0 | 1 | 2 | 3 | 4
  }
})

const mockActivities: GitHubActivity[] = [
  {
    type: 'commit',
    repo: 'Kedhareswer/MLGeneFunction',
    title: 'Add new image processing algorithm',
    url: 'https://github.com/Kedhareswer/MLGeneFunction',
    date: '2023-05-15'
  },
  {
    type: 'pr',
    repo: 'Kedhareswer/endoscopy-enhancement',
    title: 'Implement contrast enhancement feature',
    url: 'https://github.com/Kedhareswer/endoscopy-enhancement',
    date: '2023-05-10'
  },
  {
    type: 'issue',
    repo: 'Kedhareswer/Digit_Classifier_DeepLearning',
    title: 'Fix model accuracy issue with certain digits',
    url: 'https://github.com/Kedhareswer/Digit_Classifier_DeepLearning',
    date: '2023-05-05'
  },
  {
    type: 'star',
    repo: 'tensorflow/tensorflow',
    title: 'Starred TensorFlow repository',
    url: 'https://github.com/tensorflow/tensorflow',
    date: '2023-05-01'
  }
]

export default function GitHubActivity() {
  const [contributions, setContributions] = useState<GitHubContribution[]>(mockContributions)
  const [activities, setActivities] = useState<GitHubActivity[]>(mockActivities)
  const [loading, setLoading] = useState(false)

  // In a real implementation, this would fetch data from GitHub API
  useEffect(() => {
    // Simulating API call
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const getActivityIcon = (type: GitHubActivity['type']) => {
    switch (type) {
      case 'commit':
        return <GitCommit className="w-4 h-4" />
      case 'pr':
        return <GitPullRequest className="w-4 h-4" />
      case 'issue':
        return <Code className="w-4 h-4" />
      case 'star':
        return <Star className="w-4 h-4" />
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Contribution Graph
        </h3>
        
        {loading ? (
          <div className="h-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="overflow-x-auto pb-2">
            <div className="grid grid-cols-53 gap-1" style={{ gridTemplateColumns: 'repeat(53, minmax(10px, 1fr))' }}>
              {contributions.map((contribution, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: i * 0.001 }}
                  className={`w-3 h-3 rounded-sm ${getLevelColor(contribution.level)} cursor-pointer transition-colors`}
                  title={`${contribution.date}: ${contribution.count} contributions`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <GitBranch className="mr-2 h-5 w-5" />
          Recent Activity
        </h3>
        
        {loading ? (
          <div className="h-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity, i) => (
              <motion.a
                key={i}
                href={activity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card className="p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.repo}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
