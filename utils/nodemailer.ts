import { Resend } from 'resend';


const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

export async function sendEmail({ to, subject, text, html }: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}