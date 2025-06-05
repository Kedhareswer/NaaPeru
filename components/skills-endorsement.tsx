'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, Award, Users, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface Skill {
  name: string
  category: string
  endorsements: number
  rating: number
  endorsed: boolean
}

const initialSkills: Skill[] = [
  { name: 'Python', category: 'Technical Skills', endorsements: 42, rating: 4.8, endorsed: false },
  { name: 'Machine Learning', category: 'Technical Skills', endorsements: 38, rating: 4.7, endorsed: false },
  { name: 'Deep Learning', category: 'Technical Skills', endorsements: 35, rating: 4.6, endorsed: false },
  { name: 'Computer Vision', category: 'Technical Skills', endorsements: 31, rating: 4.5, endorsed: false },
  { name: 'NLP', category: 'Technical Skills', endorsements: 29, rating: 4.4, endorsed: false },
  { name: 'Data Analysis', category: 'Technical Skills', endorsements: 36, rating: 4.6, endorsed: false },
  { name: 'Statistical Modeling', category: 'Technical Skills', endorsements: 27, rating: 4.3, endorsed: false },
  { name: 'SQL', category: 'Technical Skills', endorsements: 33, rating: 4.5, endorsed: false },
  { name: 'Power BI', category: 'Tools & Platforms', endorsements: 25, rating: 4.2, endorsed: false },
  { name: 'Tableau', category: 'Tools & Platforms', endorsements: 24, rating: 4.1, endorsed: false },
  { name: 'Hugging Face', category: 'Tools & Platforms', endorsements: 22, rating: 4.0, endorsed: false },
  { name: 'Git', category: 'Tools & Platforms', endorsements: 30, rating: 4.4, endorsed: false },
  { name: 'Problem Solving', category: 'Soft Skills', endorsements: 40, rating: 4.8, endorsed: false },
  { name: 'Team Leadership', category: 'Soft Skills', endorsements: 32, rating: 4.5, endorsed: false },
  { name: 'Project Management', category: 'Soft Skills', endorsements: 28, rating: 4.3, endorsed: false },
  { name: 'Communication', category: 'Soft Skills', endorsements: 34, rating: 4.6, endorsed: false },
]

export default function SkillsEndorsement() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [filter, setFilter] = useState<string>('Soft Skills')
  const [sort, setSort] = useState<'endorsements' | 'rating'>('endorsements')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Technical Skills', 'Tools & Platforms', 'Soft Skills'])
  const [userEmail, setUserEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [endorsementSuccess, setEndorsementSuccess] = useState<string | null>(null)

  const categories = Array.from(new Set(skills.map(skill => skill.category)))

  const filteredSkills = skills.filter(skill => {
    if (filter === 'all') return true
    return skill.category === filter
  })

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    const factor = sortDirection === 'desc' ? -1 : 1
    return sort === 'endorsements' 
      ? (a.endorsements - b.endorsements) * factor
      : (a.rating - b.rating) * factor
  })

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category))
    } else {
      setExpandedCategories([...expandedCategories, category])
    }
  }

  const handleEndorse = (skillName: string) => {
    if (!userEmail.trim()) {
      setShowEmailInput(true)
      return
    }
    
    // In a real implementation, this would call an API to record the endorsement
    setSkills(skills.map(skill => {
      if (skill.name === skillName && !skill.endorsed) {
        return {
          ...skill,
          endorsements: skill.endorsements + 1,
          endorsed: true
        }
      }
      return skill
    }))
    
    setEndorsementSuccess(skillName)
    setTimeout(() => setEndorsementSuccess(null), 3000)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userEmail.trim()) {
      setShowEmailInput(false)
    }
  }

  const toggleSort = (sortType: 'endorsements' | 'rating') => {
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
              onChange={(e) => setUserEmail(e.target.value)}
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
          <Button 
            variant="ghost" 
            size="sm"
            className={`flex items-center ${sort === 'rating' ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={() => toggleSort('rating')}
          >
            <Star className="h-4 w-4 mr-1" />
            Rating
            {sort === 'rating' && (
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
  onEndorse: (skillName: string) => void
}

function SkillCard({ skill, onEndorse }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Card 
      className="p-4 transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-2">
        <h5 className="font-medium">{skill.name}</h5>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm">{skill.rating.toFixed(1)}</span>
        </div>
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
        animate={{ opacity: isHovered || skill.endorsed ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          variant={skill.endorsed ? "secondary" : "outline"}
          size="sm"
          className={`text-xs ${skill.endorsed ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}`}
          onClick={() => !skill.endorsed && onEndorse(skill.name)}
          disabled={skill.endorsed}
        >
          {skill.endorsed ? (
            <>
              <ThumbsUp className="h-3 w-3 mr-1" />
              Endorsed
            </>
          ) : (
            <>Endorse</>  
          )}
        </Button>
      </motion.div>
    </Card>
  )
}
