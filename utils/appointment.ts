interface AppointmentData {
  name: string
  contact: string
  subject: string
  date: string
  time: string
}

export async function sendAppointmentEmail(data: AppointmentData) {
  try {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || "Failed to send appointment request")
    }

    return { success: true, message: result.message }
  } catch (error) {
    console.error("Error sending appointment:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send appointment request",
    }
  }
}
