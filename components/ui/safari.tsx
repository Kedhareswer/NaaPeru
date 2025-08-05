import React, { useState, useEffect } from 'react'
import { X, Plus, RotateCcw } from 'lucide-react'

export interface TabData {
  id: string
  title: string
  url: string
  src?: string
  favicon?: string
  description?: string
  technologies?: string[]
  github?: string | null
  demo?: string | null
  category?: string
  date?: string
}

export interface SafariWithTabsProps {
  initialTabs?: TabData[]
  className?: string
  width?: number
  height?: number
}

export function SafariWithTabs({
  initialTabs = [
    {
      id: '1',
      title: 'Magic UI',
      url: 'magicui.design',
      src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=750&fit=crop',
      favicon: '🎨'
    }
  ],
  className = '',
  width = 1203,
  height = 753,
  ...props
}: SafariWithTabsProps) {
  const [tabs, setTabs] = useState<TabData[]>(initialTabs)
  const [activeTabId, setActiveTabId] = useState<string>(initialTabs[0]?.id || '1')
  const [urlInput, setUrlInput] = useState('')
  const [isEditingUrl, setIsEditingUrl] = useState(false)
  const [allProjects, setAllProjects] = useState<TabData[]>([])
  const [usedProjectIds, setUsedProjectIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0]

  // Fetch projects from API on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/projects')
        if (response.ok) {
          const data = await response.json()
          const formattedProjects: TabData[] = data.projects.map((project: any) => ({
            id: `db-${project.id}`,
            title: project.title,
            url: project.github_url?.replace('https://github.com/', '') || 'project.dev',
            src: project.image_url || '/projects/image-to-sketch.png',
            favicon: getFaviconForProject(project.title, project.category),
            description: project.description,
            technologies: project.technologies || [],
            github: project.github_url,
            demo: project.demo_url,
            category: project.category,
            date: project.date
          }))
          setAllProjects(formattedProjects)
          
          // Mark the initial projects as used so they don't get added again
          const initialProjectTitles = ['Bolt Research Hub', 'QuantumPDF ChatApp VectorDB']
          const usedIds = new Set<string>()
          
          formattedProjects.forEach(project => {
            if (initialProjectTitles.includes(project.title)) {
              usedIds.add(project.id)
            }
          })
          
          setUsedProjectIds(usedIds)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Helper function to get favicon based on project title and category
  const getFaviconForProject = (title: string, category?: string): string => {
    const lowerTitle = title.toLowerCase()
    const lowerCategory = category?.toLowerCase() || ''
    
    // Check for specific project types
    if (lowerTitle.includes('sketch') || lowerTitle.includes('image')) return '🎨'
    if (lowerTitle.includes('endoscopy') || lowerTitle.includes('medical')) return '🏥'
    if (lowerTitle.includes('digit') || lowerTitle.includes('classifier')) return '🔢'
    if (lowerTitle.includes('chef') || lowerTitle.includes('cook')) return '👨‍🍳'
    if (lowerTitle.includes('quantum') || lowerTitle.includes('pdf')) return '📄'
    if (lowerTitle.includes('data') || lowerTitle.includes('notebook')) return '📊'
    if (lowerTitle.includes('prompt') || lowerTitle.includes('forger')) return '⚡'
    if (lowerTitle.includes('research') || lowerTitle.includes('bolt')) return '🔬'
    if (lowerTitle.includes('portfolio') || lowerTitle.includes('nexus')) return '💼'
    if (lowerTitle.includes('web') || lowerTitle.includes('100')) return '🌐'
    if (lowerTitle.includes('ml') || lowerTitle.includes('notebook')) return '📓'
    
    // Check by category
    if (lowerCategory.includes('deep learning') || lowerCategory.includes('ai')) return '🤖'
    if (lowerCategory.includes('web development')) return '🌐'
    if (lowerCategory.includes('machine learning')) return '📊'
    
    return '📁'
  }

  const addNewTab = () => {
    if (isLoading) {
      // Show loading tab
      const loadingTab: TabData = {
        id: Date.now().toString(),
        title: 'Loading...',
        url: 'about:blank',
        src: '/projects/image-to-sketch.png',
        favicon: '⏳',
        description: 'Loading projects from database...',
        technologies: ['Loading'],
        github: null,
        demo: null,
        category: 'Loading',
        date: 'Now'
      }
      setTabs([...tabs, loadingTab])
      setActiveTabId(loadingTab.id)
      return
    }

    // Find a project that hasn't been used yet
    const unusedProjects = allProjects.filter(project => !usedProjectIds.has(project.id))
    
    if (unusedProjects.length > 0) {
      // Add a random unused project
      const randomIndex = Math.floor(Math.random() * unusedProjects.length)
      const newProject = unusedProjects[randomIndex]
      
      const newTab: TabData = {
        ...newProject,
        id: `tab-${Date.now()}` // Give it a unique tab ID
      }
      
      setTabs([...tabs, newTab])
      setActiveTabId(newTab.id)
      setUsedProjectIds(prev => new Set([...prev, newProject.id]))
    } else {
      // If all projects are used, show a message or reset
      const newTab: TabData = {
        id: Date.now().toString(),
        title: 'All Projects Loaded',
        url: 'about:blank',
        src: '/projects/image-to-sketch.png',
        favicon: '✅',
        description: 'All available projects have been loaded. You can close tabs to free up space for more projects.',
        technologies: ['Portfolio', 'Projects', 'Showcase'],
        github: null,
        demo: null,
        category: 'Info',
        date: 'Now'
      }
      setTabs([...tabs, newTab])
      setActiveTabId(newTab.id)
    }
  }

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (tabs.length === 1) return
    
    const tabToClose = tabs.find(tab => tab.id === tabId)
    const newTabs = tabs.filter(tab => tab.id !== tabId)
    setTabs(newTabs)
    
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0]?.id || '')
    }
    
    // If this was a database project, remove it from usedProjectIds
    if (tabToClose && allProjects.some(project => project.title === tabToClose.title)) {
      const originalProject = allProjects.find(project => project.title === tabToClose.title)
      if (originalProject) {
        setUsedProjectIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(originalProject.id)
          return newSet
        })
      }
    }
  }

  const updateTabUrl = (url: string) => {
    const domain = url.replace(/^https?:\/\//, '').split('/')[0] || url
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url, title: domain || 'New Tab' }
        : tab
    ))
    setIsEditingUrl(false)
  }

  const handleUrlSubmit = (e: React.KeyboardEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      updateTabUrl(urlInput.trim())
      setUrlInput('')
    }
  }

  const refreshPage = () => {
    // Simulate page refresh by updating the timestamp in the image URL
    const currentTab = activeTab
    if (currentTab && currentTab.src) {
      const updatedSrc = currentTab.src.includes('?') 
        ? `${currentTab.src}&t=${Date.now()}`
        : `${currentTab.src}?t=${Date.now()}`
      
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, src: updatedSrc }
          : tab
      ))
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Main Safari Window */}
      <div className="relative bg-white dark:bg-[#262626] rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        
        {/* Title Bar */}
        <div className="h-12 bg-gray-100 dark:bg-[#404040] flex items-center px-4 border-b border-gray-200 dark:border-gray-600">
          {/* Traffic Lights */}
          <div className="flex items-center space-x-2 mr-6">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          {/* Tab Bar */}
          <div className="flex-1 flex items-center">
            <div className="flex items-center space-x-1 mr-4">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`
                    relative px-3 py-1.5 cursor-pointer transition-all duration-200 flex items-center gap-2 min-w-[120px] max-w-[200px] rounded-t-lg
                    ${activeTabId === tab.id 
                      ? 'bg-white dark:bg-[#262626] border-t border-x border-gray-300 dark:border-gray-600 shadow-sm' 
                      : 'bg-gray-200 dark:bg-[#505050] hover:bg-gray-300 dark:hover:bg-[#606060]'
                    }
                  `}
                  onClick={() => setActiveTabId(tab.id)}
                  style={{ zIndex: activeTabId === tab.id ? 10 : 5 - index }}
                >
                  <span className="text-sm">{tab.favicon || '🌐'}</span>
                  <div className="flex-1 truncate">
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {tab.title}
                    </span>
                  </div>
                  {tabs.length > 1 && (
                    <button
                      onClick={(e) => closeTab(tab.id, e)}
                      className="w-4 h-4 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                    >
                      <X size={8} className="text-gray-500 dark:text-gray-400" />
                    </button>
                  )}
                </div>
              ))}
              
              {/* New Tab Button */}
              <button
                onClick={addNewTab}
                className="w-6 h-6 rounded-md hover:bg-gray-200 dark:hover:bg-[#505050] flex items-center justify-center transition-colors"
              >
                <Plus size={12} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="h-12 bg-white dark:bg-[#262626] flex items-center px-4 space-x-3 border-b border-gray-200 dark:border-gray-600">
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#404040] transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-500">
                <path d="M7 2L3 6L7 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#404040] transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-500">
                <path d="M5 2L9 6L5 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={refreshPage}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#404040] transition-colors"
            >
              <RotateCcw size={12} className="text-gray-500" />
            </button>
          </div>

          {/* Address Bar */}
          <div className="flex-1 mx-4">
            <div className="relative">
              <div className="flex items-center bg-gray-100 dark:bg-[#404040] rounded-lg px-3 py-2">
                <div className="w-4 h-4 mr-2 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-400">
                    <path d="M6 1C3.24 1 1 3.24 1 6s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 1c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" fill="currentColor"/>
                    <path d="M4.5 4.5h1v1h-1zm2 0h1v1h-1zm-2 2h1v1h-1zm2 0h1v1h-1z" fill="currentColor"/>
                  </svg>
                </div>
                {isEditingUrl ? (
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onBlur={() => setIsEditingUrl(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUrlSubmit(e)
                      }
                    }}
                    placeholder="Enter URL..."
                    className="w-full bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none flex-1"
                    autoFocus
                  />
                ) : (
                  <div 
                    className="flex-1 text-sm text-gray-600 dark:text-gray-400 cursor-text"
                    onClick={() => {
                      setIsEditingUrl(true)
                      setUrlInput(activeTab?.url || '')
                    }}
                  >
                    {activeTab?.url || 'about:blank'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Share/Menu Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#404040] transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-500">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative" style={{ height: `${height - 96}px` }}>
                     {activeTab?.description ? (
             // Modern Browser-Style Project Details View
             <div className="w-full h-full bg-white dark:bg-gray-900 overflow-hidden">
               {/* Modern Browser Header Bar */}
               <div className="h-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
                 <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                   </svg>
                   <span>Project Details</span>
                 </div>
                 <div className="flex-1"></div>
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                 </div>
               </div>

               {/* Full-Width Content Area */}
               <div className="h-full overflow-y-auto">
                 {/* Hero Section with Project Header */}
                 <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
                   <div className="max-w-7xl mx-auto px-6 py-12">
                     <div className="flex items-start gap-8">
                       {/* Project Icon */}
                       <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center text-4xl shadow-2xl">
                         {activeTab.favicon}
                       </div>
                       
                       {/* Project Info */}
                       <div className="flex-1">
                         <div className="flex items-center gap-4 mb-4">
                           <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                             {activeTab.title}
                           </h1>
                           <div className="flex items-center gap-2">
                             <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                               {activeTab.category}
                             </span>
                             <span className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600">
                               {activeTab.date}
                             </span>
                           </div>
                         </div>
                         
                         {/* Project Stats */}
                         <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                           <div className="flex items-center gap-2">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                             </svg>
                             <span>Duration: {activeTab.date}</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                               <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                             </svg>
                             <span>Status: Completed</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                             </svg>
                             <span>{activeTab.technologies?.length || 0} Technologies</span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Main Content Grid */}
                 <div className="max-w-7xl mx-auto px-6 py-8">
                   <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                     {/* Project Description - Takes 2/3 of the space */}
                     <div className="xl:col-span-3">
                       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                         <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                           <div className="flex items-center gap-3">
                             <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                             </svg>
                             <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project Overview</h2>
                           </div>
                         </div>
                         <div className="p-6">
                           <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                             {activeTab.description}
                           </p>
                         </div>
                       </div>
                     </div>

                     {/* Sidebar - Takes 1/3 of the space */}
                     <div className="xl:col-span-1 space-y-6">
                       {/* Quick Actions */}
                       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                         <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 px-4 py-3 border-b border-green-200 dark:border-green-700">
                           <div className="flex items-center gap-2">
                             <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                             </svg>
                             <span className="text-sm font-semibold text-green-800 dark:text-green-200">Quick Actions</span>
                           </div>
                         </div>
                         <div className="p-4 space-y-3">
                           {activeTab.github && (
                             <a
                               href={activeTab.github}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-3 w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                             >
                               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                               </svg>
                               <span className="text-sm">View Code</span>
                             </a>
                           )}
                           {activeTab.demo && (
                             <a
                               href={activeTab.demo}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-3 w-full bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                             >
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                               </svg>
                               <span className="text-sm">Live Demo</span>
                             </a>
                           )}
                         </div>
                       </div>

                       {/* Key Technologies */}
                       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                         <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 px-4 py-3 border-b border-purple-200 dark:border-purple-700">
                           <div className="flex items-center gap-2">
                             <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                             </svg>
                             <span className="text-sm font-semibold text-purple-800 dark:text-purple-200">Key Technologies</span>
                           </div>
                         </div>
                         <div className="p-4">
                           <div className="space-y-2">
                             {activeTab.technologies && activeTab.technologies.slice(0, 8).map((tech, index) => (
                               <div key={index} className="flex items-center gap-2">
                                 <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                 <span className="text-sm text-gray-700 dark:text-gray-300">{tech}</span>
                               </div>
                             ))}
                             {activeTab.technologies && activeTab.technologies.length > 8 && (
                               <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-600">
                                 +{activeTab.technologies.length - 8} more technologies
                               </div>
                             )}
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Full Technology Stack */}
                   {activeTab.technologies && activeTab.technologies.length > 0 && (
                     <div className="mt-8">
                       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                         <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 px-6 py-4 border-b border-indigo-200 dark:border-indigo-700">
                           <div className="flex items-center gap-3">
                             <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                             </svg>
                             <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">Complete Technology Stack</h3>
                           </div>
                         </div>
                         <div className="p-6">
                           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                             {activeTab.technologies.map((tech, index) => (
                               <div
                                 key={index}
                                 className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-center transition-all duration-200 hover:shadow-md hover:scale-105 hover:border-indigo-300 dark:hover:border-indigo-600"
                               >
                                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                   {tech}
                                 </span>
                               </div>
                             ))}
                           </div>
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             </div>
           ) : (
            // Default Browser View
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${activeTab?.src || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=750&fit=crop'})`,
              }}
            >
                             {(!activeTab?.src || activeTab.url === 'about:blank') && (
                 <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-[#1a1a1a]">
                   <div className="text-center max-w-md mx-auto px-6">
                     <div className="text-6xl mb-6">🚀</div>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                       Welcome to My Project Showcase!
                     </h3>
                     <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                       Click the <span className="font-semibold text-blue-600 dark:text-blue-400">"+" button</span> above to explore my projects from the database.
                     </p>
                     <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                       <div className="flex items-center gap-3 mb-2">
                         <span className="text-blue-600 dark:text-blue-400">💡</span>
                         <span className="font-semibold text-blue-800 dark:text-blue-200">How to explore:</span>
                       </div>
                       <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                         <li>• Click the <span className="font-mono">+</span> button to add a new project</li>
                         <li>• Switch between tabs to view different projects</li>
                         <li>• Close tabs to free up space for more projects</li>
                         <li>• All 11 projects are available from my database</li>
                       </ul>
                     </div>
                     <div className="text-xs text-gray-500 dark:text-gray-400">
                       Projects are loaded dynamically from my Neon database
                     </div>
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Demo Component
export function SafariTabsDemo() {
  const sampleTabs: TabData[] = [
    {
      id: '1',
      title: 'Magic UI Design',
      url: 'magicui.design',
      src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=750&fit=crop',
      favicon: '🎨'
    },
    {
      id: '2',
      title: 'Unsplash Photos',
      url: 'unsplash.com',
      src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=750&fit=crop',
      favicon: '📸'
    },
    {
      id: '3',
      title: 'GitHub',
      url: 'github.com',
      src: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&h=750&fit=crop',
      favicon: '🐙'
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Safari Browser with Tabs</h2>
        <p className="text-gray-600 dark:text-gray-400">Interactive Safari browser mockup with full tab management</p>
      </div>
      
      <SafariWithTabs 
        initialTabs={sampleTabs}
        className="w-full"
        height={600}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">✨ Features</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Multiple tabs with close functionality</li>
            <li>• Add new tabs with + button</li>
            <li>• Editable address bar</li>
            <li>• Realistic browser controls</li>
            <li>• Custom favicons per tab</li>
            <li>• Refresh functionality</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">🎯 Usage</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Click tabs to switch between them</li>
            <li>• Click X to close tabs</li>
            <li>• Click + to add new tabs</li>
            <li>• Click address bar to edit URL</li>
            <li>• Use refresh button to reload</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SafariWithTabs 