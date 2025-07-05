'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, Award, Users, TrendingUp, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useEndorsement } from '@/hooks/use-endorsement'

interface Skill {
  id: string
  name: string
  category: string
  endorsements: number
  endorsed?: boolean
}

export default function SkillsEndorsement() {
  const {
    skills, 
    categories: apiCategories, 
    isLoading, 
    error, 
    userEmail, 
    endorsedSkills,
    loadSkills, 
    endorseSkill, 
    setEmail
  } = useEndorsement()
  
  const [filter, setFilter] = useState<string>('all')
  const [sort, setSort] = useState<'endorsements'>('endorsements')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [endorsementSuccess, setEndorsementSuccess] = useState<string | null>(null)
  const [endorsingSkill, setEndorsingSkill] = useState<string | null>(null)

  const categories = apiCategories.length > 0 ? apiCategories : []

  const filteredSkills = skills.filter(skill => {
    if (filter === 'all') return true
    return skill.category === filter
  })

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    const factor = sortDirection === 'desc' ? -1 : 1
    return (a.endorsements - b.endorsements) * factor
  })

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category))
    } else {
      setExpandedCategories([...expandedCategories, category])
    }
  }

  const handleEndorse = async (skill: Skill) => {
    if (!userEmail.trim()) {
      setShowEmailInput(true)
      return
    }
    
    // Track which skill we're currently endorsing for UI feedback
    setEndorsingSkill(skill.id)
    
    try {
      // Call API to record the endorsement
      const result = await endorseSkill(skill.id)
      
      if (result.success) {
        // Show success message
        setEndorsementSuccess(skill.name)
        setTimeout(() => setEndorsementSuccess(null), 3000)
      } else {
        // Handle error
        console.error('Endorsement failed:', result.message)
      }
    } catch (err) {
      console.error('Endorsement error:', err)
    } finally {
      setEndorsingSkill(null)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userEmail.trim()) {
      setEmail(userEmail.trim())
      setShowEmailInput(false)
    }
  }

  const toggleSort = (sortType: 'endorsements') => {
    if (sort === sortType) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
    } else {
      setSort(sortType)
      setSortDirection('desc')
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium mb-6 flex items-center">
        <Award className="mr-2 h-5 w-5" />
        Skills Endorsement
      </h3>
      
      {isLoading && skills.length === 0 && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
          <span>Loading skills...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          <p>Error: {error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2" 
            onClick={() => loadSkills()}
          >
            Retry
          </Button>
        </div>
      )}
      
      {showEmailInput ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-blue-50 rounded-lg"
        >
          <h4 className="text-sm font-medium mb-2">Please provide your email to endorse skills</h4>
          <form onSubmit={handleEmailSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" size="sm">Continue</Button>
          </form>
          <p className="text-xs text-gray-500 mt-2">Your email is only used to prevent duplicate endorsements and will not be shared.</p>
        </motion.div>
      ) : null}
      
      {endorsementSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg flex items-center"
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          <span>You've successfully endorsed <strong>{endorsementSuccess}</strong>!</span>
        </motion.div>
      )}
      
      <div className="mb-6 flex flex-wrap gap-3">
        {categories.map(category => (
          <Button 
            key={category}
            variant={filter === category ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {sortedSkills.length} skills found
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Button 
            variant="ghost" 
            size="sm"
            className={`flex items-center ${sort === 'endorsements' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => toggleSort('endorsements')}
          >
            <Users className="h-4 w-4 mr-1" />
            Endorsements
            {sort === 'endorsements' && (
              sortDirection === 'desc' ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronUp className="h-4 w-4 ml-1" />
            )}
          </Button>

        </div>
      </div>
      
      <div className="space-y-6">
        {filter === 'all' ? (
          categories.map(category => (
            <div key={category} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <h4 className="font-medium">{category}</h4>
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                  {expandedCategories.includes(category) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {expandedCategories.includes(category) && (
                <div className="p-3 space-y-3">
                  {sortedSkills
                    .filter(skill => skill.category === category)
                    .map(skill => (
                      <SkillCard 
                        key={skill.name} 
                        skill={skill} 
                        onEndorse={handleEndorse}
                        endorsedSkills={endorsedSkills}
                        endorsingSkillId={endorsingSkill}
                      />
                    ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedSkills.map(skill => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                onEndorse={handleEndorse}
                endorsedSkills={endorsedSkills}
                endorsingSkillId={endorsingSkill}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface SkillCardProps {
  skill: Skill
  onEndorse: (skill: Skill) => void
  endorsedSkills: Set<string>
  endorsingSkillId: string | null
}

function SkillCard({ skill, onEndorse, endorsedSkills, endorsingSkillId }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="p-4 transition-all duration-200 hover:shadow-md border rounded-lg bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <h5 className="font-medium">{skill.name}</h5>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Endorsements</span>
          <span className="font-medium">{skill.endorsements}</span>
        </div>
        <Progress value={Math.min(100, (skill.endorsements / 50) * 100)} className="h-2" />
      </div>
      
      <motion.div 
        className="flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered || endorsedSkills?.has(skill.id) ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          variant={skill.endorsed ? "secondary" : "outline"}
          size="sm"
          className={`text-xs ${endorsedSkills?.has(skill.id) ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}`}
          onClick={() => !endorsedSkills?.has(skill.id) && onEndorse(skill)}
          disabled={endorsedSkills?.has(skill.id) || endorsingSkillId === skill.id}
        >
          {endorsedSkills?.has(skill.id) ? (
            <>
              <ThumbsUp className="h-3 w-3 mr-1" />
              Endorsed
            </>
          ) : (
            <>Endorse</>  
          )}
        </Button>
      </motion.div>
    </div>
  )
}
