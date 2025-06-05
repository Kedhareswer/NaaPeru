'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, MapPin, User, Mail, MessageSquare, Check, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

const timeSlots: TimeSlot[] = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '12:00 PM', available: true },
  { id: '5', time: '01:00 PM', available: true },
  { id: '6', time: '02:00 PM', available: false },
  { id: '7', time: '03:00 PM', available: true },
  { id: '8', time: '04:00 PM', available: true },
  { id: '9', time: '05:00 PM', available: false }
]

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
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !selectedTimeSlot || !selectedMeetingType || !name || !email || !topic) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // In a real implementation, this would call an API to schedule the meeting
      // For demo purposes, we're simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
      setIsError(false)
    } catch (error) {
      setIsSuccess(false)
      setIsError(true)
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
            We couldn't schedule your meeting. Please try again or contact directly via email.
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
                          initialFocus
                          disabled={(date) => {
                            // Disable past dates and weekends
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            const day = date.getDay()
                            return date < today || day === 0 || day === 6
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          type="button"
                          variant={selectedTimeSlot?.id === slot.id ? 'default' : 'outline'}
                          className={`${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!slot.available}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {meetingTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <Card 
                          key={type.id}
                          className={`p-4 cursor-pointer transition-all ${selectedMeetingType?.id === type.id ? 'ring-2 ring-blue-500 shadow-md' : 'hover:shadow-md'}`}
                          onClick={() => setSelectedMeetingType(type)}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                              <Icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <h4 className="font-medium">{type.name}</h4>
                            <p className="text-sm text-gray-500">{type.duration}</p>
                          </div>
                        </Card>
                      )
                    })}
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