'use client'

import { useState, useEffect } from 'react'
import { TimeSlot, Appointment, MeetingType } from '@/lib/calendar-service'

export const useCalendar = () => {
  const [availableDays, setAvailableDays] = useState<string[]>([])
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [status, setStatus] = useState<'available' | 'busy' | 'away'>('available')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch available days
  const fetchAvailableDays = async () => {
    try {
      const response = await fetch('/api/calendar/availability')
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setAvailableDays(data.availableDays)
      return data.availableDays
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch available days')
      return []
    }
  }

  // Fetch time slots for a specific date
  const fetchTimeSlotsForDate = async (date: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/calendar/availability?date=${date}`)
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setTimeSlots(data.timeSlots)
      return data.timeSlots
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch time slots')
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch meeting types
  const fetchMeetingTypes = async () => {
    try {
      const response = await fetch('/api/calendar/meeting-types')
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setMeetingTypes(data.meetingTypes)
      return data.meetingTypes
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch meeting types')
      return []
    }
  }

  // Fetch current status
  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/calendar/status')
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setStatus(data.status)
      return data.status
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch status')
      return 'available' as const
    }
  }

  // Book an appointment
  const bookAppointment = async (appointmentData: {
    date: string
    timeSlot: string
    name: string
    email: string
    meetingType: string
    topic: string
  }) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/calendar/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      })
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      // Refetch time slots to update availability
      await fetchTimeSlotsForDate(appointmentData.date)
      return data.appointment
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book appointment')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true)
      try {
        await Promise.all([
          fetchAvailableDays(),
          fetchMeetingTypes(),
          fetchStatus()
        ])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize calendar data')
      } finally {
        setIsLoading(false)
      }
    }

    initializeData()
  }, [])

  // Periodically fetch status updates
  useEffect(() => {
    const statusInterval = setInterval(() => {
      fetchStatus()
    }, 30000) // every 30 seconds
    
    return () => clearInterval(statusInterval)
  }, [])

  return {
    availableDays,
    timeSlots,
    meetingTypes,
    appointments,
    status,
    isLoading,
    error,
    fetchAvailableDays,
    fetchTimeSlotsForDate,
    fetchMeetingTypes,
    fetchStatus,
    bookAppointment,
  }
}
