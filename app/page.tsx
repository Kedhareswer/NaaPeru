import { HealthcareChat } from "@/components/healthcare-chat"
import { PatientRecordsSidebar } from "@/components/patient-records-sidebar"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <PatientRecordsSidebar />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-800">Healthcare Assistant</h1>
            <p className="text-slate-600">Voice-enabled AI assistant for patient support and record management</p>
          </div>
          <HealthcareChat />
        </div>
      </main>
    </div>
  )
}
