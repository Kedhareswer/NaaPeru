'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data for project metrics
const projectData = [
  {
    name: 'Image to Sketch',
    accuracy: 90,
    performance: 85,
    complexity: 70,
    technologies: [
      { name: 'Python', value: 45 },
      { name: 'TensorFlow', value: 30 },
      { name: 'OpenCV', value: 15 },
      { name: 'Other', value: 10 }
    ],
    timeline: [
      { month: 'Jan', progress: 10 },
      { month: 'Feb', progress: 25 },
      { month: 'Mar', progress: 45 },
      { month: 'Apr', progress: 70 },
      { month: 'May', progress: 100 }
    ]
  },
  {
    name: 'Endoscopy Image Enhancement',
    accuracy: 85,
    performance: 80,
    complexity: 90,
    technologies: [
      { name: 'Python', value: 40 },
      { name: 'Deep Learning', value: 35 },
      { name: 'Medical Imaging', value: 20 },
      { name: 'Other', value: 5 }
    ],
    timeline: [
      { month: 'Feb', progress: 15 },
      { month: 'Mar', progress: 30 },
      { month: 'Apr', progress: 60 },
      { month: 'May', progress: 90 },
      { month: 'Jun', progress: 100 }
    ]
  },
  {
    name: 'Digit Classifier',
    accuracy: 99,
    performance: 95,
    complexity: 65,
    technologies: [
      { name: 'TensorFlow', value: 50 },
      { name: 'Next.js', value: 25 },
      { name: 'FastAPI', value: 20 },
      { name: 'Other', value: 5 }
    ],
    timeline: [
      { month: 'Mar', progress: 20 },
      { month: 'Apr', progress: 40 },
      { month: 'May', progress: 75 },
      { month: 'Jun', progress: 100 }
    ]
  },
  {
    name: 'Collaborative Research Hub',
    accuracy: 80,
    performance: 90,
    complexity: 85,
    technologies: [
      { name: 'React', value: 40 },
      { name: 'Node.js', value: 30 },
      { name: 'WebSocket', value: 20 },
      { name: 'Other', value: 10 }
    ],
    timeline: [
      { month: 'Jan', progress: 5 },
      { month: 'Feb', progress: 20 },
      { month: 'Mar', progress: 50 },
      { month: 'Apr', progress: 80 },
      { month: 'May', progress: 100 }
    ]
  }
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function ProjectMetrics() {
  const [selectedProject, setSelectedProject] = useState(projectData[0])

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium mb-6">Project Metrics & Analytics</h3>
      
      <div className="mb-6">
        <select 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedProject.name}
          onChange={(e) => {
            const selected = projectData.find(p => p.name === e.target.value)
            if (selected) setSelectedProject(selected)
          }}
        >
          {projectData.map((project) => (
            <option key={project.name} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="technologies">Technologies</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Accuracy', value: selectedProject.accuracy },
                  { name: 'Performance', value: selectedProject.performance },
                  { name: 'Complexity', value: selectedProject.complexity }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Value']} />
                <Bar dataKey="value" fill="#3b82f6" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="technologies" className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={selectedProject.technologies}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1500}
                >
                  {selectedProject.technologies.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="timeline" className="pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={selectedProject.timeline}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>Interactive visualization of project metrics and performance indicators</p>
      </div>
    </div>
  )
}
