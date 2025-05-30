"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"
import { createAppointment } from "@/actions/patient-records"
import { toast } from "@/hooks/use-toast"
import type { Appointment } from "@/types/patient"

interface AppointmentSchedulerProps {
  patientId: string
  onScheduled?: (appointment: Appointment) => void
}

const AVAILABLE_TIMES = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
]

const PROVIDERS = [
  { id: "1", name: "Dr. Emily Chen", specialty: "Primary Care" },
  { id: "2", name: "Dr. Michael Wong", specialty: "Cardiology" },
  { id: "3", name: "Dr. James Wilson", specialty: "Orthopedics" },
  { id: "4", name: "Dr. Sarah Johnson", specialty: "Endocrinology" },
]

export function AppointmentScheduler({ patientId, onScheduled }: AppointmentSchedulerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string>("")
  const [provider, setProvider] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !time || !provider || !reason) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to schedule an appointment",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formattedDate = format(date, "yyyy-MM-dd")

      const newAppointment = await createAppointment({
        patientId,
        date: formattedDate,
        time,
        provider: PROVIDERS.find((p) => p.id === provider)?.name || "",
        reason,
        status: "scheduled",
      })

      toast({
        title: "Appointment scheduled",
        description: `Appointment scheduled for ${formattedDate} at ${time}`,
        variant: "default",
      })

      if (onScheduled) {
        onScheduled(newAppointment)
      }

      // Reset form
      setDate(undefined)
      setTime("")
      setProvider("")
      setReason("")
    } catch (error) {
      console.error("Scheduling error:", error)
      toast({
        title: "Scheduling failed",
        description: "There was an error scheduling your appointment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Appointment</CardTitle>
        <CardDescription>Book a new appointment with a healthcare provider</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-slate-500")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    // Disable weekends and past dates
                    const day = date.getDay()
                    const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0))
                    return day === 0 || day === 6 || isPastDate
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Select a time">
                  {time ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </div>
                  ) : (
                    "Select a time"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_TIMES.map((timeSlot) => (
                  <SelectItem key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger id="provider" className="w-full">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {PROVIDERS.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    {doc.name} - {doc.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Textarea
              id="reason"
              placeholder="Briefly describe the reason for your visit..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setDate(undefined)
            setTime("")
            setProvider("")
            setReason("")
          }}
          disabled={isSubmitting}
        >
          Clear
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scheduling...
            </>
          ) : (
            "Schedule Appointment"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
