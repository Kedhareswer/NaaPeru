import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, contact, subject, date, time } = await request.json()

    // Validate required fields
    if (!name?.trim() || !contact?.trim() || !subject?.trim() || !date?.trim() || !time?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format if contact is email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmail = emailRegex.test(contact)

    if (!isEmail && !/^\+?[\d\s-()]+$/.test(contact)) {
      return NextResponse.json({ error: "Please provide a valid email or phone number" }, { status: 400 })
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error("Email configuration missing")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "Kedhareswer.12110626@gmail.com",
      subject: `New Appointment Request - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; text-align: center; margin-bottom: 30px;">New Appointment Request</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Contact:</td>
                  <td style="padding: 8px 0; color: #333;">${contact}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
                  <td style="padding: 8px 0; color: #333;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Date:</td>
                  <td style="padding: 8px 0; color: #333;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Time:</td>
                  <td style="padding: 8px 0; color: #333;">${time}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #666; text-align: center; font-size: 14px; margin-top: 30px;">
              This appointment request was sent from your portfolio website.
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({
      message: "Appointment request sent successfully! I will get back to you soon.",
    })
  } catch (error) {
    console.error("Appointment API error:", error)

    // Handle specific nodemailer errors
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return NextResponse.json({ error: "Email service authentication failed" }, { status: 500 })
      }
      if (error.message.includes("Network")) {
        return NextResponse.json({ error: "Network error. Please try again later." }, { status: 500 })
      }
    }

    return NextResponse.json(
      { error: "Failed to send appointment request. Please try again or contact directly." },
      { status: 500 },
    )
  }
}
