"use server"

import type { PatientRecord, MedicalNote, Appointment, MedicalFile } from "@/types/patient"

// Demo data - in a real app, this would connect to a database
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

const DEMO_NOTES: MedicalNote[] = [
  {
    id: "101",
    patientId: "1",
    date: "2023-11-10",
    provider: "Dr. Emily Chen",
    content: "Patient reports improved blood pressure control. Medication adjusted.",
    tags: ["follow-up", "medication adjustment"],
  },
  {
    id: "102",
    patientId: "2",
    date: "2023-12-05",
    provider: "Dr. Michael Wong",
    content: "Seasonal allergies flaring up. Prescribed additional antihistamine.",
    tags: ["allergies", "prescription"],
  },
]

const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: "201",
    patientId: "1",
    date: "2024-02-15",
    time: "10:00 AM",
    provider: "Dr. Emily Chen",
    reason: "Diabetes follow-up",
    status: "scheduled",
  },
  {
    id: "202",
    patientId: "3",
    date: "2024-01-15",
    time: "2:30 PM",
    provider: "Dr. James Wilson",
    reason: "Joint pain evaluation",
    status: "completed",
  },
]

// In-memory storage for uploaded files (in a real app, this would be a database)
const DEMO_FILES: MedicalFile[] = []

export async function getPatients(searchQuery?: string): Promise<PatientRecord[]> {
  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!searchQuery) return DEMO_PATIENTS

  return DEMO_PATIENTS.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.medicalRecordNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )
}

export async function getPatientById(id: string): Promise<PatientRecord | null> {
  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return DEMO_PATIENTS.find((patient) => patient.id === id) || null
}

export async function getPatientNotes(patientId: string): Promise<MedicalNote[]> {
  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  return DEMO_NOTES.filter((note) => note.patientId === patientId)
}

export async function getPatientAppointments(patientId: string): Promise<Appointment[]> {
  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  return DEMO_APPOINTMENTS.filter((appointment) => appointment.patientId === patientId)
}

export async function createAppointment(appointment: Omit<Appointment, "id">): Promise<Appointment> {
  // Simulate database operation delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newAppointment: Appointment = {
    ...appointment,
    id: `app-${Date.now()}`,
  }

  // In a real app, this would add to the database
  DEMO_APPOINTMENTS.push(newAppointment)

  return newAppointment
}

export async function addMedicalNote(note: Omit<MedicalNote, "id">): Promise<MedicalNote> {
  // Simulate database operation delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const newNote: MedicalNote = {
    ...note,
    id: `note-${Date.now()}`,
  }

  // In a real app, this would add to the database
  DEMO_NOTES.push(newNote)

  return newNote
}

export async function uploadMedicalRecord(formData: FormData): Promise<MedicalFile[]> {
  // Simulate file upload delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const patientId = formData.get("patientId") as string
  const description = formData.get("description") as string
  const files = formData.getAll("files") as File[]

  // In a real app, this would upload files to storage and save metadata to database
  const uploadedFiles: MedicalFile[] = []

  for (const file of files) {
    const newFile: MedicalFile = {
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      patientId,
      name: file.name,
      type: file.type,
      size: file.size,
      description,
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file), // In a real app, this would be a storage URL
    }

    uploadedFiles.push(newFile)
    DEMO_FILES.push(newFile)
  }

  return uploadedFiles
}

export async function getPatientFiles(patientId: string): Promise<MedicalFile[]> {
  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  return DEMO_FILES.filter((file) => file.patientId === patientId)
}
