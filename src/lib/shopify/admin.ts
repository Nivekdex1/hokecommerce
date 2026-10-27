// src/lib/shopify/admin.ts

export interface CreateOrderPayload {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  country: string;
  totalPrice: string;
  paystackReference: string;
  items: {
    productId: string;
    variantId?: string;
    title: string;
    price: string;
    quantity: number;
  }[];
}

function formatE164Phone(rawPhone?: string): string | undefined {
  if (!rawPhone) return undefined;
  const cleaned = rawPhone.trim().replace(/[^0-9+]/g, "");
  if (!cleaned) return undefined;

  if (cleaned.startsWith("+")) {
    return cleaned.length >= 10 ? cleaned : undefined;
  }

  if (cleaned.startsWith("0") && cleaned.length === 11) {
    return "+234" + cleaned.slice(1);
  }

  if (cleaned.startsWith("234") && cleaned.length === 13) {
    return "+" + cleaned;
  }

  if (cleaned.length === 10) {
    return "+234" + cleaned;
  }

  return undefined;
}

export async function createShopifyAdminOrder(payload: CreateOrderPayload) {
  const domain =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    process.env.SHOPIFY_STORE_DOMAIN ||
    "homeofkoreanbeauty.myshopify.com";
  const accessToken =
    process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ||
    process.env.SHOPIFY_CUSTOM_APP_ADMIN_API_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn(
      "[Shopify Admin API] SHOPIFY_ADMIN_ACCESS_TOKEN or SHOPIFY_CUSTOM_APP_ADMIN_API_ACCESS_TOKEN is missing. Order logged locally."
    );
    return {
      success: true,
      orderId: `OFFLINE-${Date.now()}`,
      orderName: `#HOK-${Math.floor(100000 + Math.random() * 900000)}`,
      simulated: true,
    };
  }

  const endpoint = `https://${domain}/admin/api/2024-01/orders.json`;

  // Format line items
  const lineItems = payload.items.map((item) => {
    // Clean numeric ID if in GID format e.g. gid://shopify/ProductVariant/12345
    let numericVariantId: number | undefined;
    if (item.variantId) {
      const match = item.variantId.match(/\d+$/);
      if (match) {
        numericVariantId = parseInt(match[0], 10);
      }
    }

    const cleanPrice = item.price ? item.price.replace(/[^0-9.]/g, "") : "0";

    return {
      title: item.title,
      price: cleanPrice,
      quantity: item.quantity,
      ...(numericVariantId ? { variant_id: numericVariantId } : {}),
    };
  });

  const rawPhone = payload.phone ? payload.phone.trim() : "";
  const validPhone = formatE164Phone(rawPhone);

  const orderData = {
    order: {
      email: payload.email,
      ...(validPhone ? { phone: validPhone } : {}),
      financial_status: "paid",
      tags: "Paystack, Headless Custom Checkout",
      note: `Paid via Paystack. Ref: ${payload.paystackReference}${rawPhone ? ` | Phone: ${rawPhone}` : ""}`,
      customer: {
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        ...(validPhone ? { phone: validPhone } : {}),
      },
      shipping_address: {
        first_name: payload.firstName,
        last_name: payload.lastName,
        address1: payload.address,
        address2: payload.apartment || "",
        city: payload.city,
        province: payload.state,
        country: payload.country || "Nigeria",
        phone: validPhone || rawPhone || undefined,
      },
      billing_address: {
        first_name: payload.firstName,
        last_name: payload.lastName,
        address1: payload.address,
        address2: payload.apartment || "",
        city: payload.city,
        province: payload.state,
        country: payload.country || "Nigeria",
        phone: validPhone || rawPhone || undefined,
      },
      line_items: lineItems,
      transactions: [
        {
          kind: "sale",
          status: "success",
          amount: payload.totalPrice,
          gateway: "Paystack",
        },
      ],
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Shopify Admin API Error]:", errorText);
    throw new Error(`Shopify Order Creation Failed: ${response.statusText}`);
  }

  const result = await response.json();
  return {
    success: true,
    orderId: result.order.id,
    orderName: result.order.name || `#${result.order.order_number}`,
    shopifyOrder: result.order,
  };
}
