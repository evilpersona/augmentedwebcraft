import { json, type ActionFunctionArgs } from "react-router";
import { sendContactEmails } from "~/lib/sendgrid.server";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.service || !formData.projectDetails) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    await sendContactEmails(formData);
    
    return json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}