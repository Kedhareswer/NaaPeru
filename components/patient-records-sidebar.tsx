"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, FilePlus, FileText, Search, User, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useMobile } from "@/hooks/use-mobile"
import { PatientRecordsTabs } from "@/components/patient-records-tabs"
import type { PatientRecord } from "@/types/patient"
import { cn } from "@/lib/utils"

const DEMO_PATIENTS: PatientRecord[] = [
  {
    id: "1",
    name: "John Smith",
    dateOfBirth: "1985-05-15",
    medicalRecordNumber: "MRN12345",
    lastVisit: "2023-11-10",
    conditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    dateOfBirth: "1990-08-22",
    medicalRecordNumber: "MRN67890",
    lastVisit: "2023-12-05",
    conditions: ["Asthma", "Allergic Rhinitis"],
    medications: ["Albuterol", "Flonase"],
  },
  {
    id: "3",
    name: "Robert Davis",
    dateOfBirth: "1978-03-30",
    medicalRecordNumber: "MRN24680",
    lastVisit: "2024-01-15",
    conditions: ["Osteoarthritis", "GERD"],
    medications: ["Celebrex", "Omeprazole"],
  },
]

export function PatientRecordsSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null)
  const isMobile = useMobile()

  const filteredPatients = DEMO_PATIENTS.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSidebar = () => setIsOpen(!isOpen)

  if (isMobile && isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Patient Records</h2>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          {renderSidebarContent()}
        </div>
      </div>
    )
  }

  return (
    <>
      {!isOpen && (
        <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40" onClick={toggleSidebar}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
      <div className={cn("border-r bg-white transition-all duration-300", isOpen ? "w-80" : "w-0 -translate-x-full")}>
        {isOpen && renderSidebarContent()}
      </div>
    </>
  )

  function renderSidebarContent() {
    return (
      <>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              All Patients
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <FilePlus className="mr-2 h-4 w-4" />
              New Record
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <Button
                  key={patient.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start font-normal",
                    selectedPatient?.id === patient.id && "bg-slate-100",
                  )}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span>{patient.name}</span>
                    <span className="text-xs text-slate-500">MRN: {patient.medicalRecordNumber}</span>
                  </div>
                </Button>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-slate-500">No patients found</div>
            )}
          </div>
        </ScrollArea>

        {selectedPatient && (
          <div className="border-t p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-medium">{selectedPatient.name}</h3>
              <Button variant="ghost" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View Full Record
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-slate-500">DOB:</span> {selectedPatient.dateOfBirth}
              </div>
              <div>
                <span className="text-slate-500">Last Visit:</span> {selectedPatient.lastVisit}
              </div>
              <div>
                <span className="text-slate-500">Conditions:</span> {selectedPatient.conditions.join(", ")}
              </div>
              <div>
                <span className="text-slate-500">Medications:</span> {selectedPatient.medications.join(", ")}
              </div>
            </div>

            <div className="mt-4">
              <PatientRecordsTabs patient={selectedPatient} />
            </div>
          </div>
        )}
      </>
    )
  }
}
