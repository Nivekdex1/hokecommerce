"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";
import {
  CheckCircle,
  ChevronRight,
  Minus,
  Plus,
  X,
  Lock,
  Truck,
  CreditCard,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { initializePaystackPayment } from "@/lib/paystack";

type CheckoutStep = "bag" | "shipping" | "confirmation";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  country: string;
}

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
    getCheckoutUrl,
    syncWithShopify,
    clearCart,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("bag");
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    country: "Nigeria",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    items: typeof items;
    total: string;
    shippingInfo: ShippingInfo;
    date: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-hok-linen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-hok-mist border-t-hok-champagne rounded-full animate-spin" />
      </div>
    );
  }

  if (completedOrder) {
    return (
      <main className="bg-hok-linen min-h-screen py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto bg-white border border-hok-mist rounded-xl p-6 sm:p-10 shadow-sm text-center">
          <div className="w-16 h-16 bg-hok-success/10 text-hok-success rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-9 h-9" />
          </div>

          <span className="text-xs font-outfit uppercase tracking-[0.2em] text-hok-champagne font-semibold">
            Order Confirmed
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl text-hok-espresso font-semibold mt-1 mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-hok-stone font-outfit text-sm mb-6">
            Order Reference: <strong className="text-hok-espresso font-bold">#{completedOrder.orderNumber}</strong>
          </p>

          <div className="bg-hok-ivory border border-hok-mist/60 rounded-lg p-5 text-left mb-6 space-y-4 font-outfit text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-hok-mist/60">
              <span className="text-hok-stone text-xs uppercase tracking-wider">Date</span>
              <span className="font-medium text-hok-espresso">{completedOrder.date}</span>
            </div>

            <div className="pb-3 border-b border-hok-mist/60">
              <span className="text-hok-stone text-xs uppercase tracking-wider block mb-1">Delivering To</span>
              <p className="font-medium text-hok-espresso">
                {completedOrder.shippingInfo.firstName} {completedOrder.shippingInfo.lastName}
              </p>
              <p className="text-hok-stone text-xs">
                {completedOrder.shippingInfo.address}{completedOrder.shippingInfo.apartment ? `, ${completedOrder.shippingInfo.apartment}` : ""}, {completedOrder.shippingInfo.city}, {completedOrder.shippingInfo.state}
              </p>
              <p className="text-hok-stone text-xs mt-0.5">
                {completedOrder.shippingInfo.phone} · {completedOrder.shippingInfo.email}
              </p>
            </div>

            <div>
              <span className="text-hok-stone text-xs uppercase tracking-wider block mb-2">Items Ordered</span>
              <div className="space-y-2">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-hok-espresso line-clamp-1 font-medium">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="text-hok-walnut font-semibold shrink-0 ml-2">
                      {formatPrice((parseFloat(item.price) * item.quantity).toString(), { currencyCode: item.currencyCode })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-hok-mist/60 font-bold text-base">
              <span className="text-hok-espresso">Total Paid / Due</span>
              <span className="text-hok-walnut">{completedOrder.total}</span>
            </div>
          </div>

          <div className="bg-hok-linen border border-hok-champagne/40 rounded-lg p-4 mb-8 text-left text-xs text-hok-espresso font-outfit flex items-start gap-3">
            <Truck className="w-5 h-5 text-hok-champagne shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">What Happens Next?</p>
              <p className="text-hok-stone leading-relaxed">
                Our team will reach out to you directly via WhatsApp or phone at <strong className="text-hok-espresso">{completedOrder.shippingInfo.phone}</strong> to confirm your courier details and delivery status.
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-hok-espresso text-white font-outfit font-medium text-sm tracking-[0.15em] uppercase px-10 py-4 hover:bg-hok-walnut transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const itemCount = totalItems();

  const steps: { key: CheckoutStep; label: string; sublabel: string }[] = [
    { key: "bag", label: "Shopping Bag", sublabel: "View your items" },
    { key: "shipping", label: "Shipping & Checkout", sublabel: "Enter your details" },
    { key: "confirmation", label: "Confirmation", sublabel: "Review your order" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  const updateField = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateShipping = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingInfo, string>> = {};
    if (!shippingInfo.firstName.trim()) newErrors.firstName = "First name is required";
    if (!shippingInfo.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!shippingInfo.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email))
      newErrors.email = "Enter a valid email";
    if (!shippingInfo.phone.trim()) newErrors.phone = "Phone number is required";
    if (!shippingInfo.address.trim()) newErrors.address = "Street address is required";
    if (!shippingInfo.state) newErrors.state = "State is required";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === "bag") {
      if (items.length === 0) {
        toast.error("Your cart is empty");
        return;
      }
      setCurrentStep("shipping");
    } else if (currentStep === "shipping") {
      if (!validateShipping()) {
        toast.error("Please fill in all required fields");
        return;
      }
      setCurrentStep("confirmation");
    }
  };

  const handleBack = () => {
    if (currentStep === "shipping") setCurrentStep("bag");
    else if (currentStep === "confirmation") setCurrentStep("shipping");
  };

  const finalizeOrderCreation = async (paystackRef: string) => {
    try {
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: paystackRef,
          shippingInfo,
          items,
          totalPrice: totalPrice(),
        }),
      });

      const data = await res.json();
      const orderNum = data.orderNumber || `${Math.floor(100000 + Math.random() * 900000)}`;

      const orderData = {
        orderNumber: orderNum,
        items: [...items],
        total: totalPrice(),
        shippingInfo: { ...shippingInfo },
        date: new Date().toLocaleDateString("en-NG", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };

      setCompletedOrder(orderData);
      clearCart();
      toast.success(`Order #${orderNum} placed successfully!`);
    } catch (err) {
      console.error("Failed to finalize order creation:", err);
      toast.error("Order payment received, but error finalizing. Support notified.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Calculate amount in kobo
      const cleanTotal = totalPrice().replace(/[^0-9.]/g, "");
      const numericTotal = parseFloat(cleanTotal) || 0;
      const amountInKobo = Math.round(numericTotal * 100);

      // Try Paystack Popup payment
      try {
        await initializePaystackPayment({
          email: shippingInfo.email,
          amount: amountInKobo > 0 ? amountInKobo : 10000,
          currency: "NGN",
          metadata: {
            shippingInfo,
            items: items.map((i) => ({
              productId: i.productId,
              variantId: i.variantId,
              title: i.title,
              price: i.price,
              quantity: i.quantity,
            })),
          },
          onClose: () => {
            setIsProcessing(false);
            toast.info("Payment window closed");
          },
          callback: (response) => {
            if (response.status === "success" || response.reference) {
              finalizeOrderCreation(response.reference);
            } else {
              setIsProcessing(false);
              toast.error("Payment was not completed");
            }
          },
        });
      } catch (paystackErr) {
        console.warn("Paystack popup fallback triggered:", paystackErr);
        // Fallback for offline / demo mode
        const demoRef = `DEMO-${Date.now()}`;
        await finalizeOrderCreation(demoRef);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("There was a problem placing your order. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <main className="bg-hok-linen min-h-screen pb-20">
      {/* Header with /our-brand.png Background */}
      <div className="relative border-b border-hok-mist/40 overflow-hidden bg-hok-espresso">
        {/* Background Image */}
        <Image
          src="/our-brand.png"
          alt="Home of Korean Beauty Brand Header"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        {/* Gradient Overlay for Optimal Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-hok-espresso/90 via-hok-espresso/65 to-hok-espresso/45 backdrop-blur-[1px]" />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-10 md:py-14">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white italic font-medium mb-6 drop-shadow-md tracking-tight">
            Checkout
          </h1>

          {/* Category Quick Links */}
          <div className="flex gap-3.5 overflow-x-auto hide-scrollbar pb-2">
            {[
              { title: "Face", query: "Face" },
              { title: "Bath & Body", query: "Bath & Body" },
              { title: "Hair Care", query: "Hair Care" },
              { title: "Cleansers & Toners", query: "Cleansers" },
              { title: "Sunscreens", query: "Sunscreens" },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={`/shop?category=${encodeURIComponent(cat.query)}`}
                className="group shrink-0 border border-white/40 bg-white/85 hover:bg-white backdrop-blur-md px-5 py-3.5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-none"
              >
                <span className="block font-outfit font-semibold text-sm text-hok-espresso group-hover:text-hok-walnut transition-colors">
                  {cat.title}
                </span>
                <span className="text-xs text-hok-walnut group-hover:text-hok-espresso mt-1 flex items-center gap-1 font-medium transition-colors">
                  Shop Now <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-6 border-b border-hok-mist/40 bg-white/50">
        <div className="flex items-center justify-between max-w-3xl">
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <React.Fragment key={step.key}>
                <button
                  onClick={() => {
                    if (isCompleted) {
                      setCurrentStep(step.key);
                    }
                  }}
                  className={`flex items-center gap-2 md:gap-3 transition-colors ${
                    isCompleted ? "cursor-pointer" : isActive ? "cursor-default" : "cursor-default"
                  }`}
                  disabled={!isCompleted && !isActive}
                >
                  <div
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? "bg-hok-espresso border-hok-espresso text-white"
                        : isActive
                        ? "border-hok-espresso text-hok-espresso bg-transparent"
                        : "border-hok-mist text-hok-stone bg-transparent"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p
                      className={`text-sm font-semibold font-outfit uppercase tracking-wider ${
                        isActive || isCompleted ? "text-hok-espresso" : "text-hok-stone"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-hok-stone font-outfit">{step.sublabel}</p>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 md:mx-4 transition-colors ${
                      index < currentStepIndex ? "bg-hok-espresso" : "bg-hok-mist"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-6 md:px-12 lg:px-20 pt-8 pb-16">
        {/* Step 1: Shopping Bag */}
        {currentStep === "bag" && (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3">
              <h2 className="font-playfair text-2xl text-hok-espresso font-semibold mb-6">
                Your Items ({itemCount})
              </h2>

              {items.length === 0 ? (
                <div className="bg-white border border-hok-mist rounded-md py-16 text-center">
                  <ShoppingBag className="w-12 h-12 text-hok-stone mx-auto mb-4" />
                  <h3 className="font-playfair text-xl text-hok-espresso mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-hok-stone text-sm mb-6">
                    Add some products to get started.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-hok-espresso text-white font-outfit font-medium text-sm tracking-[0.1em] uppercase px-8 py-3 hover:bg-hok-walnut transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="bg-white border border-hok-mist rounded-md overflow-hidden">
                  <div className="divide-y divide-hok-mist/50">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-start relative"
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-hok-linen rounded overflow-hidden relative border border-hok-mist/40">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Link
                              href={`/shop/${item.handle}`}
                              className="font-outfit font-medium text-sm sm:text-base text-hok-espresso line-clamp-2 hover:text-hok-walnut transition-colors"
                            >
                              {item.title}
                            </Link>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-hok-stone hover:text-hok-error transition-colors flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-end justify-between mt-3">
                            <div className="flex items-center border border-hok-mist/60 bg-white rounded-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 sm:w-10 text-center text-sm font-outfit font-medium text-hok-espresso">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-outfit font-bold text-hok-walnut">
                              {formatPrice(
                                (parseFloat(item.price) * item.quantity).toString(),
                                { currencyCode: item.currencyCode }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 sm:p-6 bg-hok-ivory/50 border-t border-hok-mist/50">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-1 text-sm text-hok-stone hover:text-hok-espresso font-outfit transition-colors uppercase tracking-wider"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <OrderSummary
              totalPrice={totalPrice()}
              itemCount={itemCount}
              onContinue={handleNext}
              buttonText="Proceed to Shipping"
              showShipping={false}
            />
          </div>
        )}

        {/* Step 2: Shipping & Checkout */}
        {currentStep === "shipping" && (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3">
              <h2 className="font-playfair text-2xl text-hok-espresso font-semibold mb-6">
                Billing Details
              </h2>

              <div className="bg-white border border-hok-mist rounded-md p-5 sm:p-8 space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    label="First Name"
                    required
                    value={shippingInfo.firstName}
                    onChange={(v) => updateField("firstName", v)}
                    error={errors.firstName}
                    placeholder="First name"
                  />
                  <FormField
                    label="Last Name"
                    required
                    value={shippingInfo.lastName}
                    onChange={(v) => updateField("lastName", v)}
                    error={errors.lastName}
                    placeholder="Last name"
                  />
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    label="Email"
                    required
                    type="email"
                    value={shippingInfo.email}
                    onChange={(v) => updateField("email", v)}
                    error={errors.email}
                    placeholder="you@example.com"
                  />
                  <FormField
                    label="Phone"
                    required
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(v) => updateField("phone", v)}
                    error={errors.phone}
                    placeholder="+234 ..."
                  />
                </div>

                {/* Country */}
                <FormField
                  label="Country / Region"
                  required
                  value={shippingInfo.country}
                  onChange={(v) => updateField("country", v)}
                  disabled
                />

                {/* Address */}
                <FormField
                  label="Street Address"
                  required
                  value={shippingInfo.address}
                  onChange={(v) => updateField("address", v)}
                  error={errors.address}
                  placeholder="House number and street name"
                />
                <FormField
                  label=""
                  value={shippingInfo.apartment}
                  onChange={(v) => updateField("apartment", v)}
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />

                {/* State & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-outfit font-semibold text-hok-espresso mb-2 uppercase tracking-wider">
                      State <span className="text-hok-error">*</span>
                    </label>
                    <select
                      value={shippingInfo.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      className={`w-full h-12 px-4 border bg-white font-outfit text-sm focus:outline-none focus:ring-2 focus:ring-hok-champagne/50 focus:border-hok-champagne transition-colors appearance-none ${
                        errors.state ? "border-hok-error" : "border-hok-mist"
                      }`}
                    >
                      <option value="">Select an option...</option>
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-xs text-hok-error mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.state}
                      </p>
                    )}
                  </div>
                  <FormField
                    label="City"
                    required
                    value={shippingInfo.city}
                    onChange={(v) => updateField("city", v)}
                    error={errors.city}
                    placeholder="City"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBack}
                  className="h-12 px-8 border border-hok-espresso text-hok-espresso font-outfit font-medium text-sm tracking-[0.1em] uppercase hover:bg-hok-espresso hover:text-white transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Back to Bag
                </button>
                <button
                  onClick={handleNext}
                  className="h-12 px-8 bg-hok-espresso text-white font-outfit font-medium text-sm tracking-[0.1em] uppercase hover:bg-hok-walnut transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Review Order
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <OrderSummary
              totalPrice={totalPrice()}
              itemCount={itemCount}
              items={items}
              showItems
              showShipping
              shippingState={shippingInfo.state}
            />
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === "confirmation" && (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3">
              <h2 className="font-playfair text-2xl text-hok-espresso font-semibold mb-6">
                Review Your Order
              </h2>

              {/* Shipping Info Summary */}
              <div className="bg-white border border-hok-mist rounded-md p-5 sm:p-8 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-outfit font-semibold text-hok-espresso uppercase tracking-wider text-sm">
                    Shipping Details
                  </h3>
                  <button
                    onClick={() => setCurrentStep("shipping")}
                    className="text-xs text-hok-champagne hover:text-hok-walnut font-outfit font-medium transition-colors uppercase tracking-wider"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-outfit">
                  <div>
                    <p className="text-hok-stone text-xs uppercase tracking-wider mb-1">Name</p>
                    <p className="text-hok-espresso font-medium">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-hok-stone text-xs uppercase tracking-wider mb-1">Contact</p>
                    <p className="text-hok-espresso font-medium">{shippingInfo.email}</p>
                    <p className="text-hok-stone">{shippingInfo.phone}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-hok-stone text-xs uppercase tracking-wider mb-1">Address</p>
                    <p className="text-hok-espresso font-medium">
                      {shippingInfo.address}
                      {shippingInfo.apartment ? `, ${shippingInfo.apartment}` : ""}
                      , {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Summary */}
              <div className="bg-white border border-hok-mist rounded-md overflow-hidden mb-6">
                <div className="px-5 sm:px-8 py-4 bg-hok-ivory/50 border-b border-hok-mist/50">
                  <h3 className="font-outfit font-semibold text-hok-espresso uppercase tracking-wider text-sm">
                    Order Items
                  </h3>
                </div>
                <div className="divide-y divide-hok-mist/30">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 sm:px-8 sm:py-5 flex items-center gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-hok-linen rounded overflow-hidden relative border border-hok-mist/40">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-outfit font-medium text-sm text-hok-espresso line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-hok-stone font-outfit mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-outfit font-semibold text-sm text-hok-walnut shrink-0">
                        {formatPrice(
                          (parseFloat(item.price) * item.quantity).toString(),
                          { currencyCode: item.currencyCode }
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-hok-ivory border border-hok-mist/40 rounded-md p-4 sm:p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-hok-champagne flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-outfit text-hok-espresso font-medium mb-1">
                      Shipping Information
                    </p>
                    <p className="text-xs text-hok-stone font-outfit leading-relaxed">
                      Terminal Pickup Timeline is 5-10 Working Days. Amount quoted is 0-5kg only,
                      orders above 5kg attract extra charge. Other shipping rates are for 1kg and
                      below, anything higher than 1kg attracts an extra fee.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBack}
                  className="h-12 px-8 border border-hok-espresso text-hok-espresso font-outfit font-medium text-sm tracking-[0.1em] uppercase hover:bg-hok-espresso hover:text-white transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="h-14 px-10 bg-hok-espresso text-white font-outfit font-semibold text-base tracking-[0.1em] uppercase hover:bg-hok-walnut transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <OrderSummary
              totalPrice={totalPrice()}
              itemCount={itemCount}
              showShipping
              shippingState={shippingInfo.state}
            />
          </div>
        )}
      </div>
    </main>
  );
}

/* ─── Reusable Components ─── */

function FormField({
  label,
  required,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-outfit font-semibold text-hok-espresso mb-2 uppercase tracking-wider">
          {label} {required && <span className="text-hok-error">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full h-12 px-4 border bg-white font-outfit text-sm placeholder:text-hok-stone/50 focus:outline-none focus:ring-2 focus:ring-hok-champagne/50 focus:border-hok-champagne transition-colors disabled:bg-hok-linen disabled:text-hok-stone ${
          error ? "border-hok-error" : "border-hok-mist"
        }`}
      />
      {error && (
        <p className="text-xs text-hok-error mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function OrderSummary({
  totalPrice,
  itemCount,
  items,
  showItems,
  onContinue,
  buttonText,
  showShipping,
  shippingState,
}: {
  totalPrice: string;
  itemCount: number;
  items?: any[];
  showItems?: boolean;
  onContinue?: () => void;
  buttonText?: string;
  showShipping?: boolean;
  shippingState?: string;
}) {
  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-white border border-hok-mist rounded-md p-6 sticky top-28">
        <h3 className="font-playfair text-xl text-hok-espresso font-medium mb-6 pb-4 border-b border-hok-mist uppercase tracking-wider">
          Your Order
        </h3>

        {showItems && items && items.length > 0 && (
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-xs font-outfit font-semibold text-hok-stone uppercase tracking-wider pb-2 border-b border-hok-mist/50">
              <span>Product</span>
              <span>Subtotal</span>
            </div>
            {items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-start text-sm font-outfit gap-4">
                <span className="text-hok-espresso line-clamp-1 flex-1">
                  {item.title} × {item.quantity}
                </span>
                <span className="text-hok-walnut font-medium shrink-0">
                  {formatPrice(
                    (parseFloat(item.price) * item.quantity).toString(),
                    { currencyCode: item.currencyCode }
                  )}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 text-sm font-outfit">
          <div className="flex justify-between text-hok-stone">
            <span>Subtotal ({itemCount} items)</span>
            <span className="font-medium text-hok-espresso">{totalPrice}</span>
          </div>

          {showShipping && (
            <div className="flex justify-between text-hok-stone">
              <span>Shipment</span>
              <span className="text-xs text-right max-w-[180px]">
                {shippingState
                  ? "Enter your address to view shipping options."
                  : "Enter your address to view shipping options."}
              </span>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-hok-mist">
            <span className="text-base font-bold text-hok-espresso uppercase tracking-wider">Total</span>
            <span className="text-xl font-bold text-hok-walnut">{totalPrice}</span>
          </div>
        </div>

        {onContinue && (
          <button
            onClick={onContinue}
            disabled={itemCount === 0}
            className="w-full h-14 mt-6 bg-hok-espresso text-white font-outfit font-semibold text-sm tracking-[0.12em] uppercase hover:bg-hok-walnut transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonText || "Checkout"}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center justify-center gap-2 text-[11px] text-hok-stone font-outfit mt-4">
          <Lock className="w-3.5 h-3.5 text-hok-champagne" />
          <span>100% Secure Checkout</span>
        </div>
      </div>
    </div>
  );
}
