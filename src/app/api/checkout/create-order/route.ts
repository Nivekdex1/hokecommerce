import { NextResponse } from "next/server";
import { createShopifyAdminOrder } from "@/lib/shopify/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference, shippingInfo, items, totalPrice } = body;

    if (!shippingInfo || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order details provided" },
        { status: 400 }
      );
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    // Verify transaction with Paystack API if secret key exists
    if (paystackSecret && reference && !reference.startsWith("demo-")) {
      const verifyRes = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${paystackSecret}`,
          },
        }
      );

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.status || verifyData.data.status !== "success") {
        return NextResponse.json(
          { error: "Payment verification failed with Paystack" },
          { status: 400 }
        );
      }
    }

    // Create order in Shopify Admin API
    const result = await createShopifyAdminOrder({
      email: shippingInfo.email,
      phone: shippingInfo.phone,
      firstName: shippingInfo.firstName,
      lastName: shippingInfo.lastName,
      address: shippingInfo.address,
      apartment: shippingInfo.apartment,
      city: shippingInfo.city,
      state: shippingInfo.state,
      country: shippingInfo.country || "Nigeria",
      totalPrice: totalPrice ? totalPrice.replace(/[^0-9.]/g, "") : "0",
      paystackReference: reference || `REF-${Date.now()}`,
      items,
    });

    return NextResponse.json({
      success: true,
      orderNumber: result.orderName.replace("#", ""),
      orderId: result.orderId,
    });
  } catch (error) {
    console.error("[Create Order API Error]:", error);
    return NextResponse.json(
      { error: "Failed to process order creation" },
      { status: 500 }
    );
  }
}
