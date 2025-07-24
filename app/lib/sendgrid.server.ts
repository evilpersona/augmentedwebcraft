interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  projectDetails: string;
  timeline?: string;
  budget?: string;
  otherService?: string;
}

export async function sendContactEmails(formData: ContactFormData) {
  const apiKey = process.env.SENDGRID;
  
  if (!apiKey) {
    throw new Error('SendGrid API key not configured');
  }

  // Send notification email to company
  const notificationResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: 'hello@augmentedwebcraft.com',
              name: 'Augmented Webcraft'
            }
          ],
          subject: `New Consultation Request from ${formData.name}`
        }
      ],
      from: {
        email: 'no-reply@augmentedwebcraft.com',
        name: 'Augmented Webcraft'
      },
      content: [
        {
          type: 'text/html',
          value: `
            <h2>New Consultation Request</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
            ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
            <p><strong>Service:</strong> ${formData.service === 'Other' ? formData.otherService : formData.service}</p>
            <p><strong>Project Details:</strong></p>
            <p>${formData.projectDetails.replace(/\n/g, '<br>')}</p>
            ${formData.timeline ? `<p><strong>Timeline:</strong> ${formData.timeline}</p>` : ''}
            ${formData.budget ? `<p><strong>Budget:</strong> ${formData.budget}</p>` : ''}
          `
        }
      ]
    })
  });

  if (!notificationResponse.ok) {
    throw new Error(`SendGrid API error: ${notificationResponse.status}`);
  }

  // Send confirmation email to customer
  const confirmationResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: formData.email,
              name: formData.name
            }
          ],
          subject: 'Thank you for your consultation request - Augmented Webcraft'
        }
      ],
      from: {
        email: 'hello@augmentedwebcraft.com',
        name: 'Augmented Webcraft'
      },
      content: [
        {
          type: 'text/html',
          value: `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Thank You for Your Interest!</h2>
              
              <p>Hi ${formData.name},</p>
              
              <p>Thank you for reaching out to Augmented Webcraft! We've received your consultation request and are excited to learn more about your project.</p>
              
              <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #2563eb;">What's Next?</h3>
                <p style="margin-bottom: 0;">Our team will review your request and get back to you within <strong>24 hours</strong> with next steps and any follow-up questions.</p>
              </div>
              
              <h3 style="color: #2563eb;">Your Request Summary:</h3>
              <ul style="background-color: #f8fafc; padding: 15px 20px; border-radius: 5px;">
                <li><strong>Service:</strong> ${formData.service === 'Other' ? formData.otherService : formData.service}</li>
                ${formData.timeline ? `<li><strong>Timeline:</strong> ${formData.timeline}</li>` : ''}
                ${formData.budget ? `<li><strong>Budget:</strong> ${formData.budget}</li>` : ''}
              </ul>
              
              <p>In the meantime, feel free to check out our recent work and insights on our website.</p>
              
              <p>Looking forward to discussing your project!</p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin-bottom: 5px;"><strong>The Augmented Webcraft Team</strong></p>
                <p style="margin-bottom: 5px; color: #64748b;">hello@augmentedwebcraft.com</p>
                <p style="margin-bottom: 0; color: #64748b;">augmentedwebcraft.com</p>
              </div>
            </div>
          `
        }
      ]
    })
  });

  if (!confirmationResponse.ok) {
    throw new Error(`SendGrid confirmation email error: ${confirmationResponse.status}`);
  }

  return { success: true };
}