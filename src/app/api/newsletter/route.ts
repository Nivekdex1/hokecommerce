import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const htmlContent = `
      <h2>New Newsletter Subscription</h2>
      <p>A new user has subscribed to the newsletter:</p>
      <p><strong>Email:</strong> ${email}</p>
    `;

    const result = await sendEmail({
      to: process.env.EMAIL_USER as string, // Send notification to store owner
      subject: `New Newsletter Subscriber: ${email}`,
      text: `New subscriber: ${email}`,
      html: htmlContent,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Failed to send email:", result.error);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
