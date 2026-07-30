"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay showing the modal slightly for better UX
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md animate-in slide-in-from-bottom-full duration-500">
      <div className="bg-white border border-hok-mist shadow-xl rounded-md p-6 relative">
        <button 
          onClick={declineCookies} 
          className="absolute top-4 right-4 text-hok-stone hover:text-hok-espresso transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="font-playfair text-xl font-medium text-hok-espresso mb-3">
          We Value Your Privacy
        </h3>
        
        <p className="font-manrope text-sm text-hok-stone mb-6 leading-relaxed pr-6">
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read more in our{" "}
          <Link href="/privacy-policy" className="text-hok-walnut hover:underline font-semibold">
            Privacy Policy
          </Link>.
        </p>
        
        <div className="flex gap-3">
          <Button 
            onClick={acceptCookies}
            className="flex-1 bg-hok-espresso hover:bg-hok-walnut text-white rounded-sm font-semibold tracking-wide"
          >
            Accept All
          </Button>
          <Button 
            onClick={declineCookies}
            variant="outline"
            className="flex-1 border-hok-mist text-hok-stone hover:bg-hok-linen hover:text-hok-espresso rounded-sm font-semibold tracking-wide bg-transparent"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
