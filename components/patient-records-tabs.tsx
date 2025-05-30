"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MedicalRecordUpload } from "@/components/medical-record-upload"
import { AppointmentScheduler } from "@/components/appointment-scheduler"
import { PatientRecordsList } from "@/components/patient-records-list"
import type { PatientRecord } from "@/types/patient"

interface PatientRecordsTabsProps {
  patient: PatientRecord
}

export function PatientRecordsTabs({ patient }: PatientRecordsTabsProps) {
  return (
    <Tabs defaultValue="records" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="records">Records</TabsTrigger>
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="appointments">Appointments</TabsTrigger>
      </TabsList>
      <TabsContent value="records">
        <PatientRecordsList patientId={patient.id} />
      </TabsContent>
      <TabsContent value="upload">
        <MedicalRecordUpload patientId={patient.id} />
      </TabsContent>
      <TabsContent value="appointments">
        <AppointmentScheduler patientId={patient.id} />
      </TabsContent>
    </Tabs>
  )
}
