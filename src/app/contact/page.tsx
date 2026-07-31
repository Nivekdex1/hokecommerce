"use client";

import { Button } from "@/components/ui/button";
import FaqAccordion from "@/components/ui/faqAccordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Asterisk, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        const result = await response.json();
        toast.error(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-hok-linen min-h-screen pb-16">
      <div className="bg-hok-ivory border-b border-hok-mist py-10 md:py-16">
        <div className="container-narrow text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-hok-espresso font-semibold mb-4">Contact Us</h1>
          <p className="font-manrope text-hok-stone text-lg max-w-2xl mx-auto">
            We're here to help you on your skincare journey. Reach out with any questions or concerns.
          </p>
        </div>
      </div>

      <div className="container-narrow py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="bg-white border border-hok-mist rounded-md p-8 h-full">
              <h3 className="font-playfair text-2xl text-hok-espresso font-medium mb-8">Get in Touch</h3>

              <div className="space-y-8 font-manrope">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-hok-champagne/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-hok-caramel" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-hok-espresso mb-1">Email Us</h4>
                    <a href="mailto:shop@homeofkoreanbeauty.com" className="text-sm text-hok-stone hover:text-hok-walnut transition-colors">
                      shop@homeofkoreanbeauty.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-hok-champagne/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-hok-caramel" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-hok-espresso mb-1">Call Us</h4>
                    <a href="tel:+2349164036455" className="text-sm text-hok-stone hover:text-hok-walnut transition-colors">
                      +234 916 403 6455
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-hok-champagne/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-hok-caramel" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-hok-espresso mb-1">WhatsApp</h4>
                    <p className="text-sm text-hok-stone mb-1">Available Mon - Sat, 9am - 6pm</p>
                    <a href="https://wa.me/2347065095024" className="text-sm font-semibold text-hok-walnut hover:text-hok-caramel transition-colors">
                      Chat with us
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-hok-champagne/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-hok-caramel" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-hok-espresso mb-1">Visit Our Store</h4>
                    <p className="text-sm text-hok-stone leading-relaxed">
                      Shop 043 Grace of God Plaza,<br />
                      Opposite Kaduna Plaza,<br />
                      Balogun Market, off Lagos Badagry Expressway,<br />
                      Trade Fair Complex, Lagos State
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white border border-hok-mist rounded-md p-8 md:p-12">
              <h2 className="font-playfair text-3xl text-hok-espresso font-medium mb-2">Send a Message</h2>
              <p className="font-manrope text-hok-stone mb-8">
                Use the form below to send us a message and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="font-manrope space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-hok-espresso">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Jane"
                      className="border-hok-mist focus-visible:ring-hok-champagne bg-hok-linen/50 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-hok-espresso">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      className="border-hok-mist focus-visible:ring-hok-champagne bg-hok-linen/50 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-hok-espresso flex items-center gap-1">
                    Email Address <Asterisk className="w-3 h-3 text-hok-error" />
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    className="border-hok-mist focus-visible:ring-hok-champagne bg-hok-linen/50 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-hok-espresso flex items-center gap-1">
                    Your Message <Asterisk className="w-3 h-3 text-hok-error" />
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you today?"
                    className="border-hok-mist focus-visible:ring-hok-champagne bg-hok-linen/50 min-h-[150px] resize-y"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[200px] h-14 rounded-none bg-hok-espresso hover:bg-hok-walnut text-white font-semibold tracking-wide transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white border border-hok-mist rounded-md overflow-hidden">
            <div className="p-6 md:p-8 border-b border-hok-mist">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-hok-champagne/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-hok-caramel" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl text-hok-espresso font-medium">Find Our Store</h3>
                  <p className="font-manrope text-sm text-hok-stone">Trade Fair Complex, Lagos Badagry Expressway, Lagos State</p>
                </div>
              </div>
            </div>
            <div className="relative w-full h-[350px] md:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.4877516028228!2d3.2505500999999994!3d6.4597183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8980611c074d%3A0x3aa3d4021fced42d!2sHome%20of%20Korean%20Products%20(HOK)!5e0!3m2!1sen!2sng!4v1785501876907!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HOK Store Location — Trade Fair Complex, Lagos"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-hok-ivory py-16 md:py-24 border-y border-hok-mist">
        <div className="container-narrow">
          <SectionHeading title="Frequently Asked Questions" subtitle="Find quick answers to common questions" />
          <div className="max-w-3xl mx-auto bg-white border border-hok-mist rounded-md p-6 md:p-10">
            <FaqAccordion />
          </div>
        </div>
      </section>

    </main>
  );
}
