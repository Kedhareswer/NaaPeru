'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, MessageSquare, Users, Check, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface TimeSlot {
  day: string
  date: string
  slots: {
    time: string
    available: boolean
  }[]
}

interface AvailabilityProps {
  onScheduleMeeting?: () => void
}

const availabilityData: TimeSlot[] = [
  {
    day: 'Monday',
    date: '2023-11-20',
    slots: [
      { time: '09:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true },
      { time: '02:00 PM', available: false },
      { time: '03:00 PM', available: true },
      { time: '04:00 PM', available: false },
    ]
  },
  {
    day: 'Tuesday',
    date: '2023-11-21',
    slots: [
      { time: '09:00 AM', available: false },
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: false },
      { time: '02:00 PM', available: true },
      { time: '03:00 PM', available: false },
      { time: '04:00 PM', available: true },
    ]
  },
  {
    day: 'Wednesday',
    date: '2023-11-22',
    slots: [
      { time: '09:00 AM', available: true },
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: false },
      { time: '01:00 PM', available: false },
      { time: '02:00 PM', available: true },
      { time: '03:00 PM', available: true },
      { time: '04:00 PM', available: false },
    ]
  },
  {
    day: 'Thursday',
    date: '2023-11-23',
    slots: [
      { time: '09:00 AM', available: false },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: true },
      { time: '01:00 PM', available: true },
      { time: '02:00 PM', available: false },
      { time: '03:00 PM', available: true },
      { time: '04:00 PM', available: true },
    ]
  },
  {
    day: 'Friday',
    date: '2023-11-24',
    slots: [
      { time: '09:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: false },
      { time: '01:00 PM', available: true },
      { time: '02:00 PM', available: true },
      { time: '03:00 PM', available: false },
      { time: '04:00 PM', available: true },
    ]
  },
]

export default function AvailabilityStatus({ onScheduleMeeting }: AvailabilityProps) {
  const [currentStatus, setCurrentStatus] = useState<'available' | 'busy' | 'away'>('available')
  const [selectedDay, setSelectedDay] = useState<string>(availabilityData[0].day)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  
  // Simulate real-time status changes
  useEffect(() => {
    const statusOptions: Array<'available' | 'busy' | 'away'> = ['available', 'busy', 'away']
    const interval = setInterval(() => {
      // In a real implementation, this would fetch the current status from an API
      const randomIndex = Math.floor(Math.random() * 10)
      if (randomIndex < 7) { // 70% chance to be available
        setCurrentStatus('available')
      } else if (randomIndex < 9) { // 20% chance to be busy
        setCurrentStatus('busy')
      } else { // 10% chance to be away
        setCurrentStatus('away')
      }
    }, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [])
  
  const getStatusColor = () => {
    switch (currentStatus) {
      case 'available':
        return 'bg-green-500'
      case 'busy':
        return 'bg-red-500'
      case 'away':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }
  
  const getStatusText = () => {
    switch (currentStatus) {
      case 'available':
        return 'Available for meetings'
      case 'busy':
        return 'In a meeting'
      case 'away':
        return 'Away from desk'
      default:
        return 'Status unknown'
    }
  }
  
  const selectedDayData = availabilityData.find(day => day.day === selectedDay) || availabilityData[0]
  const availableSlots = selectedDayData.slots.filter(slot => slot.available).length
  
  return (
    <Card className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Real-time Availability</h3>
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full ${getStatusColor()} mr-2`}></div>
            <span className="text-sm">{getStatusText()}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-500">Current time: {currentTime}</span>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => setOpenDialog(true)}>
                View Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Weekly Availability</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue={availabilityData[0].day} className="w-full">
                <TabsList className="grid grid-cols-5 mb-4">
                  {availabilityData.map((day) => (
                    <TabsTrigger 
                      key={day.day} 
                      value={day.day}
                      onClick={() => setSelectedDay(day.day)}
                    >
                      {day.day.substring(0, 3)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {availabilityData.map((day) => (
                  <TabsContent key={day.day} value={day.day} className="space-y-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <h4 className="font-medium">{day.day}, {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {day.slots.map((slot, index) => (
                        <div 
                          key={index}
                          className={`p-2 rounded-md border flex items-center justify-between ${slot.available ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                        >
                          <span className="text-sm">{slot.time}</span>
                          {slot.available ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button 
                        onClick={() => {
                          setOpenDialog(false)
                          onScheduleMeeting && onScheduleMeeting()
                        }}
                      >
                        Schedule a Meeting
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{selectedDay}</span>
            </div>
            <div className="text-sm text-gray-500">
              {availableSlots} slots available
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {selectedDayData.slots.slice(0, 4).map((slot, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-2 text-center rounded-md text-xs ${slot.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500 line-through'}`}
              >
                {slot.time}
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-3">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs">Available</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-300 mr-1"></div>
                <span className="text-xs">Booked</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs"
              onClick={() => onScheduleMeeting && onScheduleMeeting()}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Schedule
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            <Button variant="ghost" size="sm" className="text-xs flex items-center">
              <Video className="h-3 w-3 mr-1" />
              Video Call
            </Button>
            <Button variant="ghost" size="sm" className="text-xs flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              Chat
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>Last updated just now</span>
          </div>
        </div>
      </div>
    </Card>
  )
}