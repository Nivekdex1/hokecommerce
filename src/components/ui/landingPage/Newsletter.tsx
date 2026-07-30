"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Successfully subscribed to our newsletter!");
        setEmail("");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-narrow text-center">
      <div className="max-w-3xl mx-auto bg-hok-ivory rounded-md p-8 md:p-16 border border-hok-mist relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-hok-champagne/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-hok-walnut/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-hok-mist">
            <Mail className="w-6 h-6 text-hok-champagne" />
          </div>
          
          <h2 className="font-playfair text-3xl md:text-4xl text-hok-espresso font-semibold mb-4">
            Join The HOK Tribe
          </h2>
          
          <p className="font-manrope text-hok-stone mb-10 max-w-lg mx-auto">
            Subscribe to our newsletter to receive exclusive offers, early access to new arrivals, and expert Korean skincare tips.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 bg-white border-hok-mist focus-visible:ring-hok-champagne text-base"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 rounded-none bg-hok-walnut hover:bg-hok-espresso text-white font-semibold tracking-wide transition-colors whitespace-nowrap"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="font-manrope text-xs text-hok-mist/80 mt-6">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
