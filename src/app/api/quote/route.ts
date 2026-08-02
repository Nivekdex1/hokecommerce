import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, businessName, phone, email, orderRequest } = body;

    if (!fullName || !phone || !email || !orderRequest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const htmlContent = `
      <h2>New Custom Quote Request (Wholesale)</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Business Name:</strong> ${businessName || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <h3>Order Details:</h3>
      <p style="white-space: pre-wrap;">${orderRequest}</p>
    `;

    const result = await sendEmail({
      to: process.env.EMAIL_USER as string,
      subject: `Quote Request from ${fullName} ${businessName ? `(${businessName})` : ""}`,
      text: `New Quote Request\nName: ${fullName}\nBusiness: ${businessName || "N/A"}\nEmail: ${email}\nPhone: ${phone}\nOrder Details:\n${orderRequest}`,
      html: htmlContent,
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Failed to send email:", result.error);
      return NextResponse.json(
        { error: "Failed to submit quote request" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
