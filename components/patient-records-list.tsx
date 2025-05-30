"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"
import { getPatientNotes, getPatientAppointments } from "@/actions/patient-records"
import type { MedicalNote, Appointment } from "@/types/patient"
import { format } from "date-fns"

interface PatientRecordsListProps {
  patientId: string
}

export function PatientRecordsList({ patientId }: PatientRecordsListProps) {
  const [notes, setNotes] = useState<MedicalNote[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [notesData, appointmentsData] = await Promise.all([
          getPatientNotes(patientId),
          getPatientAppointments(patientId),
        ])
        setNotes(notesData)
        setAppointments(appointmentsData)
      } catch (error) {
        console.error("Error loading patient data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [patientId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Records</CardTitle>
        <CardDescription>View and manage patient medical records and appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notes">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notes">Medical Notes</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="notes">
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <p className="text-slate-500">Loading notes...</p>
              </div>
            ) : notes.length > 0 ? (
              <div className="space-y-4 pt-4">
                {notes.map((note) => (
                  <div key={note.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="font-medium">{format(new Date(note.date), "PPP")}</div>
                      <div className="text-sm text-slate-500">{note.provider}</div>
                    </div>
                    <p className="text-sm">{note.content}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center">
                <p className="text-slate-500">No medical notes found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="appointments">
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <p className="text-slate-500">Loading appointments...</p>
              </div>
            ) : appointments.length > 0 ? (
              <div className="space-y-4 pt-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`rounded-lg border p-4 ${
                      appointment.status === "completed"
                        ? "border-slate-200 bg-slate-50"
                        : appointment.status === "cancelled"
                          ? "border-red-100 bg-red-50"
                          : "border-green-100 bg-green-50"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="font-medium">
                        {format(new Date(appointment.date), "PPP")} at {appointment.time}
                      </div>
                      <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          appointment.status === "completed"
                            ? "bg-slate-200 text-slate-800"
                            : appointment.status === "cancelled"
                              ? "bg-red-200 text-red-800"
                              : "bg-green-200 text-green-800"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </div>
                    </div>
                    <div className="mb-2 text-sm">
                      <span className="font-medium">Provider:</span> {appointment.provider}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Reason:</span> {appointment.reason}
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      {appointment.status === "scheduled" && (
                        <>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <FileText className="mr-1 h-3 w-3" />
                          View Notes
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center">
                <p className="text-slate-500">No appointments found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
