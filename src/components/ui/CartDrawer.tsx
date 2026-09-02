"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useRecentlyViewedStore } from "@/store/useRecentlyViewedStore";
import { formatPrice } from "@/utils/formatPrice";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Lock,
  Clock,
  Tag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DrawerTab = "cart" | "recent";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setOpen,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCartStore();

  const recentlyViewed = useRecentlyViewedStore((s) => s.items);

  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<DrawerTab>("cart");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    useRecentlyViewedStore.persist.rehydrate();
  }, []);

  // Reset to cart tab when drawer opens with items
  useEffect(() => {
    if (isOpen && items.length > 0) {
      setActiveTab("cart");
    }
  }, [isOpen, items.length]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setOpen]);

  if (!mounted) return null;

  const itemCount = totalItems();

  const handleCheckout = () => {
    setOpen(false);
    router.push("/checkout");
  };

  const handleRemoveWithUndo = (itemId: string) => {
    const removedItem = items.find((i) => i.id === itemId);
    if (!removedItem) return;

    removeItem(itemId);

    toast("Item removed from cart", {
      description: removedItem.title,
      action: {
        label: "Undo",
        onClick: () => {
          useCartStore.getState().addItem({
            productId: removedItem.productId,
            variantId: removedItem.variantId,
            title: removedItem.title,
            handle: removedItem.handle,
            price: removedItem.price,
            image: removedItem.image,
            quantity: removedItem.quantity,
            currencyCode: removedItem.currencyCode,
          });
        },
      },
      duration: 5000,
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    // For now, just acknowledge — actual validation will happen at checkout
    setCouponApplied(true);
    toast.info("Coupon will be applied at checkout");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-[82%] sm:w-[420px] md:w-[460px] bg-white shadow-2xl transform transition-transform duration-200 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with Tabs */}
        <div className="border-b border-hok-mist/60">
          <div className="flex items-center justify-between px-4 sm:px-6 pt-5 pb-3">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-hok-espresso" />
              <h2 className="font-playfair text-lg font-semibold text-hok-espresso">
                Shopping Cart
              </h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full text-hok-stone hover:text-hok-espresso hover:bg-hok-linen transition-all duration-150"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex px-4 sm:px-6">
            <button
              onClick={() => setActiveTab("cart")}
              className={`font-outfit text-sm font-medium pb-3 mr-6 border-b-2 transition-all duration-150 ${
                activeTab === "cart"
                  ? "text-hok-espresso border-hok-espresso"
                  : "text-hok-stone border-transparent hover:text-hok-espresso"
              }`}
            >
              Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`font-outfit text-sm font-medium pb-3 border-b-2 transition-all duration-150 ${
                activeTab === "recent"
                  ? "text-hok-espresso border-hok-espresso"
                  : "text-hok-stone border-transparent hover:text-hok-espresso"
              }`}
            >
              Recently Viewed{recentlyViewed.length > 0 ? ` (${recentlyViewed.length})` : ""}
            </button>
          </div>
        </div>

        {/* ─── Cart Tab ─── */}
        {activeTab === "cart" && (
          <>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <div className="w-20 h-20 bg-hok-linen rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag className="w-8 h-8 text-hok-stone" />
                </div>
                <h3 className="font-playfair text-2xl text-hok-espresso mb-3">
                  Your cart is empty
                </h3>
                <p className="font-outfit text-sm text-hok-stone mb-8 max-w-[280px]">
                  Discover authentic Korean skincare products crafted for your unique skin.
                </p>
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push("/shop");
                  }}
                  className="inline-flex items-center gap-2 bg-hok-espresso text-white font-outfit font-medium text-sm tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-hok-walnut transition-colors duration-150"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-hok-mist/50">
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      item={item}
                      onRemove={() => handleRemoveWithUndo(item.id)}
                      onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                      onClose={() => setOpen(false)}
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-hok-mist px-4 sm:px-6 pt-4 pb-6 bg-white space-y-3 w-full max-w-full overflow-hidden">
                  {/* Coupon Field */}
                  <div className="flex gap-2 w-full min-w-0">
                    <div className="flex-1 min-w-0 flex items-center border border-hok-mist/60 bg-hok-linen/30 px-2.5 sm:px-3 h-10 gap-1.5 sm:gap-2">
                      <Tag className="w-3.5 h-3.5 text-hok-stone shrink-0" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          if (couponApplied) setCouponApplied(false);
                        }}
                        placeholder="Have a coupon?"
                        className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm font-outfit placeholder:text-hok-stone/50 focus:outline-none text-hok-espresso"
                      />
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      className="px-3 sm:px-4 h-10 shrink-0 bg-hok-espresso text-white text-xs font-outfit font-medium tracking-wider uppercase hover:bg-hok-walnut transition-colors duration-150"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-outfit text-sm uppercase tracking-widest text-hok-stone">
                      Subtotal:
                    </span>
                    <span className="font-outfit text-xl font-bold text-hok-espresso">
                      {totalPrice()}
                    </span>
                  </div>

                  <p className="text-xs text-hok-stone font-outfit">
                    Shipping calculated at checkout
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3 pt-1">
                    <button
                      onClick={handleCheckout}
                      className="w-full h-12 bg-hok-espresso text-white font-outfit font-medium text-sm tracking-[0.12em] uppercase hover:bg-hok-walnut transition-colors duration-150 flex items-center justify-center gap-2"
                    >
                      Checkout
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full h-10 text-hok-stone font-outfit font-medium text-xs tracking-[0.1em] uppercase hover:text-hok-espresso transition-colors duration-150"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-hok-stone font-outfit pt-1">
                    <Lock className="w-3.5 h-3.5 text-hok-champagne" />
                    <span>100% Secure Checkout</span>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* ─── Recently Viewed Tab ─── */}
        {activeTab === "recent" && (
          <div className="flex-1 overflow-y-auto">
            {recentlyViewed.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center h-full min-h-[300px]">
                <div className="w-16 h-16 bg-hok-linen rounded-full flex items-center justify-center mb-5">
                  <Clock className="w-7 h-7 text-hok-stone" />
                </div>
                <h3 className="font-playfair text-xl text-hok-espresso mb-2">
                  No recently viewed items
                </h3>
                <p className="font-outfit text-sm text-hok-stone max-w-[260px]">
                  Products you browse will appear here for easy access.
                </p>
              </div>
            ) : (
              <div className="px-6 py-4 space-y-0 divide-y divide-hok-mist/50">
                {recentlyViewed.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.handle}`}
                    onClick={() => setOpen(false)}
                    className="flex gap-4 py-4 first:pt-2 group"
                  >
                    <div className="w-16 h-16 flex-shrink-0 bg-hok-linen rounded overflow-hidden relative border border-hok-mist/40">
                      <Image
                        src={product.image || "/placeholder.jpg"}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      {product.vendor && (
                        <span className="text-[10px] text-hok-stone uppercase tracking-[0.2em] font-outfit font-semibold">
                          {product.vendor}
                        </span>
                      )}
                      <p className="font-outfit font-medium text-sm text-hok-espresso line-clamp-1 group-hover:text-hok-walnut transition-colors duration-150">
                        {product.title}
                      </p>
                      <span className="font-outfit text-sm text-hok-walnut font-semibold mt-0.5">
                        {formatPrice(product.price, {
                          currencyCode: product.currencyCode,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ArrowRight className="w-4 h-4 text-hok-stone group-hover:text-hok-espresso transition-colors duration-150" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* ─── Cart Item with Swipe-to-Delete ─── */

interface CartDrawerItemProps {
  item: any;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
  onClose: () => void;
}

function CartDrawerItem({ item, onRemove, onUpdateQuantity, onClose }: CartDrawerItemProps) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const deltaX = touchStartX - e.touches[0].clientX;
      // Only allow left swipe, capped at 80px
      if (deltaX > 0) {
        setSwipeOffset(Math.min(deltaX, 80));
      } else {
        setSwipeOffset(0);
      }
    },
    [touchStartX]
  );

  const handleTouchEnd = useCallback(() => {
    if (swipeOffset > 50) {
      setIsSwiped(true);
      setSwipeOffset(80);
    } else {
      setIsSwiped(false);
      setSwipeOffset(0);
    }
  }, [swipeOffset]);

  // Reset swipe when tapping elsewhere
  const handleClick = useCallback(() => {
    if (isSwiped) {
      setIsSwiped(false);
      setSwipeOffset(0);
    }
  }, [isSwiped]);

  return (
    <div className="relative overflow-hidden" ref={itemRef}>
      {/* Delete action behind */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-hok-error flex items-center justify-center">
        <button
          onClick={onRemove}
          className="w-full h-full flex items-center justify-center text-white"
          aria-label="Delete item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Foreground card */}
      <div
        className="flex gap-4 py-4 first:pt-2 relative bg-white transition-transform duration-150 ease-out"
        style={{ transform: `translateX(-${swipeOffset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {/* Product Image */}
        <Link
          href={`/shop/${item.handle}`}
          onClick={onClose}
          className="w-20 h-20 sm:w-[88px] sm:h-[88px] flex-shrink-0 bg-hok-linen rounded overflow-hidden relative border border-hok-mist/40"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="88px"
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/shop/${item.handle}`}
              onClick={onClose}
              className="font-outfit font-medium text-sm text-hok-espresso line-clamp-2 hover:text-hok-walnut transition-colors duration-150 leading-snug"
            >
              {item.title}
            </Link>
            {/* Desktop remove button */}
            <button
              onClick={onRemove}
              className="hidden sm:flex p-1 rounded text-hok-stone/50 hover:text-hok-error hover:bg-hok-error/5 transition-colors duration-150 flex-shrink-0"
              aria-label={`Remove ${item.title}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-end justify-between mt-2">
            {/* Quantity Controls */}
            <div className="flex items-center border border-hok-mist/60 bg-hok-linen/30 rounded-sm">
              <button
                onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors duration-100"
                disabled={item.quantity <= 1}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-xs font-outfit font-medium text-hok-espresso">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-hok-stone hover:text-hok-espresso transition-colors duration-100"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Price */}
            <span className="font-outfit font-semibold text-sm text-hok-walnut">
              {formatPrice(
                (parseFloat(item.price) * item.quantity).toString(),
                { currencyCode: item.currencyCode }
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
