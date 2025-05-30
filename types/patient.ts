export interface PatientRecord {
  id: string
  name: string
  dateOfBirth: string
  medicalRecordNumber: string
  lastVisit: string
  conditions: string[]
  medications: string[]
}

export interface MedicalNote {
  id: string
  patientId: string
  date: string
  provider: string
  content: string
  tags: string[]
}

export interface Appointment {
  id: string
  patientId: string
  date: string
  time: string
  provider: string
  reason: string
  status: "scheduled" | "completed" | "cancelled"
}

export interface MedicalFile {
  id: string
  patientId: string
  name: string
  type: string
  size: number
  description: string
  uploadDate: string
  url: string
}

export interface Language {
  code: string
  name: string
  nativeName: string
  voiceSupported: boolean
  recognitionSupported: boolean
}
