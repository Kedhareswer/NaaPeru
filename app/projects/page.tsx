"use client"

import { useEffect, useState } from 'react'
import { EnhancedProjectCard } from '@/components/enhanced-project-card'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="flex items-center mb-6">
        <a href="/" className="flex items-center text-gray-600 hover:text-black transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </a>
      </div>
      <h1 className="text-3xl font-light mb-10 text-center">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((p, i) => (
          <EnhancedProjectCard key={p.id} project={{ ...p, featured: false }} index={i} onViewDetails={() => {}} />
        ))}
      </div>
    </div>
  )
}
