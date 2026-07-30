import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const htmlContent = `
      <h2>New Wholesale Partner Application (HOK Pro)</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>WhatsApp / Phone:</strong> ${phone}</p>
    `;

    const result = await sendEmail({
      to: process.env.EMAIL_USER as string,
      subject: `Wholesale Application: ${firstName} ${lastName}`,
      text: `New Wholesale Application\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}`,
      html: htmlContent,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Failed to send email:", result.error);
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Wholesale API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
