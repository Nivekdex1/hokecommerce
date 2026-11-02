import { NextResponse } from "next/server";
import { getShippingRatesForAddress } from "@/lib/shopify/shipping";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { country, state } = body;

    if (!state) {
      return NextResponse.json({
        success: true,
        rates: [],
        message: "State is required to calculate shipping rates",
      });
    }

    const rates = await getShippingRatesForAddress({
      country: country || "Nigeria",
      state,
    });

    return NextResponse.json({
      success: true,
      rates,
    });
  } catch (error) {
    console.error("[Shipping Rates API Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipping rates", rates: [] },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "Nigeria";
    const state = searchParams.get("state") || "";

    if (!state) {
      return NextResponse.json({
        success: true,
        rates: [],
        message: "State is required to calculate shipping rates",
      });
    }

    const rates = await getShippingRatesForAddress({ country, state });

    return NextResponse.json({
      success: true,
      rates,
    });
  } catch (error) {
    console.error("[Shipping Rates API Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipping rates", rates: [] },
      { status: 500 }
    );
  }
}

