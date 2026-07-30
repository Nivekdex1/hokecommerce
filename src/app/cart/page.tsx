"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";
import { Loader2, MessageSquareWarning, Minus, Plus, X, Lock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    getCheckoutUrl,
    syncWithShopify,
    clearCart,
  } = useCartStore();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      syncWithShopify().catch((error) => {
        console.error("Error syncing cart on mount:", error);
      });
    }
  }, [items.length, syncWithShopify]);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsCheckingOut(true);
    setError(null);

    try {
      await syncWithShopify();
      const checkoutUrl = await getCheckoutUrl();

      if (checkoutUrl) {
        setTimeout(() => {
          clearCart();
          window.location.href = checkoutUrl;
        }, 100);
      } else {
        toast.error("Failed to create checkout - no URL returned");
        setError("No checkout URL was returned from Shopify");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error("There was a problem creating your checkout");
      setError(`Error: ${errorMessage}`);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="bg-hok-linen min-h-screen pb-20">
      <div className="bg-hok-ivory border-b border-hok-mist py-10 md:py-16">
        <div className="container-narrow text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-hok-espresso font-semibold">Your Cart</h1>
        </div>
      </div>
      
      <div className="container-narrow pt-8 pb-16">
        {/* Delivery Notice */}
        <div className="mb-10 flex items-start gap-4 bg-white border border-hok-champagne/40 rounded-md p-4 shadow-sm">
          <div className="bg-hok-champagne/20 p-2 rounded-full mt-1">
            <MessageSquareWarning className="w-5 h-5 text-hok-caramel" />
          </div>
          <div>
            <h4 className="font-semibold text-hok-espresso text-sm mb-1">Delivery Outside Lagos</h4>
            <p className="text-sm text-hok-stone">
              For orders outside Lagos, we offer flexible delivery options. Once your order is placed, our team will reach out via WhatsApp to confirm the most convenient courier service and delivery cost for your area.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-hok-mist rounded-md py-20 text-center">
            <div className="w-24 h-24 bg-hok-linen rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBagIcon className="w-10 h-10 text-hok-stone" />
            </div>
            <h2 className="font-playfair text-3xl text-hok-espresso font-medium mb-4">Your cart is empty</h2>
            <p className="text-hok-stone mb-8 max-w-md mx-auto">
              Looks like you haven't added any authentic Korean skincare products to your cart yet.
            </p>
            <Button asChild className="bg-hok-walnut hover:bg-hok-espresso text-white rounded-none px-10 py-6 text-lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white border border-hok-mist rounded-md overflow-hidden">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-hok-ivory border-b border-hok-mist text-xs font-semibold tracking-wider text-hok-stone uppercase">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                <div className="divide-y divide-hok-mist">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 sm:px-6 sm:py-6 flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center relative">
                      {/* Mobile Remove Button */}
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="md:hidden absolute top-4 right-4 text-hok-stone hover:text-hok-error"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      
                      {/* Product Info */}
                      <div className="col-span-6 flex gap-4 md:gap-6 mb-4 md:mb-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-hok-linen rounded-md overflow-hidden relative border border-hok-mist">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-center max-w-[200px] sm:max-w-none pr-6 md:pr-0">
                          <Link href={`/shop/${item.title.toLowerCase().replace(/ /g, '-')}`} className="font-playfair text-lg text-hok-espresso font-medium line-clamp-2 hover:text-hok-walnut transition-colors mb-1">
                            {item.title}
                          </Link>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-hok-stone hover:text-hok-error text-left mt-2 hidden md:inline-flex items-center"
                          >
                            <X className="w-3 h-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price Mobile (Hidden on Desktop) */}
                      <div className="md:hidden flex justify-between items-center mb-3">
                        <span className="text-sm text-hok-stone">Price</span>
                        <span className="font-medium text-hok-espresso">
                          {formatPrice(item.price, { currencyCode: item.currencyCode })}
                        </span>
                      </div>
                      
                      {/* Price Desktop */}
                      <div className="hidden md:block col-span-2 text-center text-hok-stone">
                        {formatPrice(item.price, { currencyCode: item.currencyCode })}
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-2 flex items-center justify-between md:justify-center mb-3 md:mb-0">
                        <span className="md:hidden text-sm text-hok-stone">Quantity</span>
                        <div className="flex items-center border border-hok-mist rounded-sm bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center text-hok-stone hover:text-hok-espresso hover:bg-hok-linen transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-hok-stone hover:text-hok-espresso hover:bg-hok-linen transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-2 flex justify-between items-center md:justify-end">
                        <span className="md:hidden text-sm text-hok-stone">Total</span>
                        <span className="font-semibold text-hok-walnut md:text-lg">
                          {formatPrice((parseFloat(item.price) * item.quantity).toString(), { currencyCode: item.currencyCode })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white border border-hok-mist rounded-md p-6 sticky top-24">
                <h3 className="font-playfair text-2xl text-hok-espresso font-medium mb-6 pb-4 border-b border-hok-mist">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-hok-stone">
                    <span>Subtotal</span>
                    <span className="font-medium text-hok-espresso">{totalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-hok-stone">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-hok-stone pt-4 border-t border-hok-mist">
                    <span className="text-base font-semibold text-hok-espresso">Estimated Total</span>
                    <span className="text-xl font-bold text-hok-walnut">{totalPrice()}</span>
                  </div>
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-hok-error/10 border border-hok-error/20 rounded text-sm text-hok-error flex items-start">
                    <MessageSquareWarning className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                
                <Button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut || items.length === 0}
                  className="w-full h-14 rounded-none bg-hok-walnut hover:bg-hok-espresso text-white text-lg font-semibold tracking-wide transition-colors mb-4 flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Secure Checkout
                    </>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs text-hok-stone mt-4">
                  <ShieldCheck className="w-4 h-4 text-hok-champagne" />
                  <span>100% Secure Checkout Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
