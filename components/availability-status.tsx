'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, MessageSquare, Users, Check, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useCalendar } from '@/hooks/use-calendar'
import { format } from 'date-fns'

interface AvailabilityProps {
  onScheduleMeeting?: () => void
}

interface CalendarDay {
  day: string
  date: string
  slots: {
    id: string
    time: string
    available: boolean
  }[]
}

export default function AvailabilityStatus({ onScheduleMeeting }: AvailabilityProps) {
  const { status, timeSlots, availableDays, fetchTimeSlotsForDate, isLoading, error } = useCalendar()
  const [openDialog, setOpenDialog] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [calendarData, setCalendarData] = useState<CalendarDay[]>([])
  const [selectedDay, setSelectedDay] = useState<string>('')
  
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
  
  // Transform time slots into calendar days when available days are loaded
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (availableDays.length > 0) {
        const days: CalendarDay[] = [];
        
        for (const dateStr of availableDays) {
          const date = new Date(dateStr);
          const dayOfWeek = format(date, 'EEEE'); // Monday, Tuesday, etc.
          
          const daySlots = await fetchTimeSlotsForDate(dateStr);
          
          days.push({
            day: dayOfWeek,
            date: dateStr,
            slots: daySlots.map((slot: {id: string, time: string, available: boolean}) => ({
              id: slot.id,
              time: slot.time,
              available: slot.available
            }))
          });
        }
        
        setCalendarData(days);
        
        // Select the first day by default
        if (days.length > 0 && !selectedDay) {
          setSelectedDay(days[0].day);
        }
      }
    };
    
    fetchTimeSlots();
  }, [availableDays]);
  
  const getStatusColor = () => {
    switch (status) {
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
    switch (status) {
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
  
  const selectedDayData = calendarData.find(day => day.day === selectedDay) || calendarData[0]
  const availableSlots = selectedDayData?.slots.filter(slot => slot.available).length || 0
  
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
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
              ) : calendarData.length === 0 ? (
                <div className="text-center py-8">No availability found.</div>
              ) : (
                <Tabs defaultValue={calendarData[0]?.day || ''} className="w-full">
                  <TabsList className="grid grid-cols-5 mb-4">
                    {calendarData.map((day) => (
                      <TabsTrigger 
                        key={day.day} 
                        value={day.day}
                        onClick={() => setSelectedDay(day.day)}
                      >
                        {day.day.substring(0, 3)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {calendarData.map((day) => (
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
              <span className="text-sm font-medium">{selectedDay || 'Loading...'}</span>
            </div>
            <div className="text-sm text-gray-500">
              {isLoading ? 'Loading...' : `${availableSlots} slots available`}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {isLoading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="p-2 text-center rounded-md text-xs bg-gray-100 animate-pulse h-6"></div>
              ))
            ) : selectedDayData?.slots.slice(0, 4).map((slot: {id: string, time: string, available: boolean}, index) => (
              <motion.div 
                key={slot.id}
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
