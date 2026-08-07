import { NextResponse } from "next/server";
import crypto from "crypto";
import { createShopifyAdminOrder } from "@/lib/shopify/admin";

export async function POST(request: Request) {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const bodyText = await request.text();

    // Verify Paystack HMAC signature if secret key is present
    if (paystackSecret) {
      const signature = request.headers.get("x-paystack-signature");
      const expectedSignature = crypto
        .createHmac("sha512", paystackSecret)
        .update(bodyText)
        .digest("hex");

      if (signature !== expectedSignature) {
        return NextResponse.json(
          { error: "Invalid Paystack signature" },
          { status: 401 }
        );
      }
    }

    const event = JSON.parse(bodyText);

    if (event.event === "charge.success") {
      const data = event.data;
      const metadata = data.metadata || {};

      console.log(`[Paystack Webhook] Charge success for Ref: ${data.reference}`);

      // If metadata contains items and shipping info, ensure Shopify order is recorded
      if (metadata.items && metadata.shippingInfo) {
        await createShopifyAdminOrder({
          email: data.customer.email,
          phone: metadata.shippingInfo.phone || data.customer.phone || "",
          firstName: metadata.shippingInfo.firstName || "",
          lastName: metadata.shippingInfo.lastName || "",
          address: metadata.shippingInfo.address || "",
          apartment: metadata.shippingInfo.apartment || "",
          city: metadata.shippingInfo.city || "",
          state: metadata.shippingInfo.state || "",
          country: metadata.shippingInfo.country || "Nigeria",
          totalPrice: (data.amount / 100).toString(),
          paystackReference: data.reference,
          items: metadata.items,
        });
      }
    }

    return NextResponse.json({ status: "received" });
  } catch (error) {
    console.error("[Paystack Webhook Error]:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 }
    );
  }
}
