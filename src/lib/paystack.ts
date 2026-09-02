// src/lib/paystack.ts

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: PaystackOptions) => {
        openIframe: () => void;
      };
    };
  }
}

export interface PaystackOptions {
  key: string;
  email: string;
  amount: number; // in kobo (e.g. 50000 = NGN 500)
  currency?: string;
  ref?: string;
  metadata?: Record<string, any>;
  onClose?: () => void;
  callback?: (response: { reference: string; status: string; message: string; trxref: string }) => void;
}

export function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.PaystackPop) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById("paystack-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export async function initializePaystackPayment(options: Omit<PaystackOptions, "key">): Promise<void> {
  const isLoaded = await loadPaystackScript();
  if (!isLoaded || !window.PaystackPop) {
    throw new Error("Failed to load Paystack payment gateway. Please check your internet connection.");
  }

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_demo123456789";

  const handler = window.PaystackPop.setup({
    ...options,
    key: publicKey,
  });

  handler.openIframe();
}
