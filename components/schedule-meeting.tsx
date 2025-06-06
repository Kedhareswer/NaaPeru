'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, MapPin, User, Mail, MessageSquare, Check, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format, addDays, isAfter, isBefore, startOfDay } from 'date-fns'
import { useCalendar } from '@/hooks/use-calendar'

interface TimeSlot {
  id: string
  time: string
  available: boolean
  date?: string
}

// Interface for API meeting type
interface ApiMeetingType {
  id: string
  name: string
  duration: string
  icon: string
}

// Interface for component meeting type with React.ElementType for icon
interface MeetingType {
  id: string
  name: string
  duration: string
  icon: React.ElementType
}

const meetingTypes: MeetingType[] = [
  { id: 'quick', name: 'Quick Chat', duration: '15 min', icon: MessageSquare },
  { id: 'consultation', name: 'Project Consultation', duration: '30 min', icon: User },
  { id: 'interview', name: 'Interview Discussion', duration: '45 min', icon: User }
]

export default function ScheduleMeeting() {
  const { availableDays, timeSlots, fetchTimeSlotsForDate, meetingTypes, bookAppointment, isLoading, error } = useCalendar()
  // Convert API meeting types to component format with proper React icons
  const formattedMeetingTypes: MeetingType[] = meetingTypes.map(type => {
    // Map string icon names to React components
    let IconComponent: React.ElementType = MessageSquare;
    if (type.icon === 'User') IconComponent = User;
    if (type.icon === 'MessageSquare') IconComponent = MessageSquare;
    
    return {
      id: type.id,
      name: type.name,
      duration: type.duration,
      icon: IconComponent
    };
  })
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [step, setStep] = useState(1)
  
  // Set min/max date constraints for date picker
  const minDate = startOfDay(new Date())
  const maxDate = addDays(minDate, 30) // Allow booking up to 30 days ahead

  // Fetch available time slots when date changes
  useEffect(() => {
    const loadTimeSlots = async () => {
      if (date) {
        const dateString = format(date, 'yyyy-MM-dd')
        const slots = await fetchTimeSlotsForDate(dateString)
        setAvailableTimeSlots(slots.filter((slot: {id: string, time: string, available: boolean}) => slot.available))
        setSelectedTimeSlot(null) // Reset selection when date changes
      }
    }
    
    loadTimeSlots()
  }, [date, fetchTimeSlotsForDate])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !selectedTimeSlot || !selectedMeetingType || !name || !email || !topic) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await bookAppointment({
        date: format(date, 'yyyy-MM-dd'),
        timeSlot: selectedTimeSlot.id,
        name,
        email,
        meetingType: selectedMeetingType.id,
        topic
      })

      
      setIsSuccess(true)
      setIsError(false)
    } catch (error) {
      setIsSuccess(false)
      setIsError(true)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to book appointment')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setDate(undefined)
    setSelectedTimeSlot(null)
    setSelectedMeetingType(null)
    setName('')
    setEmail('')
    setTopic('')
    setIsSuccess(false)
    setIsError(false)
    setStep(1)
  }

  const nextStep = () => {
    if (step === 1 && (!date || !selectedTimeSlot)) return
    if (step === 2 && !selectedMeetingType) return
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(Math.max(1, step - 1))
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium mb-6 flex items-center">
        <CalendarIcon className="mr-2 h-5 w-5" />
        Schedule a Meeting
      </h3>
      
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h4 className="text-xl font-medium text-gray-900 mb-2">Meeting Scheduled!</h4>
          <p className="text-gray-600 mb-6">
            Your meeting has been scheduled successfully. You will receive a confirmation email shortly.
          </p>
          <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <span className="text-gray-900">{date ? format(date, 'EEEE, MMMM d, yyyy') : ''}</span>
              
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-900">{selectedTimeSlot?.time}</span>
              
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-gray-900">{selectedMeetingType?.name} ({selectedMeetingType?.duration})</span>
              
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <span className="text-gray-900">{topic}</span>
            </div>
          </div>
          <Button onClick={resetForm}>Schedule Another Meeting</Button>
        </motion.div>
      ) : isError ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <h4 className="text-xl font-medium text-gray-900 mb-2">Something went wrong</h4>
          <p className="text-gray-600 mb-6">
            {errorMessage || "We couldn't schedule your meeting. Please try again or contact directly via email."}
          </p>
          <Button onClick={resetForm}>Try Again</Button>
        </motion.div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step === stepNumber ? 'bg-blue-600 text-white' : step > stepNumber ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-full h-1 ${step > stepNumber ? 'bg-green-100' : 'bg-gray-100'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? 'text-gray-900' : 'text-gray-400'}>Select Date & Time</span>
              <span className={step >= 2 ? 'text-gray-900' : 'text-gray-400'}>Meeting Details</span>
              <span className={step >= 3 ? 'text-gray-900' : 'text-gray-400'}>Your Information</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Date and Time Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => {
                            return isAfter(new Date(date), maxDate) || 
                            isBefore(new Date(date), minDate) ||
                            !availableDays.includes(format(new Date(date), 'yyyy-MM-dd'))
                          }}
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    {isLoading ? (
                      <div className="flex items-center justify-center py-6">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                      </div>
                    ) : availableTimeSlots.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        {date ? 'No available times for selected date' : 'Select a date to view available times'}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        {availableTimeSlots.map((slot) => (
                          <Button
                            key={slot.id}
                            type="button"
                            variant="outline"
                            onClick={() => setSelectedTimeSlot(slot)}
                            disabled={!slot.available}
                            className={`justify-start h-auto py-2 px-3 ${selectedTimeSlot?.id === slot.id ? 'border-blue-500 bg-blue-50' : ''}`}
                          >
                            <Clock className="mr-2 h-4 w-4 shrink-0" />
                            <span className="truncate">{slot.time}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!date || !selectedTimeSlot}
                  >
                    Next Step
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Meeting Type */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-6">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700"></div>
                    </div>
                  ) : meetingTypes.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No meeting types available</div>
                  ) : (
                    <div className="space-y-2">
                      {formattedMeetingTypes.map((type) => {
                        // Use the icon component directly
                        const Icon = type.icon
                        
                        return (
                          <Card 
                            key={type.id}
                            className={`p-3 cursor-pointer ${selectedMeetingType?.id === type.id ? 'border-blue-500 bg-blue-50' : ''}`}
                            onClick={() => setSelectedMeetingType(type)}
                          >
                            <div className="flex items-center">
                              <div className="shrink-0 h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                <Icon className="h-5 w-5 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">{type.name}</h4>
                                <p className="text-xs text-gray-500">{type.duration}</p>
                              </div>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={prevStep}
                  >
                    Previous Step
                  </Button>
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!selectedMeetingType}
                  >
                    Next Step
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Personal Information */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="topic">
                      Meeting Topic
                    </label>
                    <textarea
                      id="topic"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="What would you like to discuss?"
                      rows={3}
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={prevStep}
                  >
                    Previous Step
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting || !name || !email || !topic}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Scheduling...
                      </>
                    ) : 'Schedule Meeting'}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>Need immediate assistance? Email directly at <a href="mailto:Kedhareswer.12110626@gmail.com" className="text-blue-600 hover:underline">Kedhareswer.12110626@gmail.com</a></p>
      </div>
    </div>
  )
}
