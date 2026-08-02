"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CheckCircle2, ChevronRight, MapPin, X, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import Image from "next/image";

export default function WholesalePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const [quoteFormData, setQuoteFormData] = useState({
    fullName: "",
    businessName: "",
    phone: "",
    email: "",
    orderRequest: "",
  });

  const [tourFormData, setTourFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const validateForm = () => {
    let newErrors: Partial<typeof formData> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWholesaleReg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/wholesale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phoneNumber,
        }),
      });

      if (response.ok) {
        toast.success("Registration successful! You will receive an email shortly.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        });
        setIsDialogOpen(false);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuote(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteFormData),
      });

      if (response.ok) {
        toast.success("Your quote request has been submitted successfully!");
        setQuoteFormData({ fullName: "", businessName: "", phone: "", email: "", orderRequest: "" });
      } else {
        toast.error("Failed to submit quote request. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  const handleTourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast.success("Your warehouse tour request has been submitted successfully!");
      setTourFormData({ fullName: "", email: "", phoneNumber: "" });
    } catch (error) {
      toast.error("Failed to submit tour request. Please try again.");
    }
  };

  return (
    <main className="bg-hok-linen min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full bg-hok-espresso flex items-center justify-center">
        <Image 
          src="/our-brand.png" 
          alt="Wholesale Partners" 
          fill 
          priority 
          className="object-cover opacity-30 grayscale"
          sizes="100vw"
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="inline-block bg-hok-champagne text-hok-espresso text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm mb-6">HOK Pro</div>
          <h1 className="font-playfair text-5xl md:text-6xl text-white font-semibold mb-6">
            Grow With Us
          </h1>
          <p className="font-manrope text-hok-ivory text-lg md:text-xl font-light mb-10">
            Join the HOK Wholesale Program and stock authentic K-beauty products at competitive prices.
          </p>
          
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button className="bg-hok-champagne hover:bg-white text-hok-espresso rounded-none px-10 py-6 text-base font-semibold">
                Apply for Wholesale
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white rounded-md border border-hok-mist">
              <div className="bg-hok-ivory border-b border-hok-mist p-6 flex justify-between items-center">
                <h2 className="font-playfair text-2xl font-semibold text-hok-espresso">
                  Wholesale Application
                </h2>
                <button onClick={() => setIsDialogOpen(false)} className="text-hok-stone hover:text-hok-espresso">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleWholesaleReg} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="border-hok-mist focus-visible:ring-hok-champagne"
                    />
                    {errors.firstName && <p className="text-xs text-hok-error">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="border-hok-mist focus-visible:ring-hok-champagne"
                    />
                    {errors.lastName && <p className="text-xs text-hok-error">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-hok-mist focus-visible:ring-hok-champagne"
                  />
                  {errors.email && <p className="text-xs text-hok-error">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number (WhatsApp)</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="border-hok-mist focus-visible:ring-hok-champagne"
                  />
                  {errors.phoneNumber && <p className="text-xs text-hok-error">{errors.phoneNumber}</p>}
                </div>
                <Button type="submit" className="w-full h-12 bg-hok-espresso hover:bg-hok-walnut text-white rounded-none font-semibold">
                  Submit Application
                </Button>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <div className="container-narrow py-16 md:py-24">
        
        {/* Terms Section */}
        <div className="mb-20">
          <SectionHeading title="Wholesale Terms" subtitle="Everything you need to know before joining HOK Pro" align="left" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="prose prose-sm font-manrope text-hok-stone leading-relaxed">
              <h3 className="font-playfair text-xl font-medium text-hok-espresso mb-4">Minimum Order Requirements</h3>
              <ul className="space-y-2 mb-8">
                <li><strong className="text-hok-espresso">Minimum Order Quantity (MOQ):</strong> Our MOQ is 1 Carton. For brands without MOQ (e.g., Lizara, 12 Grabs), a minimum order amount of ₦1,000,000 applies.</li>
                <li>You can mix products from different brands, provided the total equals a carton (approximately 50 - 100 items depending on product sizes).</li>
              </ul>

              <h3 className="font-playfair text-xl font-medium text-hok-espresso mb-4">Processing & Shipping</h3>
              <ul className="space-y-2">
                <li><strong className="text-hok-espresso">Timeline:</strong> Wholesale orders are processed and shipped within 14 working days.</li>
                <li><strong className="text-hok-espresso">Shipping Fees:</strong> Shipping costs are separate and depend on order weight and destination. This will be calculated and invoiced separately.</li>
                <li><strong className="text-hok-espresso">Pick-up:</strong> Free warehouse pick-up is available in Lagos.</li>
              </ul>
            </div>
            
            <div className="prose prose-sm font-manrope text-hok-stone leading-relaxed">
              <h3 className="font-playfair text-xl font-medium text-hok-espresso mb-4">Payment Terms</h3>
              <ul className="space-y-2 mb-8">
                <li>Prices quoted are in Naira (₦) and are subject to change based on exchange rates.</li>
                <li>A 70% deposit is required to secure your order. The remaining 30% is due upon arrival before dispatch or pick-up.</li>
                <li>All payments must be made via bank transfer to our official corporate account.</li>
              </ul>

              <h3 className="font-playfair text-xl font-medium text-hok-espresso mb-4">Returns & Damages</h3>
              <ul className="space-y-2">
                <li>We do not accept returns for unsold inventory.</li>
                <li>In the rare event of damaged goods upon arrival, you must notify us with visual proof within 24 hours of receipt. We will replace the items or issue a credit note.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Forms Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Custom Quote Form */}
          <div className="bg-white border border-hok-mist p-8 md:p-12 rounded-md">
            <h3 className="font-playfair text-2xl font-medium text-hok-espresso mb-2">Request a Quote</h3>
            <p className="font-manrope text-sm text-hok-stone mb-8">Have a specific order in mind? Send us your requirements and we'll send a custom quote.</p>
            
            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quoteFullName">Full Name</Label>
                  <Input
                    id="quoteFullName"
                    value={quoteFormData.fullName}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, fullName: e.target.value })}
                    required
                    className="border-hok-mist bg-hok-linen/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quoteBusinessName">Business Name (Optional)</Label>
                  <Input
                    id="quoteBusinessName"
                    value={quoteFormData.businessName}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, businessName: e.target.value })}
                    className="border-hok-mist bg-hok-linen/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quotePhone">Phone Number</Label>
                  <Input
                    id="quotePhone"
                    type="tel"
                    value={quoteFormData.phone}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                    required
                    className="border-hok-mist bg-hok-linen/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quoteEmail">Email Address</Label>
                  <Input
                    id="quoteEmail"
                    type="email"
                    value={quoteFormData.email}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                    required
                    className="border-hok-mist bg-hok-linen/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderRequest">Order Details (Products & Quantities)</Label>
                <Textarea
                  id="orderRequest"
                  value={quoteFormData.orderRequest}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, orderRequest: e.target.value })}
                  required
                  className="min-h-[150px] border-hok-mist bg-hok-linen/50 resize-y"
                  placeholder="E.g., 50x Cosrx Snail Mucin, 20x Anua Heartleaf Toner..."
                />
              </div>
              <Button type="submit" disabled={isSubmittingQuote} className="w-full h-12 bg-hok-walnut hover:bg-hok-espresso text-white rounded-none font-semibold">
                {isSubmittingQuote ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </div>

          {/* Warehouse Tour Form */}
          <div className="bg-hok-espresso text-white p-8 md:p-12 rounded-md flex flex-col justify-between">
            <div>
              <h3 className="font-playfair text-2xl font-medium mb-2 text-hok-champagne">Visit Our Warehouse</h3>
              <p className="font-manrope text-sm text-hok-mist/80 mb-8">Want to see our inventory before committing? Book a guided tour of our Lagos facility.</p>
              
              <form onSubmit={handleTourSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tourName" className="text-hok-ivory">Full Name</Label>
                  <Input
                    id="tourName"
                    type="text"
                    value={tourFormData.fullName}
                    onChange={(e) => setTourFormData({ ...tourFormData, fullName: e.target.value })}
                    required
                    className="border-white/20 bg-white/5 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tourEmail" className="text-hok-ivory">Email</Label>
                    <Input
                      id="tourEmail"
                      type="email"
                      value={tourFormData.email}
                      onChange={(e) => setTourFormData({ ...tourFormData, email: e.target.value })}
                      required
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tourPhone" className="text-hok-ivory">Phone</Label>
                    <Input
                      id="tourPhone"
                      type="tel"
                      value={tourFormData.phoneNumber}
                      onChange={(e) => setTourFormData({ ...tourFormData, phoneNumber: e.target.value })}
                      required
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/40"
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button type="submit" className="w-full h-12 bg-white hover:bg-hok-ivory text-hok-espresso rounded-none font-semibold">
                    Request Tour
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-sm text-hok-mist/60 border-t border-white/10 pt-6">
              <MapPin className="w-5 h-5 text-hok-champagne" />
              <span>Available by appointment only. Lagos, Nigeria.</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
