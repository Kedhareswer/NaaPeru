'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, LineChart, PieChart, Activity, TrendingUp, TrendingDown, RefreshCw, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

interface StatisticData {
  id: string
  title: string
  description: string
  value: number
  change: number
  timeframe: string
  trend: 'up' | 'down' | 'neutral'
  chartData: any[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

// Utility functions moved outside of component
const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case 'down':
      return <TrendingDown className="h-4 w-4 text-red-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

const getTrendColor = (trend: 'up' | 'down' | 'neutral', isPositive: boolean = true) => {
  if (trend === 'up') {
    return isPositive ? 'text-green-500' : 'text-red-500'
  } else if (trend === 'down') {
    return isPositive ? 'text-red-500' : 'text-green-500'
  }
  return 'text-gray-500'
}

const mockStatistics: StatisticData[] = [
  {
    id: 'model-accuracy',
    title: 'Model Accuracy',
    description: 'Average accuracy across all deployed models',
    value: 94.7,
    change: 2.3,
    timeframe: 'Last 30 days',
    trend: 'up',
    chartData: [
      { name: 'Jan', value: 89.2 },
      { name: 'Feb', value: 90.1 },
      { name: 'Mar', value: 91.5 },
      { name: 'Apr', value: 90.8 },
      { name: 'May', value: 92.3 },
      { name: 'Jun', value: 93.1 },
      { name: 'Jul', value: 92.4 },
      { name: 'Aug', value: 94.7 }
    ]
  },
  {
    id: 'predictions-made',
    title: 'Predictions Made',
    description: 'Total number of predictions across all models',
    value: 1243789,
    change: 12.8,
    timeframe: 'Last 7 days',
    trend: 'up',
    chartData: [
      { name: 'Mon', value: 156432 },
      { name: 'Tue', value: 142567 },
      { name: 'Wed', value: 168921 },
      { name: 'Thu', value: 189654 },
      { name: 'Fri', value: 201432 },
      { name: 'Sat', value: 187654 },
      { name: 'Sun', value: 197129 }
    ]
  },
  {
    id: 'processing-time',
    title: 'Avg. Processing Time',
    description: 'Average time to process a single prediction',
    value: 0.23,
    change: -0.05,
    timeframe: 'Last 24 hours',
    trend: 'down',
    chartData: [
      { name: '00:00', value: 0.31 },
      { name: '04:00', value: 0.29 },
      { name: '08:00', value: 0.27 },
      { name: '12:00', value: 0.25 },
      { name: '16:00', value: 0.24 },
      { name: '20:00', value: 0.23 }
    ]
  },
  {
    id: 'model-distribution',
    title: 'Model Usage Distribution',
    description: 'Distribution of predictions by model type',
    value: 100,
    change: 0,
    timeframe: 'Current',
    trend: 'neutral',
    chartData: [
      { name: 'Classification', value: 45 },
      { name: 'Regression', value: 25 },
      { name: 'NLP', value: 15 },
      { name: 'Computer Vision', value: 10 },
      { name: 'Time Series', value: 5 }
    ]
  }
]

export default function LiveStatistics() {
  const [statistics, setStatistics] = useState<StatisticData[]>(mockStatistics)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('overview')
  
  // Simulate real-time updates
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setLastUpdated(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      }))
    }
    
    updateTime()
    
    const interval = setInterval(() => {
      updateTime()
      
      // In a real implementation, this would fetch fresh data from an API
      setStatistics(prevStats => {
        return prevStats.map(stat => {
          if (stat.id === 'model-accuracy') {
            const lastValue = stat.chartData[stat.chartData.length - 1].value
            const newValue = Math.min(99.9, lastValue + (Math.random() * 0.4 - 0.2))
            return {
              ...stat,
              value: parseFloat(newValue.toFixed(1)),
              change: parseFloat((newValue - lastValue).toFixed(1)),
              trend: newValue >= lastValue ? 'up' : 'down'
            }
          } else if (stat.id === 'predictions-made') {
            const newValue = stat.value + Math.floor(Math.random() * 1000)
            return {
              ...stat,
              value: newValue,
              change: parseFloat(((newValue - stat.value) / stat.value * 100).toFixed(1)),
              trend: 'up'
            }
          } else if (stat.id === 'processing-time') {
            const lastValue = stat.chartData[stat.chartData.length - 1].value
            const newValue = Math.max(0.1, lastValue + (Math.random() * 0.02 - 0.01))
            return {
              ...stat,
              value: parseFloat(newValue.toFixed(2)),
              change: parseFloat((newValue - lastValue).toFixed(2)),
              trend: newValue <= lastValue ? 'down' : 'up'
            }
          }
          return stat
        })
      })
    }, 5000) // Update every 5 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  const handleRefresh = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setStatistics(prevStats => {
        return prevStats.map(stat => {
          if (stat.id === 'model-accuracy') {
            const newValue = Math.min(99.9, stat.value + (Math.random() * 1 - 0.5))
            return {
              ...stat,
              value: parseFloat(newValue.toFixed(1)),
              change: parseFloat((newValue - stat.value).toFixed(1)),
              trend: newValue >= stat.value ? 'up' : 'down'
            }
          } else if (stat.id === 'predictions-made') {
            const newValue = stat.value + Math.floor(Math.random() * 5000)
            return {
              ...stat,
              value: newValue,
              change: parseFloat(((newValue - stat.value) / stat.value * 100).toFixed(1)),
              trend: 'up'
            }
          } else if (stat.id === 'processing-time') {
            const newValue = Math.max(0.1, stat.value + (Math.random() * 0.05 - 0.03))
            return {
              ...stat,
              value: parseFloat(newValue.toFixed(2)),
              change: parseFloat((newValue - stat.value).toFixed(2)),
              trend: newValue <= stat.value ? 'down' : 'up'
            }
          } else if (stat.id === 'model-distribution') {
            return {
              ...stat,
              chartData: stat.chartData.map(item => ({
                ...item,
                value: Math.max(1, item.value + Math.floor(Math.random() * 5 - 2))
              }))
            }
          }
          return stat
        })
      })
      
      const now = new Date()
      setLastUpdated(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      }))
      
      setIsLoading(false)
    }, 1000)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Project Statistics</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Last updated: {lastUpdated || 'Never'}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">
            <Activity className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="models">
            <BarChart className="h-4 w-4 mr-2" />
            Models
          </TabsTrigger>
          <TabsTrigger value="predictions">
            <LineChart className="h-4 w-4 mr-2" />
            Predictions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statistics.map((stat) => (
              <StatisticCard key={stat.id} data={stat} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Model Accuracy Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={statistics.find(s => s.id === 'model-accuracy')?.chartData || []}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[85, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Model Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={statistics.find(s => s.id === 'model-distribution')?.chartData || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statistics.find(s => s.id === 'model-distribution')?.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={[
                      { name: 'CNN Image Classifier', accuracy: 96.7, latency: 0.21 },
                      { name: 'BERT NLP Model', accuracy: 94.2, latency: 0.35 },
                      { name: 'Random Forest', accuracy: 92.8, latency: 0.18 },
                      { name: 'Time Series LSTM', accuracy: 91.5, latency: 0.28 },
                      { name: 'XGBoost Classifier', accuracy: 93.6, latency: 0.15 }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="accuracy" name="Accuracy (%)" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="latency" name="Latency (s)" fill="#82ca9d" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Model Training Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">CNN Image Classifier v2</span>
                      <span className="text-sm text-gray-500">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">BERT Fine-tuning</span>
                      <span className="text-sm text-gray-500">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Time Series Forecaster</span>
                      <span className="text-sm text-gray-500">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Recommendation Engine</span>
                      <span className="text-sm text-gray-500">63%</span>
                    </div>
                    <Progress value={63} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Model Deployment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md border border-green-200">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium">CNN Image Classifier</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Production
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md border border-green-200">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium">Random Forest Classifier</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Production
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md border border-yellow-200">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="font-medium">BERT NLP Model</span>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Staging
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md border border-blue-200">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="font-medium">Time Series LSTM</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      Development
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Predictions Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={statistics.find(s => s.id === 'predictions-made')?.chartData || []}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Predictions" fill="#8884d8" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Processing Time Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={statistics.find(s => s.id === 'processing-time')?.chartData || []}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Processing Time (s)"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prediction Success Rate by Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">CNN Image Classifier</span>
                    <span className="text-sm text-gray-500">99.7%</span>
                  </div>
                  <Progress value={99.7} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">BERT NLP Model</span>
                    <span className="text-sm text-gray-500">98.2%</span>
                  </div>
                  <Progress value={98.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Random Forest Classifier</span>
                    <span className="text-sm text-gray-500">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Time Series LSTM</span>
                    <span className="text-sm text-gray-500">97.5%</span>
                  </div>
                  <Progress value={97.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">XGBoost Classifier</span>
                    <span className="text-sm text-gray-500">99.8%</span>
                  </div>
                  <Progress value={99.8} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface StatisticCardProps {
  data: StatisticData
}

function StatisticCard({ data }: StatisticCardProps) {
  const { title, description, value, change, timeframe, trend, id } = data
  
  // Determine if a downward trend is positive (e.g., for processing time, lower is better)
  const isDownwardPositive = id === 'processing-time'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {getTrendIcon(trend)}
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold">
              {id === 'model-accuracy' ? `${value}%` : 
               id === 'processing-time' ? `${value}s` : 
               formatNumber(value)}
            </div>
            
            <div className="flex items-center text-sm">
              <span className={getTrendColor(trend, trend === 'down' ? isDownwardPositive : true)}>
                {change > 0 ? '+' : ''}{id === 'model-accuracy' || id === 'processing-time' ? change : `${change}%`}
              </span>
              <span className="text-gray-500 ml-2">{timeframe}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-xs text-gray-500">{description}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}