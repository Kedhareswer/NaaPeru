import { neon } from '@neondatabase/serverless'
import emailjs from '@emailjs/browser'

const connectionString = process.env.NEON_DATABASE_URL!
const sql = neon(connectionString)

const EMAIL_TO = 'Kedhareswer.12110626@gmail.com'

async function main() {
  // init emailjs (server-side: use public key)
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '')

  // fetch due notifications
  const rows = await sql`
    SELECT id, event_type, payload
    FROM notification_outbox
    WHERE sent = false AND scheduled_at <= now()
    ORDER BY id
    LIMIT 50`;

  for (const row of rows) {
    try {
      if (row.event_type === 'endorsement') {
        const { skill_id, endorser_email } = row.payload

        // fetch skill name
        const skillRows = await sql`SELECT name FROM skills WHERE id = ${skill_id} LIMIT 1`;
        const skill_name = (skillRows as any)[0]?.name || `Skill #${skill_id}`;

        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_OWNER!,
          {
            to_email: EMAIL_TO,
            subject: `🎉 New Endorsement: ${skill_name}`,
            intro: `Hi Kedhareswer,`,
            body: `${skill_name} just received a new endorsement from ${endorser_email}.`,
            cta_text: 'View Skill Dashboard',
            cta_url: 'https://your-portfolio-site.com#skills',
            footer: 'Thank you for keeping your portfolio up-to-date.'
          }
        )
      } else if (row.event_type === 'appointment') {
        const appt = row.payload
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_OWNER!,
          {
            to_email: EMAIL_TO,
            subject: `📅 New Appointment: ${appt.subject}`,
            intro: `Hello Kedhareswer,`,
            body: `${appt.user_name} (<a href="mailto:${appt.user_email}">${appt.user_email}</a>) has requested an appointment.<br/><br/>` +
                  `<strong>Date:</strong> ${appt.preferred_date}<br/>` +
                  `<strong>Time:</strong> ${appt.preferred_time} ${appt.timezone}<br/>` +
                  `<strong>Meeting Platform:</strong> ${appt.meeting_platform}<br/><br/>` +
                  `Please confirm the meeting at your earliest convenience.`,
            cta_text: 'Open Calendar',
            cta_url: 'https://calendar.google.com',
            footer: "You're receiving this notification because you own the portfolio site."
          }
        )
      }
      // mark sent
      await sql`UPDATE notification_outbox SET sent = true, sent_at = now() WHERE id = ${row.id}`
    } catch (err) {
      console.error('Failed processing notification', row.id, err)
    }
  }
}

if (require.main === module) {
  main().then(() => process.exit(0))
} 