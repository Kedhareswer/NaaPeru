import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

interface Appointment {
  name: string;
  contact: string;
  subject: string;
  date: string;
  time: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

const emailTemplate = (appointment: Appointment) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    <h2 style="color: #333; text-align: center;">New Appointment Request</h2>
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
      <p style="margin: 5px 0;"><strong>Name:</strong> ${appointment.name}</p>
      <p style="margin: 5px 0;"><strong>Contact:</strong> ${appointment.contact}</p>
      <p style="margin: 5px 0;"><strong>Subject:</strong> ${appointment.subject}</p>
      <p style="margin: 5px 0;"><strong>Date:</strong> ${appointment.date}</p>
      <p style="margin: 5px 0;"><strong>Time:</strong> ${appointment.time}</p>
    </div>
    <p style="color: #666; text-align: center; font-size: 14px;">This is an automated notification from your portfolio website.</p>
  </div>
`;

export async function saveAppointment(appointment: Appointment) {
  try {
    // Create appointments directory if it doesn't exist
    const appointmentsDir = path.join(process.cwd(), 'appointments');
    await fs.mkdir(appointmentsDir, { recursive: true });

    // Save appointment to JSON file
    const fileName = `appointment-${Date.now()}.json`;
    const filePath = path.join(appointmentsDir, fileName);
    await fs.writeFile(filePath, JSON.stringify(appointment, null, 2));

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'Kedhareswer.12110626@gmail.com',
      subject: `New Appointment Request from ${appointment.name}`,
      html: emailTemplate(appointment)
    });

    return { success: true, message: 'Appointment saved and notification sent' };
  } catch (error) {
    console.error('Error handling appointment:', error);
    return { success: false, message: 'Failed to process appointment' };
  }
}